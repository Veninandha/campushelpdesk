import { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarSections: any[];
  title?: string;
}

const DashboardLayout = ({ children, sidebarSections, title }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} sections={sidebarSections} />
        
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {title && (
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              </div>
            )}
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;