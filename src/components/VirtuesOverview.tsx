import React from 'react';
import { Virtue, VirtueId, UserProgress } from '../types';
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  ShieldAlert, 
  HeartHandshake, 
  ClipboardCheck, 
  Flame, 
  HelpCircle,
  Compass
} from 'lucide-react';

interface VirtuesOverviewProps {
  virtues: Virtue[];
  progress: UserProgress;
  onSelectVirtue: (virtueId: VirtueId) => void;
  onStartQuiz: (virtueId: VirtueId) => void;
}

export const VirtuesOverview: React.FC<VirtuesOverviewProps> = ({
  virtues,
  progress,
  onSelectVirtue,
  onStartQuiz,
}) => {
  const getVirtueIcon = (id: VirtueId) => {
    switch (id) {
      case 'courage':
        return <ShieldAlert className="w-6 h-6" />;
      case 'honesty':
        return <CheckCircle2 className="w-6 h-6" />;
      case 'compassion':
        return <HeartHandshake className="w-6 h-6" />;
      case 'responsibility':
        return <ClipboardCheck className="w-6 h-6" />;
      case 'perseverance':
        return <Flame className="w-6 h-6" />;
      default:
        return <Compass className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-200">
          <span>聖經品格課程體系</span>
          <span className="text-slate-300">•</span>
          <span>Biblical Virtue Curriculum</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          五大核心美德總覽
        </h1>
        <span className="text-sm font-bold text-slate-700 uppercase tracking-wider block mt-0.5 mb-3">
          Five Core Virtues for Secondary Students
        </span>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          VELS 專為中學生設計，透過深入淺出的聖經故事、經文默想、生活情境反思與具體實踐活動，幫助你在校園與家庭中活出堅定的信仰品格。
        </p>
      </div>

      {/* 5 Virtues Cards List */}
      <div className="space-y-4">
        {virtues.map((virtue, index) => {
          const isCompleted = progress.completedLessons.includes(virtue.id);
          const hasReflection = !!progress.reflections[virtue.id];
          const quizResult = progress.quizScores[virtue.id];

          return (
            <div
              key={virtue.id}
              id={`virtue-overview-${virtue.id}`}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Column: Number, Icon, Titles & Definitions */}
              <div className="flex items-start gap-4 sm:gap-5 flex-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
                  {getVirtueIcon(virtue.id)}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      0{index + 1}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {virtue.nameZh}
                    </h2>
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                      {virtue.nameEn}
                    </span>

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        已完成學習
                      </span>
                    )}

                    {quizResult && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                        測驗 {quizResult.score}/{quizResult.total} 分
                      </span>
                    )}
                  </div>

                  {/* Definition */}
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {virtue.shortDescZh}
                  </p>
                  <p className="text-xs text-slate-700 italic">
                    {virtue.shortDescEn}
                  </p>

                  {/* Bible Character & Verse Reference */}
                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <span className="inline-flex items-center gap-1.5 text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-1 rounded-lg">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      聖經故事：{virtue.bibleStory.titleZh}
                    </span>
                    <span className="text-slate-700 font-medium">
                      核心經文：<strong className="text-slate-700 font-bold">{virtue.bibleVerse.referenceZh}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions (Large Buttons) */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  id={`btn-open-lesson-${virtue.id}`}
                  onClick={() => onSelectVirtue(virtue.id)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-center sm:items-start leading-tight">
                    <span>開始完整課程</span>
                    <span className="text-[10px] text-indigo-200 font-normal">Start Lesson</span>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  id={`btn-open-quiz-${virtue.id}`}
                  onClick={() => onStartQuiz(virtue.id)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>3 題單元測驗 (Quiz)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
