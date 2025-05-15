import { 
  User, 
  Request, 
  Comment, 
  Announcement, 
  Feedback, 
  CampusLocation 
} from '../types';
import { format, subDays, addDays } from 'date-fns';

// Campus Locations
export const campusLocations: CampusLocation[] = [
  {
    id: 'loc1',
    name: 'Main Library',
    description: 'Central campus library with study spaces and resources',
    coordinates: { lat: 51.505, lng: -0.09 },
    buildingNumber: 'A1',
    floor: 1,
    category: 'academic'
  },
  {
    id: 'loc2',
    name: 'Science Building',
    description: 'Houses science departments and laboratories',
    coordinates: { lat: 51.506, lng: -0.092 },
    buildingNumber: 'B2',
    floor: 1,
    category: 'academic'
  },
  {
    id: 'loc3',
    name: 'Student Union',
    description: 'Student activities, clubs, and food court',
    coordinates: { lat: 51.507, lng: -0.088 },
    buildingNumber: 'C3',
    floor: 1,
    category: 'services'
  },
  {
    id: 'loc4',
    name: 'North Residence Hall',
    description: 'Student dormitory with 200 rooms',
    coordinates: { lat: 51.508, lng: -0.095 },
    buildingNumber: 'D4',
    floor: 1,
    category: 'residential'
  },
  {
    id: 'loc5',
    name: 'IT Center',
    description: 'Computing and technical support services',
    coordinates: { lat: 51.504, lng: -0.091 },
    buildingNumber: 'E5',
    floor: 1,
    category: 'services'
  },
  {
    id: 'loc6',
    name: 'Main Cafeteria',
    description: 'Primary dining facility for campus',
    coordinates: { lat: 51.505, lng: -0.094 },
    buildingNumber: 'F6',
    floor: 1,
    category: 'services'
  }
];

// Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@campus.edu',
    role: 'admin',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@campus.edu',
    role: 'student',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@campus.edu',
    role: 'student',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane@campus.edu',
    role: 'student',
    profileImage: 'https://randomuser.me/api/portraits/women/24.jpg'
  },
];

