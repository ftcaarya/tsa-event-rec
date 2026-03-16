import { QuizResult } from '@/types/quiz';

interface ResultsProps {
  results: QuizResult[];
  onRestart: () => void;
}

export default function Results({ results, onRestart }: ResultsProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-white text-center">
        Your Top Matches
      </h2>

      <div className="space-y-5">
        {results.map((result, index) => (
          <div
            key={result.event.id}
            className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-6 hover:bg-white/[0.1] transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-sm font-bold text-purple-300">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {result.event.name}
                  </h3>
                  <p className="text-sm text-white/50 mt-0.5">
                    {result.event.category}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(180,74,255,0.2))',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#c4b5fd',
                }}>
                {Math.round(result.matchScore)}%
              </div>
            </div>

            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              {result.event.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h4 className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider mb-2">
                  Skills Developed
                </h4>
                <div className="space-y-1.5">
                  {result.event.skillsDeveloped.map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider mb-2">
                  Career Paths
                </h4>
                <div className="space-y-1.5">
                  {result.event.careerPaths.map((career) => (
                    <div key={career} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                      {career}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <h4 className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider mb-2">
                Related Activities
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.event.relatedActivities.map((activity) => (
                  <span
                    key={activity}
                    className="bg-white/[0.06] text-white/60 border border-white/[0.08] px-3 py-1 rounded-full text-xs"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 rounded-xl font-medium text-white transition-all duration-200 hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #b44aff)',
          }}
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
}
