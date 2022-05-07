let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts:{
        type: Array,
        default: []
    },
    likedPosts:{
        type: Array,
        default: []
    },
    subscribers:{
        type: Array,
        default: []
    },
    subsciptions:{
        type: Array,
        default: []
    },
    statusAcc:{
        type: Boolean,
        default: false
    }/*,
    lastVisit:{
        type: TimeStamp
    }*/
});
let userModel = new mongoose.model('User', userSchema);
module.exports = userModel;