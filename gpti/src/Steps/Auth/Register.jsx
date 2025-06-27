import React, { useState } from 'react';
import './Auth.css';
import ApiService from '../../services/api';

const RegisterStep = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    edad: '',
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
    const newErrors = { nombre: '', edad: '', email: '', password: '' };
    
    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es obligatorio';
      valid = false;
    }
    
    if (!formData.edad) {
      newErrors.edad = 'La edad es obligatoria';
      valid = false;
    } else if (isNaN(formData.edad) || formData.edad < 1) {
      newErrors.edad = 'La edad debe ser un número positivo';
      valid = false;
    }
    
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
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
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
        const response = await ApiService.registerUser(formData);
        console.log('Usuario registrado exitosamente:', response);
        
        // Si el registro es exitoso, llamamos onSubmit con los datos del usuario
        onSubmit({
          success: true,
          user: response.data,
          message: response.message
        });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        
        // Mostrar error en el formulario
        setErrors({
          ...errors,
          email: error.message.includes('correo') ? error.message : '',
          password: !error.message.includes('correo') ? error.message : ''
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'error' : ''}
            placeholder="Tu nombre completo"
          />
          {errors.nombre && <span className="error-text">{errors.nombre}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="edad">Edad</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            className={errors.edad ? 'error' : ''}
            placeholder="Tu edad"
          />
          {errors.edad && <span className="error-text">{errors.edad}</span>}
        </div>
        
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
            placeholder="Mínimo 6 caracteres"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        
        <div className="auth-buttons">
          <button type="button" className="back-button" onClick={onBack}>
            Volver
          </button>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStep;