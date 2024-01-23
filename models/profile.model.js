const { Schema, model, SchemaTypes } = require("mongoose");

const profileSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    select: false, // populated only when explicitely requested --to improve query performance
  },
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
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
  birthDate: {
    type: String,
    //required: true,
  },
  accountType: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  requests: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Profile",
    },
  ],
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
