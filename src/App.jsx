import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InstructorLogin from './pages/auth/InstructorLogin';
import InstructorRegister from './pages/auth/InstructorRegister';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import InstructorSubscription from './pages/subscription/InstructorSubscription';
import InstructorBasicDetails from './pages/onboarding/InstructorBasicDetails';
import { ProtectedRoute, SubscriptionRequiredRoute } from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith('/auth') || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/subscription') || location.pathname.startsWith('/onboarding');

  return (
    <div className="app-container">
      {/* No navbar on auth or dashboard pages */}
      {!hideLayout && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<InstructorLogin />} />
          <Route path="/auth/register" element={<InstructorRegister />} />
          <Route path="/subscription/instructor" element={<ProtectedRoute><InstructorSubscription /></ProtectedRoute>} />
          <Route path="/onboarding" element={<ProtectedRoute><InstructorBasicDetails /></ProtectedRoute>} />
          <Route path="/dashboard" element={<SubscriptionRequiredRoute><InstructorDashboard /></SubscriptionRequiredRoute>} />

          {/* Placeholder for other routes */}
          <Route path="*" element={
            <div className="container py-5 text-center mt-5">
              <h1 className="display-1 text-ai-gradient fw-bold">404</h1>
              <p className="text-muted">Module not found in neural memory.</p>
              <a href="/" className="btn btn-primary-custom">Return to Base</a>
            </div>
          } />
        </Routes>
      </main>

      {/* No footer on auth or dashboard pages */}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
