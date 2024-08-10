const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Got all tasks");
});

router.post("/", (req, res) => {
  res.send("Created a new task");
});

router.get("/:id", (req, res) => {
  res.send("Got a specified task");
});

router.patch("/:id", (req, res) => {
  res.send("Updated a specified task");
});

router.delete("/:id", (req, res) => {
  res.send("Deleted a specified task");
});

module.exports = router;
