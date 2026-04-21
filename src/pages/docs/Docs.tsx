import { useState } from "react";
import Sidebar from "../../components/docsComponents/Sidebar";
import Navbar from "../../components/Navbar";
import DocsOverview from "../../components/docsComponents/DocsOverview"; // Your content component

const Docs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    // 1. Full height container, hide horizontal scroll
    <div className="flex h-screen overflow-hidden bg-dark-bg">
      {/* 2. Sidebar stays on the left */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 3. Right column: Navbar + Scrollable Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />

        {/* 4. This area scrolls while Sidebar stays still */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <DocsOverview />
        </main>
      </div>
    </div>
  );
};

export default Docs;
