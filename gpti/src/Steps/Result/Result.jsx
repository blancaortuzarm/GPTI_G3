import React from 'react';
import './Result.css';

const ResultStep = ({ formData }) => {
  return (
    <div className="result-view">
      <h2 className="view-title">Formulario Completado</h2>
      <p className="view-description">
        Gracias por completar el formulario. Aquí verás tus resultados.
      </p>
      <div className="result-data">
        <p><strong>Deporte:</strong> {formData.deporte}</p>
        <p><strong>Sexo:</strong> {formData.sexo}</p>
        <p><strong>Categoría de peso:</strong> {formData.peso}</p>
        <p><strong>Dieta:</strong> {formData.dieta}</p>
        <p><strong>Restricciones:</strong> {formData.restricciones.join(', ') || 'Ninguna'}</p>
        <p><strong>Comidas principales:</strong> {formData.comidas}</p>
        <p><strong>Snacks:</strong> {formData.snacks}</p>
      </div>
    </div>
  );
};

export default ResultStep;