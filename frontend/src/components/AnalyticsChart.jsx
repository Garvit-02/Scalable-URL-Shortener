import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const AnalyticsChart = ({ data }) => {
  const COLORS = ['#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81'];

  return (
    <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700/50 mb-10 group">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-xl font-bold text-gray-100">Click Performance</h3>
          <p className="text-gray-500 text-xs mt-1 font-medium italic">Detailed distribution of engagement metrics.</p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
          <TrendingUp size={12} />
          Real-time
        </div>
      </div>
      
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#374151" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="shortCode" 
              stroke="#9ca3af" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#6b7280', fontWeight: 'bold' }}
              dy={10}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#6b7280', fontWeight: 'bold' }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#111827', 
                borderColor: '#374151',
                borderRadius: '12px',
                color: '#f3f4f6',
                border: '1px solid rgba(79, 70, 229, 0.2)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
              }}
              cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
            />
            <Bar dataKey="clicks" radius={[6, 6, 0, 0]} barSize={44}>
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
