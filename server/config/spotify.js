const dotenv = require('dotenv');
dotenv.config();

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

async function getAccessToken() {
    try {
        console.log('Attempting to get Spotify access token...');
        const data = await spotifyApi.clientCredentialsGrant();
        console.log('Successfully obtained access token');
        spotifyApi.setAccessToken(data.body.access_token);
        return data.body.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
        throw error;
    }
}

module.exports = {
    spotifyApi,
    getAccessToken
};
