import React, { useState, useRef, useEffect } from 'react';
import './Profile.css';
import SportStep from '../Sport/Sport';
import GenderStep from '../Gender/Gender';
import WeightStep from '../Weight/Weight';
import DietStep from '../Diet/Diet';
import MealsStep from '../Meals/Meals';
import CreatePlanStep from '../Plans/CreatePlan';
import ViewPlanStep from '../Plans/ViewPlan';
import axios from 'axios';

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


const deporteNombreAId = {
  'Boxeo': 'boxing',
  'Judo': 'judo',
  'Lucha': 'wrestling',
  'Taekwondo': 'taekwondo',
  'Turf': 'horseracing',
  'Halterofilia': 'weightlifting',
  'Muay Thai': 'muaythai'
};

const generoNombreAId = {
  'Masculino': 'male',
  'Femenino': 'female'
};

const categorias_peso = {
    "Peso Ligero": 1,
    "Peso Medio": 2,
    "Peso Pesado": 3,
    "Peso Súper Pesado": 4,
    "Peso Mosca - Femenino": 5,
    "Peso Pluma - Femenino": 6,
    "Peso Ligero - Femenino": 7,
    "flyweight_Boxeo_Masculino": 8,
    "featherweight_Boxeo_Masculino": 9,
    "lightweight_Boxeo_Masculino": 10,
    "welterweight_Boxeo_Masculino": 11,
    "middleweight_Boxeo_Masculino": 12,
    "light_heavyweight_Boxeo_Masculino": 13,
    "heavyweight_Boxeo_Masculino": 14,
    "super_heavyweight_Boxeo_Masculino": 15,
    "flyweight_Boxeo_Femenino": 16,
    "bantamweight_Boxeo_Femenino": 17,
    "featherweight_Boxeo_Femenino": 18,
    "lightweight_Boxeo_Femenino": 19,
    "light_welterweight_Boxeo_Femenino": 20,
    "welterweight_Boxeo_Femenino": 21,
    "middleweight_Boxeo_Femenino": 22,
    "light_heavyweight_Boxeo_Femenino": 23,
    "heavyweight_Boxeo_Femenino": 24,
    "super_heavyweight_Boxeo_Femenino": 25,
    "60kg_Judo_Masculino": 26,
    "66kg_Judo_Masculino": 27,
    "73kg_Judo_Masculino": 28,
    "81kg_Judo_Masculino": 29,
    "90kg_Judo_Masculino": 30,
    "100kg_Judo_Masculino": 31,
    "plus100kg_Judo_Masculino": 32,
    "48kg_Judo_Femenino": 33,
    "52kg_Judo_Femenino": 34,
    "57kg_Judo_Femenino": 35,
    "63kg_Judo_Femenino": 36,
    "70kg_Judo_Femenino": 37,
    "78kg_Judo_Femenino": 38,
    "plus78kg_Judo_Femenino": 39,
    "flyweight_Taekwondo_Masculino": 40,
    "featherweight_Taekwondo_Masculino": 41,
    "welterweight_Taekwondo_Masculino": 42,
    "heavyweight_Taekwondo_Masculino": 43,
    "flyweight_Taekwondo_Femenino": 44,
    "featherweight_Taekwondo_Femenino": 45,
    "welterweight_Taekwondo_Femenino": 46,
    "heavyweight_Taekwondo_Femenino": 47,
    "57kg_Lucha_Masculino": 48,
    "65kg_Lucha_Masculino": 49,
    "74kg_Lucha_Masculino": 50,
    "86kg_Lucha_Masculino": 51,
    "97kg_Lucha_Masculino": 52,
    "125kg_Lucha_Masculino": 53,
    "50kg_Lucha_Femenino": 54,
    "53kg_Lucha_Femenino": 55,
    "57kg_Lucha_Femenino": 56,
    "62kg_Lucha_Femenino": 57,
    "68kg_Lucha_Femenino": 58,
    "76kg_Lucha_Femenino": 59,
    "61kg_Halterofilia_Masculino": 60,
    "73kg_Halterofilia_Masculino": 61,
    "89kg_Halterofilia_Masculino": 62,
    "102kg_Halterofilia_Masculino": 63,
    "plus102kg_Halterofilia_Masculino": 64,
    "49kg_Halterofilia_Femenino": 65,
    "59kg_Halterofilia_Femenino": 66,
    "71kg_Halterofilia_Femenino": 67,
    "81kg_Halterofilia_Femenino": 68,
    "plus81kg_Halterofilia_Femenino": 69,
    "miniflyweight_Muay Thai_Masculino": 70,
    "jr_flyweight_Muay Thai_Masculino": 71,
    "flyweight_Muay Thai_Masculino": 72,
    "jr_bantamweight_Muay Thai_Masculino": 73,
    "bantamweight_Muay Thai_Masculino": 74,
    "jr_featherweight_Muay Thai_Masculino": 75,
    "featherweight_Muay Thai_Masculino": 76,
    "jr_lightweight_Muay Thai_Masculino": 77,
    "lightweight_Muay Thai_Masculino": 78,
    "jr_welterweight_Muay Thai_Masculino": 79,
    "welterweight_Muay Thai_Masculino": 80,
    "jr_middleweight_Muay Thai_Masculino": 81,
    "middleweight_Muay Thai_Masculino": 82,
    "super_middleweight_Muay Thai_Masculino": 83,
    "light_heavyweight_Muay Thai_Masculino": 84,
    "cruiserweight_Muay Thai_Masculino": 85,
    "heavyweight_Muay Thai_Masculino": 86,
    "miniflyweight_Muay Thai_Femenino": 87,
    "jr_flyweight_Muay Thai_Femenino": 88,
    "flyweight_Muay Thai_Femenino": 89,
    "jr_bantamweight_Muay Thai_Femenino": 90,
    "bantamweight_Muay Thai_Femenino": 91,
    "jr_featherweight_Muay Thai_Femenino": 92,
    "featherweight_Muay Thai_Femenino": 93,
    "jr_lightweight_Muay Thai_Femenino": 94,
    "lightweight_Muay Thai_Femenino": 95,
    "jr_welterweight_Muay Thai_Femenino": 96,
    "welterweight_Muay Thai_Femenino": 97,
    "jr_middleweight_Muay Thai_Femenino": 98,
    "middleweight_Muay Thai_Femenino": 99,
    "super_middleweight_Muay Thai_Femenino": 100,
    "light_heavyweight_Muay Thai_Femenino": 101,
    "cruiserweight_Muay Thai_Femenino": 102,
    "heavyweight_Muay Thai_Femenino": 103,
    "lightweight_Turf_Masculino": 104,
    "middleweight_Turf_Masculino": 105,
    "heavyweight_Turf_Masculino": 106,
    "lightweight_Turf_Femenino": 107,
    "middleweight_Turf_Femenino": 108,
    "heavyweight_Turf_Femenino": 109
}

