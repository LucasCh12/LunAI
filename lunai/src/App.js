import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="barra">
        <div class="izquierda">
            <img src="/logo.png" alt="Logo Lunai"/>
        </div>
    </div>
    <div class="main-content">
        <div class ="main-right">
            <div class="main-column">
                <div class="balance-section">
                    <p class ="titleB"> Tu Dinero: </p>
                    <p class="balance">$</p>
                    <div class="action-buttons">
                        <button class="deposit-btn" onclick="location.href='/not_yet'">Ingresar Dinero</button>
                        <button class="transfer-btn" onclick="location.href='/transfer'">Transferir Dinero</button>
                    </div>
                </div>
                <div class="features-section">
                    <button class="feature-button" onclick="location.href='/not_yet'">
                    Pagar servicios
                    </button>
                    <button class="feature-button" onclick="location.href='/not_yet'">
                    Pedir Préstamo
                    </button>
                    <button class="feature-button" onclick="location.href='/roulette'">
                    Gira y Gana
                    </button>
                    <button class="feature-button" onclick="location.href='/not_yet'">
                    Agregar amigos
                    </button>
                    <button class="feature-button" onclick="location.href='/not_yet'">
                    Compra Cripto
                    </button>
                    <button class="feature-button" onclick="location.href='/not_yet'">
                    Compra Dólares
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default App;
