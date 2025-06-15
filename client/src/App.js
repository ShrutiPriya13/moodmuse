import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FeelingPage from './pages/FeelingPage';
import MoodDashboard from './pages/MoodDashboard';
import SpotifyCallback from './components/SpotifyCallback';
import RecommendedSongs from './pages/RecommendedSongs';
import Journal from './pages/Journal';
import CommunityWall from './pages/CommunityWall';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/FeelingPage" element={<FeelingPage />} />
        <Route path="/mood/:moodName" element={<MoodDashboard />} />
        <Route path="/callback" element={<SpotifyCallback />} />
        <Route path="/mood/:moodName/music" element={<RecommendedSongs />} />
        <Route path="/mood/:moodName/journal" element={<Journal />} />
        <Route path="/mood/:moodName/community" element={<CommunityWall />} />
      </Routes>
    </Router>
  );
}

export default App;
