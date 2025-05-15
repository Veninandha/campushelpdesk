import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { campusLocations, announcements } from '../../data/mockData';
import { CampusLocation } from '../../types';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

const StudentMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);
  const [locationAnnouncements, setLocationAnnouncements] = useState<any[]>([]);
  
  useEffect(() => {
    if (selectedLocation) {
      const filteredAnnouncements = announcements.filter(
        (announcement) =>
          !announcement.targetLocations ||
          announcement.targetLocations.some(loc => loc.id === selectedLocation.id)
      );
      setLocationAnnouncements(filteredAnnouncements);
    } else {
      setLocationAnnouncements([]);
    }
  }, [selectedLocation]);
  
  // Custom icon for markers
  const markerIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Campus Map</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card noPadding>
            <div className="h-[600px] z-0">
              <MapContainer
                center={[51.505, -0.09]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {campusLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.coordinates.lat, location.coordinates.lng]}
                    icon={markerIcon}
                    eventHandlers={{
                      click: () => {
                        setSelectedLocation(location);
                      },
                    }}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-medium">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.description}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {selectedLocation ? `${selectedLocation.name} Information` : 'Select a Location'}
            </h2>
            
            {selectedLocation ? (
              <div>
                <div className="mb-4">
                  <p className="text-gray-600">{selectedLocation.description}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Building:</span> {selectedLocation.buildingNumber}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Floor:</span> {selectedLocation.floor}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-gray-700">Category:</span> {selectedLocation.category}
                    </div>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-800 mt-6 mb-2">
                  Announcements ({locationAnnouncements.length})
                </h3>
                
                <div className="space-y-3 mt-4 max-h-80 overflow-y-auto">
                  {locationAnnouncements.length > 0 ? (
                    locationAnnouncements.map((announcement) => (
                      <div key={announcement.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">{announcement.title}</span>
                          <Badge
                            variant={
                              announcement.priority === 'high'
                                ? 'danger'
                                : announcement.priority === 'medium'
                                ? 'warning'
                                : 'success'
                            }
                            size="sm"
                          >
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{announcement.content}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No announcements for this location.
                    </p>
                  )}
                </div>
                
                <div className="mt-4">
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={() => window.location.href = '/student/raise-request'}
                  >
                    Submit Request for This Location
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-16">
                Select a location on the map to view details and announcements.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentMap;