"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, uploads: 240 },
  { name: 'Feb', revenue: 3000, uploads: 139 },
  { name: 'Mar', revenue: 2000, uploads: 980 },
  { name: 'Apr', revenue: 2780, uploads: 390 },
  { name: 'May', revenue: 1890, uploads: 480 },
  { name: 'Jun', revenue: 2390, uploads: 380 },
];

export function OverviewChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="uploads" 
            stroke="#06b6d4" 
            strokeWidth={3}
            dot={{ fill: '#06b6d4', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}