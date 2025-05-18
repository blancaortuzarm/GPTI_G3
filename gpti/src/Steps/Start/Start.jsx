import React from 'react';
import './Start.css';

const WelcomeStep = ({ onStart }) => {
  return (
    <div className="welcome-view">
      <h2>Bienvenido al formulario</h2>
      <p>Presiona el botón para comenzar.</p>
      <button
        className="start-button"
        onClick={onStart}
      >
        EMPEZAR
      </button>
    </div>
  );
};

export default WelcomeStep;