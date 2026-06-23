import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Editor from "@monaco-editor/react";
import {
  FiFlag,
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiTerminal,
} from "react-icons/fi";
import Header from "../components/Header";

interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface CodeTestCase {
  invocation: string;
  expected: string;
}

interface QuizQuestion {
  question: string;
  codeSnippet?: string;
  options?: QuizOption[];
  difficulty: string;
  round: number;
  type?: "mcq" | "code";
  starterCode?: string;
  testCases?: CodeTestCase[];
  language?: string;
  explanation: string;
}

interface CodeExecutionResult {
  success: boolean;
  output: string;
}

interface GlotRunResponse {
  stdout?: string;
  stderr?: string;
  error?: string;
  message?: string;
}

const GLOT_API_URL = import.meta.env.VITE_GLOT_API_URL || "/glot-api/run";
const GLOT_VERSION = import.meta.env.VITE_GLOT_VERSION || "latest";

const getGlotLanguage = (language: string) => {
  const normalized = language.trim().toLowerCase();
  const aliases: Record<string, string> = {
    javascript: "javascript",
    js: "javascript",
    node: "javascript",
    nodejs: "javascript",
    typescript: "typescript",
    ts: "typescript",
    python: "python",
    python3: "python",
    py: "python",
    java: "java",
    cpp: "cpp",
    "c++": "cpp",
    cplusplus: "cpp",
  };

  return aliases[normalized] || "javascript";
};

const getGlotFileName = (language: string) => {
  const fileNames: Record<string, string> = {
    javascript: "main.js",
    typescript: "main.ts",
    python: "main.py",
    java: "Main.java",
    cpp: "main.cpp",
  };

  return fileNames[language] || "main.txt";
};

const buildGlotRunUrl = (language: string) => {
  const baseUrl = GLOT_API_URL.replace(/\/$/, "");
  return `${baseUrl}/${encodeURIComponent(language)}/${encodeURIComponent(
    GLOT_VERSION,
  )}`;
};

const getGlotHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

const getExecutionErrorMessage = (data: GlotRunResponse) => {
  const message = data.message || data.error || data.stderr;

  if (!message) {
    return "Execution engine did not return a runnable result.";
  }

  return message;
};