const dietas = {
    "Omnivora": 1,
    "Vegetariana": 2,
    "Vegana": 3,
    "Keto": 4,
    "Paleo": 5
}

const restricciones = {
    "Sin Gluten": 1,
    "Sin Lactosa": 2,
    "Sin Frutos Secos": 3,
    "Sin huevos": 4,
    "Sin pescado": 5,
    "Sin gluten": 6,
    "Sin leche de vaca": 7,
    "Sin maní": 8,
    "Sin mariscos y crustáceos": 9,
    "Sin nueces": 10
}

const disciplinas = {
    "Boxeo": 1,
    "Judo": 2,
    "Lucha": 3,
    "Taekwondo": 4,
    "Turf": 5,
    "Halterofilia": 6,
    "Muay Thai": 7
}

const enviarHistorialAlBackend = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (user && user.id && token) {
      const deporteId = disciplinas[formData.deporte] || 1;
      const dietaId = dietas[formData.dieta] || 1;
      const sexo = formData.sexo || 'masculino';
      const pesoKey = `${formData.peso}_${formData.deporte}_${sexo.charAt(0).toUpperCase() + sexo.slice(1)}`;
      const weightCategoryId = categorias_peso[pesoKey] || 1;
      const historyData = {
        weight: formData.peso,
        height: formData.altura || 170,
        sportId: deporteId,
        weightCategoryId: weightCategoryId,
        dietId: dietaId,
        mainMealsCount: formData.comidas || 3,
        snacksCount: formData.snacks || 2,
      };

      try {
        const res = await axios.post(
          `http://localhost:3000/users/${user.id}/history`,
          historyData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log('Historial actualizado (popup):', res.data);
      } catch (err) {
        console.error('Error al actualizar historial (popup):', err);
      }
    }
  };

