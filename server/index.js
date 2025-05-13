const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
require('./auth/googleAuth');

const app = express();

const spotifyAuth = require('./auth/spotifyAuth');
const recommendedSongs = require('./routes/recommendedSongs');

app.use('/auth', spotifyAuth);
app.use('/api', recommendedSongs);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use(express.json());

app.use(session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }
  }));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: 'http://localhost:3000/#/dashboard'
  }),
  (req, res) => {
    // Set the authentication token in a cookie
    res.cookie('auth_token', 'your-token', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.redirect('http://localhost:3000/#/dashboard');
  });

// API route to get logged-in user info
app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

app.get('/api/ngrok-url', (req, res) => {
  // Get ngrok URL from environment variable
  const ngrokUrl = process.env.NGROK_URL;
  if (!ngrokUrl) {
    res.status(500).send('NGROK_URL not set');
    return;
  }
  res.send(ngrokUrl);
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));
