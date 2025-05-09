'use client';

import { useState } from 'react';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';
import { QuizResult } from '@/types/quiz';
import { quizQuestions } from '@/data/quizQuestions';
import { tsaEvents } from '@/data/tsaEvents';

export default function Home() {
  const [quizResults, setQuizResults] = useState<QuizResult[] | null>(null);

  const handleQuizComplete = (results: QuizResult[]) => {
    setQuizResults(results);
  };

  const handleRestart = () => {
    setQuizResults(null);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          TSA Event Recommender
        </h1>
        <p className="text-center text-white/90 mb-12 max-w-2xl mx-auto">
          Take this short quiz to discover TSA competitive events that match your
          interests, skills, and career aspirations.
        </p>

        {quizResults ? (
          <Results results={quizResults} onRestart={handleRestart} />
        ) : (
          <Quiz
            questions={quizQuestions}
            events={tsaEvents}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </main>
  );
} 