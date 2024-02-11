const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/api/auth", async (req, res) => {
  // Create a new user
  const saltRound = 10;
  const generateSalt = await bcrypt.genSalt(saltRound);
  const hashing = await bcrypt.hash(req.body.password, generateSalt);
  const newUser = await new User({
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

  newUser
    .save()
    .then(() => console.log("User created successfully"))
    .catch((err) => console.error("Error creating user:", err));
  res.json(newUser);
});

module.exports = router;
