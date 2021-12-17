const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/UserController");
const {check} = require('express-validator');
const {auth} = require("./../middlewares/auth");
const user_validator = require("../middlewares/validation/userValidation");
let path = require('path');
// const user = require("../models/user");


// const Password = require("../Reset/password");
// const { route } = require("./product");
// @route POST api/signup
// send user data For signup
// @access public
router.post("/signup",user_validator.validateNewUser,user_controller.createNewUser);

// @route POST api/login    
// send user data for login
// @access Public  
router.post("/login",user_validator.loginUser,user_controller.login);
// @route GET api/user
// @desc get user data
// @access private
router.post("/googlelogin" , user_controller.googlelogin);
router.get("/user",auth,user_controller.fetchUser);
module.exports = router;
