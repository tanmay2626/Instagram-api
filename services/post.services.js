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
        content: postDetails?.content,
        caption: postDetails?.caption,
        tags: postDetails?.tags,
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

exports.getAllPosts = async () => {
  try {
    const posts = await Post.find();
    return {
      status: 200,
      posts: posts,
    };
  } catch (error) {
    return {
      status: 500,
      post: { message: error.message },
    };
  }
};

exports.getPostById = async (postId) => {
  const x = new Types.ObjectId(postId);
  console.log(x);
  try {
    const post = await Post.findOne({ _id: new Types.ObjectId(postId) });
    if (!post) {
      return {
        status: 404,
        post: { message: "Post not found" },
      };
    } else {
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
