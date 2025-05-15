import { Routes, Route } from 'react-router-dom';
import { 
  LayoutDashboard, PlusCircle, ListChecks, BellRing, MessageSquare, User, Map 
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StudentOverview from './StudentOverview';
import RaiseRequest from './RaiseRequest';
import MyRequests from './MyRequests';
import ViewAnnouncements from './ViewAnnouncements';
import SubmitFeedback from './SubmitFeedback';
import StudentProfile from './StudentProfile';
import StudentMap from './StudentMap';

const sidebarSections = [
  {
    title: 'Dashboard',
    links: [
      {
        to: '/student',
        label: 'Overview',
        icon: <LayoutDashboard />,
      },
      {
        to: '/student/raise-request',
        label: 'Raise Request',
        icon: <PlusCircle />,
      },
      {
        to: '/student/my-requests',
        label: 'My Requests',
        icon: <ListChecks />,
      },
      {
        to: '/student/announcements',
        label: 'Announcements',
        icon: <BellRing />,
      },
    ],
  },
  {
    title: 'Account',
    links: [
      {
        to: '/student/feedback',
        label: 'Submit Feedback',
        icon: <MessageSquare />,
      },
      {
        to: '/student/profile',
        label: 'My Profile',
        icon: <User />,
      },
      {
        to: '/student/map',
        label: 'Campus Map',
        icon: <Map />,
      }
    ],
  },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout sidebarSections={sidebarSections}>
      <Routes>
        <Route path="/" element={<StudentOverview />} />
        <Route path="/raise-request" element={<RaiseRequest />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/announcements" element={<ViewAnnouncements />} />
        <Route path="/feedback" element={<SubmitFeedback />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/map" element={<StudentMap />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentDashboard;