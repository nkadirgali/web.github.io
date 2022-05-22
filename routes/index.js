const express = require("express");
const https = require("https");
const {response} = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) =>{
        if(req.isAuthenticated()) {
            let display;
            if(req.user.isModerator) display="inline";
            else display="none";
            res.render("index.ejs",{display1: display})
        }else{
            res.redirect("/login")
        }
    })
    .post((req, res) => res.send("POST"));

router
    .route("/sendMessage")
    .get((req,res)=> res.render("contactUs.ejs",{message: ""}))
router
    .route("/login")
    .get((req,res) => {
        res.render("login.ejs",{message: ""})
    })
router
    .route("/register")
    .get((req,res)=>res.render("register.ejs",{
        message: ""
    }))
router.get("/logout",function (req,res){
    req.logout();
    res.redirect("/login")
})


module.exports = router;