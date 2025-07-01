"use client";

import IconBar from "@/components/IconBar";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import React, { useState } from "react";

// Import all your components
import Tasks from "@/components/Tasks";
import Docs from "@/components/Docs";
import Meeting from "@/components/Meeting";
import Settings from "@/components/Settings";
import Support from "@/components/Support";
import CalendarComponent from "@/components/Calendar";
import InboxComponent from "@/components/Inbox";
import { LayoutDashboard } from "lucide-react";
import Dashboard from "@/components/Dashboard";

function Page() {
  const [activeItem, setActiveItem] = useState("Tasks");
  const [currentSection, setCurrentSection] = useState("Team spaces");

  const handleItemClick = (item: string, section: string) => {
    setActiveItem(item);
    setCurrentSection(section);
  };
  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Inbox":
        return <InboxComponent />;
      case "Calendar":
        return <CalendarComponent />;
      case "Tasks":
        return <Tasks />;
      case "Docs":
        return <Docs />;
      case "Meeting":
        return <Meeting />;
      case "Settings":
        return <Settings />;
      case "Support":
        return <Support />;
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {activeItem} Content
            </h2>
            <p className="text-gray-600">
              This is the content area for {activeItem}. You can add your
              specific content here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      <IconBar />
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <TopNavbar currentSection={currentSection} currentPage={activeItem} />
        {/* Content area - renders the selected component */}
        <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Page;
