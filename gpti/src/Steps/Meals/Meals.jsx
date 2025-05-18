import React from 'react';
import './Meals.css';

const MealsStep = ({ formData, onChange }) => {
  return (
    <div className="step-content">
      <h2 className="view-title">Comidas y snacks</h2>
      <div className="form-group">
        <label>Número de comidas principales:</label>
        <select
          name="comidas"
          value={formData.comidas}
          onChange={onChange}
          className="form-control"
        >
          <option value="2">2 comidas</option>
          <option value="3">3 comidas</option>
          <option value="4">4 comidas</option>
          <option value="5">5 comidas</option>
        </select>
      </div>

      <div className="form-group">
        <label>Número de snacks:</label>
        <select
          name="snacks"
          value={formData.snacks}
          onChange={onChange}
          className="form-control"
        >
          <option value="0">0 snacks</option>
          <option value="1">1 snack</option>
          <option value="2">2 snacks</option>
          <option value="3">3 snacks</option>
          <option value="4">4 snacks</option>
        </select>
      </div>
    </div>
  );
};

export default MealsStep;