import React, { useState, useEffect } from 'react';
import './History.css';

const History = () => {
  const [analysisHistory, setAnalysisHistory] = useState([]);

  useEffect(() => {
    const userHistory = localStorage.getItem('userAnalysisHistory');
    if (userHistory) {
      setAnalysisHistory(JSON.parse(userHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('userAnalysisHistory');
    setAnalysisHistory([]);
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>Mi Historial de Análisis</h1>
        {analysisHistory.length > 0 && (
          <button className="history-clear-btn" onClick={clearHistory}>
            Limpiar Historial
          </button>
        )}
      </div>

      {analysisHistory.length === 0 ? (
        <div className="history-empty">
          <p>No hay análisis realizados aún</p>
          <button 
            className="history-empty-btn"
            onClick={() => window.location.href = '/image-processor'}
          >
            Realizar Primer Análisis
          </button>
        </div>
      ) : (
        <div className="history-grid">
          {analysisHistory.map((analysis, index) => (
            <div key={index} className="history-analysis-card">
              <div className="history-analysis-image">
                <img src={analysis.image} alt={`Análisis ${index + 1}`} />
              </div>
              <div className="history-analysis-info">
                <h3>Análisis {index + 1}</h3>
                <p><strong>Fecha:</strong> {analysis.date}</p>
                <p><strong>Resultado:</strong> {analysis.result}</p>
                <p><strong>Confianza:</strong> {analysis.confidence}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;