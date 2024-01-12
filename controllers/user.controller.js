const userService = require("../services/user.services");

exports.signInHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { status, token } = await userService.siginUser(username, password);
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
