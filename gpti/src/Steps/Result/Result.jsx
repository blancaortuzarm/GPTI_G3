import React from 'react';
import './Result.css';

const ResultStep = ({ formData }) => {
  console.log(formData);
  return (
    <div className="result-view">
      <h2 className="view-title">¡Formulario Completado! 🎉</h2>
      <p className="view-description">
        Gracias por completar el formulario. Este es tu resumen personalizado:
      </p>

      <div className="result-grid">
        <div className="result-card">
          <strong>Deporte:</strong>
          <span>{formData.deporte || 'No definido'}</span>
        </div>
        <div className="result-card">
          <strong>Sexo:</strong>
          <span>{formData.sexo || 'No definido'}</span>
        </div>
        <div className="result-card">
          <strong>Categoría de peso:</strong>
          <span>{formData.peso || 'No definido'}</span>
        </div>
        <div className="result-card">
          <strong>Dieta:</strong>
          <span>{formData.dieta || 'No definida'}</span>
        </div>
        <div className="result-card">
          <strong>Restricciones:</strong>
          <span>{formData.restricciones.length > 0 ? formData.restricciones.join(', ') : 'Ninguna'}</span>
        </div>
        <div className="result-card">
          <strong>Comidas principales:</strong>
          <span>{formData.comidas || 'No definido'}</span>
        </div>
        <div className="result-card">
          <strong>Snacks:</strong>
          <span>{formData.snacks || 'No definido'}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultStep;
