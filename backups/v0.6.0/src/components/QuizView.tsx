import React, { useState } from 'react';
import { Virtue, VirtueId, QuizQuestion } from '../types';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Lightbulb, 
  BookOpen, 
  Star,
  Check,
  ChevronRight
} from 'lucide-react';

interface QuizViewProps {
  virtues: Virtue[];
  initialVirtueId?: VirtueId;
  onSaveQuizScore: (virtueId: VirtueId, score: number, total: number) => void;
  onGoToLesson: (virtueId: VirtueId) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  virtues,
  initialVirtueId,
  onSaveQuizScore,
  onGoToLesson,
}) => {
  const [selectedVirtueId, setSelectedVirtueId] = useState<VirtueId>(
    initialVirtueId || virtues[0].id
  );

  const currentVirtue = virtues.find((v) => v.id === selectedVirtueId) || virtues[0];
  const questions = currentVirtue.quizQuestions;

  // Answers state: questionId -> selectedOptionId
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Switch virtue resets state
  const handleSelectVirtue = (id: VirtueId) => {
    setSelectedVirtueId(id);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return; // Prevent change after submit
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Submit and calculate score
  const handleSubmitQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        score++;
      }
    });

    setIsSubmitted(true);
    onSaveQuizScore(selectedVirtueId, score, questions.length);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const answeredCount = Object.keys(userAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        score++;
      }
    });
    return score;
  };

  const currentScore = calculateScore();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 md:pb-12">
      {/* Header Banner */}
      <div 
        id="quiz-header-banner"
        className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>美德情境測驗</span>
          <span>•</span>
          <span>Mini Character Quiz</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          中學生聖經品格情境挑戰
        </h1>
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mt-0.5 mb-2">
          Real-Life Scenario Quiz for Secondary Students
        </span>
        <p className="text-sm text-slate-600 leading-relaxed">
          每個美德單元包含 3 題專門為中學校園生活設計的情境選擇題。完成後立即查看得分與聖經原則解析！
        </p>
      </div>

      {/* Virtue Tabs Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {virtues.map((v, idx) => {
          const isSelected = v.id === selectedVirtueId;
          return (
            <button
              key={v.id}
              id={`quiz-tab-${v.id}`}
              onClick={() => handleSelectVirtue(v.id)}
              className={`px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="block text-[10px] text-slate-700 font-semibold">
                Unit 0{idx + 1}
              </span>
              <span>{v.nameZh} ({v.nameEn})</span>
            </button>
          );
        })}
      </div>

      {/* Questions Form */}
      <div className="space-y-6">
        {questions.map((question, qIndex) => {
          const selectedOption = userAnswers[question.id];
          const isCorrect = selectedOption === question.correctOptionId;

          return (
            <div
              key={question.id}
              id={`quiz-card-${question.id}`}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4"
            >
              {/* Question Number & Scenario */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    第 {qIndex + 1} 題 / 共 3 題
                  </span>

                  {isSubmitted && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> 作答正確 (+1 分)
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> 作答錯誤
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Scenario */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  <span className="font-bold text-slate-900 block mb-0.5">
                    📍 校園情境 Scenario：
                  </span>
                  {question.scenarioZh}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                  {question.questionZh}
                </h3>
              </div>

              {/* Big Options Buttons */}
              <div className="space-y-2.5 pt-1">
                {question.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isThisCorrect = option.id === question.correctOptionId;

                  let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50';

                  if (!isSubmitted) {
                    if (isSelected) {
                      optionStyle = 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-500/20';
                    }
                  } else {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                    } else if (isSelected && !isThisCorrect) {
                      optionStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-medium line-through opacity-80';
                    } else {
                      optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      id={`option-btn-${question.id}-${option.id}`}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(question.id, option.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${optionStyle}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {option.label}
                      </span>
                      <span className="text-sm leading-relaxed pt-0.5 flex-1">
                        {option.textZh}
                      </span>
                      {isSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (顯示簡短解析) */}
              {isSubmitted && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>聖經原則解析 Explanation：</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {question.explanationZh}
                  </p>
                  <div className="text-xs font-semibold text-amber-800 pt-1">
                    ✨ 品格指引：{question.virtuePrincipleZh}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer: Submit or Score Card */}
      {!isSubmitted ? (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-medium text-slate-700 text-center sm:text-left">
            <span>已完成作答：</span>
            <strong className="text-indigo-600 font-bold ml-1">
              {answeredCount} / {questions.length} 題
            </strong>
            {!isAllAnswered && <span className="text-amber-600 ml-2">（請回答所有題目）</span>}
          </div>

          <button
            id="submit-quiz-btn"
            disabled={!isAllAnswered}
            onClick={handleSubmitQuiz}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAllAnswered
                ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md active:scale-98'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>提交測驗，查看成績與解析</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Score Result Card */
        <div 
          id="quiz-score-card"
          className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Quiz Result • 測驗成果
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                {currentVirtue.nameZh} 單元測驗完成！
              </h2>
              <p className="text-indigo-200 text-xs sm:text-sm mt-1">
                {currentScore === 3
                  ? '太棒了！你完全掌握了這個美德在生活中的聖經原則！'
                  : currentScore >= 2
                  ? '表現優異！透過這些題目，願神的話語指引你的日常選擇。'
                  : '不要灰心！每一次的思考都是品格深化的起點，可以閱讀上方解析重新挑戰！'}
              </p>
            </div>

            {/* Score Circle */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shrink-0">
              <span className="text-3xl sm:text-4xl font-black text-amber-400">
                {currentScore}
                <span className="text-xl font-bold text-white/70">/{questions.length}</span>
              </span>
              <span className="text-[10px] text-indigo-200 uppercase font-semibold">
                得分 Score
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-white/10">
            <button
              id="retake-quiz-btn"
              onClick={handleResetQuiz}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新作答測驗 (Retake Quiz)</span>
            </button>

            <button
              id="goto-current-lesson-btn"
              onClick={() => onGoToLesson(currentVirtue.id)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>回到「{currentVirtue.nameZh}」課程複習</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
