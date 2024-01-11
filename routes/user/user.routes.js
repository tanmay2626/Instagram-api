const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

router.post("/user/signin", userController.signInHandler);
router.post("/user/register", userController.registerHandler);

module.exports = router;
