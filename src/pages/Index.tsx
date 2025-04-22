
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Assignment Tracker</h1>
              <p className="text-xl mb-8">Never miss another assignment deadline. Your all-in-one platform for managing academic tasks and reminders.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <button className="button px-6 py-3 w-full sm:w-auto">Get Started</button>
                </Link>
                <Link to="/about">
                  <button className="button button-secondary px-6 py-3 w-full sm:w-auto">Learn More</button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-800 font-bold">Latest Assignments</h3>
                  <span className="text-indigo-600 font-medium">Due Soon</span>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map(item => (
                    <div key={item} className="border-l-4 border-indigo-500 pl-4 py-2">
                      <div className="text-gray-800 font-medium">Mathematics Assignment #{item}</div>
                      <div className="text-gray-600 text-sm">Due in {item} day{item !== 1 ? 's' : ''}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <span className="text-indigo-600 font-medium">See all assignments →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Assignment Management</h3>
              <p className="text-gray-600">Create, track, and manage all your assignments in one place with ease.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-2">Smart Reminders</h3>
              <p className="text-gray-600">Get timely notifications about upcoming deadlines and submissions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Class Coordinators</h3>
              <p className="text-gray-600">Special role for class representatives to manage assignments for the entire class.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-indigo-100 text-indigo-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-bold mb-2">Register</h3>
              <p className="text-gray-600">Create an account as a student or faculty member.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 text-indigo-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-bold mb-2">Assign Coordinators</h3>
              <p className="text-gray-600">Teachers designate class coordinators to manage assignments.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 text-indigo-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-bold mb-2">Track Assignments</h3>
              <p className="text-gray-600">Coordinators log assignments with details and deadlines.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 text-indigo-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-600">Receive timely reminders about upcoming submissions.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students who are already using our platform to stay on top of their academic assignments.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <button className="button px-8 py-3 w-full sm:w-auto">Sign Up Now</button>
            </Link>
            <Link to="/login">
              <button className="button button-secondary px-8 py-3 w-full sm:w-auto">Log In</button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">AssignTrack</h2>
              <p className="text-gray-400">Your academic assignment companion</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
              <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              <Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AssignTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
