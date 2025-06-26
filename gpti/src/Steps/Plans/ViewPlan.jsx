import React from 'react';
import './Plans.css';

const ViewPlanStep = ({ formData, onBack }) => {
  return (
    <div className="plan-container">
      <h2 className="view-title">Mi Plan de Alimentación</h2>
      
      <div className="plan-content">
        <div className="plan-week-nav">
          <button className="week-nav-button">Semana Anterior</button>
          <h3 className="current-week">Semana actual</h3>
          <button className="week-nav-button">Próxima Semana</button>
        </div>
        
        <div className="days-container">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
            <div key={day} className="day-card">
              <h4 className="day-title">{day}</h4>
              <div className="meals-list">
                <div className="meal-item">
                  <h5 className="meal-time">Desayuno</h5>
                  <p className="meal-description">Placeholder para el desayuno</p>
                </div>
                {formData.comidas >= 3 && (
                  <div className="meal-item">
                    <h5 className="meal-time">Almuerzo</h5>
                    <p className="meal-description">Placeholder para el almuerzo</p>
                  </div>
                )}
                {formData.snacks >= 1 && (
                  <div className="meal-item snack">
                    <h5 className="meal-time">Snack</h5>
                    <p className="meal-description">Placeholder para el snack</p>
                  </div>
                )}
                <div className="meal-item">
                  <h5 className="meal-time">Cena</h5>
                  <p className="meal-description">Placeholder para la cena</p>
                </div>
              </div>
            </div>
          ))}
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

export default ViewPlanStep;