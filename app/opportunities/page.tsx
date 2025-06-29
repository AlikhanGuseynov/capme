"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Calendar, 
  MapPin, 
  DollarSign,
  Users,
  Star,
  Clock,
  Send,
  Plus,
  Briefcase,
  Award,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/theme-toggle';

interface EventOpportunity {
  id: string;
  title: string;
  type: 'photography' | 'event-hosting';
  date: string;
  location: string;
  budget: string;
  description: string;
  requirements: string[];
  organizer: string;
  rating: number;
  applicants: number;
  status: 'open' | 'filled' | 'closed';
}

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState('browse');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventBudget, setEventBudget] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [photographerName, setPhotographerName] = useState('');
  const [photographerEmail, setPhotographerEmail] = useState('');
  const [photographerPortfolio, setPhotographerPortfolio] = useState('');
  const [photographerExperience, setPhotographerExperience] = useState('');

  // Mock opportunities data
  const opportunities: EventOpportunity[] = [
    {
      id: 'opp_001',
      title: 'Wedding Photography - Central Park',
      type: 'photography',
      date: '2024-07-15',
      location: 'Central Park, New York',
      budget: '$800 - $1,200',
      description: 'Looking for an experienced wedding photographer for an intimate ceremony in Central Park. Need someone who can capture candid moments and has experience with outdoor lighting.',
      requirements: ['Professional camera equipment', '3+ years wedding experience', 'Portfolio required'],
      organizer: 'Sarah & Michael',
      rating: 4.9,
      applicants: 12,
      status: 'open'
    },
    {
      id: 'opp_002',
      title: 'Corporate Event Photography',
      type: 'photography',
      date: '2024-06-28',
      location: 'Manhattan Conference Center',
      budget: '$500 - $700',
      description: 'Corporate retreat photography needed. Event includes presentations, team building activities, and networking sessions. Professional headshots also required.',
      requirements: ['Business photography experience', 'Professional editing skills', 'Same-day delivery'],
      organizer: 'TechCorp Inc.',
      rating: 4.7,
      applicants: 8,
      status: 'open'
    },
    {
      id: 'opp_003',
      title: 'Birthday Party Host Needed',
      type: 'event-hosting',
      date: '2024-07-02',
      location: 'Brooklyn Community Center',
      budget: '$300 - $400',
      description: 'Need an energetic event host for a 10-year-old birthday party. Should be good with kids and able to organize games and activities.',
      requirements: ['Experience with children', 'Entertainment skills', 'Own transportation'],
      organizer: 'Jennifer Martinez',
      rating: 4.8,
      applicants: 5,
      status: 'open'
    },
    {
      id: 'opp_004',
      title: 'Graduation Photography',
      type: 'photography',
      date: '2024-06-20',
      location: 'Columbia University',
      budget: '$400 - $600',
      description: 'Family graduation photos needed. Looking for someone who can capture both formal portraits and candid celebration moments.',
      requirements: ['Portrait photography experience', 'Quick turnaround', 'Family-friendly approach'],
      organizer: 'The Johnson Family',
      rating: 5.0,
      applicants: 15,
      status: 'filled'
    }
  ];

  const handleSubmitEvent = () => {
    if (!eventTitle || !eventDate || !eventLocation || !eventDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Event opportunity posted successfully! We\'ll review and publish it soon.');
    
    // Reset form
    setEventTitle('');
    setEventDate('');
    setEventLocation('');
    setEventBudget('');
    setEventDescription('');
  };

  const handleApplyAsPhotographer = () => {
    if (!photographerName || !photographerEmail || !photographerExperience) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Application submitted successfully! We\'ll be in touch soon.');
    
    // Reset form
    setPhotographerName('');
    setPhotographerEmail('');
    setPhotographerPortfolio('');
    setPhotographerExperience('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'filled': return 'bg-blue-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'photography' ? Camera : Users;
  };

  const getTypeColor = (type: string) => {
    return type === 'photography' ? 'text-purple-500' : 'text-cyan-500';
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Briefcase className="w-4 h-4 mr-2" />
              Event Opportunities
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Event Opportunities & Photography Gigs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connect with event organizers and photographers. Find opportunities to earn money with your skills or get help for your events.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="browse">Browse Opportunities</TabsTrigger>
              <TabsTrigger value="post-event">Post an Event</TabsTrigger>
              <TabsTrigger value="join-photographers">Join as Photographer</TabsTrigger>
            </TabsList>

            {/* Browse Opportunities */}
            <TabsContent value="browse" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {opportunities.map((opportunity) => {
                  const TypeIcon = getTypeIcon(opportunity.type);
                  return (
                    <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <TypeIcon className={`w-5 h-5 ${getTypeColor(opportunity.type)}`} />
                              <Badge variant="outline" className="text-xs">
                                {opportunity.type === 'photography' ? 'Photography' : 'Event Hosting'}
                              </Badge>
                              <Badge 
                                variant="secondary" 
                                className={`text-white text-xs ${getStatusColor(opportunity.status)}`}
                              >
                                {opportunity.status}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                            <CardDescription className="mt-2">
                              {opportunity.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Event Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {opportunity.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {opportunity.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            {opportunity.budget}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            {opportunity.applicants} applicants
                          </div>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.requirements.map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Organizer Info */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                              <Users className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{opportunity.organizer}</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-gray-500">{opportunity.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            disabled={opportunity.status !== 'open'}
                            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                          >
                            {opportunity.status === 'open' ? 'Apply Now' : 
                             opportunity.status === 'filled' ? 'Position Filled' : 'Closed'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Post an Event */}
            <TabsContent value="post-event" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Post Your Event Opportunity
                  </CardTitle>
                  <CardDescription>
                    Need a photographer or event host? Post your opportunity and connect with talented professionals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventTitle">Event Title *</Label>
                      <Input
                        id="eventTitle"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="e.g., Wedding Photography Needed"
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventDate">Event Date *</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventLocation">Location *</Label>
                      <Input
                        id="eventLocation"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g., Central Park, New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventBudget">Budget Range</Label>
                      <Input
                        id="eventBudget"
                        value={eventBudget}
                        onChange={(e) => setEventBudget(e.target.value)}
                        placeholder="e.g., $500 - $800"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="eventDescription">Event Description *</Label>
                    <Textarea
                      id="eventDescription"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Describe your event, what you need, and any specific requirements..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={handleSubmitEvent}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Post Event Opportunity
                  </Button>
                </CardContent>
              </Card>

              {/* Benefits Card */}
              <Card className="bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                        Why Post on Capme.ai?
                      </h3>
                      <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                        <li>• Connect with verified photographers and event professionals</li>
                        <li>• Integrated with our AI photo sharing platform</li>
                        <li>• Secure payment processing and contracts</li>
                        <li>• Quality assurance and rating system</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Join as Photographer */}
            <TabsContent value="join-photographers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Join Our Photographer Network
                  </CardTitle>
                  <CardDescription>
                    Earn money with your photography skills. Join our network of professional photographers and event hosts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="photographerName">Full Name *</Label>
                      <Input
                        id="photographerName"
                        value={photographerName}
                        onChange={(e) => setPhotographerName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="photographerEmail">Email Address *</Label>
                      <Input
                        id="photographerEmail"
                        type="email"
                        value={photographerEmail}
                        onChange={(e) => setPhotographerEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="photographerPortfolio">Portfolio Website/Instagram</Label>
                    <Input
                      id="photographerPortfolio"
                      value={photographerPortfolio}
                      onChange={(e) => setPhotographerPortfolio(e.target.value)}
                      placeholder="https://yourportfolio.com or @instagram"
                    />
                  </div>

                  <div>
                    <Label htmlFor="photographerExperience">Experience & Specialties *</Label>
                    <Textarea
                      id="photographerExperience"
                      value={photographerExperience}
                      onChange={(e) => setPhotographerExperience(e.target.value)}
                      placeholder="Tell us about your photography experience, specialties, equipment, and what makes you unique..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={handleApplyAsPhotographer}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Apply to Join Network
                  </Button>
                </CardContent>
              </Card>

              {/* Earnings Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold">$300-1200</div>
                    <div className="text-sm text-gray-500">Per Event</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">Flexible</div>
                    <div className="text-sm text-gray-500">Schedule</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <div className="text-2xl font-bold">4.8/5</div>
                    <div className="text-sm text-gray-500">Avg Rating</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}