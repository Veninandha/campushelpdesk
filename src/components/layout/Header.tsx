import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Bell, User, Menu, X, LogOut, Settings } from 'lucide-react';
import Button from '../common/Button';

interface HeaderProps {
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {toggleSidebar && (
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 lg:hidden"
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen}
            >
              <span className="sr-only">
                {isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              </span>
              {isSidebarOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          )}
          
          <Link to="/" className="flex items-center space-x-2 ml-2 lg:ml-0">
            <Shield className="h-8 w-8 text-orange-600" />
            <span className="text-xl font-semibold text-gray-900">Campus Helpdesk</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>
          
          <div className="relative">
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white">
                {user?.name.charAt(0)}
              </div>
              <span className="hidden md:inline-block font-medium">{user?.name}</span>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;