const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const Announcement = mongoose.Schema({
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

const announcement = mongoose.model("announcement", Announcement);
module.exports = announcement;