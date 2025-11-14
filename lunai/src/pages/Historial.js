import React, { useEffect, useState } from "react";
import "./Historial.css";

export default function Historial({ user }) {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null); // Para el modal

  useEffect(() => {
    fetch(`http://localhost:5000/images/get_images?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setImages(data);
      })
      .catch(err => console.error(err));
  }, [user.id]);

  return (
    <div className="historial-container">
      <h2>Historial de Análisis</h2>

      {images.length === 0 && (
        <p className="sin-registros">No tienes imágenes analizadas aún.</p>
      )}

      <div className="historial-grid">
        {images.map(img => (
          <div 
            key={img.id} 
            className="hist-card"
            onClick={() => setSelected(img)}
          >
            <img 
              src={`http://localhost:5000/images/uploads/${img.name}`} 
              alt="Lunar" 
            />
            <div className="hist-info">
              <p><strong>Resultado:</strong> {img.result}</p>
              <p><strong>Confianza:</strong> {img.confidence.toFixed(4)}</p>
              <p className="fecha">{new Date(img.uploaded_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={() => setSelected(null)}>✖</button>

            <img 
              src={`http://localhost:5000/images/uploads/${selected.name}`} 
              alt="Lunar ampliado"
              className="modal-img"
            />

            <h3>Detalles del análisis</h3>
            <p><strong>Resultado:</strong> {selected.result}</p>
            <p><strong>Confianza:</strong> {selected.confidence.toFixed(4)}</p>
            <p><strong>Fecha:</strong> {new Date(selected.uploaded_at).toLocaleString()}</p>

            {selected.patient_name && (
              <>
                <p><strong>Paciente:</strong> {selected.patient_name}</p>
                <p><strong>Edad:</strong> {selected.patient_age}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
