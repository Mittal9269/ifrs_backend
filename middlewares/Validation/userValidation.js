const { body, validationResult } = require("express-validator");

// console.log(body("username"))
exports.validateNewUser = [
    body("password")
    .isLength({
        min:8,
        max:20
    })
    .withMessage("must contain atleast 8 to 20 characters")
    .escape(),
    body("Name")
        .isLength({
            min:1,
            max:20
        })
        .withMessage("must contain atleast 2 to 10 characters")
        .escape(),
    body("email")
        .isEmail()
        .withMessage("is not valid")
        .escape(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401)
                .json({
                    message: errors.errors[0].param + " " + errors.errors[0].msg,
                    errors
                });
        }
        next();
    }
];
exports.loginUser = [
    body("password")
        .isLength({
            min:8,
            max:20
        })
        .withMessage("must contain atleast 8 to 20 characters")
        .trim()
        .escape(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401)
                .json({
                    message: errors.errors[0].param + " " + errors.errors[0].msg,
                    errors
                });
        }
        next();
    }
];

//Update User Validator
