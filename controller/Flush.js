const User = require("../model/User.js");
const Async = require("../middleware/async.js");
const Meal = require("../model/Meal");
const Workout = require("../model/Workout");

module.exports.getFlush = Async(async (req, res) => {
  try {
    const user = await User.findById(req._id);

    user.calories.burned = 0;
    user.calories.consumed = 0;
    user.calories.gain_loss = 0;
    user.calories.limit = 0;
    user.calories.remaining = 0;

    user.meals.map(async (meal) => {
      await user.meals.pull(meal._id);
      await Meal.findByIdAndDelete(meal._id);
    });

    user.workouts.map(async (workout) => {
      await user.workouts.pull(workout._id);
      await Workout.findByIdAndDelete(workout._id);
    });

    await user.save();
  } catch (e) {
    console.log(e.message);
  }

  res.status(200).json({
    success: true,
    message: "Users data successfully deleted!",
    data: {},
  });
});
