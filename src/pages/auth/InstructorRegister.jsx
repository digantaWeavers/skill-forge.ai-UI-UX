import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, CodeXml, Lock, User, Cpu } from 'lucide-react';

const InstructorRegister = () => {
  return (
    <div className="container py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="glass-card p-4 p-md-5 w-100 animate-fade-in" style={{ maxWidth: '600px' }}>
        <div className="text-center mb-5">
          <div className="bg-ai-gradient d-inline-flex p-3 rounded-4 mb-3">
            <Cpu size={32} color="white" />
          </div>
          <h2 className="fw-bold mb-2">Join the AI Revolution</h2>
          <p className="text-muted">Empower students with AI-driven learning paths</p>
        </div>

        <div className="row mb-4 g-3">
          <div className="col-md-6">
            <button className="btn btn-social">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="Google" width="20" />
              <span>Google</span>
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-social">
              <CodeXml size={20} />
              <span>GitHub</span>
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 mb-4">
          <hr className="flex-grow-1 border-secondary opacity-25" />
          <span className="text-muted small">OR SIGN UP WITH EMAIL</span>
          <hr className="flex-grow-1 border-secondary opacity-25" />
        </div>

        <form>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">FULL NAME</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-0 pe-0">
                  <User size={18} className="text-muted" />
                </span>
                <input 
                  type="text" 
                  className="form-control form-control-custom" 
                  placeholder="John Doe" 
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">WORK EMAIL</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-0 pe-0">
                  <Mail size={18} className="text-muted" />
                </span>
                <input 
                  type="email" 
                  className="form-control form-control-custom" 
                  placeholder="john@ai-academy.com" 
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">PASSWORD</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0 pe-0">
                <Lock size={18} className="text-muted" />
              </span>
              <input 
                type="password" 
                className="form-control form-control-custom" 
                placeholder="Minimum 8 characters" 
              />
            </div>
          </div>

          <div className="mb-4 form-check">
            <input type="checkbox" className="form-check-input bg-transparent border-secondary shadow-none" id="terms" />
            <label className="form-check-label text-muted small" htmlFor="terms">
              I agree to the <a href="#" className="text-ai-gradient text-decoration-none">Terms of Service</a> and <a href="#" className="text-ai-gradient text-decoration-none">Privacy Policy</a>.
            </label>
          </div>

          <button type="submit" className="btn btn-primary-custom w-100 py-3">
            Create Instructor Account
          </button>
        </form>

        <p className="text-center mt-5 text-muted mb-0">
          Already teaching with us? <Link to="/auth/login" className="text-ai-gradient fw-bold text-decoration-none">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default InstructorRegister;
