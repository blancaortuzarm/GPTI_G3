import React from 'react';
import './Start.css';

const WelcomeStep = ({ onLogin, onRegister }) => {
  return (
    <div className="welcome-container">
      <h1>¡Bienvenido a NutriPlan!</h1>
      <p>Tu asistente personalizado para crear planes de alimentación adaptados a tus necesidades.</p>
      
      <div className="welcome-buttons">
        <button className="login-button" onClick={onLogin}>
          Iniciar Sesión
        </button>
        <button className="register-button" onClick={onRegister}>
          Crear Cuenta
        </button>
      </div>
    </div>
  );
};

export default WelcomeStep;