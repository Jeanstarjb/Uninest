import React, { useState } from 'react';

const RoommateCard = ({ roommate }) => {
  const [isRequested, setIsRequested] = useState(false);
  const { match_percentage, username, budget_max, cleanliness_level, study_hours } = roommate;

  const handleConnect = () => {
    setIsRequested(true);
  };

  // Calculate SVG stroke for semi-circle
  // Radius = 40, Circumference = 2 * pi * 40 = ~251
  // Half circumference = 125.6
  const dashArray = 125.6;
  const dashOffset = dashArray - (dashArray * match_percentage) / 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 flex flex-col items-center hover:border-indigo-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      
      {/* Top: Avatar & Name */}
      <div className="flex flex-col items-center mb-6 w-full text-center">
        <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center text-white text-2xl font-bold mb-3">
          {username.charAt(0).toUpperCase()}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{username}</h3>
        <p className="text-sm text-slate-500">{roommate.university_name || 'University Not Specified'}</p>
      </div>

      {/* Middle: Semi-circular Gauge */}
      <div className="relative flex justify-center items-end w-48 h-24 mb-6 overflow-hidden">
        <svg className="w-full h-full transform" viewBox="0 0 100 50">
          {/* Background Arc */}
          <path 
            d="M 10 50 A 40 40 0 0 1 90 50" 
            fill="none" 
            stroke="#f1f5f9" 
            strokeWidth="10" 
            strokeLinecap="round" 
          />
          {/* Value Arc */}
          <path 
            d="M 10 50 A 40 40 0 0 1 90 50" 
            fill="none" 
            stroke="#4f46e5" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute bottom-0 flex flex-col items-center pb-2">
          <span className="text-3xl font-extrabold text-slate-900 leading-none">{match_percentage}%</span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Match</span>
        </div>
      </div>

      {/* Below Gauge: Stats List */}
      <div className="w-full space-y-3 mb-8 border-t border-slate-100 pt-5">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Max Budget</span>
          <span className="font-semibold text-slate-900">Ksh {Number(budget_max).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Cleanliness</span>
          <span className="font-semibold text-slate-900">{cleanliness_level}/5</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Study Pref</span>
          <span className="font-semibold text-slate-900">{study_hours}</span>
        </div>
      </div>

      {/* Bottom: Connect Button */}
      <button 
        onClick={handleConnect}
        disabled={isRequested}
        className={`mt-auto w-full font-bold py-3 px-4 rounded transition-colors ${
          isRequested 
            ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
        }`}
      >
        {isRequested ? 'Request Sent' : 'Connect'}
      </button>
    </div>
  );
};

export default RoommateCard;
