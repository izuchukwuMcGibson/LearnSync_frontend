import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FiFlag,
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import Header from "../components/Header";

interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuizQuestion {
  question: string;
  codeSnippet?: string;
  options: QuizOption[];
  difficulty: string; // e.g., "Easy", "Medium", "Hard"
  round: number; // 1 or 2
}

const QuizPage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentRound, setCurrentRound] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [isFinished, setIsFinished] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchQuiz = async (roundNum: number) => {
      try {
        setIsLoading(true);
        const difficulty = roundNum === 1 ? "easy-medium" : "medium-hard";

        const response = await fetch(`/api/quiz/generate-quiz/${noteId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ difficulty }),
        });

        if (!isMounted) return;

        if (!response.ok) {
          let errorMsg = "Failed to load quiz";
          try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorData.message || errorMsg;
            console.error("Quiz generation backend error details:", errorData);
          } catch (e) {
            // Ignore non-json
          }
          throw new Error(errorMsg);
        }

        const json = await response.json();
        if (!isMounted) return;

        if (
          json.quizId ||
          (json.data && json.data.id) ||
          (json.data && json.data._id)
        ) {
          setQuizId(
            json.quizId || (json.data && (json.data.id || json.data._id)),
          );
        }

        let quizData = json.data || json.questions || json;
        if (!Array.isArray(quizData)) {
          // If it's returning rounds structure, flatten it
          if (quizData.rounds) {
            const flattened: QuizQuestion[] = [];
            quizData.rounds.forEach((r: any, rIdx: number) => {
              if (r.questions) {
                r.questions.forEach((q: any) => {
                  flattened.push({ ...q, round: rIdx + 1 });
                });
              }
            });
            quizData = flattened;
          } else if (typeof quizData === "object") {
            quizData = Object.values(quizData).flat() as QuizQuestion[];
          }
        }

        // Transform backend objective format into the array structure the UI expects
        const formattedQuestions = quizData.map((q: any) => {
          if (
            q.options &&
            typeof q.options === "object" &&
            !Array.isArray(q.options)
          ) {
            const keys = ["A", "B", "C", "D"];
            return {
              ...q,
              round: roundNum, // Explicitly Tag round using the state mapping
              options: keys.map((key) => ({
                text: q.options[key] || "",
                isCorrect: q.correctAnswer === key,
                explanation: q.correctAnswer === key ? q.explanation : "",
              })),
            };
          }
          return { ...q, round: roundNum };
        });

        setQuestions(formattedQuestions);
      } catch (err: any) {
        if (!isMounted) return;
        console.error("Quiz erro", err);
        setError(err.message || "Failed to generate quiz");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (noteId) fetchQuiz(currentRound);

    return () => {
      isMounted = false;
    };
  }, [noteId, currentRound]);

  const startNextRound = () => {
    setIsFinished(false);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setCurrentRound((prev) => prev + 1);
  };

  const handleSelectOption = (idx: number) => {
    if (isFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: idx,
    }));
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);

      // Compute and submit score
      let score = 0;
      questions.forEach((q, i) => {
        if (
          selectedAnswers[i] !== undefined &&
          q.options[selectedAnswers[i]]?.isCorrect
        ) {
          score++;
        }
      });
      const percentage = Math.round((score / questions.length) * 100);

      if (quizId) {
        try {
          await fetch(`/api/quiz/${quizId}/submit-score`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: percentage }),
          });
        } catch (e) {
          console.error("Failed to submit score", e);
        }
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#f8fafc] flex flex-col font-inter'>
        <Header user={null} />
        <main className='flex-1 p-8'>
          <div className='max-w-4xl mx-auto space-y-6 pt-8'>
            <Skeleton height={20} width={150} />
            <Skeleton height={40} />
            <Skeleton height={200} />
            <div className='space-y-4'>
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className='min-h-screen bg-[#f8fafc] flex flex-col font-inter'>
        <Header user={null} />
        <main className='flex-1 p-8 flex items-center justify-center'>
          <div className='text-center'>
            <h2 className='text-xl font-bold text-red-600 mb-4'>
              {error || "No questions found."}
            </h2>
            <button
              onClick={() => navigate(-1)}
              className='bg-[#112240] text-white px-6 py-2 rounded font-semibold'
            >
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (isFinished) {
    // Review mode showing correct answers and explanations
    let score = 0;
    questions.forEach((q, i) => {
      if (
        selectedAnswers[i] !== undefined &&
        q.options[selectedAnswers[i]]?.isCorrect
      ) {
        score++;
      }
    });

    return (
      <div className='min-h-screen bg-[#f8fafc] flex flex-col font-inter'>
        <Header user={null} />
        <main className='flex-1 p-8 overflow-y-auto'>
          <div className='max-w-4xl mx-auto'>
            <div className='mb-12 text-center bg-white p-8 rounded-xl shadow-sm border border-gray-200'>
              <h2 className='text-3xl font-bold text-[#112240] mb-2'>
                Round {currentRound} Completed!
              </h2>
              <p className='text-gray-500 mb-6'>
                You scored {score} out of {questions.length} (
                {Math.round((score / questions.length) * 100)}%)
              </p>

              {/* Adaptive Logic UI Panel */}
              <div className='mb-8'>
                {currentRound === 1 && score < 7 ? (
                  <div className='p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl mb-4'>
                    <span className='font-bold block mb-1'>
                      More Review Needed
                    </span>
                    You need to score at least 70% to unlock Round 2. Review the
                    correct answers below and head back to the concept.
                  </div>
                ) : currentRound === 1 &&
                  (score >= 7 || score / questions.length >= 0.7) ? (
                  <div className='p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl mb-4'>
                    <span className='font-bold block mb-1'>Great Job!</span>
                    You've shown strong foundational knowledge and successfully
                    unlocked the advanced round.
                  </div>
                ) : currentRound === 2 ? (
                  <div className='p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl mb-4'>
                    {score >= 9 || score / questions.length >= 0.9 ? (
                      <>
                        <span className='font-bold block mb-1'>Mastered!</span>
                        You have mastered this topic.
                      </>
                    ) : score >= 8 || score / questions.length >= 0.8 ? (
                      <>
                        <span className='font-bold block mb-1'>Excellent!</span>
                        You have become very good in this topic.
                      </>
                    ) : score >= 7 || score / questions.length >= 0.7 ? (
                      <>
                        <span className='font-bold block mb-1'>Good Job!</span>
                        You have become good in this topic.
                      </>
                    ) : (
                      <>
                        <span className='font-bold block mb-1'>
                          Great Effort!
                        </span>
                        Review the correct answers below and keep practicing!
                      </>
                    )}
                  </div>
                ) : null}
              </div>

              <div className='flex items-center justify-center gap-4'>
                <button
                  onClick={() => navigate(`/dashboard`)}
                  className='bg-gray-100 text-[#112240] px-6 py-2 rounded font-semibold border border-gray-300 hover:bg-gray-200'
                >
                  Return to Dashboard
                </button>
                {currentRound === 1 &&
                  (score >= 7 || score / questions.length >= 0.7) && (
                    <button
                      onClick={startNextRound}
                      className='bg-[#2b4c7e] text-white px-6 py-2 rounded font-semibold hover:bg-[#1f385c]'
                    >
                      Start Round 2
                    </button>
                  )}
                {currentRound === 2 && (
                  <button
                    onClick={() => navigate(`/summary/${noteId}`)}
                    className='bg-[#2b4c7e] text-white px-6 py-2 rounded font-semibold hover:bg-[#1f385c]'
                  >
                    End lesson and return to summary
                  </button>
                )}
                {currentRound === 2 &&
                  score < 7 &&
                  score / questions.length < 0.7 && (
                    <button
                      onClick={() => {
                        // TODO: Implement backend integration for further concept breakdown
                        console.log(
                          "Simplify concepts further - pending backend implementation",
                        );
                        alert("Simplify Concepts feature coming soon!");
                      }}
                      className='bg-yellow-500 text-white px-6 py-2 rounded font-semibold hover:bg-yellow-600 transition'
                    >
                      Simplify Concepts Further
                    </button>
                  )}
              </div>
            </div>

            <div className='space-y-12'>
              {questions.map((q, qIndex) => {
                const selectedIdx = selectedAnswers[qIndex];
                const isCorrectSel =
                  selectedIdx !== undefined &&
                  q.options[selectedIdx]?.isCorrect;

                return (
                  <div
                    key={qIndex}
                    className='bg-white p-8 rounded-xl shadow-sm border border-gray-200 relative'
                  >
                    <div className='flex gap-4 items-center mb-6'>
                      <div
                        className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-white ${isCorrectSel ? "bg-green-500" : "bg-red-500"}`}
                      >
                        {qIndex + 1}
                      </div>
                      <h3 className='text-xl font-bold text-[#112240]'>
                        {q.question}
                      </h3>
                    </div>

                    {q.codeSnippet && (
                      <div className='bg-[#1a202c] text-white p-4 rounded-md mb-6 font-mono text-sm overflow-x-auto whitespace-pre-wrap'>
                        {q.codeSnippet}
                      </div>
                    )}

                    <div className='space-y-4'>
                      {Array.isArray(q.options) ? (
                        q.options.map((opt, optIndex) => {
                          const isSelected = selectedIdx === optIndex;
                          const isActuallyCorrect = opt.isCorrect;

                          let boxStyles = "border-gray-200 bg-white";
                          let labelStyles = "bg-gray-100 text-gray-700";

                          if (isActuallyCorrect) {
                            boxStyles = "border-green-500 bg-green-50";
                            labelStyles = "bg-green-500 text-white";
                          } else if (isSelected && !isActuallyCorrect) {
                            boxStyles = "border-red-500 bg-red-50";
                            labelStyles = "bg-red-500 text-white";
                          }

                          return (
                            <div
                              key={optIndex}
                              className={`w-full text-left p-4 rounded-xl border ${boxStyles} relative`}
                            >
                              <div className='flex items-center gap-4'>
                                <span
                                  className={`w-8 h-8 shrink-0 flex items-center justify-center font-bold rounded ${labelStyles}`}
                                >
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                <span className='font-medium text-[#112240] flex-1'>
                                  {opt.text || opt.toString()}
                                </span>
                                {isActuallyCorrect && (
                                  <FiCheckCircle className='text-green-500 w-5 h-5' />
                                )}
                              </div>

                              {/* Display explanation for the correct option explicitly */}
                              {isActuallyCorrect && opt.explanation && (
                                <div className='mt-4 pt-4 border-t border-green-200'>
                                  <p className='text-sm text-green-800'>
                                    <span className='font-bold'>
                                      Explanation:
                                    </span>{" "}
                                    {opt.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className='p-4 text-red-500 bg-red-50 rounded-xl border border-red-200'>
                          Options not available for this question.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const roundText =
    currentQuestion.round === 1 ? "ROUND 1 — EASY" : "ROUND 2 — MEDIUM/HARD";

  return (
    <div className='min-h-screen bg-[#f8fafc] flex flex-col font-inter'>
      <Header user={null} />

      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-4xl mx-auto pt-4'>
          {/* Top Meta Area */}
          <div className='flex items-center justify-between mb-8'>
            <div>
              <p className='text-xs text-gray-500 font-bold tracking-widest mb-2 uppercase'>
                QUESTION {currentIndex + 1} OF {questions.length}
              </p>
              <div className='flex items-center gap-4'>
                <span className='text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full whitespace-nowrap'>
                  {roundText}
                </span>
                {/* Mock timer purely for visual accuracy to mockup */}
                <span className='text-green-600 font-bold text-sm flex items-center gap-1'>
                  ⏱ 15:00
                </span>
              </div>
            </div>

            <button className='flex items-center gap-2 text-sm font-semibold border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 transition'>
              <FiFlag className='w-4 h-4' /> Report
            </button>
          </div>

          {/* Question */}
          <h1 className='text-3xl font-bold text-[#112240] mb-8 leading-tight'>
            {currentQuestion.question}
          </h1>

          {/* Code Snippet (if available) - styled dark like the design */}
          {currentQuestion.codeSnippet && (
            <div className='bg-[#1f2937] text-[#e2e8f0] p-6 rounded-xl mb-8 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap shadow-md'>
              <div className='flex gap-2 mb-4'>
                <div className='w-3 h-3 rounded-full bg-red-500'></div>
                <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                <div className='w-3 h-3 rounded-full bg-green-500'></div>
              </div>
              {currentQuestion.codeSnippet}
            </div>
          )}

          {/* Options grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-12'>
            {Array.isArray(currentQuestion.options) ? (
              currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentIndex] === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-4 group hover:border-[#112240] ${
                      isSelected
                        ? "border-[#112240] bg-blue-50/50 shadow-sm"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 shrink-0 rounded flex items-center justify-center font-bold text-sm transition ${
                        isSelected
                          ? "bg-[#112240] text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className='font-semibold text-[#112240] text-lg'>
                      {opt.text || opt.toString()}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className='col-span-full p-4 text-red-500 bg-red-50 rounded-xl border border-red-200'>
                Options not available for this question.
              </div>
            )}
          </div>

          {/* Bottom Bar: Prev / Next */}
          <div className='pt-6 border-t border-gray-200 flex items-center justify-between'>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 font-semibold px-4 py-2 ${currentIndex === 0 ? "text-gray-300 cursor-not-allowed" : "text-[#112240] hover:bg-gray-100 rounded"}`}
            >
              <FiArrowLeft /> Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentIndex] === undefined}
              className={`flex items-center gap-2 font-semibold px-6 py-2.5 rounded-md text-white transition ${
                selectedAnswers[currentIndex] === undefined
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#112240] hover:bg-[#1f385c]"
              }`}
            >
              {currentIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}{" "}
              <FiArrowRight />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
