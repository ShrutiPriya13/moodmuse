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

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

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
app.use('/auth', authRoutes);
app.use('/api/songs', spotifyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Create handler for Netlify Functions
const handler = async (event, context) => {
  try {
    // Connect to MongoDB for each request
    await connectDB();
    
    // Create a new request object for express
    const req = {
      ...event,
      body: event.body ? JSON.parse(event.body) : {},
      headers: event.headers,
      method: event.httpMethod,
      query: event.queryStringParameters,
      path: event.path
    };

    // Create a new response object
    const res = {};
    res.statusCode = 200;
    res.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    };

    // Call express app
    await new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return {
      statusCode: res.statusCode,
      headers: res.headers,
      body: JSON.stringify(res.body)
    };
  } catch (error) {
    console.error('Error in handler:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};

module.exports = { handler };
