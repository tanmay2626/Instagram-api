const postServices = require("../services/post.services");

exports.postHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.post(
      req.userId,
      req.profile,
      req.body
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostsHandler = async (req, res) => {
  try {
    const { status, posts } = await postServices.getPosts(req.profile);
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

exports.getPostByUserHandler = async (req, res) => {
  try {
    const { status, posts } = await postServices.getPostByUser(
      req.profile,
      req.params.profileId
    );
    res.status(status).json({ posts: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.commentHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.comment(
      req.userId,
      req.profile,
      req.params.postId,
      req.body.comment
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.replyHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.reply(
      req.userId,
      req.profile,
      req.params.commentId,
      req.body.comment
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.like(
      req.userId,
      req.profile,
      req.params.postId
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.dislikeHandler = async (req, res) => {
  try {
    const { status, post } = await postServices.dislike(
      req.userId,
      req.profile,
      req.params.postId
    );
    res.status(status).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
