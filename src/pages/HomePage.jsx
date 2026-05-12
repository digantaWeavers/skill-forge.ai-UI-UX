import React from 'react';
import { Bot, Sparkles, Zap, Brain, ShieldCheck } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="container py-5 mt-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5 pb-5">
        <div className="col-lg-6 animate-fade-in">
          <div className="d-inline-flex align-items-center gap-2 bg-ai-gradient bg-opacity-10 text-ai-gradient px-3 py-2 rounded-pill fw-bold small mb-4">
            <Sparkles size={16} />
            <span>AI-POWERED LEARNING ECOSYSTEM</span>
          </div>
          <h1 className="display-3 fw-extra-bold mb-4">
            Master the Future with <span className="text-ai-gradient">Adaptive AI</span> Learning
          </h1>
          <p className="lead text-muted mb-5 fs-5">
            SkillForge.AI uses advanced neural algorithms to personalize your learning path.
            Real-time feedback, automated tutoring, and interactive AI labs.
          </p>
          <div className="d-flex gap-3">
            <button className="btn btn-primary-custom px-4 py-3">Explore AI Courses</button>
            <button className="btn btn-outline-secondary px-4 py-3 text-white border-secondary border-opacity-25 rounded-3">View Live Demo</button>
          </div>
        </div>
        <div className="col-lg-6 mt-5 mt-lg-0 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="position-relative">
            <div className="bg-ai-gradient position-absolute top-50 start-50 translate-middle rounded-circle filter-blur" style={{ width: '300px', height: '300px', opacity: '0.2', filter: 'blur(80px)' }}></div>
            <div className="glass-card p-4 mx-auto" style={{ maxWidth: '400px' }}>
              <Brain size={120} className="text-ai-gradient mb-4" />
              <h3 className="fw-bold">Neural Engine v2.0</h3>
              <p className="text-muted small">Analyzing your learning patterns in real-time...</p>
              <div className="progress bg-dark" style={{ height: '8px' }}>
                <div className="progress-bar bg-ai-gradient" style={{ width: '75%' }}></div>
              </div>
              <div className="d-flex justify-content-between mt-3 text-muted small">
                <span>Progress</span>
                <span>75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row g-4 mt-5">
        {[
          { icon: <Zap />, title: "Instant Feedback", desc: "Get AI-generated critiques on your code and projects instantly." },
          { icon: <Bot />, title: "24/7 AI Tutor", desc: "Our virtual assistants are always ready to solve your doubts." },
          { icon: <ShieldCheck />, title: "Certified Skills", desc: "Blockchain-verified certificates for every AI specialization." }
        ].map((feature, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="glass-card p-4 h-100 border-opacity-10 hover-lift transition-all">
              <div className="bg-ai-gradient d-inline-flex p-3 rounded-4 mb-4 text-white">
                {feature.icon}
              </div>
              <h4 className="fw-bold mb-3">{feature.title}</h4>
              <p className="text-muted mb-0">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
