import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import RoommateMatcher from './components/RoommateMatcher';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import AccountSettings from './components/AccountSettings';

function App() {
  const [currentView, setCurrentView] = useState('register');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Global Toast State
  const [toastMessage, setToastMessage] = useState('');
  
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  UNINEST
                </span>
              </div>
              
              {isAuthenticated && (
                <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                  <button
                    onClick={() => setCurrentView('properties')}
                    className={`${
                      currentView === 'properties'
                        ? 'border-indigo-600 text-slate-900 font-semibold'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 font-medium'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm transition-colors`}
                  >
                    Properties
                  </button>
                  <button
                    onClick={() => setCurrentView('roommates')}
                    className={`${
                      currentView === 'roommates'
                        ? 'border-indigo-600 text-slate-900 font-semibold'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 font-medium'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm transition-colors`}
                  >
                    Roommates
                  </button>
                  <button
                    onClick={() => setCurrentView('account')}
                    className={`${
                      currentView === 'account'
                        ? 'border-indigo-600 text-slate-900 font-semibold'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 font-medium'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm transition-colors`}
                  >
                    My Account
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => setCurrentView('login')}
                    className={`${
                      currentView === 'login'
                        ? 'text-indigo-600 font-semibold'
                        : 'text-slate-500 hover:text-slate-700 font-medium'
                    } text-sm transition-colors`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setCurrentView('register')}
                    className={`${
                      currentView === 'register'
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    } inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium transition-colors`}
                  >
                    Register
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-6 relative">
                  {/* Notification Bell */}
                  <button className="relative text-slate-400 hover:text-slate-500 transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                  </button>

                  {/* Avatar Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      U
                    </button>

                    {isDropdownOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <button className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left">
                          Edit Preferences
                        </button>
                        <button className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left">
                          My Saved Properties
                        </button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button 
                          onClick={() => {
                            setIsAuthenticated(false);
                            setIsDropdownOpen(false);
                            setCurrentView('login');
                          }}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main>
        {currentView === 'properties' && isAuthenticated && <Dashboard />}
        {currentView === 'roommates' && isAuthenticated && <RoommateMatcher />}
        {currentView === 'account' && isAuthenticated && <AccountSettings />}
        
        {currentView === 'register' && !isAuthenticated && (
          <RegistrationForm 
            onSuccess={() => {
              setIsAuthenticated(true);
              setCurrentView('properties');
              showToast('Registration successful! Welcome to UniNest.');
            }} 
          />
        )}
        {currentView === 'login' && !isAuthenticated && (
          <LoginForm 
            onSuccess={() => {
              setIsAuthenticated(true);
              setCurrentView('properties');
              showToast('Welcome back!');
            }} 
          />
        )}
        {/* If trying to access protected route without auth, show login/register or blank */}
        {['properties', 'roommates'].includes(currentView) && !isAuthenticated && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Please log in to view this page</h2>
            <button 
              onClick={() => setCurrentView('login')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Go to Login
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} UniNest. All rights reserved. Built for students.
        </div>
      </footer>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
