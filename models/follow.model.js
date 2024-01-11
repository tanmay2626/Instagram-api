const { Schema, model } = require("mongoose");

const followSchema = new Schema({
  follower_id: {
    type: String,
    required: true,
  },
  following_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Follow = model("follow", followSchema);

module.exports = Follow;
