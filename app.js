const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const port = 3000;

app.use("/api/v1/tasks", taskRoute);

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL);
    app.listen(port, console.log(`ToDo app listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
