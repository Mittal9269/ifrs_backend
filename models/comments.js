const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Comment = mongoose.Schema({
    userID: {
        type: ObjectId,
        ref: "user",
        required: true
    },
    PostID : {
        type: ObjectId,
        ref: "blog",
        required: true
    },
    text: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true });

const comment = mongoose.model("comment", Comment);
module.exports = comment;