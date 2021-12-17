const menu = require("../models/menu");
const DayinInt  = {
    0 : "Sunday",
    1  : "Monday",
    2 : "Tuesday",
    3  : "Wednesday",
    4  : "Thursday",
    5  : "Friday",
    6  :  "Saturday"
};

// var currentTime = new Date();
// var currentOffset = currentTime.getTimezoneOffset();
// var ISTOffset = 330;   // IST offset UTC +5:30 
// var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
// var hours = ISTTime.getHours()
// let weekDay = DayinInt[ISTTime.getDay()];
//     let timeOfDay = 'Dinner';


//     if(hours >= 3 && hours < 12)
//         timeOfDay="Breakfast";
//     else if (hours >= 12 && hours < 16)
//         timeofDay="Lunch";
//     else if (hours >= 16 && hours < 19)
//         timeOfDay = "Snacks";
// ISTTime now represents the time in IST coordinates



exports.newMenu = (req , res) =>{
    const Menu = new menu ({
        fooditem : req.body.fooditem,
        timing : req.body.timing,
        day : req.body.day
    })
    Menu.save().then((new_user,err)=>{
        if(err){
           return res.status(500).json({error:"Server Error"})
        }
        
        res.status(200).json({message:"Menu save successfully"})
    })
    .catch(err=>{
        res.status(400).json({message:"save Error, Please Try Again",err})
    })
}

exports.fetchMenuDefault = (req, res) => {
    let currentTime = new Date();
let currentOffset = currentTime.getTimezoneOffset();
let ISTOffset = 330;   // IST offset UTC +5:30 
let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
let weekDay = DayinInt[ISTTime.getDay()];
let hours = ISTTime.getHours()
    let timeOfDay = 'Dinner';


    if(hours >= 3 && hours < 12)
        timeOfDay="Breakfast";
    else if (hours >= 12 && hours < 16)
        timeOfDay="Lunch";
    else if (hours >= 16 && hours < 19)
        timeOfDay = "Snacks";
    // console.log(day , timing)
    menu.find({day : weekDay, timing : timeOfDay}).then(fetchedMenu=>res.status(200).json(fetchedMenu))
    .catch(err => console.log(err))
}

exports.fetchMenuDefaultPer = (req, res) => {
    menu.find({_id : req.params.id}).then(fetchedMenu=>res.status(200).json(fetchedMenu))
    .catch(err => console.log(err))
}

exports.fetchItemPicture = (req,res) =>{
    menu.findOne({fooditem : req.params.food}).then(fetchMenu=>{
        // console.log(fetchMenu)
        res.status(200).json(fetchMenu)
    })
    .catch(err => console.log(err))
}

exports.fetchMenuItem = (req, res) => {
    let currentTime = new Date();
let currentOffset = currentTime.getTimezoneOffset();
let ISTOffset = 330;   // IST offset UTC +5:30 
let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
let weekDay = DayinInt[ISTTime.getDay()];
var hours = ISTTime.getHours()
    let  timeOfDay = 'Dinner';


    if(hours >= 3 && hours < 12)
        timeOfDay="Breakfast";
    else if (hours >= 12 && hours < 16)
        timeOfDay="Lunch";
    else if (hours >= 16 && hours < 19)
        timeOfDay = "Snacks";
    menu.find({day : weekDay, timing : timeOfDay})
    .select("fooditem")
    .then(fetchedMenu=>{
        let sentArr = []
        for(let i=0; i<fetchedMenu.length; i++){
            sentArr.push(fetchedMenu[i].fooditem)
        }
        res.status(200).json(sentArr)
    })
    .catch(err => console.log(err))
}

exports.fetchMenu = (req, res) => {
    isWeekDayGiven = false;
    if(req.params.weekDay)
    {
        try
        {
            isWeekDayGiven = true;
            weekDay = req.params.weekDay;
        }
        catch(err)
        {
            console.log(err);
        }
    }
    
    if(isWeekDayGiven)
    {
        menu.find({day : weekDay}).then(fetchedMenu=>res.status(200).json(fetchedMenu))
        .catch(err => console.log(err))
    }
    else this.fetchMenuDefault();
}

exports.updateMenu = (req, res)=>{
    console.log(req.body)
    menu.findById(req.params.id,(err,foundItem)=>{
        if(err)
            return res.json({message:"Error in Fecching Categary, please try again."});
        if(!foundItem)
            return res.json({message:"Item Doesn't exist, please check."});
            updatedItem = {
                fooditem : req.body.fooditem,
                timing : req.body.timing,
                day : req.body.day
            }
            menu.findByIdAndUpdate(req.params.id , updatedItem , {
                new : true, 
                useFindAndModify : false 
            }).then((new_user,err)=>{
                if(err){
                   return res.status(500).json({error:"Server Error"})
                }
                
                res.status(200).json({message:"SuccesFully Updated"})
            })
            .catch(err=>{
                res.status(400).json({message:"Updation Error, Please Try Again",err})
            })
    })
}

exports.deleteMenu = (req ,res) =>{
    menu.findById(req.params.id,(err,foundItem)=>{
        if(err)
            return res.json({message:"Error in Fecching Categary, please try again."});
        if(!foundItem)
            return res.json({message:"Categary Doesn't exist, please register."});
            menu.findByIdAndDelete(req.params.id 
                // new : true, 
                // useFindAndModify : false 
            ).then((new_user,err)=>{
                if(err){
                   return res.status(500).json({error:"Server Error"})
                }
                
                res.status(200).json({message:"SuccesFully Deleted"})
            })
            .catch(err=>{
                res.status(400).json({message:"Updation Error, Please Try Again",err})
            })
    })
}