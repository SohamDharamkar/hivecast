import React, { useState } from 'react';
import { MessageCircle, Video, FileText, Users, Calendar, Clock, Send } from 'lucide-react';

export default function Collaborate() {
  const [activeProject, setActiveProject] = useState('urban-symphony');
  const [newMessage, setNewMessage] = useState('');

  const projects = [
    {
      id: 'urban-symphony',
      title: 'Urban Symphony',
      members: 5,
      lastActivity: '2 hours ago',
    },
    {
      id: 'midnight-dreams',
      title: 'Midnight Dreams',
      members: 8,
      lastActivity: '1 day ago',
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Chen',
      message: 'Just uploaded the latest color grading samples. Take a look when you get a chance!',
      timestamp: '2:30 PM',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50',
    },
    {
      id: 2,
      sender: 'Marcus Johnson',
      message: 'Audio sync is complete for scenes 1-5. Moving on to sound design next.',
      timestamp: '1:45 PM',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50',
    },
    {
      id: 3,
      sender: 'You',
      message: 'Great work everyone! The footage looks amazing. Can we schedule a review session for tomorrow?',
      timestamp: '12:15 PM',
      avatar: null,
    },
  ];

  const tasks = [
    {
      id: 1,
      title: 'Color grade Scene 3',
      assignee: 'Sarah Chen',
      dueDate: 'Tomorrow',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Sound design for chase sequence',
      assignee: 'Marcus Johnson',
      dueDate: 'Jan 20',
      status: 'Pending',
    },
    {
      id: 3,
      title: 'Final cut review',
      assignee: 'Team',
      dueDate: 'Jan 22',
      status: 'Scheduled',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Collaborate</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Video size={16} className="mr-2" />
            Start Call
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText size={16} className="mr-2" />
            Share Files
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Project Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-black mb-4">Active Projects</h2>
            <div className="space-y-2">
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeProject === project.id
                      ? 'bg-blue-100 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-medium text-black text-sm">{project.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Users size={12} />
                      <span>{project.members}</span>
                    </div>
                    <span className="text-xs text-gray-500">{project.lastActivity}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Collaboration Area */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chat */}
            <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-96">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">Team Chat</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'You' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {message.avatar ? (
                        <img
                          src={message.avatar}
                          alt={message.sender}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">You</span>
                        </div>
                      )}
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'You' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-black'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'You' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">Project Tasks</h2>
              </div>
              
              <div className="p-4 space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-black">{task.title}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Assigned to {task.assignee}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>Due {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
            <h2 className="text-lg font-semibold text-black mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-black">Sarah uploaded new color grading samples</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-black">Marcus completed audio sync for Scene 5</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-black">Emma joined the project as editor</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}