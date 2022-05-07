const express = require("express");
const https = require("https");
const {response} = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render("index.ejs"))
    .post((req, res) => res.send("POST"));

router
    .route("/sendMessage")
    .get((req,res)=> res.render("contactUs.ejs"))
router
    .route("/login")
    .get((req,res)=> res.render("login.ejs"))
router
    .route("/register")
    .get((req,res)=>res.render("register.ejs"))


module.exports = router;