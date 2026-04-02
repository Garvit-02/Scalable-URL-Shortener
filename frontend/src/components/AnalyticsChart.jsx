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

const AnalyticsChart = ({ data }) => {
  const COLORS = ['#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b'];

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 mb-8">
      <h3 className="text-xl font-semibold text-gray-100 mb-6">Click Analytics</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis 
              dataKey="shortCode" 
              stroke="#9ca3af" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#111827', 
                borderColor: '#374151',
                borderRadius: '8px',
                color: '#f3f4f6',
                border: '1px solid #374151'
              }}
              cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
            />
            <Bar dataKey="clicks" radius={[4, 4, 0, 0]} barSize={40}>
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
