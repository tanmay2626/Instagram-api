const { Types } = require("mongoose");
const Post = require("../models/post.model");
const Profile = require("../models/profile.model");
const Comment = require("../models/comment.model");

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
  // TODO: posts of followers
  try {
    const posts = await Post.find().populate({
      path: "profile",
      match: {
        accountType: "public",
      },
    });
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
    const post = await Post.findOne({ _id: postId }).populate("comment");
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

exports.getUserPosts = async (profileId) => {
  // TODO: get user post also when he is a follower or user himself
  try {
    const posts = await Post.find({ profile: profileId }).populate({
      path: "profile",
      match: {
        accountType: "public",
      },
    });
    if (!posts) {
      return {
        status: 404,
        posts: { message: "Posts not found" },
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
    const profile = await Profile.findOne({ user: userId });
    const newCommentObj = new Comment({
      user: userId,
      profile: profile._id,
      comment: comment,
    });
    const newComment = await newCommentObj.save();
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comment: newComment._id },
      },
      { new: true }
    ).populate("comment");
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

exports.createCommentReply = async (userId, commentId, comment) => {
  try {
    const profile = await Profile.findOne({ user: userId });
    const newReplyObj = new Comment({
      user: userId,
      profile: profile._id,
      comment: comment,
    });
    const newReply = await newReplyObj.save();

    const reply = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $push: { replies: newReply._id } },
      { new: true }
    ).populate("replies");

    if (!reply) {
      return {
        status: 401,
        post: { message: "Post not found" },
      };
    } else {
      return {
        status: 200,
        post: reply,
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
