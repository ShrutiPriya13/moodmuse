import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecommendedSongs = () => {
  const { moodName } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedSongs = async () => {
      try {
        const response = await fetch(`https://8931-2401-4900-1c37-7600-61ba-c450-e789-4c96.ngrok-free.app/api/recommended-songs?mood=${moodName}`);
        const data = await response.json();
        
        if (response.ok) {
          setSongs(data.recommendedSongs);
        } else {
          setError(data.error || 'Failed to fetch recommended songs');
        }
      } catch (err) {
        setError('Failed to fetch recommended songs');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedSongs();
  }, [moodName]);

  if (loading) {
    return <div>Loading recommended songs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recommended-songs-container">
      <h2>Recommended Songs for {moodName.charAt(0).toUpperCase() + moodName.slice(1)}</h2>
      <div className="songs-grid">
        {songs.map((song, index) => (
          <div key={index} className="song-card">
            <h3>{song.name}</h3>
            <p>Artist: {song.artist}</p>
            <p>Album: {song.album}</p>
            {song.preview_url && (
              <audio controls src={song.preview_url} />
            )}
            <a href={song.external_url} target="_blank" rel="noopener noreferrer">
              Open in Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSongs;
