const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authToken = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  if (!token) {
    res.status(401).json({
      status: "ERROR",
      message: "Access denied",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err)
      return res.status(403).json({
        status: "ERROR",
        message: "Invalid token",
      });
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        status: "ERROR",
        message: "Access denied",
      });
    }
  });
};

const authUserToken = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  if (!token) {
    res.status(401).json({
      status: "ERROR",
      message: "Access denied",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err)
      return res.status(403).json({
        status: "ERROR",
        message: "Invalid token",
      });
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(401).json({
        status: "ERROR",
        message: "Access denied",
      });
    }
  });
};

module.exports = { authToken, authUserToken };
