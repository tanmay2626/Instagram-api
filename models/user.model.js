const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    //required: true,
  },
  fullName: {
    type: String,
    default: "",
    required: true,
  },
  profile: {
    bio: {
      type: String,
      default: "",
    },
    profileImg: {
      type: String,
      default: "default-profile.png",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("User", userSchema);

module.exports = User;
