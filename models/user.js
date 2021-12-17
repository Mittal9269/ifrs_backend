const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
     password:{
        type:String,
        required:true,
        trim:true
      },
     Name:{
         type:String,
         trim:true
     },
     email:{
         type:String,
         required:true,
         unique:true,
         trim:true
     } ,
     image:{
        type : String,
        default : "",
     },
     gender:{type:String},
     isAdmin:{type:Boolean},
     isCustomer:{type:Boolean},
     isRestricted:{type:Boolean}
});


const user = mongoose.model("user",UserSchema);
module.exports = user;