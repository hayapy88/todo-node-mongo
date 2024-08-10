const express = require("express");
const app = express();

const taskRoute = require("./routes/tasks");
const port = 3000;

app.use("/api/v1/tasks", taskRoute);

app.listen(port, console.log(`ToDo app listening on port ${port}`));
