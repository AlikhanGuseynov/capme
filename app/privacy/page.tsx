"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Camera, 
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function PrivacyPage() {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: January 1, 2025
            </p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Lock className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="font-semibold mb-2">Secure Processing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All data is encrypted and processed securely using industry standards
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Trash2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="font-semibold mb-2">Auto-Deletion</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All photos and facial data automatically deleted after 30 days
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Eye className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold mb-2">No Tracking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We don't track users or sell personal data to third parties
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Your Privacy Matters
              </CardTitle>
              <CardDescription>
                We are committed to protecting your privacy and being transparent about how we handle your data.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-4">1. Information We Collect</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We collect information you provide directly to us and information automatically collected when you use our Service:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Information You Provide:</h4>
                      <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                        <li>Email address for account creation and communication</li>
                        <li>Photos and videos you upload to events</li>
                        <li>Selfies used for facial recognition matching</li>
                        <li>Payment information (processed securely by Stripe)</li>
                        <li>Optional profile information (name, event details)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Automatically Collected Information:</h4>
                      <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                        <li>Device information and browser type</li>
                        <li>IP address and general location</li>
                        <li>Usage patterns and feature interactions</li>
                        <li>Error logs and performance data</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">2. How We Use Your Information</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Provide and improve our AI-powered photo matching service</li>
                    <li>Process facial recognition to find photos containing your face</li>
                    <li>Handle payments and deliver purchased photo collections</li>
                    <li>Send important service updates and notifications</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Analyze usage patterns to improve our platform</li>
                    <li>Ensure security and prevent fraud or abuse</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">3. Facial Recognition and AI Processing</h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-4">
                    <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Important: Automatic Data Deletion</h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      All uploaded photos, videos, and facial recognition data are automatically and permanently deleted after 30 days. This ensures your privacy and limits data retention.
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Our facial recognition process:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Detects faces in uploaded images and videos</li>
                    <li>Creates mathematical representations (embeddings) of facial features</li>
                    <li>Matches your selfie against these embeddings to find photos</li>
                    <li>Does not store actual facial images, only mathematical data</li>
                    <li>Cannot be used to reconstruct original photos from embeddings</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">4. Information Sharing and Disclosure</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share information only in these limited circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li><strong>Service Providers:</strong> Trusted partners who help operate our platform (hosting, payment processing, analytics)</li>
                    <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li><strong>Consent:</strong> When you explicitly agree to share information</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">5. Data Security</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We implement comprehensive security measures to protect your information:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>End-to-end encryption for all data transmission</li>
                    <li>Secure cloud storage with access controls</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Employee training on data protection practices</li>
                    <li>Incident response procedures for security breaches</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">6. Your Rights and Choices</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li><strong>Access:</strong> Request a copy of your personal information</li>
                    <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Receive your data in a portable format</li>
                    <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                    <li><strong>Restriction:</strong> Limit how we process your information</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">7. Cookies and Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze how you use our platform</li>
                    <li>Provide personalized experiences</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                    You can control cookies through your browser settings. See our <Link href="/cookies" className="text-purple-600 hover:underline">Cookie Policy</Link> for more details.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">8. International Data Transfers</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable laws.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">9. Children's Privacy</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">10. Changes to This Privacy Policy</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">11. Contact Us</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="font-medium">Capme.ai Privacy Team</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Email: privacy@capme.ai</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Address: 123 AI Street, Tech City, TC 12345</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Phone: +1 (555) 123-4567</p>
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