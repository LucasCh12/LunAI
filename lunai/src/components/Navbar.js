import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar({ user, onLoginClick, onLogout }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Esto te llevará a la ruta principal (MainMenu)
  };

  const goToHelp = () => {
    navigate('/'); // Primero navega al MainMenu

    // Esperamos un poquito a que se renderice el componente
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // Scroll suave
      });
    }, 100); // 100ms es suficiente para que cargue el componente
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
        {user ? (
          <>
            <span className="username">👋 Hola, {user.name}</span>
            <button className="button" onClick={() => navigate('/history')}>Mis lunares</button>
            <button className="button" onClick={() => navigate('/image-processor')}>Analiza</button>
            <button className="button" onClick={goToHelp}>Ayuda</button>
            <button className="button" onClick={onLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <button className="button" onClick={onLoginClick}>
              Iniciar Sesión
            </button>
            <button className="button" onClick={goToHelp}>
              Ayuda
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
