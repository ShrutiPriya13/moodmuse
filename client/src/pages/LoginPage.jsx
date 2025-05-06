import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../assets/images/logo.png';
import image1 from '../assets/images/image1.jpeg';
import google from '../assets/images/google.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleContinue = () => {
    if (email.trim()) {
      // Here you can add an API call or auth logic
      navigate('/dashboard');
    } else {
      alert('Please enter a valid email.');
    }
  };

  const handleGoogleLogin = () => {
    // Here you can integrate Google OAuth (e.g., Firebase or your backend)
    // Redirect to OAuth login (e.g., Google)
    window.location.href = 'http://localhost:5000/auth/google';
   
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="MoodMuse Logo" className="login-logo" />
        <h2 className="welcome-heading">Welcome to MoodMuse —<br />Let your mood shape your moment.</h2>

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
              <span className='divider-text'>or authorize with</span>
            </div>

            <button onClick={handleGoogleLogin} className="google-button">
              <img src={google} alt='Google icon' /> Continue with Google
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
