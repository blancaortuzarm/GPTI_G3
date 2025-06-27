// Mapeo de valores del frontend a IDs de la base de datos basado en los datos reales

const SPORT_MAPPING = {
  'boxing': 1,       // Boxeo
  'judo': 2,         // Judo  
  'wrestling': 3,    // Lucha (wrestling)
  'taekwondo': 4,    // Taekwondo
  'horseracing': 5,  // Turf (carreras de caballos)
  'weightlifting': 6, // Halterofilia
  'muaythai': 7      // Muay Thai
};

// Mapeo de restricciones dietéticas basado en tu base de datos
const DIETARY_RESTRICTION_MAPPING = {
  'sin_gluten': 4,      // Sin Gluten
  'sin_mani': 7,        // Maní
  'sin_mariscos': 8,    // Mariscos y Crustáceos  
  'sin_nueces': 9,      // Nueces
  'sin_leche': 10,      // Leche de vaca
  'sin_pescado': 11,    // Pescado
  'sin_huevos': 12      // Huevos
};

// Las categorías de peso dependen del deporte y género - basado en tu base de datos real
const WEIGHT_CATEGORIES = {
  // Boxeo (ID: 1)
  1: {
    'Masculino': [
      { id: 97, name: '60kg', min: 0, max: 60 },
      { id: 98, name: '66kg', min: 60.1, max: 66 },
      { id: 99, name: '73kg', min: 66.1, max: 73 },
      { id: 100, name: '81kg', min: 73.1, max: 81 },
      { id: 101, name: '90kg', min: 81.1, max: 90 },
      { id: 102, name: '100kg', min: 90.1, max: 100 },
      { id: 103, name: 'plus100kg', min: 100.1, max: 999 }
    ],
    'Femenino': [
      { id: 104, name: '48kg', min: 0, max: 48 },
      { id: 105, name: '52kg', min: 48.1, max: 52 },
      { id: 106, name: '57kg', min: 52.1, max: 57 },
      { id: 107, name: '63kg', min: 57.1, max: 63 },
      { id: 108, name: '70kg', min: 63.1, max: 70 },
      { id: 109, name: '78kg', min: 70.1, max: 78 },
      { id: 110, name: 'plus78kg', min: 78.1, max: 999 }
    ]
  },
  // Judo (ID: 2)
  2: {
    'Masculino': [
      { id: 45, name: '< 60kg', min: 0, max: 60 },
      { id: 46, name: '< 66kg', min: 60.1, max: 66 },
      { id: 47, name: '< 73kg', min: 66.1, max: 73 },
      { id: 48, name: '< 81kg', min: 73.1, max: 81 },
      { id: 49, name: '< 90kg', min: 81.1, max: 90 },
      { id: 50, name: '< 100kg', min: 90.1, max: 100 },
      { id: 51, name: '> 100kg', min: 100.1, max: 999 }
    ],
    'Femenino': [
      { id: 52, name: '< 48kg', min: 0, max: 48 },
      { id: 53, name: '< 52kg', min: 48.1, max: 52 },
      { id: 54, name: '< 57kg', min: 52.1, max: 57 },
      { id: 55, name: '< 63kg', min: 57.1, max: 63 },
      { id: 56, name: '< 70kg', min: 63.1, max: 70 },
      { id: 57, name: '< 78kg', min: 70.1, max: 78 },
      { id: 58, name: '> 78kg', min: 78.1, max: 999 }
    ]
  },
  // Lucha (ID: 3)
  3: {
    'Masculino': [
      { id: 67, name: '57kg', min: 0, max: 57 },
      { id: 68, name: '65kg', min: 57.1, max: 65 },
      { id: 69, name: '74kg', min: 65.1, max: 74 },
      { id: 70, name: '86kg', min: 74.1, max: 86 },
      { id: 71, name: '97kg', min: 86.1, max: 97 },
      { id: 72, name: '125kg', min: 97.1, max: 125 }
    ],
    'Femenino': [
      { id: 73, name: '50kg', min: 0, max: 50 },
      { id: 74, name: '53kg', min: 50.1, max: 53 },
      { id: 75, name: '57kg', min: 53.1, max: 57 },
      { id: 76, name: '62kg', min: 57.1, max: 62 },
      { id: 77, name: '68kg', min: 62.1, max: 68 },
      { id: 78, name: '76kg', min: 68.1, max: 76 }
    ]
  },
  // Taekwondo (ID: 4)
  4: {
    'Masculino': [
      { id: 59, name: 'Flyweight', min: 0, max: 58 },
      { id: 60, name: 'Featherweight', min: 58.1, max: 68 },
      { id: 61, name: 'Welterweight', min: 68.1, max: 80 },
      { id: 62, name: 'Heavyweight', min: 80.1, max: 999 }
    ],
    'Femenino': [
      { id: 63, name: 'Flyweight', min: 0, max: 49 },
      { id: 64, name: 'Featherweight', min: 49.1, max: 57 },
      { id: 65, name: 'Welterweight', min: 57.1, max: 67 },
      { id: 66, name: 'Heavyweight', min: 67.1, max: 999 }
    ]
  },
  // Turf (ID: 5)
  5: {
    'Masculino': [
      { id: 79, name: 'Lightweight', min: 0, max: 72.9 },
      { id: 80, name: 'Middleweight', min: 73, max: 90.9 },
      { id: 81, name: 'Heavyweight', min: 91, max: 999 },
      { id: 82, name: 'Junior', min: 0, max: 17 }
    ],
    'Femenino': [
      { id: 83, name: 'Lightweight', min: 0, max: 72.9 },
      { id: 84, name: 'Middleweight', min: 73, max: 90.9 },
      { id: 85, name: 'Heavyweight', min: 91, max: 999 },
      { id: 86, name: 'Junior', min: 0, max: 17 }
    ]
  },
  // Halterofilia (ID: 6)
  6: {
    'Masculino': [
      { id: 87, name: '61kg', min: 61, max: 61 },
      { id: 88, name: '73kg', min: 73, max: 73 },
      { id: 89, name: '89kg', min: 89, max: 89 },
      { id: 90, name: '102kg', min: 102, max: 102 },
      { id: 91, name: 'plus102kg', min: 102.1, max: 999 }
    ],
    'Femenino': [
      { id: 92, name: '49kg', min: 49, max: 49 },
      { id: 93, name: '59kg', min: 59, max: 59 },
      { id: 94, name: '71kg', min: 71, max: 71 },
      { id: 95, name: '81kg', min: 81, max: 81 },
      { id: 96, name: 'plus81kg', min: 81.1, max: 999 }
    ]
  },
  // Muay Thai (ID: 7)
  7: {
    'Masculino': [
      { id: 11, name: 'Miniflyweight', min: 47.6, max: 47.6 },
      { id: 12, name: 'Jr. Flyweight', min: 49, max: 49 },
      { id: 13, name: 'Flyweight', min: 50.8, max: 50.8 },
      { id: 14, name: 'Jr. Bantamweight', min: 52.2, max: 52.2 },
      { id: 15, name: 'Bantamweight', min: 53.5, max: 53.5 },
      { id: 16, name: 'Jr. Featherweight', min: 55.3, max: 55.3 },
      { id: 17, name: 'Featherweight', min: 57.2, max: 57.2 },
      { id: 18, name: 'Jr. Lightweight', min: 59, max: 59 },
      { id: 19, name: 'Lightweight', min: 61.2, max: 61.2 },
      { id: 20, name: 'Jr. Welterweight', min: 63.5, max: 63.5 },
      { id: 21, name: 'Welterweight', min: 66.7, max: 66.7 },
      { id: 22, name: 'Jr. Middleweight', min: 69.9, max: 69.9 },
      { id: 23, name: 'Middleweight', min: 72.6, max: 72.6 },
      { id: 24, name: 'Super Middleweight', min: 76.2, max: 76.2 },
      { id: 25, name: 'Light Heavyweight', min: 79.4, max: 79.4 },
      { id: 26, name: 'Cruiserweight', min: 90.7, max: 90.7 },
      { id: 27, name: 'Heavyweight', min: 90.8, max: 999 }
    ],
    'Femenino': [
      { id: 28, name: 'Miniflyweight', min: 47.6, max: 47.6 },
      { id: 29, name: 'Jr. Flyweight', min: 49, max: 49 },
      { id: 30, name: 'Flyweight', min: 50.8, max: 50.8 },
      { id: 31, name: 'Jr. Bantamweight', min: 52.2, max: 52.2 },
      { id: 32, name: 'Bantamweight', min: 53.5, max: 53.5 },
      { id: 33, name: 'Jr. Featherweight', min: 55.3, max: 55.3 },
      { id: 34, name: 'Featherweight', min: 57.2, max: 57.2 },
      { id: 35, name: 'Jr. Lightweight', min: 59, max: 59 },
      { id: 36, name: 'Lightweight', min: 61.2, max: 61.2 },
      { id: 37, name: 'Jr. Welterweight', min: 63.5, max: 63.5 },
      { id: 38, name: 'Welterweight', min: 66.7, max: 66.7 },
      { id: 39, name: 'Jr. Middleweight', min: 69.9, max: 69.9 },
      { id: 40, name: 'Middleweight', min: 72.6, max: 72.6 },
      { id: 41, name: 'Super Middleweight', min: 76.2, max: 76.2 },
      { id: 42, name: 'Light Heavyweight', min: 79.4, max: 79.4 },
      { id: 43, name: 'Cruiserweight', min: 90.7, max: 90.7 },
      { id: 44, name: 'Heavyweight', min: 90.8, max: 999 }
    ]
  }
};

