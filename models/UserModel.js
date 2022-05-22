let mongoose = require('mongoose');

//level 5
const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')

//level 6
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

let userSchema = new mongoose.Schema({
    email: {
        type: String,
//        required: true,
//        unique: true
    },
    fullName: {
        type: String,
        default: ''
    },
    username: {
        type: String,
//        required: true,
        unique: true
    },
    googleId: String,
    password: {
        type: String,
//        required: true
    },
    posts:{
        type: Array,
        default: []
    },
    likedPosts:{
        type: Array,
        default: []
    },
    subscribers:{
        type: Array,
        default: []
    },
    subscriptions:{
        type: Array,
        default: []
    },
    statusAcc:{
        type: Boolean,
        default: false
    },
    isModerator:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isComplained:{
        type: Boolean,
        default: false
    }
    /*,
    lastVisit:{
        type: TimeStamp
    }*/
});

//level 2
//const SECRET = "SuperSecretKey"; //later on we will replace it with env variable
//userSchema.plugin(encrypt, { secret: SECRET, encryptedFields: ["password"] });
//
//level 2.1 - it is better to hide our secret
//userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

//level 5
userSchema.plugin(passportLocalMongoose)
//
//level 6
userSchema.plugin(findOrCreate)

let userModel = new mongoose.model("User", userSchema);
//level 5
passport.use(userModel.createStrategy())
// passport.serializeUser(userModel.serializeUser())
// passport.deserializeUser(userModel.deserializeUser())
//
//level 6
passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err,user)
    })
})

//level 6
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/globolg"
    },
    function(accessToken, refreshToken, profile, cb) {
        // console.log("accessToken|"+accessToken+"|")
        // console.log("ref|"+refreshToken+"|")
        // console.log("profile|"+profile+"|")
        // console.log(profile)
        // console.log("cb|"+cb+"|")
        let newUser = {
            email: profile._json.email,
            fullName: profile._json.family_name+" "+profile._json.given_name,
            username: profile._json.email,
            googleId: profile.id,
            posts: [],
            likedPosts: [],
            subscribers: [],
            subscriptions: [],
            statusAcc: false,
            isModerator: false,
            isAdmin: false
        }
        let foundUser = userModel.findOne({googleId: profile.id}).then(data=> {
            if(!data){
                userModel.findOrCreate(newUser, function (err, user) {
                    // console.log(user);
                    // console.log(err);
                    return cb(err, user);
                });
            }else{
                userModel.findOrCreate(data, function (err, user) {
                    // console.log(user);
                    // console.log(err);
                    return cb(err, user);
                });
            }
        }).catch(err => console.log(err));
        // userModel.findOrCreate({ googleId: profile.id }/*newUser*/, function (err, user) {
        //     // console.log(user);
        //     // console.log(err);
        //      return cb(err, user);
        // });
    }
));
//
module.exports = userModel;