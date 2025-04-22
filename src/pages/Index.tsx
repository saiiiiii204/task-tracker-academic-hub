
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Classic Header */}
      <header className="bg-white shadow-md py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Academic Assignment Management
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A refined platform for tracking academic tasks, designed to bring structure and elegance to your educational journey.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/login" className="px-8 py-3 bg-indigo-700 text-white rounded-full shadow-lg hover:bg-indigo-800 transition-colors">
                Enter Portal
              </Link>
              <Link to="/about" className="px-8 py-3 border border-indigo-700 text-indigo-700 rounded-full hover:bg-indigo-50 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Classic Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              Elegant Features
            </h2>
            <p className="text-gray-600 mt-4">
              Thoughtfully designed to enhance your academic experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: '📚', 
                title: 'Organized Tracking', 
                description: 'Seamlessly manage and track all your academic assignments with precision and clarity.'
              },
              { 
                icon: '⏰', 
                title: 'Timely Reminders', 
                description: 'Receive elegant, unobtrusive notifications about upcoming deadlines and submissions.'
              },
              { 
                icon: '👥', 
                title: 'Collaborative Management', 
                description: 'Empower class coordinators to manage assignments efficiently and professionally.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classic Call to Action */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Elevate Your Academic Journey
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
            Join a sophisticated platform designed to bring clarity and efficiency to your academic assignments.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="px-10 py-3 bg-white text-indigo-700 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-10 py-3 border border-white text-white rounded-full hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Classic Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-serif font-bold mb-2">AssignTrack</h2>
              <p className="text-gray-400">Elegant Academic Task Management</p>
            </div>
            
            <div className="flex space-x-6">
              {['About', 'Contact', 'Privacy', 'Terms'].map((link, index) => (
                <Link 
                  key={index} 
                  to={`/${link.toLowerCase().replace(' ', '-')}`} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="text-center text-gray-500 mt-8 pt-8 border-t border-gray-800">
            <p>&copy; {new Date().getFullYear()} AssignTrack. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
