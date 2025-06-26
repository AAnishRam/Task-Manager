import React from "react";
import {
  Zap,
  MessageSquare,
  Calendar,
  MessageCircle,
  MessageSquare as MessageSquare2,
  Plus,
  Chrome,
  ChromeIcon,
  MessageSquareTextIcon,
  Video,
  Calculator,
} from "lucide-react";

interface IconBarProps {
  className?: string;
}

const IconBar: React.FC<IconBarProps> = ({ className = "" }) => {
  const iconItems = [
    { icon: Chrome, bgColor: "bg-purple-600", isActive: false },
    { icon: MessageSquareTextIcon, bgColor: "bg-blue-600", isActive: false },
    { icon: Calendar, bgColor: "bg-blue-500", isActive: false },
    { icon: Video, bgColor: "bg-purple-500", isActive: false },
    { icon: Calculator, bgColor: "bg-blue-500", isActive: false },
  ];

  return (
    <div
      className={`w-16 bg-[#2d3748] h-screen flex flex-col items-center py-4 ${className}`}
    >
      {/* Logo/Brand Icon */}
      <div className="mb-6">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <Zap className="w-6 h-6 text-[#2d3748]" />
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col space-y-3 flex-1">
        {iconItems.map((item, index) => (
          <button
            key={index}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              item.isActive
                ? `${item.bgColor} shadow-lg`
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            <item.icon className="w-5 h-5 text-white" />
          </button>
        ))}
      </div>

      {/* Add Button */}
      <div className="mt-auto">
        <button className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default IconBar;
