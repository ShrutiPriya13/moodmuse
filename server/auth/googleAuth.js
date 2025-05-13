const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

// Serialize the user ID to store in the session
passport.serializeUser((user, done) => done(null, user.id)); //user.id is the unique identifier for the user in the database (mongoDB)

// Deserialize the user by looking it up in the DB
passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

// Google OAuth strategy
// This strategy is used to authenticate users using their Google account
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  redirectUri: "http://localhost:3000/dashboard"
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });
  
  if (existingUser) {
    return done(null, existingUser);
    }

  const user = await new User({
    googleId: profile.id,
    email: profile.emails[0].value,
    name: profile.displayName,
    photo: profile.photos[0].value
  }).save();
  done(null, user);
}));
