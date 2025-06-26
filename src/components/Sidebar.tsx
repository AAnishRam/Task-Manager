import React from "react";
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  CheckSquare,
  FileText,
  Users,
  Settings,
  HelpCircle,
  Plus,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-72 bg-gray-900 text-white h-screen flex flex-col ${className}`}
    >
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <div className="w-6 h-6 bg-purple-600 rounded-sm"></div>
            </div>
          </div>
          <div>
            <div className="font-medium text-sm">Anish Ram A</div>
            <div className="text-gray-400 text-xs">aanishram@gmail.com</div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <div className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">
            Menu
          </div>

          {/* Main Navigation Items */}
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Inbox className="w-5 h-5" />
              <span>Inbox</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </a>
          </nav>
        </div>

        {/* Team Spaces Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Team spaces
            </div>
          </div>

          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <CheckSquare className="w-5 h-5" />
              <span>Tasks</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span>Docs</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Meeting</span>
            </a>
          </nav>
        </div>

        {/* Other Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">
            Other
          </div>

          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Support</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
