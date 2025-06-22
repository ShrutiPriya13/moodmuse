import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/recommendedSongs.css';

const moodContent = {
  sad: {
    color: '#FF8A5B',
    emoji: '☹️',
    message: 'It’s okay to feel sad sometimes. Take it easy today.',
  },
  neutral: {
    color: '#A86547',
    emoji: '😐',
    message: 'A calm day is a good day. Stay balanced.',
  },
  happy: {
    color: '#FFD460',
    emoji: '😊',
    message: 'Spread the positivity and enjoy the moment!',
  },
  excited: {
    color: '#AEDB84',
    emoji: '😄',
    message: 'Channel that energy into something great!',
  },
  good: {
    color: '#F0CD58',
    emoji: '🙂',
    message: 'You’re doing great! Keep that momentum going!',
  },
  angry: {
    color: '#FF4C4C',
    emoji: '😡',
    message: 'Take a breath. Let the anger pass through you.',
  },
  anxious: {
    color: '#FFB74D',
    emoji: '😰',
    message: 'Slow down. Everything is going to be okay.',
  }
};

const RecommendedSongs = () => {
  const { moodName } = useParams(); // e.g., 'happy', 'sad'
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`https://moodmuse.onrender.com/api/songs/${moodName}, {withCredentials: true}`);
        setSongs(response.data);
      } catch (err) {
        console.error('Failed to fetch songs:', err);
        setSongs([]); 
      } finally {
        setLoading(false);
      }
    };

    if (moodName) {
      fetchSongs();
    }
  }, [moodName]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading songs...</p>
      </div>
    );
  }

  return (
    <div className="recommended-songs">
      <div className="header">
        <h1>Ride the Middle Wave</h1>
        <div className="header-content">
          <div className="mood-title">
            <h2>Your <span className="mood-name">{moodName}</span> Mood, Perfectly Soundtracked</h2>
          </div>
          <div className="mood-message">
            <p>{moodContent[moodName]?.message}</p>
          </div>
        </div>
      </div>
      <div className="songs-grid">
        {songs.map((song, index) => (
          <div key={index} className="song-card">
            <div className="song-image">
              <img src={song.albumArt} alt={song.name} />
              {song.previewUrl && (
                <audio controls>
                  <source src={song.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
            <div className="song-info">
              <h3>{song.name}</h3>
              <p className="artist">{song.artist}</p>
              <a 
                href={`https://open.spotify.com/search/${encodeURIComponent(song.name)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="spotify-link"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l8 4.5-8 4.5z" fill="#1DB954"/>
                </svg>
                Listen on Spotify
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSongs;
