import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FeelingPage from './pages/FeelingPage';
import MoodDashboard from './pages/MoodDashboard';
import RecommendedSongs from './pages/RecommendedSongs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/FeelingPage"
            element={
              <ProtectedRoute>
                <FeelingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood/:moodName"
            element={
              <ProtectedRoute>
                <MoodDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommended-songs"
            element={
              <ProtectedRoute>
                <RecommendedSongs />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
