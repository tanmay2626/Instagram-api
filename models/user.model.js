const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  posts: {
    type: SchemaTypes.ObjectId,
    ref: "Post",
  },
  follow: {
    type: SchemaTypes.ObjectId,
    ref: "Follow",
  },
  profile: {
    fullName: {
      type: String,
      default: "",
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profileImg: {
      type: String,
      default: "default-profile.png",
    },
    followers_count: {
      type: Number,
      default: 0,
    },
    following_count: {
      type: Number,
      default: 0,
    },
    post_count: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("user", userSchema);

module.exports = User;
