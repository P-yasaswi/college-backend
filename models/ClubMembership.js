const mongoose = require('mongoose');

const clubMembershipSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('ClubMembership', clubMembershipSchema);
