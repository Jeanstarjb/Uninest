import React, { useState } from 'react';

const RegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accountType: 'Student', // Default to Student
    registrationNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this payload to the Django REST API
    console.log("User Registration Payload:", formData);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 my-10 border border-slate-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
        <p className="text-slate-500 text-sm">Join UniNest to find your perfect home or roommate.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              placeholder="Jane"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="jane.doe@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="••••••••"
          />
        </div>

        {/* Account Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label
              className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                formData.accountType === 'Student'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value="Student"
                checked={formData.accountType === 'Student'}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="font-medium">Student</span>
            </label>

            <label
              className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                formData.accountType === 'Landlord'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value="Landlord"
                checked={formData.accountType === 'Landlord'}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="font-medium">Landlord</span>
            </label>
          </div>
        </div>

        {/* Conditional Registration Number (Only for Students) */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            formData.accountType === 'Student' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <label htmlFor="registrationNumber" className="block text-sm font-medium text-slate-700 mb-1">
            University Registration Number
          </label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required={formData.accountType === 'Student'}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            placeholder="e.g. S13/12345/23"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors mt-4"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
