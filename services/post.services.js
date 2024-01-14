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

exports.getUserPosts = async (userId) => {
  try {
    const posts = await Post.find({ user: new Types.ObjectId(userId) });
    if (!posts) {
      return {
        status: 404,
        posts: { message: "Post not found" },
      };
    } else {
      return {
        status: 200,
        posts: posts,
      };
    }
  } catch (error) {
    return {
      status: 500,
      posts: { message: error.message },
    };
  }
};

exports.createComment = async (userId, postId, comment) => {
  try {
    const newComment = {
      user: new Types.ObjectId(userId),
      message: comment,
    };
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: newComment },
      },
      { new: true }
    ).populate({
      path: "comments.user",
      select: "username profile.profileImg",
    });
    if (!post) {
      return {
        status: 401,
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

exports.createCommentReply = async (userId, postId, commentId, comment) => {
  try {
    const newReply = {
      user: new Types.ObjectId(userId),
      message: comment,
    };
    const post = await Post.findOneAndUpdate(
      { _id: postId, "comments._id": commentId },
      { $push: { "comments.$.replies": newReply } },
      { new: true }
    ).populate({
      path: "comments.replies.user",
      select: "username profile.profileImg",
    });
    if (!post) {
      return {
        status: 401,
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
