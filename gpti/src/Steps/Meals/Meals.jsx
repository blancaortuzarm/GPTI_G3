import React from 'react';
import './Meals.css';

const opcionesComidas = ['2', '3', '4', '5'];
const opcionesSnacks = ['0', '1', '2', '3', '4'];

const MealsStep = ({ formData, onChange }) => {
  return (
    <div className="step-content">
      <h2 className="view-title">Comidas y snacks</h2>

      <div className="meals-section">
        <h3>¿Cuántas comidas principales haces al día?</h3>
        <div className="opciones-grid">
          {opcionesComidas.map((num) => (
            <div
              key={num}
              className={`opcion-card ${
                formData.comidas === num ? 'selected' : ''
              }`}
              onClick={() =>
                onChange({ target: { name: 'comidas', value: num } })
              }
            >
              {num} comidas
            </div>
          ))}
        </div>
      </div>

      <div className="meals-section">
        <h3>¿Cuántos snacks comes al día?</h3>
        <div className="opciones-grid">
          {opcionesSnacks.map((num) => (
            <div
              key={num}
              className={`opcion-card ${
                formData.snacks === num ? 'selected' : ''
              }`}
              onClick={() =>
                onChange({ target: { name: 'snacks', value: num } })
              }
            >
              {num} {num === '1' ? 'snack' : 'snacks'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealsStep;
