import React from 'react';

const StatsCard = ({ title, value, icon: Icon, description }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-bold text-gray-100">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default StatsCard;
