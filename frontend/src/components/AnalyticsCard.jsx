import React from 'react';

const AnalyticsCard = ({ title, value, icon: Icon, description }) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24 text-sky-500" />
      </div>
      
      <div className="relative z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-slate-400">
          <Icon className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
        </div>
        <div className="text-3xl font-bold text-white mt-1">{value}</div>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

export default AnalyticsCard;
