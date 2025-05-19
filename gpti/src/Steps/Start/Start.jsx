import React from 'react';
import './Start.css';

const WelcomeStep = ({ onStart }) => {
  return (
    <div className="welcome-view">
      <div className="overlay" />
      <div className="welcome-content">
        <h1>Bienvenido a 👋</h1>
        <h2 className="brand">Plataforma de Nutrición Deportiva Personalizada</h2>
        <p className="description">Descubre las mejores recomendaciones nutricionales con IA.</p>
        <button className="start-button" onClick={onStart}>
          Empecemos
        </button>
      </div>
    </div>
  );
};

export default WelcomeStep;