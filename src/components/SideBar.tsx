import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiGrid, FiSettings, FiFileText } from "react-icons/fi";

interface Note {
  id?: string;
  _id?: string;
  noteId?: string;
  topic?: string;
  createdAt?: string;
}

type TopicLink = { topic: string; noteId: string };

const SideBar: React.FC = () => {
  const [topics, setTopics] = useState<TopicLink[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const userRes = await fetch("/api/users/me");
        if (!userRes.ok) return;
        const userData = await userRes.json();
        const userId = userData?.user?.id || userData?.id;
        if (!userId) return;

        const notesRes = await fetch(`/api/notes/get-notes/${userId}`);
        if (!notesRes.ok) return;
        const notesData = await notesRes.json();
        const notes: Note[] = Array.isArray(notesData)
          ? notesData
          : notesData.notes || [];

        // sort by createdAt desc and extract unique topics preserving order
        const sorted = notes
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime(),
          );

        const seen = new Set<string>();
        const extracted: TopicLink[] = [];
        for (const n of sorted) {
          const t = (n.topic || "").trim();
          if (!t) continue;
          const id = n.id || n._id || n.noteId;
          if (!id) continue;
          if (!seen.has(t)) {
            seen.add(t);
            extracted.push({ topic: t, noteId: id });
          }
          if (extracted.length >= 3) break;
        }

        setTopics(extracted);
      } catch (err) {
        console.error("Sidebar fetch error", err);
      }
    };

    fetchTopics();
  }, []);

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

        {/* Last three uploaded topics */}
        {topics.length === 0 ? (
          <div className='text-sm text-gray-400 px-3 py-2'>No topics yet</div>
        ) : (
          topics.map((t) => (
            <Link
              key={t.topic}
              to={`/summary/${t.noteId}`}
              className='flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md'
            >
              <FiFileText className='w-4 h-4' />
              {t.topic}
            </Link>
          ))
        )}
      </nav>

      <div className='p-4 border-t border-gray-100 space-y-4'>
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
