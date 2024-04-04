const User = require("../model/User.js");
const Async = require("./async.js");

module.exports = Async(async (req, res, next) => {
  const user = await User.findById(req._id)
    .populate("meals")
    .populate("workouts");

  user.calories.limit = user.calories.limit || 0;
  user.calories.remaining = user.calories.limit;
  user.calories.burned = 0;
  user.calories.consumed = 0;
  user.calories.gain_loss = 0;

  if (req.method === "POST") {
    user.calories.limit = req.body.limit;
    user.calories.remaining = user.calories.limit;
  }

  user.meals.map((meal) => {
    user.calories.gain_loss += meal.calorie;
    user.calories.consumed += meal.calorie;
    user.calories.remaining -= meal.calorie;
  });

  user.workouts.map((workout) => {
    user.calories.burned += workout.calorie;
    user.calories.gain_loss -= workout.calorie;
  });

  await user.save();
  next();
});
