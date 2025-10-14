import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="izquierda">
        <img src="/logo.png" alt="Logo Lunai"/>
      </div>
      <div className="derecha">
            <button className="button" onclick="location.href='/not_yet'">Ayuda</button>
            <button className="button" onclick="location.href='/login'">Cerrar Sesión</button>
        </div>
    </nav>
  );
}

export default Navbar;
