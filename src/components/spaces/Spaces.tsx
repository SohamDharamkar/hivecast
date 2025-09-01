import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign, Star, Users, Wifi, Car } from 'lucide-react';

export default function Spaces() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const spaceTypes = [
    { id: 'all', label: 'All Spaces' },
    { id: 'studio', label: 'Studios' },
    { id: 'location', label: 'Locations' },
    { id: 'office', label: 'Office Space' },
    { id: 'warehouse', label: 'Warehouses' },
    { id: 'outdoor', label: 'Outdoor' },
  ];

  const spaces = [
    {
      id: 1,
      name: 'Downtown Film Studio',
      type: 'studio',
      location: 'Los Angeles, CA',
      size: '2,500 sq ft',
      capacity: 50,
      hourlyRate: 150,
      dailyRate: 1200,
      rating: 4.9,
      reviews: 34,
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      amenities: ['Green Screen', 'Lighting Grid', 'Parking', 'WiFi'],
      description: 'Professional film studio with cyclorama wall and full lighting grid.',
    },
    {
      id: 2,
      name: 'Rooftop Terrace',
      type: 'location',
      location: 'New York, NY',
      size: '1,800 sq ft',
      capacity: 30,
      hourlyRate: 200,
      dailyRate: 1600,
      rating: 4.7,
      reviews: 18,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      amenities: ['City View', 'Natural Light', 'Elevator Access', 'Power'],
      description: 'Stunning rooftop location with panoramic city views.',
    },
    {
      id: 3,
      name: 'Industrial Warehouse',
      type: 'warehouse',
      location: 'Atlanta, GA',
      size: '5,000 sq ft',
      capacity: 100,
      hourlyRate: 100,
      dailyRate: 800,
      rating: 4.6,
      reviews: 12,
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: false,
      amenities: ['High Ceilings', 'Loading Dock', 'Parking', 'Climate Control'],
      description: 'Large warehouse space perfect for big productions and set builds.',
    },
    {
      id: 4,
      name: 'Creative Office Space',
      type: 'office',
      location: 'San Francisco, CA',
      size: '1,200 sq ft',
      capacity: 20,
      hourlyRate: 75,
      dailyRate: 600,
      rating: 4.8,
      reviews: 25,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      amenities: ['Conference Room', 'WiFi', 'Kitchen', 'Parking'],
      description: 'Modern office space ideal for meetings, interviews, and small productions.',
    },
  ];

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || space.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi size={14} />;
      case 'parking':
        return <Car size={14} />;
      default:
        return <span className="w-3 h-3 bg-blue-600 rounded-full"></span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Spaces & Locations</h1>
        <div className="text-sm text-gray-500">
          {spaces.length} spaces available
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search spaces, locations, or amenities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {spaceTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label}
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

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpaces.map(space => (
          <div key={space.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={space.image}
                alt={space.name}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
                space.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {space.available ? 'Available' : 'Booked'}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-black">{space.name}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                  {space.type}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{space.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2" />
                  <span>{space.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span>{space.size}</span>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>Up to {space.capacity}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span>{space.rating}</span>
                    <span className="text-gray-500">({space.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">AMENITIES</p>
                <div className="flex flex-wrap gap-2">
                  {space.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <div className="flex items-center space-x-1 text-black font-semibold">
                    <DollarSign size={14} />
                    <span>${space.hourlyRate}/hour</span>
                  </div>
                  <div className="text-gray-500">
                    ${space.dailyRate}/day
                  </div>
                </div>
                <p className="text-xs text-gray-500">by {space.owner}</p>
              </div>

              <div className="flex space-x-2">
                <button 
                  disabled={!space.available}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    space.available
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {space.available ? 'Book Now' : 'Unavailable'}
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSpaces.length === 0 && (
        <div className="text-center py-12">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No spaces found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}