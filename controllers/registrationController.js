const Registration = require('../models/Registration');

exports.registerForEvent = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;

    // Check for existing registration
    const alreadyRegistered = await Registration.findOne({ student: studentId, event: eventId });
    if (alreadyRegistered) {
      return res.status(400).json({ message: "You are already registered for this event." });
    }

    const newRegistration = new Registration({
      student: studentId,
      event: eventId
    });

    await newRegistration.save();

    res.status(201).json({
      message: "Registered successfully!",
      registration: newRegistration
    });

  } catch (err) {
    res.status(500).json({
      message: "Registration failed",
      error: err.message
    });
  }
};

// Optional: View registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('student', 'name email')
      .populate('event', 'title date');

    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch registrations", error: err.message });
  }
};
