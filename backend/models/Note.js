const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  tag: {
    type: String,
    default: "general",
  },
  date: {
    type: String,
    date: Date.now,
  },
});

const Note = mongoose.model("note", noteSchema);
module.exports = Note;
