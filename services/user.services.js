const User = require("../models/user.model");

exports.registerUser = async (userDetails) => {
  try {
    const usernameExists = await User.findOne({
      username: userDetails.username,
    });
    if (usernameExists) {
      return {
        status: 400,
        user: { message: "Username already exists" },
      };
    }

    const emailExists = await User.findOne({
      email: userDetails.email,
    });
    if (emailExists) {
      return {
        status: 400,
        user: { message: "Email already exists" },
      };
    }

    const newUserObj = new User(userDetails);
    const userRegistered = await newUserObj.save();

    return {
      status: 200,
      user: userRegistered,
    };
  } catch (error) {
    return {
      status: 500,
      user: { message: error },
    };
  }
};
