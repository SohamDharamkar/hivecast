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

interface Event {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  type: string;
  attendees: number;
  isPublic: boolean;
  createdAt: string;
  creatorId: string;
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
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  exportData: () => void;
  deleteAllData: () => void;
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

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('hivecast_events');
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

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: 'event-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('hivecast_events', JSON.stringify(updatedEvents));
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    const updatedEvents = events.map(event =>
      event.id === id ? { ...event, ...updates } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('hivecast_events', JSON.stringify(updatedEvents));
  };

  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('hivecast_events', JSON.stringify(updatedEvents));
  };

  const updateSettings = (updates: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...updates };
    setSettings(updatedSettings);
    localStorage.setItem('hivecast_settings', JSON.stringify(updatedSettings));
    
    // Apply theme changes immediately
    if (updates.theme) {
      document.documentElement.classList.toggle('dark', updates.theme === 'dark');
      document.documentElement.classList.toggle('light', updates.theme === 'light');
    }
  };

  const exportData = () => {
    const data = {
      projects,
      events,
      settings,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hivecast-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      localStorage.removeItem('hivecast_projects');
      localStorage.removeItem('hivecast_events');
      localStorage.removeItem('hivecast_settings');
      localStorage.removeItem('hivecast_user');
      
      setProjects([]);
      setEvents([]);
      setSettings({
        theme: 'dark',
        notifications: true,
        emailUpdates: false,
        publicProfile: true,
        showLocation: true,
        language: 'en',
      });
      
      window.location.reload();
    }
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    settings,
    updateSettings,
    exportData,
    deleteAllData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}