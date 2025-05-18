import React from 'react';
import './Diet.css';

const DietStep = ({ formData, onChange }) => {
  return (
    <div className="step-content">
      <h2 className="view-title">Elige tu dieta</h2>
      <div className="form-group">
        <label>Tipo de dieta:</label>
        <select
          name="dieta"
          value={formData.dieta}
          onChange={onChange}
          className="form-control"
        >
          <option value="">Selecciona un tipo de dieta</option>
          <option value="omnivora">Omnívora</option>
          <option value="vegetariana">Vegetariana</option>
          <option value="vegana">Vegana</option>
          <option value="keto">Keto</option>
          <option value="paleo">Paleo</option>
        </select>
      </div>

      <div className="form-group">
        <label>Restricciones alimentarias:</label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="checkbox"
              name="restricciones"
              value="gluten"
              checked={formData.restricciones.includes('gluten')}
              onChange={onChange}
            />
            <span>Sin gluten</span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              name="restricciones"
              value="lactosa"
              checked={formData.restricciones.includes('lactosa')}
              onChange={onChange}
            />
            <span>Sin lactosa</span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              name="restricciones"
              value="frutos_secos"
              checked={formData.restricciones.includes('frutos_secos')}
              onChange={onChange}
            />
            <span>Sin frutos secos</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DietStep;