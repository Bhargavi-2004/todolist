var jwt = require("jsonwebtoken");

const JWT_SCERET = "IamGoodGirl";

// Middleware to verify JWT token:
const fetchUser = (req, res, next) => {
  // Get the user from JWT token:
  const token = req.header("auth-token");

  if (!token) {
    // error:
    res.status(401).send({ error: "Please authenticate Using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SCERET);
    console.log(data);
    req.user = data.user;
    next();
  } catch (error) {
    // error:
    console.log(error);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