// Requests
export const requests: Request[] = [
  {
    id: 'req1',
    title: 'WiFi not working in library',
    description: 'I cannot connect to the campus WiFi network in the main library. I have tried restarting my device but the issue persists.',
    category: 'technical',
    status: 'open',
    priority: 'high',
    createdAt: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm:ss'),
    location: campusLocations[0],
    userId: '2',
    assignedTo: '1',
    comments: [],
    attachments: []
  },
  {
    id: 'req2',
    title: 'Broken chair in Science Building',
    description: 'There is a broken chair in room 205 of the Science Building. It needs to be repaired or replaced.',
    category: 'management',
    status: 'in-progress',
    priority: 'medium',
    createdAt: format(subDays(new Date(), 5), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm:ss'),
    location: campusLocations[1],
    userId: '3',
    assignedTo: '1',
    comments: []
  },
  {
    id: 'req3',
    title: 'Missing book in library',
    description: 'I cannot find a book that should be available according to the online catalog.',
    category: 'library',
    status: 'resolved',
    priority: 'low',
    createdAt: format(subDays(new Date(), 10), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(new Date(), 8), 'yyyy-MM-dd HH:mm:ss'),
    location: campusLocations[0],
    userId: '4',
    assignedTo: '1',
    comments: []
  },
  {
    id: 'req4',
    title: 'Hot water not working in North Residence',
    description: 'The hot water is not working in room 302 of the North Residence Hall.',
    category: 'hostel',
    status: 'open',
    priority: 'high',
    createdAt: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm:ss'),
    location: campusLocations[3],
    userId: '2',
    comments: []
  },
  {
    id: 'req5',
    title: 'Food quality concern in cafeteria',
    description: 'The quality of food served in the main cafeteria has declined. Many students have noticed this issue.',
    category: 'food-court',
    status: 'in-progress',
    priority: 'medium',
    createdAt: format(subDays(new Date(), 4), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm:ss'),
    location: campusLocations[5],
    userId: '3',
    assignedTo: '1',
    comments: []
  },
  {
    id: 'req6',
    title: 'Need additional power outlets',
    description: 'The study area in the Student Union needs more power outlets for laptops.',
    category: 'management',
    status: 'open',
    priority: 'low',
    createdAt: format(subDays(new Date(), 7), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(new Date(), 7), 'yyyy-MM-dd HH:mm:ss'),
    location: campusLocations[2],
    userId: '4',
    comments: []
  },
  {
    id: 'req7',
    title: 'Projector not working in Science Building',
    description: 'The projector in room 101 of the Science Building is not displaying properly.',
    category: 'technical',
    status: 'resolved',
    priority: 'high',
    createdAt: format(subDays(new Date(), 14), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(new Date(), 12), 'yyyy-MM-dd HH:mm:ss'),
    location: campusLocations[1],
    userId: '2',
    assignedTo: '1',
    comments: []
  },
  {
    id: 'req8',
    title: 'Printer error in IT Center',
    description: 'The main printer in the IT Center is showing an error and not printing documents.',
    category: 'technical',
    status: 'in-progress',
    priority: 'medium',
    createdAt: format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm:ss'),
    location: campusLocations[4],
    userId: '3',
    assignedTo: '1',
    comments: []
  }
];

// Comments
export const comments: Comment[] = [
  {
    id: 'com1',
    requestId: 'req1',
    userId: '1',
    userName: 'Admin User',
    userRole: 'admin',
    content: 'We are looking into this issue. IT has been notified.',
    createdAt: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm:ss'),
    isInternal: true
  },
  {
    id: 'com2',
    requestId: 'req2',
    userId: '1',
    userName: 'Admin User',
    userRole: 'admin',
    content: 'Maintenance team has been dispatched to fix the chair.',
    createdAt: format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm:ss'),
    isInternal: false
  },
  {
    id: 'com3',
    requestId: 'req3',
    userId: '1',
    userName: 'Admin User',
    userRole: 'admin',
    content: 'The book has been located and placed on hold for you.',
    createdAt: format(subDays(new Date(), 8), 'yyyy-MM-dd HH:mm:ss'),
    isInternal: false
  },
  {
    id: 'com4',
    requestId: 'req5',
    userId: '1',
    userName: 'Admin User',
    userRole: 'admin',
    content: 'We have scheduled a meeting with the cafeteria management to discuss this concern.',
    createdAt: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm:ss'),
    isInternal: false
  },
  {
    id: 'com5',
    requestId: 'req7',
    userId: '1',
    userName: 'Admin User',
    userRole: 'admin',
    content: 'The projector has been replaced with a new unit.',
    createdAt: format(subDays(new Date(), 12), 'yyyy-MM-dd HH:mm:ss'),
    isInternal: false
  }
];

// Add comments to the requests
requests.forEach(request => {
  request.comments = comments.filter(comment => comment.requestId === request.id);
});

// Announcements
export const announcements: Announcement[] = [
  {
    id: 'ann1',
    title: 'System Maintenance',
    content: 'The campus network will be down for scheduled maintenance on Saturday from 2 AM to 5 AM.',
    priority: 'high',
    createdAt: format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm:ss'),
    expiresAt: format(addDays(new Date(), 4), 'yyyy-MM-dd HH:mm:ss'),
    author: {
      id: '1',
      name: 'Admin User'
    },
    targetLocations: [campusLocations[0], campusLocations[1], campusLocations[2], campusLocations[3], campusLocations[4], campusLocations[5]]
  },
  {
    id: 'ann2',
    title: 'Library Extended Hours',
    content: 'The main library will have extended hours during finals week, staying open until midnight.',
    priority: 'medium',
    createdAt: format(subDays(new Date(), 5), 'yyyy-MM-dd HH:mm:ss'),
    expiresAt: format(addDays(new Date(), 10), 'yyyy-MM-dd HH:mm:ss'),
    author: {
      id: '1',
      name: 'Admin User'
    },
    targetLocations: [campusLocations[0]]
  },
  {
    id: 'ann3',
    title: 'Food Court Renovation',
    content: 'The main cafeteria will be closed for renovations from June 1-15. Alternative dining options will be available in the Student Union.',
    priority: 'medium',
    createdAt: format(subDays(new Date(), 10), 'yyyy-MM-dd HH:mm:ss'),
    expiresAt: format(addDays(new Date(), 20), 'yyyy-MM-dd HH:mm:ss'),
    author: {
      id: '1',
      name: 'Admin User'
    },
    targetLocations: [campusLocations[5], campusLocations[2]]
  },
  {
    id: 'ann4',
    title: 'New IT Support Hours',
    content: 'The IT center will now be open from 8 AM to 8 PM on weekdays to better serve student needs.',
    priority: 'low',
    createdAt: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm:ss'),
    author: {
      id: '1',
      name: 'Admin User'
    },
    targetLocations: [campusLocations[4]]
  }
];

// Feedback
export const feedbacks: Feedback[] = [
  {
    id: 'feed1',
    requestId: 'req3',
    userId: '4',
    rating: 5,
    comment: 'Very happy with the quick resolution of my issue!',
    sentiment: 'positive',
    createdAt: format(subDays(new Date(), 7), 'yyyy-MM-dd HH:mm:ss')
  },
  {
    id: 'feed2',
    requestId: 'req7',
    userId: '2',
    rating: 4,
    comment: 'Issue was resolved well but took longer than expected.',
    sentiment: 'positive',
    createdAt: format(subDays(new Date(), 11), 'yyyy-MM-dd HH:mm:ss')
  },
  {
    id: 'feed3',
    requestId: 'req3',
    userId: '2',
    rating: 3,
    comment: 'Adequate service but communication could be improved.',
    sentiment: 'neutral',
    createdAt: format(subDays(new Date(), 8), 'yyyy-MM-dd HH:mm:ss')
  }
];

// Generate chart data
export const getRequestCategoryData = () => {
  const categoryCount: { [key: string]: number } = {};
  
  requests.forEach(request => {
    if (categoryCount[request.category]) {
      categoryCount[request.category]++;
    } else {
      categoryCount[request.category] = 1;
    }
  });
  
  return Object.keys(categoryCount).map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
    value: categoryCount[category],
    color: getCategoryColor(category)
  }));
};

