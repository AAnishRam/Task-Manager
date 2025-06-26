import IconBar from "@/components/IconBar";
import Sidebar from "@/components/Sidebar";
import React from "react";

function page() {
  return (
    <div className="flex h-screen">
      <IconBar />
      <Sidebar />
      {/* Main content area - you can add your task board here later */}
      <div className="flex-1 bg-white">
        {/* This is where your main content will go */}
      </div>
    </div>
  );
}

export default page;