const closePopup = async () => {
  await enviarHistorialAlBackend();
  setPopupStep(null);
  setEditTarget(null);
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

const ProfileStep = ({ formData, onUpdate, onContinue }) => {

  useEffect(() => {
    // Obtener el usuario y token del localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (user && user.id && token) {
      axios.get(
        `http://localhost:3000/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        console.log('Datos del usuario desde backend:', res.data);
      })
      .catch(err => {
        console.error('Error al obtener usuario:', err);
      });
    }
  }, []);
  
  const camposPerfil = [
    'nombre', 'edad', 'email', 'peso', 'sexo', 'deporte', 'dieta', 'comidas', 'snacks', 'restricciones'
  ];
  const camposPlan = [
    'edad', 'peso', 'sexo', 'deporte', 'dieta', 'comidas', 'snacks', 'restricciones'
  ];
  const [editingField, setEditingField] = useState(null);
  const [popupStep, setPopupStep] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [currentView, setCurrentView] = useState('profile'); // 'profile', 'createPlan', 'viewPlan'
  const [editedData, setEditedData] = useState({});
  const [errors, setErrors] = useState({
    nombre: '',
    edad: '',
    email: ''
  });



  // Datos hardcodeados para campos vacíos
  const defaultData = {
    nombre: 'Usuario Demo',
    edad: '30',
    email: 'usuario@ejemplo.com',
    
    sexo: 'masculino',
    deporte: 'muaythai',
    peso: 'jr_middleweight',
    dieta: 'omnivora',
    comidas: 3,
    snacks: 2,
    restricciones: ['sin_gluten']
  };

  // Combinamos datos reales con defaults para campos vacíos
  const displayData = Object.fromEntries(
    Object.entries(defaultData).map(([key, defaultValue]) => {
      const userValue = formData[key];
      return [key, userValue || defaultValue];
    })
  );

  const initialProfileRef = useRef(null);

  // Solo inicializa una vez, al montar el componente
  useEffect(() => {
    if (!initialProfileRef.current) {
      initialProfileRef.current = {};
      camposPerfil.forEach(key => {
        initialProfileRef.current[key] = formData[key];
      });
    }
    // eslint-disable-next-line
  }, []); // <--- sin dependencias

  function shallowEqualProfile(a, b) {
    for (let key of camposPerfil) {
      if (Array.isArray(a[key]) && Array.isArray(b[key])) {
        if (a[key].length !== b[key].length || a[key].some((v, i) => v !== b[key][i])) {
          return false;
        }
      } else if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }

  function hasProfileChanged() {
    if (!initialProfileRef.current) return false;
    return !shallowEqualProfile(formData, initialProfileRef.current);
  }

  function shallowEqualPlan(a, b) {
    for (let key of camposPlan) {
      if (Array.isArray(a[key]) && Array.isArray(b[key])) {
        if (a[key].length !== b[key].length || a[key].some((v, i) => v !== b[key][i])) {
          return false;
        }
      } else if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }

  function hasPlanRelevantProfileChanged() {
    if (!initialProfileRef.current) return false;
    return !shallowEqualPlan(formData, initialProfileRef.current);
  }

  useEffect(() => {
    if (!initialProfileRef.current) return;
    const changed = hasProfileChanged();
    if (changed) {
      console.log('¿Perfil cambiado?', changed, {
        actual: camposPerfil.reduce((acc, key) => ({ ...acc, [key]: formData[key] }), {}),
        inicial: initialProfileRef.current
      });
    }
    // eslint-disable-next-line
  }, [formData]);

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

  const handleSaveField = async (field) => {
  if (validate(field)) {
    onUpdate({
      ...formData,
      ...editedData
    });
    setEditingField(null);
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
    
    if (type === 'checkbox') {
      if (checked) {
        onUpdate({
          ...formData,
          [name]: [...(formData[name] || []), value]
        });
      } else {
        onUpdate({
          ...formData,
          [name]: (formData[name] || []).filter(item => item !== value)
        });
      }
    } else {
      onUpdate({
        ...formData,
        [name]: value
      });
    }
  };

  // Manejador específico para la selección de dieta
  const handleDietSelect = (dietId) => {
    onUpdate({
      ...formData,
      dieta: dietId
    });
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
    
    onUpdate({
      ...formData,
      restricciones
    });
  };

  const closePopup = () => {
    setPopupStep(null);
    setEditTarget(null);
  };

  const handlePopupDone = async () => {
  closePopup();
  // Espera breve para que el estado se actualice antes de enviar
  setTimeout(() => {
    enviarHistorialAlBackend();
  }, 100);
};

  const handleCreatePlan = () => {
    setCurrentView('createPlan');
  };

  const handleUpdatePlan = () => {
    // Actualizamos el plan y luego lo mostramos
    // En una implementación real, aquí iría la llamada a la API
    onUpdate({
      ...formData,
      planCreated: true // Marcamos que el usuario ya tiene un plan
    });
    setCurrentView('viewPlan');
  };

  const handleViewPlan = () => {
    setCurrentView('viewPlan');
  };

  const handleBackToProfile = () => {
    setCurrentView('profile');
  };

  
  // Simulamos si el plan existe o no
  // En una implementación real, esto vendría de props o API
  const planExists = true; 
  const planModified = hasPlanRelevantProfileChanged();


  const renderEditableField = (field, label, type = 'text') => {
    if (field === 'email') {
      // Renderiza como solo lectura, sin botón de editar
      return (
        <div className="info-row">
          <span className="info-label">{label}:</span>
          <div className="value-with-edit">
            <span className="info-value">{displayData[field] || 'No especificado'}</span>
          </div>
        </div>
      );
    }
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

  function getPesoValor(pesoId, deporte, sexo) {
    if (!pesoId || !deporte) return pesoId;
    const catDeporte = categoriasPesoPorDeporte[deporte];
    if (!catDeporte) return pesoId;
    let categorias = [];
    if (catDeporte.all) {
      categorias = catDeporte.all;
    } else if (['male', 'hombre', 'masculino'].includes((sexo || '').toLowerCase())) {
      categorias = catDeporte.male || [];
    } else if (['female', 'mujer', 'femenino'].includes((sexo || '').toLowerCase())) {
      categorias = catDeporte.female || [];
    }
    const cat = categorias.find(c => c.id === pesoId);
    return cat ? cat.valor : pesoId;
  }

  const renderReadOnlyField = (field, label, suffix = '') => {
    let displayValue = displayData[field];
    
    // Si es la dieta, mostramos el nombre legible
    if (field === 'dieta') {
      const dietaEncontrada = tiposDieta.find(d => d.id === displayValue);
      displayValue = dietaEncontrada ? dietaEncontrada.nombre : displayValue;
    }

    if (field === 'peso') {
      displayValue = getPesoValor(
        displayData.peso,
        displayData.deporte,
        displayData.sexo
      );
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
    return <CreatePlanStep formData={formData} onBack={handleBackToProfile} />;
  }

  if (currentView === 'viewPlan') {
    return <ViewPlanStep formData={formData} onBack={handleBackToProfile} />;
  }

  // Vista de perfil
  return (
    <div className="profile-container">
      <h2>Mi Perfil</h2>
      
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
            
            {renderReadOnlyField('peso', 'Peso', 'kg')}
            {/* Solo mostrar advertencia si el usuario está modificando el plan */}
            {!categoriaValida && planModified && (
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
        </div>
        
        <div className="profile-actions">
        {planExists ? (
          <>
            <button
              className="update-plan-button"
              onClick={handleCreatePlan}
              disabled={!planModified}
            >
              Actualizar Plan de Alimentación
            </button>
            <button
              className="view-plan-button"
              onClick={handleViewPlan}
              disabled={planModified}
            >
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
              <button className="popup-done-button" onClick={handlePopupDone}>
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