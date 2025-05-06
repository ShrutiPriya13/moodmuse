import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import music from '../assets/images/music.jpg';
import journal from '../assets/images/journal.png';
import social from '../assets/images/social.jpeg';
import arrow from '../assets/images/arrow.png';

const Dashboard = () => {
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        navigate('/FeelingPage');
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
          <h2>Hi Suvi!</h2>
          <p>How are you today?</p>
        </div>

        <div className="get-started-button" onClick={handleGetStarted}>
          <button>
            <p>Lets get started</p> 
            <div className="circle"><img src={arrow} alt="arrow image" /></div>
            
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
