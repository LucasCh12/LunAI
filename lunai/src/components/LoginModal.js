import React, { useState, useEffect } from "react";
import "./LoginModal.css";

export default function LoginModal({ onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, 300); 
  };

  return (
    <div className={`modal-backdrop ${visible ? "show" : ""}`}>
        <div className={`modal ${visible ? "show" : ""}`}>
            <div className="izquierda-login">
                <img src="/logo.png" alt="logo-img"/>
                <img src="/robot.png" alt="img-robot"/>
            </div>
            <div className="derecha-login">
                <button className="close-button" onClick={handleClose}>
                X
                </button>
                <div className="welcome-message">
                    <h2>¡Bienvenido de nuevo!</h2>
                    <p>Ingresa tus datos para acceder a tu cuenta y empezar a cuidar tu piel.</p>
                </div>
                <form>
                    <input type="text" placeholder="Usuario" />
                    <input type="password" placeholder="Contraseña" />
                    <button type="submit">Ingresa</button>
                    <button type="submit">Registrate</button>
                </form>
                <div className="forgot-container">
                    <a href="/recuperar">Olvidaste tu contraseña?</a>
                </div>
            </div>
        </div>
    </div>
  );
}
