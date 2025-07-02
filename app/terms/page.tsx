"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Camera, 
  ArrowLeft,
  Shield,
  FileText,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: January 1, 2025
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Agreement to Terms
              </CardTitle>
              <CardDescription>
                By accessing and using Capme.ai, you agree to be bound by these Terms and Conditions.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    By accessing and using the Capme.ai platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">2. Description of Service</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Capme.ai is an AI-powered photo discovery platform that allows users to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Upload photos and videos from events</li>
                    <li>Use facial recognition technology to find photos containing their face</li>
                    <li>Purchase and download collections of matched photos</li>
                    <li>Organize and manage events through our platform</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">3. User Accounts and Registration</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    To access certain features of our Service, you may be required to register for an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Accept responsibility for all activities under your account</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">4. Photo Upload and Content</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    When uploading content to our platform, you represent and warrant that:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>You own or have the necessary rights to upload the content</li>
                    <li>The content does not violate any third-party rights</li>
                    <li>The content does not contain illegal, harmful, or offensive material</li>
                    <li>You have consent from individuals appearing in photos/videos</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">5. AI Processing and Facial Recognition</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Our Service uses artificial intelligence and facial recognition technology to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Detect and analyze faces in uploaded images and videos</li>
                    <li>Create facial embeddings for matching purposes</li>
                    <li>Match user selfies with photos in our database</li>
                    <li>Automatically delete facial data after 30 days</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">6. Payment and Refunds</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Payment terms for our Service:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>All payments are processed securely through Stripe</li>
                    <li>Prices are clearly displayed before purchase</li>
                    <li>Digital downloads are delivered immediately upon payment</li>
                    <li>Refunds may be provided at our discretion for technical issues</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">7. Data Retention and Deletion</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We automatically delete all uploaded photos, videos, and facial recognition data after 30 days to protect user privacy. Users are responsible for downloading their purchased content within this timeframe.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">8. Prohibited Uses</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    You may not use our Service to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Upload content that violates laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Attempt to reverse engineer our AI technology</li>
                    <li>Use the service for commercial purposes without permission</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">9. Limitation of Liability</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Capme.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">10. Changes to Terms</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our platform. Continued use of the Service after changes constitutes acceptance of the new terms.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">11. Contact Information</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    If you have any questions about these Terms & Conditions, please contact us at:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
                    <p className="font-medium">Capme.ai Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Email: legal@capme.ai</p>
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