import React, { useState, useRef, useEffect } from 'react';


import './ImageProcessor.css';

export default function ImageProcessor({ user }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const resultRef = useRef(null);


  const handleImageUpload = (event) => {
    setError(null);
    setResult(null);
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setError(null);
    setResult(null);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    if(user?.role === 'professional'){
      if(!patientName.trim()){
        setError('Por favor, ingresa el nombre del paciente.');
        return;
      }
      if(!patientAge || isNaN(patientAge) || patientAge <= 0){
        setError('Por favor, ingresa una edad válida para el paciente.');
        return;
      }
      if(!patientGender){
        setError('Por favor, selecciona el género del paciente.');
        return;
      }
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {

      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('user_id', user.id);
      if (user.role === 'professional') {
        formData.append('patient_name', patientName);
        formData.append('patient_age', patientAge);
        formData.append('patient_gender', patientGender);
      }

        const resp = await fetch('http://localhost:5000/images/upload_image', {
        method: 'POST',
        body: formData
      });

      let data;
      try {
        data = await resp.json();
      } catch {
        const text = await resp.text();
        throw new Error(text || `HTTP ${resp.status}`);
      }

      if (!resp.ok) {
        throw new Error(data?.error || JSON.stringify(data) || `HTTP ${resp.status}`);
      }

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err.message || 'Error en la petición');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [result]);

  return (
    <div className="image-upload-container">
      <div className="left-column">
        <div 
          className={`upload-box ${selectedImage ? 'has-image' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleBoxClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          {imagePreview ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <div className="change-image-text">Haz clic para cambiar imagen</div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <div className="upload-icon">📷</div>
              <p>Arrastra tu imagen aquí</p>
              <p>o haz clic para explorar</p>
              <small>Formatos: JPG, PNG, JPEG</small>
            </div>
          )}
        </div>
      </div>

      <div className="right-column">
        <h2>Analizar Lunar</h2>
        <ul className="text-of-image-processor">
          <li>Diagnóstico inteligente con IA</li>
          <li>Seguimiento de cambios temporales</li>
        </ul>

        {user?.role === "professional" && (
          <div className="patient-form-section">
            <h3>Información del Paciente</h3>
            <input
              type="text"
              placeholder="Nombre del paciente"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="patient-input"
            />
            <input
              type="number"
              placeholder="Edad"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              className="patient-input"
            />
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              className="patient-input"
            >
              <option value="">Selecciona género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        )}

        <div className="separator"></div>
        
        <h3 className= "text-of-image-processor">Tu asistente dermatológico con IA</h3>
        
        <button 
          className="button-up"
          disabled={!selectedImage || loading || (user?.role === 'professional' && (!patientName || !patientAge || !patientGender))}
          onClick={handleAnalyze}
        >
          {loading ? 'Analizando...' : (selectedImage ? 'Analizar imagen' : 'Selecciona una imagen')}
        </button>
        
        <p className= "text-of-image-processor">Sube una foto clara de tu lunar para análisis IA</p>

        {result && (
          <div className="result-box" ref={resultRef}>
            <h4>Resultado</h4>
            <p>Clase: {result.result}</p>
            <p>Confianza: {(result.confidence ?? 0).toFixed(4)}</p>
          </div>
        )}

        {error && (
          <div className="error-box" style={{ color: 'red' }}>
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}