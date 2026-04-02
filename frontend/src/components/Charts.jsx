import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export const ClicksBarChart = ({ data }) => {
  const COLORS = ['#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81'];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis 
            dataKey="shortCode" 
            stroke="#6b7280" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            stroke="#6b7280" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#111827', 
              borderColor: '#1f2937',
              borderRadius: '16px',
              color: '#f3f4f6'
            }}
            cursor={{ fill: '#1f2937', opacity: 0.4 }}
          />
          <Bar dataKey="clicks" radius={[6, 6, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DevicePieChart = ({ data }) => {
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];
  
  // Dummy distribution if no data
  const chartData = data || [
    { name: 'Desktop', value: 65 },
    { name: 'Mobile', value: 25 },
    { name: 'Tablet', value: 7 },
    { name: 'Other', value: 3 },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#111827', 
              borderColor: '#1f2937',
              borderRadius: '16px',
              color: '#f3f4f6'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        {chartData.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
