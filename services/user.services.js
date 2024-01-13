const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { Types } = require("mongoose");

const updateUsername = async (username) => {
  const usernameExists = await User.findOne({
    username: username,
  });
  if (usernameExists) {
    return {
      status: 400,
      user: { message: "Username already exists" },
    };
  } else {
    return username;
  }
};

exports.siginUser = async (username, password) => {
  try {
    const existingUser = await User.findOne({
      username: username,
    });
    if (!existingUser) {
      return {
        status: 400,
        token: { message: "User not found" },
      };
    } else {
      const match = await bcrypt.compare(password, existingUser.password);

      if (match) {
        const token = jwt.sign(
          { userId: existingUser._id },
          config.jwt.secret,
          { expiresIn: "7d" }
        );

        return {
          status: 200,
          token: token,
        };
      } else {
        return {
          status: 400,
          token: { message: "Incorrect password" },
        };
      }
    }
  } catch (error) {
    return {
      status: 500,
      token: { message: error.message },
    };
  }
};

exports.registerUser = async (userDetails) => {
  try {
    const usernameExists = await updateUsername(userDetails.username);

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
      username: usernameExists,
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

exports.getUserProfile = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return {
        status: 401,
        user: { message: "User not found" },
      };
    } else {
      return {
        status: 200,
        user: user,
      };
    }
  } catch (error) {
    return {
      status: 500,
      user: { message: error.message },
    };
  }
};

exports.editProfile = async (userDetails, userId) => {
  const { username, fullName, password, bio, profileImg } = userDetails;

  const updateFields = {};
  if (username) updateFields.username = updateUsername(username);
  if (fullName) updateFields.fullName = fullName;
  if (password) updateFields.password = password;
  if (bio) updateFields["profile.bio"] = bio;
  if (profileImg) updateFields["profile.profileImg"] = profileImg;
  try {
    const user = await User.findByIdAndUpdate(
      new Types.ObjectId(userId),
      updateFields,
      { new: true }
    );
    if (!user) {
      return {
        status: 401,
        user: { message: "User not found" },
      };
    }
    return {
      status: 200,
      user: user,
    };
  } catch (error) {
    return {
      status: 500,
      user: { message: error.message },
    };
  }
};
