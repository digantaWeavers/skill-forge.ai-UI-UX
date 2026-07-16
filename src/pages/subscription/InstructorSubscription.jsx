import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, Check, Zap, Users, BarChart3, BookOpen, Video,
  Shield, Sparkles, ArrowRight, Star, Infinity
} from 'lucide-react';
import './InstructorSubscription.css';
import { userService } from '../../api/services/userService';
import { authService } from '../../api/services/authService';
import { useAuthTokensFromUrl } from '../../hooks/useAuthTokensFromUrl';

const InstructorSubscription = () => {
  // const navigate = useNavigate();
  // const [isProcessing, setIsProcessing] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const planFeatures = [
    { icon: <BookOpen size={18} />, text: 'Unlimited Course Creation', highlight: true },
    { icon: <Video size={18} />, text: 'HD Video Uploads (up to 10GB)', highlight: false },
    { icon: <Users size={18} />, text: 'Unlimited Student Enrollment', highlight: true },
    { icon: <BarChart3 size={18} />, text: 'Advanced Analytics Dashboard', highlight: false },
    { icon: <Zap size={18} />, text: 'AI-Powered Course Recommendations', highlight: true },
    { icon: <Shield size={18} />, text: 'Priority Support & Dedicated Manager', highlight: false },
    { icon: <Sparkles size={18} />, text: 'AI Content Generation Tools', highlight: true },
    { icon: <Infinity size={18} />, text: 'Lifetime Platform Updates', highlight: false },
  ];

  // Improved token handling
  // useAuthTokensFromUrl(() => {
  //   verifyAuth();
  // });

  // const verifyAuth = async () => {
  //   const token = localStorage.getItem('accesstoken');
  //   if (!token) {
  //     navigate('/auth/login');
  //     return;
  //   }

  //   try {
  //     const response = await authService.getMe();
  //     if (response?.data) {
  //       localStorage.setItem('user', JSON.stringify(response.data));
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error('Auth verification failed:', error);
  //     localStorage.clear();
  //     navigate('/auth/login');
  //   }
  // };

  // // Initial check
  // useEffect(() => {
  //   verifyAuth();
  // }, []);

  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useAuthTokensFromUrl();

  // Strong verification with retry
  useEffect(() => {
    let retries = 0;
    const maxRetries = 8;

    const verifyTokens = async () => {
      const accessToken = localStorage.getItem('accesstoken');

      if (accessToken) {
        try {
          const res = await authService.getMe();
          if (res?.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
          }
          setIsVerifying(false);
          return;
        } catch (err) {
          console.error('Token verification failed', err);
        }
      }

      if (retries < maxRetries) {
        retries++;
        setTimeout(verifyTokens, 300); // retry every 300ms
      } else {
        setIsVerifying(false);
        navigate('/auth/login');
      }
    };

    verifyTokens();
  }, [navigate]);

  if (isVerifying) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} />
          <p>Securing your session...</p>
        </div>
      </div>
    );
  }

  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      const subscriptionData = {
        planId: 'plan_Sx7YPh6mZj0v5B',
      };

      const response = await userService.getSubcriptionLink(subscriptionData);
      if (response?.data) {
        window.location.href = response.data;
      }
    } catch (error) {
      console.error('Error creating subscription link:', error);
      alert('Failed to create subscription link. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Verifying your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-page">
      <div className="subscription-bg-orb subscription-bg-orb-1"></div>
      <div className="subscription-bg-orb subscription-bg-orb-2"></div>
      <div className="subscription-bg-orb subscription-bg-orb-3"></div>

      <div className="container py-5">
        <div className="text-center mb-5 animate-fade-in">
          <div className="subscription-badge mx-auto mb-3">
            <Sparkles size={14} />
            <span>EXCLUSIVE INSTRUCTOR PLAN</span>
          </div>
          <h1 className="subscription-title">
            Unlock Your Full <span className="text-ai-gradient">Teaching Potential</span>
          </h1>
          <p className="subscription-subtitle">
            Get everything you need to create, manage, and grow your online courses.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="subscription-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="subscription-popular-tag">
                <Star size={14} />
                <span>BEST VALUE</span>
              </div>

              <div className="subscription-card-header">
                <div className="subscription-plan-icon">
                  <Crown size={28} color="white" />
                </div>
                <h2 className="subscription-plan-name">Instructor Pro</h2>
                <p className="subscription-plan-desc">
                  Everything you need to build a thriving teaching business
                </p>
              </div>

              <div className="subscription-price-section">
                <div className="subscription-price-wrapper">
                  <span className="subscription-currency">$</span>
                  <span className="subscription-amount">49</span>
                  <div className="subscription-period">
                    <span className="subscription-per">/month</span>
                    <span className="subscription-billed">billed annually</span>
                  </div>
                </div>
                <div className="subscription-savings">
                  <Zap size={14} />
                  <span>Save $180/year vs monthly</span>
                </div>
              </div>

              <div className="subscription-divider"></div>

              <div className="subscription-features">
                <h6 className="subscription-features-title">Everything included:</h6>
                <ul className="subscription-features-list">
                  {planFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className={`subscription-feature-item ${feature.highlight ? 'highlight' : ''}`}
                      style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                    >
                      <span className="subscription-feature-check">
                        <Check size={14} />
                      </span>
                      <span className="subscription-feature-icon">{feature.icon}</span>
                      <span className="subscription-feature-text">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="subscription-cta-btn"
                onClick={handleSubscribe}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="subscription-processing">
                    <span className="subscription-spinner"></span>
                    Processing...
                  </span>
                ) : (
                  <>
                    <span>Start Teaching Today</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="subscription-guarantee">
                <Shield size={16} />
                <span>30-day money-back guarantee · Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSubscription;