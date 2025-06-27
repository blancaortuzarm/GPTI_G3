import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import SportStep from '../Sport/Sport';
import GenderStep from '../Gender/Gender';
import WeightStep from '../Weight/Weight';
import DietStep from '../Diet/Diet';
import MealsStep from '../Meals/Meals';
import CreatePlanStep from '../Plans/CreatePlan';
import ViewPlanStep from '../Plans/ViewPlan';
import ApiService from '../../services/api';
import FormDataMapper from '../../utils/formDataMapper';

const categoriasPesoPorDeporte = {
  muaythai: {
    all: [
      { id: 'miniflyweight', valor: '47.6', unidad: 'kg', descripcion: 'Miniflyweight' },
      { id: 'jr_flyweight', valor: '49.0', unidad: 'kg', descripcion: 'Jr. Flyweight' },
      { id: 'flyweight', valor: '50.8', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'jr_bantamweight', valor: '52.2', unidad: 'kg', descripcion: 'Jr. Bantamweight' },
      { id: 'bantamweight', valor: '53.5', unidad: 'kg', descripcion: 'Bantamweight' },
      { id: 'jr_featherweight', valor: '55.3', unidad: 'kg', descripcion: 'Jr. Featherweight' },
      { id: 'featherweight', valor: '57.2', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'jr_lightweight', valor: '59.0', unidad: 'kg', descripcion: 'Jr. Lightweight' },
      { id: 'lightweight', valor: '61.2', unidad: 'kg', descripcion: 'Lightweight' },
      { id: 'jr_welterweight', valor: '63.5', unidad: 'kg', descripcion: 'Jr. Welterweight' },
      { id: 'welterweight', valor: '66.7', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'jr_middleweight', valor: '69.9', unidad: 'kg', descripcion: 'Jr. Middleweight' },
      { id: 'middleweight', valor: '72.6', unidad: 'kg', descripcion: 'Middleweight' },
      { id: 'super_middleweight', valor: '76.2', unidad: 'kg', descripcion: 'Super Middleweight' },
      { id: 'light_heavyweight', valor: '79.4', unidad: 'kg', descripcion: 'Light Heavyweight' },
      { id: 'cruiserweight', valor: '90.7', unidad: 'kg', descripcion: 'Cruiserweight' },
      { id: 'heavyweight', valor: '> 90.7', unidad: 'kg', descripcion: 'Heavyweight' },
    ],
  },

  judo: {
    male: [
      { id: '60kg', valor: '< 60', unidad: 'kg', descripcion: '' },
      { id: '66kg', valor: '< 66', unidad: 'kg', descripcion: '' },
      { id: '73kg', valor: '< 73', unidad: 'kg', descripcion: '' },
      { id: '81kg', valor: '< 81', unidad: 'kg', descripcion: '' },
      { id: '90kg', valor: '< 90', unidad: 'kg', descripcion: '' },
      { id: '100kg', valor: '< 100', unidad: 'kg', descripcion: '' },
      { id: 'plus100kg', valor: '> 100', unidad: 'kg', descripcion: '' },
    ],
    female: [
      { id: '48kg', valor: '< 48', unidad: 'kg', descripcion: '' },
      { id: '52kg', valor: '< 52', unidad: 'kg', descripcion: '' },
      { id: '57kg', valor: '< 57', unidad: 'kg', descripcion: '' },
      { id: '63kg', valor: '< 63', unidad: 'kg', descripcion: '' },
      { id: '70kg', valor: '< 70', unidad: 'kg', descripcion: '' },
      { id: '78kg', valor: '< 78', unidad: 'kg', descripcion: '' },
      { id: 'plus78kg', valor: '> 78', unidad: 'kg', descripcion: '' },
    ],
  },

  taekwondo: {
    male: [
      { id: 'flyweight', valor: '58', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'featherweight', valor: '68', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'welterweight', valor: '80', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'heavyweight', valor: '> 80', unidad: 'kg', descripcion: 'Heavyweight' },
    ],
    female: [
      { id: 'flyweight', valor: '49', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'featherweight', valor: '57', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'welterweight', valor: '67', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'heavyweight', valor: '> 67', unidad: 'kg', descripcion: 'Heavyweight' },
    ],
  },

  wrestling: {
    male: [
      { id: '57kg', valor: '57', unidad: 'kg', descripcion: '' },
      { id: '65kg', valor: '65', unidad: 'kg', descripcion: '' },
      { id: '74kg', valor: '74', unidad: 'kg', descripcion: '' },
      { id: '86kg', valor: '86', unidad: 'kg', descripcion: '' },
      { id: '97kg', valor: '97', unidad: 'kg', descripcion: '' },
      { id: '125kg', valor: '125', unidad: 'kg', descripcion: '' },
    ],
    female: [
      { id: '50kg', valor: '50', unidad: 'kg', descripcion: '' },
      { id: '53kg', valor: '53', unidad: 'kg', descripcion: '' },
      { id: '57kg', valor: '57', unidad: 'kg', descripcion: '' },
      { id: '62kg', valor: '62', unidad: 'kg', descripcion: '' },
      { id: '68kg', valor: '68', unidad: 'kg', descripcion: '' },
      { id: '76kg', valor: '76', unidad: 'kg', descripcion: '' },
    ],
  },

  weightlifting: {
    male: [
      { id: '61kg', valor: '61', unidad: 'kg', descripcion: '' },
      { id: '73kg', valor: '73', unidad: 'kg', descripcion: '' },
      { id: '89kg', valor: '89', unidad: 'kg', descripcion: '' },
      { id: '102kg', valor: '102', unidad: 'kg', descripcion: '' },
      { id: 'plus102kg', valor: '> 102', unidad: 'kg', descripcion: '' },
    ],
    female: [
      { id: '49kg', valor: '49', unidad: 'kg', descripcion: '' },
      { id: '59kg', valor: '59', unidad: 'kg', descripcion: '' },
      { id: '71kg', valor: '71', unidad: 'kg', descripcion: '' },
      { id: '81kg', valor: '81', unidad: 'kg', descripcion: '' },
      { id: 'plus81kg', valor: '> 81', unidad: 'kg', descripcion: '' },
    ],
  },

  boxing: {
    male: [
      { id: 'flyweight', valor: '52', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'featherweight', valor: '57', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'lightweight', valor: '63', unidad: 'kg', descripcion: 'Lightweight' },
      { id: 'welterweight', valor: '69', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'middleweight', valor: '75', unidad: 'kg', descripcion: 'Middleweight' },
      { id: 'light_heavyweight', valor: '81', unidad: 'kg', descripcion: 'Light Heavyweight' },
      { id: 'heavyweight', valor: '91', unidad: 'kg', descripcion: 'Heavyweight' },
      { id: 'super_heavyweight', valor: '> 91', unidad: 'kg', descripcion: 'Super Heavyweight' },
    ],
    female: [
      { id: 'flyweight', valor: '≤ 48', unidad: 'kg', descripcion: 'Flyweight' },
      { id: 'bantamweight', valor: '51', unidad: 'kg', descripcion: 'Bantamweight' },
      { id: 'featherweight', valor: '54', unidad: 'kg', descripcion: 'Featherweight' },
      { id: 'lightweight', valor: '57', unidad: 'kg', descripcion: 'Lightweight' },
      { id: 'light_welterweight', valor: '60', unidad: 'kg', descripcion: 'Light Welterweight' },
      { id: 'welterweight', valor: '64', unidad: 'kg', descripcion: 'Welterweight' },
      { id: 'middleweight', valor: '69', unidad: 'kg', descripcion: 'Middleweight' },
      { id: 'light_heavyweight', valor: '75', unidad: 'kg', descripcion: 'Light Heavyweight' },
      { id: 'heavyweight', valor: '81', unidad: 'kg', descripcion: 'Heavyweight' },
      { id: 'super_heavyweight', valor: '> 81', unidad: 'kg', descripcion: 'Super Heavyweight' },
    ],
  },

  horseracing: {
    all: [
      { id: 'lightweight', valor: '≤ 72.9', unidad: 'kg', descripcion: 'Lightweight' },
      { id: 'middleweight', valor: '73 - 90.9', unidad: 'kg', descripcion: 'Middleweight' },
      { id: 'heavyweight', valor: '> 91', unidad: 'kg', descripcion: 'Heavyweight' },
      { id: 'junior', valor: '≤ 17', unidad: 'años', descripcion: 'Junior' },
    ]
  }
};

