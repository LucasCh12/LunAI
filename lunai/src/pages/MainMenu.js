import './MainMenu.css'

import Navbar from '../components/Navbar';

function MainMenu() {
  return (
    <div className="MainMenu">
        <Navbar />
        <div className="main-content">
            <div className="main-index">
                    <h1>Bienvenido a LunAI</h1>
                    <h2>Tu asistente inteligente para detectar lunares y cuidar tu piel</h2>
                    <p>Detecta y analiza lunares al instante, con resultados claros y fáciles de entender</p>
                    <div className="action-buttons">
                        <button 
                            className="button-up" 
                            onClick={() => window.location.href='/upload'}
                        >
                            Empieza tu consulta
                        </button>
                    </div>
            </div>
        </div>
    </div>
  );
}

export default MainMenu;
