import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory
import '../styles/moodDashboard.css';

const moodContent = {
  sad: {
    color: '#FF8A5B',
    emoji: '☹️',
    songs: ['Let Her Go - Passenger', 'Someone Like You - Adele', 'Fix You - Coldplay'],
    message: 'It’s okay to feel sad sometimes. Take it easy today.',
  },
  neutral: {
    color: '#A86547',
    emoji: '😐',
    songs: ['Sunflower - Post Malone', 'Stay - Rihanna', 'Let It Be - The Beatles'],
    message: 'A calm day is a good day. Stay balanced.',
  },
  happy: {
    color: '#FFD460',
    emoji: '😊',
    songs: ['Happy - Pharrell Williams', 'Cant Stop the Feeling - Justin Timberlake', 'Uptown Funk - Bruno Mars'],
    message: 'Spread the positivity and enjoy the moment!',
  },
  excited: {
    color: '#AEDB84',
    emoji: '😄',
    songs: ['Don’t Stop Me Now - Queen', 'On Top of the World - Imagine Dragons', 'Stronger - Kanye West'],
    message: 'Channel that energy into something great!',
  },
  good: {
    color: '#F0CD58',
    emoji: '🙂',
    songs: ['Lovely Day - Bill Withers', 'Pocketful of Sunshine - Natasha Bedingfield', 'Best Day of My Life - American Authors'],
    message: 'You’re doing great! Keep that momentum going!',
  },
  angry: {
    color: '#FF4C4C',
    emoji: '😡',
    songs: ['Break Stuff - Limp Bizkit', 'Stronger - Kanye West', 'Smells Like Teen Spirit - Nirvana'],
    message: 'Take a breath. Let the anger pass through you.',
  },
  anxious: {
    color: '#FFB74D',
    emoji: '😰',
    songs: ['Weightless - Marconi Union', 'Someone You Loved - Lewis Capaldi', 'Breathe Me - Sia'],
    message: 'Slow down. Everything is going to be okay.',
  },
  bored: {
    color: '#A7B2D9',
    emoji: '😒',
    songs: ['Shake It Off - Taylor Swift', 'Uptown Funk - Bruno Mars', 'Happy - Pharrell Williams'],
    message: 'Try something new today and beat the boredom!',
  },
};

const MoodDashboard = () => {
  const { moodName } = useParams();
  const moodKey = moodName ? moodName.toLowerCase() : null;
  const mood = moodKey ? moodContent[moodKey] : null;
  const navigate = useNavigate();  // useNavigate instead of useHistory

  if (!mood) {
    return <h2 style={{ textAlign: 'center' }}>Unknown Mood 😕</h2>;
  }

  const handleMusicClick = () => {
    // Redirect to Spotify OAuth flow (you will replace this with actual implementation)
    const redirectUri = 'http://localhost:3000/spotify/callback';
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=${redirectUri}&scope=user-library-read`;
    window.location.href = spotifyAuthUrl;
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor: mood.color }}>
      <h1 className="dashboard-title">
        You're feeling {moodName.charAt(0).toUpperCase() + moodName.slice(1)} {mood.emoji}
      </h1>
      <p className="dashboard-message">{mood.message}</p>

      <div className="dashboard-section">
        <h2>Songs You Might Like 🎵</h2>
        <ul>
          {mood.songs.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ul>
      </div>

      {/* Options for Music, Journal, and Community Wall */}
      <div className="dashboard-options">
        <h3>What would you like to do?</h3>
        <button onClick={handleMusicClick}>Music</button>
        <button>Journal</button>
        <button>Community Wall</button>
      </div>
    </div>
  );
};

export default MoodDashboard;
