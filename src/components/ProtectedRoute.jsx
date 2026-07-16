import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute
 * 
 * Middleware wrapper to secure routes requiring basic authentication.
 * Checks for both 'accesstoken' and 'refreshtoken' in localStorage.
 * Redirects to /auth/login if not present.
 */
export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem('accesstoken');
  const refreshToken = localStorage.getItem('refreshtoken');

  if (!accessToken || !refreshToken) {
    // Redirect to login page and store the attempted location in route state
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  // Support both component wrapper syntax and nested React Router <Outlet /> syntax
  return children ? children : <Outlet />;
};

/**
 * SubscriptionRequiredRoute
 * 
 * Middleware wrapper to secure routes requiring an active subscription.
 * Checks for authentication and verifies that user.isSubscribed is true.
 * Redirects to /subscription/instructor if false or not found.
 */
export const SubscriptionRequiredRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem('accesstoken');
  const refreshToken = localStorage.getItem('refreshtoken');

  const userString = localStorage.getItem('user');
  let user = null;

  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
  }

  // 1. If not authenticated at all, redirect to login
  if (!accessToken || !refreshToken || !user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  // 2. If authenticated but has not subscribed, redirect to subscription page
  if (user.role === 'instructor' && user.isSubscribed !== true) {
    return <Navigate to="/subscription/instructor" replace state={{ from: location }} />;
  }

  // Support both component wrapper syntax and nested React Router <Outlet /> syntax
  return children ? children : <Outlet />;
};
