import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar({ onLoginClick, onLogoutClick, isAuthenticated, user }) {
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
      </div>

      <div className="derecha">
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'white', fontSize: '14px' }}>
              Hola, {user?.name || 'Usuario'}
            </span>
            <button
              className="button"
              onClick={onLogoutClick}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;