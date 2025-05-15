import { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Select from '../../components/common/Select';
import { RequestCategory, RequestPriority } from '../../types';

const RaiseRequest = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<RequestCategory>('technical');
  const [priority, setPriority] = useState<RequestPriority>('medium');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('technical');
      setPriority('medium');
      setFile(null);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Raise a New Request</h1>
      
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
                Your request has been submitted successfully! An administrator will review it shortly.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Request Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief title describing the issue"
            required
            fullWidth
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as RequestCategory)}
              options={[
                { value: 'technical', label: 'Technical' },
                { value: 'library', label: 'Library' },
                { value: 'hostel', label: 'Hostel' },
                { value: 'food-court', label: 'Food Court' },
                { value: 'management', label: 'Management' },
                { value: 'other', label: 'Other' },
              ]}
            />
            
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as RequestPriority)}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
            />
          </div>
          
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide details about the issue..."
            rows={5}
            required
            fullWidth
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachment (Optional)
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
            <p className="mt-1 text-sm text-gray-500">
              Upload an image or document related to the issue (max 5MB).
            </p>
          </div>
          
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              disabled={!title || !description}
            >
              Submit Request
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RaiseRequest;