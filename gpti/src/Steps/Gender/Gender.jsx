import React from 'react';
import './Gender.css';

const GenderStep = ({ formData, onChange }) => {
  return (
    <div className="step-content">
      <h2 className="view-title">Elige tu sexo</h2>
      <div className="form-group radio-group">
        <label className="radio-option">
          <input
            type="radio"
            name="sexo"
            value="masculino"
            checked={formData.sexo === 'masculino'}
            onChange={onChange}
          />
          <span>Masculino</span>
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="sexo"
            value="femenino"
            checked={formData.sexo === 'femenino'}
            onChange={onChange}
          />
          <span>Femenino</span>
        </label>
      </div>
    </div>
  );
};

export default GenderStep;