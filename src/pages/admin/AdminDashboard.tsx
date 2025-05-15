import { Routes, Route } from 'react-router-dom';
import { 
  LayoutDashboard, Ticket, BellRing, MessageSquare, Map, BarChart3, Users 
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AdminOverview from './AdminOverview';
import ManageRequests from './ManageRequests';
import ManageAnnouncements from './ManageAnnouncements';
import ViewFeedback from './ViewFeedback';
import CampusMap from './CampusMap';
import CampusLocations from './CampusLocations';

const sidebarSections = [
  {
    title: 'Dashboard',
    links: [
      {
        to: '/admin',
        label: 'Overview',
        icon: <LayoutDashboard />,
      },
      {
        to: '/admin/requests',
        label: 'Manage Requests',
        icon: <Ticket />,
      },
      {
        to: '/admin/announcements',
        label: 'Announcements',
        icon: <BellRing />,
      },
      {
        to: '/admin/feedback',
        label: 'View Feedback',
        icon: <MessageSquare />,
      },
    ],
  },
  {
    title: 'Campus',
    links: [
      {
        to: '/admin/map',
        label: 'Campus Map',
        icon: <Map />,
      },
      {
        to: '/admin/locations',
        label: 'Manage Locations',
        icon: <BarChart3 />,
      },
    ],
  },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout sidebarSections={sidebarSections}>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/requests/*" element={<ManageRequests />} />
        <Route path="/announcements/*" element={<ManageAnnouncements />} />
        <Route path="/feedback" element={<ViewFeedback />} />
        <Route path="/map" element={<CampusMap />} />
        <Route path="/locations" element={<CampusLocations />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;