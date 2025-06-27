import React, { useState } from 'react';
import './Auth.css';
import ApiService from '../../services/api';

const LoginStep = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error al editar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    
    if (!formData.email) {
      newErrors.email = 'El correo es obligatorio';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del correo es inválido';
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        const response = await ApiService.loginUser(formData);
        console.log('Usuario logueado exitosamente:', response);
        
        // Si el login es exitoso, llamamos onSubmit con los datos del usuario
        onSubmit({
          success: true,
          user: response.data,
          token: response.token,
          message: response.message
        });
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        
        // Mostrar error en el formulario
        setErrors({
          ...errors,
          email: error.message.includes('correo') || error.message.includes('email') ? error.message : '',
          password: !error.message.includes('correo') && !error.message.includes('email') ? error.message : ''
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="ejemplo@correo.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            placeholder="Tu contraseña"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        
        <div className="auth-buttons">
          <button type="button" className="back-button" onClick={onBack}>
            Volver
          </button>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginStep;