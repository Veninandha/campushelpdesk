import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Building, Phone, Globe, Camera } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const StudentProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('555-123-4567');
  const [address, setAddress] = useState('Campus Residence Hall, Room 203');
  const [program, setProgram] = useState('Computer Science');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEditing(false);
      
      // In a real app, this would update the user profile
    }, 1500);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <User className="h-16 w-16 text-blue-600" />
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500 mb-4">{user?.email}</p>
            
            <div className="w-full space-y-3 mt-2">
              <div className="flex items-center text-sm text-gray-700">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>555-123-4567</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Building className="h-4 w-4 mr-2 text-gray-400" />
                <span>Campus Residence Hall, Room 203</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <span>Computer Science</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="h-5 w-5 text-gray-400" />}
                fullWidth
              />
              
              <Input
                label="Email Address"
                value={user?.email || ''}
                disabled
                leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                helperText="Email address cannot be changed"
                fullWidth
              />
              
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                fullWidth
              />
              
              <Input
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                leftIcon={<Building className="h-5 w-5 text-gray-400" />}
                fullWidth
              />
              
              <Input
                label="Program/Major"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                leftIcon={<Globe className="h-5 w-5 text-gray-400" />}
                fullWidth
              />
              
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1 text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                  <p className="mt-1 text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="mt-1 text-gray-900">555-123-4567</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-gray-900">Campus Residence Hall, Room 203</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Program/Major</h3>
                  <p className="mt-1 text-gray-900">Computer Science</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                  <p className="mt-1 text-gray-900">STU-{user?.id}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;