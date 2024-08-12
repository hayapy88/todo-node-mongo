const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

module.exports = connectDB;
