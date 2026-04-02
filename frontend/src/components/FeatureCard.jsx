import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
