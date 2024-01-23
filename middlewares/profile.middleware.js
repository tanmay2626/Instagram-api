const Profile = require("../models/profile.model");

// userId from auth middleware
exports.getProfileId = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.userId });

    req.profile = profile;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
