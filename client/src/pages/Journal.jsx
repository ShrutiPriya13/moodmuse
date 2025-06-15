import React from 'react';
import { useParams } from 'react-router-dom';

const Journal = () => {
  const { moodName } = useParams();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Journal Page</h1>
      <p>Current Mood: {moodName ? moodName.charAt(0).toUpperCase() + moodName.slice(1) : 'Not specified'}</p>
      <p>This is where you can write your journal entries for this mood.</p>
      {/* Add journal form and display logic here */}
    </div>
  );
};

export default Journal;
