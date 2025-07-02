"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  ArrowLeft,
  Cookie,
  Settings,
  BarChart3,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function CookiesPage() {
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
          {/* Back Button */}
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: January 1, 2025
            </p>
          </div>

          {/* Cookie Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Settings className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <Badge variant="secondary" className="mb-2">Always Active</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Required for basic website functionality and security
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                <Badge variant="outline" className="mb-2">Optional</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Help us understand how users interact with our platform
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="font-semibold mb-2">Functional Cookies</h3>
                <Badge variant="outline" className="mb-2">Optional</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Remember your preferences and personalize your experience
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-5 h-5" />
                Understanding Cookies
              </CardTitle>
              <CardDescription>
                Learn about how we use cookies and similar technologies on Capme.ai
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-4">1. What Are Cookies?</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings. This can make your next visit easier and the site more useful to you.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">2. How We Use Cookies</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Capme.ai uses cookies for several purposes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>To ensure our website functions properly and securely</li>
                    <li>To remember your login status and preferences</li>
                    <li>To analyze how our website is used and improve performance</li>
                    <li>To provide personalized experiences</li>
                    <li>To prevent fraud and enhance security</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">3. Types of Cookies We Use</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                      <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Essential Cookies (Always Active)
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
                        These cookies are necessary for the website to function and cannot be switched off.
                      </p>
                      <ul className="list-disc pl-6 text-blue-700 dark:text-blue-300 text-sm space-y-1">
                        <li>Authentication and session management</li>
                        <li>Security and fraud prevention</li>
                        <li>Load balancing and performance</li>
                        <li>Basic website functionality</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                      <h4 className="font-semibold mb-3 text-green-900 dark:text-green-100 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Analytics Cookies (Optional)
                      </h4>
                      <p className="text-green-800 dark:text-green-200 text-sm mb-3">
                        These cookies help us understand how visitors interact with our website.
                      </p>
                      <ul className="list-disc pl-6 text-green-700 dark:text-green-300 text-sm space-y-1">
                        <li>Google Analytics for usage statistics</li>
                        <li>Page view and click tracking</li>
                        <li>Performance monitoring</li>
                        <li>Error tracking and debugging</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                      <h4 className="font-semibold mb-3 text-purple-900 dark:text-purple-100 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Functional Cookies (Optional)
                      </h4>
                      <p className="text-purple-800 dark:text-purple-200 text-sm mb-3">
                        These cookies enable enhanced functionality and personalization.
                      </p>
                      <ul className="list-disc pl-6 text-purple-700 dark:text-purple-300 text-sm space-y-1">
                        <li>Theme preferences (light/dark mode)</li>
                        <li>Language and region settings</li>
                        <li>Recently viewed events</li>
                        <li>User interface customizations</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">4. Third-Party Cookies</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We may use third-party services that set their own cookies:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li><strong>Stripe:</strong> For secure payment processing</li>
                    <li><strong>Google Analytics:</strong> For website analytics and insights</li>
                    <li><strong>Cloudflare:</strong> For content delivery and security</li>
                    <li><strong>Supabase:</strong> For backend services and authentication</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">5. Managing Your Cookie Preferences</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    You have several options for managing cookies:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Browser Settings:</h4>
                      <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                        <li>Most browsers allow you to view, delete, and block cookies</li>
                        <li>You can set your browser to notify you when cookies are being set</li>
                        <li>You can choose to accept or reject cookies on a case-by-case basis</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Our Cookie Banner:</h4>
                      <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                        <li>When you first visit our site, you'll see a cookie consent banner</li>
                        <li>You can choose which types of cookies to accept</li>
                        <li>You can change your preferences at any time through our cookie settings</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">6. Browser-Specific Instructions</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Here's how to manage cookies in popular browsers:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Chrome</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Settings → Privacy and security → Cookies and other site data
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Firefox</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Settings → Privacy & Security → Cookies and Site Data
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Safari</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Preferences → Privacy → Manage Website Data
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Edge</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Settings → Cookies and site permissions → Cookies and site data
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">7. Impact of Disabling Cookies</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    If you choose to disable cookies, some features of our website may not work properly:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>You may need to log in repeatedly</li>
                    <li>Your preferences and settings may not be saved</li>
                    <li>Some interactive features may not function correctly</li>
                    <li>We may not be able to provide personalized experiences</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">8. Updates to This Policy</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">9. Contact Us</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    If you have any questions about our use of cookies, please contact us:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="font-medium">Capme.ai Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Email: cookies@capme.ai</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Address: 123 AI Street, Tech City, TC 12345</p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}