const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const middleware = require("../middlewares/auth.middleware");
const followController = require("../controllers/follow.controller");

// User and Profile
router.post("/user/signin", userController.signInHandler);
router.post("/user/register", userController.registerHandler);
router.patch(
  "/user/edit-profile",
  middleware.Authenticate,
  userController.editProfileHandler
);
router.get("/user/:username", userController.getProfileHandler);

// Follow requests
router.post(
  "/user/follow",
  middleware.Authenticate,
  followController.followUserHandler
);
router.post(
  "/user/accept",
  middleware.Authenticate,
  followController.acceptRequestHandler
);
router.get(
  "/following",
  middleware.Authenticate,
  followController.getFollowingHandler
);
router.get(
  "/followers",
  middleware.Authenticate,
  followController.getFollowersHandler
);
router.delete(
  "/unfollow",
  middleware.Authenticate,
  followController.unfollowHandler
);

module.exports = router;
