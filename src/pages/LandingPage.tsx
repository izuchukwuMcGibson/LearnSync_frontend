import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFileText,
  FiZap,
  FiTrendingUp,
  FiCode,
  FiGlobe,
  FiArrowRight,
  FiAward,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiTerminal,
  FiCheck,
  FiStar,
  FiPlay,
  FiActivity,
  FiServer,
} from "react-icons/fi";
import { motion, useScroll, useSpring } from "motion/react";

export const LandingPage = () => {
  const [selectedQuizOption, setSelectedQuizOption] = useState<number>(1);
  const [emailInput, setEmailInput] = useState<string>("");
  const [submittedEmail, setSubmittedEmail] = useState<boolean>(false);

  // Top scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubmittedEmail(true);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-white font-inter text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 origin-left z-50 pointer-events-none"
      />

      {/* Header */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-6 py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#112240] text-white flex items-center justify-center font-black text-base shadow-sm">
                  L
                </div>
                <span className="text-xl font-bold font-inter tracking-tight text-[#112240]">
                  LearnSync
                </span>
              </Link>
            </motion.div>

            {/* Navigation Pill */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
              {[
                { name: "How it Works", href: "#howitworks" },
                { name: "Features", href: "#features" },
                { name: "Interactive Demo", href: "#demo" },
                { name: "Note Engine", href: "#notes-engine" },
                { name: "Pricing", href: "#pricing" },
              ].map((item) => (
                <motion.a
                  key={item.name}
                  whileHover={{ y: -1 }}
                  href={item.href}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-950 px-3.5 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition-all font-inter"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>

              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 18px -4px rgba(17, 34, 64, 0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to="/signup"
                  className="bg-[#112240] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1b345f] transition-all font-inter inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Start Free Trial</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/50 to-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 max-w-xl"
            >
              {/* Top pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50/90 border border-blue-200/80 rounded-full mb-6"
              >
                <span className="text-blue-600 font-bold text-xs">⚡</span>
                <span className="text-[11px] font-bold text-blue-900 tracking-wider uppercase">
                  BUILT FOR CS & ENGINEERING STUDENTS • OVER 12K QUESTIONS
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-[#0b1b36] leading-[1.12] mb-5">
                Master Computer Science.
                <br />
                From raw{" "}
                <span className="text-[#2563eb]">notes to retention</span> in
                minutes.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-500 mb-8 leading-relaxed font-normal">
                Transform dense lecture slides, messy GitHub repos, and textbook
                chapters into adaptive active-recall drills and interconnected
                concept graphs.
              </p>

              {/* CTA Button Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 22px -3px rgba(17, 34, 64, 0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto bg-[#112240] text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#1a335c] transition-colors inline-flex items-center justify-center gap-2 shadow-xs group"
                  >
                    <span>Start Studying Now</span>
                    <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-slate-200 bg-white text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:border-slate-300 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <FiPlay className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                  <span>Watch 1-Min Walkthrough</span>
                </motion.button>
              </div>

              {/* Rating & Review Micro-Proof */}
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-3 border-t border-slate-200/60">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-800 text-xs">4.92</span>
                <span className="text-slate-400">•</span>
                <span>
                  Trusted by 4,500+ students across UNILAG, Covenant, UI,
                  Ashesi, UCT, Stanford & MIT
                </span>
              </div>
            </motion.div>

            {/* Right Hero Interactive Mockup (IDE Terminal) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: 25 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Outer Dark IDE Card */}
                <div className="bg-[#0d1527] rounded-2xl border border-slate-700/60 shadow-2xl p-4 sm:p-5 text-white font-mono relative overflow-hidden">
                  {/* Title Bar */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-700/60 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <span className="text-xs text-slate-300 ml-2 font-mono font-medium">
                        dijkstra_algorithm.py • Time Complexity
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-400 font-sans font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Engine
                    </span>
                  </div>

                  {/* 3 Top Stat Badges */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 font-sans">
                    <div className="bg-slate-800/80 border border-slate-700/50 p-2 sm:p-2.5 rounded-xl">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        ACCURACY
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-emerald-400">
                        94%
                      </div>
                      <div className="text-[10px] text-emerald-400/80 font-medium">
                        +18% vs avg
                      </div>
                    </div>
                    <div className="bg-slate-800/80 border border-slate-700/50 p-2 sm:p-2.5 rounded-xl">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        AVG RECALL
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-blue-400">
                        3.4 s
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        optimal response
                      </div>
                    </div>
                    <div className="bg-slate-800/80 border border-slate-700/50 p-2 sm:p-2.5 rounded-xl">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        TOPIC RANK
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-amber-400">
                        TOP 3%
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        percentile score
                      </div>
                    </div>
                  </div>

                  {/* Code Editor Body */}
                  <div className="bg-[#080d19] p-3.5 rounded-xl border border-slate-800 text-xs sm:text-sm font-mono leading-relaxed mb-4 overflow-x-auto">
                    <div className="text-slate-500">
                      # Dijkstra's shortest path algorithm
                    </div>
                    <div>
                      <span className="text-purple-400">def</span>{" "}
                      <span className="text-blue-400">dijkstra</span>(graph,
                      start):
                    </div>
                    <div className="pl-4">
                      distances = &#123;node:{" "}
                      <span className="text-amber-400">float</span>(
                      <span className="text-emerald-400">'infinity'</span>){" "}
                      <span className="text-purple-400">for</span> node{" "}
                      <span className="text-purple-400">in</span> graph&#125;
                    </div>
                    <div className="pl-4">
                      distances[start] ={" "}
                      <span className="text-cyan-400">0</span>
                    </div>
                    <div className="pl-4 text-emerald-300">
                      pq = [(<span className="text-cyan-400">0</span>, start)]{" "}
                      <span className="text-slate-500">
                        # (cost, node) min-heap
                      </span>
                    </div>
                  </div>

                  {/* Concept Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 font-sans">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[11px] font-medium">
                        #GreedyAlgorithm
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[11px] font-medium">
                        #PriorityQueue
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-medium">
                        #GraphTheory
                      </span>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                      Next Drill &rarr;
                    </button>
                  </div>
                </div>

                {/* Floating Notification Pop Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="absolute -bottom-5 sm:-bottom-6 left-4 sm:left-8 bg-white text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 shadow-xl flex items-center gap-3 cursor-default font-sans"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900">
                      Knowledge Gap Found
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Review: Bellman-Ford for negative edge weights
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* University Social Proof Banner */}
      <section className="w-full bg-white py-9 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-6">
            TRUSTED BY CS &amp; ENGINEERING STUDENTS ACROSS TOP AFRICAN &amp;
            GLOBAL INSTITUTIONS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-slate-500 font-bold text-xs sm:text-sm tracking-wider">
            {[
              { name: "UNILAG", icon: "🇳🇬" },
              { name: "COVENANT", icon: "🦅" },
              { name: "UI IBADAN", icon: "🏛️" },
              { name: "ASHESI", icon: "🇬🇭" },
              { name: "UCT", icon: "🇿🇦" },
              { name: "STANFORD CS", icon: "🌲" },
              { name: "MIT EECS", icon: "⚡" },
              { name: "UC BERKELEY", icon: "🐻" },
              { name: "CMU SCS", icon: "🎓" },
            ].map((uni) => (
              <div
                key={uni.name}
                className="flex items-center gap-2 hover:text-slate-700 transition-colors select-none cursor-pointer"
              >
                <span>{uni.icon}</span>
                <span>{uni.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How LearnSync Works (Cognitive Cycle) */}
      <section id="howitworks" className="py-16 lg:py-24 bg-[#f8fafc]/60">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-3">
              COGNITIVE CYCLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b36] tracking-tight mb-3">
              How LearnSync Transforms Your Studying
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Move beyond passive rereading. Our three-stage cognitive
              architecture turns raw course material into permanent, exam-ready
              intuition.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                icon: <FiFileText className="w-4 h-4" />,
                title: "Ingest & Code-Parse",
                desc: "Drop and parse lecture slides, LaTeX notes, GitHub repos, or textbook pages. The engine extracts data structures, mathematical proofs, and semantic dependency trees.",
                pill: "Supports PDF, MD, IPYNB, LaTeX & code",
              },
              {
                number: "02",
                icon: <FiLayers className="w-4 h-4" />,
                title: "Synthesize Concept Mapping",
                desc: "AI distills dense material into concise definitions, invariant properties, and algorithmic step-tracks. Automatically builds connected CS knowledge graphs.",
                pill: "Auto-Generated Concept Graph • Cheat Sheets",
              },
              {
                number: "03",
                icon: <FiActivity className="w-4 h-4" />,
                title: "Adaptive Spaced Recall",
                desc: "Multi-modal interactive questions, tailored to your weak-spot heuristics. The algorithm scales question difficulty to reinforce concepts until you achieve true active recall mastery.",
                pill: "Adaptive Difficulty • Exam Ready",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 16px 24px -6px rgba(17, 34, 64, 0.08)",
                  borderColor: "rgba(37, 99, 235, 0.4)",
                }}
                className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-slate-300 font-mono">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0b1b36] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="inline-block text-[10px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                    {step.pill}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineered for Deep Academic Rigor (4 Interactive Widgets) */}
      <section
        id="features"
        className="py-16 lg:py-24 bg-white border-y border-slate-100"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-2">
                ENGINEERED FOR RIGOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b36] tracking-tight mb-2">
                Engineered for Deep Subject Understanding
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-normal">
                No rigid, one-size-fits-all curricula. Every benchmark drill and
                concept breakdown is generated by AI directly from your personal
                lecture notes, slides, and code—analyzing topics in a broader
                conceptual view.
              </p>
            </div>

            <a
              href="#notes-engine"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 flex-shrink-0"
            >
              <span>Explore Note Intelligence Engine</span>
              <FiArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Card 1: Dynamic Question Generation (Left, Col-span 7) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <FiZap className="w-4 h-4 text-blue-600" />
                    <span>Algorithmic Active Recall Engine</span>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Live Preview
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0b1b36] mb-2">
                  Dynamic Question Generation
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
                  Instead of standard superficial flashcards, LearnSync creates
                  rigorous problem-solving prompts with real code execution,
                  complexity analysis, and edge-case testing.
                </p>

                {/* Embedded Interactive Quiz UI */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 font-sans mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2.5 border-b border-slate-200/70 mb-3">
                    <span className="font-semibold">
                      Question 3 of 12 • Trees / Heap
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Medium Time Priority
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-3 leading-relaxed">
                    Given a Min-Heap with 14 elements, what is the maximum
                    possible height (number of edges from root to deepest node)
                    in this tree?
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: "A", val: "3" },
                      {
                        label: "B",
                        val: "3 (floor(log₂(14)) = 3)",
                        correct: true,
                      },
                      { label: "C", val: "4" },
                      { label: "D", val: "2" },
                    ].map((opt, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedQuizOption(idx)}
                        className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          selectedQuizOption === idx
                            ? "bg-blue-50/80 border-blue-500 text-blue-900 font-bold shadow-xs"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <span>
                          <span className="text-slate-400 mr-1.5 font-bold">
                            {opt.label}.
                          </span>
                          {opt.val}
                        </span>
                        {opt.correct && selectedQuizOption === idx && (
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100">
                <span>Adaptive question dynamically generated</span>
                <span className="text-emerald-600 font-bold">
                  ⚡ 28 revision questions
                </span>
              </div>
            </motion.div>

            {/* Card 2: Code-Aware Parsing (Right, Col-span 5) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <FiCode className="w-4 h-4" />
                </div>

                <h3 className="text-lg font-bold text-[#0b1b36] mb-2">
                  Code-Aware Parsing
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 leading-relaxed">
                  Native comprehension of Python, C++, Java, Rust, and SQL.
                  Automatically detects logic flow, algorithmic invariants, and
                  function dependencies.
                </p>

                {/* Mini Code Terminal */}
                <div className="bg-[#0f172a] text-slate-200 p-3.5 rounded-xl font-mono text-xs leading-relaxed border border-slate-700/60 mb-3">
                  <div className="text-purple-400">
                    def <span className="text-blue-400">heapify</span>(arr, n,
                    i):
                  </div>
                  <div className="pl-3 text-slate-300">largest = i</div>
                  <div className="pl-3 text-slate-300">
                    l = 2 * i + 1; r = 2 * i + 2
                  </div>
                  <div className="text-emerald-400 text-[10px] pt-1">
                    # Dynamic graph analysis ✓
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100">
                <span>Supports 18+ programming languages</span>
              </div>
            </motion.div>

            {/* Card 3: Mastery Velocity Tracker (Col-span 5) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <FiTrendingUp className="w-4 h-4" />
                </div>

                <h3 className="text-lg font-bold text-[#0b1b36] mb-2">
                  Mastery Velocity Tracker
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 leading-relaxed">
                  Forecast exam preparedness accurately. See which topics
                  require urgent attention before finals.
                </p>

                {/* SVG Mini Chart */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-sans mb-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2">
                    <span>Quantitative Recall</span>
                    <span className="text-blue-600 font-bold">
                      +Effective Retention
                    </span>
                  </div>
                  <svg className="w-full h-16" viewBox="0 0 300 70">
                    {/* Background grid */}
                    <line
                      x1="0"
                      y1="60"
                      x2="300"
                      y2="60"
                      stroke="#e2e8f0"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1="0"
                      y1="30"
                      x2="300"
                      y2="30"
                      stroke="#e2e8f0"
                      strokeDasharray="3 3"
                    />
                    {/* Red line: passive fading */}
                    <path
                      d="M 10 20 Q 150 55 290 60"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    {/* Blue line: active mastery retention */}
                    <path
                      d="M 10 50 Q 100 45 180 25 T 290 12"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100">
                <span>
                  Voted top CS study tool at 40+ engineering departments
                </span>
              </div>
            </motion.div>

            {/* Card 4: Direct from Course Dashboard (Col-span 7) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <FiServer className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    AI Note &amp; Material Ingestion
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0b1b36] mb-2">
                  Direct from Your Notes, Slides &amp; Repos
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 leading-relaxed">
                  Upload your personal lecture slides, handwritten notes,
                  markdown files, or codebases. The AI understands the broader
                  subject context and converts raw notes into tailored recall
                  drills.
                </p>

                {/* Course Progress Bars */}
                <div className="space-y-2.5 font-sans mb-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>CS106B: Programming Abstractions</span>
                      <span className="text-emerald-600 font-bold">
                        84% Exam Ready
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[84%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>CS161: Design & Analysis of Algorithms</span>
                      <span className="text-blue-600 font-bold">
                        68% Active
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full w-[68%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>CS110: Principles of Computer Systems</span>
                      <span className="text-amber-600 font-bold">
                        42% Needs Review
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[42%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100">
                <span>Direct ingestion from PDFs, Slides, Repos & Notes</span>
                <span className="text-blue-600 font-bold">
                  Universal Note &amp; Material Synthesis Active &rarr;
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Passive Highlighting vs. LearnSync Adaptive Flow */}
      <section id="demo" className="py-16 lg:py-24 bg-[#f8fafc]/70">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-3">
              THE VALUE EQUATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b36] tracking-tight mb-3">
              Passive Highlighting vs. LearnSync Adaptive Flow
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Shift from low-yield 3-hour study blocks to 45 minutes of
              high-yield active cognitive retention.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left Card: Traditional Passive Studying */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-7 sm:p-8 rounded-2xl bg-white border border-rose-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Traditional Passive Studying
                  </h3>
                  <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                    Low Efficiency
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold text-base flex-shrink-0">
                      ✕
                    </span>
                    <div>
                      <strong className="text-slate-800">
                        Passive rereading:
                      </strong>{" "}
                      Reading notes repeatedly creates the illusion of
                      competence without building recall.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold text-base flex-shrink-0">
                      ✕
                    </span>
                    <div>
                      <strong className="text-slate-800">
                        Generic flashcards:
                      </strong>{" "}
                      Static Q&amp;A cards with binary answers fail to build
                      relational intuition.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold text-base flex-shrink-0">
                      ✕
                    </span>
                    <div>
                      <strong className="text-slate-800">
                        No code execution:
                      </strong>{" "}
                      Memorizing syntax from lecture slides collapses when faced
                      with actual problem-solving.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold text-base flex-shrink-0">
                      ✕
                    </span>
                    <div>
                      <strong className="text-slate-800">
                        Cram &amp; Forget:
                      </strong>{" "}
                      Retaining only 15% of material one week post-exam;
                      struggling in future prerequisite classes.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Average Study Time: 18 hrs/week</span>
                <span className="text-rose-600 font-bold">Retention: ~28%</span>
              </div>
            </motion.div>

            {/* Right Card: LearnSync Adaptive Flow */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-7 sm:p-8 rounded-2xl bg-white border-2 border-blue-600 shadow-md flex flex-col justify-between relative"
            >
              <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                Recommended
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-blue-900">
                    LearnSync Adaptive Flow
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    High Yield
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold text-base flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <strong className="text-slate-900">
                        Cognitive Active Recall:
                      </strong>{" "}
                      Interleaved retrieval testing with immediate line-by-line
                      feedback calibration.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold text-base flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <strong className="text-slate-900">
                        Dynamic Question Difficulty:
                      </strong>{" "}
                      Questions recalibrate based on your confidence and zero in
                      on weak areas.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold text-base flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <strong className="text-slate-900">
                        Contextual Knowledge Graphs:
                      </strong>{" "}
                      Ties algorithms, data structures, and theory into a
                      coherent mental framework.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold text-base flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <strong className="text-slate-900">
                        Spaced Memory Retention:
                      </strong>{" "}
                      Scientifically scheduled review cadences guarantee high
                      long-term retention.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>Average Study Time: 5.5 hrs/week</span>
                <span className="text-emerald-600 font-bold">
                  Retention: ~91%
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Note-Driven AI Knowledge Engine */}
      <section
        id="notes-engine"
        className="py-16 lg:py-20 bg-white border-b border-slate-100"
      >
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-2">
            POWERED BY AI &amp; YOUR PERSONAL NOTES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1b36] tracking-tight mb-3">
            No Rigid Curricula. Master Any Subject From Your Own Notes.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto mb-10">
            LearnSync isn't locked to predetermined institutional syllabi.
            Powered by contextual AI, it reads your personal lecture notes,
            slides, and code repositories—synthesizing concepts in a broader,
            holistic view tailored to how you study.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {[
              {
                icon: <FiTerminal className="w-5 h-5 text-blue-600" />,
                title: "Algorithms",
              },
              {
                icon: <FiDatabase className="w-5 h-5 text-emerald-600" />,
                title: "Data Systems",
              },
              {
                icon: <FiCpu className="w-5 h-5 text-indigo-600" />,
                title: "Architecture",
              },
              {
                icon: <FiLayers className="w-5 h-5 text-purple-600" />,
                title: "Operating Systems",
              },
              {
                icon: <FiGlobe className="w-5 h-5 text-amber-600" />,
                title: "Networking",
              },
              {
                icon: <FiAward className="w-5 h-5 text-rose-600" />,
                title: "AI & Machine Learning",
              },
            ].map((sub, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3, borderColor: "rgba(37, 99, 235, 0.4)" }}
                className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-center flex flex-col items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center">
                  {sub.icon}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {sub.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real CS Students. Real Top Percentiles. (Testimonials - Infinite Motion Carousel) */}
      <section className="py-16 lg:py-24 bg-[#f8fafc]/60 overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 mb-3">
              STUDENT RESULTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b36] tracking-tight mb-3">
              Real CS Students. Real Top Percentiles.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              See how computer science students crushed their exam curves and
              secured top-tier software engineering offers.
            </p>
          </motion.div>
        </div>

        {/* Infinite Marquee Track Container */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Gradient fade masks on left and right for seamless edge transitions */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#f8fafc] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#f8fafc] to-transparent z-10" />

          <style>{`
            @keyframes testimonial-marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .testimonial-marquee-track {
              display: flex;
              width: max-content;
              animation: testimonial-marquee 40s linear infinite;
            }
            .testimonial-marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="testimonial-marquee-track gap-6 px-4">
            {[
              {
                quote:
                  "Our lecturers give dense 80-page slides packed with complex theory. LearnSync ingests my raw notes and PDF handouts, understands the broader subject view, and builds active recall drills that match actual exam questions. Scored top 3% in my cohort.",
                name: "Chinedu Okafor",
                uni: "Computer Science @ University of Lagos (UNILAG)",
                avatar: "CO",
                color: "bg-emerald-600",
              },
              {
                quote:
                  "There is no rigid curriculum you're forced to follow. It simply reads my messy class notes, extracts the core algorithms, and connects everything in a broader conceptual framework. My study time cut in half while retention skyrocketed.",
                name: "Amina Bello",
                uni: "Software Engineering @ Covenant University",
                avatar: "AB",
                color: "bg-blue-600",
              },
              {
                quote:
                  "LearnSync's AI takes personal lecture notes and GitHub repos and turns them into Leitner-spaced drills. It pinpoints edge cases and tricky concepts until they become second nature.",
                name: "Kofi Mensah",
                uni: "Computer Science @ Ashesi University",
                avatar: "KM",
                color: "bg-amber-600",
              },
              {
                quote:
                  "I aced my Operating Systems final because the adaptive engine hammered my virtual memory and thread lock misunderstandings until I understood it properly.",
                name: "David Chen",
                uni: "EECS Senior @ UC Berkeley",
                avatar: "DC",
                color: "bg-purple-600",
              },
              {
                quote:
                  "The multi-modal parsing translated my 30-page lecture slides on dynamic programming into concise active drills. It's like having a 24/7 personal TA from your own notes.",
                name: "Sarah Jenkins",
                uni: "CS Junior @ Carnegie Mellon (CMU)",
                avatar: "SJ",
                color: "bg-indigo-600",
              },
              {
                quote:
                  "Algorithm questions went from memorization panic to intuitive problem solving. Dropped my raw notes in, and it synthesized an interactive practice exam that felt identical to my midterm.",
                name: "Marcus Chen",
                uni: "CS Sophomore @ Stanford University",
                avatar: "MC",
                color: "bg-rose-600",
              },
              // Duplicate items for perfectly seamless infinite continuous motion
              {
                quote:
                  "Our lecturers give dense 80-page slides packed with complex theory. LearnSync ingests my raw notes and PDF handouts, understands the broader subject view, and builds active recall drills that match actual exam questions. Scored top 3% in my cohort.",
                name: "Chinedu Okafor",
                uni: "Computer Science @ University of Lagos (UNILAG)",
                avatar: "CO",
                color: "bg-emerald-600",
              },
              {
                quote:
                  "There is no rigid curriculum you're forced to follow. It simply reads my messy class notes, extracts the core algorithms, and connects everything in a broader conceptual framework. My study time cut in half while retention skyrocketed.",
                name: "Amina Bello",
                uni: "Software Engineering @ Covenant University",
                avatar: "AB",
                color: "bg-blue-600",
              },
              {
                quote:
                  "LearnSync's AI takes personal lecture notes and GitHub repos and turns them into Leitner-spaced drills. It pinpoints edge cases and tricky concepts until they become second nature.",
                name: "Kofi Mensah",
                uni: "Computer Science @ Ashesi University",
                avatar: "KM",
                color: "bg-amber-600",
              },
              {
                quote:
                  "I aced my Operating Systems final because the adaptive engine hammered my virtual memory and thread lock misunderstandings until I understood it properly.",
                name: "David Chen",
                uni: "EECS Senior @ UC Berkeley",
                avatar: "DC",
                color: "bg-purple-600",
              },
              {
                quote:
                  "The multi-modal parsing translated my 30-page lecture slides on dynamic programming into concise active drills. It's like having a 24/7 personal TA from your own notes.",
                name: "Sarah Jenkins",
                uni: "CS Junior @ Carnegie Mellon (CMU)",
                avatar: "SJ",
                color: "bg-indigo-600",
              },
              {
                quote:
                  "Algorithm questions went from memorization panic to intuitive problem solving. Dropped my raw notes in, and it synthesized an interactive practice exam that felt identical to my midterm.",
                name: "Marcus Chen",
                uni: "CS Sophomore @ Stanford University",
                avatar: "MC",
                color: "bg-rose-600",
              },
            ].map((test, i) => (
              <div
                key={i}
                className="w-[320px] sm:w-[380px] p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between shrink-0 hover:shadow-md hover:border-blue-300 transition-all select-none"
              >
                <div>
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <FiStar
                        key={idx}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div
                    className={`w-9 h-9 rounded-full ${test.color} text-white font-bold text-xs flex items-center justify-center shadow-xs`}
                  >
                    {test.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {test.name}
                    </div>
                    <div className="text-[10px] text-slate-400">{test.uni}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive hover hint */}
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            
          </span>
        </div>
      </section>

      {/* Invest in Higher GPAs (Pricing Plans) */}
      <section
        id="pricing"
        className="py-16 lg:py-24 bg-white border-t border-slate-100"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-3">
              STUDENT FRIENDLY PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b36] tracking-tight mb-3">
              Invest in Higher GPAs and Shorter Study Hours
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Start free for your upcoming midterms and finals. Upgrade when you
              need unlimited note ingestion and advanced AI synthesis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Tier 1: Student Starter */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Student Starter
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Essential for midterm exam cramming.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-slate-900">$0</span>
                  <span className="text-xs text-slate-500">
                    / semester free
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-emerald-600" />
                    <span>3 personal note workspaces included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-emerald-600" />
                    <span>Up to 100 pages upload/course</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-emerald-600" />
                    <span>Standard active recall questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-emerald-600" />
                    <span>Community Discord access</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-bold text-center hover:border-slate-400 transition-colors block shadow-xs"
              >
                Get Started Free
              </Link>
            </motion.div>

            {/* Tier 2: Pro Scholar (Highlighted) */}
            <motion.div
              whileHover={{ y: -6 }}
              className="p-7 rounded-2xl bg-[#112240] text-white shadow-xl flex flex-col justify-between relative border-2 border-blue-500"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                Most Popular
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Pro Scholar
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  Full semester engineering dominance.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-white">$9</span>
                  <span className="text-xs text-slate-400">
                    / semester billing
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-200 mb-6">
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-blue-400" />
                    <span>Unlimited note &amp; subject workspaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-blue-400" />
                    <span>Unlimited PDF &amp; Repo Ingestion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-blue-400" />
                    <span>Adaptive Exam Simulation Mode</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-blue-400" />
                    <span>Interactive Code Execution Drills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-blue-400" />
                    <span>Priority email &amp; Discord response</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full py-2.5 rounded-xl bg-white text-[#112240] text-xs font-bold text-center hover:bg-blue-50 transition-colors block shadow-md"
              >
                Start 7-Day Free Trial
              </Link>
            </motion.div>

            {/* Tier 3: Lab & Study Group */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Lab &amp; Study Group
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  For project groups &amp; study teams.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-slate-900">
                    $19
                  </span>
                  <span className="text-xs text-slate-500">
                    / student / semester
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-emerald-600" />
                    <span>All Pro Scholar features included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-emerald-600" />
                    <span>Shared course workspaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-emerald-600" />
                    <span>Collaborative study rooms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-emerald-600" />
                    <span>Cohort diagnostic reports</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-bold text-center hover:border-slate-400 transition-colors block shadow-xs"
              >
                Upgrade to Study Group
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Call to Action (Dark Navy) */}
      <section className="bg-[#070d1e] text-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-900/40 px-3 py-1 rounded-full border border-blue-700/50 mb-4">
            START STUDYING SMARTER
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Stop Rereading. Start Mastering CS Concepts Today.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Upload your lecture slides now and generate your first adaptive
            active-recall drill in under 60 seconds.
          </p>

          {/* Email input form */}
          <form
            onSubmit={handleEmailSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 mb-4"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your student/university email..."
              className="bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-500 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 flex-1"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors whitespace-nowrap shadow-xs"
            >
              {submittedEmail ? "Invite Sent! ✓" : "Get Started Free"}
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
            <span>• 7-day free trial</span>
            <span>• No credit card required</span>
            <span>• Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-14 pb-10 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#112240] text-white flex items-center justify-center font-bold text-sm">
                  L
                </div>
                <span className="text-lg font-bold font-inter text-[#112240]">
                  LearnSync
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mb-3">
                Adaptive computer science learning designed for the next
                generation of software engineers. Academic excellence through
                cognitive science.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>All systems operational • v2.4</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
                Note Intelligence
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
                <li>
                  <a
                    href="#notes-engine"
                    className="hover:text-slate-900 transition-colors"
                  >
                    AI Note Parsing
                  </a>
                </li>
                <li>
                  <a
                    href="#notes-engine"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Broad Subject Synthesis
                  </a>
                </li>
                <li>
                  <a
                    href="#notes-engine"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Multi-Format Slides &amp; PDF
                  </a>
                </li>
                <li>
                  <a
                    href="#notes-engine"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Codebase AST Traversal
                  </a>
                </li>
                <li>
                  <a
                    href="#notes-engine"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Concept Dependency Graphs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
                Platform
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Active Recall Engine
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Code Parser
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Exam Readiness Model
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Student Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Campus LMS Sync
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
                Community &amp; About
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Academic Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Cognitive Science Research
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Student Discord Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Privacy &amp; FERPA Compliance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
            <p>
              © 2026 LearnSync Adaptive Learning Technologies Inc. Calibrated
              for modern computing academia.
            </p>
            <div className="flex gap-4 mt-3 sm:mt-0">
              <a href="#" className="hover:text-slate-600 transition-colors">
                Security
              </a>
              <a href="#" className="hover:text-slate-600 transition-colors">
                Status
              </a>
              <a href="#" className="hover:text-slate-600 transition-colors">
                Terms &amp; Student Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
