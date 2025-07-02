const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { event, rating, comment } = req.body;

    const feedback = new Feedback({
      student: req.user.id,
      event,
      rating,
      comment
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit feedback', error: err.message });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('student', 'name').populate('event', 'title');
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch feedbacks', error: err.message });
  }
};