const QuizPage = () => {
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
  const [codeAnswers, setCodeAnswers] = useState<Record<number, string>>({});
  const [codeResults, setCodeResults] = useState<
    Record<number, CodeExecutionResult>
  >({});
  const [isExecuting, setIsExecuting] = useState(false);

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
          } catch {
            // Ignore parse errors
          }
          throw new Error(errorMsg);
        }

        const json = await response.json();
        if (!isMounted) return;

        if (json.quizId || (json.data && (json.data.id || json.data._id))) {
          setQuizId(
            json.quizId || (json.data && (json.data.id || json.data._id)),
          );
        }

        let quizData = json.data || json.questions || json;

        if (!Array.isArray(quizData)) {
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

        const formattedQuestions = quizData.map((q: any) => {
          if (q.type === "code") {
            return { ...q, type: "code", round: roundNum };
          }
          if (
            q.options &&
            typeof q.options === "object" &&
            !Array.isArray(q.options)
          ) {
            const keys = ["A", "B", "C", "D"];
            return {
              ...q,
              type: "mcq",
              round: roundNum,
              options: keys.map((key) => ({
                text: q.options[key] || "",
                isCorrect: q.correctAnswer === key,
                explanation: q.correctAnswer === key ? q.explanation : "",
              })),
            };
          }
          return { ...q, type: "mcq", round: roundNum };
        });

        setQuestions(formattedQuestions);
      } catch (err: any) {
        if (!isMounted) return;
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
    setCodeAnswers({});
    setCodeResults({});
    setCurrentRound((prev) => prev + 1);
  };

  const handleSelectOption = (idx: number) => {
    if (isFinished) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
  };

  const handleRunCode = async () => {
    const question = questions[currentIndex];
    if (!question || question.type !== "code") return;

    setIsExecuting(true);

    // Get user code from state, or default to starter code
    const userPayloadCode =
      codeAnswers[currentIndex] !== undefined
        ? codeAnswers[currentIndex]
        : question.starterCode || "";

    const language = question.language || "javascript";
    const glotLanguage = getGlotLanguage(language);

    try {
      const apiResponse = await fetch(buildGlotRunUrl(glotLanguage), {
        method: "POST",
        headers: getGlotHeaders(),
        body: JSON.stringify({
          files: [
            {
              name: getGlotFileName(glotLanguage),
              content: userPayloadCode,
            },
          ],
        }),
      });

      const result = (await apiResponse.json()) as GlotRunResponse;

      if (!apiResponse.ok) {
        throw new Error(
          getExecutionErrorMessage(result) ||
            `Execution engine request failed with status ${apiResponse.status}.`,
        );
      }

      const stdout = (result.stdout || "").trim();
      const stderr = (result.stderr || "").trim();
      const engineError = (result.error || "").trim();

      if (stderr || engineError) {
        setCodeResults((prev) => ({
          ...prev,
          [currentIndex]: {
            success: false,
            output: stderr || engineError,
          },
        }));
        return;
      }

      setCodeResults((prev) => ({
        ...prev,
        [currentIndex]: {
          success: true,
          output: stdout || "Execution completed successfully (no output).",
        },
      }));
    } catch (err: any) {
      const output =
        err.message === "Failed to fetch"
          ? "Unable to reach the code execution service. In local development, use the /glot-api Vite proxy because Glot.io does not support browser CORS preflight requests."
          : err.message || "Execution failure routing request to runtime engine.";

      setCodeResults((prev) => ({
        ...prev,
        [currentIndex]: {
          success: false,
          output,
        },
      }));
    } finally {
      setIsExecuting(false);
    }
  };

  const computeScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (q.type === "code") {
        if (codeResults[i]?.success) score++;
      } else {
        if (
          selectedAnswers[i] !== undefined &&
          q.options &&
          q.options[selectedAnswers[i]]?.isCorrect
        ) {
          score++;
        }
      }
    });
    return score;
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      const score = computeScore();
      const percentage = Math.round((score / questions.length) * 100);

      if (quizId) {
        try {
          await fetch(`/api/quiz/${quizId}/submit-score`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: percentage }),
          });
        } catch (e) {
          console.error(
            "Failed to submit score context back to note profile history",
            e,
          );
        }
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
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
    const score = computeScore();

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

              <div className='mb-8'>
                {currentRound === 1 && score / questions.length < 0.7 ? (
                  <div className='p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl mb-4'>
                    <span className='font-bold block mb-1'>
                      More Review Needed
                    </span>
                    You need to score at least 70% to unlock Round 2.
                  </div>
                ) : currentRound === 1 ? (
                  <div className='p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl mb-4'>
                    <span className='font-bold block mb-1'>Great Job!</span>
                    You've successfully unlocked the advanced round.
                  </div>
                ) : (
                  <div className='p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl mb-4'>
                    <span className='font-bold block mb-1'>
                      Round 2 Finished
                    </span>
                    Review your code output evaluation log profile results
                    metrics detailed below.
                  </div>
                )}
              </div>

              <div className='flex items-center justify-center gap-4'>
                <button
                  onClick={() => navigate("/dashboard")}
                  className='bg-gray-100 text-[#112240] px-6 py-2 rounded font-semibold border border-gray-300 hover:bg-gray-200'
                >
                  Return to Dashboard
                </button>
                {currentRound === 1 && score / questions.length >= 0.7 && (
                  <button
                    onClick={startNextRound}
                    className='bg-[#2b4c7e] text-white px-6 py-2 rounded font-semibold hover:bg-[#1f385c]'
                  >
                    Start Round 2
                  </button>
                )}
              </div>
            </div>

            <div className='space-y-12'>
              {questions.map((q, qIndex) => {
                const selectedIdx = selectedAnswers[qIndex];
                const isCorrectSel =
                  q.type === "code"
                    ? codeResults[qIndex]?.success
                    : selectedIdx !== undefined &&
                      q.options &&
                      q.options[selectedIdx]?.isCorrect;

                return (
                  <div
                    key={qIndex}
                    className='bg-white p-8 rounded-xl shadow-sm border border-gray-200'
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

                    {q.type === "code" ? (
                      <div className='p-4 border rounded-xl bg-gray-50 border-gray-200'>
                        <h4 className='font-bold mb-2'>Your Code</h4>
                        <Editor
                          height='200px'
                          language={q.language || "javascript"}
                          value={codeAnswers[qIndex] || q.starterCode || ""}
                          theme='vs-dark'
                          options={{
                            readOnly: true,
                            minimap: { enabled: false },
                          }}
                        />
                        <div className='mt-4'>
                          <span className='font-bold'>
                            Execution Results Summary Output:
                          </span>
                          <pre
                            className={`mt-2 p-2 min-h-[2.5rem] rounded ${codeResults[qIndex]?.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {codeResults[qIndex]?.output || "Not executed"}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className='space-y-4'>
                        {Array.isArray(q.options) &&
                          q.options.map((opt, optIndex) => {
                            const isSelected = selectedIdx === optIndex;
                            const isActuallyCorrect = opt.isCorrect;
                            let boxStyles = isActuallyCorrect
                              ? "border-green-500 bg-green-50"
                              : isSelected
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 bg-white";

                            return (
                              <div
                                key={optIndex}
                                className={`w-full text-left p-4 rounded-xl border ${boxStyles}`}
                              >
                                <div className='flex items-center gap-4'>
                                  <span className='w-8 h-8 shrink-0 flex items-center justify-center font-bold rounded bg-gray-100 text-gray-700'>
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  <span className='font-medium text-[#112240] flex-1'>
                                    {opt.text}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
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
    currentQuestion.round === 1 ? "ROUND 1 — EASY" : "ROUND 2 — ADVANCED";

  const isNextDisabled =
    currentQuestion.type === "code"
      ? !codeAnswers[currentIndex] && !currentQuestion.starterCode
      : selectedAnswers[currentIndex] === undefined;

  return (
    <div className='min-h-screen bg-[#f8fafc] flex flex-col font-inter'>
      <Header user={null} />

      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-4xl mx-auto pt-4'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <p className='text-xs text-gray-500 font-bold tracking-widest mb-2 uppercase'>
                QUESTION {currentIndex + 1} OF {questions.length}
              </p>
              <span className='text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase'>
                {roundText}
              </span>
            </div>
            <button className='flex items-center gap-2 text-sm font-semibold border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600'>
              <FiFlag className='w-4 h-4' /> Report
            </button>
          </div>

          <h1 className='text-2xl font-bold text-[#112240] mb-8 leading-tight'>
            {currentQuestion.question}
          </h1>

          {currentQuestion.type === "code" ? (
            <div className='mb-12 space-y-4'>
              <Editor
                height='300px'
                language={currentQuestion.language || "javascript"}
                value={
                  codeAnswers[currentIndex] !== undefined
                    ? codeAnswers[currentIndex]
                    : currentQuestion.starterCode || ""
                }
                theme='vs-dark'
                onChange={(val) =>
                  setCodeAnswers((prev) => ({
                    ...prev,
                    [currentIndex]: val || "",
                  }))
                }
                options={{ minimap: { enabled: false } }}
              />

              <div className='mt-4 flex flex-wrap items-center gap-4'>
                <button
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className={`px-6 py-2 rounded-md font-semibold text-white transition ${isExecuting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isExecuting ? "Running Code Engine..." : "Run Code"}
                </button>

                {codeResults[currentIndex] && (
                  <div
                    className={`px-4 py-2 rounded flex items-center gap-2 ${codeResults[currentIndex].success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {codeResults[currentIndex].success ? (
                      <FiCheckCircle />
                    ) : (
                      <span>✕</span>
                    )}
                    <span className='font-semibold text-sm'>
                      {codeResults[currentIndex].success
                        ? "Executed Successfully"
                        : "Execution Error"}
                    </span>
                  </div>
                )}
              </div>

              {codeResults[currentIndex] && (
                <div className='mt-4 shadow-sm'>
                  <h4 className='font-bold text-sm text-gray-700 mb-2'>
                    Console Execution Output:
                  </h4>
                  <pre
                    className={`p-4 rounded-xl text-sm min-h-[3rem] whitespace-pre-wrap font-mono border ${codeResults[currentIndex].success ? "bg-green-50 text-green-900 border-green-200" : "bg-red-50 text-red-900 border-red-200"}`}
                  >
                    {codeResults[currentIndex].output}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 mb-12'>
              {Array.isArray(currentQuestion.options) &&
                currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIndex] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-4 group hover:border-[#112240] ${isSelected ? "border-[#112240] bg-blue-50/50 shadow-sm" : "border-gray-200 bg-white"}`}
                    >
                      <span
                        className={`w-8 h-8 shrink-0 rounded flex items-center justify-center font-bold text-sm ${isSelected ? "bg-[#112240] text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className='font-semibold text-[#112240]'>
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
            </div>
          )}

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
              disabled={isNextDisabled}
              className={`flex items-center gap-2 font-semibold px-6 py-2.5 rounded-md text-white transition ${isNextDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#112240] hover:bg-[#1f385c]"}`}
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
