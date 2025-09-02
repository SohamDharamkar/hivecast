import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: string;
  isPublic: boolean;
  status: string;
  progress: number;
  collaborators: number;
  createdAt: string;
  creatorId: string;
  image?: string;
}

interface Settings {
  theme: 'dark' | 'light';
  notifications: boolean;
  emailUpdates: boolean;
  publicProfile: boolean;
  showLocation: boolean;
  language: string;
}

interface AppContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'status' | 'progress' | 'collaborators'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('hivecast_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('hivecast_settings');
    return saved ? JSON.parse(saved) : {
      theme: 'dark',
      notifications: true,
      emailUpdates: false,
      publicProfile: true,
      showLocation: true,
      language: 'en',
    };
  });

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'status' | 'progress' | 'collaborators'>) => {
    const newProject: Project = {
      ...projectData,
      id: 'project-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'Pre-Production',
      progress: 0,
      collaborators: 1,
    };
    
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('hivecast_projects', JSON.stringify(updatedProjects));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, ...updates } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('hivecast_projects', JSON.stringify(updatedProjects));
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('hivecast_projects', JSON.stringify(updatedProjects));
  };

  const updateSettings = (updates: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...updates };
    setSettings(updatedSettings);
    localStorage.setItem('hivecast_settings', JSON.stringify(updatedSettings));
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    settings,
    updateSettings,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}