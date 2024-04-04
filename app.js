const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");

// Routes file
const auth = require("./routes/Auth.js");
const meals = require("./routes/Meals.js");
const workouts = require("./routes/Workouts.js");
const calories = require("./routes/Calories.js");
const flush = require("./routes/Flush.js");

const connectToDB = require("./middleware/mongoDB.js");

dotenv.config();
connectToDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", auth);
app.use("/api/v1/meals", meals);
app.use("/api/v1/workouts", workouts);
app.use("/api/v1/calories", calories);
app.use("/api/v1/flush", flush);

app.listen(3000);
