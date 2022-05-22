const express = require('express');
const ContactController = require('../controllers/ContactController');
const router = express.Router();

router.get('/',(req,res)=>{
    if(!req.isAuthenticated()) {
        res.redirect("/login")
    }
    ContactController.findAll(req,res);
});
router.post('/',(req,res) => {
    ContactController.create(req,res);
});
router.delete('/delete/:id',(req,res)=>{
    ContactController.destroy(req,res);
});
router.delete('/deleteContacts',ContactController.destroyAllContacts)
module.exports = router;
