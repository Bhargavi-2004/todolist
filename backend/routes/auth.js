const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const router = express.Router();

// use it to sign web token and keep it safe
const JWT_SECRET = "IamGoodGirl";

// Create a new user : POST '/createuser' endpoint
router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
    body("email").isEmail().withMessage("Enter valis email format."),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 characters long."),
  ],
  async (req, res) => {
    let success = false;
    // validate req bpdy
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    // check weather user is exist with this email or not:
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        req.status(404).json({
          success,
          error: "Sorry, user with this Email is already exists.",
        });
      }

      const saltRound = 10;
      const generateSalt = await bcrypt.genSalt(saltRound);
      const hashing = await bcrypt.hash(req.body.password, generateSalt);
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashing, // Use a secure hashing algorithm for production
        date: Date.now(),
      });
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      newUser
        .save()
        .then(() => console.log("User created successfully"))
        .catch((err) => console.error("Error creating user:", err));
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("some error Ocuured");
    }
  }
);

// authentic a user: "POST" '/login' endpoint
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email."),
    body("password").exists().withMessage("Password cannot be blank."),
  ],
  async (req, res) => {
    let success = false;
    // validate login information
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        success = false;
        return res.status(400).json({
          errors: "Please try to login with correct email credentials.",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        success = false;
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error Ocuured");
    }
  }
);

// fetch user data: POST "/fetch" endpoint
router.post("/fetch", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error Ocuured");
  }
});
module.exports = router;
