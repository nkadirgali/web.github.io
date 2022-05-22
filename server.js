require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const ejs=require('ejs')
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');
const session = require('express-session')
const passport=require('passport')
//
//level 6
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
const methodOverride = require('method-override');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
    secret: "then we need to replace it to .env file",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const dbConfig = require('./config/database.config.js');

const {router} = require("express/lib/application");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

const UserRoute = require('./routes/User')
app.use('/user',UserRoute)
app.use('/contact',require('./routes/Contact'))
app.use('/post',require('./routes/Post'))

app.use('/',require('./routes/index'));
app.use('/admin',require('./routes/admin'));
app.use('/accounts',require('./routes/accounts'));
app.use('/weather',require('./routes/weather'));
app.use('/profile',require('./routes/profile'));

app.get("/auth/google",
    passport.authenticate('google',{ scope: ["profile","email"] })
)

app.get('/auth/google/globolg',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

let port = process.env.PORT;// || 3000;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
