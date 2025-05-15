import { useState } from 'react';
import { Filter, Star, StarHalf, StarOff } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Select from '../../components/common/Select';
import { feedbacks, getFeedbackSentimentColor } from '../../data/mockData';
import { Feedback, FeedbackSentiment } from '../../types';

const ViewFeedback = () => {
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredFeedbacks = sentimentFilter === 'all'
    ? feedbacks
    : feedbacks.filter(feedback => feedback.sentiment === sentimentFilter);
  
  // Prepare data for sentiment chart
  const sentimentData = [
    { name: 'Positive', value: feedbacks.filter(f => f.sentiment === 'positive').length, color: '#10B981' },
    { name: 'Neutral', value: feedbacks.filter(f => f.sentiment === 'neutral').length, color: '#F59E0B' },
    { name: 'Negative', value: feedbacks.filter(f => f.sentiment === 'negative').length, color: '#EF4444' },
  ];
  
  // Average rating calculation
  const averageRating = feedbacks.length > 0
    ? feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbacks.length
    : 0;
  
  const getSentimentBadge = (sentiment: FeedbackSentiment) => {
    switch (sentiment) {
      case 'positive':
        return <Badge variant="success" icon={<Star size={12} />}>Positive</Badge>;
      case 'neutral':
        return <Badge variant="warning" icon={<StarHalf size={12} />}>Neutral</Badge>;
      case 'negative':
        return <Badge variant="danger" icon={<StarOff size={12} />}>Negative</Badge>;
      default:
        return null;
    }
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 text-amber-400 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 text-amber-400 fill-current" />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOff key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Feedback Analysis</h1>
        
        <Button
          variant="outline"
          size="sm"
          icon={<Filter />}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      {showFilters && (
        <Card className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Filter by Sentiment"
              options={[
                { value: 'all', label: 'All Feedback' },
                { value: 'positive', label: 'Positive' },
                { value: 'neutral', label: 'Neutral' },
                { value: 'negative', label: 'Negative' },
              ]}
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
            />
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Average Rating</h3>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-4">
              {renderStars(averageRating)}
            </div>
            <p className="text-sm text-gray-500">Based on {feedbacks.length} feedbacks</p>
          </div>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Sentiment Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <Card title="Recent Feedback">
        <div className="space-y-4">
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <div key={feedback.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {renderStars(feedback.rating)}
                      </div>
                      {getSentimentBadge(feedback.sentiment)}
                    </div>
                    <p className="text-gray-700">{feedback.comment || 'No comment provided.'}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Request ID: {feedback.requestId}
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No feedback found with the selected filters.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ViewFeedback;