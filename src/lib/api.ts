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

// Student API endpoints
export const studentAPI = {
  /**
   * Get all students (approved admissions)
   */
  getAll: async (params?: {
    class?: string;
    academicYear?: string;
    status?: string;
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const response = await api.get('/admissions', { 
      params: { 
        ...params, 
        status: params?.status || 'approved' // Only show approved students by default
      } 
    });
    return response.data;
  },

  /**
   * Get student by ID
   */
  getById: async (id: string) => {
    const response = await api.get(`/admissions/${id}`);
    return response.data;
  },

  /**
   * Update student information
   */
  update: async (id: string, data: any) => {
    const response = await api.patch(`/admissions/${id}`, data);
    return response.data;
  },

  /**
   * Delete student
   */
  delete: async (id: string) => {
    const response = await api.delete(`/admissions/${id}`);
    return response.data;
  },
};

// Teacher API endpoints
export const teacherAPI = {
  /**
   * Get all teachers
   */
  getAll: async (params?: {
    includeDeleted?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    subject?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    const response = await api.get('/teachers', { params });
    return response.data;
  },

  /**
   * Get teacher by ID
   */
  getById: async (id: string) => {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
  },

  /**
   * Create new teacher
   */
  create: async (teacherData: any) => {
    const response = await api.post('/teachers', teacherData);
    return response.data;
  },

  /**
   * Update teacher information
   */
  update: async (id: string, teacherData: any) => {
    const response = await api.put(`/teachers/${id}`, teacherData);
    return response.data;
  },

  /**
   * Soft delete teacher
   */
  delete: async (id: string) => {
    const response = await api.delete(`/teachers/${id}`);
    return response.data;
  },

  /**
   * Restore teacher
   */
  restore: async (id: string) => {
    const response = await api.patch(`/teachers/${id}/restore`);
    return response.data;
  },

  /**
   * Upload teacher photo
   */
  uploadPhoto: async (id: string, photoData: { photo: string; fileName?: string }) => {
    const response = await api.post(`/teachers/${id}/photo`, photoData);
    return response.data;
  },

  /**
   * Get teacher statistics
   */
  getStats: async () => {
    const response = await api.get('/teachers/stats');
    return response.data;
  },

  /**
   * Export teachers to Excel/CSV
   */
  export: async (params?: {
    format?: 'excel' | 'csv';
    includeDeleted?: boolean;
    status?: string;
    subject?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.format) queryParams.append('format', params.format);
    if (params?.includeDeleted !== undefined) queryParams.append('includeDeleted', params.includeDeleted.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.subject) queryParams.append('subject', params.subject);

    const response = await api.get(`/teachers/export?${queryParams.toString()}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  /**
   * Permanently delete teacher (admin only)
   */
  permanentDelete: async (id: string) => {
    const response = await api.delete(`/teachers/${id}/permanent`);
    return response.data;
  },
};

// Teacher-related types
export interface Teacher {
  _id: string;
  teacherId: string;
  name: string;
  subject: string;
  qualification?: string;
  experience?: string;
  dob: Date;
  gender: 'Male' | 'Female' | 'Other';
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  joiningDate: Date;
  salary?: number;
  aadharNumber: string;
  subjectsTaught: string[];
  documents: {
    url: string;
    fileName?: string;
    fileType?: string;
    uploadedAt?: Date;
  }[];
  email?: string;
  phone?: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  photo?: {
    url: string;
    publicId: string;
    fileName?: string;
    fileType?: string;
    fileSize?: number;
    uploadedAt?: Date;
  };
  isDeleted: boolean;
  remarks?: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeacherFormData {
  teacherId?: string;
  name: string;
  subject: string;
  qualification?: string;
  experience?: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  joiningDate: string;
  salary?: number;
  aadharNumber: string;
  subjectsTaught?: string[];
  email?: string;
  phone?: string;
  status?: 'Active' | 'On Leave' | 'Inactive';
  photo?: string;
  photoFileName?: string;
  remarks?: string;
}

