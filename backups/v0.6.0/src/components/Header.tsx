import React from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Sparkles, 
  BookOpen, 
  Bot, 
  HelpCircle, 
  Flame, 
  Code2
} from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  streakDays: number;
  completedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  streakDays,
}) => {
  const navItems: { id: TabType; labelZh: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      labelZh: '首頁',
      labelEn: 'Home',
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'virtues',
      labelZh: '美德總覽',
      labelEn: 'Virtues',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'lesson',
      labelZh: '美德課程',
      labelEn: 'Lessons',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'ai-tutor',
      labelZh: 'AI 助教',
      labelEn: 'AI Tutor',
      icon: <Bot className="w-4 h-4" />,
    },
    {
      id: 'quiz',
      labelZh: '美德測驗',
      labelEn: 'Quiz',
      icon: <HelpCircle className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Logo & Brand: Fully responsive and protected against clipping on mobile */}
        <button
          id="nav-logo-btn"
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group transition-transform active:scale-98 shrink-0 min-w-0"
        >
          {/* VELS Stylized Shield / Star Emblem */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-amber-500 p-0.5 shadow-sm shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-indigo-900/90 to-indigo-800/90 flex items-center justify-center text-white">
              <span className="font-black text-base sm:text-lg tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-200">
                V
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg leading-tight whitespace-nowrap">
                VELS Mini
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] sm:text-xs font-extrabold px-1.5 sm:px-2 py-0.5 rounded-md border border-amber-300 shrink-0 leading-none">
                MVP
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-wide truncate max-w-[145px] xs:max-w-[200px] sm:max-w-none mt-0.5">
              Virtue Education Learning System
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-desktop-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.labelZh}</span>
              </button>
            );
          })}

          <button
            id="nav-desktop-api-guide"
            onClick={() => onSelectTab('api-guide')}
            className={`ml-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              currentTab === 'api-guide'
                ? 'bg-amber-600 text-white border-amber-700'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Gemini API 說明</span>
          </button>
        </nav>

        {/* Header Right Status Bar: Responsive for Mobile & Desktop */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div 
            className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/90 px-2.5 py-1 rounded-full text-xs font-bold shadow-2xs"
            title="連續學習天數"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span className="whitespace-nowrap">{streakDays} 天</span>
            <span className="hidden sm:inline text-[11px] text-amber-800">連續學習</span>
          </div>

          <button
            id="nav-mobile-api-btn"
            onClick={() => onSelectTab('api-guide')}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            title="Gemini API 說明"
          >
            <Code2 className="w-4 h-4 text-amber-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
