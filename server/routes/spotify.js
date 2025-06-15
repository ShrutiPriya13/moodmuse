const express = require('express');
const { spotifyApi, getAccessToken } = require('../config/spotify');
const router = express.Router();

// Map of mood keywords to Spotify search terms
const moodToSearch = {
    happy: 'happy mood upbeat positive',
    sad: 'sad melancholic emotional',
    neutral: 'neutral balanced calm',
    excited: 'excited energetic lively',
    good: 'good positive uplifting',
    angry: 'angry intense powerful',
    anxious: 'anxious worried tense',
    bored: 'bored uninterested relaxed'
};

// Get songs for a specific mood
router.get('/:mood', async (req, res) => {
    try {
        const mood = req.params.mood.toLowerCase();
        const searchTerms = moodToSearch[mood] || mood;

        // Get fresh access token
        await getAccessToken();

        // Search for tracks
        const data = await spotifyApi.searchTracks(searchTerms, {
            limit: 10,
            type: 'track'
        });

        // Format response
        const songs = data.body.tracks.items.map(track => ({
            name: track.name,
            artist: track.artists[0].name,
            albumArt: track.album.images[0].url,
            previewUrl: track.preview_url
        }));

        res.json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
});

module.exports = router;
