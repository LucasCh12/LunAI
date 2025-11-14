import React, { useEffect, useState } from "react";
import "./Historial.css";
import { data } from "react-router-dom";

export default function Historial({ user }) {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [patients, setPatients] = useState([]);


  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/images/get_images?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setImages(data);
          if(user.role === 'professional') {
            const grouped = {};
            data.forEach(img => {
              const pid = img.patient_id || "sin-paciente";
              if (!grouped[pid]) grouped[pid] = [];
              grouped[pid].push(img);
            });
            setPatients(grouped);
          }
        }
      })
      .catch(err => console.error(err));
  }, [user]);
  if (!user) {
    return (
      <div className="historial-container">
        <h2>Historial de Análisis</h2>
        <p className="sin-registros">Por favor, inicia sesión para ver tu historial de imágenes analizadas.</p>
      </div>
    );
  }

  if (user.role !== 'professional') {
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
        {selected && renderModal(selected,setSelected)}
      </div>
    );
  }

  return (
    <div className="historial-container professional-view">
      <h2>Historial de Pacientes</h2>

      {Object.keys(patients).length === 0 ? (
        <p className="sin-registros">No tienes pacientes registrados aún.</p>
      ) : (
        Object.entries(patients).map(([patientId, imgs]) => {
          const patient = imgs[0];
          const patientName = patient.patient_name || "Paciente sin nombre";
          const patientIdLabel = patientId === "sin-paciente" ? "" : ` - ID: ${patientId}`;

          return (
            <div key={patientId} className="patient-section">
              <h3 className="patient-name">
                {patientName}{patientIdLabel}
              </h3>
              <PatientImageRow images={imgs} onImageClick={setSelected} />
            </div>
          );
        })
      )}

      {/* MODAL */}
      {selected && renderModal(selected, setSelected)}
    </div>
  );
}
function PatientImageRow({ images, onImageClick }) {
  const[startIdx, setStartIdx] = useState(0);
  const IMAGES_PER_PAGE = 5;
  const total = images.length;
  const canNext = startIdx + IMAGES_PER_PAGE < total;
  return (
    <div className="images-row-container">
      <div className="images-row">
        {images.slice(startIdx, startIdx + IMAGES_PER_PAGE).map((img,idx) => (
          <div
            key={img.id}
            className="patient-thumb"
            onClick={() => onImageClick(img)}
          >
            <img 
              src={`http://localhost:5000/images/uploads/${img.name}`} alt={`Foto ${idx + 1}`} />
            <div className="thumb-info">
              <p><strong>Resultado:</strong> {img.result}</p>
              <p> {new Date (img.uploaded_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      {canNext && (
        <button 
          className="next-button"
          onClick={() => setStartIdx(prev => prev + 1)}
        >
           &gt;
        </button>
      )}
    </div>
  );
}
function renderModal(selected, onClose) {
  return (
    <div className="modal-overlay" onClick={ onClose}>
      <div className="modal-for-historial" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>X</button>
        <img 
          src={`http://localhost:5000/images/uploads/${selected.name}`} 
          alt="Lunar Ampliado"
          className="modal-img"
        />
        <h3>Detalles del Análisis</h3>
        <p className="text-for-historial"><strong>Resultado:</strong> {selected.result}</p>
        <p className="text-for-historial"><strong>Confianza:</strong> {selected.confidence.toFixed(4)}</p>
        <p className="text-for-historial"><strong>Fecha de Análisis:</strong> {new Date(selected.uploaded_at).toLocaleString()}</p>
        {selected.patient_name && (
          <>
          <p className="text-for-historial"><strong>Paciente:</strong> {selected.patient_name}</p>
          <p className="text-for-historial"><strong>Edad:</strong> {selected.patient_age}</p> 
          </>
        )}
      </div>
    </div>
  );
}