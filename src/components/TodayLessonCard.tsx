import React from 'react';
import { Virtue, VirtueId } from '../types';
import { 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  Compass,
  CheckCircle2
} from 'lucide-react';

interface TodayLessonCardProps {
  virtue: Virtue;
  isCompleted?: boolean;
  onStartTodayLesson: (virtueId: VirtueId) => void;
}

export const TodayLessonCard: React.FC<TodayLessonCardProps> = ({
  virtue,
  isCompleted = false,
  onStartTodayLesson,
}) => {
  return (
    <div 
      id="today-lesson-card"
      className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden"
    >
      <div className="space-y-4">
        {/* Top Header: 今日美德：勇氣 Courage */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/90 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>今日美德：{virtue.nameZh} {virtue.nameEn}</span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>今日已完成</span>
            </span>
          ) : (
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Today's Focus
            </span>
          )}
        </div>

        {/* Virtue Character & Core Summary */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {virtue.nameZh}
              </h2>
              <span className="text-sm font-bold text-amber-600 uppercase tracking-wider">
                {virtue.nameEn}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {virtue.shortDescZh}
            </p>
          </div>
        </div>

        {/* Story Snippet & Scripture */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-2">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>焦點人物故事：{virtue.bibleStory.titleZh}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {virtue.bibleStory.summaryZh}
          </p>
          <div className="text-[11px] text-amber-800 font-semibold pt-1 border-t border-slate-200/60">
            📖 核心經文：{virtue.bibleVerse.referenceZh}「{virtue.bibleVerse.textZh}」
          </div>
        </div>
      </div>

      {/* Primary Action Button: 開始今日課程 / Start Today's Lesson */}
      <div className="pt-4 mt-2">
        <button
          id="today-lesson-primary-btn"
          type="button"
          onClick={() => onStartTodayLesson(virtue.id)}
          className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer group"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left leading-tight">
            <span className="flex items-center gap-1.5">
              <span>開始今日課程</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-[11px] text-slate-300 font-normal">
              Start Today's Lesson : {virtue.nameZh} ({virtue.nameEn})
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
