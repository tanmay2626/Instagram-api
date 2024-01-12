const userService = require("../services/user.services");

exports.signInHandler = (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
};

exports.registerHandler = async (req, res) => {
  try {
    const { status, user } = await userService.registerUser(req.body);
    res.status(status).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
