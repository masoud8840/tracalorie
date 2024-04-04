const express = require("express");

const workouts = require("../controller/Workouts.js");
const isAuth = require("../middleware/isAuthorized.js");

const router = express.Router();

router
  .route("/")
  .all(isAuth)
  .get(workouts.getWorkouts)
  .post(workouts.postWorkouts);

router
  .route("/:id")
  .all(isAuth)
  .put(workouts.editWorkouts)
  .delete(workouts.deleteWorkouts);

module.exports = router;
