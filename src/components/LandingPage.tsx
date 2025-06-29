'use client';

import React from 'react';

interface LandingPageProps {
  onStartQuiz: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main Hero Section with all content */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            TSA Event Recommender
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
            With over 40 competitive events, our quiz helps you find the perfect match based on your interests, skills, and career aspirations. Without having to ask your friends which events to do!
          </p>
          
          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-base font-semibold text-blue-200 mb-2">Personalized Matching</h3>
              <p className="text-white/70 text-xs">Advanced algorithm matches you with events based on your unique profile</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-base font-semibold text-blue-200 mb-2">Career Guidance</h3>
              <p className="text-white/70 text-xs">Connect your interests to real-world career opportunities</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="text-base font-semibold text-blue-200 mb-2">Quick & Easy</h3>
              <p className="text-white/70 text-xs">Get personalized recommendations in just a few minutes</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6 pb-4 border-b border-white/20">
            <h3 className="text-base font-semibold text-blue-200 mb-3">Built With</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Canvas API'].map((tech) => (
                <span
                  key={tech}
                  className="bg-white/20 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6 pb-4 border-b border-white/20">
            <h3 className="text-base font-semibold text-blue-200 mb-3">Built By</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['Aarya Raut', 'Anirvin Potaraju'].map((tech) => (
                <span
                  key={tech}
                  className="bg-white/20 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-lg font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 border border-blue-400/30"
          >
            Take the Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
