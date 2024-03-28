const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now 
  },
  text: {
    type: String,
    required: true 
  },
  images: [String]
});

const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;
