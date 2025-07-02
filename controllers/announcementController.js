const Announcement = require('../models/Announcement');

// ✅ Add Announcement (Admin/Clubhead)
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const postedBy = req.user.name; // or req.user.id

    const newAnnouncement = new Announcement({ title, message, postedBy });
    await newAnnouncement.save();

    res.status(201).json({
      message: "Announcement created successfully",
      announcement: newAnnouncement
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create announcement", error: err.message });
  }
};

// ✅ Get All Announcements (Public)
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch announcements", error: err.message });
  }
};

// ✅ Delete Announcement (Admin only)
exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
};

