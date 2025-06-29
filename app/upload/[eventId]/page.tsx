"use client";

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  X,
  Play,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

export default function EventUploadPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  
  const [uploaderName, setUploaderName] = useState('');
  const [uploaderEmail, setUploaderEmail] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  const handleFiles = useCallback((files: File[]) => {
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
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [handleFiles]);

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      // Cleanup preview URLs
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  const simulateUpload = async (fileId: string) => {
    // Simulate upload progress
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

    // Simulate AI processing
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
    if (uploadedFiles.length === 0) {
      toast.error('Please select at least one file to upload');
      return;
    }

    setIsSubmitting(true);

    try {
      // Process each file
      for (const file of uploadedFiles) {
        if (file.status === 'pending') {
          await simulateUpload(file.id);
        }
      }

      // Simulate saving to database
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('All files uploaded successfully!');
      router.push(`/upload/${eventId}/thank-you`);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      setUploadedFiles(prev => 
        prev.map(f => ({ ...f, status: 'error' }))
      );
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Upload Event Photos</h1>
              <p className="text-gray-600 dark:text-gray-300">Event ID: {eventId}</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="outline">
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Photos & Videos
              </CardTitle>
              <CardDescription>
                Drag and drop your photos and videos here, or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Uploader Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name (Optional)</Label>
                  <Input
                    id="name"
                    value={uploaderName}
                    onChange={(e) => setUploaderName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={uploaderEmail}
                    onChange={(e) => setUploaderEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

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
                      Drag & drop photos and videos here
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
                        {/* Preview */}
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
                        
                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.file.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                          
                          {/* Progress */}
                          {file.status !== 'pending' && file.status !== 'completed' && (
                            <div className="mt-2">
                              <Progress 
                                value={file.progress} 
                                className="h-2"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                {file.status === 'uploading' ? 'Uploading...' : 
                                 file.status === 'processing' ? 'Processing...' : 
                                 file.status}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Status & Actions */}
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
          {uploadedFiles.length > 0 && (
            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Upload className="w-5 h-5 mr-2 animate-spin" />
                    Processing Files...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Upload All Files
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}