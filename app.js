const express = require("express");
const app = express();
const port = 3000;

app.get("/api/v1/tasks", (req, res) => {
  res.send("Got all tasks");
});

app.post("/api/v1/tasks", (req, res) => {
  res.send("Created a new task");
});

app.get("/api/v1/tasks/:id", (req, res) => {
  res.send("Got a specified task");
});

app.patch("/api/v1/tasks/:id", (req, res) => {
  res.send("Updated a specified task");
});

app.delete("/api/v1/tasks/:id", (req, res) => {
  res.send("Deleted a specified task");
});

app.listen(port, console.log(`ToDo app listening on port ${port}`));
