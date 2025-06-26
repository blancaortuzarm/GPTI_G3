import React from 'react';
import './Meals.css';

const opcionesComidas = ['2', '3', '4', '5'];
const opcionesSnacks = ['0', '1', '2', '3', '4'];

const MealsStep = ({ formData, onChange, isProfileEdit = false, editTarget = null }) => {
  const shouldShowComidas = !isProfileEdit || editTarget === 'comidas';
  const shouldShowSnacks = !isProfileEdit || editTarget === 'snacks';

  // Convertimos a string para asegurar comparaciones correctas con las opciones
  const comidasValue = String(formData.comidas || '3');
  const snacksValue = String(formData.snacks || '2');

  const handleComidaSelect = (num) => {
    onChange({ 
      target: { 
        name: 'comidas', 
        value: num 
      } 
    });
  };

  const handleSnackSelect = (num) => {
    onChange({ 
      target: { 
        name: 'snacks', 
        value: num 
      } 
    });
  };

  return (
    <div className="step-content">
      {shouldShowComidas && shouldShowSnacks && (
        <h2 className="view-title">Comidas y snacks</h2>
      )}
      
      {shouldShowComidas && (
        <div className="meals-section">
          {isProfileEdit && editTarget === 'comidas' && (
            <h2 className="view-title">Comidas principales</h2>
          )}
          <h3>¿Cuántas comidas principales haces al día?</h3>
          <div className="meal-grid">
            {opcionesComidas.map((num) => (
              <div
                key={num}
                className={`meal-card ${
                  comidasValue === num ? 'selected' : ''
                }`}
                onClick={() => handleComidaSelect(num)}
                tabIndex={0}
                role="button"
                aria-pressed={comidasValue === num}
              >
                <div className="meal-name-container">
                  <div className="meal-name">{num}</div>
                  {comidasValue === num && (
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
      )}
      
      {shouldShowSnacks && (
        <div className="meals-section">
          {isProfileEdit && editTarget === 'snacks' && (
            <h2 className="view-title">Refrigerios (snacks)</h2>
          )}
          <h3>¿Cuántos snacks comes al día?</h3>
          <div className="meal-grid">
            {opcionesSnacks.map((num) => (
              <div
                key={num}
                className={`meal-card ${
                  snacksValue === num ? 'selected' : ''
                }`}
                onClick={() => handleSnackSelect(num)}
                tabIndex={0}
                role="button"
                aria-pressed={snacksValue === num}
              >
                <div className="meal-name-container">
                  <div className="meal-name">{num}</div>
                  {snacksValue === num && (
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
      )}
    </div>
  );
};

export default MealsStep;