export const getRequestStatusData = () => {
  const statusCount: { [key: string]: number } = {};
  
  requests.forEach(request => {
    if (statusCount[request.status]) {
      statusCount[request.status]++;
    } else {
      statusCount[request.status] = 1;
    }
  });
  
  return Object.keys(statusCount).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '),
    value: statusCount[status],
    color: getStatusColor(status)
  }));
};

export const getRequestsByLocation = () => {
  const locationCount: { [key: string]: number } = {};
  
  requests.forEach(request => {
    const locationId = request.location.id;
    if (locationCount[locationId]) {
      locationCount[locationId]++;
    } else {
      locationCount[locationId] = 1;
    }
  });
  
  return campusLocations.map(location => ({
    locationId: location.id,
    locationName: location.name,
    count: locationCount[location.id] || 0
  }));
};

// Helper functions
export const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'technical': '#3B82F6',   // Blue
    'library': '#8B5CF6',     // Purple
    'hostel': '#F59E0B',      // Amber
    'food-court': '#10B981',  // Green
    'management': '#6366F1',  // Indigo
    'other': '#71717A'        // Gray
  };
  
  return colors[category] || '#71717A';
};

export const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    'open': '#3B82F6',         // Blue
    'in-progress': '#F97316',  // Orange
    'resolved': '#10B981',     // Green
    'closed': '#71717A'        // Gray
  };
  
  return colors[status] || '#71717A';
};

export const getPriorityColor = (priority: string): string => {
  const colors: { [key: string]: string } = {
    'low': '#10B981',    // Green
    'medium': '#F59E0B', // Amber
    'high': '#EF4444'    // Red
  };
  
  return colors[priority] || '#71717A';
};

export const getFeedbackSentimentColor = (sentiment: string): string => {
  const colors: { [key: string]: string } = {
    'positive': '#10B981', // Green
    'neutral': '#F59E0B',  // Amber
    'negative': '#EF4444'  // Red
  };
  
  return colors[sentiment] || '#71717A';
};