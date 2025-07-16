// Backend API configuration for microservices
// In production (Railway), nginx will proxy API calls to the backend
// In development, we use the full backend URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || '';

// API endpoints
export const API_ENDPOINTS = {
  config: '/config',
  api: '/api',
  uploads: '/uploads',
  hints: '/hints',
  robots: '/robots.txt',
  adminLogs: '/admin/logs',
  systemConfig: '/system/config'
};

// Utility function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = BASE_URL ? `${BASE_URL}${endpoint}` : endpoint;

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
  // Get festival info
  getFestival: () => apiCall('/api/festival'),

  // Get artists
  getArtists: () => apiCall('/api/artists'),

  // Get tickets info
  getTickets: () => apiCall('/api/tickets'),

  // Get hints (encrypted Caesar cipher)
  getHints: () => apiCall('/api/hints'),

  // Get hints page (with decoder hints)
  getHintsPage: () => apiCall(API_ENDPOINTS.hints),

  // Decrypt Caesar cipher
  decryptCaesar: (message, shift) => apiCall('/api/decrypt', {
    method: 'POST',
    body: JSON.stringify({ message, shift }),
  }),

  // Vulnerable config endpoint (CTF challenge)
  getConfig: () => apiCall(API_ENDPOINTS.config, { method: 'GET' }),

  // Post to config endpoint (potential vulnerability - YAML RCE)
  postConfig: (data, contentType = 'application/json') => {
    const headers = contentType === 'application/json'
      ? { 'Content-Type': 'application/json' }
      : { 'Content-Type': contentType };

    return apiCall(API_ENDPOINTS.config, {
      method: 'POST',
      headers,
      body: contentType === 'application/json' ? JSON.stringify(data) : data,
    });
  },

  // System status
  getSystemStatus: () => apiCall('/api/status'),

  // Admin panel
  getAdminPanel: () => apiCall('/api/admin'),

  // System logs
  getSystemLogs: () => apiCall('/api/logs'),

  // System info (privilege escalation hints)
  getSystemInfo: () => apiCall('/api/system'),

  // Robots.txt
  getRobots: () => apiCall(API_ENDPOINTS.robots),

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

  // Get uploaded file
  getUploadedFile: (filename) => apiCall(`/uploads/${filename}`),
};

export default BASE_URL;
