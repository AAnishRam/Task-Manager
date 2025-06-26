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
  activeItem?: string;
  onItemClick?: (item: string, section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className = "",
  activeItem = "Tasks",
  onItemClick,
}) => {
  const handleItemClick = (item: string, section: string) => {
    if (onItemClick) {
      onItemClick(item, section);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, section: "Menu" },
    { name: "Inbox", icon: Inbox, section: "Menu" },
    { name: "Calendar", icon: Calendar, section: "Menu" },
  ];

  const teamSpaceItems = [
    { name: "Tasks", icon: CheckSquare, section: "Team spaces" },
    { name: "Docs", icon: FileText, section: "Team spaces" },
    { name: "Meeting", icon: Users, section: "Team spaces" },
  ];

  const otherItems = [
    { name: "Settings", icon: Settings, section: "Other" },
    { name: "Support", icon: HelpCircle, section: "Other" },
  ];

  const renderNavItem = (item: any, isActive: boolean) => (
    <button
      key={item.name}
      onClick={() => handleItemClick(item.name, item.section)}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium w-full text-left transition-all duration-200 ${
        isActive
          ? "bg-white shadow-md border border-[#dee0e2] text-black"
          : "text-black hover:bg-white hover:shadow-md hover:border hover:border-[#dee0e2]"
      }`}
    >
      <item.icon className="w-5 h-5" />
      <span>{item.name}</span>
    </button>
  );

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

          <nav className="space-y-1">
            {menuItems.map((item) =>
              renderNavItem(item, activeItem === item.name)
            )}
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
            {teamSpaceItems.map((item) =>
              renderNavItem(item, activeItem === item.name)
            )}
          </nav>
        </div>

        {/* Other Section */}
        <div className="p-4 mx-4">
          <div className="text-[#7f8386] text-xs font-medium mb-3 uppercase tracking-wider">
            Other
          </div>

          <nav className="space-y-1">
            {otherItems.map((item) =>
              renderNavItem(item, activeItem === item.name)
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
