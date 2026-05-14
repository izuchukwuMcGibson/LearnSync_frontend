import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {
  FiBook,
  FiList,
  FiMessageSquare,
  FiHelpCircle,
  FiChevronRight,
  FiChevronLeft,
  FiBookmark,
  FiAlertTriangle,
} from "react-icons/fi";
import Header from "../components/Header";

interface KeyPoint {
  concept: string;
  explanation: string;
}

interface SummaryData {
  noteId: string;
  summary: string;
  keyPoints: KeyPoint[];
  isRead?: boolean;
  quizAttempts?: number;
  averageScore?: number;
}

const SummaryPage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const shouldAutoGenerate = queryParams.get("generate") === "true";

  const [data, setData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsGeneration, setNeedsGeneration] = useState(false);
  const [currentConceptIdx, setCurrentConceptIdx] = useState(0);
  const [isRead, setIsRead] = useState(false);

  const triggerGeneration = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setNeedsGeneration(false);

      const response = await fetch(`/api/summary/generate-summary/${noteId}`, {
        method: "POST",
      });

      if (!response.ok) {
        let errorMsg = "Failed to generate summary";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorData.message || errorMsg;
        } catch (e) {}
        throw new Error(errorMsg);
      }

      const json = await response.json();

      if (
        json.error ||
        (json.message && json.message.toLowerCase().includes("error"))
      ) {
        throw new Error(json.error || json.message);
      }

      const summaryData = json.data || json;
      setData(summaryData);
      if (summaryData.isRead) {
        setIsRead(true);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        // First try to fetch the existing summary from the database
        let response = await fetch(`/api/summary/${noteId}`);

        if (!isMounted) return;

        // If it doesn't exist
        if (!response.ok) {
          if (shouldAutoGenerate) {
            // Auto generate directly if coming from "Process" button
            await triggerGeneration();
          } else {
            // Just show the "Ready to Process?" screen
            setNeedsGeneration(true);
            setIsLoading(false);
          }
          return;
        }

        const json = await response.json();

        if (!isMounted) return;

        if (
          json.error ||
          (json.message && json.message.toLowerCase().includes("error"))
        ) {
          throw new Error(json.error || json.message);
        }

        const summaryData = json.data || json;
        setData(summaryData);
        if (summaryData.isRead) {
          setIsRead(true);
        }
      } catch (err: any) {
        if (!isMounted) return;
        console.error(err);
        setError(err.message || "An error occurred");
      } finally {
        if (isMounted && !needsGeneration) {
          setIsLoading(false);
        }
      }
    };

    if (noteId) {
      fetchSummary();
    }

    return () => {
      isMounted = false;
    };
  }, [noteId, shouldAutoGenerate]);

  return (
    <div className='min-h-screen bg-[#f8fafc] flex flex-col font-inter'>
      <Header user={null} />

      <div className='flex flex-1 overflow-hidden'>
        {/* Left Sidebar for Study Path */}
        <aside className='w-64 bg-[#f8fafc] border-r border-gray-200 flex flex-col h-[calc(100vh-4rem)] hidden lg:flex'>
          <div className='p-6'>
            <h2 className='text-[#112240] font-bold text-lg'>Study Path</h2>
            <p className='text-xs text-gray-500 mt-1'>Module Analysis</p>
          </div>

          <nav className='flex-1 px-4 space-y-2 mt-4'>
            <div className='flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#112240] bg-[#eef2f6] rounded-md border-l-4 border-[#2b4c7e]'>
              <FiBook className='w-4 h-4' />
              Summary
            </div>
            <div className='flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer'>
              <FiList className='w-4 h-4' />
              Concepts
            </div>
            <div className='flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer'>
              <FiMessageSquare className='w-4 h-4' />
              Explanation
            </div>
            <div className='flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer'>
              <FiHelpCircle className='w-4 h-4' />
              Quiz
            </div>
          </nav>

          <div className='p-6'>
            <button
              onClick={() => isRead && navigate(`/quiz/${noteId}`)}
              disabled={!isRead}
              className={`w-full py-2.5 rounded-md text-sm font-bold transition flex justify-center items-center gap-2 ${
                isRead
                  ? "bg-[#112240] text-white hover:bg-[#1f385c]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Take Quiz {isRead && <FiChevronRight />}
            </button>
            {!isRead && (
              <p className='text-[10px] text-gray-400 text-center mt-2'>
                Finish reading all concepts to unlock
              </p>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className='flex-1 p-8 overflow-y-auto bg-white'>
          <div className='max-w-5xl mx-auto'>
            {isLoading ? (
              <div className='space-y-6'>
                <Skeleton height={24} width={200} />
                <Skeleton height={40} width={400} />
                <Skeleton height={20} width={500} />
                <div className='grid grid-cols-3 gap-6 mt-8'>
                  <div className='col-span-2'>
                    <Skeleton height={300} borderRadius={12} />
                  </div>
                  <div className='col-span-1 space-y-6'>
                    <Skeleton height={140} borderRadius={12} />
                    <Skeleton height={140} borderRadius={12} />
                  </div>
                </div>
              </div>
            ) : needsGeneration ? (
              <div className='flex flex-col items-center justify-center py-24 text-center'>
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6'>
                  <FiBook className='w-8 h-8 text-[#2b4c7e]' />
                </div>
                <h3 className='text-2xl font-bold text-[#112240] mb-3'>
                  Ready to Extract Insights?
                </h3>
                <p className='text-gray-500 max-w-md mx-auto mb-8 leading-relaxed'>
                  This note hasn't been analyzed yet. Generating an adaptive
                  summary will consume your quota. Do you want to process this
                  document now?
                </p>
                <div className='flex gap-4'>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className='px-6 py-2.5 bg-gray-100 text-gray-700 rounded text-sm font-bold hover:bg-gray-200 transition'
                  >
                    Go Back
                  </button>
                  <button
                    onClick={triggerGeneration}
                    className='px-6 py-2.5 bg-[#112240] text-white rounded text-sm font-bold hover:bg-[#1f385c] transition'
                  >
                    Generate Summary
                  </button>
                </div>
              </div>
            ) : error ? (
              <div className='flex flex-col items-center justify-center py-24 text-center'>
                <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6'>
                  <FiAlertTriangle className='w-8 h-8 text-red-500' />
                </div>
                <h3 className='text-2xl font-bold text-[#112240] mb-3'>
                  Topic Error
                </h3>
                <p className='text-gray-500 max-w-md mx-auto mb-2 leading-relaxed'>
                  {error}
                </p>
                <p className='text-[#2b4c7e] font-medium max-w-md mx-auto mb-8'>
                  It looks like the uploaded note is not computer science
                  related. Please return to the dashboard and upload a valid
                  Computer Science content to generate a summary.
                </p>
                <div className='flex gap-4'>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className='px-6 py-2.5 bg-[#112240] text-white rounded text-sm font-bold hover:bg-[#1f385c] transition'
                  >
                    Return to Dashboard
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className='px-6 py-2.5 bg-white text-[#2b4c7e] border border-[#2b4c7e] rounded text-sm font-bold hover:bg-gray-50 transition'
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : data ? (
              <>
                <div className='mb-8'>
                  <div className='flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-3'>
                    <FiBook className='w-3.5 h-3.5' />
                    Generated Note Analysis
                  </div>
                  <h1 className='text-4xl font-bold text-[#112240] mb-3 tracking-tight'>
                    Module Summary & Key Concepts
                  </h1>
                  <p className='text-gray-500 text-base'>
                    Automated breakdown and fundamental concepts extracted
                    directly from your uploaded materials.
                  </p>
                </div>

                <div className='flex flex-col lg:flex-row gap-6 mb-8'>
                  {/* Summary Card */}
                  <div className='flex-1 bg-[#f8fafc] border border-gray-200 rounded-xl p-6 lg:p-8'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center'>
                        <FiBook className='w-4 h-4' />
                      </div>
                      <h2 className='text-2xl font-bold text-[#112240]'>
                        Summary
                      </h2>
                    </div>
                    <p className='text-[#112240] font-medium leading-relaxed text-lg mb-6 whitespace-pre-wrap'>
                      {data.summary}
                    </p>
                  </div>

                  {/* Right Side Cards */}
                  <div className='lg:w-72 flex flex-col gap-6'>
                    <div className='bg-[#112240] text-white rounded-xl p-6 shadow-md border border-[#1f385c]'>
                      <p className='text-xs font-bold uppercase tracking-wider text-blue-300 mb-2'>
                        Mastery Level
                      </p>
                      <h3 className='text-2xl font-bold mb-4'>
                        {!data.quizAttempts || data.quizAttempts === 0
                          ? "Beginner"
                          : (data.averageScore || 0) >= 80
                            ? "Pro"
                            : (data.averageScore || 0) >= 50
                              ? "Intermediate"
                              : "Amateur"}
                      </h3>
                      <div className='flex gap-2'>
                        <div
                          className={`h-1.5 flex-1 rounded-full ${!data.quizAttempts || data.quizAttempts === 0 ? "bg-white/30" : "bg-white"}`}
                        ></div>
                        <div
                          className={`h-1.5 flex-1 rounded-full ${data.quizAttempts && (data.averageScore || 0) >= 50 ? "bg-white" : "bg-white/30"}`}
                        ></div>
                        <div
                          className={`h-1.5 flex-1 rounded-full ${data.quizAttempts && (data.averageScore || 0) >= 80 ? "bg-white" : "bg-white/30"}`}
                        ></div>
                      </div>
                    </div>

                    {data.quizAttempts && data.quizAttempts > 0 ? (
                      <div className='bg-[#f8fafc] rounded-xl p-6 text-center border border-gray-200 shadow-sm flex flex-col items-center justify-center py-8 relative'>
                        <p className='absolute top-3 left-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                          {data.quizAttempts} Quizzes Taken
                        </p>
                        <h3 className='text-lg font-bold text-[#112240] mb-6 mt-2'>
                          Mastery Progress
                        </h3>
                        <div
                          className='w-24 h-24 rounded-full flex items-center justify-center mb-4'
                          style={{
                            background: `conic-gradient(
                              ${(data.averageScore || 0) >= 70 ? "#22c55e" : (data.averageScore || 0) >= 50 ? "#3b82f6" : "#eab308"} ${data.averageScore || 0}%,
                              #e5e7eb 0%
                            )`,
                          }}
                        >
                          <div
                            className={`w-[86px] h-[86px] rounded-full flex items-center justify-center ${
                              (data.averageScore || 0) >= 70
                                ? "bg-green-50"
                                : (data.averageScore || 0) >= 50
                                  ? "bg-blue-50"
                                  : "bg-yellow-50"
                            }`}
                          >
                            <span className='text-xl font-bold text-[#112240]'>
                              {Math.round(data.averageScore || 0)}%
                            </span>
                          </div>
                        </div>
                        <p className='text-xs text-gray-500 px-4'>
                          {(data.averageScore || 0) >= 70
                            ? "Great job! You have a solid grasp of this topic."
                            : (data.averageScore || 0) >= 50
                              ? "Good progress! A bit more review will get you to perfection."
                              : "Keep practicing! Your mastery will grow with each quiz."}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Key Concepts Section */}
                {data.keyPoints && data.keyPoints.length > 0 && (
                  <div className='mt-12'>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center'>
                        <FiHelpCircle className='w-4 h-4' />
                      </div>
                      <h2 className='text-2xl font-bold text-[#112240]'>
                        Key Concepts
                      </h2>
                    </div>

                    <div className='bg-white border border-gray-200 shadow-sm rounded-xl p-8 relative'>
                      <div className='absolute top-6 right-6 flex gap-3'>
                        <button className='text-sm font-semibold flex items-center gap-2 text-[#2b4c7e]'>
                          <FiBookmark /> Save for Later
                        </button>
                        <button
                          onClick={() => navigate(`/quiz/${noteId}`)}
                          disabled={!isRead}
                          className={`text-sm font-bold py-1.5 px-4 rounded transition flex items-center gap-2 ${
                            isRead
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed hidden"
                          }`}
                        >
                          I'm Ready - Take Quiz <FiChevronRight />
                        </button>
                      </div>

                      <p className='text-xs text-gray-500 mb-6 font-semibold uppercase tracking-wider'>
                        Currently Reading
                      </p>

                      <div className='flex gap-6 mt-8'>
                        <div className='w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0'>
                          <FiList className='w-8 h-8 text-blue-600' />
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-2xl font-bold text-[#112240] mb-4'>
                            {data.keyPoints[currentConceptIdx].concept}
                          </h3>
                          <p className='text-[#334155] leading-relaxed mb-8'>
                            {data.keyPoints[currentConceptIdx].explanation}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center justify-between mt-8 pt-6 border-t border-gray-100'>
                        <span className='text-sm text-gray-500'>
                          Concept {currentConceptIdx + 1} of{" "}
                          {data.keyPoints.length}
                        </span>

                        <div className='flex gap-3'>
                          <button
                            onClick={() => {
                              if (currentConceptIdx > 0) {
                                setCurrentConceptIdx((prev) => prev - 1);
                              }
                            }}
                            disabled={currentConceptIdx === 0}
                            className={`px-5 py-2.5 rounded text-sm font-bold transition flex items-center gap-2 ${
                              currentConceptIdx === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed hidden"
                                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <FiChevronLeft /> Previous
                          </button>

                          <button
                            onClick={async () => {
                              if (
                                currentConceptIdx <
                                data.keyPoints.length - 1
                              ) {
                                setCurrentConceptIdx((prev) => prev + 1);
                              } else if (!isRead) {
                                try {
                                  const readResp = await fetch(
                                    `/api/summary/${noteId}/read`,
                                    {
                                      method: "PATCH",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    },
                                  );
                                  if (readResp.ok) {
                                    setIsRead(true);
                                  } else {
                                    const errorData = await readResp
                                      .json()
                                      .catch(() => ({}));
                                    console.error(
                                      "Backend returned error for read endpoint:",
                                      readResp.status,
                                      errorData,
                                    );
                                  }
                                } catch (err) {
                                  console.error("Error marking as read", err);
                                }
                              }
                            }}
                            className={`px-5 py-2.5 rounded text-sm font-bold transition flex items-center gap-2 ${
                              currentConceptIdx === data.keyPoints.length - 1 &&
                              isRead
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-[#112240] text-white hover:bg-[#1f385c]"
                            }`}
                          >
                            {currentConceptIdx < data.keyPoints.length - 1 ? (
                              <>
                                Next Concept <FiChevronRight />
                              </>
                            ) : isRead ? (
                              "Completed"
                            ) : (
                              "Finish Reading"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SummaryPage;
