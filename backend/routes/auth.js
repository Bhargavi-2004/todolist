const express = require("express");

const router = express.Router();

router.get("/api/auth", async (req, res) => {
  res.send("auth api called");
});

module.exports = router;
