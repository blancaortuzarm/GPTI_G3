import React, { useState, useEffect } from 'react';
import './Result.css';
import ApiService from '../../services/api';

const ResultStep = ({ formData, user }) => {
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

  console.log(formData);
  return (
    <div className="result-view">
      <h2 className="view-title">¡Formulario Completado! 🎉</h2>
      <p className="view-description">
        Gracias por completar el formulario. Este es tu resumen personalizado:
      </p>

      <div className="result-grid">
        <div className="result-card">
          <strong>Deporte:</strong>
          <span>{formData.deporte || 'No definido'}</span>
        </div>
        <div className="result-card">
          <strong>Sexo:</strong>
          <span>{formData.sexo || 'No definido'}</span>
        </div>
        <div className="result-card">
          <strong>Categoría de peso:</strong>
          <span>{formData.peso || 'No definido'}</span>
        </div>
        <div className="result-card">
          <strong>Dieta:</strong>
          <span>{formData.dieta || 'No definida'}</span>
        </div>
        <div className="result-card">
          <strong>Restricciones:</strong>
          <span>{formData.restricciones.length > 0 ? formData.restricciones.join(', ') : 'Ninguna'}</span>
        </div>
        <div className="result-card">
          <strong>Comidas principales:</strong>
          <span>{formData.comidas || 'No definido'}</span>
        </div>
        <div className="result-card">
          <strong>Snacks:</strong>
          <span>{formData.snacks || 'No definido'}</span>
        </div>
      </div>

      {/* Sección de recomendación de IA */}
      <div className="ai-recommendation-section">
        <h3 className="recommendation-title">🤖 Recomendación Personalizada</h3>
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
    </div>
  );
};

export default ResultStep;
