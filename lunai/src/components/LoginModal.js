import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import axios from "axios";
import "./LoginModal.css";

export default function LoginModal({ onClose, onLoginSuccess }) {
=======
import "./LoginModal.css";

export default function LoginModal({ onClose }) {
>>>>>>> frontend
  const [visible, setVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
<<<<<<< HEAD
  const [message, setMessage] = useState("");

  useEffect(() => {
    setVisible(true); // animación fade-in
  }, []);

=======

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

>>>>>>> frontend
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        // Login
        const res = await axios.post("http://localhost:5000/auth/login", {
          email: formData.email,
          password: formData.password
        });
        setMessage(res.data.message);
        if (onLoginSuccess) onLoginSuccess(res.data.user);
        onClose();
      } else {
        // Registro
        if (formData.password !== formData.confirmPassword) {
          setMessage("Las contraseñas no coinciden");
          return;
        }

        const res = await axios.post("http://localhost:5000/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        setMessage(res.data.message);
        setIsLogin(true); // luego de registrar, cambia a login
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Ocurrió un error, intenta de nuevo.");
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300); // coincide con la animación
=======
  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
>>>>>>> frontend
  };

  return (
    <div className={`modal-backdrop ${visible ? "show" : ""}`}>
      <div className={`modal ${visible ? "show" : ""}`}>
        <div className="izquierda-login">
          <img src="/logo.png" alt="logo-img"/>
          <img src="/robot.png" alt="img-robot"/>
        </div>
<<<<<<< HEAD

        <div className="derecha-login">
          <button className="close-button" onClick={handleClose}>X</button>

=======
        
        <div className="derecha-login">
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          
>>>>>>> frontend
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
<<<<<<< HEAD

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
=======
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input 
                type="text" 
                name="name"
                placeholder="Nombre completo" 
>>>>>>> frontend
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
<<<<<<< HEAD
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
=======
            
            <input 
              type="email" 
              name="email"
              placeholder="Correo electrónico" 
>>>>>>> frontend
              value={formData.email}
              onChange={handleChange}
              required
            />
<<<<<<< HEAD
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
=======
            
            <input 
              type="password" 
              name="password"
              placeholder="Contraseña" 
>>>>>>> frontend
              value={formData.password}
              onChange={handleChange}
              required
            />
<<<<<<< HEAD
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
=======
            
            {!isLogin && (
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirmar contraseña" 
>>>>>>> frontend
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
<<<<<<< HEAD

            <button type="submit" className="submit-btn">
              {isLogin ? "Ingresa" : "Registrarse"}
            </button>
          </form>

          {message && <p className="message">{message}</p>}

          <div className="switch-auth">
            {isLogin ? (
              <p>¿No tienes cuenta? <span onClick={() => setIsLogin(false)}>Regístrate</span></p>
            ) : (
              <p>¿Ya tienes cuenta? <span onClick={() => setIsLogin(true)}>Inicia Sesión</span></p>
            )}
          </div>
=======
            
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
>>>>>>> frontend
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> frontend
