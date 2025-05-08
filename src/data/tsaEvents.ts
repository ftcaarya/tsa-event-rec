import { TSAEvent } from '@/types/quiz';

export const tsaEvents: TSAEvent[] = [
  {
    id: 'e1',
    name: 'Structural Engineering',
    description: 'Design and build a structure that can support a specified load while meeting size and material constraints.',
    skillsDeveloped: [
      'Structural Analysis',
      'Problem Solving',
      'Teamwork',
      'Technical Drawing',
    ],
    relatedActivities: [
      'Architecture Club',
      'Engineering Competitions',
      'Bridge Building',
    ],
    careerPaths: [
      'Civil Engineer',
      'Structural Engineer',
      'Architect',
      'Construction Manager',
    ],
    category: 'Engineering',
    requirements: {
      categories: ['Engineering', 'Design'],
      minScore: 3.5,
    },
  },
  {
    id: 'e2',
    name: 'Coding Challenge',
    description: 'Solve programming problems and develop efficient algorithms under time constraints.',
    skillsDeveloped: [
      'Problem Solving',
      'Algorithm Design',
      'Programming',
      'Time Management',
    ],
    relatedActivities: [
      'Coding Club',
      'Hackathons',
      'Programming Competitions',
    ],
    careerPaths: [
      'Software Engineer',
      'Computer Scientist',
      'Data Scientist',
      'Web Developer',
    ],
    category: 'Technology',
    requirements: {
      categories: ['Programming'],
      minScore: 4.0,
    },
  },
  {
    id: 'e3',
    name: 'Digital Video Production',
    description: 'Create a short film that tells a compelling story using digital video production techniques.',
    skillsDeveloped: [
      'Storytelling',
      'Video Editing',
      'Cinematography',
      'Project Management',
    ],
    relatedActivities: [
      'Film Club',
      'Media Production',
      'Digital Arts',
    ],
    careerPaths: [
      'Film Director',
      'Video Editor',
      'Digital Media Producer',
      'Content Creator',
    ],
    category: 'Media',
    requirements: {
      categories: ['Media', 'Design'],
      minScore: 3.0,
    },
  },
]; 