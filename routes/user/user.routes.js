const express = require("express");
const router = express.Router();

router.get("/new_user", (req, res) => {
  console.log("Hello Tanmay");
  res.send("Hello new user");
});

module.exports = router;
