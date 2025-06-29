'use client';

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
        <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
          <div
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/50"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-white/80 mt-3 font-medium">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-white">{currentQuestion.text}</h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className="w-full text-left p-4 rounded-lg border border-white/20 bg-white/10 text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-blue-500/20"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 