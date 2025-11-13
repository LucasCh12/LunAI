import React, { useState, useRef } from 'react';


import './ImageProcessor.css';

export default function ImageProcessor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

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
    setLoading(true);
    setError(null);
    setResult(null);

    try {

      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('user_id', user.id);
      if (user.role === 'profesional') {
        formData.append('patient_name', patientName);
        formData.append('patient_age', patientAge);
      }

      const resp = await fetch('http://localhost:5000/predict', {
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
        <ul>
          <li>Diagnóstico inteligente con IA</li>
          <li>Seguimiento de cambios temporales</li>
        </ul>
        
        {user?.role === "profesional" && (
          <div className="patient-section">
            <input
              type="text"
              placeholder="Nombre del paciente"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Edad"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
            />
          </div>
        )}

        <div className="separator"></div>
        
        <h3>Tu asistente dermatológico con IA</h3>
        
        <button 
          className="button-up"
          disabled={!selectedImage || loading}
          onClick={handleAnalyze}
        >
          {loading ? 'Analizando...' : (selectedImage ? 'Analizar imagen' : 'Selecciona una imagen')}
        </button>
        
        <p>Sube una foto clara de tu lunar para análisis IA</p>

        {result && (
          <div className="result-box">
            <h4>Resultado</h4>
            <p>Clase: {result.resultado}</p>
            <p>Confianza: {(result.confianza ?? 0).toFixed(4)}</p>
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