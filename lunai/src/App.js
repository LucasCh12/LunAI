import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainMenu from './pages/MainMenu';
import ImageProcessor from './pages/ImageProcessor';
import LoginModal from './components/LoginModal';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar onLoginClick={() => setShowLogin(true)} />
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/image-processor" element={<ImageProcessor />} />
        </Routes>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </div>
    </Router>
  );
}

export default App;