function isPesoCategoriaValida({ deporte, sexo, peso }) {
  if (!deporte || !peso) return true;
  const catDeporte = categoriasPesoPorDeporte[deporte];
  if (!catDeporte) return true;
  const sexoNorm = (sexo || '').toLowerCase();

  let categorias = [];
  if (catDeporte.all) {
    categorias = catDeporte.all;
  } else if (['male', 'hombre', 'masculino'].includes(sexoNorm)) {
    categorias = catDeporte.male || [];
  } else if (['female', 'mujer', 'femenino'].includes(sexoNorm)) {
    categorias = catDeporte.female || [];
  }
  return categorias.some(cat => cat.id === peso);
}

const ProfileStep = ({ formData, onUpdate, user, token }) => {
  const [editingField, setEditingField] = useState(null);
  const [popupStep, setPopupStep] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [currentView, setCurrentView] = useState('profile'); // 'profile', 'createPlan', 'viewPlan'
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [needsUpdate, setNeedsUpdate] = useState(true); // Cambio temporal para testing
  const [lastUpdateDate, setLastUpdateDate] = useState(new Date(Date.now() - 16 * 24 * 60 * 60 * 1000)); // Fecha simulada de hace 16 días
  const hasLoadedRef = useRef(false);
  const [errors, setErrors] = useState({
    nombre: '',
    edad: '',
    email: ''
  });

  // Simulamos si el plan existe o no
  const planExists = Boolean(formData.planCreated);
  const planModified = hasProfileChanged();

  // Función para verificar si han pasado 15 días desde la última actualización
  const checkIfNeedsUpdate = (lastUpdate) => {
    if (!lastUpdate) return false;
    return true; // Para testing, siempre forzamos a que se muestre el recordatorio
    
     //const now = new Date();
     //const updateDate = new Date(lastUpdate);
     //const daysDifference = Math.floor((now - updateDate) / (1000 * 60 * 60 * 24));
     //return daysDifference >= 15;
  };

  // Cargar datos del usuario al inicializar el componente
  useEffect(() => {
    // Cargar perfil del usuario desde el backend
    const loadUserProfile = async () => {
      if (!user || !token || !user.id || hasLoadedRef.current) {
        setLoading(false);
        return;
      }

      try {
        hasLoadedRef.current = true;
        const response = await ApiService.getUserById(user.id, token);
        if (response.success) {
          // Actualizar formData con los datos del usuario si existen
          if (response.data) {
            let updatedFormData = {
              nombre: response.data.name || 'Usuario',
              edad: response.data.age || '25',
              email: response.data.email || 'usuario@ejemplo.com',
              peso: 'Jr. Middleweight',
              sexo: 'male',
              deporte: 'muaythai',
              dieta: 'omnivora',
              comidas: 3,
              snacks: 2,
              restricciones: []
            };
            
            // Si hay perfil, agregar esos datos también
            if (response.data.UserProfile) {
              const profile = response.data.UserProfile;
              updatedFormData.comidas = profile.mainMealsCount || updatedFormData.comidas;
              updatedFormData.snacks = profile.snacksCount || updatedFormData.snacks;
              
              // Mapear deporte basado en Sport
              if (profile.Sport) {
                const sportMapping = {
                  'Boxeo': 'boxing',
                  'Judo': 'judo', 
                  'Lucha': 'wrestling',
                  'Taekwondo': 'taekwondo',
                  'Turf': 'horseracing',
                  'Halterofilia': 'weightlifting',
                  'Muay Thai': 'muaythai'
                };
                updatedFormData.deporte = sportMapping[profile.Sport.name] || updatedFormData.deporte;
              }
              
              // Mapear dieta basada en Diet
              if (profile.Diet) {
                const dietMapping = {
                  'Omnivora': 'omnivora',
                  'Vegetariana': 'vegetariana',
                  'Vegana': 'vegana',
                  'Keto': 'keto',
                  'Paleo': 'paleo'
                };
                updatedFormData.dieta = dietMapping[profile.Diet.name] || updatedFormData.dieta;
              }
              
              // Mapear categoría de peso
              if (profile.WeightCategory) {
                console.log('Peso categoría:', profile.WeightCategory.name);

                updatedFormData.peso = profile.WeightCategory.name || updatedFormData.peso;
              }
            }

            // Mapear género desde el usuario (si está disponible)
            if (response.data.gender) {
              const genderMapping = {
                'Masculino': 'male',
                'Femenino': 'female'
              };
              updatedFormData.sexo = genderMapping[response.data.gender] || updatedFormData.sexo;
            }

            // Cargar datos del historial más reciente (peso como categoría)
            if (response.data.UserHistories && response.data.UserHistories.length > 0) {
              const latestHistory = response.data.UserHistories[0];
              // El peso se maneja como categoría, no como valor numérico
              if (latestHistory.WeightCategory) {
                updatedFormData.peso = latestHistory.WeightCategory.name || updatedFormData.peso;
              }
              
              // Verificar fecha de última actualización y si necesita actualizar
              if (latestHistory.createdAt) {
                const lastUpdate = new Date(latestHistory.createdAt);
                setLastUpdateDate(lastUpdate);
                const needsUpdateCheck = checkIfNeedsUpdate(latestHistory.createdAt);
                setNeedsUpdate(needsUpdateCheck);
              }
            }

            // Cargar restricciones dietéticas del usuario
            try {
              const restrictionsResponse = await ApiService.getUserRestrictions(user.id, token);
              if (restrictionsResponse.success && restrictionsResponse.data.length > 0) {
                const restrictionNames = restrictionsResponse.data.map(item => {
                  const restrictionMapping = {
                    'Sin Gluten': 'sin_gluten',
                    'Maní': 'sin_mani',
                    'Mariscos y Crustáceos': 'sin_mariscos',
                    'Nueces': 'sin_nueces',
                    'Leche de vaca': 'sin_leche',
                    'Pescado': 'sin_pescado',
                    'Huevos': 'sin_huevos'
                  };
                  return restrictionMapping[item.DietaryRestriction.name] || item.DietaryRestriction.name.toLowerCase();
                });
                
                updatedFormData.restricciones = restrictionNames;
              }
            } catch (restrictionError) {
              console.error('Error loading user restrictions:', restrictionError);
            }
            
            // Update formData only once at the end
            onUpdate(updatedFormData);
          }
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, [user?.id, token]); // eslint-disable-line react-hooks/exhaustive-deps
  // Only depend on user.id and token to prevent infinite loops
  // 'onUpdate' is intentionally excluded to prevent infinite re-renders
  // Función para determinar si el perfil ha sido modificado
  function hasProfileChanged() {
    // Aquí implementa la lógica para comparar el estado actual con el estado inicial
    // Por ahora simplemente devolvemos true para demostración
    return true;
  }

  // Datos por defecto con nombres exactos de la base de datos
  const defaultData = {
    nombre: user?.name || 'Usuario',
    edad: user?.age || '25',
    email: user?.email || 'usuario@ejemplo.com',
    peso: 'Jr. Middleweight', // nombre exacto de la base de datos
    sexo: 'male',
    deporte: 'muaythai',
    dieta: 'omnivora',
    comidas: 3,
    snacks: 2,
    restricciones: []
  };

  // Usar datos reales del formData, con fallback a datos por defecto solo si está vacío
  const displayData = Object.fromEntries(
    Object.entries(defaultData).map(([key, defaultValue]) => {
      const userValue = formData[key];
      // Solo usar default si el valor del usuario está completamente vacío
      return [key, (userValue !== undefined && userValue !== null && userValue !== '') ? userValue : defaultValue];
    })
  );

  // Mostrar loading mientras cargamos los datos
  if (loading) {
    return <div className="profile-container"><div>Cargando perfil...</div></div>;
  }

  const categoriaValida = isPesoCategoriaValida(displayData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setEditedData({
      ...editedData,
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

  const validate = (field) => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (field === 'nombre') {
      if (!editedData.nombre) {
        newErrors.nombre = 'El nombre es obligatorio';
        valid = false;
      } else {
        newErrors.nombre = '';
      }
    }
    
    if (field === 'edad') {
      if (!editedData.edad) {
        newErrors.edad = 'La edad es obligatoria';
        valid = false;
      } else {
        const edadNum = parseInt(editedData.edad);
        if (isNaN(edadNum) || edadNum < 14) {
          newErrors.edad = 'Debes tener al menos 14 años';
          valid = false;
        } else {
          newErrors.edad = '';
        }
      }
    }
    
    if (field === 'email') {
      if (!editedData.email) {
        newErrors.email = 'El correo es obligatorio';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(editedData.email)) {
        newErrors.email = 'El formato del correo es inválido';
        valid = false;
      } else {
        newErrors.email = '';
      }
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleEditField = (field) => {
    // Para campos básicos, edición inline
    if (['nombre', 'edad', 'email'].includes(field)) {
      setEditingField(field);
      setEditedData({
        [field]: displayData[field]
      });
    } else {
      // Para otros campos, abrimos el Step correspondiente
      switch (field) {
        case 'deporte':
          setPopupStep('sport');
          break;
        case 'sexo':
          setPopupStep('gender');
          break;
        case 'peso':
          setPopupStep('weight');
          break;
        case 'dieta':
          setPopupStep('diet');
          setEditTarget('dieta');
          break;
        case 'restricciones':
          setPopupStep('diet');
          setEditTarget('restricciones');
          break;
        case 'comidas':
          setPopupStep('meals');
          setEditTarget('comidas');
          break;
        case 'snacks':
          setPopupStep('meals');
          setEditTarget('snacks');
          break;
        default:
          break;
      }
    }
  };

  const handleSaveField = (field) => {
    if (validate(field)) {
      const updatedFormData = {
        ...formData,
        ...editedData
      };
      
      // Update local state only
      onUpdate(updatedFormData);
      
      setEditingField(null);
    }
  };

  // Save profile changes to backend - SOLO UserHistories
  const saveProfileToBackend = async (updatedData) => {
    if (!user || !token) return;
    
    try {
      // Map form data to backend format
      const historyData = FormDataMapper.mapFormDataToHistory(updatedData);
      // Save ONLY to history
      await ApiService.addUserHistory(user.id, historyData, token);
      
      // Actualizar estado local después de guardar exitosamente
      const now = new Date();
      setLastUpdateDate(now);
      setNeedsUpdate(false);
      
      console.log('UserHistory saved successfully');
    } catch (error) {
      console.error('Error saving to UserHistory:', error);
      throw error; // Re-throw to be handled by calling function
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setErrors({
      nombre: '',
      edad: '',
      email: ''
    });
  };

  const handleStepChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let updatedFormData;
    
    if (type === 'checkbox') {
      if (checked) {
        updatedFormData = {
          ...formData,
          [name]: [...(formData[name] || []), value]
        };
      } else {
        updatedFormData = {
          ...formData,
          [name]: (formData[name] || []).filter(item => item !== value)
        };
      }
    } else {
      updatedFormData = {
        ...formData,
        [name]: value
      };
    }
    
    // Update local state only
    onUpdate(updatedFormData);
  };

  // Manejador específico para la selección de dieta
  const handleDietSelect = (dietId) => {
    const updatedFormData = {
      ...formData,
      dieta: dietId
    };
    
    // Update local state only
    onUpdate(updatedFormData);
  };

  // Manejador específico para restricciones alimentarias
  const handleRestriccionToggle = (restriccionId) => {
    const restricciones = [...(formData.restricciones || [])];
    const index = restricciones.indexOf(restriccionId);
    
    if (index === -1) {
      restricciones.push(restriccionId);
    } else {
      restricciones.splice(index, 1);
    }
    
    const updatedFormData = {
      ...formData,
      restricciones
    };
    
    // Update local state only
    onUpdate(updatedFormData);
  };

  const closePopup = () => {
    setPopupStep(null);
    setEditTarget(null);
  };

  const handleCreatePlan = async () => {
    // Guardar perfil al backend antes de crear el plan
    try {
      setSaveMessage('Guardando perfil...');
      await saveProfileToBackend(formData);
      setSaveMessage('✓ Perfil guardado correctamente');
      setTimeout(() => setSaveMessage(''), 2000);
      
      // Después de guardar exitosamente, ir a crear plan
      setCurrentView('createPlan');
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage('✗ Error al guardar perfil');
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  const handleUpdatePlan = async () => {
    // Guardar perfil al backend antes de actualizar el plan
    try {
      setSaveMessage('Guardando cambios...');
      await saveProfileToBackend(formData);
      setSaveMessage('✓ Cambios guardados correctamente');
      setTimeout(() => setSaveMessage(''), 2000);
      
      // Actualizamos el plan y luego lo mostramos
      onUpdate({
        ...formData,
        planCreated: true // Marcamos que el usuario ya tiene un plan
      });
      setCurrentView('viewPlan');
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage('✗ Error al guardar cambios');
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  const handleViewPlan = () => {
    setCurrentView('viewPlan');
  };

  const handleBackToProfile = () => {
    setCurrentView('profile');
  };

  const renderEditableField = (field, label, type = 'text') => {
    return (
      <div className="info-row">
        <span className="info-label">{label}:</span>
        {editingField === field ? (
          <div className="edit-field-container">
            <input
              type={type}
              name={field}
              value={editedData[field] || ''}
              onChange={handleChange}
              className={errors[field] ? 'error' : ''}
              min={type === 'number' ? (field === 'edad' ? '14' : '1') : undefined}
            />
            {errors[field] && <span className="error-text">{errors[field]}</span>}
            <div className="edit-actions">
              <button 
                type="button" 
                className="save-field-button" 
                onClick={() => handleSaveField(field)}
              >
                <i className="fas fa-check"></i>
              </button>
              <button 
                type="button" 
                className="cancel-field-button" 
                onClick={handleCancelEdit}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="value-with-edit">
            <span className="info-value">{displayData[field] || 'No especificado'}</span>
            <button 
              className="edit-field-button" 
              onClick={() => handleEditField(field)}
              aria-label={`Editar ${label}`}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderReadOnlyField = (field, label, suffix = '') => {
    let displayValue = displayData[field];
    
    // Si es la dieta, mostramos el nombre legible
    if (field === 'dieta') {
      const dietaEncontrada = tiposDieta.find(d => d.id === displayValue);
      displayValue = dietaEncontrada ? dietaEncontrada.nombre : displayValue;
    }
    
    // Formatear arrays (para restricciones)
    if (Array.isArray(displayValue) && displayValue.length > 0) {
      // Convertir IDs de restricciones a nombres legibles
      if (field === 'restricciones') {
        const restriccionesNombres = displayValue.map(id => {
          const restriccionEncontrada = restricciones.find(r => r.id === id);
          return restriccionEncontrada ? restriccionEncontrada.nombre : id;
        });
        displayValue = restriccionesNombres.join(', ');
      } else {
        displayValue = displayValue.join(', ');
      }
    } else if (Array.isArray(displayValue) && displayValue.length === 0) {
      displayValue = 'Ninguna';
    }
    
    // Añadir sufijo si existe
    if (displayValue && suffix) {
      displayValue = `${displayValue} ${suffix}`;
    }
    
    return (
      <div className="info-row">
        <span className="info-label">{label}:</span>
        <div className="value-with-edit">
          <span className="info-value">{displayValue || 'No especificado'}</span>
          <button 
            className="edit-field-button" 
            onClick={() => handleEditField(field)}
            aria-label={`Editar ${label}`}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
      </div>
    );
  };
  
  // Listas para nombres legibles
  const tiposDieta = [
    { id: 'omnivora', nombre: 'Omnívora' },
    { id: 'vegetariana', nombre: 'Vegetariana' },
    { id: 'vegana', nombre: 'Vegana' },
    { id: 'keto', nombre: 'Keto' },
    { id: 'paleo', nombre: 'Paleo' }
  ];

  const restricciones = [
    { id: 'sin_huevos', nombre: 'Sin huevos' },
    { id: 'sin_pescado', nombre: 'Sin pescado' },
    { id: 'sin_gluten', nombre: 'Sin gluten' },
    { id: 'sin_leche', nombre: 'Sin leche de vaca' },
    { id: 'sin_mani', nombre: 'Sin maní' },
    { id: 'sin_mariscos', nombre: 'Sin mariscos y crustáceos' },
    { id: 'sin_nueces', nombre: 'Sin nueces' }
  ];
  
  // Renderizar vista según el estado actual
  if (currentView === 'createPlan') {
    return <CreatePlanStep formData={formData} user={user} onBack={handleBackToProfile} />;
  }

  if (currentView === 'viewPlan') {
    return <ViewPlanStep formData={formData} onBack={handleBackToProfile} />;
  }

  // Vista de perfil
  return (
    <div className="profile-container">
      <h2>Mi Perfil</h2>
      
      {saveMessage && (
        <div className={`save-message ${saveMessage.includes('✓') ? 'success' : 'error'}`}>
          {saveMessage}
        </div>
      )}
      
      {needsUpdate && (
        <div className="update-reminder">
          <div className="update-reminder-content">
            <i className="fas fa-exclamation-triangle"></i>
            <div className="update-reminder-text">
              <strong>¡Es hora de actualizar tus datos!</strong>
              <p>Han pasado más de 15 días desde tu última actualización. Te recomendamos revisar y actualizar tu información para mantener tu plan de alimentación optimizado.</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {displayData.nombre ? displayData.nombre.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>

        <div className="profile-info">
          <div className="info-section">
            <h3>Información Personal</h3>
            
            {renderEditableField('nombre', 'Nombre')}
            {renderEditableField('edad', 'Edad', 'number')}
            {renderEditableField('email', 'Email', 'email')}
          </div>
          
          <div className="info-section">
            <h3>Información Nutricional</h3>
            
            {renderReadOnlyField('peso', 'Categoría de Peso')}
            {!categoriaValida && (
                <div className="peso-invalid-msg">
                  La categoría de peso seleccionada no es válida para el deporte y sexo actual. Por favor, elige una nueva.
                </div>
            )}
            {renderReadOnlyField('sexo', 'Sexo')}
            {renderReadOnlyField('deporte', 'Nivel de Actividad')}
            {renderReadOnlyField('dieta', 'Tipo de Dieta')}
            {renderReadOnlyField('restricciones', 'Restricciones')}
            {renderReadOnlyField('comidas', 'Comidas diarias')}
            {renderReadOnlyField('snacks', 'Snacks diarios')}
          </div>
          
          {lastUpdateDate && (
            <div className="info-section">
              <h3>Historial</h3>
              <div className="info-row">
                <span className="info-label">Última actualización:</span>
                <span className="info-value">
                  {lastUpdateDate.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="profile-actions">
          {planExists ? (
            <>
              {planModified ? (
                <button className="update-plan-button" onClick={handleUpdatePlan}>
                  Actualizar Plan de Alimentación
                </button>
              ) : null}
              <button className="view-plan-button" onClick={handleViewPlan}>
                Ver Plan de Alimentación
              </button>
            </>
          ) : (
            <button className="create-plan-button" onClick={handleCreatePlan}>
              Crear Plan de Alimentación
            </button>
          )}
        </div>
      </div>

      {/* Popup para los steps */}
      {popupStep && (
        <div className="step-popup-overlay">
          <div className="step-popup">
            <button className="close-popup" onClick={closePopup}>×</button>
            <div className="popup-content">
              {popupStep === 'sport' && (
                <SportStep 
                  formData={formData} 
                  onChange={handleStepChange} 
                  isProfileEdit={true} 
                />
              )}
              {popupStep === 'gender' && (
                <GenderStep 
                  formData={formData} 
                  onChange={handleStepChange} 
                  isProfileEdit={true} 
                />
              )}
              {popupStep === 'weight' && (
                <WeightStep 
                  formData={formData} 
                  onChange={handleStepChange} 
                  isProfileEdit={true} 
                />
              )}
              {popupStep === 'diet' && (
                <DietStep 
                  formData={formData} 
                  onChange={handleStepChange}
                  handleDietSelect={handleDietSelect}
                  handleRestriccionToggle={handleRestriccionToggle}
                  isProfileEdit={true} 
                  editTarget={editTarget}
                />
              )}
              {popupStep === 'meals' && (
                <MealsStep 
                  formData={formData} 
                  onChange={handleStepChange} 
                  isProfileEdit={true} 
                  editTarget={editTarget} 
                />
              )}
            </div>
            <div className="popup-actions">
              <button className="popup-done-button" onClick={closePopup}>
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileStep;