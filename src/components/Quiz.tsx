import { useState } from 'react';
import { QuizQuestion, QuizResult, TSAEvent } from '@/types/quiz';
import { calculateEventMatches } from '@/utils/matchingAlgorithm';

interface QuizProps {
  questions: QuizQuestion[];
  events: TSAEvent[];
  onComplete: (results: QuizResult[]) => void;
}

export default function Quiz({ questions, events, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ questionId: string; optionId: string }[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    const newResponses = [...responses];
    const existingResponseIndex = newResponses.findIndex(
      (r) => r.questionId === currentQuestion.id
    );

    if (existingResponseIndex >= 0) {
      newResponses[existingResponseIndex].optionId = optionId;
    } else {
      newResponses.push({
        questionId: currentQuestion.id,
        optionId,
      });
    }

    setResponses(newResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const results = calculateEventMatches(newResponses, questions, events);
      onComplete(results);
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/50 font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-white/50 font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #7c3aed, #b44aff)',
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-8">
        <p className="text-sm font-medium text-purple-300/80 mb-2 uppercase tracking-wider">
          {currentQuestion.category}
        </p>
        <h2 className="text-xl font-semibold text-white mb-8 leading-relaxed">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className="w-full text-left px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/90 hover:bg-white/[0.1] hover:border-purple-400/40 transition-all duration-200 group"
            >
              <span className="group-hover:text-white transition-colors">
                {option.text}
              </span>
            </button>
          ))}
        </div>

        {/* Back button */}
        {currentQuestionIndex > 0 && (
          <button
            onClick={handleGoBack}
            className="mt-6 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            &larr; Previous question
          </button>
        )}
      </div>
    </div>
  );
}
