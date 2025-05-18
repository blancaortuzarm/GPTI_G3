import React from 'react';
import './Weight.css';

const WeightStep = ({ formData, onChange }) => {
  return (
    <div className="step-content">
      <h2 className="view-title">Categoría de peso</h2>
      <div className="form-group">
        <select
          name="peso"
          value={formData.peso}
          onChange={onChange}
          className="form-control"
        >
          <option value="">Selecciona tu categoría</option>
          <option value="ligero">Ligero (menos de 60kg)</option>
          <option value="medio">Medio (60-75kg)</option>
          <option value="pesado">Pesado (75-90kg)</option>
          <option value="super_pesado">Super pesado (más de 90kg)</option>
        </select>
      </div>
    </div>
  );
};

export default WeightStep;