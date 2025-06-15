import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/feeling.css';
import sad from '../assets/images/sad.png';
import neutral from '../assets/images/neutral.png';
import happy from '../assets/images/happy.png';
import good from '../assets/images/good.png';
import excited from '../assets/images/excited.png';
import angry from '../assets/images/angry.png';
import anxious from '../assets/images/anxious.png';
import bored from '../assets/images/bored.png';

const moodData = [
    { mood: 'Sad', emoji: sad, color: '#FF8A5B' },
    { mood: 'Neutral', emoji: neutral, color: '#A86547' },
    { mood: 'Happy', emoji: happy, color: '#F5FE4F' },
    { mood: 'Good', emoji: good, color: '#58E6F0' },
    { mood: 'Excited', emoji: excited, color: '#AEDB84' },
    { mood: 'Angry', emoji: angry, color: '#FF4C4C' },
    { mood: 'Anxious', emoji: anxious, color: '#FFB74D' },
    { mood: 'Bored', emoji: bored, color: '#A7B2D9' },
  ];
  

const FeelingPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);
  const [firstName, setFirstName] = useState('User'); // Default to 'User'

  const handleMoodClick = (mood) => {
    navigate(`/mood/${mood.toLowerCase()}`);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setShowArrow(!isAtEnd);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Assuming user object has a 'name' property like 'John Doe'
        // Or it might be 'displayName' from Google. Adjust if necessary.
        const nameParts = user.name ? user.name.split(' ') : (user.displayName ? user.displayName.split(' ') : []);
        if (nameParts.length > 0) {
          setFirstName(nameParts[0]);
        }
      }
    } catch (error) {
      console.error('Error retrieving user name from localStorage:', error);
      // Keep default name 'User'
    }

    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="feeling-container">
      
      <div className="logo-container">
        <img src={require('../assets/images/moodly.png')} alt="Logo" className="logo" />
        </div>

        <div className="mood-container">
        <div className="horizontal-scroll" ref={scrollRef}>

        {moodData.map((item, index) => (
          <div
            key={index}
            className="mood-card"
            style={{ backgroundColor: item.color }}
            onClick={() => handleMoodClick(item.mood)}
          >
            <div className="intro">
                <div className="h2">Hey {firstName}!</div>
                <p>How are you feeling <br />this day?</p>
            </div>

            <img src={item.emoji} alt={item.mood} className="emoji-image" />
            
            <p className="mood-desc">I'm Feeling {item.mood}</p>
            <button className="set-mood-btn">Set Mood</button>
          </div>
        ))}
      </div>
      {showArrow && (
          <div className="scroll-arrow" onClick={scrollRight}>➜</div>
        )}
    </div>
    </div>
  );
};

export default FeelingPage;



