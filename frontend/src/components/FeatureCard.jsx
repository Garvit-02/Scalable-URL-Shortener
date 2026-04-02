import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow hover:border-indigo-500/30 hover:shadow-indigo-500/10 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <h3 className="text-gray-200 font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
