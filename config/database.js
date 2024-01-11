const mongoose = require("mongoose");
const url = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(url.database.url);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
