const user = require("../models/user");
const form = require("../models/defaultForm");

exports.fetchUser = (req, res) => {
    user.find()
        .select("-password")
        .select("-image")
        .then(fetchedUser => res.status(200).json(fetchedUser));
}

exports.fetchForm = (req , res) =>{
    form.find()
        .populate('UserId' , 'email')
        .then(fetchedForm => res.status(200).json(fetchedForm))
}