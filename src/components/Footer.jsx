import React from 'react';
import { Cpu, Send, Briefcase, CodeXml } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-5 pt-5 pb-4 border-top border-secondary border-opacity-10">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-4">
              <div className="bg-ai-gradient p-2 rounded-3">
                <Cpu size={20} color="white" />
              </div>
              <span className="fw-bold fs-5 text-white">SkillForge<span className="text-ai-gradient">.AI</span></span>
            </div>
            <p className="text-muted small pe-lg-5">
              Redefining education through neural networks and personalized AI intelligence. Join the community of future-ready creators.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-muted hover-primary"><Send size={20} /></a>
              <a href="#" className="text-muted hover-primary"><Briefcase size={20} /></a>
              <a href="#" className="text-muted hover-primary"><CodeXml size={20} /></a>
            </div>
          </div>
          <div className="col-sm-6 col-lg-2 offset-lg-2">
            <h6 className="fw-bold mb-4">Platform</h6>
            <ul className="list-unstyled text-muted small d-grid gap-2">
              <li><a href="#" className="text-decoration-none text-reset">Courses</a></li>
              <li><a href="#" className="text-decoration-none text-reset">AI Lab</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Certificates</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Pricing</a></li>
            </ul>
          </div>
          <div className="col-sm-6 col-lg-2">
            <h6 className="fw-bold mb-4">Instructor</h6>
            <ul className="list-unstyled text-muted small d-grid gap-2">
              <li><a href="#" className="text-decoration-none text-reset">Teaching Center</a></li>
              <li><a href="#" className="text-decoration-none text-reset">AI Tools</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Guidelines</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Support</a></li>
            </ul>
          </div>
          <div className="col-lg-2">
            <h6 className="fw-bold mb-4">Legal</h6>
            <ul className="list-unstyled text-muted small d-grid gap-2">
              <li><a href="#" className="text-decoration-none text-reset">Privacy Policy</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Terms of Service</a></li>
              <li><a href="#" className="text-decoration-none text-reset">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-5 pt-4 border-top border-secondary border-opacity-10 text-center">
          <p className="text-muted small mb-0">&copy; 2026 SkillForge.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
