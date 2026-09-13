import React, { useState, useEffect } from 'react';
import { TabType, VirtueId, UserProgress } from './types';
import { getLegacyVirtuesData } from './services/contentRepository';
import { loadUserProgress, saveUserProgress } from './services/storageService';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { DashboardView } from './components/DashboardView';
import { VirtuesOverview } from './components/VirtuesOverview';
import { LessonDetailView } from './components/LessonDetailView';
import { AITutorView } from './components/AITutorView';
import { QuizView } from './components/QuizView';
import { GeminiIntegrationGuide } from './components/GeminiIntegrationGuide';

const VIRTUES_DATA = getLegacyVirtuesData();

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [currentVirtueId, setCurrentVirtueId] = useState<VirtueId>('courage');
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());

  // Cross-component communication
  const [tutorInitialQuestion, setTutorInitialQuestion] = useState<string | undefined>(undefined);
  const [quizInitialVirtueId, setQuizInitialVirtueId] = useState<VirtueId | undefined>(undefined);
  const [lessonInitialStep, setLessonInitialStep] = useState<number>(1);

  // Sync progress to localStorage whenever it changes
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Actions
  const handleStartTodayLesson = (virtueId: VirtueId) => {
    setCurrentVirtueId(virtueId);
    setLessonInitialStep(1);
    setCurrentTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVirtue = (virtueId: VirtueId) => {
    setCurrentVirtueId(virtueId);
    setLessonInitialStep(1);
    setCurrentTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToLessonStep = (virtueId: VirtueId, step: 'story' | 'verse' | 'reflection' | 'quiz') => {
    setCurrentVirtueId(virtueId);
    const stepMap = {
      story: 2,
      verse: 3,
      reflection: 4,
      quiz: 6,
    };
    setLessonInitialStep(stepMap[step] || 1);
    setCurrentTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveReflection = (virtueId: VirtueId, text: string) => {
    setProgress((prev) => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [virtueId]: text,
      },
      todayProgress: {
        ...(prev.todayProgress || { storyRead: true, verseRead: true, reflectionSaved: false, quizTaken: false }),
        reflectionSaved: Boolean(text.trim()),
      }
    }));
  };

  const handleToggleActivity = (virtueId: VirtueId) => {
    setProgress((prev) => {
      const exists = prev.completedActivities.includes(virtueId);
      const newActivities = exists
        ? prev.completedActivities.filter((id) => id !== virtueId)
        : [...prev.completedActivities, virtueId];
      return {
        ...prev,
        completedActivities: newActivities,
      };
    });
  };

  const handleMarkLessonCompleted = (virtueId: VirtueId) => {
    setProgress((prev) => {
      const alreadyHas = prev.completedLessons.includes(virtueId);
      const updatedLessons = alreadyHas
        ? prev.completedLessons
        : [...prev.completedLessons, virtueId];

      return {
        ...prev,
        completedLessons: updatedLessons,
        weeklyCompletedCount: Math.max(prev.weeklyCompletedCount || 0, updatedLessons.length),
        todayProgress: {
          storyRead: true,
          verseRead: true,
          reflectionSaved: true,
          quizTaken: true,
        },
      };
    });
  };

  const handleSaveQuizScore = (virtueId: VirtueId, score: number, total: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [virtueId]: {
          score,
          total,
          timestamp: new Date().toISOString().split('T')[0],
        },
      },
      todayProgress: {
        ...(prev.todayProgress || { storyRead: true, verseRead: true, reflectionSaved: true, quizTaken: false }),
        quizTaken: true,
      }
    }));
  };

  const handleAskAITutor = (question: string) => {
    setTutorInitialQuestion(question);
    setCurrentTab('ai-tutor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTakeQuiz = (virtueId: VirtueId) => {
    setQuizInitialVirtueId(virtueId);
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header Bar (Responsive, Anti-Clipping Logo, MVP Badge) */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        streakDays={progress.streakDays}
        completedCount={progress.completedLessons.length}
      />

      {/* Main Content View Container with bottom clearance for fixed mobile nav */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6 pb-24 md:pb-12">
        {currentTab === 'dashboard' && (
          <DashboardView
            virtues={VIRTUES_DATA}
            progress={progress}
            onStartTodayLesson={handleStartTodayLesson}
            onSelectVirtue={handleSelectVirtue}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAskAITutorQuestion={handleAskAITutor}
            onGoToLessonStep={handleGoToLessonStep}
          />
        )}

        {currentTab === 'virtues' && (
          <VirtuesOverview
            virtues={VIRTUES_DATA}
            progress={progress}
            onSelectVirtue={handleSelectVirtue}
            onStartQuiz={handleTakeQuiz}
          />
        )}

        {currentTab === 'lesson' && (
          <LessonDetailView
            virtues={VIRTUES_DATA}
            currentVirtueId={currentVirtueId}
            progress={progress}
            onSelectVirtue={(id) => setCurrentVirtueId(id)}
            onSaveReflection={handleSaveReflection}
            onToggleActivity={handleToggleActivity}
            onMarkLessonCompleted={handleMarkLessonCompleted}
            onAskAITutor={handleAskAITutor}
            onTakeQuiz={handleTakeQuiz}
            onSaveQuizScore={handleSaveQuizScore}
            initialStep={lessonInitialStep}
            onReturnToDashboard={() => {
              setCurrentTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'ai-tutor' && (
          <AITutorView
            initialQuestion={tutorInitialQuestion}
            onClearInitialQuestion={() => setTutorInitialQuestion(undefined)}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            virtues={VIRTUES_DATA}
            initialVirtueId={quizInitialVirtueId}
            onSaveQuizScore={handleSaveQuizScore}
            onGoToLesson={handleSelectVirtue}
          />
        )}

        {currentTab === 'api-guide' && (
          <GeminiIntegrationGuide />
        )}
      </main>

      {/* Fixed Mobile Bottom Navigation Bar (5 core features, large touch targets, no text overlap) */}
      <BottomNavigation
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-700">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">VELS Mini</span>
            <span>•</span>
            <span>Virtue Education Learning System</span>
          </div>
          <p>
            專為中學生設計之聖經品格教育學習平台 • 透過聖經人物的生命經歷，在日常生活中學習與實踐品格
          </p>
          <div className="text-slate-700 text-[11px]">
            Bible Character Education AI Web App
          </div>
        </div>
      </footer>
    </div>
  );
}
