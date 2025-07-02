const Club = require('../models/Club');
const ClubMembership = require('../models/ClubMembership');

// ✅ Create a Club (admin or clubhead only)
exports.createClub = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user.id;

    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      return res.status(400).json({ message: "Club with this name already exists" });
    }

    const club = new Club({ name, description, createdBy });
    await club.save();

    res.status(201).json({ message: "Club created successfully", club });
  } catch (err) {
    res.status(500).json({ message: "Failed to create club", error: err.message });
  }
};

// ✅ Join a Club (student)
exports.joinClub = async (req, res) => {
  try {
    const { clubId } = req.body;
    const studentId = req.user.id;

    const alreadyRequested = await ClubMembership.findOne({ club: clubId, student: studentId });
    if (alreadyRequested) {
      return res.status(400).json({ message: "You have already requested to join this club" });
    }

    const membership = new ClubMembership({ club: clubId, student: studentId });
    await membership.save();

    res.status(201).json({ message: "Join request sent successfully", membership });
  } catch (err) {
    res.status(500).json({ message: "Failed to join club", error: err.message });
  }
};

// ✅ View all clubs
exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().populate('createdBy', 'name email role');
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch clubs", error: err.message });
  }
};
