"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  X,
  Play,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

export default function UploadEventPhotosPage() {
  const [eventId, setEventId] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventFound, setEventFound] = useState<any>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Mock event data for validation
  const mockEvents = [
    { id: 'evt_001', name: 'Summer Wedding 2024', date: '2024-06-15', location: 'Central Park, NYC' },
    { id: 'evt_002', name: 'Corporate Retreat', date: '2024-05-20', location: 'Mountain Resort' },
    { id: 'evt_003', name: 'Birthday Party', date: '2024-04-18', location: 'Private Venue' },
    { id: 'evt_004', name: 'College Reunion', date: '2024-03-25', location: 'University Campus' },
  ];

  const handleEventIdChange = (value: string) => {
    setEventId(value);
    const found = mockEvents.find(e => e.id === value);
    setEventFound(found || null);
    if (found) {
      toast.success(`Event found: ${found.name}`);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB
      
      if (!isValidType) {
        toast.error(`${file.name} is not a valid image or video file`);
        return false;
      }
      
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 50MB`);
        return false;
      }
      
      return true;
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
      progress: 0
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  const simulateUpload = async (fileId: string) => {
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { ...f, progress, status: progress < 100 ? 'uploading' : 'processing' }
            : f
        )
      );
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadedFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'completed', progress: 100 }
          : f
      )
    );
  };

  const handleSubmit = async () => {
    if (!eventId || !participantName || !participantEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!eventFound) {
      toast.error('Please enter a valid Event ID');
      return;
    }

    if (uploadedFiles.length === 0) {
      toast.error('Please upload at least one photo or video');
      return;
    }

    setIsSubmitting(true);

    try {
      for (const file of uploadedFiles) {
        if (file.status === 'pending') {
          await simulateUpload(file.id);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Photos uploaded successfully! Thank you for participating!');
      
      // Reset form
      setEventId('');
      setParticipantName('');
      setParticipantEmail('');
      setEventDescription('');
      setUploadedFiles([]);
      setEventFound(null);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Upload className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'processing':
        return 'bg-purple-500';
      case 'uploading':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Capme.ai
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Camera className="w-4 h-4 mr-2" />
              Event Participant Upload
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Upload Your Event Photos
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Share your photos from events you've participated in. Help others find their memories!
            </p>
          </div>

          {/* Event Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Event Information
              </CardTitle>
              <CardDescription>
                Enter the Event ID to verify and upload your photos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="eventId">Event ID *</Label>
                <Input
                  id="eventId"
                  value={eventId}
                  onChange={(e) => handleEventIdChange(e.target.value)}
                  placeholder="Enter Event ID (e.g., evt_001)"
                  className={eventFound ? 'border-green-500' : ''}
                />
                {eventFound && (
                  <div className="mt-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800 dark:text-green-200">
                          Event Found: {eventFound.name}
                        </h4>
                        <div className="text-sm text-green-700 dark:text-green-300 mt-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {eventFound.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {eventFound.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="participantName">Your Name *</Label>
                  <Input
                    id="participantName"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="participantEmail">Your Email *</Label>
                  <Input
                    id="participantEmail"
                    type="email"
                    value={participantEmail}
                    onChange={(e) => setParticipantEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="eventDescription">Event Description (Optional)</Label>
                <Textarea
                  id="eventDescription"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Share your experience or any details about the photos you're uploading..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Photos & Videos
              </CardTitle>
              <CardDescription>
                Share your photos and videos from the event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20' 
                    : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                {isDragActive ? (
                  <div>
                    <p className="text-lg font-medium text-purple-600">Drop files here</p>
                    <p className="text-gray-500">Release to upload</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium mb-2">
                      Drag & drop your event photos and videos here
                    </p>
                    <p className="text-gray-500 mb-4">
                      or click to browse your files
                    </p>
                    <Button 
                      type="button"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                )}
              </div>

              {/* File List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Uploaded Files ({uploadedFiles.length})
                  </h3>
                  
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {file.file.type.startsWith('image/') ? (
                            <img 
                              src={file.preview} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Play className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.file.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                          
                          {file.status !== 'pending' && file.status !== 'completed' && (
                            <div className="mt-2">
                              <Progress value={file.progress} className="h-2" />
                              <p className="text-xs text-gray-500 mt-1">
                                {file.status === 'uploading' ? 'Uploading...' : 
                                 file.status === 'processing' ? 'Processing...' : 
                                 file.status}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getStatusIcon(file.status)}
                          <Badge 
                            variant="secondary"
                            className={`text-white ${getStatusColor(file.status)}`}
                          >
                            {file.status}
                          </Badge>
                          {file.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={handleSubmit}
              disabled={isSubmitting || !eventFound || !participantName || !participantEmail || uploadedFiles.length === 0}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Upload className="w-5 h-5 mr-2 animate-spin" />
                  Uploading Photos...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Share Event Photos
                </>
              )}
            </Button>
          </div>

          {/* Info Card */}
          <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Help Others Find Their Memories
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    By uploading your photos, you're helping other event participants find photos of themselves using our AI face recognition technology. Your contribution makes the platform better for everyone!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}