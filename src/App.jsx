import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InstructorLogin from './pages/auth/InstructorLogin';
import InstructorRegister from './pages/auth/InstructorRegister';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <div className="app-container">
      {/* No navbar on auth pages */}
      {!isAuthPage && <Navbar />}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<InstructorLogin />} />
          <Route path="/auth/register" element={<InstructorRegister />} />
          
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

      {/* No footer on auth pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
