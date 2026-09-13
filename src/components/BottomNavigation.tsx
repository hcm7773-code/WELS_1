import React from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Sparkles, 
  BookOpen, 
  Bot, 
  HelpCircle 
} from 'lucide-react';

interface BottomNavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const navItems: { id: TabType; labelZh: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      labelZh: '首頁',
      labelEn: 'Home',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'virtues',
      labelZh: '美德總覽',
      labelEn: 'Virtues',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: 'lesson',
      labelZh: '美德課程',
      labelEn: 'Lessons',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: 'ai-tutor',
      labelZh: 'AI 助教',
      labelEn: 'AI Tutor',
      icon: <Bot className="w-5 h-5" />,
    },
    {
      id: 'quiz',
      labelZh: '美德測驗',
      labelEn: 'Quiz',
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ];

  return (
    <nav 
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-1 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 gap-0.5 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-bottom-${item.id}`}
              type="button"
              onClick={() => {
                onSelectTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`min-h-[48px] py-1.5 px-0.5 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50/90 font-extrabold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/80 font-medium'
              }`}
            >
              <div className={`transition-transform duration-150 ${isActive ? 'scale-105' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[11px] font-bold leading-tight mt-0.5 whitespace-nowrap">
                {item.labelZh}
              </span>
              <span className={`text-[9px] uppercase tracking-tighter leading-none mt-0.5 ${isActive ? 'text-indigo-500 font-semibold' : 'text-slate-400'}`}>
                {item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
