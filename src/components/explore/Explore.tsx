import React, { useState } from 'react';
import { Search, Filter, Heart, Eye, Star, Calendar } from 'lucide-react';

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'film', label: 'Film' },
    { id: 'music', label: 'Music' },
    { id: 'documentary', label: 'Documentary' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'animation', label: 'Animation' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Midnight Dreams',
      description: 'A noir-inspired short film exploring themes of memory and identity in urban landscapes.',
      category: 'film',
      creator: 'Alex Rodriguez',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 24,
      views: 156,
      rating: 4.8,
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      title: 'Echoes of Tomorrow',
      description: 'An experimental music video combining live action with cutting-edge VFX.',
      category: 'music',
      creator: 'Maya Patel',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 18,
      views: 89,
      rating: 4.6,
      createdAt: '2024-01-12',
    },
    {
      id: 3,
      title: 'Ocean Guardians',
      description: 'Documentary following marine biologists working to protect endangered coral reefs.',
      category: 'documentary',
      creator: 'David Kim',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 31,
      views: 203,
      rating: 4.9,
      createdAt: '2024-01-10',
    },
    {
      id: 4,
      title: 'Brand Revolution',
      description: 'High-energy commercial showcasing the future of sustainable fashion.',
      category: 'commercial',
      creator: 'Sophie Turner',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 15,
      views: 67,
      rating: 4.4,
      createdAt: '2024-01-08',
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Explore Projects</h1>
        <div className="text-sm text-gray-500">
          Discover amazing creative work from the community
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects, creators, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} className="mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <Heart size={16} className="text-gray-600 hover:text-red-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-black">{project.title}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {project.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>by {project.creator}</span>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span>{project.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart size={14} />
                    <span>{project.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{project.views}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar size={12} />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}