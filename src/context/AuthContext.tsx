import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTourContext } from './TourContext';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'recruiter';
  avatar?: string;
  hasCompletedOnboarding?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  forgotPassword: (email: string) => Promise<{ error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const tourContext = useTourContext();

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('synapse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (password.length < 6) {
      setIsLoading(false);
      return { error: 'Invalid email or password' };
    }

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role: 'recruiter',
      hasCompletedOnboarding: true,
    };

    localStorage.setItem('synapse_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
    
    // Check if user needs to see the tour
    const hasSeenTour = localStorage.getItem('synapse_tour_completed') === 'true';
    if (!hasSeenTour && mockUser.hasCompletedOnboarding && tourContext) {
      setTimeout(() => {
        tourContext.startTour('auto');
      }, 1000);
    }
    
    return {};
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = localStorage.getItem(`user_${email}`);
    if (existingUser) {
      setIsLoading(false);
      return { error: 'An account with this email already exists' };
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'recruiter',
      hasCompletedOnboarding: false,
    };

    localStorage.setItem('synapse_user', JSON.stringify(newUser));
    localStorage.setItem(`user_${email}`, JSON.stringify({ password }));
    setUser(newUser);
    setIsLoading(false);
    
    return {};
  };

  const logout = () => {
    localStorage.removeItem('synapse_user');
    setUser(null);
    navigate('/auth/login');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('synapse_user', JSON.stringify(updatedUser));
    }
  };

  const forgotPassword = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('reset_email', email);
    return {};
  };

  const resetPassword = async (token: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {};
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
