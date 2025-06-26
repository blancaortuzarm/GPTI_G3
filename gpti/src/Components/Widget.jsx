import React, { useState } from 'react';
import './Widget.css';
import WelcomeStep from '../Steps/Start/Start';
import LoginStep from '../Steps/Auth/Login';
import RegisterStep from '../Steps/Auth/Register';
import ProfileStep from '../Steps/Profile/Profile';
import SportStep from '../Steps/Sport/Sport';
import GenderStep from '../Steps/Gender/Gender';
import WeightStep from '../Steps/Weight/Weight';
import DietStep from '../Steps/Diet/Diet';
import MealsStep from '../Steps/Meals/Meals';
import ResultStep from '../Steps/Result/Result';

const MultiStepForm = () => {
  // Agregar un estado para controlar la vista (normal o autenticación)
  const [view, setView] = useState('welcome'); // 'welcome', 'login', 'register', 'profile', 'form'
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    deporte: '',
    sexo: '',
    peso: '',
    dieta: '',
    restricciones: [],
    comidas: 3,
    snacks: 2,
    // Nuevos campos para usuario autenticado
    nombre: '',
    edad: '',
    email: '',
    planCreated: false // Para controlar si el usuario ya tiene un plan
  });

  const totalSteps = 5;
  const showProgressBar = view === 'form' && currentStep >= 1 && currentStep <= totalSteps;
  const isLastFormStep = currentStep === totalSteps;
  const isResultStep = currentStep === totalSteps + 1;

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.deporte !== '';
      case 2: 
        return formData.sexo !== '';
      case 3: 
        return formData.peso !== '';
      case 4: 
        return formData.dieta !== '';
      case 5:
        return formData.comidas !== '' && formData.snacks !== '';
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
    // Al finalizar el formulario, marcamos que el usuario tiene un plan
    if (isLastFormStep) {
      setFormData({
        ...formData,
        planCreated: true
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          [name]: [...formData[name], value]
        });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter(item => item !== value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Manejadores para autenticación
  const handleLoginClick = () => {
    setView('login');
  };

  const handleRegisterClick = () => {
    setView('register');
  };

  const handleLoginSubmit = (loginData) => {
    // Aquí iría la lógica de autenticación real
    console.log('Login data:', loginData);
    
    // Por ahora solo simularemos un inicio de sesión exitoso
    setFormData({
      ...formData,
      email: loginData.email,
      // Otros datos que vendrían del servidor
      nombre: 'Usuario'
    });
    setView('profile'); // Ahora va al perfil en lugar de al formulario directamente
  };

  const handleRegisterSubmit = (registerData) => {
    // Aquí iría la lógica de registro real
    console.log('Register data:', registerData);
    
    // Por ahora solo simularemos un registro exitoso
    setFormData({
      ...formData,
      nombre: registerData.nombre,
      edad: registerData.edad,
      email: registerData.email
    });
    setView('profile'); // Ir al perfil después del registro
  };

  const handleProfileUpdate = (updatedData) => {
    // Actualizar los datos del usuario
    setFormData({
      ...formData,
      ...updatedData
    });
  };

  const handleStartPlanCreation = () => {
    // Empezar con el plan de alimentación
    setView('form');
    setCurrentStep(1);
  };

  const handleBackToWelcome = () => {
    setView('welcome');
  };

  // Al finalizar el formulario, regresar al perfil con el plan creado
  const handlePlanCreated = () => {
    setFormData({
      ...formData,
      planCreated: true
    });
    setView('profile');
  };

  return (
    <div className="form-container">
      {showProgressBar && (
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-line-bg"
              aria-hidden="true"
            ></div>
            <div
              className="progress-line-fill"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              aria-hidden="true"
            ></div>

            {[...Array(totalSteps)].map((_, index) => (
              <div
                key={index}
                className={`progress-step ${index + 1 <= currentStep ? 'active' : ''}`}
              >
                <div className="progress-circle">
                  {index + 1}
                </div>
                <span className="step-label">
                  {`Paso ${index + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="form-content">
        {view === 'welcome' && (
          <WelcomeStep 
            onLogin={handleLoginClick}
            onRegister={handleRegisterClick}
          />
        )}

        {view === 'login' && (
          <LoginStep 
            onBack={handleBackToWelcome}
            onSubmit={handleLoginSubmit}
          />
        )}

        {view === 'register' && (
          <RegisterStep 
            onBack={handleBackToWelcome}
            onSubmit={handleRegisterSubmit}
          />
        )}

        {view === 'profile' && (
          <ProfileStep 
            formData={formData}
            onUpdate={handleProfileUpdate}
            onContinue={handleStartPlanCreation}
          />
        )}

        {view === 'form' && isResultStep ? (
          <ResultStep formData={formData} onFinish={handlePlanCreated} />
        ) : view === 'form' && (
          <form onSubmit={isLastFormStep ? handleSubmit : (e) => e.preventDefault()}>
            {currentStep === 1 && (
              <SportStep 
                formData={formData} 
                onChange={handleChange} 
              />
            )}

            {currentStep === 2 && (
              <GenderStep 
                formData={formData} 
                onChange={handleChange} 
              />
            )}

            {currentStep === 3 && (
              <WeightStep 
                formData={formData} 
                onChange={handleChange} 
              />
            )}

            {currentStep === 4 && (
              <DietStep 
                formData={formData} 
                onChange={handleChange} 
              />
            )}

            {currentStep === 5 && (
              <MealsStep 
                formData={formData} 
                onChange={handleChange} 
              />
            )}
          </form>
        )}
      </div>

      {/* Botones de navegación - No mostrar en vista inicial, de autenticación ni final */}
      {view === 'form' && currentStep > 0 && currentStep <= totalSteps && (
        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            className="prev-button"
            type="button"
          >
            Anterior
          </button>

          {isLastFormStep ? (
            <button
              onClick={handleSubmit}
              className="submit-button"
              type="submit"
            >
              Enviar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="next-button"
              type="button"
            >
              Siguiente
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;