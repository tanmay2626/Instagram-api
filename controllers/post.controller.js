const postServices = require("../services/post.services");

exports.createPostHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.createPost(
      req.userId,
      req.body
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPostsHandler = async (req, res) => {
  try {
    const { status, posts } = await postServices.getAllPosts();
    res.status(status).json({ posts: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostByIdHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.getPostById(req.params.postId);
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPostsHandler = async (req, res) => {
  try {
    const { status, posts } = await postServices.getUserPosts(
      req.params.profileId
    );
    res.status(status).json({ posts: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCommentHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.createComment(
      req.userId,
      req.params.postId,
      req.body.comment
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCommentReplyHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.createCommentReply(
      req.userId,
      req.params.commentId,
      req.body.comment
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addLikeHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.addLike(
      req.userId,
      req.params.postId
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unLikeHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.unLike(
      req.userId,
      req.params.postId
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
