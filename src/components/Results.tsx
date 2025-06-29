import { QuizResult } from '@/types/quiz';
import Image from 'next/image';

interface ResultsProps {
  results: QuizResult[];
  onRestart: () => void;
}

export default function Results({ results, onRestart }: ResultsProps) {
  return (
    <div className="relative max-w-4xl mx-auto p-6">
      {/* Logo background */}
      <div className="absolute inset-0 flex justify-center items-start pointer-events-none select-none z-0">
        <Image
          src="/aktsia-logo.png"
          alt="AK TSA Logo"
          width={300}
          height={300}
          className="opacity-10 mt-2"
          style={{ objectFit: 'contain' }}
        />
      </div>
      {/* Header with grey box */}
      <div className="relative z-10 inline-block bg-gray-100 bg-opacity-80 rounded-lg px-6 py-3 mb-8 shadow">
        <h1 className="text-3xl font-bold text-gray-800">Your Results</h1>
      </div>
      
      <div className="space-y-6">
        {results.map((result, index) => (
          <div
            key={result.event.id}
            className="bg-white/90 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{result.event.name}</h3>
                <p className="text-gray-600 mb-4">{result.event.description}</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(result.matchScore * 100)}% Match
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">Skills Developed</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {result.event.skillsDeveloped.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-gray-700">Career Paths</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {result.event.careerPaths.map((career) => (
                    <li key={career}>{career}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-gray-700">Related Activities</h4>
              <div className="flex flex-wrap gap-2">
                {result.event.relatedActivities.map((activity) => (
                  <span
                    key={activity}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
} 