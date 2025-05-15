import { useState, useEffect } from 'react';
import { Search, Filter, MessageSquare, Eye, Clock, AlertTriangle, CheckCircle, Trash } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useAuth } from '../../contexts/AuthContext';
import { requests } from '../../data/mockData';
import { Request, RequestStatus } from '../../types';

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const MyRequests = () => {
  const { user } = useAuth();
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  
  useEffect(() => {
    if (user) {
      // Filter requests for the current user
      const userRequests = requests.filter(request => request.userId === user.id);
      
      let results = userRequests;
      
      // Filter by search term
      if (searchTerm) {
        results = results.filter(
          (request) =>
            request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by status
      if (statusFilter !== 'all') {
        results = results.filter((request) => request.status === statusFilter);
      }
      
      setFilteredRequests(results);
    }
  }, [user, searchTerm, statusFilter]);
  
  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'open':
        return <Badge variant="primary" icon={<AlertTriangle size={14} />}>Open</Badge>;
      case 'in-progress':
        return <Badge variant="warning" icon={<Clock size={14} />}>In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success" icon={<CheckCircle size={14} />}>Resolved</Badge>;
      case 'closed':
        return <Badge variant="default">Closed</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">My Requests</h1>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Filter />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.location.href = '/student/raise-request'}
          >
            New Request
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search my requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-5 w-5 text-gray-400" />}
            fullWidth
          />
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-200">
            <Select
              label="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        )}
      </Card>
      
      {filteredRequests.length > 0 ? (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} hoverable>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{request.description}</p>
                      
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">Status:</span>
                          {getStatusBadge(request.status)}
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">Location:</span>
                          <span className="text-sm font-medium text-gray-700">{request.location.name}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">Created:</span>
                          <span className="text-sm text-gray-700">{new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                  {request.status === 'resolved' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      icon={<MessageSquare size={16} />}
                      onClick={() => window.location.href = '/student/feedback'}
                    >
                      Give Feedback
                    </Button>
                  )}
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={<Eye size={16} />}
                      onClick={() => setSelectedRequest(request)}
                    >
                      View
                    </Button>
                    {request.status === 'open' && (
                      <Button 
                        variant="danger" 
                        size="sm" 
                        icon={<Trash size={16} />}
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this request?')) {
                            try {
                              // Send delete request to backend
                              // await deleteRequest(request.id);
                              
                              // Update UI immediately
                              setFilteredRequests(prev => 
                                prev.filter(r => r.id !== request.id)
                              );
                            } catch (error) {
                              console.error('Failed to delete request:', error);
                              alert('Failed to delete request. Please try again.');
                            }
                          }
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {request.comments && request.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Latest Updates</h4>
                  <div className="space-y-3">
                    {request.comments
                      .filter(comment => !comment.isInternal)
                      .slice(0, 2)
                      .map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">{comment.content}</p>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <span>{comment.userName}</span>
                            <span className="mx-1">•</span>
                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'You haven\'t submitted any requests yet.'}
            </p>
            <Button
              variant="primary"
              onClick={() => window.location.href = '/student/raise-request'}
            >
              Create your first request
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MyRequests;