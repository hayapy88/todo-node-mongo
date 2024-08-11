const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Task name is required."],
    trim: true,
    maxlength: [30, "Task name must be 20 characters or less."],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
