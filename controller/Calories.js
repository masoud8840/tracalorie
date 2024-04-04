const User = require("../model/User.js");
const Async = require("../middleware/async.js");

module.exports.postCalories = Async(async (req, res) => {
  const user = await User.findById(req._id);
  res.status(200).json({
    success: true,
    message: "User daily limit has changed successfully!",
    data: {
      calories: user.calories,
    },
  });
});

module.exports.getCalories = Async(async (req, res) => {
  const user = await User.findById(req._id);
  if (!user) {
    const error = new Error("DatabaseError: User does not exist!");
    error.statusCode = 404;
    throw error;
  }
  return res.status(200).json({
    success: true,
    message: "User calories successfully retrieved!",
    calories: user.calories,
  });
});
