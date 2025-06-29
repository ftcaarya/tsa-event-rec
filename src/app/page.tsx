'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';
import { QuizResult } from '@/types/quiz';
import { quizQuestions } from '@/data/quizQuestions';
import { improvedQuizQuestions } from '@/data/improvedQuizQuestions';
import { tsaEvents } from '@/data/tsaEvents';

type AppState = 'landing' | 'quiz' | 'results';

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [quizResults, setQuizResults] = useState<QuizResult[] | null>(null);

  const handleStartQuiz = () => {
    setCurrentState('quiz');
  };

  const handleQuizComplete = (results: QuizResult[]) => {
    setQuizResults(results);
    setCurrentState('results');
  };

  const handleRestart = () => {
    setQuizResults(null);
    setCurrentState('landing');
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case 'landing':
        return <LandingPage onStartQuiz={handleStartQuiz} />;
      case 'quiz':
        return (
          <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-8">
                <button
                  onClick={() => setCurrentState('landing')}
                  className="text-white/70 hover:text-white text-sm mb-4 transition-colors duration-200"
                >
                  ← Back to Home
                </button>
                <h1 className="text-4xl font-bold text-white mb-4">
                  TSA Event Recommender
                </h1>
                <p className="text-white/90 max-w-2xl mx-auto">
                  Answer these questions to discover TSA competitive events that match your
                  interests, skills, and career aspirations.
                </p>
              </div>
              <Quiz
                questions={improvedQuizQuestions}
                events={tsaEvents}
                onComplete={handleQuizComplete}
              />
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4">
              <Results results={quizResults!} onRestart={handleRestart} />
            </div>
          </div>
        );
      default:
        return <LandingPage onStartQuiz={handleStartQuiz} />;
    }
  };

  return <main>{renderCurrentView()}</main>;
} 