import React from 'react';

const StatsCard = ({ title, value, icon: Icon, description, trend, trendValue }) => {
  return (
    <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-indigo-400">
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${
            trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
          }`}>
            {trend === 'up' ? '+' : '-'}{trendValue}%
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
        <p className="text-3xl font-black text-white mt-1">{value}</p>
      </div>
      
      <p className="text-gray-500 text-[10px] font-medium leading-none">
        {description}
      </p>
    </div>
  );
};

export default StatsCard;
