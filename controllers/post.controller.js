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
