const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    fooditem: {
        type: String,
        trim: true,
        required: true
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
    image: {
        type: String,
        trim: true,
        default: "../../frontend/public/defaultMenu.png"
    }
});

const menu = mongoose.model("menu",menuSchema);
module.exports=menu;