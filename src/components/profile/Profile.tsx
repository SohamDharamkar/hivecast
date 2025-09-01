import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, Edit3, MapPin, Calendar, Mail, Phone, Globe, Star } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: 'Passionate filmmaker with 8+ years of experience in cinematography and directing. Specialized in narrative storytelling and visual composition.',
    location: 'Los Angeles, CA',
    phone: '+1 (555) 123-4567',
    website: 'www.alexrodriguez.com',
    skills: ['Cinematography', 'Directing', 'Color Grading', 'Lighting Design'],
    experience: '8+ years',
    role: 'Director / Cinematographer',
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to Firebase
  };

  const projects = [
    {
      id: 1,
      title: 'Urban Symphony',
      type: 'Short Film',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Midnight Dreams',
      type: 'Feature Film',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Neon Nights',
      type: 'Music Video',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Pre-Production',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit3 size={16} className="mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera size={32} className="text-gray-500" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <Camera size={14} />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                  className="text-xl font-bold text-black text-center w-full border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <h2 className="text-xl font-bold text-black">{profileData.displayName}</h2>
              )}
              
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.role}
                  onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                  className="text-gray-600 text-center w-full border border-gray-300 rounded px-2 py-1 mt-1"
                />
              ) : (
                <p className="text-gray-600">{profileData.role}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={16} className="mr-3" />
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  <span>{profileData.email}</span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-3" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  <span>{profileData.phone}</span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  <span>{profileData.location}</span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Globe size={16} className="mr-3" />
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    className="flex-1 border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  <a href={`https://${profileData.website}`} className="text-blue-600 hover:underline">
                    {profileData.website}
                  </a>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-black mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-black mb-4">About</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-600">{profileData.bio}</p>
            )}
          </div>

          {/* Portfolio */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-black">Portfolio</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(project => (
                <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-medium text-black mb-1">{project.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{project.type}</p>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Experience</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Camera size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-black">Senior Cinematographer</h4>
                  <p className="text-sm text-gray-600">Independent Productions</p>
                  <p className="text-xs text-gray-500">2020 - Present</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-black">Film Director</h4>
                  <p className="text-sm text-gray-600">Creative Studios Inc.</p>
                  <p className="text-xs text-gray-500">2018 - 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}