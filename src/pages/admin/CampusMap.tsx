import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { campusLocations, requests, getStatusColor } from '../../data/mockData';
import { CampusLocation, Request } from '../../types';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);
  const [locationRequests, setLocationRequests] = useState<Request[]>([]);
  
  useEffect(() => {
    if (selectedLocation) {
      const filteredRequests = requests.filter(
        (request) => request.location.id === selectedLocation.id
      );
      setLocationRequests(filteredRequests);
    } else {
      setLocationRequests([]);
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
              {selectedLocation ? `${selectedLocation.name} Details` : 'Select a Location'}
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
                  Requests ({locationRequests.length})
                </h3>
                
                <div className="space-y-3 mt-4 max-h-80 overflow-y-auto">
                  {locationRequests.length > 0 ? (
                    locationRequests.map((request) => (
                      <div key={request.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">{request.title}</span>
                          <Badge
                            variant={
                              request.status === 'open'
                                ? 'primary'
                                : request.status === 'in-progress'
                                ? 'warning'
                                : request.status === 'resolved'
                                ? 'success'
                                : 'default'
                            }
                            size="sm"
                          >
                            {request.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{request.description}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No requests for this location.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-16">
                Select a location on the map to view details and associated requests.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;