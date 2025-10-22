import React, { useState } from "react";

import './MainMenu.css';
import LoginModal from "../components/LoginModal";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/Slider";

export default function MainMenu() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="MainMenu">
      <Navbar onLoginClick={() => setShowLogin(true)} />

      <div className="main-content">
        <div className="main-index">
          <div className = "main-texto">
            <h1>Bienvenido a LunAI</h1>
            <h2>Tu asistente inteligente para detectar lunares y cuidar tu piel</h2>
            <p>Detecta y analiza lunares al instante, con resultados claros y fáciles de entender</p>
          
          <div className="action-buttons">
            <button
              className="button-up"
              onClick={() => window.location.href = '/upload'}
            >
              Empieza tu consulta
            </button>
          </div>
          </div>
        </div>
      </div>
      <ImageSlider />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}