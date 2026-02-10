const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    enum: ['male', 'female', '']
  },
  bmi: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Underweight', 'Normal Weight', 'Overweight', 'Obese']
  }
}, { timestamps: true });

module.exports = mongoose.model('Bmi', bmiSchema);
