import React from 'react';

const StatsCard = ({ title, value, icon: Icon, description }) => {
  return (
    <div className="bg-gray-800 border border-gray-700/50 rounded-xl p-6 shadow-lg shadow-black/20 hover:border-indigo-500/30 hover:bg-gray-800/80 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-gray-950 border border-gray-700 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform shadow-inner">
          <Icon size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-100 tracking-tight">{value}</p>
        <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default StatsCard;
