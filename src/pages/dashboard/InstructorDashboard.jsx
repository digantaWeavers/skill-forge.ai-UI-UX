import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  DollarSign,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Check,
  AlertCircle,
  BookOpenCheck,
  CreditCard,
  User,
  Sliders,
  Sparkles,
  Eye,
  List,
  Grid,
  ArrowLeft,
  Play,
  Film,
  Calendar,
  Clock,
  Upload,
  ImagePlus,
  Link2
} from 'lucide-react';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const navigate = useNavigate();

  // UI State
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [classSearchQuery, setClassSearchQuery] = useState('');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [classCategoryFilter, setClassCategoryFilter] = useState('All');
  const [classPage, setClassPage] = useState(1);
  const classesPerPage = 8;
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setClassSearchQuery('');
    setStudentSearchQuery('');
    setSelectedCourseId(null);
    setClassPage(1);
  };

  // Modals state
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // null when adding new course
  const [seasonModalOpen, setSeasonModalOpen] = useState(false); // Add Season popup
  const [editingSeasonId, setEditingSeasonId] = useState(null); // ID of the season being edited

  // Class details state
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Change Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Overview checklist state
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review and grade Advanced Python neural network submissions', completed: true },
    { id: 2, text: 'Schedule live Q&A office hours for Next.js 15 students', completed: false },
    { id: 3, text: 'Update machine learning dataset links in curriculum repository', completed: false },
    { id: 4, text: 'Upload part-wise videos for AI-Driven UX/UI Design Essentials', completed: false }
  ]);

  // Mock Data States
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Advanced Python & Neural Networks',
      category: 'AI & Data Science',
      price: 99.00,
      students: 452,
      rating: 4.9,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=400&q=80',
      publishDate: '2026-06-01',
      publishTime: '14:30'
    },
    {
      id: 2,
      title: 'Introduction to Machine Learning v3',
      category: 'Machine Learning',
      price: 79.00,
      students: 310,
      rating: 4.8,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=400&q=80',
      publishDate: '2026-05-18',
      publishTime: '09:15'
    },
    {
      id: 3,
      title: 'AI-Driven UX/UI Design Essentials',
      category: 'UI/UX Design',
      price: 59.00,
      students: 284,
      rating: 4.7,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80',
      publishDate: '2026-05-24',
      publishTime: '11:00'
    },
    {
      id: 4,
      title: 'Next.js 15 & OpenAI Integration',
      category: 'Web Development',
      price: 129.00,
      students: 202,
      rating: 4.9,
      status: 'Draft',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
      publishDate: '2026-06-04',
      publishTime: '16:00'
    }
  ]);

  // Seasons / Video parts state structured course-wise
  const [courseSyllabus, setCourseSyllabus] = useState({
    1: [
      {
        id: 101,
        name: 'Season 1: Deep Learning Foundations',
        videos: [
          { id: 1001, title: 'Introduction to Artificial Neurons', duration: '12:45' },
          { id: 1002, title: 'PyTorch Tensor Operations', duration: '18:20' },
          { id: 1003, title: 'Gradient Descent & Backpropagation', duration: '22:15' }
        ]
      },
      {
        id: 102,
        name: 'Season 2: Advanced Convolutional Networks',
        videos: [
          { id: 1004, title: 'Understanding Convolution Filters', duration: '15:10' },
          { id: 1005, title: 'Building a ResNet block from scratch', duration: '29:40' }
        ]
      }
    ],
    2: [
      {
        id: 201,
        name: 'Season 1: Supervised Learning Core',
        videos: [
          { id: 2001, title: 'Linear Regression and Cost Functions', duration: '14:20' },
          { id: 2002, title: 'Logistic Regression Decision Boundaries', duration: '18:05' }
        ]
      }
    ],
    3: [
      {
        id: 301,
        name: 'Season 1: AI Prompting for Prototypes',
        videos: [
          { id: 3001, title: 'Midjourney Prompt Engineering for UI', duration: '11:30' },
          { id: 3002, title: 'Figma AI Plugins & Automated Wireframes', duration: '16:50' }
        ]
      }
    ],
    4: [
      {
        id: 401,
        name: 'Season 1: Next.js 15 Server Components & OpenAI API',
        videos: [
          { id: 4001, title: 'Setting up OpenAI API Keys and Clients', duration: '09:15' },
          { id: 4002, title: 'Streaming Chat Completions with React Suspense', duration: '24:10' }
        ]
      }
    ]
  });

  const [newSeasonName, setNewSeasonName] = useState('');
  const [videoTitleForm, setVideoTitleForm] = useState('');
  const [videoFileData, setVideoFileData] = useState(null); // { name, duration, objectUrl }
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedSeasonIdForVideo, setSelectedSeasonIdForVideo] = useState(null);
  const [videoDescForm, setVideoDescForm] = useState('');
  const [videoUrlForm, setVideoUrlForm] = useState('');
  const [videoSourceType, setVideoSourceType] = useState('file'); // 'file' | 'url'
  const [collapsedSeasons, setCollapsedSeasons] = useState({}); // seasonId -> bool

  // Refs for file inputs
  const imageFileRef = useRef(null);
  const videoFileRef = useRef(null);

  const [students, setStudents] = useState([
    { id: 101, name: 'Alice Vance', email: 'alice.v@gmail.com', courseId: 1, courseTitle: 'Advanced Python & Neural Networks', date: '2026-06-01', progress: 85, status: 'Active' },
    { id: 102, name: 'Brandon Cole', email: 'brandon@outlook.com', courseId: 1, courseTitle: 'Advanced Python & Neural Networks', date: '2026-05-28', progress: 100, status: 'Completed' },
    { id: 103, name: 'Clara Oswald', email: 'clara.o@yahoo.com', courseId: 2, courseTitle: 'Introduction to Machine Learning v3', date: '2026-06-03', progress: 42, status: 'Active' },
    { id: 104, name: 'Daniel Craig', email: 'daniel@bond.uk', courseId: 3, courseTitle: 'AI-Driven UX/UI Design Essentials', date: '2026-05-15', progress: 95, status: 'Active' },
    { id: 105, name: 'Emma Watson', email: 'emma@granger.com', courseId: 1, courseTitle: 'Advanced Python & Neural Networks', date: '2026-06-02', progress: 12, status: 'Active' },
    { id: 106, name: 'Felix Kjell', email: 'pewds@youtube.com', courseId: 4, courseTitle: 'Next.js 15 & OpenAI Integration', date: '2026-06-04', progress: 5, status: 'Active' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Felix Kjell enrolled in Next.js 15 & OpenAI Integration', time: '1 hour ago', read: false },
    { id: 2, text: 'Clara Oswald purchased Introduction to Machine Learning v3', time: '4 hours ago', read: false },
    { id: 3, text: 'Platform update: New server features are live', time: '1 day ago', read: true }
  ]);

  const [toasts, setToasts] = useState([]);

  // Profile fields state
  const [profileData, setProfileData] = useState({
    name: 'Dr. Evelyn Carter',
    title: 'Senior AI Research Scientist & Lead Instructor',
    email: 'evelyn.carter@skillforge.ai',
    bio: 'Evelyn Carter is an AI practitioner with over 10 years of experience teaching neural networks, deep learning, and adaptive tech architectures.',
    payoutMethod: 'Stripe Connect (evelyn.c***@gmail.com)',
    subscriptionPlan: 'Instructor Pro Plan',
    renewalDate: 'Dec 12, 2026'
  });

  // Course Form State (for adding/editing)
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: 'AI & Data Science',
    regularPrice: '',
    salePrice: '',
    status: 'Active',
    image: '',        // URL string (for existing courses)
    imagePreview: '', // local blob URL for newly uploaded image
    publishDate: '',
    publishTime: ''
  });

  // Ref for click outside dropdowns
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show Toast helper
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Toggle tasks completion
  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  // Notification read toggle
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    triggerToast('All notifications marked as read', 'success');
  };

  // Cover image: local file -> object URL
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setCourseForm(prev => ({ ...prev, imagePreview: objectUrl, image: '' }));
  };

  const processVideoFile = (file) => {
    if (!file || !file.type.startsWith('video/')) {
      triggerToast('Please choose a valid video file', 'danger');
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const secs = Math.floor(video.duration);
      const m = String(Math.floor(secs / 60)).padStart(2, '0');
      const s = String(secs % 60).padStart(2, '0');
      setVideoFileData({ name: file.name, duration: `${m}:${s}`, objectUrl });
      setVideoSourceType('file');
      setVideoUrlForm('');
      URL.revokeObjectURL(objectUrl);
    };
    video.src = objectUrl;
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) processVideoFile(file);
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) processVideoFile(file);
  };

  const handleVideoDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const openVideoModal = (seasonId = null) => {
    setSelectedSeasonIdForVideo(seasonId);
    setVideoTitleForm('');
    setVideoDescForm('');
    setVideoUrlForm('');
    setVideoFileData(null);
    setVideoSourceType('file');
    if (videoFileRef.current) videoFileRef.current.value = '';
    setVideoModalOpen(true);
    if (seasonId) {
      setCollapsedSeasons(prev => ({ ...prev, [seasonId]: false }));
    }
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setSelectedSeasonIdForVideo(null);
    setVideoTitleForm('');
    setVideoDescForm('');
    setVideoUrlForm('');
    setVideoFileData(null);
    setVideoSourceType('file');
    if (videoFileRef.current) videoFileRef.current.value = '';
  };

  // Add Course / Edit Course Submit
  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (!courseForm.title.trim() || !courseForm.regularPrice) {
      triggerToast('Please fill out all required fields', 'danger');
      return;
    }

    const priceNum = parseFloat(courseForm.regularPrice);
    const salePriceNum = courseForm.salePrice ? parseFloat(courseForm.salePrice) : null;
    // prefer locally uploaded image preview; fall back to URL; fall back to default
    const imageUrl = courseForm.imagePreview || courseForm.image.trim() || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80';
    const finalDate = courseForm.publishDate.trim() || new Date().toISOString().split('T')[0];
    const finalTime = courseForm.publishTime.trim() || new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);

    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? {
        ...c,
        title: courseForm.title,
        description: courseForm.description,
        category: courseForm.category,
        price: priceNum,
        salePrice: salePriceNum,
        status: courseForm.status,
        image: imageUrl,
        publishDate: finalDate,
        publishTime: finalTime
      } : c));
      setStudents(prev => prev.map(s => s.courseId === editingCourse.id ? { ...s, courseTitle: courseForm.title } : s));
      triggerToast('Course updated successfully!', 'success');
    } else {
      const newCourseId = Date.now();
      const newCourse = {
        id: newCourseId,
        title: courseForm.title,
        description: courseForm.description,
        category: courseForm.category,
        price: priceNum,
        salePrice: salePriceNum,
        students: 0,
        rating: 5.0,
        status: courseForm.status,
        image: imageUrl,
        publishDate: finalDate,
        publishTime: finalTime
      };
      setCourses(prev => [newCourse, ...prev]);
      setCourseSyllabus(prev => ({ ...prev, [newCourseId]: [] }));
      setNotifications(prev => [
        { id: Date.now(), text: `New course created: "${courseForm.title}"`, time: 'Just now', read: false },
        ...prev
      ]);
      triggerToast('New course created successfully!', 'success');
    }

    setCourseModalOpen(false);
    setEditingCourse(null);
    setCourseForm({ title: '', description: '', category: 'AI & Data Science', regularPrice: '', salePrice: '', status: 'Active', image: '', imagePreview: '', publishDate: '', publishTime: '' });
    if (imageFileRef.current) imageFileRef.current.value = '';
  };

  // Open Edit Modal
  const openEditModal = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description || '',
      category: course.category,
      regularPrice: course.price.toString(),
      salePrice: course.salePrice ? course.salePrice.toString() : '',
      status: course.status,
      image: course.image,
      imagePreview: '', // no new image selected yet
      publishDate: course.publishDate || '',
      publishTime: course.publishTime || ''
    });
    if (imageFileRef.current) imageFileRef.current.value = '';
    setCourseModalOpen(true);
  };

  // Delete Course
  const handleDeleteCourse = (courseId, courseTitle) => {
    if (window.confirm(`Are you sure you want to delete "${courseTitle}"? This will also remove associated student logs.`)) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
      setStudents(prev => prev.filter(s => s.courseId !== courseId));
      triggerToast(`"${courseTitle}" has been deleted`, 'danger');
      if (selectedCourseId === courseId) {
        setSelectedCourseId(null);
        setActiveTab('classes');
      }
    }
  };

  // Change Password submission
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      triggerToast('Please fill out all fields', 'danger');
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerToast('New password and confirm password do not match', 'danger');
      return;
    }

    // Simulate updating password
    triggerToast('Password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setChangePasswordModalOpen(false);
  };

  // Seasons curriculum logic
  const handleAddSeason = (courseId) => {
    if (!newSeasonName.trim()) {
      triggerToast('Please enter a season name', 'danger');
      return;
    }

    if (editingSeasonId) {
      setCourseSyllabus(prev => ({
        ...prev,
        [courseId]: (prev[courseId] || []).map(s => 
          s.id === editingSeasonId ? { ...s, name: newSeasonName } : s
        )
      }));
      triggerToast('Season updated successfully!', 'success');
      setEditingSeasonId(null);
    } else {
      const seasonNumber = (courseSyllabus[courseId]?.length || 0) + 1;
      const newSeason = {
        id: Date.now(),
        name: `Season ${seasonNumber}: ${newSeasonName}`,
        videos: []
      };

      setCourseSyllabus(prev => ({
        ...prev,
        [courseId]: [...(prev[courseId] || []), newSeason]
      }));
      triggerToast('Season created successfully!', 'success');
    }

    setNewSeasonName('');
  };

  const handleDeleteSeason = (courseId, seasonId) => {
    if (window.confirm('Are you sure you want to delete this season and all its video uploads?')) {
      setCourseSyllabus(prev => ({
        ...prev,
        [courseId]: prev[courseId].filter(s => s.id !== seasonId)
      }));
      triggerToast('Season deleted', 'danger');
    }
  };

  const handleAddVideo = (courseId) => {
    const seasonId = selectedSeasonIdForVideo;
    if (!seasonId) {
      triggerToast('Please select a season for the video', 'danger');
      return;
    }
    if (!videoTitleForm.trim()) {
      triggerToast('Please enter a video title', 'danger');
      return;
    }
    if (videoSourceType === 'file' && !videoFileData) {
      triggerToast('Please choose a video file to upload', 'danger');
      return;
    }
    if (videoSourceType === 'url' && !videoUrlForm.trim()) {
      triggerToast('Please enter a video URL', 'danger');
      return;
    }

    const newVideo = {
      id: Date.now(),
      title: videoTitleForm,
      description: videoDescForm,
      sourceType: videoSourceType,
      url: videoSourceType === 'url' ? videoUrlForm : null,
      duration: videoSourceType === 'file' ? videoFileData.duration : 'TBD',
      fileName: videoSourceType === 'file' ? videoFileData.name : null
    };

    setCourseSyllabus(prev => {
      const updatedSeasons = (prev[courseId] || []).map(s => {
        if (s.id === seasonId) {
          return { ...s, videos: [...s.videos, newVideo] };
        }
        return s;
      });
      return { ...prev, [courseId]: updatedSeasons };
    });

    closeVideoModal();
    triggerToast('Video added to season successfully!', 'success');
  };

  // Toggle season accordion collapse
  const toggleSeasonCollapse = (seasonId) => {
    setCollapsedSeasons(prev => ({ ...prev, [seasonId]: !prev[seasonId] }));
  };

  const handleDeleteVideo = (courseId, seasonId, videoId) => {
    setCourseSyllabus(prev => {
      const updatedSeasons = (prev[courseId] || []).map(s => {
        if (s.id === seasonId) {
          return {
            ...s,
            videos: s.videos.filter(v => v.id !== videoId)
          };
        }
        return s;
      });
      return {
        ...prev,
        [courseId]: updatedSeasons
      };
    });
    triggerToast('Video deleted', 'danger');
  };

  // Manage personal Account Plan logic
  const handleUpgradePlan = () => {
    if (window.confirm('Would you like to upgrade to the Instructor Enterprise Plan ($99.00/mo) for custom domains and prioritized AI rendering?')) {
      setProfileData(prev => ({
        ...prev,
        subscriptionPlan: 'Instructor Enterprise Plan',
        renewalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      }));
      triggerToast('Upgraded to Instructor Enterprise Plan successfully!', 'success');
    }
  };

  const handleCancelPlan = () => {
    if (window.confirm('Are you sure you want to cancel your active plan? Your portal will be downgraded to the Free Plan on your next renewal date.')) {
      setProfileData(prev => ({
        ...prev,
        subscriptionPlan: 'Free Instructor Plan',
        renewalDate: 'Cancelled'
      }));
      triggerToast('Instructor subscription plan cancelled', 'danger');
    }
  };

  // Calculations
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);
  const monthlyRevenue = courses.reduce((sum, c) => sum + (c.students * c.price), 0) * 0.15; // Simulated platform share
  const activeCoursesCount = courses.filter(c => c.status === 'Published').length;

  // Filtered lists
  const filteredCoursesFull = courses.filter(c =>
    (classCategoryFilter === 'All' || c.category === classCategoryFilter) &&
    (c.title.toLowerCase().includes(classSearchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(classSearchQuery.toLowerCase()))
  );

  const totalClassPages = Math.ceil(filteredCoursesFull.length / classesPerPage);
  const filteredCourses = filteredCoursesFull.slice((classPage - 1) * classesPerPage, classPage * classesPerPage);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
    s.courseTitle.toLowerCase().includes(studentSearchQuery.toLowerCase())
  );

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="dashboard-layout">

      {/* Sidebar Panel */}
      <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-text">
            <Sparkles size={24} className="text-secondary" />
            <span>SkillForge.AI</span>
          </div>
          <button
            className="btn d-lg-none ms-auto text-muted p-0"
            onClick={() => setSidebarCollapsed(true)}
          >
            <X size={24} />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <button
              className={`sidebar-link w-100 border-0 text-start bg-transparent ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabChange('overview')}
            >
              <LayoutDashboard size={20} />
              <span>Overview</span>
            </button>
          </li>
          <li className="sidebar-menu-item">
            <button
              className={`sidebar-link w-100 border-0 text-start bg-transparent ${(activeTab === 'classes' || activeTab === 'class-detail') ? 'active' : ''}`}
              onClick={() => handleTabChange('classes')}
            >
              <BookOpen size={20} />
              <span>Manage Classes</span>
            </button>
          </li>
          <li className="sidebar-menu-item">
            <button
              className={`sidebar-link w-100 border-0 text-start bg-transparent ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => handleTabChange('students')}
            >
              <Users size={20} />
              <span>Enrolled Students</span>
            </button>
          </li>
          <li className="sidebar-menu-item">
            <button
              className={`sidebar-link w-100 border-0 text-start bg-transparent ${activeTab === 'earnings' ? 'active' : ''}`}
              onClick={() => handleTabChange('earnings')}
            >
              <DollarSign size={20} />
              <span>Earnings</span>
            </button>
          </li>
          <li className="sidebar-menu-item">
            <button
              className={`sidebar-link w-100 border-0 text-start bg-transparent ${activeTab === 'manage-plan' ? 'active' : ''}`}
              onClick={() => handleTabChange('manage-plan')}
            >
              <CreditCard size={20} />
              <span>Manage My Plan</span>
            </button>
          </li>
          <li className="sidebar-menu-item">
            <button
              className={`sidebar-link w-100 border-0 text-start bg-transparent ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              <Settings size={20} />
              <span>Profile Settings</span>
            </button>
          </li>
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {profileData.name.split(' ').pop().charAt(0)}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{profileData.name}</div>
              <div className="sidebar-user-role">Instructor Portal</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="dashboard-content-area">

        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              className="sidebar-toggle-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="topbar-right">

            {/* Notifications Section */}
            <div className="topbar-profile" ref={notificationRef}>
              <button
                className="notification-bell-btn"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={20} />
                {notifications.some(n => !n.read) && <span className="notification-badge"></span>}
              </button>

              {notificationsOpen && (
                <div className="profile-dropdown-menu" style={{ width: '320px', right: 0 }}>
                  <div className="dropdown-header-info d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Notifications</span>
                    <button
                      className="btn btn-link btn-sm text-ai-gradient p-0 text-decoration-none small fw-semibold"
                      onClick={markAllNotificationsRead}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div className="p-3 text-center text-muted small">No notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-2 border-bottom border-secondary border-opacity-10 d-flex flex-column gap-1 ${!n.read ? 'bg-primary bg-opacity-10' : ''}`}>
                          <div className="small text-white" style={{ fontSize: '0.85rem' }}>{n.text}</div>
                          <span className="text-muted" style={{ fontSize: '0.7rem' }}>{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="topbar-profile" ref={profileRef}>
              <div
                className="profile-trigger"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="profile-trigger-avatar">
                  {profileData.name.split(' ').pop().charAt(0)}
                </div>
                <span className="text-white d-none d-sm-inline fw-semibold small">{profileData.name}</span>
                <ChevronDown size={14} className="text-muted" />
              </div>

              {profileDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <div className="dropdown-header-info">
                    <div className="dropdown-user-name">{profileData.name}</div>
                    <div className="dropdown-user-email">{profileData.email}</div>
                  </div>

                  <button
                    className="dropdown-menu-item"
                    onClick={() => { setActiveTab('profile'); setProfileDropdownOpen(false); }}
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </button>

                  <button
                    className="dropdown-menu-item"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setChangePasswordModalOpen(true);
                    }}
                  >
                    <Settings size={16} />
                    <span>Change Password</span>
                  </button>

                  <hr className="border-secondary opacity-25 my-1" />

                  <button
                    className="dropdown-menu-item logout-item"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to log out?")) {
                        navigate('/auth/login');
                      }
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dashboard Pages */}
        <main className="dashboard-page-content">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <div>
                  <h1 className="h3 fw-bold mb-1">Welcome back, Evelyn</h1>
                  <p className="text-muted mb-0">Here's your educational portal analytics overview.</p>
                </div>
                <button
                  className="btn btn-primary-custom d-inline-flex align-items-center gap-2"
                  onClick={() => {
                    setEditingCourse(null);
                    setCourseForm({
                      title: '',
                      category: 'AI & Data Science',
                      price: '',
                      status: 'Published',
                      image: '',
                      publishDate: '',
                      publishTime: ''
                    });
                    setCourseModalOpen(true);
                  }}
                >
                  <Plus size={18} />
                  <span>Create Class</span>
                </button>
              </div>

              {/* Stats Cards Grid */}
              <div className="row g-4 mb-4">
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card-gradient">
                    <div className="stat-card-icon-wrapper">
                      <DollarSign size={24} />
                    </div>
                    <div className="stat-card-value">${monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="stat-card-title">Earnings Estimate</div>
                    <div className="stat-card-trend trend-positive">
                      <TrendingUp size={14} />
                      <span>+14.2% since last month</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card-gradient">
                    <div className="stat-card-icon-wrapper">
                      <Users size={24} />
                    </div>
                    <div className="stat-card-value">{totalStudents.toLocaleString()}</div>
                    <div className="stat-card-title">Enrolled Students</div>
                    <div className="stat-card-trend trend-positive">
                      <TrendingUp size={14} />
                      <span>+8.4% this week</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card-gradient">
                    <div className="stat-card-icon-wrapper">
                      <BookOpenCheck size={24} />
                    </div>
                    <div className="stat-card-value">{activeCoursesCount}</div>
                    <div className="stat-card-title">Active Classes</div>
                    <div className="stat-card-trend text-muted">
                      <span>Curriculum healthy</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="stat-card-gradient">
                    <div className="stat-card-icon-wrapper">
                      <CreditCard size={24} />
                    </div>
                    <div className="stat-card-value">{profileData.subscriptionPlan.replace('Instructor ', '')}</div>
                    <div className="stat-card-title">My Account Plan</div>
                    <div className="stat-card-trend text-muted">
                      <span>{profileData.renewalDate === 'Cancelled' ? 'Expires soon' : `Renews ${profileData.renewalDate}`}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts and Task Tracker Checklist Section */}
              <div className="row g-4 mb-4">

                {/* Simulated Revenue Chart */}
                <div className="col-12 col-lg-7">
                  <div className="glass-card p-4 h-100">
                    <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
                      <TrendingUp size={18} className="text-secondary" />
                      <span>Revenue Projection (H1 2026)</span>
                    </h3>
                    <div className="earnings-chart-container">
                      {[
                        { month: 'Jan', val: 7800 },
                        { month: 'Feb', val: 9200 },
                        { month: 'Mar', val: 11000 },
                        { month: 'Apr', val: 10400 },
                        { month: 'May', val: 12100 },
                        { month: 'Jun', val: monthlyRevenue + 12000 },
                      ].map((item, index) => {
                        const maxVal = 16000;
                        const pctHeight = (item.val / maxVal) * 100;
                        return (
                          <div key={index} className="chart-bar-wrapper">
                            <div
                              className="chart-bar-fill"
                              style={{ height: `${pctHeight}%` }}
                            >
                              <div className="chart-bar-tooltip">
                                ${item.val.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </div>
                            </div>
                            <span className="chart-bar-label">{item.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Pedagogical Daily Tasks Checklist (Replaced Subscribed Students Mix) */}
                <div className="col-12 col-lg-5">
                  <div className="glass-card p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="h5 fw-bold mb-0">Daily Tasks Checklist</h3>
                      <span className="badge bg-secondary bg-opacity-25 text-white" style={{ fontSize: '0.75rem' }}>
                        {tasks.filter(t => t.completed).length} / {tasks.length} Done
                      </span>
                    </div>

                    <div className="milestones-list mt-3">
                      {tasks.map(task => (
                        <div key={task.id} className={`milestone-item-row ${task.completed ? 'completed' : ''}`}>
                          <input
                            type="checkbox"
                            className="form-check-input milestone-checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                          />
                          <span className="milestone-text">{task.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Popular and Latest Courses Section */}
              <div className="row g-4">

                {/* Popular Courses */}
                <div className="col-12 col-lg-8">
                  <div className="glass-card p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="h5 fw-bold mb-0">Popular Curriculum Modules</h3>
                      <button
                        className="btn btn-link btn-sm text-ai-gradient p-0 text-decoration-none"
                        onClick={() => setActiveTab('classes')}
                      >
                        View All
                      </button>
                    </div>

                    <div className="custom-table-container">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>Class / Course Title</th>
                            <th>Enrolled</th>
                            <th>Rating</th>
                            <th>Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.slice(0, 3).map(course => (
                            <tr key={course.id}>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <img
                                    src={course.image}
                                    alt={course.title}
                                    style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px' }}
                                  />
                                  <div>
                                    <div className="fw-semibold text-white">{course.title}</div>
                                    <div className="text-muted small">{course.category}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{course.students} students</td>
                              <td>⭐ {course.rating}</td>
                              <td>${(course.students * course.price).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Latest Activity logs / Notifications summary */}
                <div className="col-12 col-lg-4">
                  <div className="glass-card p-4 h-100">
                    <h3 className="h5 fw-bold mb-4">Latest Student Signups</h3>
                    <div className="d-flex flex-column gap-3">
                      {students.slice(0, 4).map(st => (
                        <div key={st.id} className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                            style={{
                              width: '40px',
                              height: '40px',
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid var(--border-color)',
                              fontSize: '0.9rem'
                            }}
                          >
                            {st.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-grow-1 min-width-0">
                            <div className="fw-semibold text-white text-truncate" style={{ fontSize: '0.9rem' }}>{st.name}</div>
                            <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>{st.courseTitle}</div>
                          </div>
                          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25" style={{ fontSize: '0.7rem' }}>
                            {st.progress}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: MANAGE CLASSES */}
          {activeTab === 'classes' && (
            <div className="animate-fade-in">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                  <h1 className="h3 fw-bold mb-1">Class Curriculum & Course Builder</h1>
                  <p className="text-muted mb-0">Create, edit, and optimize your learning modules.</p>
                </div>

                <div className="d-flex align-items-center gap-3 flex-wrap">
                  {/* Grid / List View Toggle */}
                  <div className="view-toggle-container">
                    <button
                      className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Grid View"
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                      title="List View"
                    >
                      <List size={18} />
                    </button>
                  </div>

                  <button
                    className="btn btn-primary-custom d-inline-flex align-items-center gap-2"
                    onClick={() => {
                      setEditingCourse(null);
                      setCourseForm({
                        title: '',
                        category: 'AI & Data Science',
                        price: '',
                        status: 'Published',
                        image: '',
                        publishDate: '',
                        publishTime: ''
                      });
                      setCourseModalOpen(true);
                    }}
                  >
                    <Plus size={18} />
                    <span>Create Class</span>
                  </button>
                </div>
              </div>

              {/* Class Management Tools (Search & Filter) */}
              <div className="glass-card p-3 mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3 flex-grow-1" style={{ maxWidth: '400px' }}>
                  <div className="position-relative flex-grow-1">
                    <Search className="position-absolute text-muted" size={18} style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      className="form-control form-control-custom ps-5"
                      placeholder="Search your classes..."
                      value={classSearchQuery}
                      onChange={(e) => { setClassSearchQuery(e.target.value); setClassPage(1); }}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small fw-semibold">CATEGORY:</span>
                  <select
                    className="form-select form-control-custom"
                    style={{ width: '180px', cursor: 'pointer' }}
                    value={classCategoryFilter}
                    onChange={(e) => { setClassCategoryFilter(e.target.value); setClassPage(1); }}
                  >
                    <option value="All">All Categories</option>
                    <option value="AI & Data Science">AI &amp; Data Science</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="glass-card text-center py-5">
                  <div className="text-muted mb-3">No classes matched your search query.</div>
                  <button className="btn btn-primary-custom" onClick={() => setSearchQuery('')}>Clear Filter</button>
                </div>
              ) : viewMode === 'grid' ? (
                /* GRID VIEW (Exactly 4 cards in one row on desktop) */
                <div className="row g-4 animate-fade-in">
                  {filteredCourses.map(course => (
                    <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={course.id}>
                      <div className="glass-card overflow-hidden h-100 d-flex flex-column border-secondary border-opacity-10 hover-lift transition-all">
                        <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                          <img
                            src={course.image}
                            alt={course.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div
                            className={`badge position-absolute px-2.5 py-1.5 ${course.status === 'Published' ? 'bg-success' : 'bg-secondary'}`}
                            style={{ top: '10px', right: '10px', fontSize: '0.75rem' }}
                          >
                            {course.status}
                          </div>
                        </div>

                        <div className="p-3.5 flex-grow-1 d-flex flex-column" style={{ padding: '1.25rem' }}>
                          <span className="text-secondary small fw-bold uppercase tracking-wider mb-1" style={{ fontSize: '0.75rem' }}>{course.category}</span>
                          <h4 className="fw-bold h6 text-white mb-2 text-line-clamp-2" style={{ minHeight: '38px', fontSize: '0.95rem' }}>
                            {course.title}
                          </h4>

                          {/* Publish Date & Time */}
                          <div className="d-flex align-items-center gap-2 text-muted mb-3" style={{ fontSize: '0.75rem' }}>
                            <Calendar size={12} className="text-secondary" />
                            <span>{course.publishDate || '2026-06-05'}</span>
                            <span className="opacity-25">|</span>
                            <Clock size={12} className="text-secondary" />
                            <span>{course.publishTime || '12:00'}</span>
                          </div>

                          <div className="row g-1 py-2 border-top border-bottom border-secondary border-opacity-10 mb-3 mt-auto" style={{ fontSize: '0.8rem' }}>
                            <div className="col-6">
                              <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>PRICE</span>
                              <span className="fw-bold text-white">${course.price.toFixed(2)}</span>
                            </div>
                            <div className="col-6 text-end">
                              <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>ENROLLED</span>
                              <span className="fw-bold text-white">{course.students}</span>
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
                            <span className="text-warning small fw-bold" style={{ fontSize: '0.8rem' }}>⭐ {course.rating.toFixed(1)}</span>
                            <div className="d-flex gap-3">
                              <button
                                className="btn btn-outline-secondary p-1.5 text-white border-secondary border-opacity-25"
                                onClick={() => {
                                  setSelectedCourseId(course.id);
                                  setActiveTab('class-detail');
                                }}
                                title="View Details / Video Parts"
                                style={{ padding: '0.4rem' }}
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                className="btn btn-outline-secondary p-1.5 text-white border-secondary border-opacity-25"
                                onClick={() => openEditModal(course)}
                                title="Edit Class"
                                style={{ padding: '0.4rem' }}
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                className="btn btn-outline-danger p-1.5 border-danger border-opacity-25 text-danger"
                                onClick={() => handleDeleteCourse(course.id, course.title)}
                                title="Delete Class"
                                style={{ padding: '0.4rem' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* LIST VIEW */
                <div className="d-flex flex-column gap-3 animate-fade-in">
                  {filteredCourses.map(course => (
                    <div className="class-list-card" key={course.id}>
                      <div className="class-list-body">
                        <div className="class-list-img-wrapper">
                          <img src={course.image} alt={course.title} />
                        </div>

                        <div className="class-list-details">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span className="badge bg-secondary bg-opacity-25 text-secondary border border-secondary border-opacity-25" style={{ fontSize: '0.75rem' }}>{course.category}</span>
                            <span className={`badge ${course.status === 'Published' ? 'bg-success bg-opacity-20 text-success border border-success border-opacity-25' : 'bg-secondary bg-opacity-20 text-muted'}`} style={{ fontSize: '0.75rem' }}>{course.status}</span>
                          </div>
                          <h4 className="fw-bold text-white h6 mb-2">{course.title}</h4>

                          <div className="class-list-meta">
                            <div className="d-flex align-items-center gap-1.5 text-muted small">
                              <Calendar size={13} className="text-secondary" />
                              <span>Published: {course.publishDate || '2026-06-05'} at {course.publishTime || '12:00'}</span>
                            </div>
                            <span className="text-muted d-none d-md-inline">•</span>
                            <div className="d-flex align-items-center gap-1.5 text-muted small">
                              <Users size={13} className="text-secondary" />
                              <span>{course.students} enrolled students</span>
                            </div>
                            <span className="text-muted d-none d-md-inline">•</span>
                            <span className="text-warning small fw-bold">⭐ {course.rating.toFixed(1)} / 5.0</span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-4 ms-auto">
                          <div className="text-end">
                            <span className="text-muted d-block small" style={{ fontSize: '0.7rem' }}>PRICE</span>
                            <span className="fw-bold text-white h5 mb-0">${course.price.toFixed(2)}</span>
                          </div>

                          <div className="d-flex gap-3">
                            <button
                              className="btn btn-outline-secondary p-2 text-white border-secondary border-opacity-25"
                              onClick={() => {
                                setSelectedCourseId(course.id);
                                setActiveTab('class-detail');
                              }}
                              title="View Details & Curriculum"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              className="btn btn-outline-secondary p-2 text-white border-secondary border-opacity-25"
                              onClick={() => openEditModal(course)}
                              title="Edit Class Details"
                            >
                              <Edit size={15} />
                            </button>
                            <button
                              className="btn btn-outline-danger p-2 border-danger border-opacity-25 text-danger"
                              onClick={() => handleDeleteCourse(course.id, course.title)}
                              title="Delete Class"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Class Pagination */}
              {totalClassPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                  <button
                    className="btn btn-outline-secondary text-white border-secondary border-opacity-25"
                    disabled={classPage === 1}
                    onClick={() => setClassPage(p => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                  <div className="d-flex align-items-center gap-1">
                    {Array.from({ length: totalClassPages }).map((_, i) => (
                      <button
                        key={i}
                        className={`btn ${classPage === i + 1 ? 'btn-primary-custom' : 'btn-outline-secondary text-white border-secondary border-opacity-25'}`}
                        style={{ width: '36px', height: '36px', padding: 0 }}
                        onClick={() => setClassPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    className="btn btn-outline-secondary text-white border-secondary border-opacity-25"
                    disabled={classPage === totalClassPages}
                    onClick={() => setClassPage(p => Math.min(totalClassPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2.5: CLASS DETAILED VIEW & SEASONS/VIDEO UPLOADER */}
          {activeTab === 'class-detail' && selectedCourse && (
            <div className="animate-fade-in">
              {/* Back Header Nav */}
              <button
                className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 mb-4 text-white border-secondary border-opacity-25"
                onClick={() => {
                  setSelectedCourseId(null);
                  setActiveTab('classes');
                }}
              >
                <ArrowLeft size={16} />
                <span>Back to Classes</span>
              </button>

              {/* Course Info Banner */}
              <div className="class-detail-banner">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="class-detail-banner-img"
                />
                <div className="class-detail-banner-info">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-secondary bg-opacity-25 text-secondary border border-secondary border-opacity-25">{selectedCourse.category}</span>
                    <span className={`badge ${selectedCourse.status === 'Published' ? 'bg-success' : 'bg-secondary'}`}>{selectedCourse.status}</span>
                  </div>
                  <h2 className="fw-bold text-white h3 mb-2">{selectedCourse.title}</h2>

                  <div className="d-flex align-items-center gap-4 text-muted small flex-wrap mt-3">
                    <div className="d-flex align-items-center gap-1.5">
                      <Calendar size={14} className="text-secondary" />
                      <span>Published on {selectedCourse.publishDate} at {selectedCourse.publishTime}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1.5">
                      <Users size={14} className="text-secondary" />
                      <span>{selectedCourse.students} Enrolled Students</span>
                    </div>
                    <div className="fw-bold text-white">Price: ${selectedCourse.price.toFixed(2)}</div>
                    <div className="text-warning">⭐ {selectedCourse.rating.toFixed(1)} / 5.0 Rating</div>
                  </div>
                </div>
              </div>

              {/* Seasons Curriculum Outline Editor */}
              <div className="glass-card p-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="curriculum-section-title mb-0">
                    <Film size={20} className="text-secondary" />
                    <span>Curriculum Parts (Seasons &amp; Videos)</span>
                  </h3>
                  <button
                    type="button"
                    className="btn btn-primary-custom d-inline-flex align-items-center gap-2"
                    onClick={() => { setNewSeasonName(''); setSeasonModalOpen(true); }}
                  >
                    <Plus size={16} />
                    <span>Add Season Block</span>
                  </button>
                </div>

                {/* Seasons List Accordion style */}
                <div className="curriculum-seasons-wrapper">
                  {(!courseSyllabus[selectedCourse.id] || courseSyllabus[selectedCourse.id].length === 0) ? (
                    <div className="p-4 text-center text-muted border border-secondary border-opacity-10 rounded-3 mb-4">
                      No seasons created for this class yet. Start by creating Season 1 below.
                    </div>
                  ) : (
                    courseSyllabus[selectedCourse.id].map((season, seasonIdx) => (
                      <div className="season-block" key={season.id}>
                        <div className="season-block-header"
                          onClick={() => toggleSeasonCollapse(season.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="season-block-title">
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'transform 0.25s ease',
                                transform: collapsedSeasons[season.id] ? 'rotate(0deg)' : 'rotate(90deg)'
                              }}
                            >
                              <ChevronRight size={16} className="text-secondary" />
                            </span>
                            <BookOpenCheck size={18} className="text-secondary" />
                            <span>{season.name}</span>
                            <span className="badge bg-secondary bg-opacity-25 text-white" style={{ fontSize: '0.75rem' }}>
                              {season.videos.length} Videos
                            </span>
                          </div>

                          <div className="d-flex align-items-center gap-3" onClick={(e) => e.stopPropagation()}>
                            <button
                              className="btn btn-outline-secondary btn-sm text-white border-secondary border-opacity-25 d-inline-flex align-items-center gap-1"
                              onClick={() => openVideoModal(season.id)}
                            >
                              <Plus size={14} />
                              <span>Add Video</span>
                            </button>
                            <button
                              className="btn btn-outline-warning btn-sm border-warning border-opacity-25 text-warning d-inline-flex align-items-center"
                              onClick={() => {
                                setEditingSeasonId(season.id);
                                setNewSeasonName(season.name);
                                setSeasonModalOpen(true);
                              }}
                              title="Edit Season Name"
                              style={{ padding: '0.35rem 0.5rem' }}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm border-danger border-opacity-25 text-danger d-inline-flex align-items-center"
                              onClick={() => handleDeleteSeason(selectedCourse.id, season.id)}
                              title="Delete Season"
                              style={{ padding: '0.35rem 0.5rem' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Videos list – hidden when season is collapsed */}
                        {!collapsedSeasons[season.id] && (
                          <div className="video-list-container">
                            {season.videos.length === 0 ? (
                              <div className="small text-muted py-2">No videos uploaded yet. Click 'Add Video' to get started.</div>
                            ) : (
                              season.videos.map((vid, vidIdx) => (
                                <div className="video-row-item" key={vid.id}>
                                  <div className="video-row-left">
                                    <Play size={14} className="text-secondary" />
                                    <span className="video-row-title">
                                      Season {seasonIdx + 1} Video {vidIdx + 1}: {vid.title}
                                    </span>
                                  </div>
                                  <div className="video-row-right">
                                    <span className="text-muted small d-inline-flex align-items-center gap-1">
                                      <Clock size={12} />
                                      <span>{vid.duration}</span>
                                    </span>
                                    <button
                                      className="btn btn-link text-danger p-0"
                                      onClick={() => handleDeleteVideo(selectedCourse.id, season.id, vid.id)}
                                      title="Delete Video"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: ENROLLED STUDENTS */}
          {activeTab === 'students' && (
            <div className="animate-fade-in">
              <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Enrolled Students Portal</h1>
                <p className="text-muted">Monitor and support students currently taking your courses.</p>
              </div>

              <div className="custom-table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Course Enrolled</th>
                      <th>Join Date</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">No students found matching your search.</td>
                      </tr>
                    ) : (
                      filteredStudents.map(student => (
                        <tr key={student.id}>
                          <td>
                            <div>
                              <div className="fw-bold text-white">{student.name}</div>
                              <div className="text-muted small">{student.email}</div>
                            </div>
                          </td>
                          <td>
                            <span className="fw-semibold text-white">{student.courseTitle}</span>
                          </td>
                          <td className="text-muted">{student.date}</td>
                          <td style={{ width: '200px' }}>
                            <div className="d-flex align-items-center gap-2">
                              <div className="progress bg-dark w-100" style={{ height: '6px' }}>
                                <div
                                  className="progress-bar bg-ai-gradient"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="small text-muted fw-bold" style={{ minWidth: '35px' }}>{student.progress}%</span>
                            </div>
                          </td>
                          <td>
                            <span className={`badge px-3 py-1 ${student.status === 'Completed' ? 'bg-success bg-opacity-25 text-success border border-success border-opacity-25' : 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25'}`}>
                              {student.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-link btn-sm text-ai-gradient p-0 text-decoration-none fw-bold"
                              onClick={() => triggerToast(`Message portal link generated for ${student.name}`, 'success')}
                            >
                              Message
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MANAGE MY PLAN (Overhauled from Revenue & Plans) */}
          {activeTab === 'manage-plan' && (
            <div className="animate-fade-in">
              <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Manage My Account Plan</h1>
                <p className="text-muted">Review, upgrade, or modify your instructor tier and billing limits.</p>
              </div>

              <div className="row g-4">

                {/* Active Plan details card */}
                <div className="col-12 col-md-7">
                  <div className="glass-card p-4">
                    <span className="text-muted d-block small mb-2 uppercase fw-bold" style={{ letterSpacing: '0.05em' }}>CURRENT ACCOUNT TIER</span>

                    <div className="d-flex align-items-baseline gap-2 mb-3">
                      <h2 className="display-6 fw-bold text-white mb-0">{profileData.subscriptionPlan}</h2>
                      <span className="text-secondary fw-semibold">
                        {profileData.subscriptionPlan.includes('Pro') ? '$49.00 / month' : profileData.subscriptionPlan.includes('Enterprise') ? '$99.00 / month' : '$0.00 / free'}
                      </span>
                    </div>

                    <div className="p-3 bg-dark bg-opacity-40 rounded-3 border border-secondary border-opacity-10 mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '0.85rem' }}>
                        <span className="text-muted">Subscription Status</span>
                        <span className={`fw-bold ${profileData.renewalDate === 'Cancelled' ? 'text-danger' : 'text-success'}`}>
                          {profileData.renewalDate === 'Cancelled' ? 'Cancelled (Pending Downgrade)' : 'Active (Auto-Renewing)'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '0.85rem' }}>
                        <span className="text-muted">Renewal / Expiration Date</span>
                        <span className="text-white fw-bold">{profileData.renewalDate}</span>
                      </div>
                    </div>

                    <h4 className="fw-bold text-white small mb-3 uppercase" style={{ letterSpacing: '0.05em' }}>INCLUDED TIER PRIVILEGES</h4>
                    <ul className="d-flex flex-column gap-2 text-muted list-unstyled mb-4" style={{ fontSize: '0.85rem' }}>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} className="text-success" />
                        <span>Publish unlimited class curriculum modules & upload videos part-wise</span>
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} className="text-success" />
                        <span>Support up to 10,000 active enrolled student tracks</span>
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} className="text-success" />
                        <span>High-fidelity video encoding & server side streaming</span>
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <Check size={14} className="text-success" />
                        <span>Direct Stripe Connect payout routing</span>
                      </li>
                    </ul>

                    {/* Manage and cancel plan actions */}
                    <div className="d-flex gap-3 flex-wrap pt-3 border-top border-secondary border-opacity-10">
                      {profileData.subscriptionPlan.includes('Free') ? (
                        <button
                          className="btn btn-primary-custom"
                          onClick={() => {
                            setProfileData(prev => ({
                              ...prev,
                              subscriptionPlan: 'Instructor Pro Plan',
                              renewalDate: 'Dec 12, 2026'
                            }));
                            triggerToast('Subscribed to Instructor Pro Plan!', 'success');
                          }}
                        >
                          Subscribe to Pro ($49/mo)
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary-custom"
                            onClick={handleUpgradePlan}
                            disabled={profileData.subscriptionPlan.includes('Enterprise')}
                          >
                            {profileData.subscriptionPlan.includes('Enterprise') ? 'Upgraded to Enterprise' : 'Upgrade to Enterprise ($99/mo)'}
                          </button>

                          <button
                            className="btn btn-outline-danger border-danger border-opacity-20 text-danger"
                            onClick={handleCancelPlan}
                          >
                            Cancel Plan
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Billing details card */}
                <div className="col-12 col-md-5">
                  <div className="glass-card p-4">
                    <h3 className="h5 fw-bold mb-4">Billing & Payments</h3>

                    <div className="mb-4">
                      <span className="text-muted d-block small">DEFAULT PAYMENT METHOD</span>
                      <div className="fw-semibold text-white d-flex align-items-center gap-2 mt-1">
                        <CreditCard size={18} className="text-secondary" />
                        <span>Visa ending in 8912</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-muted d-block small">STRIPE CONNECT ACCOUNT</span>
                      <div className="fw-semibold text-white d-flex align-items-center gap-2 mt-1">
                        <Sliders size={16} className="text-secondary" />
                        <span>{profileData.payoutMethod}</span>
                      </div>
                    </div>

                    <button
                      className="btn btn-outline-secondary w-100 text-white border-secondary border-opacity-25"
                      onClick={() => triggerToast('Stripe billing portal opened', 'success')}
                    >
                      Update Payment Info
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: EARNINGS */}
          {activeTab === 'earnings' && (
            <div className="animate-fade-in">
              <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Earnings & Progress Tracking</h1>
                <p className="text-muted">Monitor your class revenue and overall teaching progress.</p>
              </div>

              <div className="row g-4 mb-4">
                <div className="col-12 col-md-4">
                  <div className="glass-card p-4 h-100 text-center">
                    <div className="text-muted small fw-bold mb-2" style={{ letterSpacing: '1px' }}>TOTAL EARNINGS (YTD)</div>
                    <div className="display-5 fw-bold text-success mb-1">${(monthlyRevenue * 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 mt-2">+15% from last year</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="glass-card p-4 h-100 text-center">
                    <div className="text-muted small fw-bold mb-2" style={{ letterSpacing: '1px' }}>PENDING PAYOUT</div>
                    <div className="display-5 fw-bold text-white mb-1">${monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-muted small mt-2">Expected by {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="glass-card p-4 h-100 text-center">
                    <div className="text-muted small fw-bold mb-2" style={{ letterSpacing: '1px' }}>TOTAL ENROLLMENTS</div>
                    <div className="display-5 fw-bold text-primary mb-1">{totalStudents}</div>
                    <div className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 mt-2">+42 this month</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 mb-4">
                <h3 className="h5 fw-bold mb-4">Recent Transactions</h3>
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0" style={{ backgroundColor: 'transparent' }}>
                    <thead>
                      <tr>
                        <th className="text-muted small fw-normal border-secondary border-opacity-10">DATE</th>
                        <th className="text-muted small fw-normal border-secondary border-opacity-10">CLASS</th>
                        <th className="text-muted small fw-normal border-secondary border-opacity-10">STUDENT</th>
                        <th className="text-muted small fw-normal border-secondary border-opacity-10 text-end">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody className="border-top-0">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <tr key={i}>
                          <td className="border-secondary border-opacity-10 text-muted">{new Date(Date.now() - (i * 86400000 * 2)).toLocaleDateString()}</td>
                          <td className="border-secondary border-opacity-10 fw-semibold text-white">Advanced Python &amp; Neural Networks</td>
                          <td className="border-secondary border-opacity-10 text-muted">Student {i + 1}</td>
                          <td className="border-secondary border-opacity-10 text-end text-success fw-semibold">+$84.15</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <div className="mb-4">
                <h1 className="h3 fw-bold mb-1">Instructor Settings & Profile</h1>
                <p className="text-muted">Manage your public information, teaching credentials, and payment payouts.</p>
              </div>

              <div className="row g-4">
                <div className="col-lg-8">
                  <div className="glass-card p-4">
                    <h3 className="h5 fw-bold mb-4">Edit Profile Info</h3>

                    <form onSubmit={(e) => { e.preventDefault(); triggerToast('Profile details updated!', 'success'); }}>
                      <div className="row g-3 mb-4">
                        <div className="col-md-6">
                          <label className="form-label small fw-bold">FULL NAME</label>
                          <input
                            type="text"
                            className="form-control form-control-custom"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small fw-bold">TITLE / CREDENTIALS</label>
                          <input
                            type="text"
                            className="form-control form-control-custom"
                            value={profileData.title}
                            onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label small fw-bold">EMAIL ADDRESS</label>
                        <input
                          type="email"
                          className="form-control form-control-custom"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label small fw-bold">BIO / DESCRIPTION</label>
                        <textarea
                          className="form-control form-control-custom"
                          rows="4"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-primary-custom px-4 py-2 mt-2">
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="glass-card p-4 mb-4">
                    <h3 className="h5 fw-bold mb-4">Billing & Subscriptions</h3>
                    <div className="mb-3">
                      <span className="text-muted d-block small">YOUR CURRENT SUBSCRIPTION LEVEL</span>
                      <span className="fw-bold text-white">{profileData.subscriptionPlan}</span>
                    </div>
                    <div className="mb-4">
                      <span className="text-muted d-block small">NEXT RENEWAL DATE</span>
                      <span className="fw-bold text-white">{profileData.renewalDate}</span>
                    </div>
                    <button
                      className="btn btn-outline-secondary w-100 text-white border-secondary border-opacity-25"
                      onClick={() => setActiveTab('manage-plan')}
                    >
                      Manage Subscription
                    </button>
                  </div>

                  <div className="glass-card p-4">
                    <h3 className="h5 fw-bold mb-4">Payout Method</h3>
                    <div className="mb-4">
                      <span className="text-muted d-block small">Payout Route</span>
                      <span className="fw-bold text-white">{profileData.payoutMethod}</span>
                    </div>
                    <button
                      className="btn btn-outline-secondary w-100 text-white border-secondary border-opacity-25"
                      onClick={() => triggerToast('Payout editing panel opened', 'success')}
                    >
                      Change Payout Credentials
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CREATE / EDIT COURSE MODAL */}
      {courseModalOpen && (
        <div className="custom-modal-backdrop" onClick={() => setCourseModalOpen(false)}>
          <div className="custom-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <h3 className="h5 fw-bold mb-0 text-white">{editingCourse ? 'Edit Curriculum Class' : 'Build New Class Module'}</h3>
              <button
                className="btn btn-link text-muted p-0 text-decoration-none"
                onClick={() => setCourseModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCourseSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <div className="custom-modal-body">

                <div className="mb-3">
                  <label className="modal-field-label">COURSE TITLE</label>
                  <input
                    type="text"
                    className="modal-field-input"
                    placeholder="e.g. Advanced AI Model Tuning"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    required
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="modal-field-label">CATEGORY</label>
                    <select
                      className="modal-field-select"
                      value={courseForm.category}
                      onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    >
                      <option value="AI & Data Science">AI &amp; Data Science</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Cyber Security">Cyber Security</option>
                    </select>
                  </div>

                  {/* STATUS — above Publish Date & Time */}
                  <div className="col-md-6">
                    <label className="modal-field-label">STATUS</label>
                    <select
                      className="modal-field-select"
                      value={courseForm.status}
                      onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value })}
                    >
                      <option value="Active">Active (Live &amp; Accessible)</option>
                      <option value="Published">Published (Public access)</option>
                      <option value="Draft">Draft (Only viewable by you)</option>
                      <option value="Archived">Archived (Hidden from catalog)</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="modal-field-label">DESCRIPTION</label>
                  <textarea
                    className="modal-field-input"
                    placeholder="Describe what students will learn in this course..."
                    rows={3}
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    style={{ resize: 'vertical', minHeight: '80px' }}
                  />
                </div>

                {/* Prices */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="modal-field-label">REGULAR PRICE ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="modal-field-input"
                      placeholder="99.00"
                      value={courseForm.regularPrice}
                      onChange={(e) => setCourseForm({ ...courseForm, regularPrice: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="modal-field-label">
                      SALE PRICE ($ USD) <span style={{ fontWeight: 400, fontSize: '0.7rem', opacity: 0.6 }}>Optional</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="modal-field-input"
                      placeholder="49.00"
                      value={courseForm.salePrice}
                      onChange={(e) => setCourseForm({ ...courseForm, salePrice: e.target.value })}
                    />
                  </div>
                </div>

                {/* Publish Date & Time — only shown when status is Active */}
                {courseForm.status === 'Active' && (
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="modal-field-label">PUBLISH DATE</label>
                      <input
                        type="date"
                        className="modal-field-input"
                        value={courseForm.publishDate}
                        onChange={(e) => setCourseForm({ ...courseForm, publishDate: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="modal-field-label">PUBLISH TIME</label>
                      <input
                        type="time"
                        className="modal-field-input"
                        value={courseForm.publishTime}
                        onChange={(e) => setCourseForm({ ...courseForm, publishTime: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="modal-field-label">COVER IMAGE</label>
                  {/* Preview of current image */}
                  {(courseForm.imagePreview || courseForm.image) && (
                    <div className="mb-2">
                      <img
                        src={courseForm.imagePreview || courseForm.image}
                        alt="Preview"
                        style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}
                      />
                    </div>
                  )}
                  {/* Hidden native file input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageFileRef}
                    style={{ display: 'none' }}
                    onChange={handleImageFileChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 text-white border-secondary border-opacity-25 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => imageFileRef.current && imageFileRef.current.click()}
                  >
                    <ImagePlus size={16} />
                    <span>{(courseForm.imagePreview || courseForm.image) ? 'Change Cover Image' : 'Choose Cover Image from Device'}</span>
                  </button>
                  <small className="text-muted mt-1 d-block">Leave empty to use an AI-selected default. Accepted: JPG, PNG, WebP.</small>
                </div>

              </div>

              <div className="custom-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary text-white border-secondary border-opacity-25"
                  onClick={() => setCourseModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary-custom">
                  {editingCourse ? 'Save Changes' : 'Build & Publish Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {changePasswordModalOpen && (
        <div className="custom-modal-backdrop" onClick={() => setChangePasswordModalOpen(false)}>
          <div className="custom-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <h3 className="h5 fw-bold mb-0 text-white">Change Account Password</h3>
              <button
                className="btn btn-link text-muted p-0 text-decoration-none"
                onClick={() => setChangePasswordModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleChangePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <div className="custom-modal-body">
                <div className="mb-3">
                  <label className="form-label small fw-bold">CURRENT PASSWORD</label>
                  <input
                    type="password"
                    className="form-control form-control-custom"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">NEW PASSWORD</label>
                  <input
                    type="password"
                    className="form-control form-control-custom"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">CONFIRM NEW PASSWORD</label>
                  <input
                    type="password"
                    className="form-control form-control-custom"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="custom-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary text-white border-secondary border-opacity-25"
                  onClick={() => setChangePasswordModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary-custom">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD VIDEO MODAL */}
      {videoModalOpen && selectedCourse && (
        <div className="custom-modal-backdrop" onClick={closeVideoModal}>
          <div className="custom-modal-card animate-fade-in" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <div className="d-flex align-items-center gap-2">
                <Film size={20} className="text-secondary" />
                <h3 className="h5 fw-bold mb-0 text-white">Add Video to Season</h3>
              </div>
              <button
                className="btn btn-link text-muted p-0 text-decoration-none"
                onClick={closeVideoModal}
              >
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); handleAddVideo(selectedCourse.id); }}
              style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
            >
              <div className="custom-modal-body">
                <p className="text-muted small mb-3">
                  Choose a season, add video details, then upload a file or paste a video URL.
                </p>

                <div className="mb-1">
                  <label className="modal-field-label">SEASON</label>
                  <select
                    className="modal-field-select"
                    value={selectedSeasonIdForVideo ?? ''}
                    onChange={(e) => setSelectedSeasonIdForVideo(Number(e.target.value))}
                    required
                  >
                    <option value="" disabled>Select a season</option>
                    {(courseSyllabus[selectedCourse.id] || []).map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-1">
                  <label className="modal-field-label">VIDEO TITLE</label>
                  <input
                    type="text"
                    className="modal-field-input"
                    placeholder="e.g. Introduction to Backpropagation"
                    value={videoTitleForm}
                    onChange={(e) => setVideoTitleForm(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-1">
                  <label className="modal-field-label">VIDEO DESCRIPTION</label>
                  <textarea
                    className="modal-field-input modal-field-textarea"
                    rows="3"
                    placeholder="Brief summary of what this video covers..."
                    value={videoDescForm}
                    onChange={(e) => setVideoDescForm(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label className="modal-field-label">VIDEO SOURCE</label>
                  <div className="video-source-tabs">
                    <button
                      type="button"
                      className={`video-source-tab ${videoSourceType === 'file' ? 'active' : ''}`}
                      onClick={() => setVideoSourceType('file')}
                    >
                      <Upload size={14} />
                      Upload File
                    </button>
                    <button
                      type="button"
                      className={`video-source-tab ${videoSourceType === 'url' ? 'active' : ''}`}
                      onClick={() => setVideoSourceType('url')}
                    >
                      <Link2 size={14} />
                      Paste URL
                    </button>
                  </div>
                </div>

                {videoSourceType === 'file' ? (
                  <>
                    <input
                      type="file"
                      accept="video/*"
                      ref={videoFileRef}
                      style={{ display: 'none' }}
                      onChange={handleVideoFileChange}
                    />
                    <div
                      className={`video-dropzone ${videoFileData ? 'has-file' : ''}`}
                      onDrop={handleVideoDrop}
                      onDragOver={handleVideoDragOver}
                      onClick={() => videoFileRef.current?.click()}
                    >
                      <Upload size={28} className="text-secondary mb-2" />
                      <p className="mb-1 fw-semibold text-white small">
                        {videoFileData ? videoFileData.name : 'Drag & drop your video here'}
                      </p>
                      <p className="text-muted small mb-0">
                        {videoFileData ? 'Click to replace file' : 'or click to browse — MP4, MOV, WebM supported'}
                      </p>
                      {videoFileData && (
                        <div className="d-flex align-items-center justify-content-center gap-1 mt-2 text-success" style={{ fontSize: '0.75rem' }}>
                          <Clock size={11} />
                          <span>Duration: <strong>{videoFileData.duration}</strong></span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mb-1">
                    <input
                      type="url"
                      className="modal-field-input"
                      placeholder="https://example.com/video.mp4 or YouTube/Vimeo link"
                      value={videoUrlForm}
                      onChange={(e) => setVideoUrlForm(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="custom-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary text-white border-secondary border-opacity-25"
                  onClick={closeVideoModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary-custom d-inline-flex align-items-center gap-2">
                  <Upload size={16} />
                  Add Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD/EDIT SEASON MODAL */}
      {seasonModalOpen && selectedCourse && (
        <div className="custom-modal-backdrop" onClick={() => { setSeasonModalOpen(false); setEditingSeasonId(null); }}>
          <div className="custom-modal-card animate-fade-in" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="custom-modal-header">
              <div className="d-flex align-items-center gap-2">
                <BookOpenCheck size={20} className="text-secondary" />
                <h3 className="h5 fw-bold mb-0 text-white">{editingSeasonId ? 'Edit Season Block' : 'Create New Season Block'}</h3>
              </div>
              <button
                className="btn btn-link text-muted p-0 text-decoration-none"
                onClick={() => { setSeasonModalOpen(false); setEditingSeasonId(null); }}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddSeason(selectedCourse.id); setSeasonModalOpen(false); }} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <div className="custom-modal-body">
                <p className="text-muted small mb-3">
                  {editingSeasonId ? 'Update the name of this season.' : 'Enter a name for this season. It will be prefixed automatically with the season number.'}
                </p>
                <div className="mb-1">
                  <label className="modal-field-label">SEASON NAME</label>
                  <input
                    type="text"
                    className="modal-field-input"
                    placeholder="e.g. Advanced Optimization Methods"
                    value={newSeasonName}
                    onChange={(e) => setNewSeasonName(e.target.value)}
                    autoFocus
                    required
                  />
                  {!editingSeasonId && newSeasonName.trim() && (
                    <small className="text-muted d-block mt-1">
                      Will be saved as: <span className="text-secondary fw-semibold">Season {(courseSyllabus[selectedCourse.id]?.length || 0) + 1}: {newSeasonName}</span>
                    </small>
                  )}
                </div>
              </div>
              <div className="custom-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary text-white border-secondary border-opacity-25"
                  onClick={() => { setSeasonModalOpen(false); setEditingSeasonId(null); }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary-custom d-inline-flex align-items-center gap-2">
                  {editingSeasonId ? <Edit size={16} /> : <Plus size={16} />}
                  {editingSeasonId ? 'Save Changes' : 'Add Season Block'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST CONTAINER */}
      <div className="toast-container-custom">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-custom ${toast.type}`}>
            {toast.type === 'success' ? <Check size={18} className="text-success" /> : <AlertCircle size={18} className="text-danger" />}
            <div className="small fw-semibold">{toast.message}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default InstructorDashboard;
