#  LunAI 🤖
Aplicación web que utiliza inteligencia artificial para clasificar imágenes de lunares como benignos o potencialmente malignos.

⚠️ Advertencia: Este proyecto es educativo. No debe usarse para diagnóstico médico real.

# Objetivo 🎯
Queremos, con el uso de inteligencia artificial, ayudar a prevenir y diagnosticar lunares, melanomas y lesiones de piel, clasificandolas para el usuario e informandole la posibilidad de riesgo de cancer, en el caso que sean malignas. Vemos en esta herramienta un uso positivo, útil y ético de la IA que puede ser de gran ayuda, tanto a individuos como en el area médica.

# Tecnologías 🔧
- React / Javascript (Node)
- Python / Flask
- Redes neuronales convolucionales (CNN) / TensorFlow / Keras
- Docker

# Integrantes 👥
Back-End:
- Agustin Serafin
- Ignacio Cerutti Norris

Front-End:
- Santiago Amaya
- Lucas Chiapella

Engine:
- Juan Cruz Irigoyen
- Marysol Guitierrez
- Sebastián Ammann Berruti

Metodología SCRUM de trabajo

# Instalación y Ejecución 🚀

Puedes levantar el proyecto de dos formas: usando Docker (recomendado) o manualmente.

### Opción A: Con Docker 🐳

Asegúrate de estar en la carpeta raíz del proyecto.

1. **Construir los contenedores:**
   ```bash
   sudo docker compose build
2. **Levantar la aplicación:**
   ```bash
   sudo docker compose up
3. **Acceder:**
   Abre tu navegador en: http://localhost:3000/

### Opción B: Manualmente 🛠️

Necesitarás dos terminales abiertas: una para el Backend y otra para el Frontend.

1. **Configurar el Backend (Terminal #1)**
    ```bash
    cd backend
  
    # Crear entorno virtual
    python -m venv venv
  
    # Activar entorno virtual
    # En Linux/Mac:
    source venv/bin/activate
    # En Windows:
    venv\Scripts\activate
  
    # Instalar dependencias (solo la primera vez)
    pip install -r requirements.txt
    
    # Iniciar servidor
    python app.py
    ```

1. **Configurar el Frontend (Terminal #2)**
    ```bash
    cd lunai
  
    # Instalar dependencias (solo la primera vez)
    npm install
    
    # Nota: Si aparece error con axios o router, ejecutar:
    # npm install react-router-dom axios
    
    # Iniciar aplicación web
    npm start
    ```
3. **Acceder:**
   Abre tu navegador en: http://localhost:3000/

  ### Comandos de Utilidad (Base de Datos) 🗃️

Para verificar el estado de la base de datos manualmente:
```bash
cd backend
# Recuerda activar el entorno virtual primero
python check.py
```
   
# Recursos 📎

- [Prototipo diseño web](https://www.figma.com/design/ivyRJ5GPVwRTSddi4uub8a/Untitled?node-id=0-1&p=f&t=l7aAfI9ArB2nUCf0-0)  
- [Product Discovery (PDF)](./docs/LunAI.pdf)
