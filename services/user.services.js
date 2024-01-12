const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    const newUserObj = new User({
      email: userDetails.email,
      username: userDetails.username,
      password: hashedPassword,
      fullName: userDetails.fullName,
    });
    const userRegistered = await newUserObj.save();

    return {
      status: 200,
      user: userRegistered,
    };
  } catch (error) {
    return {
      status: 500,
      user: { message: error.message },
    };
  }
};