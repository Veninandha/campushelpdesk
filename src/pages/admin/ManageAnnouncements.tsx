
import { useState } from 'react';
import { Plus, Edit, Trash, BellRing } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Select from '../../components/common/Select';
import { announcements as mockAnnouncements } from '../../data/mockData';
import { Announcement, AnnouncementPriority } from '../../types';

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<AnnouncementPriority>('medium');
  const [expiryDate, setExpiryDate] = useState('');
  
  const resetForm = () => {
    setTitle('');
    setContent('');
    setPriority('medium');
    setExpiryDate('');
    setEditingId(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setTitle(announcement.title);
    setContent(announcement.content);
    setPriority(announcement.priority);
    setExpiryDate(announcement.expiresAt?.split(' ')[0] || '');
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAnnouncement = {
      id: editingId || `ann${Date.now()}`,
      title,
      content,
      priority,
      createdAt: new Date().toISOString(),
      expiresAt: expiryDate ? new Date(expiryDate).toISOString() : undefined,
      author: {
        id: '1',
        name: 'Admin User'
      }
    };

    if (editingId) {
      setAnnouncements(prev => 
        prev.map(a => a.id === editingId ? { ...a, ...newAnnouncement } : a)
      );
    } else {
      setAnnouncements(prev => [...prev, newAnnouncement]);
    }

    setShowForm(false);
    resetForm();
  };
  
  const getPriorityBadge = (priority: AnnouncementPriority) => {
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
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Announcements</h1>
        
        <Button
          variant={showForm ? 'outline' : 'primary'}
          icon={showForm ? <Trash /> : <Plus />}
          onClick={() => {
            if (showForm) {
              resetForm();
            }
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'New Announcement'}
        </Button>
      </div>
      
      {showForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
                required
                fullWidth
              />
              
              <Textarea
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter announcement content"
                required
                fullWidth
                rows={4}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                  ]}
                />
                
                <Input
                  label="Expiry Date (Optional)"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editingId ? 'Update' : 'Publish'} Announcement
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}
      
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BellRing className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{announcement.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{announcement.content}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-1">Priority:</span>
                      {getPriorityBadge(announcement.priority)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Posted: {new Date(announcement.createdAt).toLocaleDateString()}
                    </div>
                    {announcement.expiresAt && (
                      <div className="text-sm text-gray-500">
                        Expires: {new Date(announcement.expiresAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Edit size={16} />}
                  onClick={() => handleEdit(announcement)}
                >
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Trash size={16} />}
                  onClick={() => handleDelete(announcement.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageAnnouncements;
