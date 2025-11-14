import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';
import LoginModal from "../components/LoginModal";
import Lottie from "lottie-react";
import robot from "../assets/robot.json";

export default function MainMenu() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="MainMenu">
      <div className="main-content">
        <div className="main-index">
          <div className="main-texto">
            <h1>Bienvenido a LunAI</h1>
            <h2>Tu asistente inteligente para detectar lunares y cuidar tu piel</h2>
            <p className="text-main">Detecta y analiza lunares al instante, con resultados claros y fáciles de entender</p>
          
            <div className="action-buttons">
              <button
                className="button-up"
                onClick={() => navigate('/image-processor')}
              >
                Empieza tu consulta
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '8%', marginTop: '20px' }}>
        <Lottie
          animationData={robot} 
          loop={true}
          style={{ width: 400, height: 400 }}
        />
        <div className="features-list">
          <h3 className="how-it-works-title">¿Cómo funciona?</h3>
          <ul className="steps-list">
            <li><strong>1. Toma o sube una foto</strong> de tu lunar con buena iluminación</li>
            <li><strong>2. Nuestra IA analiza</strong> patrones y características visuales</li>
            <li><strong>3. Recibe insights instantáneos</strong> sobre lo que detecta la tecnología</li>
            <li><strong>4. Decide tu próximo paso</strong> con mayor información</li>
          </ul>
          <p className="disclaimer">
            *Herramienta educativa - No reemplaza el diagnóstico profesional*
          </p>
        </div>
        <div className="analysis-info">
          <h3 className="analysis-title">🔍 ¿Qué analizamos?</h3>
          <div className="analysis-points">
            <div className="analysis-item">
              <span>🎯</span>
              <div>
                <strong>Patrones de benignidad</strong>
                <p>Lunares simétricos, bordes definidos</p>
              </div>
            </div>
            <div className="analysis-item">
              <span>⚠️</span>
              <div>
                <strong>Señales de alerta</strong>
                <p>Asimetría, bordes irregulares</p>
              </div>
            </div>
            <div className="analysis-item">
              <span>📊</span>
              <div>
                <strong>Evaluación integral</strong>
                <p>Múltiples factores simultáneos</p>
              </div>
            </div>
            <div className="analysis-item">
              <span>🔄</span>
              <div>
                <strong>Seguimiento</strong>
                <p>Compara cambios en el tiempo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}