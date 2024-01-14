const { SchemaTypes, Schema, model } = require("mongoose");

const followSchema = new Schema({
  followerId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  followingId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Follow = model("Follow", followSchema);
Follow.collection.createIndex(
  { followerId: 1, followingId: 1 },
  { unique: true }
);

module.exports = Follow;
