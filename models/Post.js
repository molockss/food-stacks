const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  area: { 
    type: String,
    require: true,
  },
  menu: {
    type: String,
    require: true,
  },
  ingredients: {
    type: [String],
    require: true,
  },

  rating: {
    type: String,
  
  },
  directions: {
    type: [String],
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  bookmarks: {
    type: Array,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
