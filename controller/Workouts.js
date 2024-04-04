const Workout = require("../model/Workout.js");
const Async = require("../middleware/async.js");
const User = require("../model/User.js");

module.exports.getWorkouts = Async(async (req, res) => {
  const user = await User.findOne({ _id: req._id }).populate("workouts");
  res.status(200).json({
    success: true,
    message: "User workouts successfully retrieved!",
    data: { data: user.workouts, count: user.workouts.length },
  });
});

module.exports.postWorkouts = Async(async (req, res) => {
  const title = req.body.title;
  const calorie = req.body.calorie;

  const workout = await Workout.create({ title, calorie });

  const user = await User.findOne({ _id: req._id });
  user.workouts.push(workout._id);

  await user.save();
  res.status(201).json({
    success: true,
    message: "Workouts successfully added!",
    data: {
      data: workout,
    },
  });
});

module.exports.editWorkouts = Async(async (req, res) => {
  const workoutId = req.params.id;
  const title = req.body.title;
  const calorie = req.body.calorie;

  const workout = await Workout.findById(workoutId);
  workout.title = title;
  workout.calorie = calorie;

  await workout.save();

  return res.status(200).json({
    success: true,
    message: "Workout successfully updated!",
    data: { data: workout },
  });
});

module.exports.deleteWorkouts = Async(async (req, res) => {
  const workoutId = req.params.id;
  await Workout.findByIdAndDelete(workoutId);

  const user = await User.findById(req._id);
  user.workouts.pull(workoutId);
  user.save();

  return res.status(200).json({
    success: true,
    message: "Workout successfully deleted!",
    data: {},
  });
});
