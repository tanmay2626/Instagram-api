const Profile = require("../models/profile.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const updateUsername = async (username) => {
  const usernameExists = await Profile.findOne({
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
    });
    const userCreated = await newUserObj.save();

    const newProfileObj = new Profile({
      user: userCreated._id,
      username: usernameExists,
      fullName: userDetails.fullName,
    });
    const userRegistered = await newProfileObj.save();

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
    const user = await Profile.findOne({ username: username });
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
  const { username, fullName, bio, profileImg } = userDetails;

  const updateFields = {};
  if (username) updateFields.username = updateUsername(username);
  if (fullName) updateFields.fullName = fullName;
  if (bio) updateFields.bio = bio;
  if (profileImg) updateFields.profileImg = profileImg;
  try {
    const userExists = await Profile.findOneAndUpdate(
      { user: userId },
      updateFields,
      { new: true }
    );
    if (!userExists) {
      return {
        status: 401,
        user: { message: "User not found" },
      };
    }
    return {
      status: 200,
      user: userExists,
    };
  } catch (error) {
    return {
      status: 500,
      user: { message: error.message },
    };
  }
};
