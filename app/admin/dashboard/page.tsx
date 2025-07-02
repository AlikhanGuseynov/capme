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
  AlertCircle,
  Users,
  Shield,
  Database,
  Server,
  Settings
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

  const systemStats = [
    { label: "Server Uptime", value: "99.9%", icon: Server, color: "text-green-500" },
    { label: "Database Health", value: "Optimal", icon: Database, color: "text-blue-500" },
    { label: "AI Processing", value: "Active", icon: Zap, color: "text-purple-500" },
    { label: "Security Status", value: "Secure", icon: Shield, color: "text-green-500" }
  ];

  const recentEvents = [
    { id: 1, name: "Summer Wedding 2024", date: "2024-06-15", photos: 234, status: "active", organizer: "John Smith" },
    { id: 2, name: "Corporate Retreat", date: "2024-06-10", photos: 156, status: "completed", organizer: "TechCorp Inc." },
    { id: 3, name: "Birthday Party", date: "2024-06-08", photos: 89, status: "processing", organizer: "Sarah Johnson" },
    { id: 4, name: "College Reunion", date: "2024-06-05", photos: 445, status: "completed", organizer: "Alumni Association" }
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
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Complete platform overview and system management
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/system">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
            </Link>
          </div>
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

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              System Health
            </CardTitle>
            <CardDescription>
              Real-time system status and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {systemStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>
                Revenue and activity trends across all events
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
                Real-time platform metrics
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

        {/* Admin Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">User Management</h3>
              <p className="mb-4 opacity-90">
                Manage organizers, view user activity, and handle permissions
              </p>
              <Link href="/admin/users">
                <Button variant="secondary" className="text-blue-600">
                  Manage Users
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <Database className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Database Management</h3>
              <p className="mb-4 opacity-90">
                Monitor database performance and manage data retention
              </p>
              <Link href="/admin/database">
                <Button variant="secondary" className="text-purple-600">
                  View Database
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <Settings className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">System Settings</h3>
              <p className="mb-4 opacity-90">
                Configure platform settings and AI processing parameters
              </p>
              <Link href="/admin/system">
                <Button variant="secondary" className="text-green-600">
                  System Config
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events">All Events</TabsTrigger>
            <TabsTrigger value="activity">System Activity</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Platform Events</CardTitle>
                  <CardDescription>
                    Events across all organizers and their status
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
                          <p className="text-sm text-gray-500">by {event.organizer} • {event.date}</p>
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
                <CardTitle>System Activity</CardTitle>
                <CardDescription>
                  Platform-wide activity and system events
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
                  Critical system notifications and warnings
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
                        Storage is at 85% capacity. Consider cleaning up old events or upgrading storage.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-200">
                        AI processing queue
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        45 photos in AI processing queue. Average processing time: 2.3 seconds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <AlertCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        System backup completed
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Daily backup completed successfully. All data secured.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>
                  Generate and download platform reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Revenue Report</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Detailed revenue breakdown by events and time periods
                    </p>
                    <Button variant="outline" size="sm">Generate Report</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">User Activity Report</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      User engagement and platform usage statistics
                    </p>
                    <Button variant="outline" size="sm">Generate Report</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">System Performance</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      AI processing times and system performance metrics
                    </p>
                    <Button variant="outline" size="sm">Generate Report</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Security Audit</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Security events and access logs analysis
                    </p>
                    <Button variant="outline" size="sm">Generate Report</Button>
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