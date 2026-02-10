const router = require('express').Router();
const Membership = require('../models/Membership');
const auth = require('../middleware/auth');

const PLAN_PRICES = {
  'Starter': 29,
  'Pro': 59,
  'Elite': 99
};

// POST /api/membership
router.post('/', auth, async (req, res) => {
  try {
    const { plan } = req.body;

    if (!PLAN_PRICES[plan]) {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

    // Deactivate any existing active membership
    await Membership.updateMany(
      { user: req.user.id, status: 'active' },
      { status: 'expired' }
    );

    const membership = await Membership.create({
      user: req.user.id,
      plan,
      price: PLAN_PRICES[plan]
    });

    res.status(201).json({
      message: `Successfully enrolled in the ${plan} plan!`,
      membership
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// GET /api/membership/my
router.get('/my', auth, async (req, res) => {
  try {
    const membership = await Membership.findOne({
      user: req.user.id,
      status: 'active'
    }).sort({ createdAt: -1 });

    res.json(membership || null);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
