const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");

router.post(
  "/post/create-post",
  middleware.Authenticate,
  postController.createPostHandler
);
router.get("/post/posts", postController.getAllPostsHandler);
router.get("/post/:postId", postController.getPostByIdHandler);
router.get("/post/user/:userId", postController.getUserPostsHandler);
router.put(
  "/post/:postId/comment/",
  middleware.Authenticate,
  postController.createCommentHandler
);
router.put(
  "/post/:postId/comment/:commentId/reply",
  middleware.Authenticate,
  postController.createCommentReplyHandler
);

router.put(
  "/post/:postId/like/",
  middleware.Authenticate,
  postController.addLikeHandler
);

router.delete(
  "/post/:postId/unlike/",
  middleware.Authenticate,
  postController.unLikeHandler
);

module.exports = router;
