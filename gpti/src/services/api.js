const API_BASE_URL = 'http://localhost:3000';

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Método para registro de usuario
  static async registerUser(userData) {
    return this.request('/users/create', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.nombre,
        age: parseInt(userData.edad),
        gender: userData.gender || 'Masculino' 
      }),
    });
  }

  // Método para login de usuario
  static async loginUser(credentials) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Método para obtener información del usuario
  static async getUserById(userId, token) {
    return this.request(`/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Método para obtener recomendación de IA
  static async getUserRecommendation(userId, token) {
    return this.request(`/recommendation/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Método para crear/actualizar perfil del usuario
  static async createUserProfile(userId, profileData, token) {
    return this.request(`/users/${userId}/profile`, {
      method: 'POST',
      body: JSON.stringify(profileData),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Método para agregar datos al historial del usuario
  static async addUserHistory(userId, historyData, token) {
    console.log('Adding history for user:', userId, 'with data:', historyData);
    
    return this.request(`/users/${userId}/history`, {
      method: 'POST',
      body: JSON.stringify(historyData),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
  }

  // Método para actualizar restricciones dietéticas del usuario
  static async updateUserRestrictions(userId, restrictionIds, token) {
    return this.request(`/users/${userId}/restrictions`, {
      method: 'POST',
      body: JSON.stringify({ restrictionIds }),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Método para obtener restricciones del usuario
  static async getUserRestrictions(userId, token) {
    return this.request(`/users/${userId}/restrictions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Métodos para obtener opciones disponibles del backend
  static async getSports() {
    return this.request('/options/sports', {
      method: 'GET',
    });
  }

  static async getDiets() {
    return this.request('/options/diets', {
      method: 'GET',
    });
  }

  static async getWeightCategories() {
    return this.request('/options/weight-categories', {
      method: 'GET',
    });
  }

  static async getDietaryRestrictions() {
    return this.request('/options/dietary-restrictions', {
      method: 'GET',
    });
  }
}

export default ApiService;
