import React from 'react';
import { useParams } from 'react-router-dom';

const CommunityWall = () => {
  const { moodName } = useParams();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Community Wall</h1>
      <p>Current Mood: {moodName ? moodName.charAt(0).toUpperCase() + moodName.slice(1) : 'Not specified'}</p>
      <p>Share your thoughts and see posts from others feeling this mood.</p>
      {/* Add community post creation and display logic here */}
    </div>
  );
};

export default CommunityWall;
