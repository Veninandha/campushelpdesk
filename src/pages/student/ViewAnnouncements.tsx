import { useState } from 'react';
import { Search, Filter, BellRing, Calendar, MapPin } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { announcements } from '../../data/mockData';
import { AnnouncementPriority } from '../../types';

const ViewAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getPriorityBadge = (priority: AnnouncementPriority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="danger">High Priority</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="success">Low Priority</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Announcements</h1>
      
      <Card className="mb-6">
        <Input
          type="search"
          placeholder="Search announcements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="h-5 w-5 text-gray-400" />}
          fullWidth
        />
      </Card>
      
      {filteredAnnouncements.length > 0 ? (
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} hoverable>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BellRing className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{announcement.title}</h3>
                    {getPriorityBadge(announcement.priority)}
                  </div>
                  <p className="mt-2 text-gray-600">{announcement.content}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Posted: {new Date(announcement.createdAt).toLocaleDateString()}
                    </div>
                    {announcement.expiresAt && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Expires: {new Date(announcement.expiresAt).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {announcement.targetLocations?.length ? 
                        announcement.targetLocations.map(loc => loc.name).join(', ') : 
                        'All Locations'}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Try adjusting your search.'
                : 'There are no announcements at this time.'}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ViewAnnouncements;