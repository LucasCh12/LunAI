import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainMenu from './pages/MainMenu';
import ImageProcessor from './pages/ImageProcessor';
import LoginModal from './components/LoginModal';
import Historial from './pages/Historial';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  //Sesión iniciada
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //Sesión iniciada
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowLogin(false);
  };

  //Cerrar sesión
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          onLoginClick={() => setShowLogin(true)} 
          user={user} 
          onLogout={handleLogout} 
        />

        <Routes>
          <Route path="/" element={<MainMenu user={user} />} />
          <Route path="/image-processor" element={<ImageProcessor user={user}/>} />
          <Route path="/history" element={<Historial user={user} />} />
        </Routes>

        {showLogin && (
          <LoginModal 
            onClose={() => setShowLogin(false)} 
            onLoginSuccess={handleLoginSuccess} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;
