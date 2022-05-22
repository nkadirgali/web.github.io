const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/',(req,res)=>{
    if(!req.isAuthenticated()) {
        res.redirect("/login")
    }UserController.findAll(req,res)
});
router.post('/login',(req,res)=>{
    UserController.login(req,res);
});
router.get('/find/:username',(req,res) => {
    if(!req.isAuthenticated()) {
        res.redirect("/login")
    }
    if(req.user.username==req.params.username){
        res.redirect("/profile")
    }else UserController.findOne(req,res);
});
router.post('/',(req,res) => {
    UserController.create(req,res);
});
router.patch('/update/:username',(req,res)=>{
    if(!req.isAuthenticated()){
        res.redirect("/login")
    }else if(req.user.username!=req.params.username && !req.user.isModerator) res.render("status",{
        typeOfModel: "User",
        typeOfOperation: "Update",
        message: "It's not your account"
    })
    UserController.update(req,res);
});
router.patch('/updateComplain/:username',(req,res)=>{
    UserController.updateComplain(req,res);
})
router.delete('/delete/:username',(req,res)=>{
    if(!req.isAuthenticated()){
        res.redirect("/login")
    }else if(req.user.username!=req.params.username && !req.user.isModerator) res.render("status",{
        typeOfModel: "User",
        typeOfOperation: "Delete",
        message: "It's not your account"
    })
    UserController.destroy(req,res);
});
router.delete('/deleteUsers',(req,res)=>{
    UserController.destroyAllUsers(req,res);
})
module.exports = router;
