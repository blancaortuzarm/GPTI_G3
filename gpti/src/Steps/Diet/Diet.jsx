import React from 'react';
import './Diet.css';
import eggsIcon from '../../assets/FoodImgs/eggs.svg';
import fishIcon from '../../assets/FoodImgs/fish.svg';
import glutenIcon from '../../assets/FoodImgs/glutten.svg';
import milkIcon from '../../assets/FoodImgs/milk.svg';
import peanutIcon from '../../assets/FoodImgs/peanut.svg';
import shellfishIcon from '../../assets/FoodImgs/seafood.svg';
import nutsIcon from '../../assets/FoodImgs/walnut.svg';

const tiposDieta = [
  { id: 'omnivora', nombre: 'Omnívora' },
  { id: 'vegetariana', nombre: 'Vegetariana' },
  { id: 'vegana', nombre: 'Vegana' },
  { id: 'keto', nombre: 'Keto' },
  { id: 'paleo', nombre: 'Paleo' }
];

const restricciones = [
  { id: 'sin_huevos', nombre: 'Sin huevos', icon: eggsIcon },
  { id: 'sin_pescado', nombre: 'Sin pescado', icon: fishIcon },
  { id: 'sin_gluten', nombre: 'Sin gluten', icon: glutenIcon },
  { id: 'sin_leche', nombre: 'Sin leche de vaca', icon: milkIcon },
  { id: 'sin_mani', nombre: 'Sin maní', icon: peanutIcon },
  { id: 'sin_mariscos', nombre: 'Sin mariscos y crustáceos', icon: shellfishIcon },
  { id: 'sin_nueces', nombre: 'Sin nueces', icon: nutsIcon }
];

const DietStep = ({ formData, onChange, isProfileEdit = false, editTarget = null }) => {
  const shouldShowDiets = !isProfileEdit || editTarget === 'dieta';
  const shouldShowRestrictions = !isProfileEdit || editTarget === 'restricciones';

  const handleDietSelect = (dietId) => {
    onChange({
      target: {
        name: 'dieta',
        value: dietId
      }
    });
  };

  const handleRestriccionToggle = (restriccionId) => {
    // Obtener array actual de restricciones o inicializar como vacío
    const restriccionesActuales = [...(formData.restricciones || [])];
    
    // Verificar si la restricción ya está seleccionada
    const index = restriccionesActuales.indexOf(restriccionId);
    
    if (index === -1) {
      // Si no está en el array, añadirla
      restriccionesActuales.push(restriccionId);
    } else {
      // Si ya está en el array, quitarla
      restriccionesActuales.splice(index, 1);
    }
    
    // Actualizar el estado con el nuevo array
    onChange({
      target: {
        name: 'restricciones',
        value: restriccionesActuales
      }
    });
  };

  return (
    <div className="step-content">
       {shouldShowDiets && (
          <h2 className="view-title">Elige tu dieta</h2>
       )}
      {shouldShowDiets && (
      <div className="diet-grid">
        {tiposDieta.map((tipo) => (
          <div
            key={tipo.id}
            className={`diet-card ${formData.dieta === tipo.id ? 'selected' : ''}`}
            onClick={() => handleDietSelect(tipo.id)}
            tabIndex={0}
            role="button"
            aria-pressed={formData.dieta === tipo.id}
          >
            <div className="diet-name-container">
              <div className="diet-name">{tipo.nombre}</div>
              {formData.dieta === tipo.id && (
                <span className="diet-check">
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
      </div>)}
      
      {shouldShowRestrictions && (
          <h2 className="view-title">Restricciones alimentarias</h2>
       )}
      {shouldShowRestrictions && (
      <div className="restricciones-grid">
        {restricciones.map((r) => (
          <div
            key={r.id}
            className={`restriccion-card ${formData.restricciones && formData.restricciones.includes(r.id) ? 'selected' : ''}`}
            onClick={() => handleRestriccionToggle(r.id)}
            tabIndex={0}
            role="button"
            aria-pressed={formData.restricciones && formData.restricciones.includes(r.id)}
          >
            <div className="restriccion-img-container">
              <img src={r.icon} alt={r.nombre} />
              {formData.restricciones && formData.restricciones.includes(r.id) && (
                <span className="restriccion-check">
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
            <div className="restriccion-card-content">
              <div className="restriccion-title">{r.nombre}</div>
            </div>
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default DietStep;