const { Types } = require("mongoose");
const Post = require("../models/post.model");

exports.createPost = async (userId, postDetails) => {
  try {
    if (postDetails.content == undefined) {
      return {
        status: 401,
        post: { message: "Failed to uplaod content" },
      };
    } else {
      const newPost = new Post({
        user: new Types.ObjectId(userId),
        content: postDetails.content,
      });
      const post = await newPost.save();

      return {
        status: 200,
        post: post,
      };
    }
  } catch (error) {
    return {
      status: 500,
      post: { message: error.message },
    };
  }
};
