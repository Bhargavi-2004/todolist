const express = require("express");
const router = express.Router();

router.get("/api/notes", async (req, res) => {
  res.send("Notes api called");
});

module.exports = router;
