const express = require("express");
const { body } = require("express-validator");

const auth = require("../controller/Auth.js");

const router = express.Router();

const validationOptions = [
  body("email").isEmail().notEmpty().trim().withMessage("Invalid email type"),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Minimum password length of 6"),
];

router.post("/signup", validationOptions, auth.postUsers);
router.post("/login", validationOptions, auth.postLogin);

module.exports = router;
