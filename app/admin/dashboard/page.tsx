"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  DollarSign, 
  Zap,
  Calendar,
  TrendingUp,
  Activity,
  Eye,
  Star,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin-layout';
import { OverviewChart } from '@/components/overview-chart';
import { RecentActivity } from '@/components/recent-activity';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock dashboard data
  const stats = [
    {
      title: "Total Events",
      value: "127",
      change: "+12%",
      changeType: "positive" as const,
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      title: "Photos Processed",
      value: "45,231",
      change: "+23%",
      changeType: "positive" as const,
      icon: Camera,
      color: "text-purple-500"
    },
    {
      title: "Revenue",
      value: "$12,847",
      change: "+18%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Face Matches",
      value: "8,942",
      change: "+31%",
      changeType: "positive" as const,
      icon: Zap,
      color: "text-orange-500"
    }
  ];

  const quickStats = [
    { label: "Active Events", value: "23", icon: Activity },
    { label: "Pending Claims", value: "156", icon: Eye },
    { label: "Today's Revenue", value: "$847", icon: TrendingUp },
    { label: "Success Rate", value: "97.3%", icon: Star }
  ];

  const recentEvents = [
    { id: 1, name: "Summer Wedding 2024", date: "2024-06-15", photos: 234, status: "active" },
    { id: 2, name: "Corporate Retreat", date: "2024-06-10", photos: 156, status: "completed" },
    { id: 3, name: "Birthday Party", date: "2024-06-08", photos: 89, status: "processing" },
    { id: 4, name: "College Reunion", date: "2024-06-05", photos: 445, status: "completed" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'processing': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back! Here's what's happening with your events.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Time Range:</span>
          <div className="flex gap-1">
            {[
              { label: '7D', value: '7d' },
              { label: '30D', value: '30d' },
              { label: '90D', value: '90d' },
              { label: '1Y', value: '1y' }
            ].map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${
                      stat.changeType === 'positive' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.change} from last period
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Revenue and activity trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OverviewChart />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>
                Real-time metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">Recent Events</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>
                    Latest event activity and status
                  </CardDescription>
                </div>
                <Link href="/admin/events">
                  <Button variant="outline" size="sm">
                    View All Events
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{event.photos} photos</p>
                          <Badge 
                            variant="secondary" 
                            className={`text-white ${getStatusColor(event.status)}`}
                          >
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest system activity and user actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>
                  Important notifications and warnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">
                        High storage usage detected
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Storage is at 85% capacity. Consider cleaning up old events.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-200">
                        New feature available
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Video face recognition is now available in beta.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}