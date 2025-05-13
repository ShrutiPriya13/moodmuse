import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory
import '../styles/moodDashboard.css';
import headImage from '../assets/images/headImage.avif';  
import musicImage from '../assets/images/musicImage.png'; 
import journalImage from '../assets/images/journalImage.png';
import socialImage from '../assets/images/socialImage.png';

const moodContent = {
  sad: {
    color: '#FF8A5B',
    emoji: '☹️',
    songs: ['Let Her Go - Passenger', 'Someone Like You - Adele', 'Fix You - Coldplay'],
    message: 'It’s okay to feel sad sometimes. Take it easy today.',
  },
  neutral: {
    color: '#A86547',
    emoji: '😐',
    songs: ['Sunflower - Post Malone', 'Stay - Rihanna', 'Let It Be - The Beatles'],
    message: 'A calm day is a good day. Stay balanced.',
  },
  happy: {
    color: '#FFD460',
    emoji: '😊',
    songs: ['Happy - Pharrell Williams', 'Cant Stop the Feeling - Justin Timberlake', 'Uptown Funk - Bruno Mars'],
    message: 'Spread the positivity and enjoy the moment!',
  },
  excited: {
    color: '#AEDB84',
    emoji: '😄',
    songs: ['Don’t Stop Me Now - Queen', 'On Top of the World - Imagine Dragons', 'Stronger - Kanye West'],
    message: 'Channel that energy into something great!',
  },
  good: {
    color: '#F0CD58',
    emoji: '🙂',
    songs: ['Lovely Day - Bill Withers', 'Pocketful of Sunshine - Natasha Bedingfield', 'Best Day of My Life - American Authors'],
    message: 'You’re doing great! Keep that momentum going!',
  },
  angry: {
    color: '#FF4C4C',
    emoji: '😡',
    songs: ['Break Stuff - Limp Bizkit', 'Stronger - Kanye West', 'Smells Like Teen Spirit - Nirvana'],
    message: 'Take a breath. Let the anger pass through you.',
  },
  anxious: {
    color: '#FFB74D',
    emoji: '😰',
    songs: ['Weightless - Marconi Union', 'Someone You Loved - Lewis Capaldi', 'Breathe Me - Sia'],
    message: 'Slow down. Everything is going to be okay.',
  },
  bored: {
    color: '#A7B2D9',
    emoji: '😒',
    songs: ['Shake It Off - Taylor Swift', 'Uptown Funk - Bruno Mars', 'Happy - Pharrell Williams'],
    message: 'Try something new today and beat the boredom!',
  },
};

const MoodDashboard = () => {
  const { moodName } = useParams();
  const moodKey = moodName ? moodName.toLowerCase() : null;
  const mood = moodKey ? moodContent[moodKey] : null;
  const navigate = useNavigate();
  
   useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const image = document.querySelector('.head-image img');
      if (image) {
        image.style.transform = `translate(${scrollY * 0.3}px, ${-scrollY * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mood) {
    return <h2 style={{ textAlign: 'center' }}>Unknown Mood 😕</h2>;
  }

  return (
    <div className="container">
      <div className="cont1">
        <div className="heading">
          BECAUSE WHAT YOU FEEL MATTERS.
        </div>
        <div className="head-image">
          <img src={headImage} alt="img" />
        </div>
      </div>

      <div className="cont2">
        <div className="box1">
          <p>
          In a world that moves fast, music and journaling offer a place to pause — a rhythm for the 
          heart and a voice for the soul. Whether it's a song that speaks what words can't, or a journal 
          entry that untangles the chaos within, these forms of expression are quiet revolutions of 
          healing. They don't just capture what you feel — they help you feel it fully, and let it go.
        
          Let the rhythm speak when words fall short. Music echoes what we hold inside — raw, real, 
          unfiltered. Pair it with the quiet power of journaling, and you get a space where healing 
          isn't forced, it flows. This is more than escape. It's expression. It's release. 
          It's how you find your way back to yourself.
          <br />
          This isn't just music. It's a mirror. This isn't just journaling. It's self-rescue. Let every 
          rhythm and every word bring you closer to calm.
          
          Some days, the weight we carry is invisible but loud. It's in the silences, in the way we 
          pause before speaking, in the songs we keep on repeat. Writing gives those feelings a place 
          to land. Music gives them wings. Together, they become a bridge back to ourselves—a soft 
          reminder that even when we're quiet, we're still listening, still healing.
          When chaos hums in your chest, let a melody answer back. Write it down. Feel it out. Heal 
          through the noise
          </p>
        </div>
        <div className="right-boxes">
          <div className="right-box1" onClick={async () => {
            try {
              // Fetch ngrok URL from server
              const response = await fetch('http://localhost:5000/api/ngrok-url');
              const ngrokUrl = await response.text();
              
              const clientId = '10e5eae99db64c9697b7bf065e098b80';
              const redirectUri = encodeURIComponent(`${ngrokUrl}/#/recommended-songs`);
              const scope = encodeURIComponent('user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-state');
              const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
              window.location.href = authUrl;
            } catch (error) {
              console.error('Error getting ngrok URL:', error);
              alert('Failed to get ngrok URL. Please try again.');
            }
          }}>
            <img src={musicImage} alt="" />
          </div>
         
          <div className="right-box2">
            <img src={journalImage} alt="" />
          </div>
          <div className="right-box3">
            <img src={socialImage} alt="" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MoodDashboard;