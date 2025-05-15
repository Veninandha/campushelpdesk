import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowUpRight, Clock, CheckCircle, AlertTriangle, BellRing } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { requests, announcements } from '../../data/mockData';

const StudentOverview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Filter requests for the current user
  const userRequests = requests.filter(request => request.userId === user?.id);
  
  // Count requests by status
  const openRequests = userRequests.filter(req => req.status === 'open').length;
  const inProgressRequests = userRequests.filter(req => req.status === 'in-progress').length;
  const resolvedRequests = userRequests.filter(req => req.status === 'resolved').length;
  const totalRequests = userRequests.length;
  
  // Get recent announcements
  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-1 text-gray-500">Here's an overview of your helpdesk activity.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card hoverable className="flex flex-col">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <PlusCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Requests</p>
              <p className="text-2xl font-semibold text-gray-900">{totalRequests}</p>
            </div>
          </div>
          <Button 
            className="mt-4" 
            onClick={() => navigate('/student/raise-request')}
          >
            Create New Request
          </Button>
        </Card>
        
        <Card hoverable className="border-l-4 border-l-blue-500">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open</p>
              <p className="text-2xl font-semibold text-gray-900">{openRequests}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => navigate('/student/my-requests')}
          >
            View Open Requests
          </Button>
        </Card>
        
        <Card hoverable className="border-l-4 border-l-orange-500">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">{inProgressRequests}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => navigate('/student/my-requests')}
          >
            Track Progress
          </Button>
        </Card>
        
        <Card hoverable className="border-l-4 border-l-green-500">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-semibold text-gray-900">{resolvedRequests}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => navigate('/student/feedback')}
          >
            Give Feedback
          </Button>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card 
            title="Recent Requests" 
            footer={
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/student/my-requests')}
              >
                View All Requests
              </Button>
            }
          >
            <div className="space-y-4">
              {userRequests.length > 0 ? (
                userRequests.slice(0, 3).map((request) => (
                  <div key={request.id} className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{request.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{request.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span>{request.location.name}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        request.status === 'open'
                          ? 'primary'
                          : request.status === 'in-progress'
                          ? 'warning'
                          : 'success'
                      }
                    >
                      {request.status.replace('-', ' ')}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  You haven't submitted any requests yet.
                </p>
              )}
            </div>
          </Card>
        </div>
        
        <Card 
          title="Announcements" 
          footer={
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/student/announcements')}
            >
              View All Announcements
            </Button>
          }
        >
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <BellRing className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{announcement.title}</h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">{announcement.content}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentOverview;