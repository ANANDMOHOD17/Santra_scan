import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('santrascan_user');
    return saved ? JSON.parse(saved) : null; // null if not logged in
  });

  const [token, setToken] = useState(() => localStorage.getItem('santrascan_token') || null);
  const [demoMode, setDemoMode] = useState(() => {
    return localStorage.getItem('santrascan_demo_mode') !== 'false';
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Login with email, phone number, or username
  const login = async (identifier, password) => {
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: identifier, password: password })
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.detail || 'Login failed. Please check your credentials.');
      }
      setUser(data.user);
      setToken(data.access_token);
      localStorage.setItem('santrascan_user', JSON.stringify(data.user));
      localStorage.setItem('santrascan_token', data.access_token);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Register new account with Full Name, Email OR Phone Number, Password, Role
  const register = async ({ full_name, email, phone, password, role = 'operator', preferred_language = 'mr' }) => {
    try {
      const resp = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name,
          email: email || (phone ? `user_${phone}@santrascan.agri` : null),
          phone: phone || null,
          password,
          role,
          preferred_language
        })
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.detail || 'Registration failed. Email or phone may already exist.');
      }
      setUser(data.user);
      setToken(data.access_token);
      localStorage.setItem('santrascan_user', JSON.stringify(data.user));
      localStorage.setItem('santrascan_token', data.access_token);
      return { success: true, user: data.user };
    } catch (err) {
      if (demoMode || err.message.includes('fetch') || err.message.includes('Failed to fetch')) {
        const identifier = phone || (email ? email.split('@')[0] : 'user');
        const fallbackUser = {
          id: Date.now(),
          username: identifier,
          email: email || `${phone || 'farmer'}@santrascan.agri`,
          phone: phone || '',
          full_name,
          role,
          preferred_language,
          badge: `${role.toUpperCase()} (Registered)`
        };
        const dummyToken = `demo-token-${Date.now()}`;
        setUser(fallbackUser);
        setToken(dummyToken);
        localStorage.setItem('santrascan_user', JSON.stringify(fallbackUser));
        localStorage.setItem('santrascan_token', dummyToken);
        return { success: true, user: fallbackUser };
      }
      return { success: false, error: err.message };
    }
  };

  // 1-Click quick login for testing/demo
  const quickSwitchRole = (role) => {
    const roleMap = {
      operator: { id: 1, username: 'operator', email: 'operator@santrascan.agri', phone: '9823012345', full_name: 'Ramesh Patil (नर्सरी ऑपरेटर)', role: 'operator', badge: 'Hatla Nursery Operator' },
      reviewer: { id: 2, username: 'reviewer', email: 'dr.deshmukh@ccri.gov.in', phone: '9422067890', full_name: 'Dr. S. Deshmukh (वरिष्ठ फलोत्पादन तज्ज्ञ)', role: 'reviewer', badge: 'ICAR-CCRI Reviewer' },
      officer: { id: 3, username: 'officer', email: 'officer.nagpur@gov.in', phone: '9822114433', full_name: 'V. K. Shinde (जिल्हा कृषी अधिकारी)', role: 'officer', badge: 'Nagpur Dist. Officer' },
      admin: { id: 4, username: 'admin', email: 'admin@santrascan.agri', phone: '9988776655', full_name: 'System Admin', role: 'admin', badge: 'Super Admin' }
    };
    const newUser = roleMap[role] || roleMap.operator;
    const dummyToken = `demo-token-${role}-${Date.now()}`;
    setUser(newUser);
    setToken(dummyToken);
    localStorage.setItem('santrascan_user', JSON.stringify(newUser));
    localStorage.setItem('santrascan_token', dummyToken);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('santrascan_user');
    localStorage.removeItem('santrascan_token');
  };

  const toggleDemoMode = () => {
    const updated = !demoMode;
    setDemoMode(updated);
    localStorage.setItem('santrascan_demo_mode', updated.toString());
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
      quickSwitchRole,
      demoMode,
      toggleDemoMode,
      isOnline
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
