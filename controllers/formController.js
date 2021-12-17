const { count } = require("../models/defaultForm");
const form = require("../models/defaultForm");
const itemForm = require("../models/itemForm");
const ratingForm = require("../models/ratingForm");
const  moment = require('moment'); 

const DayinInt  = {
    0 : "Sunday",
    1  : "Monday",
    2 : "Tuesday",
    3  : "Wednesday",
    4  : "Thursday",
    5  : "Friday",
    6  :  "Saturday"
};



exports.newForm = (req , res) =>{
    const ratingObject = req.body.RatingFoods;
    const ratingKeyArray = Object.keys(ratingObject);
    const ratingValueArray = Object.values(ratingObject);
    const itemArray = req.body.LikeFoods;
    
    var currentTime = new Date();
var currentOffset = currentTime.getTimezoneOffset();
var ISTOffset = 330;   // IST offset UTC +5:30 
var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
var hours = ISTTime.getHours()


    let weekDay = DayinInt[ISTTime.getDay()];
        let timeOfDay = 'Dinner';
        if(hours >= 3 && hours < 12)
            timeOfDay="Breakfast";
        else if (hours >= 12 && hours < 16)
            timeOfDay="Lunch";
        else if (hours >= 16 && hours < 19)
            timeOfDay = "Snacks";

    const Form = new form ({
        DidLike : req.body.DidLike,
        Rating : req.body.Rating,
        Comment : req.body.Comment,
        timing : timeOfDay,
        day : weekDay,
        UserId : req.body.UserId
    })
    Form.save().then((new_form,err)=>{
        if(err){
            return res.status(500).json({error:"Server Error"})
        }
        let DataArray = [] , DataArrayForItem = [];
        
        // console.log(ratingKeyArray)
        // console.log(ratingValueArray)
        // console.log(new_form._id)
        for(let index = 0; index < ratingKeyArray.length; index++){
            let temp = {
                UserId : req.body.UserId,
                FormId : new_form._id,
                timing : timeOfDay,
                day : weekDay,
                Food : ratingKeyArray[index],
                Rating : ratingValueArray[index][0],
                Comment : ratingValueArray[index][1]
            };
            DataArray.push(temp);
        }
        ratingForm.insertMany(DataArray,forceServerObjectId=true).then((ratingCard , err) =>{
            if(err) {
                return res.status(403).json({error:"Something went wrong Error", err})
            }
        });

        for(let index = 0; index < itemArray.length; index++){
            let temp = {
                UserId : req.body.UserId,
                FormId : new_form._id,
                timing : timeOfDay,
                day : weekDay,
                Food : itemArray[index]
            };
            DataArrayForItem.push(temp);
        }
        itemForm.insertMany(DataArrayForItem,forceServerObjectId=true).then((ratingCard , err) =>{
            if(err) {
                return res.status(403).json({error:"Something went wrong Error", err})
            }
        });

        res.status(200).json({message:"Form save successfully"})
    })
    .catch(err=>{
        res.status(400).json({message:"save Error, Please Try Again",err})
    })
}

exports.fetchForms = (req, res) => {
    form.find().then(fetchedForm=>res.status(200).json(fetchedForm))
    .catch(err => console.log(err))
}

exports.fetchFormPer = (req, res) => {
    form.findById({ _id: req.params.id })
        .then(fetchedForm => res.json(fetchedForm))
        .catch(err => console.log(err))
}

exports.fetchFormPerFood = (req, res) => {
    ratingForm.find({ Food : req.params.fooditem })
        .sort({"createdAt": -1})
        .populate('UserId' , 'Name image')
        .select('Rating Name Comment image createdAt' )
        .then(fetchedForm => res.json(fetchedForm))
        .catch(err => console.log(err))
}

exports.fetchAverage = (req, res) =>{
    ratingForm.aggregate([
        {
        $group : {
            _id : "$Food",
            avgRating : {$avg : "$Rating"}
            }
        }
    ])
    .then(fetchedForm => res.json(fetchedForm))
    .catch(err => console.log(err))
}
exports.fetchAverageLike = async (req , res) =>{
    let A = await itemForm.aggregate([{"$group" : {_id:"$Food", count:{$sum:1}}}]).sort({"count" : -1})
    let B = await ratingForm.aggregate([{$group : {_id : "$Food",avgRating : {$avg : "$Rating"}}}]).sort({"avgRating" : -1});

    try{
        let tempA = {} , tempB = {};
        A.forEach(element => {
            tempA[element._id] = element.count;
        });
        B.forEach(element => {
            tempB[element._id] = element.avgRating;
        });
        let result = [];
        for(let i =0; i<A.length ; i++){
            if(A[i]._id  in tempB){
                result.push({_id : A[i]._id , count : A[i].count , avgRating : tempB[A[i]._id]});
            }else{
                result.push({_id : A[i]._id , count : A[i].count , avgRating : 0});
            }
        }
        for(let i =0; i<B.length ; i++){
            if(!(B[i]._id  in tempA)){
                result.push({_id : B[i]._id , count : 0 , avgRating : B[i].avgRating});
            }
        }
        return res.status(200).json(result)
    }
    catch{
        return res.status(500).json({message:"Error in Feching data, please try again."})
    }
}

