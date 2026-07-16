import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Cpu, Eye, EyeOff } from 'lucide-react';
import { authService } from '../../api/services/authService';

const InstructorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        email: email,
        password: password
      };

      const loginres = await authService.login(payload);
      if (loginres) {
        localStorage.setItem('accesstoken', loginres.accessToken);
        localStorage.setItem('refreshtoken', loginres.refreshToken);
        localStorage.setItem('user', JSON.stringify(loginres.user));

        if (loginres.user.isSubscribed == false) {
          navigate('/subscription/instructor');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setErrorMessage(error.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    // In a real application, you would authenticate here.
    // For this mockup, we just redirect to the dashboard.
    // navigate('/dashboard');
    // setIsSubmitting(false);
  };

  return (
    <div className="container py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="glass-card p-4 p-md-5 w-100 animate-fade-in" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-5">
          <div className="bg-ai-gradient d-inline-flex p-3 rounded-4 mb-3">
            <a href="/">
              <Cpu size={32} color="white" />
            </a>
          </div>
          <h2 className="fw-bold mb-2">Welcome Back, Instructor</h2>
          <p className="text-muted">Sign in to manage your AI-powered curriculum</p>
        </div>

        <div className="mb-4">
          <button className="btn btn-social mb-3" onClick={() => navigate('/dashboard')}>
            <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width="20" />
            <span>Continue with Google</span>
          </button>
          <button className="btn btn-social" onClick={() => navigate('/dashboard')}>
            <img src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000" alt="GitHub" width="20" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="d-flex align-items-center gap-3 mb-4">
          <hr className="flex-grow-1 border-secondary opacity-25" />
          <span className="text-muted small">OR EMAIL</span>
          <hr className="flex-grow-1 border-secondary opacity-25" />
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="form-label small fw-bold">WORK EMAIL</label>
            <div className="input-group-custom">
              <span className="input-group-text">
                <Mail size={18} />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between">
              <label className="form-label small fw-bold">PASSWORD</label>
              <a href="#" className="text-ai-gradient small text-decoration-none fw-bold">Forgot?</a>
            </div>
            <div className="input-group-custom">
              <span className="input-group-text">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          <button type="submit" className="btn btn-primary-custom w-100 py-3 mt-2">
            Sign In to Dashboard
          </button>
        </form>

        <div className="text-center mt-3 text-muted mb-0">
          <p className="mb-2">Don't have an account?</p>
          <div className="d-flex flex-column gap-2">
            <Link to="/auth/register?role=instructor" className="text-ai-gradient fw-bold text-decoration-none">
              Create Instructor Account
            </Link>
            <Link to="/auth/register?role=user" className="text-ai-gradient fw-bold text-decoration-none">
              Create Student Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;
