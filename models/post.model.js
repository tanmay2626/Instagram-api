const { Schema, model, SchemaTypes } = require("mongoose");

const postSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  content: {
    type: String,
    required: true,
    default: "default-post.png",
  },
  caption: {
    type: String,
    default: "",
    maxLength: 150,
  },
  comments: [
    {
      user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      message: {
        type: String,
        required: true,
        default: "",
      },
      likes: [
        {
          type: SchemaTypes.ObjectId,
          ref: "User",
        },
      ],
      replies: [this],
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = model("post", postSchema);

module.exports = Post;
// tagged users
