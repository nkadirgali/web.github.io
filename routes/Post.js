const express = require('express');
const PostController = require('../controllers/PostController');
const router = express.Router();

router.get('/',(req,res)=>{
    if(!req.isAuthenticated()) {
        res.redirect("/login")
    }
    PostController.findAll(req,res);
});
router.get('/find/:username',(req,res)=>{
    if(!req.isAuthenticated()) {
        res.redirect("/login")
    }
    PostController.findOne(req,res);
});
router.post('/create/:username',(req,res) => {
    PostController.create(req,res);
});
router.patch('/updateComplain/:id',(req,res)=>{
    PostController.updateComplain(req,res);
});
router.delete('/delete/:id',(req,res)=>{
    PostController.destroy(req,res);
});
//router.delete('/deletePosts',PostController.destroyAllUsers)
module.exports = router;
