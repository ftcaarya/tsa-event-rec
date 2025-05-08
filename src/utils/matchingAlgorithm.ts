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
    let matchScore = 0;
    const matchedCategories: QuestionCategory[] = [];

    event.requirements.categories.forEach((category) => {
      const categoryScore = averageScores.get(category) || 0;
      if (categoryScore >= event.requirements.minScore) {
        matchScore += categoryScore;
        matchedCategories.push(category);
      }
    });

    // Normalize match score
    matchScore = matchScore / event.requirements.categories.length;

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