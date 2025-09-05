const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECTION);
    console.log("database Connected!");
  } catch (error) {
    throw error;
  }
};

module.exports = dbConnection;
