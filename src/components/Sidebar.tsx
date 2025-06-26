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
      className={`w-70 bg-[#f6f8fa] text-black h-screen flex flex-col ${className}`}
    >
      {/* User Profile Section */}
      <div className="p-4">
        <div className="flex items-center space-x-3 p-3 border border-[#e5e7e8] rounded-lg shadow-lg shadow-gray-500/20">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-sm text-black">Anish Ram A</div>
            <div className="text-gray-600 text-xs">aanishram@gmail.com</div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-[#9e9fa3] mx-4">
          <div className="text-[#7f8386] text-xs font-medium mb-3 uppercase tracking-wider">
            Menu
          </div>

          {/* Main Navigation Items */}
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-white hover:shadow-md hover:border hover:border-[#dee0e2] transition-all duration-200"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-white hover:shadow-md hover:border hover:border-[#dee0e2] transition-all duration-200"
            >
              <Inbox className="w-5 h-5" />
              <span>Inbox</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-white hover:shadow-md hover:border hover:border-[#dee0e2] transition-all duration-200"
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </a>
          </nav>
        </div>

        {/* Team Spaces Section */}
        <div className="p-4 border-b border-[#9e9fa3] mx-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[#7f8386] text-xs font-medium uppercase tracking-wider">
              Team spaces
            </div>
          </div>

          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-white hover:shadow-md hover:border hover:border-[#dee0e2] transition-all duration-200"
            >
              <CheckSquare className="w-5 h-5" />
              <span>Tasks</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-white hover:shadow-md hover:border hover:border-[#dee0e2] transition-all duration-200"
            >
              <FileText className="w-5 h-5" />
              <span>Docs</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-white hover:shadow-md hover:border hover:border-[#dee0e2] transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span>Meeting</span>
            </a>
          </nav>
        </div>

        {/* Other Section */}
        <div className="p-4 border-b border-[#9e9fa3] mx-4">
          <div className="text-[#7f8386] text-xs font-medium mb-3 uppercase tracking-wider">
            Other
          </div>

          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-white hover:shadow-md hover:border hover:border-[#dee0e2] transition-all duration-200"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>

            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-white hover:shadow-md hover:border hover:border-[#dee0e2] transition-all duration-200"
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
