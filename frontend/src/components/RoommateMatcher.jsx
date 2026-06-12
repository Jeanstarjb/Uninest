import React, { useState, useEffect } from 'react';
import RoommateCard from './RoommateCard';

const RoommateMatcher = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hardcoded dummy data for the wireframe
    const dummyRoommates = [
      { id: 1, username: 'Teddy Nyikuli', university_name: 'Kenyatta University', match_percentage: 94, budget_max: 10000, cleanliness_level: 4, study_hours: 'Night Owl' },
      { id: 2, username: 'Bornventure Odhiambo', university_name: 'JKUAT', match_percentage: 88, budget_max: 12000, cleanliness_level: 5, study_hours: 'Early Bird' },
      { id: 3, username: 'Felistar Mwaniki', university_name: 'University of Nairobi', match_percentage: 75, budget_max: 15000, cleanliness_level: 3, study_hours: 'Mixed' },
      { id: 4, username: 'Brenda Kiago', university_name: 'Strathmore University', match_percentage: 91, budget_max: 20000, cleanliness_level: 5, study_hours: 'Night Owl' },
      { id: 5, username: 'Dennis Musyoki', university_name: 'Kenyatta University', match_percentage: 82, budget_max: 11000, cleanliness_level: 4, study_hours: 'Early Bird' }
    ];
    setMatches(dummyRoommates);
    setLoading(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">Your Best Matches</h1>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
            Active Filters
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Budget &lt; Ksh 20,000 <span className="ml-2 text-slate-400 cursor-pointer hover:text-slate-600">&times;</span>
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Cleanliness &gt; 3 <span className="ml-2 text-slate-400 cursor-pointer hover:text-slate-600">&times;</span>
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Study Preference: Night Owl <span className="ml-2 text-slate-400 cursor-pointer hover:text-slate-600">&times;</span>
          </span>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 text-center">
          Error loading matches: {error}
        </div>
      )}

      {!loading && !error && matches.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🤷</span>
          </div>
          <h3 className="text-lg font-medium text-slate-900">No compatible matches found</h3>
          <p className="mt-2 text-slate-500 max-w-md mx-auto">Try adjusting your budget or preferences to see more potential roommates.</p>
        </div>
      )}

      {!loading && !error && matches.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map(match => (
            <RoommateCard key={match.id} roommate={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoommateMatcher;
