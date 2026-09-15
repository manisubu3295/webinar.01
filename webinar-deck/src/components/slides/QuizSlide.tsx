'use client';

import { useDeckStore } from '@/lib/useDeckStore';
import { quizData } from '@/content/raw/quizData';
import { Eyebrow } from '@/components/shared/Misc';

type Question = { prompt: string; options: string[]; correct: number; explanation: string };

export function QuizSlide({ groupKey }: { groupKey: string }) {
  const quiz = (quizData as unknown as Record<string, { title: string; questions: Question[] }>)[groupKey];
  const answers = useDeckStore((s) => s.quizAnswers[groupKey] ?? {});
  const answerQuiz = useDeckStore((s) => s.answerQuiz);
  if (!quiz) return null;

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  return (
    <div className="text-pane">
      <div className="detail-content">
        <Eyebrow>MODULE CHECK</Eyebrow>
        <h2>{quiz.title}</h2>
        <div className="modal-tagline">Quick check: three questions on what this module just covered.</div>
        {quiz.questions.map((q, qi) => {
          const answered = answers[qi];
          return (
            <div className="quiz-question" key={qi}>
              <div className="quiz-prompt">
                {qi + 1}. {q.prompt}
              </div>
              {q.options.map((opt, oi) => {
                let cls = 'quiz-option';
                if (answered) {
                  cls += ' disabled';
                  if (oi === q.correct) cls += ' correct';
                  else if (oi === answered.optIdx) cls += ' incorrect';
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    className={cls}
                    disabled={!!answered}
                    onClick={() => answerQuiz(groupKey, qi, oi, oi === q.correct)}
                  >
                    {opt}
                  </button>
                );
              })}
              {answered && (
                <div className="quiz-explanation shown">
                  {answered.correct ? 'Correct. ' : 'Not quite. '}
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
        {answeredCount === quiz.questions.length && (
          <div className="quiz-score">
            Score: {correctCount} / {quiz.questions.length}
          </div>
        )}
      </div>
    </div>
  );
}
