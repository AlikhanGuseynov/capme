"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Search, 
  Upload,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Download
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/theme-toggle';

interface MatchResult {
  id: string;
  url: string;
  confidence: number;
  isVideo: boolean;
}

export default function FindPhotosPage() {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [searchCompleted, setSearchCompleted] = useState(false);

  // Mock events data
  const events = [
    { id: 'evt_001', name: 'Summer Wedding 2024', date: '2024-06-15' },
    { id: 'evt_002', name: 'Corporate Retreat', date: '2024-05-20' },
    { id: 'evt_003', name: 'Birthday Party', date: '2024-04-18' },
    { id: 'evt_004', name: 'College Reunion', date: '2024-03-25' },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Cleanup old preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    }
  };

  const simulateSearch = async () => {
    setIsSearching(true);
    setSearchProgress(0);
    setMatches([]);
    setSearchCompleted(false);

    try {
      // Simulate AI processing stages
      const stages = [
        { message: 'Analyzing your selfie...', progress: 20 },
        { message: 'Extracting facial features...', progress: 40 },
        { message: 'Searching event database...', progress: 60 },
        { message: 'Finding matches...', progress: 80 },
        { message: 'Ranking results...', progress: 100 }
      ];

      for (const stage of stages) {
        toast.info(stage.message);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSearchProgress(stage.progress);
      }

      // Generate mock results
      const mockMatches: MatchResult[] = Array.from({ length: 8 }, (_, i) => ({
        id: `match_${i}`,
        url: `https://images.pexels.com/photos/${2000000 + i * 100000}/pexels-photo-${2000000 + i * 100000}.jpeg?auto=compress&cs=tinysrgb&w=400`,
        confidence: 0.95 - (i * 0.08),
        isVideo: i % 4 === 0
      }));

      setMatches(mockMatches);
      setSearchCompleted(true);
      toast.success(`Found ${mockMatches.length} photos containing your face!`);
    } catch (error) {
      toast.error('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    if (!selectedEvent) {
      toast.error('Please select an event');
      return;
    }
    
    if (!selectedFile) {
      toast.error('Please upload a selfie');
      return;
    }

    simulateSearch();
  };

  const handlePurchase = () => {
    const eventName = events.find(e => e.id === selectedEvent)?.name || 'Unknown Event';
    router.push(`/payment?event=${selectedEvent}&eventName=${encodeURIComponent(eventName)}&matches=${matches.length}`);
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
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Photo Discovery
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Photos
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Upload a selfie and select an event to find all photos containing your face
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Photo Search
              </CardTitle>
              <CardDescription>
                Choose an event and upload a clear selfie to find your photos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Event Selection */}
              <div>
                <Label htmlFor="event">Select Event</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an event..." />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{event.name}</span>
                          <span className="text-sm text-gray-500">{event.date}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selfie Upload */}
              <div>
                <Label htmlFor="selfie">Upload Your Selfie</Label>
                <div className="mt-2">
                  <Input
                    id="selfie"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('selfie')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Selfie
                    </Button>
                    {selectedFile && (
                      <span className="text-sm text-gray-600">
                        {selectedFile.name}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Preview */}
                {previewUrl && (
                  <div className="mt-4">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                      <img
                        src={previewUrl}
                        alt="Selfie preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !selectedEvent || !selectedFile}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                size="lg"
              >
                {isSearching ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Find My Photos
                  </>
                )}
              </Button>

              {/* Progress */}
              {isSearching && (
                <div className="space-y-2">
                  <Progress value={searchProgress} className="h-2" />
                  <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    {searchProgress}% complete
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search Results */}
          {matches.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Found {matches.length} Photos
                    </CardTitle>
                    <CardDescription>
                      Photos where your face was detected with high confidence
                    </CardDescription>
                  </div>
                  {searchCompleted && (
                    <Button 
                      onClick={handlePurchase}
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download All ($3.99)
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Results Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {matches.map((match) => (
                    <div key={match.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
                        <img
                          src={match.url}
                          alt="Matched photo"
                          className="w-full h-full object-cover filter blur-sm group-hover:blur-none transition-all duration-300"
                        />
                        {/* Watermark overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
                          <div className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                            PREVIEW
                          </div>
                        </div>
                        {/* Confidence badge */}
                        <Badge 
                          variant="secondary" 
                          className="absolute top-2 right-2 text-xs"
                        >
                          {(match.confidence * 100).toFixed(0)}%
                        </Badge>
                        {/* Video indicator */}
                        {match.isVideo && (
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="outline" className="text-xs">
                              VIDEO
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Info Card */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Preview Mode
                    </p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Photos are blurred for preview. Purchase to download full-resolution images and videos in a ZIP file.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}