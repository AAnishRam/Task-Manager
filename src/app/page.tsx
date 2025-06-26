"use client";

import IconBar from "@/components/IconBar";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import React, { useState } from "react";

function Page() {
  const [activeItem, setActiveItem] = useState("Tasks");
  const [currentSection, setCurrentSection] = useState("Team spaces");

  const handleItemClick = (item: string, section: string) => {
    setActiveItem(item);
    setCurrentSection(section);
  };

  return (
    <div className="flex h-screen">
      <IconBar />
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <TopNavbar currentSection={currentSection} currentPage={activeItem} />
        {/* Content area - you can add your task board here later */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {activeItem} Content
            </h2>
            <p className="text-gray-600">
              This is the content area for {activeItem}. You can add your
              specific content here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
