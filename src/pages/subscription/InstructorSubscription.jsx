import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown,
  Check,
  Zap,
  Users,
  BarChart3,
  BookOpen,
  Video,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  Infinity
} from 'lucide-react';
import './InstructorSubscription.css';

const InstructorSubscription = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleSubscribe = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // alert('Subscription activated successfully!');
      navigate('/onboarding');
    }, 2000);
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="subscription-page">
      {/* Animated background orbs */}
      <div className="subscription-bg-orb subscription-bg-orb-1"></div>
      <div className="subscription-bg-orb subscription-bg-orb-2"></div>
      <div className="subscription-bg-orb subscription-bg-orb-3"></div>

      <div className="container py-5">
        {/* Header Section */}
        <div className="text-center mb-5 animate-fade-in">
          <div className="subscription-badge mx-auto mb-3">
            <Sparkles size={14} />
            <span>EXCLUSIVE INSTRUCTOR PLAN</span>
          </div>
          <h1 className="subscription-title">
            Unlock Your Full
            <span className="text-ai-gradient"> Teaching Potential</span>
          </h1>
          <p className="subscription-subtitle">
            Get everything you need to create, manage, and grow your online courses
            with our all-in-one instructor plan.
          </p>
        </div>

        {/* Plan Card */}
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="subscription-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Popular tag */}
              <div className="subscription-popular-tag">
                <Star size={14} />
                <span>BEST VALUE</span>
              </div>

              {/* Card Header */}
              <div className="subscription-card-header">
                <div className="subscription-plan-icon">
                  <Crown size={28} color="white" />
                </div>
                <h2 className="subscription-plan-name">Instructor Pro</h2>
                <p className="subscription-plan-desc">
                  Everything you need to build a thriving teaching business
                </p>
              </div>

              {/* Price */}
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

              {/* Divider */}
              <div className="subscription-divider"></div>

              {/* Features */}
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

              {/* CTA Button */}
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

              {/* Guarantee */}
              <div className="subscription-guarantee">
                <Shield size={16} />
                <span>30-day money-back guarantee · Cancel anytime</span>
              </div>
            </div>

            {/* Skip link */}
            <div className="text-center mt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <button
                className="subscription-skip-btn"
                onClick={handleSkip}
              >
                Skip for now, I'll explore the free tier
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSubscription;
