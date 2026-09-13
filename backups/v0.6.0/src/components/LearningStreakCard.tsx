import React from 'react';
import { Flame, BookCheck, Sparkles, Trophy, CalendarDays } from 'lucide-react';

interface LearningStreakCardProps {
  streakDays?: number;
  weeklyCompletedCount?: number;
}

export const LearningStreakCard: React.FC<LearningStreakCardProps> = ({
  streakDays = 3,
  weeklyCompletedCount = 4,
}) => {
  // Weekly days representation: Mon to Sun
  const weekdays = [
    { label: '一', isCompleted: true },
    { label: '二', isCompleted: true },
    { label: '三', isCompleted: true },
    { label: '四', isCompleted: false, isToday: true },
    { label: '五', isCompleted: false },
    { label: '六', isCompleted: false },
    { label: '日', isCompleted: false },
  ];

  return (
    <div 
      id="learning-streak-card"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-none">
              品格學習紀錄與動能
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Student Growth & Daily Habits
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-indigo-600" />
          <span>積極成長中</span>
        </div>
      </div>

      {/* Two Core Stat Cards: 連續學習 3 天 & 本週完成 4 課 */}
      <div className="grid grid-cols-2 gap-3">
        {/* Streak Days */}
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl p-3.5 sm:p-4 border border-amber-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Flame className="w-6 h-6 fill-amber-100 text-white animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-amber-900 leading-tight">
                {streakDays}
              </span>
              <span className="text-xs font-bold text-amber-800">天</span>
            </div>
            <div className="text-xs font-extrabold text-slate-800 tracking-tight">
              連續學習 {streakDays} 天
            </div>
            <span className="text-[10px] text-amber-700/80 font-medium block">
              Daily Streak
            </span>
          </div>
        </div>

        {/* Weekly Completed Count */}
        <div className="bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent rounded-2xl p-3.5 sm:p-4 border border-indigo-200/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <BookCheck className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-indigo-950 leading-tight">
                {weeklyCompletedCount}
              </span>
              <span className="text-xs font-bold text-indigo-800">課</span>
            </div>
            <div className="text-xs font-extrabold text-slate-800 tracking-tight">
              本週完成 {weeklyCompletedCount} 課
            </div>
            <span className="text-[10px] text-indigo-700/80 font-medium block">
              Lessons This Week
            </span>
          </div>
        </div>
      </div>

      {/* Weekday Visual Trackers */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
          <span>本週打卡進度：</span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-1.5 xs:gap-2">
          {weekdays.map((day, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center gap-1"
              title={`週${day.label}`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  day.isCompleted
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : day.isToday
                    ? 'border-2 border-indigo-500 text-indigo-700 bg-indigo-50/50 font-black'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {day.isCompleted ? (
                  <Flame className="w-4 h-4 fill-amber-200" />
                ) : (
                  <span>{day.label}</span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-3 text-xs text-slate-600 flex items-center gap-2 border border-slate-200/60">
        <span className="text-amber-500 font-bold">💡 每日激勵：</span>
        <span className="truncate">太棒了！持續穩健積累，聖經智慧正在成為你生活中的力量！</span>
      </div>
    </div>
  );
};
