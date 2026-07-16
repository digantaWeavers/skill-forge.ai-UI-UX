/**
 * apiClient.js
 * 
 * Simple custom fetch wrapper configured with VITE_API_BASE_URL.
 * This directly calls the endpoint URL, ensuring that requests to your server
 * are visible directly in your browser's Network tab.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000/api/v1';

export const apiClient = {
  /**
   * Main request handler
   */
  async request(endpoint, options = {}) {
    if (endpoint === undefined || endpoint === null) {
      throw new Error("API request endpoint is undefined. Please verify the endpoint configuration in your API service call.");
    }

    // Combine base URL and endpoint (ensures no double slashes)
    const url = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

    // Retrieve authentication token
    const token = localStorage.getItem('accesstoken');

    // Default headers
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      // Handle HTTP errors (4xx, 5xx)
      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (e) {
          // Response is not JSON
        }
        
        const error = new Error(errorData.message || `Request failed with status ${response.status}`);
        error.status = response.status;
        error.response = response;
        error.data = errorData;
        throw error;
      }

      // Check if response is empty or status is 204 (No Content)
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  /**
   * Helper methods
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },
};

/*
========================================================================
ALTERNATIVE: AXIOS SETUP (If you decide to install Axios in the future)
========================================================================

1. Install axios: npm install axios
2. Replace this file's contents or use this setup:

import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (e.g. for attaching auth token)
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (e.g. for handling errors globally)
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Global error handling can go here (e.g. redirect on 401)
    console.error('API error:', error.response || error.message);
    return Promise.reject(error);
  }
);
*/
