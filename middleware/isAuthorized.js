const jwt = require("jsonwebtoken");
const Async = require("./async.js");

module.exports = Async(async (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  const tokenData = jwt.verify(token, process.env.HASH_KEY);
  if (tokenData) {
    req._id = tokenData._id;
    return next();
  }
  res.status(401).json({ success: false, message: error.message, data: {} });
});
