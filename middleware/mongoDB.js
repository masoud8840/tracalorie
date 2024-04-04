const mongoose = require("mongoose");
const Async = require("./async");

module.exports = Async(async () => {
  const res = await mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDB Connected".green);
});
