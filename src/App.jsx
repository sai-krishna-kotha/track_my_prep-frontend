// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar'; // Import the Navbar

// A small helper component to handle the layout and logout logic
const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // We only want to show the Navbar on the dashboard, not on login/register
  const showNavbar = location.pathname === '/';

  const handleLogout = () => {
    // Clear tokens from localStorage (FR6)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {showNavbar && <Navbar handleLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;