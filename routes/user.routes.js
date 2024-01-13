const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const middleware = require("../middlewares/auth.middleware");

router.post("/user/signin", userController.signInHandler);
router.post("/user/register", userController.registerHandler);
router.patch(
  "/user/edit-profile",
  middleware.Authenticate,
  userController.editProfileHandler
);
router.get("/user/:username", userController.getUserProfileHandler);

module.exports = router;
