import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Camera,
  Users,
  Briefcase,
  DollarSign,
  MapPin,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Globe,
  Zap,
  Shield
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with filmmakers, directors, cinematographers, and creative professionals worldwide.'
    },
    {
      icon: Briefcase,
      title: 'Job Marketplace',
      description: 'Find opportunities or hire talent for your next project. From freelance gigs to full-time positions.'
    },
    {
      icon: Camera,
      title: 'Equipment Rental',
      description: 'Rent professional cameras, lighting, audio equipment, and more from verified providers.'
    },
    {
      icon: DollarSign,
      title: 'Project Funding',
      description: 'Raise funds for your creative projects or invest in promising filmmakers and their visions.'
    },
    {
      icon: MapPin,
      title: 'Locations & Studios',
      description: 'Discover and book filming locations, studios, and production spaces for your projects.'
    },
    {
      icon: Star,
      title: 'Collaboration Tools',
      description: 'Manage projects, communicate with your team, and bring your creative vision to life.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Creative Professionals' },
    { number: '500+', label: 'Projects Completed' },
    { number: '$2M+', label: 'Funds Raised' },
    { number: '50+', label: 'Countries' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Cinematographer',
      quote: 'HiveCast connected me with amazing projects and helped me grow my network in the film industry.'
    },
    {
      name: 'Marcus Johnson',
      role: 'Director',
      quote: 'The platform made it easy to find funding for my documentary. The community is incredibly supportive.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Producer',
      quote: 'From finding crew to renting equipment, HiveCast is my go-to platform for all production needs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="gradient-animate bg-clip-text text-transparent">
                <h1 className="text-2xl font-bold">HiveCast</h1>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Where Creative
              <span className="gradient-animate bg-clip-text text-transparent block">
                Professionals Connect
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              The ultimate platform for filmmakers, directors, cinematographers, and creative professionals to network, collaborate, and bring their visions to life.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/register"
                className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
              >
                Start Creating
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <button className="flex items-center px-8 py-4 border border-gray-600 text-white rounded-xl hover:bg-gray-800 transition-colors text-lg font-medium">
                <Play size={20} className="mr-2" />
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to
              <span className="gradient-animate bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From networking to funding, from equipment rental to project management - 
              HiveCast provides all the tools creative professionals need.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-8 card-3d hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Creative
              <span className="gradient-animate bg-clip-text text-transparent"> Professionals</span>
            </h2>
            <p className="text-xl text-gray-300">
              See what our community has to say about HiveCast
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-8 card-3d"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-12 card-3d"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join the
              <span className="gradient-animate bg-clip-text text-transparent"> Creative Revolution?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect with thousands of creative professionals and take your projects to the next level.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <div className="flex items-center text-gray-400 text-sm">
                <CheckCircle size={16} className="mr-2 text-green-400" />
                No credit card required
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="gradient-animate bg-clip-text text-transparent mb-4">
                <h3 className="text-2xl font-bold">HiveCast</h3>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate platform for creative professionals to connect, collaborate, and create.
              </p>
              <div className="flex items-center space-x-4">
                <Globe size={20} className="text-gray-400" />
                <Zap size={20} className="text-gray-400" />
                <Shield size={20} className="text-gray-400" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Network</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Funding</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HiveCast. All rights reserved. Built for creative professionals worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}