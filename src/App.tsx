import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
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
import Settings from './components/settings/Settings';
import Events from './components/events/Events';
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
  Calendar,
  Settings as SettingsIcon,
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
    { id: 'events', label: 'Events', icon: Calendar },
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
      case 'events':
        return <Events />;
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
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Mobile menu button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gray-800 border-r border-gray-700"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border-b border-gray-700"
          >
            <div className="gradient-animate bg-clip-text text-transparent">
              <h1 className="text-3xl font-bold">HiveCast</h1>
            </div>
            <p className="text-sm text-gray-400 mt-1">Creative Professional Platform</p>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Main
              </p>
              {navigationItems.slice(0, 3).map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mt-6">
                Platform
              </p>
              {navigationItems.slice(3).map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 3) * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* User section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border-t border-gray-700"
          >
            <div className="flex items-center mb-4 p-3 bg-gray-700 rounded-xl">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <User size={18} className="text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user.role || 'Creative Professional'}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView('settings')}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 rounded-xl hover:bg-gray-700 hover:text-white transition-all duration-200"
              >
                <SettingsIcon size={18} className="mr-3" />
                Settings
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-200"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;