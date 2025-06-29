"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Images, 
  Search, 
  Filter,
  Play,
  Eye,
  Download,
  Trash2,
  Users,
  Calendar
} from 'lucide-react';
import { AdminLayout } from '@/components/admin-layout';
import { toast } from 'sonner';

interface MediaFile {
  id: string;
  filename: string;
  eventId: string;
  eventName: string;
  type: 'image' | 'video';
  url: string;
  uploadDate: string;
  facesDetected: number;
  size: string;
  uploader?: string;
}

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);

  // Mock media data
  const mediaFiles: MediaFile[] = [
    {
      id: 'media_001',
      filename: 'wedding_001.jpg',
      eventId: 'evt_001',
      eventName: 'Summer Wedding 2024',
      type: 'image',
      url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=400',
      uploadDate: '2024-06-15',
      facesDetected: 3,
      size: '2.4 MB',
      uploader: 'John Doe'
    },
    {
      id: 'media_002',
      filename: 'wedding_002.mp4',
      eventId: 'evt_001',
      eventName: 'Summer Wedding 2024',
      type: 'video',
      url: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=400',
      uploadDate: '2024-06-15',
      facesDetected: 5,
      size: '15.2 MB'
    },
    {
      id: 'media_003',
      filename: 'corporate_001.jpg',
      eventId: 'evt_002',
      eventName: 'Corporate Retreat',
      type: 'image',
      url: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=400',
      uploadDate: '2024-06-10',
      facesDetected: 8,
      size: '3.1 MB'
    },
    {
      id: 'media_004',
      filename: 'birthday_001.jpg',
      eventId: 'evt_003',
      eventName: 'Birthday Party',
      type: 'image',
      url: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=400',
      uploadDate: '2024-06-08',
      facesDetected: 2,
      size: '1.8 MB',
      uploader: 'Sarah Smith'
    },
    {
      id: 'media_005',
      filename: 'reunion_001.jpg',
      eventId: 'evt_004',
      eventName: 'College Reunion',
      type: 'image',
      url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      uploadDate: '2024-06-05',
      facesDetected: 12,
      size: '4.2 MB'
    },
    {
      id: 'media_006',
      filename: 'reunion_002.mp4',
      eventId: 'evt_004',
      eventName: 'College Reunion',
      type: 'video',
      url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      uploadDate: '2024-06-05',
      facesDetected: 7,
      size: '22.5 MB'
    }
  ];

  const events = [
    { id: 'evt_001', name: 'Summer Wedding 2024' },
    { id: 'evt_002', name: 'Corporate Retreat' },
    { id: 'evt_003', name: 'Birthday Party' },
    { id: 'evt_004', name: 'College Reunion' }
  ];

  const filteredMedia = mediaFiles.filter(media => {
    const matchesSearch = media.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         media.eventName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = selectedEvent === 'all' || media.eventId === selectedEvent;
    const matchesType = selectedType === 'all' || media.type === selectedType;
    
    return matchesSearch && matchesEvent && matchesType;
  });

  const handleDeleteMedia = (id: string) => {
    toast.success('Media file deleted successfully');
  };

  const handleViewMedia = (media: MediaFile) => {
    setSelectedMedia(media);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Media Manager</h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage uploaded photos and videos
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
            <CardDescription>
              Filter media files by event, type, or search term
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search media files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Images className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{mediaFiles.length}</div>
              <div className="text-sm text-gray-500">Total Files</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Images className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{mediaFiles.filter(m => m.type === 'image').length}</div>
              <div className="text-sm text-gray-500">Images</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Play className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{mediaFiles.filter(m => m.type === 'video').length}</div>
              <div className="text-sm text-gray-500">Videos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{mediaFiles.reduce((acc, m) => acc + m.facesDetected, 0)}</div>
              <div className="text-sm text-gray-500">Faces Detected</div>
            </CardContent>
          </Card>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMedia.map((media) => (
            <Card key={media.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <img
                  src={media.url}
                  alt={media.filename}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                {media.type === 'video' && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Play className="w-3 h-3 mr-1" />
                      Video
                    </Badge>
                  </div>
                )}
                {media.facesDetected > 0 && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Users className="w-3 h-3 mr-1" />
                      {media.facesDetected}
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleViewMedia(media)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDeleteMedia(media.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium text-sm truncate">{media.filename}</h4>
                <p className="text-xs text-gray-500 truncate">{media.eventName}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{media.size}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{media.uploadDate}</span>
                  </div>
                </div>
                {media.uploader && (
                  <p className="text-xs text-purple-600 mt-1">By {media.uploader}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Images className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No Media Found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedEvent !== 'all' || selectedType !== 'all'
                  ? 'No media files match your current filters.'
                  : 'No media files have been uploaded yet.'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Media Viewer Modal */}
        <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedMedia?.filename}</DialogTitle>
              <DialogDescription>
                From {selectedMedia?.eventName} • {selectedMedia?.uploadDate}
              </DialogDescription>
            </DialogHeader>
            {selectedMedia && (
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.filename}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <p className="font-medium capitalize">{selectedMedia.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Size:</span>
                    <p className="font-medium">{selectedMedia.size}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Faces:</span>
                    <p className="font-medium">{selectedMedia.facesDetected}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Uploader:</span>
                    <p className="font-medium">{selectedMedia.uploader || 'Anonymous'}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Users className="w-4 h-4 mr-2" />
                    View Faces
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}