'use client';

import { useState } from 'react';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';
import { QuizResult } from '@/types/quiz';
import { quizQuestions } from '@/data/quizQuestions';
import { tsaEvents } from '@/data/tsaEvents';
import GradientText from '@/components/GradientText';

export default function Home() {
  const [quizResults, setQuizResults] = useState<QuizResult[] | null>(null);

  const handleQuizComplete = (results: QuizResult[]) => {
    setQuizResults(results);
  };

  const handleRestart = () => {
    setQuizResults(null);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <GradientText
            className="text-5xl font-bold"
            colors={['#b44aff', '#7c3aed', '#3b82f6', '#7c3aed', '#b44aff']}
            animationSpeed={6}
          >
            TSA Event Recommender
          </GradientText>
          <p className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
            Discover the TSA competitive events that match your interests,
            skills, and career goals.
          </p>
        </div>

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
    </div>
  );
}
