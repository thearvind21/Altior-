import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = {
  email: 'admin@altior.com',
  password: '123456',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('altior_admin_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const userData = {
        email,
        name: 'Admin User',
        role: 'Super Admin',
        avatar: 'AU',
        loginTime: new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('altior_admin_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('altior_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
