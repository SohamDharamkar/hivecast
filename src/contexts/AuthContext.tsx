import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  skills?: string[];
  experience?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
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
    // Check for existing session
    const savedUser = localStorage.getItem('hivecast_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Demo login with enhanced user data
    const demoUser: User = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName: email.split('@')[0],
      bio: 'Passionate filmmaker with years of experience in cinematography and directing.',
      location: 'Los Angeles, CA',
      phone: '+1 (555) 123-4567',
      website: 'www.example.com',
      skills: ['Cinematography', 'Directing', 'Color Grading', 'Lighting Design'],
      experience: '5+ years',
      role: 'Director / Cinematographer',
    };
    setUser(demoUser);
    localStorage.setItem('hivecast_user', JSON.stringify(demoUser));
  };

  const register = async (email: string, password: string, displayName?: string) => {
    // Demo registration with enhanced user data
    const demoUser: User = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName: displayName || email.split('@')[0],
      bio: 'New to the platform and excited to collaborate on creative projects.',
      location: 'Enter your location',
      phone: 'Enter your phone',
      website: 'Enter your website',
      skills: [],
      experience: 'Enter your experience',
      role: 'Enter your role',
    };
    setUser(demoUser);
    localStorage.setItem('hivecast_user', JSON.stringify(demoUser));
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('hivecast_user', JSON.stringify(updatedUser));
    }
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
    updateProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}