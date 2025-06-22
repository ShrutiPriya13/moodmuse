import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../assets/images/logo.png';
import image1 from '../assets/images/image1.jpeg';
import google from '../assets/images/google.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (email.trim()) {
      try {
        // For manual email login, we'll simulate a user object
        const user = { 
          email: email,
          name: 'User',
          googleId: 'manual-' + email // Add a fake googleId to match the expected format
        };
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    } else {
      alert('Please enter a valid email.');
    }
  };

  const handleGoogleLogin = () => {
    try {
      // Clear any existing session
      localStorage.removeItem('user');
      
      // Redirect to Google OAuth
      const authUrl = 'https://moodmuse.onrender.com/auth/google';
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error initiating Google login:', error);
      alert('Failed to initiate Google login. Please try again.');
    }
  }; 

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="MoodMuse Logo" className="login-logo" />
        <h2 className="welcome-heading">
          Welcome to MoodMuse —<br />Let your mood shape your moment.
        </h2>

        <input 
          type="email" 
          className="email-input" 
          placeholder="Enter your email here" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>

        <div className="divider">
          <span className="divider-text">or authorize with</span>
        </div>

        <button onClick={handleGoogleLogin} className="google-button">
          <img src={google} alt="Google icon" /> Continue with Google
        </button>
      </div>

      <div className="login-right">
        <img src={image1} alt="Login Visual" className="login-image" />
        <div className="image-text">
          <h3>Join the MoodMuse community and reconnect with yourself.</h3>
          <p>
            Log your feelings, find comfort in music, and see how others navigate their moods.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
