const Profile = require("../models/profile.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyUsername = async (username) => {
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

exports.siginUser = async (email, password) => {
  try {
    // verify email
    const existingUser = await User.findOne({
      email: email,
    });
    if (!existingUser) {
      return {
        status: 400,
        token: { message: "User not found" },
      };
    } else {
      // verify password
      const match = await bcrypt.compare(password, existingUser.password);

      if (match) {
        // generate token
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
    // verify username
    const usernameExists = await verifyUsername(userDetails.username);

    // verify email
    const emailExists = await User.findOne({
      email: userDetails.email,
    });
    if (emailExists) {
      return {
        status: 400,
        user: { message: "Email already exists" },
      };
    }

    // hash password and creater new user
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    const newUserObj = new User({
      email: userDetails.email,
      password: hashedPassword,
    });
    const userCreated = await newUserObj.save();

    // create new profile
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

exports.getProfile = async (username) => {
  try {
    // verify user
    const userExists = await Profile.findOne({ username: username });
    if (!userExists) {
      return {
        status: 401,
        user: { message: "User not found" },
      };
    } else {
      return {
        status: 200,
        user: userExists,
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

  // provided feilds object
  const updateFields = {};
  if (username) updateFields.username = updateUsername(username);
  if (fullName) updateFields.fullName = fullName;
  if (bio) updateFields.bio = bio;
  if (profileImg) updateFields.profileImg = profileImg;

  try {
    // verify user and update profile
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
