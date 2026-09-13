import React from 'react';
import { Sparkles, ArrowRight, Bot } from 'lucide-react';
import { Virtue } from '../types';

interface HeroSectionProps {
  todayVirtue: Virtue;
  onStartTodayLesson: (virtueId: Virtue['id']) => void;
  onNavigateTab: (tab: 'virtues' | 'lesson' | 'ai-tutor' | 'quiz') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  todayVirtue,
  onStartTodayLesson,
  onNavigateTab,
}) => {
  return (
    <section 
      id="dashboard-hero-section"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/50"
    >
      {/* Decorative Golden & Purple Glows */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-16 w-64 h-64 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-3 border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>中學生聖經品格教育</span>
          <span className="text-white/40">•</span>
          <span className="text-indigo-200">Mobile-First MVP</span>
        </div>

        {/* Primary Clear Main Title as requested */}
        <div className="mb-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
            VELS Mini
          </h1>
          <p className="text-sm sm:text-base font-bold text-amber-400/95 tracking-wide mt-1.5">
            Virtue Education Learning System
          </p>
        </div>

        {/* Exact Subtitle as requested */}
        <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
          透過聖經人物的生命經歷，
          <br className="hidden sm:inline" />
          在日常生活中學習與實踐品格。
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            id="hero-start-lesson-btn"
            type="button"
            onClick={() => onStartTodayLesson(todayVirtue.id)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer group"
          >
            <span>開始今日課程</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-ai-tutor-btn"
            type="button"
            onClick={() => onNavigateTab('ai-tutor')}
            className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-98 text-white font-bold text-sm backdrop-blur-md border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4 text-amber-300" />
            <span>有煩惱？找 AI 品格助教</span>
          </button>
        </div>
      </div>
    </section>
  );
};
