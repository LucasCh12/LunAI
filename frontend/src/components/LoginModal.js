import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginModal.css";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [visible, setVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    setVisible(true); // animación fade-in
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
  };

  return (
    <div className={`modal-backdrop ${visible ? "show" : ""}`}>
      <div className={`modal ${visible ? "show" : ""}`}>
        <div className="izquierda-login">
          <img src="/logo.png" alt="logo-img"/>
          <img src="/robot.png" alt="img-robot"/>
        </div>

        <div className="derecha-login">
          <button className="close-button" onClick={handleClose}>X</button>

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
          </form>

          {message && <p className="message">{message}</p>}

          <div className="switch-auth">
            {isLogin ? (
              <p>¿No tienes cuenta? <span onClick={() => setIsLogin(false)}>Regístrate</span></p>
            ) : (
              <p>¿Ya tienes cuenta? <span onClick={() => setIsLogin(true)}>Inicia Sesión</span></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
