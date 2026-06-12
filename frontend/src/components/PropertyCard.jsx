import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        <img 
          src={`https://placehold.co/600x400/e2e8f0/475569?text=Property+Image`} 
          alt={property.title} 
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{property.title}</h3>
        <p className="text-sm text-slate-500 mb-4">{property.location}</p>
        
        <div className="mb-6 flex-grow">
          <div className="flex flex-wrap gap-2">
            {property.amenities && property.amenities.map((amenity, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                <svg className="mr-1 h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {amenity}
              </span>
            ))}
            {(!property.amenities || property.amenities.length === 0) && (
              <span className="text-sm text-slate-400">Amenities not specified</span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-end mt-auto pt-4 border-t border-slate-100">
          <div>
            <span className="text-lg font-bold text-slate-900">Ksh {Number(property.rent_amount).toLocaleString()}</span>
            <span className="text-sm text-slate-500"> / mo</span>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
