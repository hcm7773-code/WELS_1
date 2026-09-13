import { VirtueId } from '../types';

export type TutorRole = 'user' | 'assistant' | 'system';

export type StepKey = 'welcome' | 'story' | 'verse' | 'reflect' | 'challenge' | 'quiz' | 'completion';

export interface StepInfo {
  number: number; // 1 to 7
  code: 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7';
  key: StepKey;
  titleZh: string;
  titleEn: string;
  pedagogicalRoleZh: string;
}

export interface TutorMessage {
  id: string;
  role: TutorRole;
  content: string;
  timestamp?: string;
  thinkingPoints?: string[];
  suggestedQuestions?: string[];
  bibleVerseTag?: string;
  stepGuidance?: string;
}

export interface TutorContextVerse {
  referenceZh: string;
  referenceEn?: string;
  textZh: string;
  shortExplanationZh?: string;
  keyPoints?: string[];
}

export interface TutorContextStory {
  titleZh: string;
  titleEn?: string;
  characterZh: string;
  characterEn?: string;
  teenTakeawayZh?: string;
}

export interface TutorContextActivity {
  titleZh: string;
  challengeCoreStatement: string;
  actionOptions?: Array<{
    titleZh: string;
    descZh: string;
    difficulty: string;
  }>;
}

export interface TutorContextAssessment {
  assessmentId: string;
  question: string;
  scenarioZh?: string;
  virtuePrinciple?: string;
}

export interface TutorContext {
  courseId: string;
  virtueId: string; // 'V001', 'V002', 'V003', 'V004', 'V005'
  virtueCode: VirtueId; // 'courage', 'honesty', 'compassion', 'responsibility', 'perseverance'
  virtueNameZh: string; // e.g. '同情心' (V003 is strictly 同情心)
  virtueNameEn: string; // e.g. 'Compassion'
  aliasesZh?: string[];
  aliasesEn?: string[];
  currentStep: StepInfo;
  lessonTitleZh?: string;
  lessonTitleEn?: string;
  warmupQuestionZh?: string;
  definitionZh?: string;
  definitionEn?: string;
  verses: TutorContextVerse[];
  stories: TutorContextStory[];
  activities: TutorContextActivity[];
  assessments: TutorContextAssessment[];
  studentState?: {
    reflectionDraft?: string;
    quizScore?: number;
    selectedChallengeTitle?: string;
  };
}

export interface TutorRequest {
  systemPrompt?: string;
  conversationHistory: TutorMessage[];
  userMessage: string;
  context: TutorContext;
}

export interface TutorResponse {
  assistantMessage: string;
  thinkingPoints?: string[];
  suggestedQuestions?: string[];
  bibleVerseTag?: string;
  stepGuidance?: string;
  source: 'gemini' | 'mock' | 'fallback';
}
