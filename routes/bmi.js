const router = require('express').Router();
const Bmi = require('../models/Bmi');
const auth = require('../middleware/auth');

// POST /api/bmi
router.post('/', auth, async (req, res) => {
  try {
    const { height, weight, age, gender } = req.body;

    if (!height || !weight || height <= 0 || weight <= 0) {
      return res.status(400).json({ message: 'Valid height and weight are required' });
    }

    const heightInMeters = height / 100;
    const bmiValue = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));

    let category = '';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 25) category = 'Normal Weight';
    else if (bmiValue < 30) category = 'Overweight';
    else category = 'Obese';

    const bmiRecord = await Bmi.create({
      user: req.user.id,
      height,
      weight,
      age: age || null,
      gender: gender || '',
      bmi: bmiValue,
      category
    });

    res.status(201).json({
      message: 'BMI saved to your profile!',
      bmi: bmiRecord
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// GET /api/bmi/my
router.get('/my', auth, async (req, res) => {
  try {
    const records = await Bmi.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(20);
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
