import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign, Star, Users, Wifi, Car, Coffee } from 'lucide-react';

export default function Accommodation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const accommodationTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'hotel', label: 'Hotels' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'house', label: 'Houses' },
    { id: 'studio', label: 'Studio Apartments' },
    { id: 'hostel', label: 'Hostels' },
  ];

  const accommodations = [
    {
      id: 1,
      name: 'Creative Loft Downtown',
      type: 'apartment',
      location: 'Los Angeles, CA',
      capacity: 4,
      bedrooms: 2,
      bathrooms: 2,
      pricePerNight: 180,
      rating: 4.8,
      reviews: 42,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      amenities: ['WiFi', 'Kitchen', 'Parking', 'Workspace'],
      description: 'Modern loft perfect for creative teams. Walking distance to major studios.',
      host: 'Creative Stays',
    },
    {
      id: 2,
      name: 'Film District Hotel',
      type: 'hotel',
      location: 'New York, NY',
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
      pricePerNight: 220,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      amenities: ['WiFi', 'Gym', 'Restaurant', 'Concierge'],
      description: 'Boutique hotel in the heart of the film district. Perfect for industry professionals.',
      host: 'Film District Hotels',
    },
    {
      id: 3,
      name: 'Production House',
      type: 'house',
      location: 'Atlanta, GA',
      capacity: 8,
      bedrooms: 4,
      bathrooms: 3,
      pricePerNight: 320,
      rating: 4.9,
      reviews: 15,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: false,
      amenities: ['WiFi', 'Kitchen', 'Parking', 'Garden', 'Office Space'],
      description: 'Spacious house ideal for large production crews. Quiet neighborhood with easy studio access.',
      host: 'Production Stays',
    },
    {
      id: 4,
      name: 'Studio Apartment Central',
      type: 'studio',
      location: 'Austin, TX',
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
      pricePerNight: 95,
      rating: 4.5,
      reviews: 28,
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      amenities: ['WiFi', 'Kitchen', 'Workspace'],
      description: 'Cozy studio apartment perfect for solo travelers or small teams.',
      host: 'Urban Stays',
    },
  ];

  const filteredAccommodations = accommodations.filter(accommodation => {
    const matchesSearch = accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         accommodation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         accommodation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || accommodation.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi size={14} />;
      case 'parking':
        return <Car size={14} />;
      case 'restaurant':
      case 'kitchen':
        return <Coffee size={14} />;
      default:
        return <span className="w-3 h-3 bg-blue-600 rounded-full"></span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Accommodation</h1>
        <div className="text-sm text-gray-500">
          {accommodations.length} properties available
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by location, property name, or amenities..."
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
              {accommodationTypes.map(type => (
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

      {/* Accommodations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAccommodations.map(accommodation => (
          <div key={accommodation.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={accommodation.image}
                alt={accommodation.name}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
                accommodation.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {accommodation.available ? 'Available' : 'Booked'}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-black">{accommodation.name}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                  {accommodation.type}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{accommodation.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2" />
                  <span>{accommodation.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>Up to {accommodation.capacity} guests</span>
                    </div>
                    <span>{accommodation.bedrooms} bed, {accommodation.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span>{accommodation.rating}</span>
                    <span className="text-gray-500">({accommodation.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">AMENITIES</p>
                <div className="flex flex-wrap gap-2">
                  {accommodation.amenities.map((amenity, index) => (
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
                    <span>${accommodation.pricePerNight}/night</span>
                  </div>
                  <div className="text-gray-500">
                    Hosted by {accommodation.host}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  disabled={!accommodation.available}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    accommodation.available
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {accommodation.available ? 'Book Now' : 'Unavailable'}
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAccommodations.length === 0 && (
        <div className="text-center py-12">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No accommodations found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}