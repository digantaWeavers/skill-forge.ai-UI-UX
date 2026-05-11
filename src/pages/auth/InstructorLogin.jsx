import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, CodeXml, Lock, Cpu } from 'lucide-react';

const InstructorLogin = () => {
  return (
    <div className="container py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="glass-card p-4 p-md-5 w-100 animate-fade-in" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-5">
          <div className="bg-ai-gradient d-inline-flex p-3 rounded-4 mb-3">
            <Cpu size={32} color="white" />
          </div>
          <h2 className="fw-bold mb-2">Welcome Back, Instructor</h2>
          <p className="text-muted">Sign in to manage your AI-powered curriculum</p>
        </div>

        <div className="mb-4">
          <button className="btn btn-social mb-3">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="Google" width="20" />
            <span>Continue with Google</span>
          </button>
          <button className="btn btn-social">
            <CodeXml size={20} />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="d-flex align-items-center gap-3 mb-4">
          <hr className="flex-grow-1 border-secondary opacity-25" />
          <span className="text-muted small">OR EMAIL</span>
          <hr className="flex-grow-1 border-secondary opacity-25" />
        </div>

        <form>
          <div className="mb-4">
            <label className="form-label small fw-bold">WORK EMAIL</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0 pe-0">
                <Mail size={18} className="text-muted" />
              </span>
              <input 
                type="email" 
                className="form-control form-control-custom" 
                placeholder="name@company.com" 
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between">
              <label className="form-label small fw-bold">PASSWORD</label>
              <a href="#" className="text-ai-gradient small text-decoration-none fw-bold">Forgot?</a>
            </div>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0 pe-0">
                <Lock size={18} className="text-muted" />
              </span>
              <input 
                type="password" 
                className="form-control form-control-custom" 
                placeholder="Enter password" 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary-custom w-100 py-3 mt-2">
            Sign In to Dashboard
          </button>
        </form>

        <p className="text-center mt-5 text-muted mb-0">
          Don't have an account? <Link to="/auth/register" className="text-ai-gradient fw-bold text-decoration-none">Create Instructor Account</Link>
        </p>
      </div>
    </div>
  );
};

export default InstructorLogin;
