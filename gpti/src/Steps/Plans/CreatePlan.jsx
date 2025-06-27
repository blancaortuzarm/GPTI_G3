import React, { useState, useEffect } from 'react';
import './Plans.css';
import ApiService from '../../services/api';

const CreatePlanStep = ({ formData, onBack, user }) => {
  const [recommendation, setRecommendation] = useState('');
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
  const [errorRecommendation, setErrorRecommendation] = useState('');

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (user && user.id && user.token) {
        setIsLoadingRecommendation(true);
        setErrorRecommendation('');
        try {
          const response = await ApiService.getUserRecommendation(user.id, user.token);
          setRecommendation(response.data.recommendation);
        } catch (error) {
          console.error('Error al obtener recomendación:', error);
          setErrorRecommendation('No se pudo obtener la recomendación personalizada');
        } finally {
          setIsLoadingRecommendation(false);
        }
      }
    };

    fetchRecommendation();
  }, [user]);

  return (
    <div className="plan-container">
      <h2 className="view-title">Creación de Plan de Alimentación</h2>
      
      <div className="plan-content-placeholder">
        <div className="placeholder-message">
          <i className="fas fa-utensils placeholder-icon"></i>
          <p>Aquí se mostrarán las opciones para crear tu plan de alimentación personalizado.</p>
          <p>Basado en tus preferencias:</p>
          <ul className="preferences-list">
            <li><span>Tipo de dieta:</span> {formData.dieta || 'No especificada'}</li>
            <li><span>Nivel de actividad:</span> {formData.deporte || 'No especificado'}</li>
            <li><span>Comidas diarias:</span> {formData.comidas || '3'}</li>
            <li><span>Restricciones:</span> {formData.restricciones && formData.restricciones.length > 0 ? 
              formData.restricciones.join(', ') : 'Ninguna'}</li>
          </ul>
        </div>
      </div>
      
      {/* Sección de recomendación de IA */}
      <div className="ai-recommendation-section">
        <h3 className="recommendation-title">🤖 Recomendación Personalizada para tu Plan</h3>
        {isLoadingRecommendation && (
          <div className="loading-recommendation">
            <p>Generando tu recomendación personalizada...</p>
          </div>
        )}
        {errorRecommendation && (
          <div className="error-recommendation">
            <p>{errorRecommendation}</p>
          </div>
        )}
        {recommendation && !isLoadingRecommendation && (
          <div className="recommendation-content">
            <p>{recommendation}</p>
          </div>
        )}
        {!user && (
          <div className="no-user-recommendation">
            <p>Para obtener una recomendación personalizada, necesitas estar registrado e iniciar sesión.</p>
          </div>
        )}
      </div>
      
      <div className="plan-actions">
        <button className="back-button" onClick={onBack}>
          Volver a Mi Perfil
        </button>
      </div>
    </div>
  );
};

export default CreatePlanStep;