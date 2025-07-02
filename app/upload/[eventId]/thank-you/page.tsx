"use client";

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Camera, 
  Upload,
  ArrowRight,
  Home,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function ThankYouPage() {
  const params = useParams();
  const eventId = (params?.eventId as string) || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <Card className="glass-effect border-0 mb-8">
            <CardHeader>
              <Badge variant="secondary" className="mx-auto mb-4 w-fit">
                <Upload className="w-4 h-4 mr-2" />
                Upload Complete
              </Badge>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                Thank You!
              </CardTitle>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Your media has been successfully uploaded and processed with AI
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-600" />
                  What happens next?
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 text-left">
                  <li>• Your photos are being processed with AI face detection</li>
                  <li>• Faces are extracted and stored securely for matching</li>
                  <li>• Anyone can now find photos containing their face</li>
                  <li>• All data is automatically deleted after 30 days</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Event ID: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{eventId}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/upload/${eventId}`}>
                <Button size="lg" variant="outline">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload More Files
                </Button>
              </Link>
              <Link href="/find-photos">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                  <Search className="w-5 h-5 mr-2" />
                  Find My Photos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            <Link href="/">
              <Button variant="ghost" className="text-gray-500">
                <Home className="w-4 h-4 mr-2" />
                Back to Homepage
              </Button>
            </Link>
          </div>

          <Card className="mt-12 glass-effect border-0">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">📱 Share with Friends</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Tell others about this event so they can upload their photos too!
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm font-mono break-all">
                {typeof window !== 'undefined' && `${window.location.origin}/upload/${eventId}`}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}