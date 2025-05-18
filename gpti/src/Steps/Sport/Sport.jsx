
import React from 'react';
import './Sport.css';

const SportStep = ({ formData, onChange }) => {
  return (
    <div className="step-content">
      <h2 className="view-title">Elige tu deporte</h2>
      <div className="form-group">
        <select
          name="deporte"
          value={formData.deporte}
          onChange={onChange}
          className="form-control"
        >
          <option value="">Selecciona un deporte</option>
          <option value="futbol">Fútbol</option>
          <option value="baloncesto">Baloncesto</option>
          <option value="natacion">Natación</option>
          <option value="ciclismo">Ciclismo</option>
          <option value="running">Running</option>
          <option value="crossfit">CrossFit</option>
        </select>
      </div>
    </div>
  );
};

export default SportStep;