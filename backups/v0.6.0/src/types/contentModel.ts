/**
 * VELS Content Data Model v0.1
 * 
 * Scalable schema designed for:
 * 1. Client-side state & UI rendering
 * 2. Relational mapping (PostgreSQL / SQLite)
 * 3. Property Graph mapping (Neo4j: Nodes & Relationships)
 * 4. Knowledge chunks for RAG / GraphRAG indexing
 */

export type VirtueCode = 'V001' | 'V002' | 'V003' | 'V004' | 'V005';
export type LegacyVirtueId = 'courage' | 'honesty' | 'compassion' | 'responsibility' | 'perseverance';

// ---------------------------------------------------------------------------
// 1. Virtue Model (Neo4j Node: :Virtue | PostgreSQL Table: virtues)
// ---------------------------------------------------------------------------
export interface VirtueModel {
  /** Unique primary key, e.g. "V001" */
  id: string;
  /** Legacy or URL-friendly slug, e.g. "courage" */
  code?: LegacyVirtueId;
  order: number;
  nameZh: string;
  nameEn: string;
  definitionZh: string;
  definitionEn: string;
  description: string;
  aliasesZh?: string[];
  aliasesEn?: string[];

  /** Foreign Keys / Graph Edges to Verses (BELONGS_TO_VIRTUE <- [:Verse]) */
  coreBibleVerses: string[];

  /** Foreign Keys / Graph Edges to Stories (ILLUSTRATED_BY -> [:Story]) */
  relatedBibleStories: string[];

  /** Character entities (FEATURED_CHARACTER -> [:Character]) */
  relatedCharacters: string[];

  /** Standard reflection question prompts */
  reflectionQuestions: string[];

  /** Foreign Keys / Graph Edges to Activities (PRACTICED_BY -> [:Activity]) */
  practiceActivities: string[];

  /** Foreign Keys / Graph Edges to Assessments (EVALUATED_BY -> [:Assessment]) */
  assessmentIds: string[];

  /** UI color styling tokens */
  theme?: {
    primary: string;
    bgLight: string;
    border: string;
    text: string;
    badgeBg: string;
    accent: string;
    iconName: string;
  };
}

// ---------------------------------------------------------------------------
// 2. Bible Verse Model (Neo4j Node: :Verse | PostgreSQL Table: verses)
// ---------------------------------------------------------------------------
export interface VerseModel {
  verseId: string;
  virtueId: string;
  referenceZh: string;
  referenceEn: string;
  bookZh: string;
  bookEn: string;
  chapter: number;
  verse: number;
  textZh: string;
  textEn: string;
  shortExplanationZh: string;
  keyPoints?: {
    keyword: string;
    explanation: string;
  }[];
}

// ---------------------------------------------------------------------------
// 3. Bible Story Model (Neo4j Node: :Story | PostgreSQL Table: stories)
// ---------------------------------------------------------------------------
export interface StoryActModel {
  actNumber: number;
  actTitle: string;
  content: string;
  highlight?: string;
}

export interface StoryModel {
  storyId: string;
  virtueId: string;
  titleZh: string;
  titleEn: string;
  characterZh: string;
  characterEn: string;
  readingTimeMinutes: number;
  summaryZh: string;
  storyActs: StoryActModel[];
  fullStoryZh?: string[];
  teenTakeawayZh: string;
  teenTakeawayEn: string;
}

// ---------------------------------------------------------------------------
// 4. Activity Model (Neo4j Node: :Activity | PostgreSQL Table: activities)
// ---------------------------------------------------------------------------
export interface ActivityOptionModel {
  id: string;
  category: string;
  titleZh: string;
  descZh: string;
  difficulty: '輕鬆嘗試' | '中度挑戰' | '突破自我' | 'Easy' | 'Medium' | 'Challenging';
}

export interface ActivityModel {
  activityId: string;
  virtueId: string;
  title: string;
  description: string;
  difficulty: string;
  completionCriteria: string;
  titleZh?: string;
  titleEn?: string;
  subtitleZh?: string;
  challengeCoreStatement?: string;
  actionOptions?: ActivityOptionModel[];
  badgeName?: string;
  badgeDescription?: string;
  commitmentTipsZh?: string[];
}

// ---------------------------------------------------------------------------
// 5. Assessment Model (Neo4j Node: :Assessment | PostgreSQL Table: assessments)
// ---------------------------------------------------------------------------
export interface AssessmentOptionModel {
  id: string;
  label: string;
  textZh: string;
  textEn?: string;
}

export interface AssessmentModel {
  assessmentId: string;
  lessonId: string;
  virtueId: string;
  scenarioZh?: string;
  question: string;
  options: AssessmentOptionModel[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  virtuePrinciple?: string;
}

// ---------------------------------------------------------------------------
// 6. Lesson Model (Neo4j Node: :Lesson | PostgreSQL Table: lessons)
// ---------------------------------------------------------------------------
export interface LessonStepDescriptor {
  id: number;
  key: 'welcome' | 'story' | 'verse' | 'reflect' | 'challenge' | 'quiz' | 'completion';
  titleZh: string;
  titleEn: string;
  shortDescZh: string;
}

export interface LessonReflectionQuestionModel {
  id: string;
  number: number;
  questionZh: string;
  promptZh: string;
  placeholderZh: string;
  suggestedThoughts: string[];
}

export interface LessonWelcomeData {
  bannerTitleZh: string;
  subtitleZh: string;
  definitionZh: string;
  definitionEn: string;
  estimatedMinutes: number;
  learningGoals: string[];
  warmupQuestionZh: string;
}

export interface LessonCompletionData {
  congratsTitleZh: string;
  congratsSubtitleZh: string;
  encouragementMessageZh: string;
  bibleBlessingZh: string;
}

export interface LessonModel {
  lessonId: string;
  virtueId: string;
  titleZh: string;
  titleEn: string;
  steps: LessonStepDescriptor[];
  bibleStoryId: string;
  verseIds: string[];
  reflectionQuestions: LessonReflectionQuestionModel[];
  activityId: string;
  assessmentId: string;
  assessmentIds?: string[];
  welcomeData?: LessonWelcomeData;
  completionData?: LessonCompletionData;
}
