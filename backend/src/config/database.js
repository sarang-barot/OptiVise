const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Databse Connection Sucessfull");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDb;
