/**
 * userService.js
 * 
 * Contains functions to call user-related API endpoints.
 */

import { apiClient } from '../apiClient';
import { ENDPOINTS } from '../endpoints';

export const userService = {
  getSubcriptionLink: async (subscriptionData) => {
    return apiClient.post(ENDPOINTS.AUTH.SUBCRIPTION, subscriptionData);
  },

  /**
   * Fetch user profile
   * @returns {Promise<Object>} Profile details
   */
  getProfile: async () => {
    return apiClient.get(ENDPOINTS.USERS.GET_PROFILE);
  },

  /**
   * Update current user profile
   * @param {Object} profileData - Updated profile fields
   * @returns {Promise<Object>} Updated profile details
   */
  updateProfile: async (profileData) => {
    return apiClient.patch(ENDPOINTS.USERS.UPDATE_PROFILE, profileData);
  },

  /**
   * Delete current user account
   * @returns {Promise<Object>} Status response
   */
  deleteAccount: async () => {
    return apiClient.delete(ENDPOINTS.USERS.DELETE_ACCOUNT);
  }
};
