const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  res.send("Got all tasks");
};
const createTask = async (req, res) => {
  try {
    const createTask = await Task.create(req.body);
    res.status(200).json(createTask);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getSingleTask = (req, res) => {
  res.send("Got a specified task");
};
const updateTask = (req, res) => {
  res.send("Updated a specified task");
};
const deleteTask = (req, res) => {
  res.send("Deleted a specified task");
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
