import React from 'react';
import './Diet.css';
import glutenIcon from '../../assets/FoodImgs/gluten.png';
import lactosaIcon from '../../assets/FoodImgs/lactosa.png';
import frutosSecosIcon from '../../assets/FoodImgs/frutosSecos.png';

const tiposDieta = ['omnivora', 'vegetariana', 'vegana', 'keto', 'paleo'];
const nombresDieta = {
  omnivora: 'Omnívora',
  vegetariana: 'Vegetariana',
  vegana: 'Vegana',
  keto: 'Keto',
  paleo: 'Paleo'
};

const restricciones = [
  { id: 'gluten', nombre: 'Sin gluten', icon: glutenIcon },
  { id: 'lactosa', nombre: 'Sin lactosa', icon: lactosaIcon },
  { id: 'frutos_secos', nombre: 'Sin frutos secos', icon: frutosSecosIcon }
];

const DietStep = ({ formData, onChange }) => {
  const handleRestriccionToggle = (id) => {
    const yaSeleccionado = formData.restricciones.includes(id);
    const nuevas = yaSeleccionado
      ? formData.restricciones.filter((r) => r !== id)
      : [...formData.restricciones, id];

    onChange({ target: { name: 'restricciones', value: nuevas } });
  };

  return (
    <div className="step-content">
      <h2 className="view-title">Elige tu dieta</h2>

      <div className="diet-list">
        {tiposDieta.map((tipo) => (
          <div
            key={tipo}
            className={`diet-item ${formData.dieta === tipo ? 'selected' : ''}`}
            onClick={() =>
              onChange({ target: { name: 'dieta', value: tipo } })
            }
          >
            <span className="diet-label">{nombresDieta[tipo]}</span>
            {formData.dieta === tipo && (
              <span className="diet-check">✔</span>
            )}
          </div>
        ))}
      </div>
      <h2 className="view-title">Restricciones alimentarias</h2>
      <div className="restricciones-grid">
        {restricciones.map((r) => (
          <div
            key={r.id}
            className={`restriccion-card ${
              formData.restricciones.includes(r.id) ? 'selected' : ''
            }`}
            onClick={() => handleRestriccionToggle(r.id)}
          >
            <img src={r.icon} alt={r.nombre} />
            <p>{r.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietStep;
