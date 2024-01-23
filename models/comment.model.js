const { Schema, model, SchemaTypes } = require("mongoose");

const commentSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    profile: {
      type: SchemaTypes.ObjectId,
      ref: "Profile",
      required: true,
      index: true,
    },
    likes: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Profile",
      },
    ],
    comment: {
      type: String,
      required: true,
      default: "",
      maxLength: 100,
    },
    replies: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
