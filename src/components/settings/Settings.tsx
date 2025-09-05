import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { 
  Moon, 
  Sun, 
  Bell, 
  Mail, 
  Globe, 
  Eye, 
  MapPin, 
  Palette,
  Shield,
  Download,
  Trash2,
  Check,
  X
} from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings, exportData, deleteAllData } = useApp();

  // Apply theme on component mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.documentElement.classList.toggle('light', settings.theme === 'light');
  }, [settings.theme]);

  const settingSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          id: 'theme',
          label: 'Theme',
          description: 'Choose your preferred theme',
          type: 'select',
          value: settings.theme,
          options: [
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'light', label: 'Light', icon: Sun },
          ],
        },
      ],
    },
    {
      title: 'Privacy',
      icon: Shield,
      settings: [
        {
          id: 'publicProfile',
          label: 'Public Profile',
          description: 'Make your profile visible to other users',
          type: 'toggle',
          value: settings.publicProfile,
        },
        {
          id: 'showLocation',
          label: 'Show Location',
          description: 'Display your location on your profile',
          type: 'toggle',
          value: settings.showLocation,
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          id: 'notifications',
          label: 'Push Notifications',
          description: 'Receive notifications for important updates',
          type: 'toggle',
          value: settings.notifications,
        },
        {
          id: 'emailUpdates',
          label: 'Email Updates',
          description: 'Receive email notifications for project updates',
          type: 'toggle',
          value: settings.emailUpdates,
        },
      ],
    },
    {
      title: 'General',
      icon: Globe,
      settings: [
        {
          id: 'language',
          label: 'Language',
          description: 'Choose your preferred language',
          type: 'select',
          value: settings.language,
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
            { value: 'de', label: 'Deutsch' },
          ],
        },
      ],
    },
  ];

  const handleSettingChange = (settingId: string, value: any) => {
    updateSettings({ [settingId]: value });
    
    // Show feedback for setting changes
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = 'Setting updated successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  const handleExportData = () => {
    exportData();
    
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = 'Data exported successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <div className="text-sm text-gray-400">
          Customize your HiveCast experience
        </div>
      </motion.div>

      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="glass rounded-2xl p-6 card-3d"
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-600 rounded-lg mr-3">
                  <SectionIcon size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting, settingIndex) => (
                  <motion.div
                    key={setting.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (settingIndex * 0.05) }}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-white">{setting.label}</h3>
                      <p className="text-xs text-gray-400 mt-1">{setting.description}</p>
                    </div>
                    
                    <div className="ml-4">
                      {setting.type === 'toggle' ? (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSettingChange(setting.id, !setting.value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            setting.value ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                        >
                          <motion.span
                            animate={{ x: setting.value ? 20 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
                          />
                        </motion.button>
                      ) : setting.type === 'select' ? (
                        <select
                          value={setting.value}
                          onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                          {setting.options?.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 card-3d"
        >
          <div className="flex items-center mb-6">
            <div className="p-2 bg-red-600 rounded-lg mr-3">
              <Shield size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Data Management</h2>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExportData}
              className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-center">
                <Download size={16} className="mr-3 text-blue-400" />
                <div className="text-left">
                  <h3 className="text-sm font-medium text-white">Export Data</h3>
                  <p className="text-xs text-gray-400">Download all your data as JSON</p>
                </div>
              </div>
              <div className="text-blue-400 group-hover:text-blue-300">
                <Download size={16} />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={deleteAllData}
              className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-red-600 hover:bg-red-600 transition-colors group"
            >
              <div className="flex items-center">
                <Trash2 size={16} className="mr-3 text-red-400 group-hover:text-white" />
                <div className="text-left">
                  <h3 className="text-sm font-medium text-white">Delete Account</h3>
                  <p className="text-xs text-gray-400 group-hover:text-red-100">Permanently delete all your data</p>
                </div>
              </div>
              <div className="text-red-400 group-hover:text-white">
                <Trash2 size={16} />
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Current Settings Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 card-3d"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Current Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Theme:</span>
                <span className="text-white capitalize">{settings.theme}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Language:</span>
                <span className="text-white">{settingSections[3].settings[0].options?.find(o => o.value === settings.language)?.label}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Public Profile:</span>
                <span className={`text-sm ${settings.publicProfile ? 'text-green-400' : 'text-red-400'}`}>
                  {settings.publicProfile ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Notifications:</span>
                <span className={`text-sm ${settings.notifications ? 'text-green-400' : 'text-red-400'}`}>
                  {settings.notifications ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Email Updates:</span>
                <span className={`text-sm ${settings.emailUpdates ? 'text-green-400' : 'text-red-400'}`}>
                  {settings.emailUpdates ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Show Location:</span>
                <span className={`text-sm ${settings.showLocation ? 'text-green-400' : 'text-red-400'}`}>
                  {settings.showLocation ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}