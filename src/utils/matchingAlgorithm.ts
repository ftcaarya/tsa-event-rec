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

  responses.forEach((response) => {
    const question = questions.find((q) => q.id === response.questionId);
    const option = question?.options.find((o) => o.id === response.optionId);

    if (question && option) {
      const currentScore = categoryScores.get(question.category) || 0;
      const currentCount = categoryCounts.get(question.category) || 0;
      
      categoryScores.set(
        question.category,
        currentScore + (option.weight * question.importance)
      );
      categoryCounts.set(question.category, currentCount + 1);
    }
  });

  // Calculate average scores for each category
  const averageScores = new Map<QuestionCategory, number>();
  categoryScores.forEach((score, category) => {
    const count = categoryCounts.get(category) || 1;
    averageScores.set(category, score / count);
  });

  // Calculate match scores for each event
  const results: QuizResult[] = events.map((event) => {
    let totalScore = 0;
    let validCategories = 0;
    const matchedCategories: QuestionCategory[] = [];

    event.requirements.categories.forEach((category) => {
      const categoryScore = averageScores.get(category) || 0;
      if (categoryScore >= event.requirements.minScore) {
        totalScore += categoryScore;
        validCategories++;
        matchedCategories.push(category);
      }
    });

    // Calculate match score as a percentage (0-100)
    // Each category score is out of 5, so we divide by 5 to get a 0-1 range
    // Then multiply by 100 to get a percentage
    const matchScore = validCategories > 0 
      ? (totalScore / (validCategories * 5)) * 100
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