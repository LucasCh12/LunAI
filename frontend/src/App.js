import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MainMenu from './pages/MainMenu';
import LoginModal from './components/LoginModal';
import RegisterModal from './pages/Register';

import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="App">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <MainMenu />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default App;