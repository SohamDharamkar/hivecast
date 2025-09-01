import React, { useState } from 'react';
import { Plus, Calendar, Users, DollarSign, Clock, CheckCircle, AlertCircle, Play } from 'lucide-react';

export default function Productions() {
  const [activeTab, setActiveTab] = useState('overview');

  const productions = [
    {
      id: 1,
      title: 'Urban Symphony',
      type: 'Short Film',
      status: 'In Production',
      progress: 65,
      budget: 15000,
      spent: 9750,
      crew: 8,
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      location: 'Los Angeles, CA',
      director: 'Alex Rodriguez',
    },
    {
      id: 2,
      title: 'Midnight Dreams',
      type: 'Feature Film',
      status: 'Pre-Production',
      progress: 25,
      budget: 85000,
      spent: 12000,
      crew: 15,
      startDate: '2024-02-15',
      endDate: '2024-05-30',
      location: 'New York, NY',
      director: 'Sarah Chen',
    },
    {
      id: 3,
      title: 'Neon Nights',
      type: 'Music Video',
      status: 'Completed',
      progress: 100,
      budget: 8500,
      spent: 8200,
      crew: 5,
      startDate: '2024-01-05',
      endDate: '2024-01-20',
      location: 'Miami, FL',
      director: 'Marcus Johnson',
    },
  ];

  const tasks = [
    {
      id: 1,
      title: 'Location scouting for Scene 5',
      assignee: 'Location Manager',
      dueDate: '2024-01-20',
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Costume fittings for lead actors',
      assignee: 'Costume Designer',
      dueDate: '2024-01-22',
      status: 'Pending',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Equipment pickup from rental house',
      assignee: 'Assistant Director',
      dueDate: '2024-01-18',
      status: 'Completed',
      priority: 'High',
    },
  ];

  const schedule = [
    {
      id: 1,
      date: '2024-01-18',
      time: '08:00 AM',
      activity: 'Crew Call - Studio Setup',
      location: 'Main Studio',
      crew: ['Director', 'DP', 'Gaffer', 'Sound'],
    },
    {
      id: 2,
      date: '2024-01-18',
      time: '10:00 AM',
      activity: 'Scene 3 - Interior Dialogue',
      location: 'Studio A',
      crew: ['Full Crew', 'Actors'],
    },
    {
      id: 3,
      date: '2024-01-18',
      time: '02:00 PM',
      activity: 'Scene 4 - Kitchen Sequence',
      location: 'Studio B',
      crew: ['Director', 'DP', 'Script Supervisor'],
    },
  ];

  const calculateBudgetPercentage = (spent: number, budget: number) => {
    return (spent / budget) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Production Management</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} className="mr-2" />
          New Production
        </button>
      </div>

      {/* Production Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productions.map(production => (
          <div key={production.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">{production.title}</h3>
                <p className="text-sm text-gray-600">{production.type}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                production.status === 'Completed' ? 'bg-green-100 text-green-800' :
                production.status === 'In Production' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {production.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-black">{production.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${production.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center justify-between">
                <span>Budget</span>
                <span className="font-medium text-black">
                  ${production.spent.toLocaleString()} / ${production.budget.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Crew Size</span>
                <span className="font-medium text-black">{production.crew} members</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Location</span>
                <span className="font-medium text-black">{production.location}</span>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Detailed View */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'schedule'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'tasks'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'budget'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Budget
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Production Status</h3>
                <div className="space-y-4">
                  {productions.filter(p => p.status !== 'Completed').map(production => (
                    <div key={production.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-black">{production.title}</h4>
                        <span className="text-sm text-gray-500">{production.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${production.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Director: {production.director}</span>
                        <span>{production.crew} crew members</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Play className="h-6 w-6 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-600">2</span>
                    </div>
                    <p className="text-sm text-blue-800 mt-1">Active Productions</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">1</span>
                    </div>
                    <p className="text-sm text-green-800 mt-1">Completed</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Users className="h-6 w-6 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">28</span>
                    </div>
                    <p className="text-sm text-purple-800 mt-1">Total Crew</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <DollarSign className="h-6 w-6 text-yellow-600" />
                      <span className="text-2xl font-bold text-yellow-600">$108K</span>
                    </div>
                    <p className="text-sm text-yellow-800 mt-1">Total Budget</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">Today's Schedule</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Full Calendar
                </button>
              </div>
              {schedule.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-blue-600">{item.time}</span>
                        <h4 className="font-medium text-black">{item.activity}</h4>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>{item.crew.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">Production Tasks</h3>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Plus size={14} className="mr-2" />
                  Add Task
                </button>
              </div>
              {tasks.map(task => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-black">{task.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Assigned to {task.assignee}</span>
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {productions.map(production => (
                  <div key={production.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-black mb-3">{production.title}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Budget</span>
                        <span className="font-medium text-black">${production.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Spent</span>
                        <span className="font-medium text-black">${production.spent.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Remaining</span>
                        <span className="font-medium text-green-600">
                          ${(production.budget - production.spent).toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            calculateBudgetPercentage(production.spent, production.budget) > 90 
                              ? 'bg-red-600' 
                              : calculateBudgetPercentage(production.spent, production.budget) > 75 
                              ? 'bg-yellow-600' 
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${calculateBudgetPercentage(production.spent, production.budget)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-black mb-4">Budget Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Equipment Rental</span>
                      <span className="text-sm font-medium text-black">$3,200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Location Fees</span>
                      <span className="text-sm font-medium text-black">$2,800</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Crew Payments</span>
                      <span className="text-sm font-medium text-black">$2,500</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Post-Production</span>
                      <span className="text-sm font-medium text-black">$750</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Catering</span>
                      <span className="text-sm font-medium text-black">$350</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Miscellaneous</span>
                      <span className="text-sm font-medium text-black">$150</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}