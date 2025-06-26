import IconBar from "@/components/IconBar";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import React from "react";

function page() {
  return (
    <div className="flex h-screen bg-white">
      <IconBar />
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <TopNavbar />
        {/* Content area - you can add your task board here later */}
        <div className="flex-1 p-6">
          {/* This is where your task board content will go */}
        </div>
      </div>
    </div>
  );
}

export default page;
