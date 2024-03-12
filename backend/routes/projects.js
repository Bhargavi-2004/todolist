const express = require("express");
const Project = require("../models/Project");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post("/fetchallprojects", fetchUser, async (req, res) => {
  try {
    console.log(req.user.id);
    const project = await Project.find({ user: req.user.id });
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Some Internal Server Error Ocuured." });
  }
});

router.post(
  "/addproject",
  fetchUser,
  [
    body("projectTitle")
      .isLength({ min: 3 })
      .withMessage("The tite must be 3 characters long."),
  ],
  async (req, res) => {
    // validate req body:
    const errors = validationResult(req);

    // if error Ocuured:
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      const { projectTitle, projectLink } = req.body;

      const project = new Project({
        user: req.user.id,
        projectTitle: projectTitle,
        projectLink: projectLink,
      });

      const savenotes = await project.save();

      res.json({
        user: req.user.id,
        projectTitle: projectTitle,
        projectLink: projectLink,
      });
    } catch (error) {
      //error:
      console.log(error);
      return res.status(500).send({ error: "Some Error Ocuured." });
    }
  }
);

router.delete("/deleteproject/:id", fetchUser, async (req, res) => {
  // validate user:
  const errors = validationResult(req);

  // if error occures:
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  try {
    //find the project to be deleted and delete it:
    let project = new Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Not Found!");
    }

    // Allow deletion only if user owns this project:
    if (project.user.toString() !== req.params.id) {
      return res.status(401).send("Not Allowed");
    }

    // If you find the project then delete it:
    project = await Project.findByIdAndDelete(req.params.id);
    res.json({ sucess: "Note has been deleted!", project: project });
  } catch (error) {
    // error:
    return res.status(500).send({ error: "Some Internal error occures!" });
  }
});

module.exports = router;
