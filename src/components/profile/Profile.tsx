import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, Edit3, MapPin, Calendar, Mail, Phone, Globe, Star, Upload, X, Plus } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    phone: user?.phone || '',
    website: user?.website || '',
    skills: user?.skills || [],
    experience: user?.experience || '',
    role: user?.role || '',
  });
  const [newSkill, setNewSkill] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
          const photoURL = reader.result as string;
          updateProfile({ photoURL });
        };
        reader.readAsDataURL(file);
      }
    }
  });

  const handleSave = () => {
    updateProfile(profileData);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const projects = [
    {
      id: 1,
      title: 'Urban Symphony',
      type: 'Short Film',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Completed',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Midnight Dreams',
      type: 'Feature Film',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'In Progress',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Neon Nights',
      type: 'Music Video',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Pre-Production',
      rating: 4.7,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
        >
          <Edit3 size={16} className="mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="glass rounded-2xl p-6 card-3d">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                {user?.photoURL ? (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-500 shadow-lg"
                  />
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <Camera size={40} className="text-white" />
                  </motion.div>
                )}
                
                {isEditing && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    {...getRootProps()}
                    className={`absolute inset-0 rounded-full border-2 border-dashed border-blue-400 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer transition-colors ${
                      isDragActive ? 'border-blue-600 bg-blue-600 bg-opacity-20' : ''
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload size={24} className="text-white" />
                  </motion.div>
                )}
              </div>
              
              {isEditing ? (
                <motion.input
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                  className="text-xl font-bold text-white text-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <h2 className="text-xl font-bold text-white">{profileData.displayName}</h2>
              )}
              
              {isEditing ? (
                <motion.input
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="text"
                  value={profileData.role}
                  onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                  className="text-gray-400 text-center w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-400">{profileData.role}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-300">
                <Mail size={16} className="mr-3 text-blue-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span>{profileData.email}</span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-300">
                <Phone size={16} className="mr-3 text-green-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span>{profileData.phone}</span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-300">
                <MapPin size={16} className="mr-3 text-red-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span>{profileData.location}</span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-300">
                <Globe size={16} className="mr-3 text-purple-400" />
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <a href={`https://${profileData.website}`} className="text-blue-400 hover:underline">
                    {profileData.website}
                  </a>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Skills</h3>
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={addSkill}
                    className="p-1 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={12} className="text-white" />
                  </motion.button>
                )}
              </div>
              
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-3"
                >
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </motion.div>
              )}
              
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {profileData.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-600 text-white relative group"
                    >
                      {skill}
                      {isEditing && (
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => removeSkill(skill)}
                          className="ml-2 p-0.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={8} className="text-white" />
                        </motion.button>
                      )}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-6 card-3d"
          >
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            {isEditing ? (
              <motion.textarea
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={4}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
            )}
          </motion.div>

          {/* Portfolio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 card-3d"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Portfolio</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                View All
              </motion.button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, rotateY: 5 }}
                  className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 card-3d"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-white mb-1">{project.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{project.type}</p>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Completed' ? 'bg-green-600 text-green-100' :
                        project.status === 'In Progress' ? 'bg-blue-600 text-blue-100' :
                        'bg-yellow-600 text-yellow-100'
                      }`}>
                        {project.status}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span>{project.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 card-3d"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Experience</h3>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl border border-gray-700"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Camera size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">Senior Cinematographer</h4>
                  <p className="text-sm text-gray-400">Independent Productions</p>
                  <p className="text-xs text-gray-500">2020 - Present</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 p-4 bg-gray-800 rounded-xl border border-gray-700"
              >
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">Film Director</h4>
                  <p className="text-sm text-gray-400">Creative Studios Inc.</p>
                  <p className="text-xs text-gray-500">2018 - 2020</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}