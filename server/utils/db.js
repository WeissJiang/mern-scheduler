require('dotenv').config();
const mongoose = require('mongoose');

const setupDB = async () => {
  try {
    // Connect to MongoDB
    mongoose
      .connect(process.env.DB_URL, {
      })
      .then(() =>
        console.log(`MongoDB Connected!`)
      )
      .catch(err => console.log(err));
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};

module.exports = setupDB;