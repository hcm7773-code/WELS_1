export type VirtueId = 'courage' | 'honesty' | 'compassion' | 'responsibility' | 'perseverance';

export type TabType = 'dashboard' | 'virtues' | 'lesson' | 'ai-tutor' | 'quiz' | 'api-guide';

export interface BibleVerse {
  referenceZh: string;
  referenceEn: string;
  textZh: string;
  textEn: string;
}

export interface BibleStory {
  titleZh: string;
  titleEn: string;
  characterZh: string;
  characterEn: string;
  summaryZh: string;
  fullStoryZh: string[];
  keyTakeawayZh: string;
  keyTakeawayEn: string;
}

export interface ReflectionQuestion {
  questionZh: string;
  questionEn: string;
  guideQuestionsZh: string[];
  thoughtPromptZh: string;
}

export interface PracticalActivity {
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  stepsZh: string[];
  badgeNameZh: string;
}

export interface QuizOption {
  id: string;
  label: string;
  textZh: string;
  textEn?: string;
}

export interface QuizQuestion {
  id: string;
  scenarioZh: string;
  scenarioEn?: string;
  questionZh: string;
  questionEn?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanationZh: string;
  virtuePrincipleZh: string;
}

export interface Virtue {
  id: VirtueId;
  order: number;
  nameZh: string;
  nameEn: string;
  canonicalNameZh?: string;
  canonicalNameEn?: string;
  aliasesZh?: string[];
  aliasesEn?: string[];
  shortDescZh: string;
  shortDescEn: string;
  color: {
    primary: string;
    bgLight: string;
    border: string;
    text: string;
    badgeBg: string;
    accent: string;
  };
  iconName: string;
  bibleVerse: BibleVerse;
  bibleStory: BibleStory;
  reflectionQuestion: ReflectionQuestion;
  practicalActivity: PracticalActivity;
  quizQuestions: QuizQuestion[];
}

export interface TodayProgressStatus {
  storyRead: boolean;
  verseRead: boolean;
  reflectionSaved: boolean;
  quizTaken: boolean;
}

export interface UserProgress {
  completedLessons: VirtueId[];
  completedActivities: VirtueId[];
  reflections: Record<VirtueId, string>;
  quizScores: Record<VirtueId, { score: number; total: number; timestamp: string }>;
  streakDays: number;
  weeklyCompletedCount?: number;
  todayProgress?: TodayProgressStatus;
  selectedChallengeId?: Record<VirtueId, string>;
}

export interface InteractiveLessonStep {
  id: number;
  key: 'welcome' | 'story' | 'verse' | 'reflect' | 'challenge' | 'quiz' | 'completion';
  titleZh: string;
  titleEn: string;
  shortDescZh: string;
}

export interface InteractiveLessonData {
  id: string;
  virtueId: VirtueId;
  nameZh: string;
  nameEn: string;
  
  welcome: {
    bannerTitleZh: string;
    subtitleZh: string;
    definitionZh: string;
    definitionEn: string;
    estimatedMinutes: number;
    learningGoals: string[];
    warmupQuestionZh: string;
  };

  bibleStory: {
    titleZh: string;
    titleEn: string;
    characterZh: string;
    characterEn: string;
    readingTimeMinutes: number;
    storyActs: {
      actNumber: number;
      actTitle: string;
      content: string;
      highlight?: string;
    }[];
    teenTakeawayZh: string;
    teenTakeawayEn: string;
  };

  bibleVerse: {
    referenceZh: string;
    referenceEn: string;
    textZh: string;
    textEn: string;
    shortExplanationZh: string;
    keyPoints: { keyword: string; explanation: string }[];
  };

  thinkAndReflect: {
    titleZh: string;
    introZh: string;
    reflectionQuestions: {
      id: string;
      number: number;
      questionZh: string;
      promptZh: string;
      placeholderZh: string;
      suggestedThoughts: string[];
    }[];
  };

  courageChallenge: {
    titleZh: string;
    subtitleZh: string;
    challengeCoreStatement: string;
    actionOptions: {
      id: string;
      category: string;
      titleZh: string;
      descZh: string;
      difficulty: '輕鬆嘗試' | '中度挑戰' | '突破自我';
    }[];
    badgeName: string;
    badgeDescription: string;
    commitmentTipsZh: string[];
  };

  miniQuiz: {
    titleZh: string;
    descriptionZh: string;
    questions: QuizQuestion[];
  };

  completion: {
    congratsTitleZh: string;
    congratsSubtitleZh: string;
    encouragementMessageZh: string;
    bibleBlessingZh: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  thinkingPoints?: string[];
  bibleVerseTag?: string;
  suggestedQuestions?: string[];
  isLoading?: boolean;
}
