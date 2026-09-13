import React from 'react';
import { Virtue, UserProgress } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  ScrollText, 
  PenTool, 
  HelpCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface TodayProgressCardProps {
  virtue: Virtue;
  progress: UserProgress;
  onGoToStory: () => void;
  onGoToVerse: () => void;
  onGoToReflection: () => void;
  onGoToQuiz: () => void;
}

export const TodayProgressCard: React.FC<TodayProgressCardProps> = ({
  virtue,
  progress,
  onGoToStory,
  onGoToVerse,
  onGoToReflection,
  onGoToQuiz,
}) => {
  // Determine completion state for the 4 core steps
  const isStoryDone = progress.todayProgress?.storyRead ?? true;
  const isVerseDone = progress.todayProgress?.verseRead ?? true;
  const isReflectionDone = Boolean(progress.reflections[virtue.id]?.trim());
  const isQuizDone = Boolean(progress.quizScores[virtue.id]);

  const steps = [
    {
      id: 'story',
      titleEn: 'Bible Story',
      titleZh: '聖經故事',
      desc: virtue.bibleStory.titleZh,
      isCompleted: isStoryDone,
      icon: <BookOpen className="w-4 h-4" />,
      onClick: onGoToStory,
    },
    {
      id: 'verse',
      titleEn: 'Bible Verse',
      titleZh: '核心金句',
      desc: virtue.bibleVerse.referenceZh,
      isCompleted: isVerseDone,
      icon: <ScrollText className="w-4 h-4" />,
      onClick: onGoToVerse,
    },
    {
      id: 'reflection',
      titleEn: 'Reflection',
      titleZh: '深思時間',
      desc: isReflectionDone ? '已完成心得筆記' : '寫下今日品格反思',
      isCompleted: isReflectionDone,
      icon: <PenTool className="w-4 h-4" />,
      onClick: onGoToReflection,
    },
    {
      id: 'quiz',
      titleEn: 'Mini Quiz',
      titleZh: '情境測驗',
      desc: isQuizDone ? `測驗已完成 (${progress.quizScores[virtue.id].score}/3分)` : '完成 3 題校園情境挑戰',
      isCompleted: isQuizDone,
      icon: <HelpCircle className="w-4 h-4" />,
      onClick: onGoToQuiz,
    },
  ];

  const completedCount = steps.filter((s) => s.isCompleted).length;
  const percent = Math.round((completedCount / steps.length) * 100);

  return (
    <div 
      id="today-progress-card"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4"
    >
      {/* Header with Title & Percentage */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
              今日學習進度
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">
            Today's Learning Progress
          </span>
        </div>

        <div className="flex items-baseline gap-1 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-xl text-indigo-700">
          <span className="text-lg font-black">{completedCount}</span>
          <span className="text-xs font-bold text-indigo-500">/ 4 步</span>
          <span className="text-xs font-extrabold text-indigo-600 ml-1">({percent}%)</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-slate-100 rounded-full h-3 p-0.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 via-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 font-medium px-0.5">
          <span>起始</span>
          <span>今日目標：活出「{virtue.nameZh}」</span>
          <span>{percent === 100 ? '🎉 今日大功告成！' : '進行中'}</span>
        </div>
      </div>

      {/* 4 Steps Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {steps.map((step) => {
          return (
            <button
              key={step.id}
              id={`today-step-${step.id}`}
              type="button"
              onClick={step.onClick}
              className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer group ${
                step.isCompleted
                  ? 'bg-emerald-50/50 border-emerald-200/80 hover:bg-emerald-50'
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-indigo-50/50 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    step.isCompleted
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-white text-slate-600 border border-slate-200 group-hover:text-indigo-600'
                  }`}
                >
                  {step.icon}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 leading-tight">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                      {step.titleZh}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      {step.titleEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5 max-w-[180px] xs:max-w-[220px]">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1">
                {step.isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>已完成</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-white border border-indigo-200 px-2 py-0.5 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <span>開始</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
