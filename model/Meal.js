const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    calorie: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meal", MealSchema);
