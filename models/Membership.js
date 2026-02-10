const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    required: true,
    enum: ['Starter', 'Pro', 'Elite']
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: function () {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      return d;
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
