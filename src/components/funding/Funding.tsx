import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Target, Calendar, Heart, Share2 } from 'lucide-react';

export default function Funding() {
  const [activeTab, setActiveTab] = useState('browse');

  const fundingOpportunities = [
    {
      id: 1,
      title: 'Ocean Guardians Documentary',
      creator: 'David Kim',
      description: 'Help us complete this important documentary about marine conservation.',
      goal: 50000,
      raised: 32500,
      backers: 127,
      daysLeft: 15,
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Documentary',
    },
    {
      id: 2,
      title: 'Indie Horror Feature',
      creator: 'Maya Patel',
      description: 'A psychological thriller that explores the depths of human fear.',
      goal: 75000,
      raised: 18750,
      backers: 89,
      daysLeft: 28,
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Feature Film',
    },
    {
      id: 3,
      title: 'Animated Short Series',
      creator: 'Alex Rodriguez',
      description: 'A collection of animated shorts exploring themes of identity and belonging.',
      goal: 25000,
      raised: 21000,
      backers: 156,
      daysLeft: 7,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Animation',
    },
  ];

  const myProjects = [
    {
      id: 1,
      title: 'Urban Symphony',
      goal: 15000,
      raised: 8500,
      backers: 42,
      daysLeft: 12,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Neon Nights Music Video',
      goal: 5000,
      raised: 5000,
      backers: 28,
      daysLeft: 0,
      status: 'Funded',
    },
  ];

  const calculatePercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Funding</h1>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <DollarSign size={16} className="mr-2" />
          Start Campaign
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-black">$13.5K</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">+$2.1K this month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-black">2</p>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">1 ending soon</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Backers</p>
              <p className="text-2xl font-bold text-black">70</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">+12 new backers</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-black">85%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Above average</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'browse'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Browse Projects
            </button>
            <button
              onClick={() => setActiveTab('my-campaigns')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'my-campaigns'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Campaigns
            </button>
            <button
              onClick={() => setActiveTab('backed')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'backed'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Projects I've Backed
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'browse' && (
            <div className="space-y-6">
              {fundingOpportunities.map(project => (
                <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-black mb-1">{project.title}</h3>
                          <p className="text-gray-600">by {project.creator}</p>
                        </div>
                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {project.category}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{project.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-black">
                            ${project.raised.toLocaleString()} of ${project.goal.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${calculatePercentage(project.raised, project.goal)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Users size={14} />
                            <span>{project.backers} backers</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{project.daysLeft} days left</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <Heart size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                            <Share2 size={16} />
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            Back Project
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'my-campaigns' && (
            <div className="space-y-4">
              {myProjects.map(project => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-black">{project.title}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                        project.status === 'Funded' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-black">
                        ${project.raised.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        of ${project.goal.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${calculatePercentage(project.raised, project.goal)}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{project.backers} backers</span>
                      <span>{project.daysLeft > 0 ? `${project.daysLeft} days left` : 'Campaign ended'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'backed' && (
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No backed projects yet</h3>
              <p className="text-gray-500">Start supporting creative projects to see them here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}