const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.Authenticate = async (req, res, next) => {
  console.log("1 - Log middleware");

  try {
    const tokenString = req.headers?.authorization;
    const token = tokenString.split(" ")[1];

    if (!token) {
      res.status(400).json({ message: "You are not authenticated" });
    } else {
      const decodedUserData = jwt.verify(token, config.jwt.secret);
      req.userId = decodedUserData?.userId;
      next();
    }
  } catch (error) {
    if (error) res.status(500).json({ message: error.message });
  }
};
