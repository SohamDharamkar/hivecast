import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('hivecast_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Demo login - in real app this would use Firebase
    const demoUser: User = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName: email.split('@')[0],
    };
    setUser(demoUser);
    localStorage.setItem('hivecast_user', JSON.stringify(demoUser));
  };

  const register = async (email: string, password: string, displayName?: string) => {
    // Demo registration - in real app this would use Firebase
    const demoUser: User = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName: displayName || email.split('@')[0],
    };
    setUser(demoUser);
    localStorage.setItem('hivecast_user', JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hivecast_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}