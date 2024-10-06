// components/Sidebar.tsx
import { UserButton } from '@clerk/nextjs';
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // For collapse/expand icons

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full ${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gradient-to-b from-purple-600 to-purple-700 p-4 rounded-r-3xl shadow-lg flex flex-col justify-between transition-width duration-300`}
    >
      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className="absolute right-0 transform translate-x-1/2 top-4 p-2 bg-purple-700 rounded-full text-white shadow-md"
      >
        {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      <div>
        {/* Logo */}
        <div className={`text-white text-2xl font-semibold mb-8 flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          {!isCollapsed && <span>SynapsED</span>}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-2 text-white">
            <span className={`${isCollapsed ? 'hidden' : ''}`}>Pathway</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-white">
            <span className={`${isCollapsed ? 'hidden' : ''}`}>Classes</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-white">
            <span className={`${isCollapsed ? 'hidden' : ''}`}>Feedback</span>
            {!isCollapsed && <span className="bg-red-500 rounded-full text-white text-xs px-2 py-1 ml-2">12</span>}
          </a>
          <a href="#" className="flex items-center space-x-2 text-white">
            <span className={`${isCollapsed ? 'hidden' : ''}`}>Archived</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-white">
            <span className={`${isCollapsed ? 'hidden' : ''}`}>Inbox</span>
            {!isCollapsed && <span className="bg-red-500 rounded-full text-white text-xs px-2 py-1 ml-2">7</span>}
          </a>
        </nav>
      </div>

      {/* User Button */}
      <div className={`flex justify-center items-center shadow-md mt-4 ${isCollapsed ? 'hidden' : ''}`}>
        <UserButton showName={!isCollapsed} />
      </div>
    </aside>
  );
};

export default Sidebar;
