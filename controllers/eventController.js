const Event = require('../models/Event');

// Add Event
exports.createEvent = async (req, res) => {
  try {
    const { title, date, description, organizedBy, club, image } = req.body;

    if (!title || !date || !description || !organizedBy || !image) {
      return res.status(400).json({ message: "All fields except club are required" });
    }

    const newEvent = new Event({
      title,
      date,
      description,
      organizedBy,
      club,
      image
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
};

// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error: error.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error: error.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updates = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update event',
      error: error.message,
    });
  }
};


