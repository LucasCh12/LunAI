import './Navbar.css';

function Navbar({ onLoginClick }) {
  return (
    <nav className="navbar">
      <div className="izquierda">
        <img src="/logo.png" alt="Logo Lunai" />
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

      </div>
    </nav>
  );
}

export default Navbar;