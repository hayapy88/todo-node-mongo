const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
};
const createTask = async (req, res) => {
  try {
    const createdTask = await Task.create(req.body);
    res.status(200).json(createdTask);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res.status(404).json(`_id: ${req.params.id} is not found.`);
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json(`_id: ${req.params.id} is not found.`);
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id });
    if (!deletedTask) {
      return res.status(404).json(`_id: ${req.params.id} is not found.`);
    }
    res.status(200).json(deletedTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
