import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'How interested are you in designing and building physical structures?',
    category: 'Engineering',
    importance: 1.2,
    options: [
      { id: 'q1a', text: 'Very interested', weight: 5 },
      { id: 'q1b', text: 'Somewhat interested', weight: 3 },
      { id: 'q1c', text: 'Neutral', weight: 1 },
      { id: 'q1d', text: 'Not interested', weight: 0 },
    ],
  },
  {
    id: 'q2',
    text: 'How comfortable are you with computer programming and coding?',
    category: 'Programming',
    importance: 1.5,
    options: [
      { id: 'q2a', text: 'Very comfortable', weight: 5 },
      { id: 'q2b', text: 'Somewhat comfortable', weight: 3 },
      { id: 'q2c', text: 'Basic knowledge', weight: 1 },
      { id: 'q2d', text: 'No experience', weight: 0 },
    ],
  },
  {
    id: 'q3',
    text: 'How important is creative design in your ideal project?',
    category: 'Design',
    importance: 1.0,
    options: [
      { id: 'q3a', text: 'Very important', weight: 5 },
      { id: 'q3b', text: 'Somewhat important', weight: 3 },
      { id: 'q3c', text: 'Not very important', weight: 1 },
      { id: 'q3d', text: 'Not important at all', weight: 0 },
    ],
  },
  {
    id: 'q4',
    text: 'How interested are you in filmmaking and digital media?',
    category: 'Media',
    importance: 1.0,
    options: [
      { id: 'q4a', text: 'Very interested', weight: 5 },
      { id: 'q4b', text: 'Somewhat interested', weight: 3 },
      { id: 'q4c', text: 'Neutral', weight: 1 },
      { id: 'q4d', text: 'Not interested', weight: 0 },
    ],
  },
  {
    id: 'q5',
    text: 'How comfortable are you with public speaking and presentations?',
    category: 'Presentation',
    importance: 1.3,
    options: [
      { id: 'q5a', text: 'Very comfortable', weight: 5 },
      { id: 'q5b', text: 'Somewhat comfortable', weight: 3 },
      { id: 'q5c', text: 'A little nervous', weight: 1 },
      { id: 'q5d', text: 'Very nervous', weight: 0 },
    ],
  },
]; 