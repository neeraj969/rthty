import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  Newspaper, 
  Trophy, 
  User, 
  Menu,
  X,
  LogOut,
  Bell,
  BellOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDND } from '../contexts/DNDContext';

const navItems = [
  { path: '/feed', icon: Home, label: 'Feed' },
  { path: '/questions', icon: MessageSquare, label: 'Q&A' },
  { path: '/notes', icon: BookOpen, label: 'Notes' },
  { path: '/pyqs', icon: FileText, label: 'PYQs' },
  { path: '/news', icon: Newspaper, label: 'News' },
  { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const facultyColors = {
  Science: 'text-green-600',
  Management: 'text-blue-600',
  Humanities: 'text-purple-600',
  Law: 'text-red-600',
  Education: 'text-orange-600'
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDNDEnabled, toggleDND } = useDND();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/feed" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">StudyNet</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-md' 
                      : 'text-gray-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Profile & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* DND Toggle */}
            <button
              onClick={toggleDND}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDNDEnabled 
                  ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title={isDNDEnabled ? 'Disable Do Not Disturb' : 'Enable Do Not Disturb'}
            >
              {isDNDEnabled ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            </button>

            {user && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className={`text-xs ${facultyColors[user.faculty] || 'text-gray-600'}`}>
                      Class {user.class} • {user.faculty}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-110"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-purple-200 shadow-lg overflow-hidden">
          <div className="px-4 py-3 space-y-1 max-h-screen overflow-y-auto">
            {/* DND Toggle for Mobile */}
            <button
              onClick={toggleDND}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                isDNDEnabled 
                  ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
              }`}
            >
              {isDNDEnabled ? <BellOff className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
              <span>{isDNDEnabled ? 'Disable Do Not Disturb' : 'Enable Do Not Disturb'}</span>
            </button>
            
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-md' 
                      : 'text-gray-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {user && (
              <>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className={`text-xs ${facultyColors[user.faculty] || 'text-gray-600'}`}>
                        Class {user.class} • {user.faculty}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}