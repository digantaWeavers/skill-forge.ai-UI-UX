/**
 * endpoints.js
 * 
 * Central registry for all API endpoints.
 * Group them logically by resource domain.
 * 
 * These relative paths are appended to VITE_API_BASE_URL.
 */

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    SOCIAL_GOOGLE_LOGIN: (role) => `/auth/google?role=${role}`,
    SOCIAL_GITHUB_LOGIN: (role) => `/auth/github?role=${role}`,
    SUBCRIPTION: '/subscription/create-subscription-link',
    ME: '/profile/me',
  },
  USERS: {
    GET_ALL: '/users',
    GET_PROFILE: '/profile/me',
    UPDATE_PROFILE: '/profile/update',
    DELETE_ACCOUNT: '/users/delete',
  },
  // Example for another service
  COURSES: {
    LIST: '/courses',
    DETAILS: (id) => `/courses/${id}`,
    CREATE: '/courses/create',
  }
};
