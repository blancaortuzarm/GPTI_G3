import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import './Auth.css';

const LoginStep = ({ onBack, onSubmit }) => {
  const { token, setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

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
      const dataToSend = {
        email: formData.email,      // Usa 'email'
        password: formData.password // Usa 'password'
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/users/login', // Corrige la ruta
          dataToSend
        );
        if (response.status === 200) {
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user)); // Guarda el usuario completo
          // Puedes guardar más datos si tu backend los envía
          if (onSubmit) onSubmit(formData);
        }
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          password: 'Correo o contraseña incorrectos'
        }));
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
          <button type="submit" className="submit-button">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginStep;