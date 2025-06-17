const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
const path = require('path');

// Remove WebSocket dependencies since they won't work in Netlify Functions
// const { createServer } = require('http');
// const { Server } = require('socket.io');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const spotifyRoutes = require('./routes/spotify');
require('./auth/googleAuth'); // Passport config

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport initialization
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
