const Meal = require("../model/Meal.js");
const Async = require("../middleware/async.js");
const User = require("../model/User.js");

module.exports.getMeals = Async(async (req, res) => {
  const user = await User.findById(req._id).populate("meals");

  if (user) {
    return res.status(200).json({
      success: true,
      message: "User meals successfully retrieved!",
      data: { data: user.meals, count: user.meals.length },
    });
  }

  const err = new Error("AuthorizationError: User is not authorizaed!");
  err.statusCode = 401;
  throw err;
});

module.exports.postMeals = Async(async (req, res) => {
  const title = req.body.title;
  const calorie = req.body.calorie;

  const meal = await Meal.create({ title, calorie });
  const user = await User.findOne({ _id: req._id });
  user.meals.push(meal._id);

  await user.save();
  res.status(201).json({
    success: true,
    message: "Meal successfully added!",
    data: {
      data: meal,
    },
  });
});

module.exports.editMeals = Async(async (req, res) => {
  const mealId = req.params.id;
  const title = req.body.title;
  const calorie = req.body.calorie;

  const meal = await Meal.findById(mealId);
  meal.title = title;
  meal.calorie = calorie;

  await meal.save();

  return res.status(200).json({
    success: true,
    message: "Meal successfully updated!",
    data: { data: meal },
  });
});

module.exports.deleteMeals = Async(async (req, res) => {
  const mealId = req.params.id;
  await Meal.findByIdAndDelete(mealId);

  const user = await User.findById(req._id);
  user.meals.pull(mealId);
  user.save();

  return res.status(200).json({
    success: true,
    message: "Meal successfully deleted!",
    data: {},
  });
});
