import React, { useState } from 'react';
import { Search, Filter, UserPlus, MessageCircle, Star, MapPin, Briefcase, Eye } from 'lucide-react';

export default function Network() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const roles = [
    { id: 'all', label: 'All Roles' },
    { id: 'director', label: 'Director' },
    { id: 'cinematographer', label: 'Cinematographer' },
    { id: 'editor', label: 'Editor' },
    { id: 'sound', label: 'Sound Engineer' },
    { id: 'producer', label: 'Producer' },
    { id: 'actor', label: 'Actor' },
  ];

  const professionals = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Cinematographer',
      location: 'New York, NY',
      experience: '6 years',
      rating: 4.9,
      projects: 23,
      skills: ['RED Camera', 'Color Grading', 'Lighting'],
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      isConnected: false,
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Sound Engineer',
      location: 'Los Angeles, CA',
      experience: '10 years',
      rating: 4.8,
      projects: 45,
      skills: ['Pro Tools', 'Field Recording', 'Mixing'],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      isConnected: true,
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Editor',
      location: 'Austin, TX',
      experience: '4 years',
      rating: 4.7,
      projects: 18,
      skills: ['Avid', 'Premiere Pro', 'DaVinci Resolve'],
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      isConnected: false,
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Director',
      location: 'San Francisco, CA',
      experience: '12 years',
      rating: 4.9,
      projects: 31,
      skills: ['Narrative', 'Documentary', 'Commercial'],
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      isConnected: false,
    },
  ];

  const filteredProfessionals = professionals.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedRole === 'all' || person.role.toLowerCase().includes(selectedRole);
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Professional Network</h1>
        <div className="text-sm text-gray-500">
          Connect with {professionals.length} creative professionals
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, role, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.map(person => (
          <div key={person.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-black truncate">{person.name}</h3>
                <p className="text-sm text-gray-600">{person.role}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{person.rating}</span>
                  <span className="text-xs text-gray-500">({person.projects} projects)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={14} className="mr-2" />
                <span>{person.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase size={14} className="mr-2" />
                <span>{person.experience} experience</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">SKILLS</p>
              <div className="flex flex-wrap gap-1">
                {person.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              {person.isConnected ? (
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  <MessageCircle size={14} className="mr-2" />
                  Message
                </button>
              ) : (
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <UserPlus size={14} className="mr-2" />
                  Connect
                </button>
              )}
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProfessionals.length === 0 && (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No professionals found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}