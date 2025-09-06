import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { createUserProfile, getUserProfile, updateUserProfile } from '../services/firebase';

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
  portfolio?: string[];
  isPublic?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
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
    if (!isFirebaseConfigured()) {
      // Demo mode - check localStorage
      const savedUser = localStorage.getItem('hivecast_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
      return;
    }

    // Firebase mode
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional profile data from Firestore
        const profile = await getUserProfile(firebaseUser.uid);
        
        const userData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || profile?.displayName || '',
          photoURL: firebaseUser.photoURL || profile?.photoURL,
          bio: profile?.bio || '',
          location: profile?.location || '',
          phone: profile?.phone || '',
          website: profile?.website || '',
          skills: profile?.skills || [],
          experience: profile?.experience || '',
          role: profile?.role || '',
          portfolio: profile?.portfolio || [],
          isPublic: profile?.isPublic ?? true,
        };
        
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    if (!isFirebaseConfigured()) {
      // Demo mode
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
        portfolio: [],
        isPublic: true,
      };
      setUser(demoUser);
      localStorage.setItem('hivecast_user', JSON.stringify(demoUser));
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to log in');
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    if (!isFirebaseConfigured()) {
      // Demo mode
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
        portfolio: [],
        isPublic: true,
      };
      setUser(demoUser);
      localStorage.setItem('hivecast_user', JSON.stringify(demoUser));
      return;
    }

    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(firebaseUser, { displayName });
      }

      // Create user profile in Firestore
      await createUserProfile({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: displayName || email.split('@')[0],
        bio: '',
        location: '',
        phone: '',
        website: '',
        skills: [],
        experience: '',
        role: '',
        portfolio: [],
        isPublic: true,
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const logout = async () => {
    if (!isFirebaseConfigured()) {
      // Demo mode
      setUser(null);
      localStorage.removeItem('hivecast_user');
      return;
    }

    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Failed to log out');
    }
  };

  const updateUserProfileData = async (updates: Partial<User>) => {
    if (!user) return;

    if (!isFirebaseConfigured()) {
      // Demo mode
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('hivecast_user', JSON.stringify(updatedUser));
      return;
    }

    try {
      // Update Firebase Auth profile if needed
      if (updates.displayName || updates.photoURL) {
        await updateProfile(auth.currentUser!, {
          displayName: updates.displayName || auth.currentUser!.displayName,
          photoURL: updates.photoURL || auth.currentUser!.photoURL,
        });
      }

      // Update Firestore profile
      await updateUserProfile(user.uid, updates);
      
      // Update local state
      setUser({ ...user, ...updates });
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserProfile: updateUserProfileData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}