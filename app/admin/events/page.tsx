"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  Plus, 
  Search, 
  QrCode,
  Download,
  Edit,
  Trash2,
  Users,
  Camera,
  Activity
} from 'lucide-react';
import { AdminLayout } from '@/components/admin-layout';
import { toast } from 'sonner';

interface Event {
  id: string;
  name: string;
  date: string;
  status: 'active' | 'completed' | 'draft';
  uploads: number;
  claims: number;
  revenue: number;
  qrCode: string;
}

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  // Mock events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: 'evt_001',
      name: 'Summer Wedding 2024',
      date: '2024-06-15',
      status: 'active',
      uploads: 234,
      claims: 45,
      revenue: 180.00,
      qrCode: 'https://capme.ai/upload/evt_001'
    },
    {
      id: 'evt_002',
      name: 'Corporate Retreat',
      date: '2024-06-10',
      status: 'completed',
      uploads: 156,
      claims: 23,
      revenue: 92.00,
      qrCode: 'https://capme.ai/upload/evt_002'
    },
    {
      id: 'evt_003',
      name: 'Birthday Party',
      date: '2024-06-08',
      status: 'active',
      uploads: 89,
      claims: 12,
      revenue: 48.00,
      qrCode: 'https://capme.ai/upload/evt_003'
    },
    {
      id: 'evt_004',
      name: 'College Reunion',
      date: '2024-06-05',
      status: 'completed',
      uploads: 445,
      claims: 78,
      revenue: 312.00,
      qrCode: 'https://capme.ai/upload/evt_004'
    }
  ]);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEvent = () => {
    if (!newEventName || !newEventDate) {
      toast.error('Please fill in all fields');
      return;
    }

    const newEvent: Event = {
      id: `evt_${Date.now()}`,
      name: newEventName,
      date: newEventDate,
      status: 'draft',
      uploads: 0,
      claims: 0,
      revenue: 0,
      qrCode: `https://capme.ai/upload/evt_${Date.now()}`
    };

    setEvents(prev => [newEvent, ...prev]);
    setNewEventName('');
    setNewEventDate('');
    setIsCreateModalOpen(false);
    toast.success('Event created successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const copyQrCode = (qrCode: string) => {
    navigator.clipboard.writeText(qrCode);
    toast.success('QR code URL copied to clipboard!');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your events and photo collections
            </p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Create a new event to start collecting photos
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input
                    id="eventName"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="relative group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-white ${getStatusColor(event.status)}`}
                  >
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                    <Camera className="w-4 h-4 mx-auto mb-1 text-purple-500" />
                    <div className="text-sm font-medium">{event.uploads}</div>
                    <div className="text-xs text-gray-500">Photos</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                    <Users className="w-4 h-4 mx-auto mb-1 text-cyan-500" />
                    <div className="text-sm font-medium">{event.claims}</div>
                    <div className="text-xs text-gray-500">Claims</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                    <Activity className="w-4 h-4 mx-auto mb-1 text-green-500" />
                    <div className="text-sm font-medium">${event.revenue}</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>

                {/* QR Code URL */}
                <div className="bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <QrCode className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Upload URL</span>
                  </div>
                  <div className="text-xs font-mono bg-white dark:bg-gray-800 rounded px-2 py-1 break-all">
                    {event.qrCode}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyQrCode(event.qrCode)}
                    className="w-full mt-2 text-xs"
                  >
                    Copy URL
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No Events Found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'No events match your search criteria.' : 'Create your first event to get started.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}