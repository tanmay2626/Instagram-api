const { Types } = require("mongoose");
const Follow = require("../models/follow.model");
const Profile = require("../models/profile.model");

exports.followUser = async (followerId, followingId) => {
  try {
    // followerId  - my userId
    // followingId - other person's profileId
    const followerProfile = await Profile.findOne({ user: followerId });
    const existingRequest = await Profile.findOne({
      _id: followingId,
      requests: followerProfile,
    });

    if (existingRequest) {
      return {
        status: 400,
        message: "You have already sent a follow request to this user.",
      };
    } else {
      const request = await Profile.findOneAndUpdate(
        { _id: followingId },
        { $push: { requests: followerProfile } },
        { new: true }
      ).populate("requests");

      if (!request) {
        return {
          status: 400,
          message: "Follow request failed",
        };
      }

      return {
        status: 200,
        message: request,
      };
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
