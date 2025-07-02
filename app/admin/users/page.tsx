"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Users, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Calendar,
  Mail,
  Shield,
  Activity
} from 'lucide-react';
import { AdminLayout } from '@/components/admin-layout';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  eventsCount: number;
  joinDate: string;
  last_login: string;
  avatar?: string;
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock users data
  const users: User[] = [
    {
      id: 'user_001',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'organizer',
      status: 'active',
      eventsCount: 12,
      joinDate: '2024-01-15',
      last_login: '2024-06-15T10:30:00Z'
    },
    {
      id: 'user_002',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'organizer',
      status: 'active',
      eventsCount: 8,
      joinDate: '2024-02-20',
      last_login: '2024-06-14T15:45:00Z'
    },
    {
      id: 'user_003',
      name: 'Mike Wilson',
      email: 'mike@events.com',
      role: 'organizer',
      status: 'inactive',
      eventsCount: 3,
      joinDate: '2024-03-10',
      last_login: '2024-05-20T09:15:00Z'
    },
    {
      id: 'user_004',
      name: 'Admin User',
      email: 'admin@capme.ai',
      role: 'admin',
      status: 'active',
      eventsCount: 0,
      joinDate: '2024-01-01',
      last_login: '2024-06-15T12:00:00Z'
    },
    {
      id: 'user_005',
      name: 'Lisa Brown',
      email: 'lisa@photography.com',
      role: 'organizer',
      status: 'suspended',
      eventsCount: 5,
      joinDate: '2024-04-05',
      last_login: '2024-06-10T14:20:00Z'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'organizer': return 'bg-blue-500';
      case 'user': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleUserAction = (action: string, userId: string) => {
    toast.success(`User ${action} successfully`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString: string) => {
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
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage platform users, organizers, and administrators
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
            <CardDescription>
              Filter users by role, status, or search term
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="organizer">Organizer</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{users.length}</div>
              <div className="text-sm text-gray-500">Total Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</div>
              <div className="text-sm text-gray-500">Admins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'organizer').length}</div>
              <div className="text-sm text-gray-500">Organizers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <CardDescription>
              Platform users and their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-500">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          Joined {formatDate(user.joinDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant="secondary" 
                          className={`text-white ${getRoleColor(user.role)}`}
                        >
                          {user.role}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`text-white ${getStatusColor(user.status)}`}
                        >
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{user.eventsCount} events</p>
                      <p className="text-xs text-gray-500">
                        Last login: {formatLastLogin(user.last_login)}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUserAction('edited', user.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUserAction('deleted', user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No Users Found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all'
                  ? 'No users match your current filters.'
                  : 'No users have been created yet.'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* User Details Modal */}
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Complete user information and activity
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-medium text-xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getRoleColor(selectedUser.role)}`}
                      >
                        {selectedUser.role}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getStatusColor(selectedUser.status)}`}
                      >
                        {selectedUser.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Account Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Joined {formatDate(selectedUser.joinDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-gray-400" />
                        <span>Last login {formatLastLogin(selectedUser.last_login)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Activity Stats</h4>
                    <div className="space-y-2 text-sm">
                      <p>Events Created: {selectedUser.eventsCount}</p>
                      <p>Total Photos: {selectedUser.eventsCount * 45}</p>
                      <p>Revenue Generated: ${(selectedUser.eventsCount * 23.50).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      handleUserAction('edited', selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit User
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUserAction('suspended', selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="flex-1"
                  >
                    Suspend User
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleUserAction('deleted', selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete User
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}