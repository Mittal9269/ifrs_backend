const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Blog = mongoose.Schema({
    userID: {
        type: ObjectId,
        ref: "user",
        required: true
    },
    text: {
        type: String,
        required: true,
        default: 1
    },
    image: {
        type: String,
        default: ""
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    likes : [{type : ObjectId , ref : "user"}]
}, { timestamps: true });

const blog = mongoose.model("blog", Blog);
module.exports = blog;