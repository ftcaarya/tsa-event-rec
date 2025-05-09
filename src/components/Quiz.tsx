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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="w-full bg-white/20 rounded-full h-2.5">
          <div
            className="bg-blue-400 h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-white/80 mt-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-white">{currentQuestion.text}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className="w-full text-left p-4 rounded-lg border border-white/30 text-white hover:border-blue-400 hover:bg-white/20 transition-colors duration-200"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 