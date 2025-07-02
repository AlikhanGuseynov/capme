"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Activity,
  Eye,
  Star,
  AlertCircle,
  Plus,
  Users,
  Upload,
  QrCode,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { OrganizerLayout } from '@/components/organizer-layout';
import { OverviewChart } from '@/components/overview-chart';
import { RecentActivity } from '@/components/recent-activity';

export default function OrganizerDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock dashboard data for organizer
  const stats = [
    {
      title: "My Events",
      value: "12",
      change: "+3",
      changeType: "positive" as const,
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      title: "Total Photos",
      value: "2,847",
      change: "+156",
      changeType: "positive" as const,
      icon: Camera,
      color: "text-purple-500"
    },
    {
      title: "Revenue Earned",
      value: "$1,247",
      change: "+$89",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Photo Downloads",
      value: "342",
      change: "+23",
      changeType: "positive" as const,
      icon: Eye,
      color: "text-orange-500"
    }
  ];

  const quickStats = [
    { label: "Active Events", value: "5", icon: Activity },
    { label: "Pending Claims", value: "12", icon: Eye },
    { label: "This Month Revenue", value: "$347", icon: TrendingUp },
    { label: "Success Rate", value: "96.8%", icon: Star }
  ];

  const recentEvents = [
    { id: 1, name: "Summer Wedding 2024", date: "2024-06-15", photos: 234, status: "active", revenue: 89.50 },
    { id: 2, name: "Corporate Retreat", date: "2024-06-10", photos: 156, status: "completed", revenue: 67.20 },
    { id: 3, name: "Birthday Party", date: "2024-06-08", photos: 89, status: "processing", revenue: 34.80 },
    { id: 4, name: "College Reunion", date: "2024-06-05", photos: 445, status: "completed", revenue: 156.90 }
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
    <OrganizerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">Event Organizer Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back! Here's what's happening with your events.
            </p>
          </div>
          <Link href="/organizer/events/create">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
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
              <CardTitle>Revenue & Activity Overview</CardTitle>
              <CardDescription>
                Your event performance trends over time
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
                Real-time metrics for your events
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <Plus className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Create New Event</h3>
              <p className="mb-4 opacity-90">
                Set up a new event and start collecting photos
              </p>
              <Link href="/organizer/events/create">
                <Button variant="secondary" className="text-purple-600">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0">
            <CardContent className="p-6">
              <QrCode className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Generate QR Codes</h3>
              <p className="mb-4 opacity-90">
                Create QR codes for easy photo uploads
              </p>
              <Link href="/organizer/qr-codes">
                <Button variant="secondary" className="text-cyan-600">
                  Generate
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <BarChart3 className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">View Analytics</h3>
              <p className="mb-4 opacity-90">
                Detailed insights about your events
              </p>
              <Link href="/organizer/analytics">
                <Button variant="secondary" className="text-green-600">
                  View Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="alerts">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Events</CardTitle>
                  <CardDescription>
                    Your recent events and their performance
                  </CardDescription>
                </div>
                <Link href="/organizer/events">
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
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{event.photos} photos</p>
                          <p className="text-sm text-green-600">${event.revenue}</p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-white ${getStatusColor(event.status)}`}
                        >
                          {event.status}
                        </Badge>
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
                  Latest activity across your events
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
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Important updates and alerts for your events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <AlertCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        New photo uploads
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        15 new photos uploaded to "Summer Wedding 2024"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-200">
                        Payment received
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        $3.99 payment received for photo download
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                    <AlertCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-200">
                        Event reminder
                      </p>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        "Corporate Retreat" event starts in 2 days
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OrganizerLayout>
  );
}