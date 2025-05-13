// pages/RecommendedSongs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecommendedSongs() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://8931-2401-4900-1c37-7600-61ba-c450-e789-4c96.ngrok-free.app/api/spotify/recommendations', { withCredentials: true })
      .then((res) => {
        setSongs(res.data.tracks);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch recommended songs.');
      });
  }, []);

  return (
    <div>
      <h2>Recommended Songs</h2>
      {error && <p>{error}</p>}
      <ul>
        {songs.map((track) => (
          <li key={track.id}>
            <strong>{track.name}</strong> by {track.artists.map((a) => a.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendedSongs;
