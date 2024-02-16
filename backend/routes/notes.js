const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

router.get("/api/notes", async (req, res) => {
  const newNote = new Note({
    title: "exam",
    description: "Tommorrow is your exam day.",
    tag: "Finals",
    date: Date.now(),
  });
  newNote
    .save()
    .then(() => console.log("Notes created successfully"))
    .catch((err) => console.error("Error creating user:", err));
  res.json(newNote);
  console.log("Notes api called");
});

// Fetch all notes: '/fetchallnotes'
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.body.id });
    res.json(notes);
  } catch (error) {
    // error:
    console.log(error);
    res.status(500).send({ error: "Some Internal Server Error Ocuured." });
  }
});

// add a new note: '/addnote'
router.get(
  "/addnote",
  fetchUser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("The tite must be 3 characters long."),
    body("description")
      .isLength({ min: 5 })
      .withMessage(
        "Please write at least five characters in your description."
      ),
  ],
  async (req, res) => {
    // validate req body:
    const errors = validationResult(req);

    // if error Ocuured:
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      const notes = new Note({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });

      const savenotes = await notes.save();

      res.json({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
    } catch (error) {
      //error:
      console.log(error);
      res.status(500).send({ error: "Some Error Ocuured." });
    }
  }
);
module.exports = router;
