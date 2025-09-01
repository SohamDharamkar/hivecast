import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Briefcase, Calendar, Users } from 'lucide-react';

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');

  const jobTypes = [
    { id: 'all', label: 'All Jobs' },
    { id: 'full-time', label: 'Full-time' },
    { id: 'freelance', label: 'Freelance' },
    { id: 'contract', label: 'Contract' },
    { id: 'internship', label: 'Internship' },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Cinematographer',
      company: 'Stellar Productions',
      location: 'Los Angeles, CA',
      type: 'Freelance',
      duration: '3 months',
      pay: '$800/day',
      description: 'Seeking experienced cinematographer for upcoming feature film. Must have experience with RED cameras and color grading.',
      skills: ['RED Camera', 'Color Grading', 'Lighting Design'],
      postedAt: '2024-01-15',
      applicants: 12,
    },
    {
      id: 2,
      title: 'Video Editor',
      company: 'Creative Media Co.',
      location: 'New York, NY',
      type: 'Full-time',
      duration: 'Permanent',
      pay: '$65,000/year',
      description: 'Join our team as a video editor working on commercials and branded content for major clients.',
      skills: ['Premiere Pro', 'After Effects', 'Motion Graphics'],
      postedAt: '2024-01-14',
      applicants: 8,
    },
    {
      id: 3,
      title: 'Sound Designer',
      company: 'Audio Dynamics',
      location: 'Remote',
      type: 'Contract',
      duration: '6 weeks',
      pay: '$500/day',
      description: 'Create immersive soundscapes for indie horror film. Experience with Pro Tools and field recording required.',
      skills: ['Pro Tools', 'Field Recording', 'Sound Design'],
      postedAt: '2024-01-13',
      applicants: 5,
    },
    {
      id: 4,
      title: 'Assistant Director',
      company: 'Independent Film Collective',
      location: 'Chicago, IL',
      type: 'Freelance',
      duration: '2 months',
      pay: '$300/day',
      description: 'Support the director on a low-budget indie film. Great opportunity for emerging talent.',
      skills: ['Film Production', 'Scheduling', 'Communication'],
      postedAt: '2024-01-12',
      applicants: 15,
    },
  ];

  const myApplications = [
    {
      id: 1,
      jobTitle: 'Senior Cinematographer',
      company: 'Stellar Productions',
      appliedAt: '2024-01-14',
      status: 'Under Review',
    },
    {
      id: 2,
      jobTitle: 'Documentary Filmmaker',
      company: 'Nature Films Inc.',
      appliedAt: '2024-01-10',
      status: 'Interview Scheduled',
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || job.type.toLowerCase().includes(selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Job Opportunities</h1>
        <div className="text-sm text-gray-500">
          {jobs.length} opportunities available
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
              Browse Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'applications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Applications ({myApplications.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'browse' ? (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search jobs, companies, or skills..."
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
                    {jobTypes.map(type => (
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

              {/* Jobs List */}
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black mb-1">{job.title}</h3>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                      </div>
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                        job.type === 'Freelance' ? 'bg-blue-100 text-blue-800' :
                        job.type === 'Contract' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.type}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign size={14} />
                          <span>{job.pay}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar size={12} />
                        <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-black">My Applications</h2>
              {myApplications.map(application => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-black">{application.jobTitle}</h3>
                      <p className="text-gray-600">{application.company}</p>
                      <p className="text-sm text-gray-500">Applied on {new Date(application.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      application.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}