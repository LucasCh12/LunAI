import React, { useState, useRef } from 'react';

import './ImageProcessor.css';

export default function ImageProcessor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
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
        
        <div className="separator"></div>
        
        <h3>Tu asistente dermatológico con IA</h3>
        
        <button 
          className="button-up"
          disabled={!selectedImage}
        >
          {selectedImage ? 'Analizar imagen' : 'Selecciona una imagen'}
        </button>
        
        <p>Sube una foto clara de tu lunar para análisis IA</p>
      </div>
    </div>
  );
}