const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/',UserController.findAll);
router.get('/find/:username',UserController.findOne);
router.post('/',(req,res) => {
    UserController.create(req,res);
});
router.patch('/update/:username',(req,res)=>{
    UserController.update(req,res);
});
router.delete('/delete/:username',(req,res)=>{
    UserController.destroy(req,res);
});
router.delete('/deleteUsers',UserController.destroyAllUsers)
module.exports = router;
