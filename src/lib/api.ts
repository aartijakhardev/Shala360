import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds for file uploads
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

// Admission API endpoints
export const admissionAPI = {
  /**
   * Submit a new admission application
   */
  submit: async (formData: any) => {
    const response = await api.post('/admissions', formData);
    return response.data;
  },

  /**
   * Get all admission applications
   */
  getAll: async (params?: {
    status?: string;
    class?: string;
    academicYear?: string;
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const response = await api.get('/admissions', { params });
    return response.data;
  },

  /**
   * Get admission by ID
   */
  getById: async (id: string) => {
    const response = await api.get(`/admissions/${id}`);
    return response.data;
  },

  /**
   * Update admission status
   */
  updateStatus: async (id: string, data: { status: string; comments?: string }) => {
    const response = await api.patch(`/admissions/${id}/status`, data);
    return response.data;
  },

  /**
   * Delete admission application
   */
  delete: async (id: string) => {
    const response = await api.delete(`/admissions/${id}`);
    return response.data;
  },

  /**
   * Get admission statistics
   */
  getStats: async (academicYear?: string) => {
    const response = await api.get('/admissions/stats', {
      params: { academicYear },
    });
    return response.data;
  },
};