// Mapeo para dietas basado en la estructura real de la base de datos
const DIET_MAPPING = {
  'omnivora': 1,        // Omnívora
  'vegetariana': 2,     // Vegetariana
  'vegana': 3,          // Vegana
  'keto': 4,            // Keto
  'paleo': 5            // Paleo
};

class FormDataMapper {
  static getSportId(sportName) {
    return SPORT_MAPPING[sportName] || null;
  }

  static getWeightCategoryId(sportId, gender, weightOrCategory) {
    console.log('=== DEBUG getWeightCategoryId ===');
    console.log('Parámetros:', { sportId, gender, weightOrCategory });
    
    if (!sportId || !gender || !weightOrCategory) {
      console.log('Faltan parámetros, retornando null');
      return null;
    }
    
    const categories = WEIGHT_CATEGORIES[sportId];
    console.log('Categorías encontradas para sportId', sportId, ':', categories ? 'SÍ' : 'NO');
    
    if (!categories) {
      console.log('No hay categorías para el deporte', sportId);
      return null;
    }
    
    // Mapear género del frontend al formato de la base de datos
    let normalizedGender;
    if (gender === 'male' || gender === 'masculino' || gender === 'Masculino') {
      normalizedGender = 'Masculino';
    } else if (gender === 'female' || gender === 'femenino' || gender === 'Femenino') {
      normalizedGender = 'Femenino';
    } else {
      normalizedGender = gender;
    }
    
    console.log('Género normalizado:', normalizedGender);
    console.log('Categorías disponibles para género:', Object.keys(categories));
    
    if (!categories[normalizedGender]) {
      console.log('No hay categorías para el género', normalizedGender);
      return null;
    }
    
    // Si es un número, buscar por rango de peso
    if (!isNaN(parseFloat(weightOrCategory))) {
      console.log('Es un número, buscando por rango de peso');
      const userWeight = parseFloat(weightOrCategory);
      const category = categories[normalizedGender].find(cat => 
        userWeight >= cat.min && userWeight <= cat.max
      );
      console.log('Categoría encontrada por peso:', category);
      return category ? category.id : null;
    }
    
    // Si es una cadena, buscar por nombre de categoría exacto
    console.log('Es una cadena, buscando por nombre exacto:', weightOrCategory);
    console.log('Categorías disponibles:', categories[normalizedGender].map(c => c.name));
    
    // Buscar coincidencia exacta primero
    const exactMatch = categories[normalizedGender].find(cat => cat.name === weightOrCategory);
    if (exactMatch) {
      console.log('Coincidencia exacta encontrada:', exactMatch);
      return exactMatch.id;
    }
    
    // Si no hay coincidencia exacta, buscar coincidencia parcial (case insensitive)
    const partialMatch = categories[normalizedGender].find(cat => 
      cat.name.toLowerCase() === weightOrCategory.toLowerCase()
    );
    if (partialMatch) {
      console.log('Coincidencia parcial encontrada:', partialMatch);
      return partialMatch.id;
    }
    
    console.log('No se encontró ninguna categoría para:', weightOrCategory);
    console.log('================================');
    
    return null;
  }

