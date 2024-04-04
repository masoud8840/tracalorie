const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../model/User.js");
const Async = require("../middleware/async.js");

module.exports.postUsers = Async(async (req, res) => {
  const validationRequest = validationResult(req).errors[0];

  if (validationResult(req).isEmpty()) {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        success: true,
        message: "User already exist! Maybe try to login?",
        data: {},
      });
    }

    const hashedPassword = await bcrypt.hash(password, 14);
    await User.create({ email, password: hashedPassword });
    return res.status(201).json({
      success: true,
      data: {},
      message: "User successfully created! You can login now",
    });
  }

  const validationErr = new Error(`ValidationError: ${validationRequest.msg}`);
  validationErr.statusCode = 422;
  throw validationErr;
});

module.exports.postLogin = Async(async (req, res) => {
  const error = new Error("");

  if (validationResult(req).isEmpty()) {
    const email = req.body.email;
    const password = req.body.password;

    // check for email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // check for password
      const doesPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      // generate JWT token
      if (doesPasswordMatch) {
        const token = jwt.sign(
          {
            _id: existingUser._id,
            email: existingUser.email,
            meals: existingUser.meals,
            workouts: existingUser.workouts,
          },
          process.env.HASH_KEY,
          {
            expiresIn: "2h",
          }
        );

        return res.status(200).json({
          success: true,
          message: "You logged in successfully! Thanks for joining us",
          data: {
            token,
            expiresIn: Date.now() + 7200000,
          },
        });
      }
      error.message = "ValidationError: Wrong credentials!";
      throw error;
    }
    error.message = "DatabaseError: User does not exist!";
    throw error;
  }

  error.message = "ValidationError: Wrong credentials!";
  error.statusCode = 422;
  throw error;
});
