"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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
            stroke="url(#colorRevenue)" 
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="uploads" 
            stroke="url(#colorUploads)" 
            strokeWidth={3}
            dot={{ fill: '#06b6d4', strokeWidth: 2 }}
          />
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="colorUploads" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}