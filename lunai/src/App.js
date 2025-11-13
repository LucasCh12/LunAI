import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainMenu from './pages/MainMenu';
import ImageProcessor from './pages/ImageProcessor';
import History from './pages/History';
import LoginModal from './components/LoginModal';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          onLoginClick={() => setShowLogin(true)} 
          onLogoutClick={handleLogout}
          isAuthenticated={isAuthenticated}
          user={user}
        />
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/image-processor" element={<ImageProcessor />} />
          <Route path="/history" element={<History />} />
        </Routes>
        {showLogin && (
          <LoginModal 
            onClose={() => setShowLogin(false)} 
            onLoginSuccess={handleLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;