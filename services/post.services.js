const { Types } = require("mongoose");
const Post = require("../models/post.model");
const Profile = require("../models/profile.model");

exports.createPost = async (userId, postDetails) => {
  try {
    if (postDetails.content == undefined) {
      return {
        status: 401,
        post: { message: "Failed to uplaod content" },
      };
    } else {
      // TODO: Update - remove this and send profile from client
      const profile = await Profile.findOne({ user: userId });

      if (!profile) {
        return {
          status: 400,
          post: { message: "Profile not found" },
        };
      }
      const newPost = new Post({
        user: userId,
        profile: profile._id,
        content: postDetails?.content,
        caption: postDetails?.caption,
        hashtag: postDetails?.tags,
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
    // TODO: Refactor the reply thread
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

exports.addLike = async (userId, postId) => {
  const likedUser = {
    user: new Types.ObjectId(userId),
  };
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: likedUser },
      },
      { new: true }
    ).populate({
      path: "likes.user",
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

exports.unLike = async (userId, postId) => {
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: { user: userId } } },
      { new: true }
    );
    if (!post) {
      return {
        status: 400,
        post: { message: "Like not found" },
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
