// Backend API configuration for microservices
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://hackfest-backend-production.up.railway.app';

// API endpoints
export const API_ENDPOINTS = {
  config: '/config',
  api: '/api',
  uploads: '/uploads',
  adminLogs: '/admin/logs',
  systemConfig: '/system/config'
};

// Utility function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    // Handle different content types
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Specific API functions for CTF challenges
export const ctfAPI = {
  // Vulnerable config endpoint (CTF challenge)
  getConfig: () => apiCall(API_ENDPOINTS.config, { method: 'GET' }),

  // Post to config endpoint (potential vulnerability)
  postConfig: (data) => apiCall(API_ENDPOINTS.config, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Admin logs endpoint (CTF challenge)
  getAdminLogs: () => apiCall(API_ENDPOINTS.adminLogs, { method: 'GET' }),

  // System config endpoint (CTF challenge)
  getSystemConfig: () => apiCall(API_ENDPOINTS.systemConfig, { method: 'GET' }),

  // File upload endpoint
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiCall(API_ENDPOINTS.uploads, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for multipart
    });
  },
};

export default BASE_URL;
