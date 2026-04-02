import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-gray-800 border border-gray-700/50 rounded-2xl p-8 shadow-lg shadow-black/20 hover:border-indigo-500/30 hover:bg-gray-800/80 transition-all duration-300 group flex flex-col h-full">
      <div className="w-14 h-14 rounded-2xl bg-gray-950 border border-gray-700 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 group-hover:text-indigo-400 transition-all shadow-inner">
        <Icon size={26} strokeWidth={1.5} />
      </div>
      <h3 className="text-gray-100 font-bold text-lg mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed font-medium">{description}</p>
    </div>
  );
};

export default FeatureCard;
