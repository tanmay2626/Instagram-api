const { Types } = require("mongoose");
const Follow = require("../models/follow.model");
const User = require("../models/user.model");

exports.followUser = async (followerId, followingId) => {
  try {
    const userExists = await User.findOne({ _id: followingId });

    if (!userExists) {
      return {
        status: 404,
        message: "User does not exist",
      };
    } else {
      const Request = new Follow({
        followerId: new Types.ObjectId(followerId),
        followingId: new Types.ObjectId(followingId),
      });

      const followReq = await Request.save();

      if (!followReq) {
        return {
          status: 400,
          message: "Invalid follow request",
        };
      } else {
        return {
          status: 200,
          message: "Successfully requested",
        };
      }
    }
  } catch (error) {
    if (error.code === 11000) {
      return {
        status: 409,
        message: "Duplicate follow request.",
      };
    } else {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
};

exports.getFollowing = async (userId) => {
  try {
    const following = await Follow.find({
      followerId: new Types.ObjectId(userId),
    }).populate({
      path: "followingId",
      select: "username profile.profileImg fullName",
    });
    if (!following) {
      return {
        status: 400,
        message: following,
      };
    } else {
      return {
        status: 200,
        message: following,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

exports.getFollowers = async (userId) => {
  try {
    const followers = await Follow.find({
      followingId: new Types.ObjectId(userId),
    }).populate({
      path: "followerId",
      select: "username profile.profileImg fullName",
    });
    if (!followers) {
      return {
        status: 400,
        message: followers,
      };
    } else {
      return {
        status: 200,
        message: followers,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

exports.unfollow = async (userId) => {
  try {
    const unfollow = await Follow.findOneAndDelete({ followingId: userId });
    if (!unfollow) {
      return {
        status: 400,
        message: "Failed to unfollow",
      };
    } else {
      return {
        status: 200,
        message: "Successfully unfollowed",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
