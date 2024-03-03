const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')

const app = express();
const port = 5000;

// for cross platforms:
app.use(cors());

// to access req body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Part!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Listening on port numbe: ${port}`);
});

connectToMongo();
