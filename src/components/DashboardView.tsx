import React, { useState } from 'react';
import { Virtue, VirtueId, UserProgress } from '../types';
import { DAILY_VERSE } from '../data/virtuesData';
import { HeroSection } from './HeroSection';
import { LearningStreakCard } from './LearningStreakCard';
import { TodayProgressCard } from './TodayProgressCard';
import { TodayLessonCard } from './TodayLessonCard';
import { AITutorCard } from './AITutorCard';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Volume2, 
  Share2, 
  CheckCircle2, 
  Award, 
  Compass,
  HelpCircle,
  Flame
} from 'lucide-react';

interface DashboardViewProps {
  virtues: Virtue[];
  progress: UserProgress;
  onStartTodayLesson: (virtueId: VirtueId) => void;
  onSelectVirtue: (virtueId: VirtueId) => void;
  onNavigateTab: (tab: 'virtues' | 'lesson' | 'ai-tutor' | 'quiz') => void;
  onAskAITutorQuestion: (question: string) => void;
  onGoToLessonStep: (virtueId: VirtueId, step: 'story' | 'verse' | 'reflection' | 'quiz') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  virtues,
  progress,
  onStartTodayLesson,
  onSelectVirtue,
  onNavigateTab,
  onAskAITutorQuestion,
  onGoToLessonStep,
}) => {
  // Today's virtue (Courage as default highlight for the day)
  const todayVirtue = virtues[0];
  const [verseCopied, setVerseCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Speech synthesis for Bible Verse
  const handleReadVerse = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `${DAILY_VERSE.referenceZh}。${DAILY_VERSE.textZh}`
      );
      utterance.lang = 'zh-TW';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopyVerse = () => {
    const textToCopy = `【今日金句】${DAILY_VERSE.referenceZh}\n${DAILY_VERSE.textZh}\n\n${DAILY_VERSE.referenceEn}\n${DAILY_VERSE.textEn}`;
    navigator.clipboard.writeText(textToCopy);
    setVerseCopied(true);
    setTimeout(() => setVerseCopied(false), 2000);
  };

  const completedCount = progress.completedLessons.length;
  const isCourageCompleted = progress.completedLessons.includes('courage');

  return (
    <div className="space-y-6 pb-28 md:pb-12">
      {/* 1. Hero Section (Purple & Gold, clear VELS Mini title & subtitle) */}
      <HeroSection
        todayVirtue={todayVirtue}
        onStartTodayLesson={onStartTodayLesson}
        onNavigateTab={onNavigateTab}
      />

      {/* 2. Top Statistics & Today's Progress Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Learning Momentum Card: 🔥 連續學習 3 天 / 本週完成 4 課 */}
        <div className="lg:col-span-6">
          <LearningStreakCard
            streakDays={progress.streakDays}
            weeklyCompletedCount={progress.weeklyCompletedCount ?? 4}
          />
        </div>

        {/* Today's Learning Progress Card: Bible Story, Bible Verse, Reflection, Mini Quiz */}
        <div className="lg:col-span-6">
          <TodayProgressCard
            virtue={todayVirtue}
            progress={progress}
            onGoToStory={() => onGoToLessonStep(todayVirtue.id, 'story')}
            onGoToVerse={() => onGoToLessonStep(todayVirtue.id, 'verse')}
            onGoToReflection={() => onGoToLessonStep(todayVirtue.id, 'reflection')}
            onGoToQuiz={() => onGoToLessonStep(todayVirtue.id, 'quiz')}
          />
        </div>
      </div>

      {/* 3. Today's Lesson Card & Today's Scripture Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Today's Lesson: 開始今日課程 / 今日美德：勇氣 Courage */}
        <div className="lg:col-span-6 flex">
          <TodayLessonCard
            virtue={todayVirtue}
            isCompleted={isCourageCompleted}
            onStartTodayLesson={onStartTodayLesson}
          />
        </div>

        {/* Today's Scripture Card (今日經文) */}
        <div 
          id="today-bible-verse-card"
          className="lg:col-span-6 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 rounded-3xl p-6 border border-amber-200/80 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>今日 Bible Verse</span>
                <span className="text-indigo-700 font-normal">Daily Scripture</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  id="verse-read-btn"
                  type="button"
                  onClick={handleReadVerse}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'text-slate-600 hover:bg-amber-100 hover:text-amber-800'
                  }`}
                  title="朗讀經文"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  id="verse-copy-btn"
                  type="button"
                  onClick={handleCopyVerse}
                  className="p-2 rounded-xl text-slate-600 hover:bg-amber-100 hover:text-amber-800 transition-all relative cursor-pointer"
                  title="複製分享經文"
                >
                  <Share2 className="w-4 h-4" />
                  {verseCopied && (
                    <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      已複製
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Scripture Quote */}
            <div className="space-y-3">
              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  「{DAILY_VERSE.textZh}」
                </p>
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wide block mt-1">
                  — {DAILY_VERSE.referenceZh}
                </span>
              </div>

              <div className="pl-5 text-xs text-slate-600 italic leading-relaxed border-l border-amber-200">
                <p>"{DAILY_VERSE.textEn}"</p>
                <span className="font-semibold text-slate-500 not-italic block mt-0.5">
                  — {DAILY_VERSE.referenceEn}
                </span>
              </div>

              <div className="bg-white/80 rounded-2xl p-3 border border-amber-100 mt-2 text-xs text-slate-700">
                <span className="font-bold text-amber-900 block mb-0.5">💡 每日品格小叮嚀：</span>
                {DAILY_VERSE.reflectionShortZh}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-amber-100 text-xs text-slate-500">
            <span>每天一節聖經金句，滋養青少年心靈品格</span>
            <span className="font-bold text-indigo-600">中英雙語對照</span>
          </div>
        </div>
      </div>

      {/* 4. AI Tutor Feature Card: 有煩惱？找 AI 品格助教 (ASK AI TUTOR) with 3 quick questions */}
      <AITutorCard
        onSelectQuestion={(question) => onAskAITutorQuestion(question)}
        onOpenTutor={() => onNavigateTab('ai-tutor')}
      />

      {/* 5. Five Core Virtues Quick Exploration Grid */}
      <section id="dashboard-virtues-grid" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
              探索 5 大聖經美德
            </h3>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Five Core Biblical Virtues
            </span>
          </div>
          <button
            id="view-all-virtues-btn"
            type="button"
            onClick={() => onNavigateTab('virtues')}
            className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>美德總覽</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {virtues.map((v, idx) => {
            const isCompleted = progress.completedLessons.includes(v.id);
            return (
              <div
                key={v.id}
                id={`virtue-card-${v.id}`}
                onClick={() => onSelectVirtue(v.id)}
                className={`group relative bg-white rounded-2xl p-4 border transition-all hover:shadow-md cursor-pointer flex flex-col justify-between ${
                  isCompleted ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                      0{idx + 1}
                    </span>
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        已完成
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {v.nameZh}
                  </h4>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1.5">
                    {v.nameEn}
                  </span>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {v.shortDescZh}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-indigo-600">
                  <span className="text-[11px] text-slate-600">{v.bibleStory.characterZh}</span>
                  <span className="flex items-center gap-0.5">
                    開始學習
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
