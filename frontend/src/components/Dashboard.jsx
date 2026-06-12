import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [locationFilter, setLocationFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState(30000);

  useEffect(() => {
    // Hardcoded dummy data as requested for the wireframe
    const dummyProperties = [
      { id: 1, title: 'Qwanza Student Apartments (1BR)', location: 'KM, Kenyatta University', rent_amount: 12500, amenities: ['WIFI', 'CCTV', 'Hot Shower'] },
      { id: 2, title: 'Kahawa Wendani Bedsitters', location: 'Kahawa Wendani', rent_amount: 8500, amenities: ['WIFI', 'Water 24/7'] },
      { id: 3, title: 'Ruiru Town Studio', location: 'Ruiru', rent_amount: 10500, amenities: ['CCTV', 'Security'] },
      { id: 4, title: 'Premium Hostel near KM', location: 'KM, Kenyatta University', rent_amount: 15000, amenities: ['WIFI', 'Meals', 'Laundry'] },
      { id: 5, title: 'Spacious 2BR for Sharing', location: 'Ruiru', rent_amount: 25000, amenities: ['WIFI', 'Balcony', 'Parking'] }
    ];
    setProperties(dummyProperties);
    setFilteredProperties(dummyProperties);
    setLoading(false);
  }, []);

  // Handle Filtering
  useEffect(() => {
    let result = properties;

    if (locationFilter !== 'All') {
      result = result.filter(p => p.location.includes(locationFilter));
    }

    result = result.filter(p => Number(p.rent_amount) <= budgetFilter);

    setFilteredProperties(result);
  }, [locationFilter, budgetFilter, properties]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Available Properties</h2>
          <p className="mt-2 text-sm text-slate-500">Find your next home from our verified listings.</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Location</label>
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
              className="text-sm border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="All">All Locations</option>
              <option value="KM">KM / Kenyatta Univ.</option>
              <option value="Ruiru">Ruiru</option>
              <option value="Qwetu">Qwetu</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Max Rent: Ksh {budgetFilter.toLocaleString()}</label>
            <input 
              type="range" 
              min="5000" 
              max="50000" 
              step="1000"
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(Number(e.target.value))}
              className="w-32 sm:w-48"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          Error loading properties: {error}
        </div>
      )}

      {!loading && !error && filteredProperties.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-100">
          <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-900">No properties</h3>
          <p className="mt-1 text-sm text-slate-500">There are no verified listings available at the moment.</p>
        </div>
      )}

      {!loading && !error && filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
