import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import music from '../assets/images/music.jpg';
import journal from '../assets/images/journal.png';
import social from '../assets/images/social.jpeg';
import arrow from '../assets/images/arrow.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Holds authenticated user

  const firstName = user?.name?.split(" ")[0] || "User";

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check localStorage first
        const localUserString = localStorage.getItem('user');
        if (localUserString) {
          const localUser = JSON.parse(localUserString);
          if (localUser && localUser.email) {
            setUser(localUser);
            return;
          }
          localStorage.removeItem('user');
        }

        // Check with server
        const response = await fetch('http://localhost:5000/auth/current_user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          console.error('Server response:', response.status, response.statusText);
          const errorText = await response.text();
          console.error('Error response:', errorText);
          
          if (response.status === 401) {
            console.log('No user session found');
            navigate('/');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('User data from server:', data);
        
        if (data && data.googleId) {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          console.error('Invalid user data:', data);
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking user:', error);
        navigate('/');
      }
    };

    checkUser();
  }, [navigate]);

  // Show loading state while checking user
  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const handleGetStarted = () => {
    navigate('/FeelingPage');
  };

  // Optionally show loading screen until user is fetched
  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="top-section">
        <div className="left-text">
          <div className="head1">We'll always be <br /></div>
          <div className="head2">
            there <span className="highlight">to help</span> you
          </div>
        </div>
        <div className="top-left-image">
          <img src={social} alt="Girl" />
          <div className="overlay-text-w">We'll a</div>
          <div className="overlay-text-t">t</div>
        </div>
        <div className="top-right-image">
          <img src={journal} alt="Journal with flowers" />
          <div className="overlay-text">you</div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="greeting-card">
          <h2>Hi {firstName}!</h2>
          <p>How are you today?</p>
        </div>

        <div className="get-started-button" onClick={handleGetStarted}>
          <button>
            <p>Let's get started</p>
            <div className="circle"><img src={arrow} alt="arrow" /></div>
          </button>
        </div>

        <div className="music-image">
          <img src={music} alt="music with headphones" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
