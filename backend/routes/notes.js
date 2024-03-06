const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// router.get("/api/notes", async (req, res) => {
//   const newNote = new Note({
//     title: "exam",
//     description: "Tommorrow is your exam day.",
//     tag: "Finals",
//     date: Date.now(),
//   });
//   newNote
//     .save()
//     .then(() => console.log("Notes created successfully"))
//     .catch((err) => console.error("Error creating user:", err));
//   res.json(newNote);
// });

// Fetch all notes: '/fetchallnotes'
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // error:
    console.log(error);
    res.status(500).send({ error: "Some Internal Server Error Ocuured." });
  }
});

// add a new note: '/addnote'
router.post(
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

// Update Existing Node: '/updatenote'
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // create a new node object
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    // find the note be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Delete existing Note: '/deletenote'
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //find the note to be deleted and delete it:
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //If you find the note then delete it:
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ sucess: "Note has been deleted!", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
