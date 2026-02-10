const router = require('express').Router();
const Newsletter = require('../models/Newsletter');

// POST /api/newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    await Newsletter.create({ email });
    res.status(201).json({ message: 'Successfully subscribed to our newsletter!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'This email is already subscribed' });
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
