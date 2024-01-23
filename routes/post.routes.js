const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");
const { getProfileId } = require("../middlewares/profile.middleware");

// posts
router.post(
  "/post/create",
  middleware.Authenticate,
  getProfileId,
  postController.postHandler
);
router.get(
  "/post/posts",
  middleware.Authenticate,
  getProfileId,
  postController.getPostsHandler
);
router.get(
  "/post/:postId",
  middleware.Authenticate,
  postController.getPostByIdHandler
);
router.get(
  "/post/profile/:profileId",
  middleware.Authenticate,
  getProfileId,
  postController.getPostByUserHandler
);

// comment
router.put(
  "/post/:postId/comment/",
  middleware.Authenticate,
  getProfileId,
  postController.commentHandler
);
router.put(
  "/post/:postId/comment/:commentId/reply",
  middleware.Authenticate,
  getProfileId,
  postController.replyHandler
);

// like
router
  .route("/post/:postId/like/")
  .put(middleware.Authenticate, getProfileId, postController.likeHandler)
  .delete(middleware.Authenticate, getProfileId, postController.dislikeHandler);

module.exports = router;
