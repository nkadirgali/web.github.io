let mongoose = require('mongoose');
let postSchema = new mongoose.Schema({
    author:{
        type: String,
        required: true
    },
    authorId:{
        type: ObjectId,
        required: true
    },
    likes:{
        type: Array,
        default: []
    },
    text:{
        type: String,
        required: true
    }
});
let postModel = new mongoose.model('Post', postSchema);
module.exports = postModel;