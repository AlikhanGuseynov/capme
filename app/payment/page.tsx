"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Camera, 
  CreditCard, 
  Download,
  ArrowLeft,
  Shield,
  CheckCircle,
  Mail,
  Package
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/theme-toggle';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  // Get URL parameters
  const eventId = searchParams.get('event') || '';
  const eventName = searchParams.get('eventName') || 'Event';
  const matchCount = parseInt(searchParams.get('matches') || '0');
  
  const price = 3.99;
  const tax = 0.32;
  const total = price + tax;

  useEffect(() => {
    if (!eventId || matchCount === 0) {
      router.push('/find-photos');
    }
  }, [eventId, matchCount, router]);

  const handlePayment = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate Stripe payment processing
      toast.info('Processing payment...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment success
      toast.info('Creating download package...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPaymentCompleted(true);
      toast.success('Payment successful! Check your email for the download link.');
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <Card className="glass-effect border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4">
                  Payment Successful!
                </CardTitle>
                <CardDescription className="text-lg">
                  Your photos are being prepared for download
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold">Check Your Email</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We've sent a download link to <strong>{email}</strong>. 
                    The ZIP file contains all {matchCount} photos and videos where your face was detected.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <Package className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl font-bold">{matchCount}</div>
                    <div className="text-sm text-gray-500">Files Included</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <Download className="w-8 h-8 mx-auto mb-2 text-cyan-500" />
                    <div className="text-2xl font-bold">ZIP</div>
                    <div className="text-sm text-gray-500">Download Format</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Link href="/find-photos">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                  Find More Photos
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="text-gray-500">
                  Back to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <Link href="/find-photos">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search Results
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Summary
                </CardTitle>
                <CardDescription>
                  Your personalized photo collection from {decodeURIComponent(eventName)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Event Details */}
                <div className="bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{decodeURIComponent(eventName)}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {matchCount} photos and videos containing your face
                  </p>
                </div>

                {/* Package Contents */}
                <div>
                  <h4 className="font-medium mb-3">What's Included:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      High-resolution photos ({Math.floor(matchCount * 0.8)} files)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Videos ({Math.floor(matchCount * 0.2)} files)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Organized in ZIP format
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Instant email delivery
                    </li>
                  </ul>
                </div>

                {/* Pricing */}
                <div className="space-y-3">
                  <Separator />
                  <div className="flex justify-between">
                    <span>Photo Collection</span>
                    <span>${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Processing Fee</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Secure & Private
                    </p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Your photos are processed securely and permanently deleted after 30 days. 
                      Payment processed by Stripe.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </CardTitle>
                <CardDescription>
                  Enter your information to complete the purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email */}
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Download link will be sent to this email
                  </p>
                </div>

                {/* Mock Payment Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card">Card Number</Label>
                    <Input
                      id="card"
                      placeholder="4242 4242 4242 4242"
                      value="4242 4242 4242 4242"
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                    <p className="text-xs text-gray-500 mt-1">Demo mode - use test card</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input
                        id="expiry"
                        placeholder="12/24"
                        value="12/24"
                        readOnly
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value="123"
                        readOnly
                        className="bg-gray-50 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing || !email}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <CreditCard className="w-5 h-5 mr-2 animate-pulse" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Pay ${total.toFixed(2)} & Download
                    </>
                  )}
                </Button>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-4 pt-4">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    SSL Secured
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Stripe Powered
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}