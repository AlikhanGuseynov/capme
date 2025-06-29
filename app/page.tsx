"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Search, 
  Zap, 
  Shield, 
  Users, 
  Download,
  Sparkles,
  ArrowRight,
  Play,
  Upload,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Camera,
      title: "QR Code Upload",
      description: "Guests scan QR codes to instantly upload photos and videos during events",
      color: "text-blue-500"
    },
    {
      icon: Sparkles,
      title: "AI Face Recognition",
      description: "Advanced AI matches your selfie with all photos containing your face",
      color: "text-purple-500"
    },
    {
      icon: Download,
      title: "Instant Download",
      description: "Pay once and download all your photos in a convenient ZIP file",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your photos are processed securely and deleted after 30 days",
      color: "text-orange-500"
    }
  ];

  const stats = [
    { label: "Events Hosted", value: "2,500+", icon: Users },
    { label: "Photos Processed", value: "1M+", icon: Camera },
    { label: "Happy Customers", value: "50K+", icon: Sparkles },
    { label: "Success Rate", value: "99.9%", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Capme.ai
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Photo Discovery
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            Find Your Photos with
            <br />
            AI Face Recognition
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload photos at events, then use our AI to instantly find and download all photos containing your face. No more scrolling through hundreds of photos!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/find-photos">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                <Search className="w-5 h-5 mr-2" />
                Find My Photos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* New Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/upload-event-photos">
              <Button size="lg" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                <Upload className="w-5 h-5 mr-2" />
                Upload Event Photos
              </Button>
            </Link>
            <Link href="/opportunities">
              <Button size="lg" variant="outline" className="border-cyan-300 text-cyan-600 hover:bg-cyan-50">
                <Briefcase className="w-5 h-5 mr-2" />
                Event Opportunities
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-effect border-0">
                <CardContent className="p-4 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform makes finding your event photos effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`card-hover cursor-pointer transition-all duration-300 ${
                hoveredFeature === index ? 'scale-105 shadow-xl' : ''
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardHeader className="text-center">
                <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* New Opportunities Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-8">
                <Upload className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Share Your Event Photos</h3>
                <p className="mb-6 opacity-90">
                  Participated in an event? Upload your photos to help others find their memories using our AI technology.
                </p>
                <Link href="/upload-event-photos">
                  <Button variant="secondary" className="text-purple-600">
                    Upload Photos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0">
              <CardContent className="p-8">
                <Briefcase className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Earn with Your Skills</h3>
                <p className="mb-6 opacity-90">
                  Professional photographer or event host? Join our network and earn money by offering your services.
                </p>
                <Link href="/opportunities">
                  <Button variant="secondary" className="text-cyan-600">
                    View Opportunities
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-cyan-600 border-0 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Photos?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who've already discovered their event memories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/find-photos">
                <Button size="lg" variant="secondary" className="text-purple-600">
                  <Search className="w-5 h-5 mr-2" />
                  Start Searching
                </Button>
              </Link>
              <Link href="/upload">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  <Camera className="w-5 h-5 mr-2" />
                  Upload Photos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Capme.ai</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            © 2024 Capme.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}