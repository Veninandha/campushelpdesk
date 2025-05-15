import { useState, useEffect } from 'react';
import { Search, Filter, Edit, Eye, MessageSquare, Check, AlertTriangle, Clock, Trash } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { requests, getCategoryColor, getStatusColor, getPriorityColor } from '../../data/mockData';
import { Request, RequestStatus, RequestCategory, RequestPriority } from '../../types';

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const priorityOptions = [
  { value: 'all', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'technical', label: 'Technical' },
  { value: 'library', label: 'Library' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'food-court', label: 'Food Court' },
  { value: 'management', label: 'Management' },
  { value: 'other', label: 'Other' },
];

const ManageRequests = () => {
  const [filteredRequests, setFilteredRequests] = useState<Request[]>(requests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [showReplyModal, setShowReplyModal] = useState(false);


  useEffect(() => {
    let results = requests;

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

    // Filter by priority
    if (priorityFilter !== 'all') {
      results = results.filter((request) => request.priority === priorityFilter);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      results = results.filter((request) => request.category === categoryFilter);
    }

    setFilteredRequests(results);
  }, [searchTerm, statusFilter, priorityFilter, categoryFilter]);

  const getStatusBadge = (status: RequestStatus) => {
    const color = getStatusColor(status);

    switch (status) {
      case 'open':
        return <Badge variant="primary" icon={<AlertTriangle size={14} />}>Open</Badge>;
      case 'in-progress':
        return <Badge variant="warning" icon={<Clock size={14} />}>In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success" icon={<Check size={14} />}>Resolved</Badge>;
      case 'closed':
        return <Badge variant="default">Closed</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: RequestPriority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="danger">High</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium</Badge>;
      case 'low':
        return <Badge variant="success">Low</Badge>;
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: RequestCategory) => {
    const color = getCategoryColor(category);
    const label = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');

    return <Badge className={`bg-${color}-100 text-${color}-800`}>{label}</Badge>;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Manage Requests</h1>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Filter />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-5 w-5 text-gray-400" />}
            fullWidth
          />
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-200">
            <Select
              label="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />

            <Select
              label="Priority"
              options={priorityOptions}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            />

            <Select
              label="Category"
              options={categoryOptions}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
          </div>
        )}
      </Card>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Priority
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.id.substring(0, 6)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryBadge(request.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getPriorityBadge(request.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.location.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye size={16} />}
                        onClick={() => setSelectedRequest(request)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit size={16} />}
                        onClick={() => handleEditRequest(request)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<MessageSquare size={16} />}
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowReplyModal(true);
                        }}
                      >
                        Reply
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Check size={16} />}
                        onClick={() => {
                          const newStatus = request.status === 'open' ? 'in-progress' : 
                                         request.status === 'in-progress' ? 'resolved' : 'closed';
                          setFilteredRequests(prev => 
                            prev.map(r => r.id === request.id ? {...r, status: newStatus} : r)
                          );
                        }}
                      >
                        Update Status
                      </Button>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;