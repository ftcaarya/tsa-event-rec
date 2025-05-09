import { QuizQuestion, TSAEvent, QuizResult, QuestionCategory } from '@/types/quiz';

interface QuizResponse {
  questionId: string;
  optionId: string;
}

export function calculateEventMatches(
  responses: QuizResponse[],
  questions: QuizQuestion[],
  events: TSAEvent[]
): QuizResult[] {
  // Calculate category scores
  const categoryScores = new Map<QuestionCategory, number>();
  const categoryCounts = new Map<QuestionCategory, number>();
  const categoryMaxScores = new Map<QuestionCategory, number>();

  responses.forEach((response) => {
    const question = questions.find((q) => q.id === response.questionId);
    const option = question?.options.find((o) => o.id === response.optionId);

    if (question && option) {
      const currentScore = categoryScores.get(question.category) || 0;
      const currentCount = categoryCounts.get(question.category) || 0;
      const currentMaxScore = categoryMaxScores.get(question.category) || 0;
      
      // Add weighted score
      categoryScores.set(
        question.category,
        currentScore + (option.weight * question.importance)
      );
      
      // Track count of questions
      categoryCounts.set(question.category, currentCount + 1);
      
      // Track maximum possible score (5 * importance)
      categoryMaxScores.set(
        question.category,
        currentMaxScore + (5 * question.importance)
      );
    }
  });

  // Calculate normalized scores for each category (0-1 range)
  const normalizedScores = new Map<QuestionCategory, number>();
  categoryScores.forEach((score, category) => {
    const maxScore = categoryMaxScores.get(category) || 1;
    normalizedScores.set(category, score / maxScore);
  });

  // Calculate match scores for each event
  const results: QuizResult[] = events.map((event) => {
    let totalScore = 0;
    let validCategories = 0;
    const matchedCategories: QuestionCategory[] = [];

    event.requirements.categories.forEach((category) => {
      const categoryScore = normalizedScores.get(category) || 0;
      // Lower the threshold for minimum score to allow more matches
      const minScoreThreshold = (event.requirements.minScore / 5) * 0.7; // 70% of the original threshold
      
      if (categoryScore >= minScoreThreshold) {
        totalScore += categoryScore;
        validCategories++;
        matchedCategories.push(category);
      } else {
        // Add partial score even if below threshold
        totalScore += categoryScore * 0.5; // Give 50% credit for partial matches
        validCategories++;
        matchedCategories.push(category);
      }
    });

    // Calculate final match score as a percentage
    const matchScore = validCategories > 0 
      ? Math.min((totalScore / validCategories) * 100, 100) // Ensure we don't exceed 100%
      : 0;

    return {
      event,
      matchScore,
      matchedCategories,
    };
  });

  // Sort results by match score
  return results
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3); // Return top 3 matches
} 