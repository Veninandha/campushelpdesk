import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { twMerge } from 'tailwind-merge';

interface SidebarLink {
  to: string;
  label: string;
  icon: ReactNode;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

interface SidebarProps {
  isOpen: boolean;
  sections: SidebarSection[];
}

const Sidebar = ({ isOpen, sections }: SidebarProps) => {
  const { user } = useAuth();
  
  return (
    <div
      className={twMerge(
        'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16 pb-4 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-auto lg:flex-shrink-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white">
                {user?.name.charAt(0)}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-6">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="mt-2 space-y-1">
                {section.links.map((link, linkIndex) => (
                  <NavLink
                    key={linkIndex}
                    to={link.to}
                    className={({ isActive }) =>
                      twMerge(
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                        isActive
                          ? 'bg-orange-50 text-orange-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      )
                    }
                  >
                    <span className="mr-3 h-5 w-5">{link.icon}</span>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;