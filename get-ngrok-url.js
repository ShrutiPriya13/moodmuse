const axios = require('axios');

async function getNgrokUrl() {
    try {
        const response = await axios.get('http://localhost:4040/api/tunnels');
        const tunnels = response.data.tunnels;
        const httpsTunnel = tunnels.find(tunnel => tunnel.proto === 'https');
        return httpsTunnel ? httpsTunnel.public_url : null;
    } catch (error) {
        console.error('Error getting ngrok URL:', error);
        return null;
    }
}

module.exports = getNgrokUrl;
