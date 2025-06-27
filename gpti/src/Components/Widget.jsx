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
import ApiService from '../services/api';
import FormDataMapper from '../utils/formDataMapper';

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

  // Nuevo estado para manejar la información del usuario autenticado
  const [user, setUser] = useState(null); // { id, token, name, email, etc. }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLastFormStep) {
      // Al finalizar el formulario, guardar los datos en el backend
      if (user && user.id && user.token) {
        try {
          // Por ahora vamos a usar un peso simulado basado en la categoría
          // TODO: Agregar un campo de peso real en el formulario
          const simulatedWeight = getWeightFromCategory(formData.peso);
          
          // Mapear los datos del formulario a los IDs de la base de datos
          const profileData = FormDataMapper.mapFormDataToProfile(formData, simulatedWeight);
          
          console.log('Datos del formulario:', formData);
          console.log('Peso simulado:', simulatedWeight);
          console.log('Creando perfil con datos:', profileData);
          
          // Crear el perfil del usuario
          await ApiService.createUserProfile(user.id, profileData, user.token);
          
          // También crear una entrada en el historial con datos básicos
          const historyData = FormDataMapper.mapFormDataToHistory(formData, { 
            weight: simulatedWeight
          });
          console.log('Creando historial con datos:', historyData);
          await ApiService.addUserHistory(user.id, historyData, user.token);
          
          // Guardar restricciones dietéticas si las hay
          if (formData.restricciones && formData.restricciones.length > 0) {
            const restrictionIds = FormDataMapper.getDietaryRestrictionIds(formData.restricciones);
            console.log('Guardando restricciones:', restrictionIds);
            await ApiService.updateUserRestrictions(user.id, restrictionIds, user.token);
          }
          
          console.log('Perfil, historial y restricciones creados exitosamente');
        } catch (error) {
          console.error('Error al crear perfil:', error);
          // Continuar con el flujo aunque falle el guardado
        }
      }
      
      setFormData({
        ...formData,
        planCreated: true
      });
    }
    handleNext();
  };

  // Función helper para obtener un peso simulado basado en la categoría
  const getWeightFromCategory = (categoria) => {
    const weightMapping = {
      'miniflyweight': 47.6,
      'jr_flyweight': 49.0,
      'flyweight': 50.8,
      'jr_bantamweight': 52.2,
      'bantamweight': 53.5,
      'jr_featherweight': 55.3,
      'featherweight': 57.2,
      'jr_lightweight': 59.0,
      'lightweight': 61.2,
      'jr_welterweight': 63.5,
      'welterweight': 66.7,
      'jr_middleweight': 69.9,
      'middleweight': 72.6,
      'super_middleweight': 76.2,
      'light_heavyweight': 79.4,
      'cruiserweight': 90.7,
      'heavyweight': 95.0, // valor estimado
      // Agregar más categorías según sea necesario
      'ligero': 60,
      'medio': 75,
      'pesado': 90,
      'super_pesado': 105
    };
    return weightMapping[categoria] || 70; // peso por defecto
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
    console.log('Login data:', loginData);
    
    if (loginData.success) {
      // Login exitoso - guardar datos del usuario
      const userData = loginData.user;
      setUser({
        id: userData.id,
        token: loginData.token,
        name: userData.name,
        email: userData.email,
        age: userData.age
      });
      
      setFormData({
        ...formData,
        email: userData.email,
        nombre: userData.name,
        edad: userData.age
      });
      
      setView('profile'); // Ir al perfil después del login
    } else {
      // El error ya se maneja en el componente LoginStep
      console.error('Error en el login');
    }
  };

  const handleRegisterSubmit = (registerData) => {
    console.log('Register data:', registerData);
    
    if (registerData.success) {
      // Registro exitoso - guardar datos del usuario
      const userData = registerData.user;
      setUser({
        id: userData.id,
        token: registerData.token, // Ahora el backend devuelve el token
        name: userData.name,
        email: userData.email,
        age: userData.age
      });
      
      setFormData({
        ...formData,
        nombre: userData.name,
        edad: userData.age,
        email: userData.email
      });
      
      setView('profile'); // Ir al perfil después del registro
    } else {
      // El error ya se maneja en el componente RegisterStep
      console.error('Error en el registro');
    }
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
            user={user}
            token={user?.token}
            onUpdate={handleProfileUpdate}
            onContinue={handleStartPlanCreation}
          />
        )}

        {view === 'form' && isResultStep ? (
          <ResultStep formData={formData} user={user} onFinish={handlePlanCreated} />
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