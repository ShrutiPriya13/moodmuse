import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse hash params from the URL
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // remove '#'
    const accessToken = params.get('access_token');

    if (accessToken) {
      // Store token (can also use context or Redux if needed)
      localStorage.setItem('spotifyAccessToken', accessToken);

      // ✅ Redirect to your recommended songs page
      navigate('/recommended');
    } else {
      // Handle error
      console.error('Access token not found in callback');
      navigate('/dashboard'); // or show an error message
    }
  }, [navigate]);

  return <div>Processing Spotify login...</div>;
};

export default SpotifyCallback;

