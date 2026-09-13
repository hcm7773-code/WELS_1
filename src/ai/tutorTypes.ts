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

/**
 * VELS Mini v0.7.0 - S4 Formative Feedback Interface
 * 針對學生 S4「深思時間」反思內容所提供的即時形成性評量回饋
 */
export interface FormativeFeedback {
  id: string;
  virtueId: string;
  virtueNameZh: string; // 固定同情心 / 勇氣 / 誠實 / 責任 / 堅持(毅力)
  virtueNameEn: string;
  stepCode: 'S4';
  /** 1. 溫暖肯定：針對學生的真誠分享給予同理與支持 */
  warmAffirmation: string;
  /** 2. 反思亮點：指出學生回答中深刻、誠實或觸動人心的核心焦點 */
  reflectionHighlight: string;
  /** 3. 一個引導問題：不給標準答案，以蘇格拉底式提問激發更深層思考 */
  guidingQuestion: string;
  /** 4. 一個可執行的改善建議：連結中學校園生活的具體微行動 */
  actionableSuggestion: string;
  /** 聖經經文或人物連結 */
  bibleConnection?: {
    characterOrTopicZh: string;
    verseReferenceZh: string;
    verseTextZh: string;
    insightZh: string;
  };
  timestamp: string;
}

export interface FormativeFeedbackRequest {
  virtueId: string; // e.g. 'V001' or 'courage'
  virtueNameZh: string;
  virtueNameEn: string;
  studentReflection: string;
  questionId?: string;
  questionTitleZh?: string;
  context?: TutorContext;
}

export interface SpeechRecognitionHookState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  isSupported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

