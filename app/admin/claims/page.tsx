"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Eye, 
  Search, 
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react';
import { AdminLayout } from '@/components/admin-layout';
import { toast } from 'sonner';

interface Claim {
  id: string;
  eventId: string;
  eventName: string;
  userEmail: string;
  matchCount: number;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  createdAt: string;
  selfieUrl: string;
}

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  // Mock claims data
  const claims: Claim[] = [
    {
      id: 'claim_001',
      eventId: 'evt_001',
      eventName: 'Summer Wedding 2024',
      userEmail: 'john.doe@email.com',
      matchCount: 8,
      amount: 3.99,
      status: 'pending',
      createdAt: '2024-06-15T10:30:00Z',
      selfieUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'claim_002',
      eventId: 'evt_002',
      eventName: 'Corporate Retreat',
      userEmail: 'sarah.smith@company.com',
      matchCount: 12,
      amount: 3.99,
      status: 'approved',
      createdAt: '2024-06-14T15:45:00Z',
      selfieUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'claim_003',
      eventId: 'evt_003',
      eventName: 'Birthday Party',
      userEmail: 'mike.johnson@email.com',
      matchCount: 5,
      amount: 3.99,
      status: 'paid',
      createdAt: '2024-06-13T09:20:00Z',
      selfieUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'claim_004',
      eventId: 'evt_004',
      eventName: 'College Reunion',
      userEmail: 'lisa.brown@alumni.edu',
      matchCount: 15,
      amount: 3.99,
      status: 'rejected',
      createdAt: '2024-06-12T14:10:00Z',
      selfieUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.eventName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || claim.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'paid': return 'bg-blue-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'approved': return CheckCircle;
      case 'paid': return DollarSign;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const handleStatusUpdate = (claimId: string, newStatus: string) => {
    toast.success(`Claim ${newStatus} successfully`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Claims Management</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Review and manage photo download claims
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
            <CardDescription>
              Filter claims by status or search by email/event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by email or event..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{claims.filter(c => c.status === 'pending').length}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{claims.filter(c => c.status === 'approved').length}</div>
              <div className="text-sm text-gray-500">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{claims.filter(c => c.status === 'paid').length}</div>
              <div className="text-sm text-gray-500">Paid</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{claims.filter(c => c.status === 'rejected').length}</div>
              <div className="text-sm text-gray-500">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Claims List */}
        <Card>
          <CardHeader>
            <CardTitle>Claims ({filteredClaims.length})</CardTitle>
            <CardDescription>
              Recent photo download claims and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClaims.map((claim) => {
                const StatusIcon = getStatusIcon(claim.status);
                return (
                  <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={claim.selfieUrl}
                          alt="User selfie"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{claim.userEmail}</p>
                        <p className="text-sm text-gray-500">{claim.eventName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{formatDate(claim.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{claim.matchCount} photos</p>
                        <p className="text-sm text-gray-500">${claim.amount}</p>
                      </div>
                      
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getStatusColor(claim.status)} flex items-center gap-1`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {claim.status}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedClaim(claim)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        
                        {claim.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(claim.id, 'approved')}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(claim.id, 'rejected')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredClaims.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No Claims Found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedStatus !== 'all'
                  ? 'No claims match your current filters.'
                  : 'No claims have been submitted yet.'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Claim Details Modal */}
        <Dialog open={!!selectedClaim} onOpenChange={() => setSelectedClaim(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Claim Details</DialogTitle>
              <DialogDescription>
                Review claim information and matched photos
              </DialogDescription>
            </DialogHeader>
            {selectedClaim && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">User Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{selectedClaim.userEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(selectedClaim.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Claim Details</h4>
                    <div className="space-y-2 text-sm">
                      <p>Event: {selectedClaim.eventName}</p>
                      <p>Photos Found: {selectedClaim.matchCount}</p>
                      <p>Amount: ${selectedClaim.amount}</p>
                      <div className="flex items-center gap-2">
                        <span>Status:</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-white ${getStatusColor(selectedClaim.status)}`}
                        >
                          {selectedClaim.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Submitted Selfie</h4>
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={selectedClaim.selfieUrl}
                      alt="Submitted selfie"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {selectedClaim.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        handleStatusUpdate(selectedClaim.id, 'approved');
                        setSelectedClaim(null);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Claim
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleStatusUpdate(selectedClaim.id, 'rejected');
                        setSelectedClaim(null);
                      }}
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Claim
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}