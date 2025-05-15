import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Ticket, ClipboardCheck, Clock, AlertCircle, ArrowUpRight, Calendar
} from 'lucide-react';
import Card from '../../components/common/Card';
import { 
  requests, 
  getRequestCategoryData, 
  getRequestStatusData, 
  getCategoryColor,
  getStatusColor
} from '../../data/mockData';

const AdminOverview = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  // Count requests by status
  const openRequests = requests.filter(req => req.status === 'open').length;
  const inProgressRequests = requests.filter(req => req.status === 'in-progress').length;
  const resolvedRequests = requests.filter(req => req.status === 'resolved').length;
  const highPriorityRequests = requests.filter(req => req.priority === 'high').length;
  
  // Get data for charts
  const categoryData = getRequestCategoryData();
  const statusData = getRequestStatusData();
  
  // Generate time series data for line chart
  const generateTimeSeriesData = () => {
    return [
      { date: 'Day 1', requests: 4, resolved: 2 },
      { date: 'Day 2', requests: 3, resolved: 3 },
      { date: 'Day 3', requests: 5, resolved: 2 },
      { date: 'Day 4', requests: 7, resolved: 4 },
      { date: 'Day 5', requests: 2, resolved: 3 },
      { date: 'Day 6', requests: 6, resolved: 5 },
      { date: 'Day 7', requests: 8, resolved: 6 },
    ];
  };

  const timeSeriesData = generateTimeSeriesData();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border-t border-b border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Ticket className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Requests</p>
              <p className="text-2xl font-semibold text-gray-900">{openRequests}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            <span className="ml-1">5% increase</span>
          </div>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">{inProgressRequests}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            <span className="ml-1">12% increase</span>
          </div>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <ClipboardCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-semibold text-gray-900">{resolvedRequests}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            <span className="ml-1">18% increase</span>
          </div>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">High Priority</p>
              <p className="text-2xl font-semibold text-gray-900">{highPriorityRequests}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-600">
            <ArrowUpRight className="h-4 w-4" />
            <span className="ml-1">3% increase</span>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card title="Requests by Category">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Requests" fill="#3B82F6">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Requests by Status">
          <div className="h-72 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <Card title="Request Trends">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeSeriesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="requests" stroke="#3B82F6" name="New Requests" />
              <Line type="monotone" dataKey="resolved" stroke="#10B981" name="Resolved Requests" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AdminOverview;