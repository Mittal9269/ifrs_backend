const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const FormSchema = mongoose.Schema({
    DidLike: {
        type: Boolean,
        required: true
    },
    Rating: {
        type: Number,
        required: true,
        default: 1
    },
    Comment : {
        type : String,
        default : ""
    },
    timing: {
        type: String,
        required: true,
        trim: true,
        default: 'Breakfast',
        enum:['Breakfast', 'Lunch', 'Snacks', 'Dinner']
    },
    day: {
        type: String,
        required: true,
        trim: true,
        enum:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    UserId:{
        type: ObjectId, 
        ref: "user",
        require : true
      }
}, {timestamps: true });

const form = mongoose.model("form",FormSchema);
module.exports=form;

// model for Array 
// LikeFoods: {
//     type: Array,
//     default: []
// },
// RatingFoods: {
//     type: Array,
//     default: []
// },