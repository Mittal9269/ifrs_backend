const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const CommentAnnouce = mongoose.Schema({
    userID: {
        type: ObjectId,
        ref: "user",
        required: true
    },
    PostID : {
        type: ObjectId,
        ref: "announcement",
        required: true
    },
    text: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true });

const commentAnnouce = mongoose.model("commentAnnouce", CommentAnnouce);
module.exports = commentAnnouce;