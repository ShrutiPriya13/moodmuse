import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FeelingPage from './pages/FeelingPage';
import MoodDashboard from './pages/MoodDashboard';
//import CommunityWall from './pages/CommunityWall';
//import './styles/common.css';

function App() {
  return (
    <Router>
   
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/FeelingPage" element={<FeelingPage />} />
        <Route path="/mood/:moodName" element={<MoodDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

