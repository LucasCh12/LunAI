import './Navbar.css';
<<<<<<< HEAD

function Navbar({ onLoginClick, onRegisterClick }) {
  return (
    <nav className="navbar">
      <div className="izquierda">
        <img src="/logo.png" alt="Logo Lunai" />
=======
import { useNavigate } from 'react-router-dom';

function Navbar({ onLoginClick, onRegisterClick }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Esto te llevará a la ruta principal (MainMenu)
  };

  return (
    <nav className="navbar">
      <div className="izquierda">
        <img 
          src="/logo.png" 
          alt="Logo Lunai" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }} // Para que se vea como clickeable
        />
>>>>>>> frontend
      </div>

      <div className="derecha">
        <button
          className="button"
          onClick={onLoginClick}
        >
          Iniciar Sesión
        </button>
        <button
          className="button"
          onClick={() => window.location.href = '/not_yet'}
        >
          Ayuda
        </button>
<<<<<<< HEAD

=======
>>>>>>> frontend
      </div>
    </nav>
  );
}

export default Navbar;