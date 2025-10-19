import React, { useState, useEffect } from "react";
import "./LoginModal.css";

export default function LoginModal({ onClose }) {
  const [visible, setVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Datos de login:', { email: formData.email, password: formData.password });
      // Lógica de login
    } else {
      console.log('Datos de registro:', formData);
      // Lógica de registro
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
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
            {isLogin ? (
              <>
                <h2>¡Bienvenido de nuevo!</h2>
                <p>Ingresa tus datos para acceder a tu cuenta y empezar a cuidar tu piel.</p>
              </>
            ) : (
              <>
                <h2>¡Únete a LunAI!</h2>
                <p>Crea tu cuenta y comienza a cuidar tu piel de manera inteligente.</p>
              </>
            )}
          </div>
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input 
                type="text" 
                name="name"
                placeholder="Nombre completo" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
            
            <input 
              type="email" 
              name="email"
              placeholder="Correo electrónico" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <input 
              type="password" 
              name="password"
              placeholder="Contraseña" 
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            {!isLogin && (
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirmar contraseña" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
            
            <button type="submit" className="submit-btn">
              {isLogin ? "Ingresa" : "Registrarse"}
            </button>
            
            <div className="switch-auth">
              {isLogin ? (
                <p>¿No tienes cuenta? <span onClick={switchToRegister}>Regístrate</span></p>
              ) : (
                <p>¿Ya tienes cuenta? <span onClick={switchToLogin}>Inicia Sesión</span></p>
              )}
            </div>
          </form>
          
          {isLogin && (
            <div className="forgot-container">
              <a href="/recuperar">¿Olvidaste tu contraseña?</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}