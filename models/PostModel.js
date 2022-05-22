let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let postSchema = new mongoose.Schema({
/*    author:{
        type: String,
        required: true
    },*/
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
    },
    date:{
        type: Date
    },
    isComplained:{
        type: Boolean,
        default: false
    }
});
let postModel = new mongoose.model('Post', postSchema);
module.exports = postModel;