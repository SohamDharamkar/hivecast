import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Explore from './components/explore/Explore';
import Profile from './components/profile/Profile';
import Projects from './components/projects/Projects';
import Network from './components/network/Network';
import Jobs from './components/jobs/Jobs';
import Collaborate from './components/collaborate/Collaborate';
import Funding from './components/funding/Funding';
import GearRental from './components/gear/GearRental';
import Spaces from './components/spaces/Spaces';
import FindCrew from './components/crew/FindCrew';
import Accommodation from './components/accommodation/Accommodation';
import Productions from './components/productions/Productions';
import Sidebar from './components/layout/Sidebar';
import { 
  Home, 
  Search, 
  User, 
  FolderPlus, 
  Users, 
  Briefcase, 
  GitBranch, 
  DollarSign, 
  Camera, 
  MapPin, 
  UserPlus, 
  Bed, 
  Clapperboard,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

function AppContent() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderPlus },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'collaborate', label: 'Collaborate', icon: GitBranch },
    { id: 'funding', label: 'Funding', icon: DollarSign },
    { id: 'gear', label: 'Gear Rental', icon: Camera },
    { id: 'spaces', label: 'Spaces', icon: MapPin },
    { id: 'crew', label: 'Find Crew', icon: UserPlus },
    { id: 'accommodation', label: 'Accommodation', icon: Bed },
    { id: 'productions', label: 'Productions', icon: Clapperboard },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'explore':
        return <Explore />;
      case 'profile':
        return <Profile />;
      case 'projects':
        return <Projects />;
      case 'network':
        return <Network />;
      case 'jobs':
        return <Jobs />;
      case 'collaborate':
        return <Collaborate />;
      case 'funding':
        return <Funding />;
      case 'gear':
        return <GearRental />;
      case 'spaces':
        return <Spaces />;
      case 'crew':
        return <FindCrew />;
      case 'accommodation':
        return <Accommodation />;
      case 'productions':
        return <Productions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-200 border-r border-gray-300 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-black">HiveCast</h1>
            <p className="text-sm text-gray-600">Creative Professional Platform</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Main
              </p>
              {navigationItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-white text-black border border-gray-300'
                        : 'text-gray-600 hover:bg-gray-300 hover:text-black'
                    }`}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mt-6">
                Platform
              </p>
              {navigationItems.slice(3).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-white text-black border border-gray-300'
                        : 'text-gray-600 hover:bg-gray-300 hover:text-black'
                    }`}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-300">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Creative Professional
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-300 hover:text-black transition-colors">
                <Settings size={18} className="mr-3" />
                Settings
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-300 hover:text-black transition-colors"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-auto p-6">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;