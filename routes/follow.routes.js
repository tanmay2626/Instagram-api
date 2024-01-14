const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth.middleware");
const followController = require("../controllers/follow.controller");

router.post(
  "/follow-user",
  middleware.Authenticate,
  followController.followUserHandler
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
