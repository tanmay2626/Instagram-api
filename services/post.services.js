const Post = require("../models/post.model");
const Follow = require("../models/follow.model");
const Comment = require("../models/comment.model");

exports.post = async (userId, profile, postDetails) => {
  try {
    // chech invalid post
    if (postDetails.content == undefined) {
      return {
        status: 401,
        post: { message: "Failed to uplaod content" },
      };
    } else {
      // create new post
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

exports.getPosts = async (profile) => {
  try {
    // profiles user follows
    const profiles = await Follow.find({ follower: profile._id });

    // TODO: limit number of posts based on createdAt
    // posts of those users
    const post = await Post.find({ profile: { $in: profiles } }).populate(
      "profile"
    );

    if (!post) {
      return {
        status: 400,
        post: { message: "No posts found" },
      };
    }
    return {
      status: 200,
      posts: post,
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
    // get post by postId
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

exports.getPostByUser = async (follower, following) => {
  try {
    const connected = await Follow.findOne({
      follower: follower._id,
      following: following,
    });
    // if account is public or I am the owner or we are connected
    if (
      follower.accountType == "public" ||
      follower._id == following ||
      connected
    ) {
      const posts = await Post.find({ profile: following }).populate("profile");
      if (!posts) {
        return {
          status: 400,
          post: { message: "Post Unavailable" },
        };
      } else {
        return {
          status: 200,
          post: posts,
        };
      }
    } else {
      // private account
      return {
        status: 201,
        post: { messgae: "Private Account" },
      };
    }
  } catch (error) {
    return {
      status: 500,
      posts: { message: error.message },
    };
  }
};

exports.comment = async (userId, profile, postId, comment) => {
  try {
    // create comment
    const newCommentObj = new Comment({
      user: userId,
      profile: profile._id,
      comment: comment,
    });
    const newComment = await newCommentObj.save();

    // add comment to post
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

exports.reply = async (userId, profile, commentId, comment) => {
  try {
    // create comment
    const newReplyObj = new Comment({
      user: userId,
      profile: profile._id,
      comment: comment,
    });
    const newReply = await newReplyObj.save();

    // add comment to replies
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

exports.like = async (userId, profile, postId) => {
  try {
    // add like
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: { _id: profile._id } },
      },
      { new: true }
    ).populate("likes");
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

exports.dislike = async (userId, profile, postId) => {
  try {
    // remove like
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: profile._id } },
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
