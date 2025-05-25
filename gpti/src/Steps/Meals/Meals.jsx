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
        <div className="meal-grid">
          {opcionesComidas.map((num) => (
            <div
              key={num}
              className={`meal-card ${
                formData.comidas === num ? 'selected' : ''
              }`}
              onClick={() =>
                onChange({ target: { name: 'comidas', value: num } })
              }
              tabIndex={0}
              role="button"
              aria-pressed={formData.comidas === num}
            >
              <div className="meal-name-container">
                <div className="meal-name">{num}</div>
                {formData.comidas === num && (
                  <span className="meal-check">
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="14" fill="#fff" />
                      <path 
                        d="M10 14l3 3 5-5" 
                        stroke="#ffb612" 
                        strokeWidth="2.2" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="meals-section">
        <h3>¿Cuántos snacks comes al día?</h3>
        <div className="meal-grid">
          {opcionesSnacks.map((num) => (
            <div
              key={num}
              className={`meal-card ${
                formData.snacks === num ? 'selected' : ''
              }`}
              onClick={() =>
                onChange({ target: { name: 'snacks', value: num } })
              }
              tabIndex={0}
              role="button"
              aria-pressed={formData.snacks === num}
            >
              <div className="meal-name-container">
                <div className="meal-name">{num}</div>
                {formData.snacks === num && (
                  <span className="meal-check">
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="14" fill="#fff" />
                      <path 
                        d="M10 14l3 3 5-5" 
                        stroke="#ffb612" 
                        strokeWidth="2.2" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealsStep;