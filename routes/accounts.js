const express = require("express");
const https = require("https");
const {response} = require("express");
const router = express.Router();

router
    .route("/edit")
    .get((req,res)=> res.render("editprofile.ejs"))
router
    .route("/password/change")
    .get((req,res)=>res.render("changePassword.ejs"))

module.exports = router;