const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    calories: {
      type: {
        limit: Number,
        gain_loss: Number,
        consumed: Number,
        burned: Number,
        remaining: Number,
      },
      default: {
        gain_loss: 0,
        consumed: 0,
        burned: 0,
        remaining: 0,
      },
    },
    meals: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Meal",
      default: [],
    },
    workouts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Workout",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
