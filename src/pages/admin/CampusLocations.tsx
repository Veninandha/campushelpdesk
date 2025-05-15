import { useState } from 'react';
import { Plus, Edit, Trash, Map, MapPin } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import { campusLocations } from '../../data/mockData';

const CampusLocations = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [floor, setFloor] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [lat, setLat] = useState<number | ''>('');
  const [lng, setLng] = useState<number | ''>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowForm(false);
    // Reset form
    setName('');
    setDescription('');
    setBuildingNumber('');
    setFloor('');
    setCategory('');
    setLat('');
    setLng('');
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Campus Locations</h1>
        
        <Button
          variant={showForm ? 'outline' : 'primary'}
          icon={showForm ? <Trash /> : <Plus />}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Location'}
        </Button>
      </div>
      
      {showForm && (
        <Card className="mb-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Location Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Main Library"
                required
                fullWidth
              />
              
              <Textarea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the location"
                fullWidth
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Building Number"
                  value={buildingNumber}
                  onChange={(e) => setBuildingNumber(e.target.value)}
                  placeholder="e.g., A1"
                />
                
                <Input
                  label="Floor"
                  type="number"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value ? parseInt(e.target.value) : '')}
                  placeholder="e.g., 1"
                />
                
                <Input
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., academic, residential"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Latitude"
                  type="number"
                  step="0.000001"
                  value={lat}
                  onChange={(e) => setLat(e.target.value ? parseFloat(e.target.value) : '')}
                  placeholder="e.g., 51.505"
                  required
                />
                
                <Input
                  label="Longitude"
                  type="number"
                  step="0.000001"
                  value={lng}
                  onChange={(e) => setLng(e.target.value ? parseFloat(e.target.value) : '')}
                  placeholder="e.g., -0.09"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Add Location
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}
      
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Building / Floor
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
                  Coordinates
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
              {campusLocations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {location.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {location.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.buildingNumber} / Floor {location.floor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Map size={16} />}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit size={16} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash size={16} />}
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

export default CampusLocations;