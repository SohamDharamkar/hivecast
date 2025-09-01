import React from 'react';
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
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  user: any;
  onLogout: () => void;
}

export default function Sidebar({ currentView, onViewChange, user, onLogout }: SidebarProps) {
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

  return (
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
                onClick={() => onViewChange(item.id)}
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
                onClick={() => onViewChange(item.id)}
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
            onClick={onLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-300 hover:text-black transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}