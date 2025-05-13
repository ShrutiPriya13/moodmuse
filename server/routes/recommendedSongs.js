const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to get recommended songs based on mood
router.get('/', async (req, res) => {
  try {
    const { mood } = req.query;
    const accessToken = req.session.spotifyAccessToken;

    if (!accessToken) {
      return res.status(401).json({ error: 'Not authenticated with Spotify' });
    }

    // Get user's top tracks
    const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        limit: 5,
        time_range: 'short_term'
      }
    });

    const topTracks = topTracksResponse.data.items.map(track => track.id);

    // Get recommendations based on user's top tracks and mood
    const recommendationsResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        seed_tracks: topTracks.join(','),
        limit: 10,
        target_energy: mood === 'happy' || mood === 'excited' ? 0.8 : 0.4,
        target_valence: mood === 'happy' || mood === 'excited' ? 0.8 : 0.4,
        target_danceability: mood === 'happy' || mood === 'excited' ? 0.8 : 0.4
      }
    });

    res.json({
      recommendedSongs: recommendationsResponse.data.tracks.map(track => ({
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        preview_url: track.preview_url,
        external_url: track.external_urls.spotify
      }))
    });

  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

module.exports = router;
