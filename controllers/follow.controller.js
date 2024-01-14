const followServices = require("../services/follow.services");

exports.followUserHandler = async (req, res) => {
  try {
    const { status, message } = await followServices.followUser(
      req.userId,
      req.body.userId
    );
    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getFollowingHandler = async (req, res) => {
  try {
    const { status, message } = await followServices.getFollowing(req.userId);
    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFollowersHandler = async (req, res) => {
  try {
    const { status, message } = await followServices.getFollowers(req.userId);
    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unfollowHandler = async (req, res) => {
  try {
    const { status, message } = await followServices.unfollow(req.body.userId);
    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
