import React from "react";
import {
  ChevronLeft,
  Search,
  Filter,
  Users,
  Share2,
  MoreHorizontal,
  UserPlus,
} from "lucide-react";

interface TopNavbarProps {
  className?: string;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ className = "" }) => {
  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Breadcrumb */}
        <div className="flex items-center space-x-4">
          <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <nav className="flex items-center space-x-2 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Team spaces
            </a>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-900 font-medium">Tasks</span>
          </nav>
        </div>

        {/* Right Section - Search and Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              ⌘F
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
