const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render("profile.ejs"/*,{
        username: req.params.username,
        numberOfPosts: req.params.posts.length,
        numberOfSubscribers: req.params.subscribers.length,
        numberOfSubscriptions: req.params.subsciptions.length
    }*/))
    .post((req, res) => res.send("POST"));
router
    .route("/other")
    .get((req,res)=>res.render("otherProfile.ejs"));

module.exports = router;