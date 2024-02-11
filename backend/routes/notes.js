const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

router.get("/api/notes", async (req, res) => {
  const newNote = new Note({
    title: "Practical Exams2",
    description: "be prepared plz2",
    tag: "nothing",
    date: Date.now(),
  });
  newNote
    .save()
    .then(() => console.log("Notes created successfully"))
    .catch((err) => console.error("Error creating user:", err));
  res.json(newNote);
  console.log("Notes api called");
});

module.exports = router;
