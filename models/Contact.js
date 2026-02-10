const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['Membership Inquiry', 'Personal Training', 'Class Schedule', 'General Question']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: 2000
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
