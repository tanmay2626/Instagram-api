const userService = require("../services/user.services");

exports.signInHandler = async (req, res) => {
  try {
    const { status, token } = await userService.siginUser(
      req.body.email,
      req.body.password
    );
    res.status(status).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerHandler = async (req, res) => {
  try {
    const { status, user } = await userService.registerUser(req.body);
    res
      .status(status)
      .json({ message: "User registered successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editProfileHandler = async (req, res) => {
  try {
    const { status, user } = await userService.editProfile(
      req.body,
      req.userId
    );
    res
      .status(status)
      .json({ message: "Profile updated successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfileHandler = async (req, res) => {
  try {
    const { status, user } = await userService.getProfile(req.params.username);
    res.status(status).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
