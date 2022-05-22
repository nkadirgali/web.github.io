const express = require("express");
const https = require("https");
const {response} = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) =>{
        if(!req.isAuthenticated()) {
            res.redirect("/login")
        }
        if(!req.user.isModerator) res.redirect("/")
        res.render("admin.ejs")
    })
    .post((req, res) => res.send("POST"));



module.exports = router;