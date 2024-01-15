const { Schema, model, SchemaTypes } = require("mongoose");

const postSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  likes: [
    {
      user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        unique: true,
      },
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
        maxLength: 100,
      },
      likes: [
        {
          user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            unique: true,
          },
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

//postSchema.index({ user: 1 });
const Post = model("Post", postSchema);

module.exports = Post;
// tagged users
