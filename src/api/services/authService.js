/**
 * authService.js
 * 
 * Contains functions to call authentication-related API endpoints.
 */

import { apiClient } from '../apiClient';
import { ENDPOINTS } from '../endpoints';

export const authService = {
  /**
   * Log in user with email and password
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} API response with user info/token
   */
  login: async (credentials) => {
    return apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
  },

  /**
   * Register a new user
   * @param {Object} userData - Registration fields
   * @returns {Promise<Object>} API response
   */
  register: async (userData) => {
    return apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
  },

  verifyOtp: async (verificationData) => {
    return apiClient.post(ENDPOINTS.AUTH.VERIFY_OTP, verificationData);
  },

  /**
   * Log out the current user
   * @returns {Promise<null>}
   */
  logout: async () => {
    return apiClient.post(ENDPOINTS.AUTH.LOGOUT, {});
  },

  /**
   * Fetch current authenticated user's profile
   * @returns {Promise<Object>} User details
   */
  getMe: async () => {
    return apiClient.get(ENDPOINTS.AUTH.ME);
  },

  googlelogin: async (role) => {
    return apiClient.get(ENDPOINTS.AUTH.SOCIAL_GOOGLE_LOGIN(role));
  },

  githublogin: async (role) => {
    return apiClient.get(ENDPOINTS.AUTH.SOCIAL_GITHUB_LOGIN(role));
  }
};
