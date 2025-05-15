// User Types
export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

// Request Types
export type RequestStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type RequestPriority = 'low' | 'medium' | 'high';
export type RequestCategory = 'technical' | 'library' | 'hostel' | 'food-court' | 'management' | 'other';

export interface Request {
  id: string;
  title: string;
  description: string;
  category: RequestCategory;
  status: RequestStatus;
  priority: RequestPriority;
  createdAt: string;
  updatedAt: string;
  location: CampusLocation;
  userId: string;
  assignedTo?: string;
  attachments?: Attachment[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  requestId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  createdAt: string;
  isInternal: boolean;
}

export interface Attachment {
  id: string;
  requestId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

// Announcement Types
export type AnnouncementPriority = 'low' | 'medium' | 'high';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  createdAt: string;
  expiresAt?: string;
  author: {
    id: string;
    name: string;
  };
  targetLocations?: CampusLocation[];
}

// Feedback Types
export type FeedbackSentiment = 'positive' | 'neutral' | 'negative';

export interface Feedback {
  id: string;
  requestId: string;
  userId: string;
  rating: number; // 1-5
  comment?: string;
  sentiment: FeedbackSentiment;
  createdAt: string;
}

// Location Types
export interface CampusLocation {
  id: string;
  name: string;
  description?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  buildingNumber?: string;
  floor?: number;
  category?: string;
}

// Chart Data Types
export interface CategoryCount {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  [key: string]: string | number;
}

export interface HeatmapData {
  locationId: string;
  locationName: string;
  count: number;
}