import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Cpu, Phone, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';

const InstructorRegister = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role') || 'user'; // Default to user if not specified

  const [step, setStep] = useState(1); // 1: Register, 2: Verify
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    terms: false,
    role: roleFromUrl
  });

  // Update role if URL parameter changes
  useEffect(() => {
    if (roleFromUrl) {
      setFormData(prev => ({ ...prev, role: roleFromUrl }));
    }
  }, [roleFromUrl]);

  const [verificationData, setVerificationData] = useState({
    emailCode: '',
    phoneCode: ''
  });

  // Auto-generate username when fullName or email changes
  useEffect(() => {
    if (formData.fullName && formData.email) {
      const namePart = formData.fullName.toLowerCase().replace(/\s+/g, '');
      const emailPart = formData.email.split('@')[0].toLowerCase();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedUsername = `${namePart}_${randomSuffix}`;
      setFormData(prev => ({ ...prev, username: generatedUsername }));
    }
  }, [formData.fullName, formData.email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVerificationChange = (e) => {
    const { name, value } = e.target;
    setVerificationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.username.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      formData.password === formData.confirmPassword &&
      formData.terms
    );
  };

  const isVerificationValid = () => {
    return verificationData.emailCode.length === 6 && verificationData.phoneCode.length === 6;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Registering as:', formData.role); // Just for debugging
      setStep(2);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (isVerificationValid()) {
      // Logic for verification would go here
      alert(`Registration Successful as ${formData.role}!`);
      // Redirect instructors to subscription page, others to dashboard
      if (formData.role === 'instructor') {
        navigate('/subscription/instructor');
      } else {
        navigate('/dashboard');
      }
    }
  };

  if (step === 2) {
    return (
      <div className="container py-5 min-vh-100 d-flex align-items-center justify-content-center">
        <div className="glass-card p-4 p-md-5 w-100 animate-fade-in" style={{ maxWidth: '600px' }}>
          <button
            className="btn btn-link text-muted p-0 mb-4 text-decoration-none d-flex align-items-center gap-2"
            onClick={() => setStep(1)}
          >
            <ArrowLeft size={18} /> Back to Registration
          </button>

          <div className="text-center mb-5">
            <div className="bg-ai-gradient d-inline-flex p-3 rounded-4 mb-3">
              <ShieldCheck size={32} color="white" />
            </div>
            <h2 className="fw-bold mb-2">Verify Your Account</h2>
            <p className="text-muted">We've sent verification codes to your email and phone</p>
          </div>

          <form onSubmit={handleVerify}>
            <div className="mb-4">
              <label className="form-label small fw-bold">EMAIL VERIFICATION CODE</label>
              <div className="input-group-custom">
                <span className="input-group-text">
                  <Mail size={18} />
                </span>
                <input
                  type="text"
                  name="emailCode"
                  className="form-control"
                  placeholder="6-digit code"
                  maxLength="6"
                  value={verificationData.emailCode}
                  onChange={handleVerificationChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold">PHONE VERIFICATION CODE</label>
              <div className="input-group-custom">
                <span className="input-group-text">
                  <Phone size={18} />
                </span>
                <input
                  type="text"
                  name="phoneCode"
                  className="form-control"
                  placeholder="6-digit code"
                  maxLength="6"
                  value={verificationData.phoneCode}
                  onChange={handleVerificationChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary-custom w-100 py-3 mt-2"
              disabled={!isVerificationValid()}
            >
              Verify & Complete Setup
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="glass-card p-4 p-md-5 w-100 animate-fade-in" style={{ maxWidth: '600px' }}>
        <div className="text-center mb-5">
          <div className="bg-ai-gradient d-inline-flex p-3 rounded-4 mb-3">
            <a href="/">
              <Cpu size={32} color="white" />
            </a>
          </div>
          <h2 className="fw-bold mb-2">Join the AI Revolution</h2>
          <p className="text-muted">Empower {formData.role === 'instructor' ? 'students' : 'your learning'} with AI-driven paths</p>
          <div className="badge bg-secondary text-capitalize mt-2">{formData.role} Account</div>
        </div>

        <div className="row mb-4 g-3">
          <div className="col-md-6">
            <button className="btn btn-social">
              <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width="20" />
              <span>Google</span>
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-social">
              <img src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000" alt="GitHub" width="20" />
              <span>GitHub</span>
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 mb-4">
          <hr className="flex-grow-1 border-secondary opacity-25" />
          <span className="text-muted small">OR SIGN UP WITH EMAIL</span>
          <hr className="flex-grow-1 border-secondary opacity-25" />
        </div>

        <form onSubmit={handleRegister}>
          {/* Hidden Role Field */}
          <input type="hidden" name="role" value={formData.role} />

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">FULL NAME</label>
              <div className="input-group-custom">
                <span className="input-group-text">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">WORK EMAIL</label>
              <div className="input-group-custom">
                <span className="input-group-text">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="john@ai-academy.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">USERNAME</label>
              <div className="input-group-custom">
                <span className="input-group-text">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="generated_user"
                  value={formData.username}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">PHONE NUMBER</label>
              <div className="input-group-custom">
                <span className="input-group-text">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">PASSWORD</label>
              <div className="input-group-custom">
                <span className="input-group-text">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn border-0 text-muted pe-3 shadow-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">CONFIRM PASSWORD</label>
              <div className="input-group-custom">
                <span className="input-group-text">
                  <Lock size={18} />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn border-0 text-muted pe-3 shadow-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4 form-check">
            <input
              type="checkbox"
              name="terms"
              className="form-check-input bg-transparent border-secondary shadow-none"
              id="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label className="form-check-label text-muted small" htmlFor="terms">
              I agree to the <a href="#" className="text-ai-gradient text-decoration-none">Terms of Service</a> and <a href="#" className="text-ai-gradient text-decoration-none">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary-custom w-100 py-3"
            disabled={!isFormValid()}
          >
            Create {formData.role === 'instructor' ? 'Instructor' : 'Student'} Account
          </button>
        </form>

        <p className="text-center mt-3 text-muted mb-0">
          Already have an account? <Link to="/auth/login" className="text-ai-gradient fw-bold text-decoration-none">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default InstructorRegister;

