import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiBell } from "react-icons/fi";

interface HeaderProps {
  user: {
    name: string;
    email: string;
  } | null;
  onUploadClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onUploadClick }) => {
  return (
    <header className='w-full bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-10 sticky top-0'>
      <div className='flex items-center gap-8'>
        <div className='text-xl font-bold text-[#112240] tracking-tight'>
          LearnSync
        </div>
        <nav className='hidden md:flex items-center gap-6'>
          <Link
            to='/dashboard'
            className='text-sm font-medium text-[#2b4c7e] border-b-2 border-[#2b4c7e] py-5'
          >
            Dashboard
          </Link>
        </nav>
      </div>

      <div className='flex items-center gap-6'>
        <div className='relative hidden md:block'>
          <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
          <input
            type='text'
            placeholder='Search modules...'
            className='pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#2b4c7e] focus:bg-white w-64'
          />
        </div>
        <button
          onClick={onUploadClick}
          className='bg-[#2b4c7e] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#1f385c] transition'
        >
          Upload Notes
        </button>
        <button className='text-gray-400 hover:text-gray-600'>
          <FiBell className='w-5 h-5' />
        </button>
        <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2b4c7e] font-bold overflow-hidden border border-blue-200 cursor-pointer'>
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
};

export default Header;
