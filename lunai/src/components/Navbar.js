import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar({ onLoginClick, onLogoutClick, isAuthenticated, user }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="izquierda">
        <img 
          src="/logo.png" 
          alt="Logo Lunai" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className="derecha">
        {isAuthenticated ? (
          <>
            <button
              className="button"
              onClick={() => navigate('/history')}
            >
              Mi Historial
            </button>
            <span style={{ color: 'white', fontSize: '14px', margin: '0 10px' }}>
              Hola, {user?.name || 'Usuario'}
            </span>
            <button
              className="button"
              onClick={onLogoutClick}
            >
              Cerrar Sesión
            </button>
          </>
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