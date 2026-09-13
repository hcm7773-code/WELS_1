import React from 'react';
import { Bot, MessageSquare, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

interface AITutorCardProps {
  onSelectQuestion: (question: string) => void;
  onOpenTutor: () => void;
}

export const AITutorCard: React.FC<AITutorCardProps> = ({
  onSelectQuestion,
  onOpenTutor,
}) => {
  // Exact 3 questions required by user
  const quickQuestions = [
    {
      id: 'q1',
      text: '我今天遇到同學排擠怎麼辦？',
      tag: '同儕相處',
    },
    {
      id: 'q2',
      text: '勇氣在學校生活中是什麼？',
      tag: '品格實踐',
    },
    {
      id: 'q3',
      text: '我做錯事情應該怎麼辦？',
      tag: '誠實認錯',
    },
  ];

  return (
    <div 
      id="ai-tutor-feature-card"
      className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-indigo-700/50 space-y-5 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

      {/* Header with Title & English Subtitle as requested */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-md font-bold">
              <Bot className="w-7 h-7" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-indigo-900 rounded-full" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              有煩惱？找 AI 品格助教
            </h3>
            <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider block mt-0.5">
              ASK AI TUTOR
            </span>
          </div>
        </div>

        <button
          id="open-ai-tutor-direct-btn"
          type="button"
          onClick={onOpenTutor}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span>進入助教對話室</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed max-w-2xl">
        面對同儕壓力、課業瓶頸或內心迷惘？以諾老師（AI 品格助教）以溫暖同理與蘇格拉底式提問，陪伴你從聖經智慧中找到實踐的勇氣。
      </p>

      {/* 3 Quick Questions Buttons (點擊直接帶入提問) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-300">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>點擊直接向以諾老師提問：</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {quickQuestions.map((q) => (
            <button
              key={q.id}
              id={`quick-question-${q.id}`}
              type="button"
              onClick={() => onSelectQuestion(q.text)}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-98 border border-white/15 hover:border-amber-300/60 text-left transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md">
                  {q.tag}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-300 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 leading-snug">
                「{q.text}」
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
