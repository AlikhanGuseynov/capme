"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Camera, 
  LogIn,
  Shield,
  User,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (email === 'admin@capme.ai' && password === 'admin123') {
        toast.success('Welcome back, Super Admin!');
        router.push('/admin/dashboard');
      } else if (email === 'organizer@event.com' && password === 'organizer123') {
        toast.success('Welcome back, Event Organizer!');
        router.push('/organizer/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Access your admin dashboard
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                Sign In
              </CardTitle>
              <CardDescription>
                Enter your admin credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@capme.ai"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <LogIn className="w-5 h-5 mr-2 animate-pulse" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Demo Credentials
                </h3>
                <div className="text-sm space-y-1">
                  <p><strong>Super Admin:</strong> admin@capme.ai / admin123</p>
                  <p><strong>Event Organizer:</strong> organizer@event.com / organizer123</p>
                </div>
              </div>

              {/* Signup Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Don't have an account?
                </p>
                <Link href="/signup">
                  <Button variant="outline" className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up as Event Organizer
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
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