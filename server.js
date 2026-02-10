const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/membership', require('./routes/membership'));
app.use('/api/bmi', require('./routes/bmi'));

// --- Catch-all: serve gym.html for any non-API route ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gym.html'));
});

// --- MongoDB Connection + Server Start ---
const PORT = process.env.PORT || 5000;

async function startServer() {
  let mongoUri = process.env.MONGODB_URI;

  try {
    // Try connecting to the configured MongoDB URI first
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.log('Local MongoDB not available, starting in-memory MongoDB...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      await mongoose.connect(mongoUri);
      console.log('In-memory MongoDB connected successfully');
      console.log('NOTE: Data will be lost when the server stops.');
    } catch (memErr) {
      console.error('Could not start any MongoDB instance:', memErr.message);
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
