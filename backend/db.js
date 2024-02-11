const mongoose = require("mongoose");
const mongourl = "mongodb://localhost:27017/todolist";

function connectToMongo() {
  try {
    mongoose.connect(mongourl);
    console.log("Conneted SuccessFully!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToMongo;
