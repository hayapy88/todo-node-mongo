const getAllTasks = (req, res) => {
  res.send("Got all tasks");
};
const createTask = (req, res) => {
  res.send("Created a new task");
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
