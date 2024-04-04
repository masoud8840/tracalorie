const express = require("express");

const calories = require("../controller/Calories.js");
const isAuth = require("../middleware/isAuthorized.js");
const dailyLimitCheck = require("../middleware/dailyLimitCheck.js");

const router = express.Router();

router
  .route("/")
  .all(isAuth, dailyLimitCheck)
  .post(calories.postCalories)
  .get(calories.getCalories);

module.exports = router;
