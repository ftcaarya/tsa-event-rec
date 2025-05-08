export interface QuizQuestion {
  id: string;
  text: string;
  category: QuestionCategory;
  importance: number;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  weight: number;
}

export interface TSAEvent {
  id: string;
  name: string;
  description: string;
  skillsDeveloped: string[];
  relatedActivities: string[];
  careerPaths: string[];
  category: EventCategory;
  requirements: {
    categories: QuestionCategory[];
    minScore: number;
  };
}

export type QuestionCategory =
  | 'Engineering'
  | 'Design'
  | 'Programming'
  | 'Leadership'
  | 'Media'
  | 'Research'
  | 'Presentation';

export type EventCategory =
  | 'Technology'
  | 'Engineering'
  | 'Design'
  | 'Leadership'
  | 'Media'
  | 'Research'
  | 'Presentation';

export interface QuizResult {
  event: TSAEvent;
  matchScore: number;
  matchedCategories: QuestionCategory[];
} 