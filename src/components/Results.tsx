import { QuizResult } from '@/types/quiz';

interface ResultsProps {
  results: QuizResult[];
  onRestart: () => void;
}

export default function Results({ results, onRestart }: ResultsProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Recommended TSA Events</h2>
      
      <div className="space-y-6">
        {results.map((result, index) => (
          <div
            key={result.event.id}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{result.event.name}</h3>
                <p className="text-gray-600 mb-4">{result.event.description}</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(result.matchScore * 100)}% Match
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-semibold mb-2">Skills Developed</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {result.event.skillsDeveloped.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Career Paths</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {result.event.careerPaths.map((career) => (
                    <li key={career}>{career}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Related Activities</h4>
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
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
} 