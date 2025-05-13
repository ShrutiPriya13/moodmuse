const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const router = express.Router();

// Replace these with your actual Spotify credentials
const CLIENT_ID = '10e5eae99db64c9697b7bf065e098b80';  
const CLIENT_SECRET = '12998b3d75ee4c4d83034b9aed404d13';  
const REDIRECT_URI = 'https://e0ec-2401-4900-1c3.ngrok-free.app/#/recommended-songs';

// Step 1: Redirect User to Spotify for Authentication
router.get('/login', (req, res) => {
    const scope = 'user-library-read playlist-read-private';  // Define the scope of access you need
    const auth_query_parameters = querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,   
        redirect_uri: REDIRECT_URI,
        scope: scope,
    });
    res.redirect('https://accounts.spotify.com/authorize?${auth_query_parameters}');

});

// Step 2: Handle the Spotify Callback and Exchange Code for Access Token
router.get('/spotify/callback', async (req, res) => {
    const code = req.query.code;  // Get the 'code' parameter from the callback URL

    // Step 3: Exchange the code for an access token
    try {
        const code = req.query.code;
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'authorization_code',
                code,  // The authorization code we got from the callback URL
                redirect_uri: REDIRECT_URI
            }), {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const accessToken = response.data.access_token;  // You can now use this access token
        req.session.spotifyAccessToken = accessToken; // Optional: Store it

        res.redirect(`${REDIRECT_URI}/#/recommended-songs`);

    } catch (error) {
        console.error(error);
        res.redirect(`${REDIRECT_URI}/#/recommended-songs`);
    }
});

router.get('/api/spotify/recommendations', async (req, res) => {
    const accessToken = req.session.spotifyAccessToken;

    if (!accessToken) {
        return res.status(401).json({ error: 'Not authenticated with Spotify' });
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                seed_genres: 'pop', // You can customize based on mood
                limit: 10
            }
        });

        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

module.exports = router;
