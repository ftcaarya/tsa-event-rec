import { QuizQuestion, TSAEvent, QuizResult, QuestionCategory } from '@/types/quiz';

interface QuizResponse {
  questionId: string;
  optionId: string;
}

interface CategoryScore {
  totalScore: number;
  maxPossibleScore: number;
  questionCount: number;
  normalizedScore: number;
}

export function calculateEventMatches(
  responses: QuizResponse[],
  questions: QuizQuestion[],
  events: TSAEvent[]
): QuizResult[] {
  // Step 1: Calculate category scores from user responses
  const categoryScores = new Map<QuestionCategory, CategoryScore>();

  // Initialize all categories
  const allCategories: QuestionCategory[] = [
    'Engineering', 'Design', 'Programming', 'Leadership', 
    'Media', 'Research', 'Presentation', 'Technology'
  ];
  
  allCategories.forEach(category => {
    categoryScores.set(category, {
      totalScore: 0,
      maxPossibleScore: 0,
      questionCount: 0,
      normalizedScore: 0
    });
  });

  // Process user responses
  responses.forEach((response) => {
    const question = questions.find((q) => q.id === response.questionId);
    const option = question?.options.find((o) => o.id === response.optionId);

    if (question && option) {
      const category = question.category;
      const currentData = categoryScores.get(category)!;
      
      // Simple scoring: just use the option weight (0-5)
      categoryScores.set(category, {
        totalScore: currentData.totalScore + option.weight,
        maxPossibleScore: currentData.maxPossibleScore + 5, // Max weight is always 5
        questionCount: currentData.questionCount + 1,
        normalizedScore: 0 // Will calculate later
      });
    }
  });

  // Step 2: Calculate normalized scores (0-1 range)
  categoryScores.forEach((data, category) => {
    if (data.maxPossibleScore > 0) {
      data.normalizedScore = data.totalScore / data.maxPossibleScore;
    } else {
      data.normalizedScore = 0;
    }
  });

  // Step 3: Calculate match scores for each event with better differentiation
  const results: QuizResult[] = events.map((event) => {
    let totalScore = 0;
    let categoryCount = 0;
    const matchedCategories: QuestionCategory[] = [];
    
    // Calculate weighted score based on how well user matches event requirements
    event.requirements.categories.forEach((category) => {
      const categoryData = categoryScores.get(category);
      if (categoryData && categoryData.questionCount > 0) {
        totalScore += categoryData.normalizedScore;
        categoryCount++;
        
        // Consider a category "matched" if score is above 60%
        if (categoryData.normalizedScore > 0.6) {
          matchedCategories.push(category);
        }
      }
    });

    // Calculate base match score
    let matchScore = 0;
    if (categoryCount > 0) {
      const averageScore = totalScore / categoryCount;
      
      // Apply event-specific scoring modifiers to create differentiation
      let adjustedScore = averageScore;
      
      // Bonus for having ALL required categories highly rated
      const highCategories = event.requirements.categories.filter(cat => {
        const catData = categoryScores.get(cat);
        return catData && catData.normalizedScore > 0.8;
      }).length;
      
      if (highCategories === event.requirements.categories.length) {
        adjustedScore += 0.1; // 10% bonus for excelling in all areas
      }
      
      // Slight penalty if not all categories are answered
      const answeredCategories = event.requirements.categories.filter(cat => {
        const catData = categoryScores.get(cat);
        return catData && catData.questionCount > 0;
      }).length;
      
      if (answeredCategories < event.requirements.categories.length) {
        adjustedScore -= 0.2; // 20% penalty for missing categories
      }
      
      // Add variety based on event difficulty (using minScore as a proxy)
      const difficultyFactor = event.requirements.minScore / 5.0; // 0.7-0.8 range
      adjustedScore = adjustedScore * (0.7 + difficultyFactor * 0.3); // Scale based on difficulty
      
      // Convert to percentage
      matchScore = Math.round(adjustedScore * 100);
      
      // Ensure reasonable range (25-88%)
      matchScore = Math.max(25, Math.min(88, matchScore));
    } else {
      matchScore = 25; // Minimum score
    }

    return {
      event,
      matchScore,
      matchedCategories,
    };
  });

  // Step 4: Sort and create better distribution
  const sortedResults = results
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5); // Return top 5 matches

  // Spread out the scores to create meaningful differences
  if (sortedResults.length > 1) {
    const topScore = sortedResults[0].matchScore;
    const minScore = 35;
    const scoreRange = topScore - minScore;
    
    sortedResults.forEach((result, index) => {
      if (index > 0) {
        // Create graduated scores with minimum 5% difference
        const targetScore = topScore - (index * Math.max(5, scoreRange / (sortedResults.length - 1)));
        result.matchScore = Math.max(minScore, Math.round(targetScore));
      }
    });
  }

  return sortedResults;
} 