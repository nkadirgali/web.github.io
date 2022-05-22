const express = require("express");
const https = require("https");
const {response} = require("express");
const router = express.Router();

router
    .route("/edit")
    .get((req,res) => {
        if(!req.isAuthenticated()) {
            res.redirect("/login")
        }res.render("editprofile.ejs",{
            username: req.user.username,
            fullName: req.user.fullName,
            email: req.user.email
        })
    })
    .post((req,res) => require('../controllers/UserController').update(req,res))
router
    .route("/password/change")
    .get((req,res)=>{
        if(!req.isAuthenticated()) {
            res.redirect("/login")
        }res.render("changePassword.ejs")
    })
router
    .route("/delete")
    .get((req,res)=>{
        if(!req.isAuthenticated()) {
            res.redirect("/login")
        }res.render("deleteAccount")
    })

module.exports = router;