const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ratingFormSchema = mongoose.Schema({
    UserId: {
        type: ObjectId, 
        ref: "user",
        require : true
    },
    FormId: {
        type: ObjectId, 
        ref: "user",
        require : true
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
    Food:{
        type: String, 
        trim: true,
        require : true
      },
      Rating: {
        type: Number,
        required: true,
        default: 1
    },
    Comment : {
        type : String,
        trim : true,
        default : ""
    }
}, {timestamps: true });

const ratingForm = mongoose.model("ratingForm",ratingFormSchema);
module.exports=ratingForm;