  static getDietId(dietName) {
    return DIET_MAPPING[dietName] || null;
  }

  static getDietaryRestrictionIds(restrictions) {
    if (!Array.isArray(restrictions)) return [];
    return restrictions.map(restriction => DIETARY_RESTRICTION_MAPPING[restriction]).filter(id => id !== undefined);
  }

  // Método de test para verificar que el mapeo funciona
  static testMapping() {
    const testData = {
      deporte: 'muaythai',
      sexo: 'male',
      peso: 'jr_middleweight', // Usar el nombre correcto del frontend
      dieta: 'omnivora',
      comidas: 3,
      snacks: 2,
      restricciones: ['sin_gluten', 'sin_mani']
    };
    
    console.log('=== TEST DE MAPEO ===');
    console.log('Datos de test:', testData);
    
    const profileData = this.mapFormDataToProfile(testData);
    const historyData = this.mapFormDataToHistory(testData);
    const restrictionIds = this.getDietaryRestrictionIds(testData.restricciones);
    
    console.log('Profile mapeado:', profileData);
    console.log('History mapeado:', historyData);
    console.log('Restriction IDs:', restrictionIds);
    
    // Verificar que todos los IDs son válidos
    const isValid = profileData.sportId && profileData.weightCategoryId && profileData.dietId;
    console.log('¿Mapeo válido?', isValid);
    console.log('===================');
    
    return { profileData, historyData, restrictionIds, isValid };
  }

