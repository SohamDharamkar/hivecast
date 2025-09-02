import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { BarChart3, TrendingUp, Users, FolderOpen, Calendar, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const { projects } = useApp();

  const stats = [
    {
      title: 'Active Projects',
      value: projects.filter(p => p.status === 'In Progress').length,
      change: '+2 from last month',
      icon: FolderOpen,
      color: 'blue',
    },
    {
      title: 'Collaborations',
      value: projects.reduce((sum, p) => sum + p.collaborators, 0),
      change: '+3 new this week',
      icon: Users,
      color: 'green',
    },
    {
      title: 'Upcoming Events',
      value: 5,
      change: 'Next: Tomorrow 2PM',
      icon: Calendar,
      color: 'purple',
    },
    {
      title: 'Total Budget',
      value: '$45.2K',
      change: '+$12K this month',
      icon: DollarSign,
      color: 'yellow',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'yellow': return 'from-yellow-500 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-gray-400">
          Welcome back! Here's what's happening with your projects.
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, rotateY: 5 }}
              className="glass rounded-2xl p-6 card-3d hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClasses(stat.color)} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 card-3d"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Project Collaboration</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { label: 'Film Production', percentage: 75, color: 'blue' },
              { label: 'Music Video', percentage: 90, color: 'green' },
              { label: 'Documentary', percentage: 45, color: 'yellow' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-300">{item.label}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`bg-gradient-to-r ${getColorClasses(item.color)} h-2 rounded-full`}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8">{item.percentage}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 card-3d"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { text: 'New collaboration request from Sarah Chen', time: '2 hours ago', color: 'blue' },
              { text: 'Project "Midnight Dreams" completed', time: '1 day ago', color: 'green' },
              { text: 'Equipment rental booking confirmed', time: '3 days ago', color: 'purple' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-gray-800 rounded-xl border border-gray-700"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className={`w-3 h-3 bg-gradient-to-r ${getColorClasses(activity.color)} rounded-full mt-1`}
                />
                <div>
                  <p className="text-sm text-white">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl card-3d"
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Collaborators
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projects.slice(0, 3).map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{project.title}</div>
                      <div className="text-sm text-gray-400">{project.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'Completed' ? 'bg-green-600 text-green-100' :
                      project.status === 'In Progress' ? 'bg-blue-600 text-blue-100' :
                      'bg-yellow-600 text-yellow-100'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {project.collaborators} members
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-gray-400">{project.progress}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}