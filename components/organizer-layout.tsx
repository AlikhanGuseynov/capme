"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  LayoutDashboard, 
  Calendar, 
  Images, 
  Users, 
  CreditCard,
  Eye,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  QrCode,
  BarChart3,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { toast } from 'sonner';

interface OrganizerLayoutProps {
  children: React.ReactNode;
}

export function OrganizerLayout({ children }: OrganizerLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/organizer/dashboard', icon: LayoutDashboard, badge: null },
    { name: 'My Events', href: '/organizer/events', icon: Calendar, badge: '12' },
    { name: 'Media Library', href: '/organizer/media', icon: Images, badge: '847' },
    { name: 'Photo Claims', href: '/organizer/claims', icon: Eye, badge: '23' },
    { name: 'QR Codes', href: '/organizer/qr-codes', icon: QrCode, badge: null },
    { name: 'Analytics', href: '/organizer/analytics', icon: BarChart3, badge: null },
    { name: 'Payments', href: '/organizer/payments', icon: CreditCard, badge: null },
    { name: 'Settings', href: '/organizer/settings', icon: Settings, badge: null },
  ];

  const handleSignOut = () => {
    // Clear any authentication tokens/data
    localStorage.removeItem('organizerToken');
    sessionStorage.clear();
    
    // Show success message
    toast.success('Signed out successfully');
    
    // Redirect to admin login or home page
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-r transform transition-transform lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center gap-2 px-6 border-b">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Capme.ai
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 px-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link href="/organizer/events/create">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
            <Link href="/organizer/qr-codes/generate">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR
              </Button>
            </Link>
          </div>
        </div>

        {/* Organizer Info */}
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <div className="bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg p-3">
            <p className="text-sm font-medium">Event Organizer</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">organizer@event.com</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b">
          <div className="flex h-16 items-center gap-4 px-6">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex-1" />

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}