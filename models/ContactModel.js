let mongoose = require('mongoose');
let contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date
    }
});
let contactModel = new mongoose.model('Contact', contactSchema);
module.exports = contactModel;