  // Exponer en window para poder acceder desde la consola del navegador
  static exposeToWindow() {
    if (typeof window !== 'undefined') {
      window.FormDataMapper = this;
      window.testFormDataMapper = () => this.testMapping();
      console.log('FormDataMapper expuesto en window. Ejecuta testFormDataMapper() en la consola.');
    }
  }

  static mapFormDataToProfile(formData) {
    console.log('=== DEBUG mapFormDataToProfile ===');
    console.log('FormData recibido:', formData);
    
    const sportId = this.getSportId(formData.deporte);
    console.log('SportId calculado:', sportId, 'para deporte:', formData.deporte);
    
    const weightCategoryId = this.getWeightCategoryId(sportId, formData.sexo, formData.peso);
    console.log('WeightCategoryId calculado:', weightCategoryId, 'para sport:', sportId, 'sexo:', formData.sexo, 'peso:', formData.peso);
    
    const dietId = this.getDietId(formData.dieta);
    console.log('DietId calculado:', dietId, 'para dieta:', formData.dieta);
    
    const result = {
      sportId,
      weightCategoryId,
      dietId,
      mainMealsCount: parseInt(formData.comidas) || 3,
      snacksCount: parseInt(formData.snacks) || 2
    };
    
    console.log('Resultado final Profile:', result);
    console.log('===============================');
    
    return result;
  }

  static mapFormDataToHistory(formData) {
    console.log('=== DEBUG mapFormDataToHistory ===');
    console.log('FormData recibido:', formData);
    
    const sportId = this.getSportId(formData.deporte);
    console.log('SportId calculado:', sportId, 'para deporte:', formData.deporte);
    
    const weightCategoryId = this.getWeightCategoryId(sportId, formData.sexo, formData.peso);
    console.log('WeightCategoryId calculado:', weightCategoryId, 'para sport:', sportId, 'sexo:', formData.sexo, 'peso:', formData.peso);
    
    const dietId = this.getDietId(formData.dieta);
    console.log('DietId calculado:', dietId, 'para dieta:', formData.dieta);
    
    const result = {
      weight: 70, // peso por defecto
      sportId,
      weightCategoryId,
      dietId,
      mainMealsCount: parseInt(formData.comidas) || 3,
      snacksCount: parseInt(formData.snacks) || 2
    };
    
    console.log('Resultado final History:', result);
    console.log('¿Todos los IDs válidos?', sportId && weightCategoryId && dietId);
    console.log('==============================');
    
    return result;
  }
}

// Exponer FormDataMapper para debugging
FormDataMapper.exposeToWindow();

export default FormDataMapper;
