import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, MapPin, Building2, Hash, FileText, Camera,
  ArrowRight, Globe, Sparkles, CheckCircle2
} from 'lucide-react';
import './InstructorBasicDetails.css';
import { userService } from '../../api/services/userService';
import { authService } from '../../api/services/authService';
import { useAuthTokensFromUrl } from '../../hooks/useAuthTokensFromUrl';

const InstructorBasicDetails = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    city: '',
    state: '',
    pincode: '',
    country: '',
    bio: '',
    website: '',
    headline: '',
    profileImage: null
  });

  const [errors, setErrors] = useState({});

  // Token handling
  useAuthTokensFromUrl(() => {
    verifyAuth();
  });

  const verifyAuth = async () => {
    const token = localStorage.getItem('accesstoken');
    if (!token) {
      navigate('/auth/login');
      return;
    }

    try {
      const response = await authService.getMe();
      if (response?.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      localStorage.clear();
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, profileImage: 'Image must be under 5MB' }));
      return;
    }
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, profileImage: 'Please upload a valid image file' }));
      return;
    }

    setErrors(prev => ({ ...prev, profileImage: '' }));

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfilePreview(base64String);
      setFormData(prev => ({ ...prev, profileImage: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const validate = () => {
    const newErrors = {};
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{4,10}$/.test(formData.pincode.trim())) newErrors.pincode = 'Enter a valid pincode';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    else if (formData.bio.trim().length < 20) newErrors.bio = 'Bio must be at least 20 characters';
    if (!profilePreview) newErrors.profileImage = 'Profile picture is required';

    return newErrors;
  };

  const isFormValid = () => {
    return formData.city.trim() &&
      formData.state.trim() &&
      formData.pincode.trim() &&
      formData.bio.trim().length >= 20 &&
      profilePreview;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        profilePicture: formData.profileImage,
        bio: formData.bio,
        headline: formData.headline,
        address: {
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country || 'India'
        },
        website: formData.website
      };

      await userService.updateProfile(payload);

      // Update local user
      const localUser = JSON.parse(localStorage.getItem('user') || '{}');
      Object.assign(localUser, {
        bio: formData.bio,
        headline: formData.headline,
        profilePicture: formData.profileImage,
        address: payload.address
      });
      localStorage.setItem('user', JSON.stringify(localUser));

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setErrors({ submit: error.message || 'Failed to update profile' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const bioCharCount = formData.bio.length;
  const bioMaxChars = 500;

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-bg-orb onboarding-bg-orb-1"></div>
      <div className="onboarding-bg-orb onboarding-bg-orb-2"></div>

      <div className="container py-5">
        <div className="text-center mb-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="onboarding-badge mx-auto mb-3">
            <Sparkles size={14} />
            <span>FINAL STEP</span>
          </div>
          <h1 className="onboarding-title">
            Complete Your <span className="text-ai-gradient">Instructor Profile</span>
          </h1>
          <p className="onboarding-subtitle">
            Tell us a bit more about yourself so students can discover and connect with you.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="onboarding-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleSubmit}>
                {/* Profile Picture */}
                <div className="onboarding-avatar-section">
                  <div
                    className={`onboarding-avatar-upload ${errors.profileImage ? 'has-error' : ''}`}
                    onClick={handleImageClick}
                  >
                    {profilePreview ? (
                      <img src={profilePreview} alt="Profile" className="onboarding-avatar-img" />
                    ) : (
                      <div className="onboarding-avatar-placeholder">
                        <Camera size={28} />
                        <span>Upload Photo</span>
                      </div>
                    )}
                    <div className="onboarding-avatar-overlay">
                      <Camera size={20} />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                  {errors.profileImage && <p className="onboarding-error-text">{errors.profileImage}</p>}
                  <p className="onboarding-avatar-hint">JPG, PNG or WebP · Max 5MB</p>
                </div>

                {/* Headline */}
                <div className="mb-4">
                  <label className="form-label small fw-bold">PROFESSIONAL HEADLINE</label>
                  <div className="input-group-custom">
                    <span className="input-group-text"><User size={18} /></span>
                    <input
                      type="text"
                      name="headline"
                      className="form-control"
                      placeholder="e.g. Senior ML Engineer | AI Instructor"
                      value={formData.headline}
                      onChange={handleChange}
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* City & State */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">CITY <span className="text-danger">*</span></label>
                    <div className={`input-group-custom ${errors.city ? 'has-error' : ''}`}>
                      <span className="input-group-text"><Building2 size={18} /></span>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="e.g. San Francisco"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.city && <p className="onboarding-error-text">{errors.city}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">STATE <span className="text-danger">*</span></label>
                    <div className={`input-group-custom ${errors.state ? 'has-error' : ''}`}>
                      <span className="input-group-text"><MapPin size={18} /></span>
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        placeholder="e.g. California"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.state && <p className="onboarding-error-text">{errors.state}</p>}
                  </div>
                </div>

                {/* Pincode & Country */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">PINCODE / ZIP <span className="text-danger">*</span></label>
                    <div className={`input-group-custom ${errors.pincode ? 'has-error' : ''}`}>
                      <span className="input-group-text"><Hash size={18} /></span>
                      <input
                        type="text"
                        name="pincode"
                        className="form-control"
                        placeholder="e.g. 94102"
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={10}
                      />
                    </div>
                    {errors.pincode && <p className="onboarding-error-text">{errors.pincode}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">COUNTRY</label>
                    <div className="input-group-custom">
                      <span className="input-group-text"><Globe size={18} /></span>
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        placeholder="e.g. United States"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Website */}
                <div className="mb-4">
                  <label className="form-label small fw-bold">WEBSITE / PORTFOLIO</label>
                  <div className="input-group-custom">
                    <span className="input-group-text"><Globe size={18} /></span>
                    <input
                      type="url"
                      name="website"
                      className="form-control"
                      placeholder="https://your-portfolio.com"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  <label className="form-label small fw-bold">BIO <span className="text-danger">*</span></label>
                  <div className={`onboarding-textarea-wrap ${errors.bio ? 'has-error' : ''}`}>
                    <FileText size={18} className="onboarding-textarea-icon" />
                    <textarea
                      name="bio"
                      className="form-control"
                      rows={4}
                      placeholder="Tell students about your expertise, teaching style..."
                      value={formData.bio}
                      onChange={handleChange}
                      maxLength={bioMaxChars}
                    />
                  </div>
                  <div className="onboarding-bio-meta">
                    {errors.bio && <p className="onboarding-error-text mb-0">{errors.bio}</p>}
                    <span className={`onboarding-char-count ${bioCharCount >= bioMaxChars ? 'limit' : ''}`}>
                      {bioCharCount}/{bioMaxChars}
                    </span>
                  </div>
                </div>

                {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}

                <button
                  type="submit"
                  className="btn btn-primary-custom w-100 py-3 onboarding-submit-btn"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span className="onboarding-spinner"></span>
                      Saving Profile...
                    </span>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      Complete Setup & Go to Dashboard
                      <ArrowRight size={18} />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorBasicDetails;