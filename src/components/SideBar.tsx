import React from "react";
import { Link } from "react-router-dom";
import {
  FiGrid,
  FiDatabase,
  FiCpu,
  FiMonitor,
  FiTrendingUp,
  FiSettings,
} from "react-icons/fi";

const SideBar: React.FC = () => {
  return (
    <aside className='w-64 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-4rem)] sticky top-16 hidden lg:flex'>
      <div className='p-6'>
        <h2 className='text-[#112240] font-bold text-sm'>CS Academy</h2>
        <p className='text-xs text-gray-400 mt-1'>Adaptive Learning Path</p>
      </div>

      <nav className='flex-1 px-4 space-y-1'>
        <Link
          to='/dashboard'
          className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#2b4c7e] bg-blue-50 rounded-md'
        >
          <FiGrid className='w-4 h-4' />
          Dashboard
        </Link>
        <Link
          to='/data-structures'
          className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md'
        >
          <FiDatabase className='w-4 h-4' />
          Data Structures
        </Link>
        <Link
          to='/algorithms'
          className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md'
        >
          <FiMonitor className='w-4 h-4' />
          Algorithms
        </Link>
        <Link
          to='/architecture'
          className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md'
        >
          <FiCpu className='w-4 h-4' />
          Computer Architecture
        </Link>
        <Link
          to='/mastery'
          className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md mt-4'
        >
          <FiTrendingUp className='w-4 h-4' />
          Mastery Tracking
        </Link>
      </nav>

      <div className='p-4 border-t border-gray-100 space-y-4'>
        <button className='w-full py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition'>
          View Curriculum
        </button>
        <Link
          to='/settings'
          className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md'
        >
          <FiSettings className='w-4 h-4' />
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
