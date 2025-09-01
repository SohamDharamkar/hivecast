import React, { useState } from 'react';
import { Search, Filter, UserPlus, Star, MapPin, Calendar, DollarSign, Briefcase } from 'lucide-react';

export default function FindCrew() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  const roles = [
    { id: 'all', label: 'All Roles' },
    { id: 'director', label: 'Director' },
    { id: 'cinematographer', label: 'Cinematographer' },
    { id: 'editor', label: 'Editor' },
    { id: 'sound', label: 'Sound Engineer' },
    { id: 'producer', label: 'Producer' },
    { id: 'gaffer', label: 'Gaffer' },
    { id: 'grip', label: 'Grip' },
    { id: 'makeup', label: 'Makeup Artist' },
  ];

  const availabilityOptions = [
    { id: 'all', label: 'All Availability' },
    { id: 'immediate', label: 'Available Now' },
    { id: 'week', label: 'Within a Week' },
    { id: 'month', label: 'Within a Month' },
  ];

  const crewMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Cinematographer',
      location: 'Los Angeles, CA',
      experience: '6 years',
      rating: 4.9,
      reviews: 23,
      dailyRate: 650,
      availability: 'Available Now',
      skills: ['RED Camera', 'Color Grading', 'Steadicam'],
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      recentWork: ['Feature Film: "Midnight Dreams"', 'Commercial: "Tech Innovation"'],
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Sound Engineer',
      location: 'New York, NY',
      experience: '10 years',
      rating: 4.8,
      reviews: 41,
      dailyRate: 450,
      availability: 'Available Jan 25',
      skills: ['Pro Tools', 'Field Recording', 'Mixing'],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      recentWork: ['Documentary: "Urban Voices"', 'Short Film: "Silent Echoes"'],
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Editor',
      location: 'Austin, TX',
      experience: '4 years',
      rating: 4.7,
      reviews: 18,
      dailyRate: 400,
      availability: 'Available Now',
      skills: ['Avid', 'Premiere Pro', 'DaVinci Resolve'],
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      recentWork: ['Music Video: "Electric Dreams"', 'Commercial: "Fashion Forward"'],
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Gaffer',
      location: 'Chicago, IL',
      experience: '8 years',
      rating: 4.9,
      reviews: 29,
      dailyRate: 550,
      availability: 'Available Feb 1',
      skills: ['LED Lighting', 'HMI', 'Electrical'],
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      recentWork: ['Feature Film: "City Lights"', 'Series: "Night Shift"'],
    },
  ];

  const filteredCrew = crewMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedRole === 'all' || member.role.toLowerCase().includes(selectedRole);
    const matchesAvailability = selectedAvailability === 'all' || 
                               (selectedAvailability === 'immediate' && member.availability.includes('Available Now'));
    return matchesSearch && matchesRole && matchesAvailability;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Find Crew</h1>
        <div className="text-sm text-gray-500">
          {crewMembers.length} professionals available
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, role, skills, or location..."
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
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availabilityOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
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

      {/* Crew Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCrew.map(member => (
          <div key={member.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-black">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{member.rating}</span>
                  <span className="text-xs text-gray-500">({member.reviews} reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-black">${member.dailyRate}</p>
                <p className="text-xs text-gray-500">per day</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={14} className="mr-2" />
                <span>{member.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase size={14} className="mr-2" />
                <span>{member.experience} experience</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar size={14} className="mr-2 text-gray-400" />
                <span className={`font-medium ${
                  member.availability.includes('Available Now') 
                    ? 'text-green-600' 
                    : 'text-yellow-600'
                }`}>
                  {member.availability}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">SKILLS</p>
              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">RECENT WORK</p>
              <div className="space-y-1">
                {member.recentWork.map((work, index) => (
                  <p key={index} className="text-xs text-gray-600">{work}</p>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                <UserPlus size={14} className="mr-2" />
                Hire
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                View Portfolio
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCrew.length === 0 && (
        <div className="text-center py-12">
          <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No crew members found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}