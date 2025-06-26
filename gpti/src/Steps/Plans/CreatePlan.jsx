import React from 'react';
import './Plans.css';

const CreatePlanStep = ({ formData, onBack }) => {
  return (
    <div className="plan-container">
      <h2 className="view-title">Creación de Plan de Alimentación</h2>
      
      <div className="plan-content-placeholder">
        <div className="placeholder-message">
          <i className="fas fa-utensils placeholder-icon"></i>
          <p>Aquí se mostrarán las opciones para crear tu plan de alimentación personalizado.</p>
          <p>Basado en tus preferencias:</p>
          <ul className="preferences-list">
            <li><span>Tipo de dieta:</span> {formData.dieta || 'No especificada'}</li>
            <li><span>Nivel de actividad:</span> {formData.deporte || 'No especificado'}</li>
            <li><span>Comidas diarias:</span> {formData.comidas || '3'}</li>
            <li><span>Restricciones:</span> {formData.restricciones && formData.restricciones.length > 0 ? 
              formData.restricciones.join(', ') : 'Ninguna'}</li>
          </ul>
        </div>
      </div>
      
      <div className="plan-actions">
        <button className="back-button" onClick={onBack}>
          Volver a Mi Perfil
        </button>
      </div>
    </div>
  );
};

export default CreatePlanStep;