const express = require("express");
const router = express.Router();

const form_control = require("../controllers/formController");


router.get("/form" , form_control.fetchForms);

router.get("/form/average" , form_control.fetchAverage);

router.get("/form/like" , form_control.fetchAverageLike);

router.get("/form/defaultlike" , form_control.defaultformRatingOverall);

router.get("/form/totalsubmit" , form_control.defaultformSubmit);

router.get("/form/todaysubmit" , form_control.defaultformRatingToday);

router.get("/form/:id" , form_control.fetchFormPer);

router.get("/rating/:fooditem" , form_control.fetchFormPerFood);

router.post("/form" , form_control.newForm);

router.put('/form/:id' , form_control.updateForm);

router.delete('/form/:id' , form_control.deleteForm);

module.exports = router;