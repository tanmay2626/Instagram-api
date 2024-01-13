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

module.exports = router;
