const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String, // you can use user name or userId
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Announcement', announcementSchema);
