import React, { useState } from 'react';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">My Account</h1>
        <p className="mt-2 text-lg text-slate-500">Manage your profile, roommate preferences, and security settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-500 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 border-transparent hover:text-slate-900 font-medium'
              } flex items-center px-4 py-3 border-l-4 w-full text-left transition-colors`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`${
                activeTab === 'preferences'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-500 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 border-transparent hover:text-slate-900 font-medium'
              } flex items-center px-4 py-3 border-l-4 w-full text-left transition-colors`}
            >
              Roommate Preferences
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${
                activeTab === 'security'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-500 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 border-transparent hover:text-slate-900 font-medium'
              } flex items-center px-4 py-3 border-l-4 w-full text-left transition-colors`}
            >
              Security
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Profile Details</h2>
              <div className="flex items-center space-x-6 mb-8">
                <div className="h-24 w-24 rounded-full bg-slate-800 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                  U
                </div>
                <button className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                  Change Avatar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input type="text" defaultValue="Student" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input type="text" defaultValue="User" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" defaultValue="student@university.ac.ke" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" readOnly />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">University</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow">
                    <option>Kenyatta University</option>
                    <option>JKUAT</option>
                    <option>University of Nairobi</option>
                    <option>Strathmore University</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Roommate Preferences</h2>
              <p className="text-sm text-slate-500 mb-8">This data powers our roommate matching algorithm. Be honest!</p>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Maximum Monthly Budget (Ksh)</label>
                  <input type="number" defaultValue="15000" className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Cleanliness Level (1 = Messy, 5 = Neat Freak)</label>
                  <input type="range" min="1" max="5" defaultValue="4" className="w-full accent-indigo-600" />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Study Hours</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="study" className="text-indigo-600 focus:ring-indigo-500 h-4 w-4" defaultChecked />
                      <span className="text-sm text-slate-700">Night Owl</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="study" className="text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                      <span className="text-sm text-slate-700">Early Bird</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="study" className="text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                      <span className="text-sm text-slate-700">Mixed / Irregular</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio</label>
                  <textarea rows="4" placeholder="Tell potential roommates about yourself..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Security Settings</h2>
              
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                  <input type="password" placeholder="New Password" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                  <input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end space-x-4">
            {saveStatus && (
              <span className={`text-sm font-medium ${saveStatus === 'Saved successfully!' ? 'text-green-600' : 'text-slate-500'}`}>
                {saveStatus}
              </span>
            )}
            <button 
              onClick={handleSave}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-indigo-700 hover:shadow transform active:scale-95 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
