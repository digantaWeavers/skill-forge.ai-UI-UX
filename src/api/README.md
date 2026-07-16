# API Integration Guide & Folder Structure

This directory houses the structured setup for making API calls. Requests are made directly using the server's absolute URL (`VITE_API_BASE_URL`), bypassing any frontend dev server proxies. This ensures that in your browser's **Network tab**, you will see the actual endpoint target (e.g. `http://127.0.0.1:3000/api/v1/...`) instead of the development server port (e.g. `http://localhost:5173/api/v1/...`).

---

## 📂 Folder Structure

```text
src/api/
├── apiClient.js        # Base fetch client wrapper configured with VITE_API_BASE_URL
├── endpoints.js        # Centralized endpoint path constants
└── services/           # Domain-specific API methods
    ├── authService.js  # Authentication endpoints (login, register, logout)
    ├── userService.js  # User-specific profile/settings endpoints
    └── index.js        # Unified entrypoint for clean imports
```

---

## 🛠️ Components of the Setup

### 1. `apiClient.js`
The base HTTP client. It retrieves `import.meta.env.VITE_API_BASE_URL` and prefixes every request. It handles:
- Setting headers (like `Content-Type: application/json` or bearer auth tokens).
- Parsing JSON responses automatically.
- Rejecting promises on HTTP error codes (e.g. `4xx`, `5xx`).

### 2. `endpoints.js`
A dictionary containing API sub-paths. By centralizing endpoints here, you avoid hardcoding magic strings in your files.
```javascript
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
  }
};
```

### 3. `services/`
Domain-specific files containing high-level async functions representing API operations. They make calls using `apiClient` and paths from `endpoints.js`.

---

## 🚀 How to Add a New API Endpoint

1. **Register the Path**: Open `endpoints.js` and add the sub-path.
   ```javascript
   // src/api/endpoints.js
   export const ENDPOINTS = {
     // ...
     POSTS: {
       LIST: '/posts',
       CREATE: '/posts/create',
     }
   };
   ```
2. **Create/Update the Service**:
   Add the async calling function inside a new service file, e.g. `postsService.js`:
   ```javascript
   // src/api/services/postsService.js
   import { apiClient } from '../apiClient';
   import { ENDPOINTS } from '../endpoints';

   export const postsService = {
     getPosts: async () => {
       return apiClient.get(ENDPOINTS.POSTS.LIST);
     },
     createPost: async (postData) => {
       return apiClient.post(ENDPOINTS.POSTS.CREATE, postData);
     }
   };
   ```
3. **Export from Entrypoint**: Register your new service in `src/api/services/index.js` so it can be imported easily:
   ```javascript
   export { postsService } from './postsService';
   ```

---

## 💡 When and How to Call the APIs in React

Below are the three primary paradigms for calling APIs in a React application.

### Paradigm A: On Component Mount (Loading Data Automatically)
Use this when you want to load data as soon as a page or component is rendered (e.g., loading a user profile, a list of courses, etc.).

**How:** Use React's `useEffect` hook.

```jsx
import React, { useState, useEffect } from 'react';
import { userService } from '@/api/services'; // Alias resolved via Vite configuration

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevents updating state on unmounted components

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await userService.getProfile();
        if (isMounted) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load profile');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false; // Clean up flag
    };
  }, []); // Empty dependency array means this runs ONCE when the component mounts

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <div>
      <h1>Welcome, {profile.name}!</h1>
      <p>Email: {profile.email}</p>
    </div>
  );
}

export default UserProfile;
```

---

### Paradigm B: In Response to User Action (Form Submissions or Clicks)
Use this when you want to trigger API calls based on a user interaction, like clicking a button or submitting a form (e.g., logging in, deleting an item).

**How:** Place the call inside an event handler function.

```jsx
import React, { useState } from 'react';
import { authService } from '@/api/services';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop default form submit page reload
    
    setLoading(true);
    setMessage(null);

    try {
      const response = await authService.login({ email, password });
      
      // Handle success (e.g., save token, redirect, update global state)
      setMessage({ type: 'success', text: `Logged in successfully! Token: ${response.token}` });
    } catch (error) {
      // Handle error
      setMessage({ type: 'error', text: error.message || 'Login failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Submit'}
      </button>

      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.text}
        </p>
      )}
    </form>
  );
}

export default LoginForm;
```

---

### Paradigm C: Custom Hooks (Highly Recommended for Clean React Components)
Custom hooks keep your UI components tiny, focused, and clean by abstracting the state-management logic away from the rendering logic.

```javascript
// src/hooks/useUserProfile.js
import { useState, useEffect } from 'react';
import { userService } from '@/api/services';

export function useUserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadProfile = async () => {
    try {
      setLoading(true);
      const data = await userService.getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadProfile();
  }, []);

  return { profile, loading, error, refetch: reloadProfile };
}
```

Then in your UI components:
```jsx
import { useUserProfile } from '@/hooks/useUserProfile';

function Dashboard() {
  const { profile, loading, error, refetch } = useUserProfile();

  if (loading) return <p>Loading...</p>;
  if (error) return <button onClick={refetch}>Try Again</button>;

  return (
    <div>
      <p>Hello {profile.name}!</p>
      <button onClick={refetch}>Refresh Data</button>
    </div>
  );
}
```
