import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FiMoreHorizontal,
  FiChevronRight,
  FiUpload,
  FiFileText,
  FiEye,
  FiTrash2,
} from "react-icons/fi";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Note {
  _id?: string;
  id?: string;
  noteId?: string;
  title?: string;
  topic?: string;
  originalName?: string;
  fileName?: string;
  createdAt?: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [topic, setTopic] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/me");

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        const userData = data.user || data;
        setUser(userData);

        if (userData?.id) {
          // Fetch notes
          try {
            const notesResponse = await fetch(
              `/api/notes/get-notes/${userData.id}`,
            );
            if (notesResponse.ok) {
              const notesData = await notesResponse.json();
              setNotes(
                Array.isArray(notesData) ? notesData : notesData.notes || [],
              );
            }
          } catch (noteErr) {
            console.error("Error fetching notes", noteErr);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setShowUploadModal(true);
  };

  const confirmUpload = async () => {
    if (!selectedFile || !user?.id || !topic.trim()) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("note", selectedFile);
    formData.append("userId", user.id);
    formData.append("topic", topic.trim());

    try {
      const response = await fetch("/api/notes/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Fetch notes again to reflect the newly uploaded note
        const notesResponse = await fetch(`/api/notes/get-notes/${user.id}`);
        if (notesResponse.ok) {
          const notesData = await notesResponse.json();
          setNotes(
            Array.isArray(notesData) ? notesData : notesData.notes || [],
          );
        }
      } else {
        console.error("Failed to upload note");
      }
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setIsUploading(false);
      setShowUploadModal(false);
      setSelectedFile(null);
      setTopic("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteNote = async (noteId?: string) => {
    if (!noteId) {
      console.error("No noteId provided");
      alert("Error: Note ID is missing.");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(`/api/notes/delete-note/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }), // Some backends require userId to confirm deletion
      });

      if (response.ok) {
        // Remove the note from local state immediately for a fast UI update
        setNotes((prevNotes) =>
          prevNotes.filter((n) => (n.id || n._id || n.noteId) !== noteId),
        );
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to delete note", errorData);
        alert(
          `Failed to delete note: ${errorData.message || response.statusText}`,
        );
      }
    } catch (error) {
      console.error("Error deleting note", error);
      alert("Error deleting note. Check console for details.");
    }
  };

  if (isLoading) {
    return (
      <div className='h-screen bg-gray-50 flex flex-col font-inter'>
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
    <div className='h-screen bg-gray-50 flex flex-col font-inter'>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileSelect}
        className='hidden'
        accept='.pdf,.txt,.doc,.docx'
      />
      {/* Top Navigation */}
      <Header user={user} onUploadClick={() => fileInputRef.current?.click()} />

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
                {notes.length > 0
                  ? `You have ${notes.length} saved notes. Pick up where you left off.`
                  : "Upload notes to start generating your learning paths."}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {/* Dynamic In-Progress Cards */}
              {[...notes]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt || 0).getTime() -
                    new Date(a.createdAt || 0).getTime(),
                )
                .slice(0, 2)
                .map((note, index) => {
                  const date = new Date(
                    note.createdAt || Date.now(),
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                  const noteId = note.id || note._id || note.noteId;

                  return (
                    <div
                      key={noteId || index}
                      onClick={() => navigate(`/summary/${noteId}`)}
                      className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:border-[#2b4c7e] transition cursor-pointer group ${index === 1 ? "border-l-4 border-l-[#2b4c7e]" : ""}`}
                    >
                      <div className='flex justify-between items-start mb-4'>
                        <span className='text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded'>
                          {note.topic || "General"}
                        </span>
                        <button
                          className='text-gray-400 hover:text-gray-600'
                          onClick={(e) => {
                            e.stopPropagation(); /* Optional action menu */
                          }}
                        >
                          <FiMoreHorizontal />
                        </button>
                      </div>
                      <h3
                        className='text-xl font-bold text-[#112240] mb-1 truncate'
                        title={
                          note.originalName ||
                          note.fileName ||
                          note.title ||
                          `Note ${index + 1}`
                        }
                      >
                        {note.originalName ||
                          note.fileName ||
                          note.title ||
                          `Note ${index + 1}`}
                      </h3>
                      <p className='text-xs text-gray-400 mb-8'>
                        Uploaded: {date}
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
                  );
                })}

              {/* Keep New Notes Card at the end */}
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
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={`w-full py-2 rounded-md text-sm font-bold transition ${isUploading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-[#2b4c7e] hover:bg-gray-50"}`}
                >
                  {isUploading ? "Uploading..." : "Upload Notes"}
                </button>
              </div>
            </div>

            {/* Recently Uploaded Notes */}
            <div className='mt-12'>
              <div className='flex justify-between items-end mb-6'>
                <h2 className='text-xl font-bold text-[#112240]'>
                  Recently Uploaded Notes
                </h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {notes.length === 0 ? (
                  <div className='col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200 border-dashed'>
                    no note uploaded yet
                  </div>
                ) : (
                  notes.map((note, index) => {
                    const date = new Date(
                      note.createdAt || Date.now(),
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    return (
                      <div
                        key={note.id || note._id || index}
                        className='bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-[#2b4c7e] transition group'
                      >
                        <div className='flex items-start gap-4 mb-6'>
                          <div className='w-10 h-10 rounded bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#2b4c7e]'>
                            <FiFileText className='w-5 h-5' />
                          </div>
                          <div className='overflow-hidden'>
                            <h4
                              className='text-sm font-bold text-[#112240] leading-tight mb-1 truncate'
                              title={
                                note.topic ||
                                note.title ||
                                note.originalName ||
                                note.fileName
                              }
                            >
                              {note.topic ||
                                note.title ||
                                note.originalName ||
                                note.fileName ||
                                `Note ${index + 1}`}
                            </h4>
                            <p className='text-[10px] text-gray-400'>
                              Uploaded {date}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/summary/${note.id || note._id || note.noteId}?generate=true`,
                              );
                            }}
                            className='flex-1 bg-[#112240] text-white py-2 rounded text-xs font-bold hover:bg-[#1f385c] transition'
                          >
                            Process
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/summary/${note.id || note._id || note.noteId}`,
                              );
                            }}
                            className='w-10 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:text-[#2b4c7e] hover:bg-gray-50 transition'
                          >
                            <FiEye className='w-4 h-4' />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteNote(
                                note.id || note._id || note.noteId,
                              )
                            }
                            className='w-10 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition'
                            title='Delete note'
                          >
                            <FiTrash2 className='w-4 h-4' />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Upload Topic Modal */}
      {showUploadModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-md'>
            <h3 className='text-xl font-bold text-[#112240] mb-4'>
              Enter Note Topic
            </h3>
            <p className='text-sm text-gray-500 mb-4'>
              File: <span className='font-semibold'>{selectedFile?.name}</span>
            </p>
            <input
              type='text'
              placeholder='e.g. Data Structures, Week 1'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b4c7e] mb-6'
              autoFocus
            />
            <div className='flex justify-end gap-3'>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setTopic("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className='px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-md transition'
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={confirmUpload}
                disabled={!topic.trim() || isUploading}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition ${!topic.trim() || isUploading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#112240] text-white hover:bg-[#1f385c]"}`}
              >
                {isUploading ? "Uploading..." : "Confirm Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
