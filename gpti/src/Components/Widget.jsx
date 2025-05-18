import React, { useState } from 'react';
import './Widget.css';
import WelcomeStep from '../Steps/Start/Start';
import SportStep from '../Steps/Sport/Sport';
import GenderStep from '../Steps/Gender/Gender';
import WeightStep from '../Steps/Weight/Weight';
import DietStep from '../Steps/Diet/Diet';
import MealsStep from '../Steps/Meals/Meals';
import ResultStep from '../Steps/Result/Result';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    deporte: '',
    sexo: '',
    peso: '',
    dieta: '',
    restricciones: [],
    comidas: 3,
    snacks: 2
  });

  const totalSteps = 5;
  const showProgressBar = currentStep >= 1 && currentStep <= totalSteps;
  const isLastFormStep = currentStep === totalSteps;
  const isResultStep = currentStep === totalSteps + 1;

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
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
        {currentStep === 0 ? (
          <WelcomeStep onStart={handleNext} />
        ) : isResultStep ? (
          <ResultStep formData={formData} />
        ) : (
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

      {/* Botones de navegación - No mostrar en vista inicial ni final */}
      {currentStep > 0 && currentStep <= totalSteps && (
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