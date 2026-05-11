import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, User, LogIn } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg glass-card mx-3 my-3 px-4 py-2 sticky-top border-0">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="bg-ai-gradient p-2 rounded-3 d-flex align-items-center justify-content-center">
            <Cpu size={24} color="white" />
          </div>
          <span className="fw-bold fs-4 text-white">SkillForge<span className="text-ai-gradient">.AI</span></span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-lg-4">
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/ai-lab">AI Lab</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/community">Community</Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Link to="/auth/login" className="nav-link nav-link-custom d-flex align-items-center gap-2">
              <User size={18} />
              <span>Instructor Portal</span>
            </Link>
            <button 
              className="btn btn-primary-custom d-flex align-items-center gap-2"
              onClick={() => navigate('/auth/register')}
            >
              <LogIn size={18} />
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
