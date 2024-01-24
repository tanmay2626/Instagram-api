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

exports.acceptRequest = async (userId, followerId, accept) => {
  try {
    await Profile.findOneAndUpdate(
      {
        user: userId,
      },
      { $pull: { requests: followerId } },
      { new: true }
    );
    if (accept == "true") {
      const followingId = await Profile.findOne({ user: userId });
      const newFollowerObj = new Follow({
        follower: followerId,
        following: followingId,
      }).save();
      return {
        status: 200,
        message: "Request accepted",
      };
    } else {
      return {
        status: 201,
        message: "Request denied",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

exports.getFollowing = async (userId) => {
  const profile = await Profile.findOne({ user: userId });
  try {
    const following = await Follow.find({
      follower: profile._id,
    }).populate("following");
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
  const profile = await Profile.findOne({ user: userId });

  try {
    const followers = await Follow.find({
      following: profile._id,
    }).populate("follower");
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
    const unfollow = await Follow.findOneAndDelete({
      following: userId,
    });
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
