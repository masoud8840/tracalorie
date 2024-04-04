const express = require("express");

const meals = require("../controller/Meals.js");
const isAuth = require("../middleware/isAuthorized.js");

const router = express.Router();

router.route("/").all(isAuth).get(meals.getMeals).post(meals.postMeals);
router.route("/:id").all(isAuth).put(meals.editMeals).delete(meals.deleteMeals);

module.exports = router;
