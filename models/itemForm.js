const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const itemFormSchema = mongoose.Schema({
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
      }
}, {timestamps: true });

const itemForm = mongoose.model("itemForm",itemFormSchema);
module.exports=itemForm;
