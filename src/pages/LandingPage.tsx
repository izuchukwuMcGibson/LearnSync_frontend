import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFileText,
  FiBookOpen,
  FiCheckSquare,
  FiZap,
  FiTarget,
  FiPaperclip,
  FiTrendingUp,
  FiCode,
  FiClock,
  FiCheckCircle,
  FiChevronDown,
  FiEye,
  FiGlobe,
  FiShare2,
  FiAtSign,
} from "react-icons/fi";

import heroImage from "../images/pc-image.png";
import chartOne from "../images/chart-1.png";

export const LandingPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  return (
    <main className='min-h-screen w-full bg-white font-inter text-gray-900'>
      {/* Header */}
      <header className='w-full border-b border-gray-100 bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='text-xl font-bold font-inter text-gray-900 tracking-tight'>
              LearnSync
            </div>
            <nav className='hidden md:flex items-center gap-8'>
              {["Features", "How it Works", "Curriculum", "Pricing"].map(
                (item) => (
                  <a
                    key={item}
                    href={"#" + item.replace(/\s+/g, "").toLowerCase()}
                    className='text-sm font-medium text-gray-500 hover:text-gray-900 transition font-inter'
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>
            <div className='flex items-center gap-6'>
              <Link
                to='/login'
                className='hidden sm:inline text-sm font-medium text-gray-500 hover:text-gray-900 font-inter'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='bg-[#2b4c7e] text-white px-5 py-2 rounded text-sm font-medium hover:bg-[#1f385c] transition font-inter inline-block'
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='w-full bg-[#f8fafc] py-20 lg:py-32'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='max-w-xl'>
              <h1 className='text-5xl md:text-[3.5rem] font-bold leading-tight text-[#112240] mb-6 tracking-tight'>
                Study Smarter.
                <br />
                Master Faster.
              </h1>

              <p className='text-[1.05rem] text-gray-500 mb-10 leading-[1.7]'>
                Transform your messy notes into structured summaries and
                adaptive quizzes. LearnSync uses cognitive science principles to
                help you achieve deep mastery in record time.
              </p>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  to='/signup'
                  className='bg-[#2b4c7e] text-white px-8 py-3.5 rounded font-semibold hover:bg-[#1f385c] transition inline-flex items-center justify-center'
                >
                  Get Started Free
                </Link>
                <button className='border border-gray-300 text-gray-700 px-8 py-3.5 rounded font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2'>
                  <FiEye className='w-5 h-5 text-gray-400' />
                  See How It Works
                </button>
              </div>

              <div className='mt-6 sm:max-w-[420px] flex justify-center'>
                <span className='inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/80 text-[#2b4c7e] text-xs font-bold uppercase tracking-wider rounded-full border border-blue-100 shadow-sm'>
                  <FiCode className='w-4 h-4' />
                  Built for CS students
                </span>
              </div>
            </div>

            <div className='relative lg:block hidden'>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 w-[90%] h-[115%] bg-[#364b59] rounded-2xl -rotate-3 blur-[2px] opacity-90'></div>
              <img
                src={heroImage}
                alt='LearnSync Dashboard'
                className='relative z-10 w-full drop-shadow-2xl'
                style={{ transform: "rotate(3deg) scale(1.05)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Disciplines Banner */}
      <section className='w-full bg-[#f8fafc] py-8 border-y border-gray-100'>
        <div className='mx-auto max-w-7xl px-6 text-center'>
          <p className='text-[0.65rem] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6'>
            Master Core CS Disciplines
          </p>
          <div className='flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400 font-medium text-[0.95rem]'>
            <span className='hover:text-gray-700 cursor-pointer'>
              Data Structures
            </span>
            <span className='hover:text-gray-700 cursor-pointer'>
              Algorithms
            </span>
            <span className='hover:text-gray-700 cursor-pointer'>OOP</span>
            <span className='hover:text-gray-700 cursor-pointer'>
              Databases
            </span>
            <span className='hover:text-gray-700 cursor-pointer'>
              Networking
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id='howitworks' className='py-28 bg-white'>
        <div className='mx-auto max-w-7xl px-6'>
          <h2 className='text-3xl font-bold text-[#112240] text-center mb-20'>
            How LearnSync Works
          </h2>

          <div className='grid md:grid-cols-3 gap-12 text-center'>
            {[
              {
                icon: <FiFileText className='w-6 h-6' />,
                title: "Upload Your Notes",
                desc: "Import PDFs, markdown files, or raw text. Our engine parses the structure and identifies key CS concepts.",
              },
              {
                icon: <FiBookOpen className='w-6 h-6' />,
                title: "Read and Understand",
                desc: "Engage with AI-enhanced summaries that link complex topics together and provide contextual definitions.",
              },
              {
                icon: <FiCheckSquare className='w-6 h-6' />,
                title: "Quiz and Master",
                desc: "Verify your knowledge with adaptive quizzes that target your weak points and reinforce memory retention.",
              },
            ].map((feature, i) => (
              <div key={i} className='flex flex-col items-center px-4'>
                <div className='w-14 h-14 bg-[#f1f5f9] rounded-xl flex items-center justify-center text-[#2b4c7e] mb-6'>
                  {feature.icon}
                </div>
                <h3 className='text-lg font-bold text-[#112240] mb-3'>
                  {feature.title}
                </h3>
                <p className='text-sm text-gray-500 leading-relaxed'>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id='features' className='pb-28 bg-white'>
        <div className='mx-auto max-w-7xl px-6'>
          <h2 className='text-3xl font-bold text-[#112240] text-center mb-16'>
            Engineered for Academic Rigor
          </h2>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {[
              {
                icon: <FiZap className='w-4 h-4' />,
                title: "Adaptive Quizzes",
                desc: "Personalized question sets that evolve based on your performance, ensuring you never waste time on what you already know.",
              },
              {
                icon: <FiTarget className='w-4 h-4' />,
                title: "AI Summaries",
                desc: "Condense long lectures into concise, structured summaries focused on high-yield information and core principles.",
              },
              {
                icon: <FiPaperclip className='w-4 h-4' />,
                title: "Key Point Extraction",
                desc: "Automatically identify definitions, theorems, and formulas. No more manual highlighting or repetitive transcribing.",
              },
              {
                icon: <FiTrendingUp className='w-4 h-4' />,
                title: "Mastery Tracking",
                desc: "Visual progress indicators and circular mastery gauges provide clear insights into your learning curve across modules.",
              },
              {
                icon: <FiCode className='w-4 h-4' />,
                title: "CS Focused",
                desc: "Tailored for computing students with first-class support for code blocks, logic flows, and technical documentation.",
              },
              {
                icon: <FiClock className='w-4 h-4' />,
                title: "Progress at Your Pace",
                desc: "Flexible learning pathways allow you to dive deep or skim through based on your current knowledge and exam schedule.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className='bg-white p-8 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-md transition'
              >
                <div className='text-[#3b82f6] mb-4'>{feature.icon}</div>
                <h3 className='text-base font-bold text-[#112240] mb-2'>
                  {feature.title}
                </h3>
                <p className='text-[0.85rem] text-gray-500 leading-relaxed'>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className='bg-[#2b4c7e] py-24 w-full'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div className='text-white pr-4'>
              <h2 className='text-3xl md:text-[2.5rem] font-bold mb-6 leading-tight'>
                See LearnSync in Action
              </h2>
              <p className='text-[#a5b4fc]/80 mb-10 text-sm leading-relaxed max-w-md'>
                Our intelligent testing engine doesn't just ask questions; it
                builds intuition. Experience the seamless transition from
                learning concepts to proving mastery through our world-class
                assessment interface.
              </p>

              <ul className='space-y-4'>
                {[
                  "Real-time feedback on every answer",
                  "Detailed explanations for missed concepts",
                  "Performance analytics dashboard",
                ].map((item, i) => (
                  <li
                    key={i}
                    className='flex items-center gap-3 text-xs font-semibold tracking-wide'
                  >
                    <FiCheckCircle className='w-4 h-4 text-blue-300 flex-shrink-0' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='relative h-[400px] w-full flex items-center justify-end'>
              <div className='bg-white rounded-xl shadow-2xl p-2 w-[80%] absolute right-0 top-0 z-10'>
                <img
                  src={chartOne}
                  alt='Dashboard mockup'
                  className='rounded-lg border border-gray-100 w-full object-cover'
                />
              </div>
              <div className='bg-white rounded-xl shadow-2xl p-2 w-[65%] absolute left-0 bottom-0 z-20 border border-gray-100'>
                <img
                  src={heroImage}
                  alt='App mockup'
                  className='rounded-lg w-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='py-28 bg-white'>
        <div className='mx-auto max-w-3xl px-6'>
          <h2 className='text-2xl font-bold text-[#112240] text-center mb-12'>
            Frequently Asked Questions
          </h2>

          <div className='space-y-4'>
            {[
              {
                q: "Can I upload source code files directly?",
                a: "Yes, LearnSync supports common source code formats. It will analyze your code logic and comments to generate relevant explanation cards and test cases for your learning.",
              },
              {
                q: "How does adaptive learning work?",
                a: "Our engine tracks your correct and incorrect answers, adjusting the difficulty and frequency of questions to focus on your weakest areas.",
              },
              {
                q: "Is there a collaborative study mode?",
                a: "Currently we focus on individual mastery, but collaborative features are on our roadmap for next semester.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className='border border-gray-200 rounded-lg overflow-hidden'
              >
                <button
                  className='w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition'
                  onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                >
                  <span className='font-medium text-sm text-[#112240]'>
                    {faq.q}
                  </span>
                  <FiChevronDown
                    className={
                      "w-4 h-4 text-gray-400 transition-transform " +
                      (expandedFAQ === i ? "rotate-180" : "")
                    }
                  />
                </button>
                {expandedFAQ === i && (
                  <div className='px-6 pb-5 pt-0 bg-white text-gray-500 text-[0.8rem] leading-relaxed'>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-[#2b4c7e] py-28'>
        <div className='mx-auto max-w-3xl px-6 text-center'>
          <h2 className='text-3xl md:text-[2.5rem] font-bold text-white mb-6 leading-tight'>
            Ready to Stop Rereading and Start Mastering?
          </h2>
          <p className='text-[#a5b4fc]/90 text-sm max-w-xl mx-auto mb-10 leading-relaxed font-light'>
            Join thousands of CS students who are accelerating their learning
            with LearnSync. Start your first module today.
          </p>
          <Link
            to='/signup'
            className='bg-white text-[#2b4c7e] px-8 py-3.5 rounded font-bold hover:bg-blue-50 transition text-sm inline-block'
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-white pt-16 pb-8 border-t border-gray-100'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-8 mb-16'>
            <div className='col-span-2'>
              <div className='text-sm font-bold font-inter text-gray-900 mb-4'>
                LearnSync
              </div>
              <p className='text-[0.7rem] text-gray-400 leading-[1.8] max-w-[200px]'>
                Adaptive learning platforms designed for the next generation of
                computer scientists. Academic excellence through cognitive
                science.
              </p>
            </div>

            <div>
              <h4 className='font-bold text-[0.65rem] uppercase tracking-widest text-[#112240] mb-6'>
                Product
              </h4>
              <ul className='space-y-4 text-[0.75rem] text-gray-400 font-medium'>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Curriculum
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Features
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-bold text-[0.65rem] uppercase tracking-widest text-[#112240] mb-6'>
                Company
              </h4>
              <ul className='space-y-4 text-[0.75rem] text-gray-400 font-medium'>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Careers
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-bold text-[0.65rem] uppercase tracking-widest text-[#112240] mb-6'>
                Support
              </h4>
              <ul className='space-y-4 text-[0.75rem] text-gray-400 font-medium'>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Community
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-gray-900'>
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100 text-[0.65rem] text-gray-400 font-medium'>
            <p>
              © 2024 LearnSync Adaptive Learning. Academic Excellence in
              Computing.
            </p>
            <div className='flex gap-4 mt-4 md:mt-0'>
              <FiGlobe className='w-3.5 h-3.5 cursor-pointer hover:text-gray-600' />
              <FiShare2 className='w-3.5 h-3.5 cursor-pointer hover:text-gray-600' />
              <FiAtSign className='w-3.5 h-3.5 cursor-pointer hover:text-gray-600' />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
