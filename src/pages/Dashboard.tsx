import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FiMonitor,
  FiMoreHorizontal,
  FiChevronRight,
  FiUpload,
} from "react-icons/fi";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/me");

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data.user || data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col font-inter'>
        <Header user={null} />
        <div className='flex flex-1 overflow-hidden'>
          <SideBar />
          <main className='flex-1 p-8 overflow-y-auto'>
            <div className='max-w-5xl mx-auto'>
              <div className='mb-10'>
                <Skeleton height={36} width={400} className='mb-2' />
                <Skeleton height={20} width={600} />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-48'
                  >
                    <div className='flex justify-between items-start mb-4'>
                      <Skeleton width={100} height={20} />
                      <Skeleton width={20} height={20} circle />
                    </div>
                    <Skeleton width={150} height={24} className='mb-2' />
                    <Skeleton width={120} height={16} className='mb-8' />
                    <div className='mt-auto flex justify-between items-center'>
                      <Skeleton width={80} height={20} />
                      <Skeleton width={60} height={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col font-inter'>
      {/* Top Navigation */}
      <Header user={user} />

      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <main className='flex-1 p-8 overflow-y-auto'>
          <div className='max-w-5xl mx-auto'>
            <div className='mb-10'>
              <h1 className='text-3xl font-bold text-[#112240] mb-2 tracking-tight'>
                Welcome back, {user?.name?.split(" ")[0] || "User"}. Ready to
                study?
              </h1>
              <p className='text-gray-500 text-sm'>
                You've mastered 64% of your Data Structures path. Pick up where
                you left off.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {/* Array Sorting Card */}
              <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:border-[#2b4c7e] transition cursor-pointer group'>
                <div className='flex justify-between items-start mb-4'>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded'>
                    Data Structures
                  </span>
                  <button className='text-gray-400 hover:text-gray-600'>
                    <FiMoreHorizontal />
                  </button>
                </div>
                <h3 className='text-xl font-bold text-[#112240] mb-1'>
                  Array Sorting
                </h3>
                <p className='text-xs text-gray-400 mb-8'>
                  Last viewed: Feb 20, 2024
                </p>
                <div className='mt-auto flex justify-between items-center'>
                  <div className='flex items-center gap-1.5 text-xs font-semibold text-orange-500'>
                    <div className='w-2 h-2 rounded-full bg-orange-500'></div>
                    In Progress
                  </div>
                  <div className='text-[#2b4c7e] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all'>
                    Continue <FiChevronRight />
                  </div>
                </div>
              </div>

              {/* Linked Lists Card */}
              <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:border-[#2b4c7e] transition cursor-pointer group border-l-4 border-l-[#2b4c7e]'>
                <div className='flex justify-between items-start mb-4'>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded'>
                    Data Structures
                  </span>
                  <button className='text-gray-400 hover:text-gray-600'>
                    <FiMoreHorizontal />
                  </button>
                </div>
                <h3 className='text-xl font-bold text-[#112240] mb-1'>
                  Linked Lists
                </h3>
                <p className='text-xs text-gray-400 mb-8'>
                  Last viewed: Feb 18, 2024
                </p>
                <div className='mt-auto flex justify-between items-center'>
                  <div className='flex items-center gap-1.5 text-xs font-semibold text-green-500'>
                    <div className='w-4 h-4 rounded-full bg-green-100 flex items-center justify-center'>
                      <FiMonitor className='w-2 h-2' />
                    </div>
                    90% Mastered
                  </div>
                  <div className='text-[#2b4c7e] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all'>
                    Review <FiChevronRight />
                  </div>
                </div>
              </div>

              {/* New Notes Card */}
              <div className='bg-[#2b4c7e] p-6 rounded-xl border border-[#1f385c] shadow-sm flex flex-col items-center justify-center text-center'>
                <div className='w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4'>
                  <FiUpload className='text-white w-5 h-5' />
                </div>
                <h3 className='text-lg font-bold text-white mb-2'>
                  New Notes?
                </h3>
                <p className='text-xs text-blue-100 mb-6 px-4'>
                  Upload PDFs or text to generate a learning path.
                </p>
                <button className='w-full bg-white text-[#2b4c7e] py-2 rounded-md text-sm font-bold hover:bg-gray-50 transition'>
                  Upload Notes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
