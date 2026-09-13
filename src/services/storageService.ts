import { UserProgress, VirtueId } from '../types';

const STORAGE_KEY = 'vels_mini_user_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: ['courage'],
  completedActivities: [],
  reflections: {
    courage: '我決定在下週的班會上，勇敢表達我對班級分工的建議，不再害怕被別人議論。',
    honesty: '',
    compassion: '',
    responsibility: '',
    perseverance: '',
  },
  quizScores: {
    courage: { score: 3, total: 3, timestamp: '2026-09-10' }
  } as Record<VirtueId, { score: number; total: number; timestamp: string }>,
  streakDays: 3,
  weeklyCompletedCount: 4,
  todayProgress: {
    storyRead: true,
    verseRead: true,
    reflectionSaved: true,
    quizTaken: false,
  },
};

export function loadUserProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_PROGRESS,
        ...parsed,
        reflections: { ...DEFAULT_PROGRESS.reflections, ...(parsed.reflections || {}) },
        quizScores: { ...DEFAULT_PROGRESS.quizScores, ...(parsed.quizScores || {}) },
      };
    }
  } catch (e) {
    console.warn('Failed to load progress from localStorage:', e);
  }
  return DEFAULT_PROGRESS;
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Failed to save progress to localStorage:', e);
  }
}
