import React, { useState } from 'react';
import { Search, Filter, Camera, Mic, Monitor, Calendar, DollarSign, MapPin, Star } from 'lucide-react';

export default function GearRental() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'cameras', label: 'Cameras' },
    { id: 'lenses', label: 'Lenses' },
    { id: 'audio', label: 'Audio' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'monitors', label: 'Monitors' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const equipment = [
    {
      id: 1,
      name: 'RED Komodo 6K Camera',
      category: 'cameras',
      owner: 'Pro Gear Rentals',
      location: 'Los Angeles, CA',
      dailyRate: 450,
      weeklyRate: 2700,
      rating: 4.9,
      reviews: 23,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      description: 'Professional 6K cinema camera with global shutter. Perfect for high-end productions.',
      specs: ['6K Resolution', 'Global Shutter', 'Canon RF Mount'],
    },
    {
      id: 2,
      name: 'Sony FX6 Full Frame Camera',
      category: 'cameras',
      owner: 'Cinema Solutions',
      location: 'New York, NY',
      dailyRate: 350,
      weeklyRate: 2100,
      rating: 4.8,
      reviews: 18,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      description: 'Versatile full-frame camera ideal for documentaries and narrative work.',
      specs: ['4K 120fps', 'Full Frame', 'Dual Base ISO'],
    },
    {
      id: 3,
      name: 'Rode Wireless Pro Mic System',
      category: 'audio',
      owner: 'Audio Experts',
      location: 'Austin, TX',
      dailyRate: 75,
      weeklyRate: 450,
      rating: 4.7,
      reviews: 31,
      image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: false,
      description: 'Professional wireless microphone system with 32-bit float recording.',
      specs: ['32-bit Float', '2.4GHz', '40-hour Battery'],
    },
    {
      id: 4,
      name: 'ARRI SkyPanel S60-C LED Light',
      category: 'lighting',
      owner: 'Lighting Pros',
      location: 'Atlanta, GA',
      dailyRate: 125,
      weeklyRate: 750,
      rating: 4.9,
      reviews: 15,
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      description: 'High-output LED panel with full color control and wireless DMX.',
      specs: ['Full Color', 'DMX Control', 'Wireless'],
    },
  ];

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.specs.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Equipment Rental</h1>
        <div className="text-sm text-gray-500">
          {equipment.length} items available
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search equipment, brands, or specifications..."
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
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map(item => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
                item.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.available ? 'Available' : 'Rented'}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-black mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">by {item.owner}</span>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span className="text-gray-600">{item.rating}</span>
                    <span className="text-gray-500">({item.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">SPECIFICATIONS</p>
                <div className="flex flex-wrap gap-1">
                  {item.specs.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <div className="flex items-center space-x-1 text-black font-semibold">
                    <DollarSign size={14} />
                    <span>${item.dailyRate}/day</span>
                  </div>
                  <div className="text-gray-500">
                    ${item.weeklyRate}/week
                  </div>
                </div>
                <button 
                  disabled={!item.available}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.available
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {item.available ? 'Book Now' : 'Unavailable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12">
          <Camera size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No equipment found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}