exports.defaultformRatingOverall = async (req , res) =>{
    let A = await form.aggregate([{"$group" : {_id:"$DidLike", count:{$sum:1}}}]).sort({"_id" : 1});;
    let B = await form.aggregate([{"$group" : {_id:"$Rating", count:{$sum:1}}}]).sort({"_id" : 1});;

    try{
        return res.status(200).json({like : A , rating : B})
    }catch{
        return res.status(500).json({message:"Error in Feching data, please try again."})
    }
}

exports.defaultformRatingToday = async (req , res) =>{
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    var hours = ISTTime.getHours()

    var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.576+00:00]');
    // console.log("Next day -- " + (reqDate.getDate() + 1))
    var d = new Date();
    d.setDate(ISTTime.getDate() + 1);
    var tomorrow = moment(d).format('YYYY-MM-DD[T00:00:00.576+00:00]');


    let weekDay = DayinInt[ISTTime.getDay()];
        let timeOfDay = 'Dinner';
        if(hours >= 3 && hours < 12)
            timeOfDay="Breakfast";
        else if (hours >= 12 && hours < 16)
            timeOfDay="Lunch";
        else if (hours >= 16 && hours < 19)
            timeOfDay = "Snacks";
    let A = await form.aggregate([{$match  : 
        {
            createdAt : { 
                        $gte: new Date(today), 
                        $lt: new Date(tomorrow) 
                    }  , 
            day  : weekDay , 
            timing : timeOfDay
        } },
     {"$group" : {_id:"$DidLike", count:{$sum:1}}}]).sort({"_id" : 1});;
    let B = await form.aggregate([
        {$match  : 
        {
            createdAt : { 
            $gte: new Date(today), 
            $lt: new Date(tomorrow) 
        }  , day  : weekDay , timing : timeOfDay
        } },
        {"$group" : {_id:"$Rating", count:{$sum:1}}}]).sort({"_id" : 1});;

    try{
        return res.status(200).json({likeonePer : A , ratingonePer : B})
    }catch{
        return res.status(500).json({message:"Error in Feching data, please try again."})
    }
}


exports.defaultformSubmit = async (req , res) =>{
    let A = await form.aggregate([{"$group" : {_id:{ "day" : "$day" , "timing" : "$timing"}, count:{$sum:1}}}]).sort({"_id" : 1});

    try{
        return res.status(200).json(A)
    }catch{
        return res.status(500).json({message:"Error in Feching data, please try again."})
    }
}


exports.updateForm = (req, res)=>{
    form.findById(req.params.id,(err,foundItem)=>{
        if(err)
            return res.status(500).json({message:"Error in Feching Categary, please try again."});
        if(!foundItem)
            return res.status(500).json({message:"Form Doesn't exist, please check."});
            updatedItem = {
                DidLike : req.body.DidLike,
                Rating : req.body.Rating,
                Comment : req.body.Comment,
                UserId : req.body.UserId
            }
            form.findByIdAndUpdate(req.params.id , updatedItem , {
                new : true, 
                useFindAndModify : false 
            }).then((new_form,err)=>{
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

exports.deleteForm = (req ,res) =>{
    form.findById(req.params.id,(err,foundItem)=>{
        if(err)
            return res.status(500).json({message:"Error in Fecching Categary, please try again."});
        if(!foundItem)
            return res.status(500).json({message:"Categary Doesn't exist, please register."});
            form.findByIdAndDelete(req.params.id 
                // new : true, 
                // useFindAndModify : false 
            ).then((new_form,err)=>{
                if(err){
                   return res.status(500).json({error:"Server Error"})
                }
                
                res.status(200).json({message:"SuccesFully Deleted"})
            })
            .catch(err=>{
                res.status(400).json({message:"Deletion Error, Please Try Again",err})
            })
    })
}