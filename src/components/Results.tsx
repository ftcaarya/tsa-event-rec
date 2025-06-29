'use client';

import { QuizResult } from '@/types/quiz';
import Image from 'next/image';

interface ResultsProps {
  results: QuizResult[];
  onRestart: () => void;
}

export default function Results({ results, onRestart }: ResultsProps) {
  return (
    <div className="relative max-w-4xl mx-auto p-6">
      {/* Header with translucent box */}
      <div className="relative z-10 inline-block bg-black/30 backdrop-blur-lg rounded-xl px-8 py-4 mb-8 border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-white">Your Results</h1>
      </div>
      
      <div className="space-y-6">
        {results.map((result, index) => (
          <div
            key={result.event.id}
            className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">{result.event.name}</h3>
                <p className="text-white/80 mb-4">{result.event.description}</p>
              </div>
              <div className="bg-blue-500/30 text-blue-200 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-400/30">
                {Math.round(result.matchScore * 100)}% Match
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-semibold mb-2 text-blue-200">Skills Developed</h4>
                <ul className="list-disc list-inside text-white/70">
                  {result.event.skillsDeveloped.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-blue-200">Career Paths</h4>
                <ul className="list-disc list-inside text-white/70">
                  {result.event.careerPaths.map((career) => (
                    <li key={career}>{career}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-blue-200">Related Activities</h4>
              <div className="flex flex-wrap gap-2">
                {result.event.relatedActivities.map((activity) => (
                  <span
                    key={activity}
                    className="bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/20"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center space-x-4">
        <button
          onClick={onRestart}
          className="bg-blue-600/80 hover:bg-blue-500/80 text-white px-8 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm border border-blue-400/30 shadow-lg hover:shadow-blue-500/20"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
} 