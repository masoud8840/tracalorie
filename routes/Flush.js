const express = require("express");

const isAuth = require("../middleware/isAuthorized.js");
const flush = require("../controller/Flush.js");

const router = express.Router();

router.route("/").all(isAuth).get(flush.getFlush);

module.exports = router;
