const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const spotifyRoutes = require('./routes/spotify');
require('./auth/googleAuth'); // Passport config

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors({
  origin: 'https://mood-muse-7j6sxi5r9-shrutis-projects-3226d360.vercel.app', // ✅ Use your deployed frontend domain
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', (req, res, next) => {
  next();
});
app.use('/auth', authRoutes);
app.use('/api/songs', spotifyRoutes);

// Export server
module.exports = app;
// ✅ Export the app wrapped with serverless-http
module.exports = serverless(app);
