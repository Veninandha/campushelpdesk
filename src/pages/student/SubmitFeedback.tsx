import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Textarea from '../../components/common/Textarea';
import Select from '../../components/common/Select';
import { useAuth } from '../../contexts/AuthContext';
import { requests } from '../../data/mockData';

const SubmitFeedback = () => {
  const { user } = useAuth();
  const [requestId, setRequestId] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Filter resolved requests for the current user
  const resolvedRequests = user
    ? requests.filter(
        (request) =>
          request.userId === user.id && request.status === 'resolved'
      )
    : [];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form
      setRequestId('');
      setRating(0);
      setComment('');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Submit Feedback</h1>
      
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 animate-pulse">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                Thank you for your feedback! Your response has been recorded.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {resolvedRequests.length > 0 ? (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              label="Select Request"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              options={[
                { value: '', label: 'Select a resolved request' },
                ...resolvedRequests.map((request) => ({
                  value: request.id,
                  label: request.title,
                })),
              ]}
              required
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate Your Experience
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="text-gray-300 hover:text-amber-400 focus:outline-none p-1"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-gray-700">
                  {rating ? `${rating} out of 5` : 'Select a rating'}
                </span>
              </div>
            </div>
            
            <Textarea
              label="Additional Comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Please share your experience with how your request was handled..."
              rows={4}
              fullWidth
            />
            
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<MessageSquare />}
                isLoading={isSubmitting}
                disabled={!requestId || rating === 0}
              >
                Submit Feedback
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card>
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resolved requests found</h3>
            <p className="text-gray-500 mb-6">
              You don't have any resolved requests to provide feedback for yet.
            </p>
            <Button
              variant="primary"
              onClick={() => window.location.href = '/student/my-requests'}
            >
              View My Requests
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SubmitFeedback;