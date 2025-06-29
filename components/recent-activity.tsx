"use client";

import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Download, 
  CreditCard, 
  Eye, 
  Users,
  Calendar
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'upload',
    message: 'New photos uploaded to Summer Wedding 2024',
    time: '2 minutes ago',
    icon: Upload,
    color: 'text-blue-500'
  },
  {
    id: 2,
    type: 'payment',
    message: 'Payment received from john.doe@email.com',
    time: '5 minutes ago',
    icon: CreditCard,
    color: 'text-green-500'
  },
  {
    id: 3,
    type: 'match',
    message: 'Face match request processed',
    time: '8 minutes ago',
    icon: Eye,
    color: 'text-purple-500'
  },
  {
    id: 4,
    type: 'download',
    message: 'ZIP file downloaded by user',
    time: '12 minutes ago',
    icon: Download,
    color: 'text-orange-500'
  },
  {
    id: 5,
    type: 'event',
    message: 'New event created: Corporate Retreat 2024',
    time: '1 hour ago',
    icon: Calendar,
    color: 'text-cyan-500'
  },
  {
    id: 6,
    type: 'faces',
    message: '245 faces detected and processed',
    time: '2 hours ago',
    icon: Users,
    color: 'text-pink-500'
  }
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <activity.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{activity.message}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {activity.type}
          </Badge>
        </div>
      ))}
    </div>
  );
}