const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

const port = process.env.PORT || 3000;

app.use("/api/v1/tasks", taskRoute);

const start = async () => {
  try {
    await connectDB(
      process.env.HEROKU_DATABASE_URL || process.env.DATABASE_URL
    );
    app.listen(port, () => {
      console.log(`To-Do App listening on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};
start();
