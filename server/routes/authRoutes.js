const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start the Google OAuth process
router.get(
  '/google',
  (req, res, next) => {
    console.log('Starting Google OAuth');
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      accessType: 'offline',
      prompt: 'consent'
    })(req, res, next);
  }
);

// Google OAuth callback route
router.get(
  '/google/callback',
  (req, res, next) => {
    console.log('Google OAuth callback received');
    console.log('Request URL:', req.url);
    console.log('Query params:', req.query);
    
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        console.error('Authentication error:', err);
        return res.redirect('/');
      }
      
      if (!user) {
        console.log('No user authenticated:', info);
        return res.redirect('/');
      }
      
      console.log('User authenticated:', user);
      
      // Manually set the user in the session
      req.login(user, (loginErr) => {
        if (loginErr) {
          console.error('Login error:', loginErr);
          return res.redirect('/');
        }
        
        // Redirect to dashboard with proper headers
        res.redirect('http://localhost:3000/dashboard');
      });
    })(req, res, next);
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    console.log('User logged out');
    res.redirect('/');
  });
});

// Get current user (optional, for frontend to check login status)
router.get('/current_user', (req, res) => {
  console.log('Current user request:', req.user);
  
  if (!req.user) {
    console.log('No user in session');
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  
  // Format the user data to match what the frontend expects
  const userData = {
    googleId: req.user.googleId,
    email: req.user.email,
    name: req.user.name,
    photo: req.user.photo
  };
  
  console.log('Sending user data:', userData);
  res.json(userData);
});

module.exports = router;
