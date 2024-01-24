const { Schema, model, SchemaTypes } = require("mongoose");

const postSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      select: false,
    },
    profile: {
      type: SchemaTypes.ObjectId,
      ref: "Profile",
      index: true,
    },
    content: {
      type: SchemaTypes.Array,
      default: ["default-post.png"],
    },
    likes: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Profile",
      },
    ],
    caption: {
      type: String,
      default: "",
      trim: true,
      maxLength: 150,
    },
    location: {
      type: String,
    },
    comment: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Comment",
      },
    ],
    hashtag: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

//postSchema.index({ user: 1 });
const Post = model("Post", postSchema);

module.exports = Post;
// TODO:
// tagged users
// make refs requierd
// enable index for user
