const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organizedBy: {
    type: String,
    required: true
  },
  club: {
    type: String
  },
  image: {
    type: String, // 🌟 New field for storing image URL
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
