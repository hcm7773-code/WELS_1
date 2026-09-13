import virtuesJson from '../data/virtues.json';
import versesJson from '../data/verses.json';
import storiesJson from '../data/stories.json';
import lessonsJson from '../data/lessons.json';
import activitiesJson from '../data/activities.json';
import assessmentsJson from '../data/assessments.json';

import {
  VirtueModel,
  VerseModel,
  StoryModel,
  LessonModel,
  ActivityModel,
  AssessmentModel,
} from '../types/contentModel';

import {
  Virtue,
  VirtueId,
  InteractiveLessonData,
  InteractiveLessonStep,
  QuizQuestion,
} from '../types';

// Type-cast the imported JSON models
const VIRTUES: VirtueModel[] = virtuesJson as VirtueModel[];
const VERSES: VerseModel[] = versesJson as VerseModel[];
const STORIES: StoryModel[] = storiesJson as StoryModel[];
const LESSONS: LessonModel[] = lessonsJson as LessonModel[];
const ACTIVITIES: ActivityModel[] = activitiesJson as ActivityModel[];
const ASSESSMENTS: AssessmentModel[] = assessmentsJson as AssessmentModel[];

// Helper to normalize virtue ID (supports 'V001' or legacy 'courage')
export function normalizeVirtueId(idOrCode: string): string {
  const match = VIRTUES.find((v) => v.id === idOrCode || v.code === idOrCode);
  return match ? match.id : idOrCode;
}

export function getVirtueLegacyCode(idOrCode: string): VirtueId {
  const match = VIRTUES.find((v) => v.id === idOrCode || v.code === idOrCode);
  return (match?.code as VirtueId) || 'courage';
}

// ---------------------------------------------------------------------------
// Basic Entity Getters (Relational & Graph lookups)
// ---------------------------------------------------------------------------

export function getAllVirtueModels(): VirtueModel[] {
  return VIRTUES;
}

export function getVirtueModelById(virtueIdOrCode: string): VirtueModel | undefined {
  const normId = normalizeVirtueId(virtueIdOrCode);
  return VIRTUES.find((v) => v.id === normId);
}

export function getLessonModelByVirtueId(virtueIdOrCode: string): LessonModel | undefined {
  const normId = normalizeVirtueId(virtueIdOrCode);
  return LESSONS.find((l) => l.virtueId === normId);
}

export function getVerseModelById(verseId: string): VerseModel | undefined {
  return VERSES.find((v) => v.verseId === verseId);
}

export function getVersesForVirtue(virtueIdOrCode: string): VerseModel[] {
  const normId = normalizeVirtueId(virtueIdOrCode);
  return VERSES.filter((v) => v.virtueId === normId);
}

export function getStoryModelById(storyId: string): StoryModel | undefined {
  return STORIES.find((s) => s.storyId === storyId);
}

export function getActivityModelById(activityId: string): ActivityModel | undefined {
  return ACTIVITIES.find((a) => a.activityId === activityId);
}

export function getAssessmentsForLesson(lessonId: string): AssessmentModel[] {
  return ASSESSMENTS.filter((a) => a.lessonId === lessonId);
}

export function getAssessmentsForVirtue(virtueIdOrCode: string): AssessmentModel[] {
  const normId = normalizeVirtueId(virtueIdOrCode);
  return ASSESSMENTS.filter((a) => a.virtueId === normId);
}

// ---------------------------------------------------------------------------
// Relational Assembly: Convert Normalized Data Model into InteractiveLessonData
// ---------------------------------------------------------------------------

export function assembleInteractiveLesson(virtueIdOrCode: string): InteractiveLessonData {
  const normId = normalizeVirtueId(virtueIdOrCode);
  const virtue = getVirtueModelById(normId) || VIRTUES[0];
  const lesson = getLessonModelByVirtueId(normId) || LESSONS[0];
  const story = getStoryModelById(lesson.bibleStoryId) || STORIES[0];
  const mainVerseId = lesson.verseIds[0] || virtue.coreBibleVerses[0];
  const verse = getVerseModelById(mainVerseId) || VERSES[0];
  const activity = getActivityModelById(lesson.activityId) || ACTIVITIES[0];
  const assessments = getAssessmentsForLesson(lesson.lessonId);

  // Convert assessments into QuizQuestion format
  const quizQuestions: QuizQuestion[] = assessments.map((a) => ({
    id: a.assessmentId,
    scenarioZh: a.scenarioZh || '',
    questionZh: a.question,
    options: a.options,
    correctOptionId: a.correctAnswer,
    explanationZh: a.explanation,
    virtuePrincipleZh: a.virtuePrinciple || '堅持做對的事，依靠神的同在。',
  }));

  const legacyCode = (virtue.code || 'courage') as VirtueId;

  return {
    id: lesson.lessonId,
    virtueId: legacyCode,
    nameZh: virtue.nameZh,
    nameEn: virtue.nameEn,

    welcome: {
      bannerTitleZh: lesson.welcomeData?.bannerTitleZh || `今日美德：${virtue.nameZh} ${virtue.nameEn}`,
      subtitleZh: lesson.welcomeData?.subtitleZh || virtue.description,
      definitionZh: lesson.welcomeData?.definitionZh || virtue.definitionZh,
      definitionEn: lesson.welcomeData?.definitionEn || virtue.definitionEn,
      estimatedMinutes: lesson.welcomeData?.estimatedMinutes || 8,
      learningGoals: lesson.welcomeData?.learningGoals || [
        `認識 ${story.titleZh} 的聖經歷史故事`,
        `熟讀並背誦 ${verse.referenceZh} 核心金句`,
        `透過 3 個深度反思問題，思考生活實踐`,
        `承諾一項具體可行的校園微行動`,
        `通過情境測驗檢驗學習成果`,
      ],
      warmupQuestionZh:
        lesson.welcomeData?.warmupQuestionZh ||
        `在日常生活中，你曾在 ${virtue.nameZh} 的考驗前感到猶豫過嗎？今天這堂課正是為你預備的！`,
    },

    bibleStory: {
      titleZh: story.titleZh,
      titleEn: story.titleEn,
      characterZh: story.characterZh,
      characterEn: story.characterEn,
      readingTimeMinutes: story.readingTimeMinutes,
      storyActs: story.storyActs,
      teenTakeawayZh: story.teenTakeawayZh,
      teenTakeawayEn: story.teenTakeawayEn,
    },

    bibleVerse: {
      referenceZh: verse.referenceZh,
      referenceEn: verse.referenceEn,
      textZh: verse.textZh,
      textEn: verse.textEn,
      shortExplanationZh: verse.shortExplanationZh,
      keyPoints: verse.keyPoints || [],
    },

    thinkAndReflect: {
      titleZh: '生活深度反思 Think & Reflect',
      introZh: '將聖經人物的生命智慧帶進你的真實生活，誠實寫下你內心的想法。',
      reflectionQuestions: lesson.reflectionQuestions,
    },

    courageChallenge: {
      titleZh: activity.titleZh,
      subtitleZh: activity.subtitleZh || activity.challengeCoreStatement,
      challengeCoreStatement: activity.challengeCoreStatement,
      actionOptions: activity.actionOptions.map((opt) => ({
        id: opt.id,
        category: opt.category,
        titleZh: opt.titleZh,
        descZh: opt.descZh,
        difficulty: (opt.difficulty as any) || '中度挑戰',
      })),
      badgeName: activity.badgeName,
      badgeDescription: activity.badgeDescription,
      commitmentTipsZh: activity.commitmentTipsZh,
    },

    miniQuiz: {
      titleZh: `${virtue.nameZh}情境測驗 Mini Quiz`,
      descriptionZh: '透過 3 題貼近中學生校園生活的選擇題，檢視你對本課核心原則的理解程度。',
      questions: quizQuestions,
    },

    completion: {
      congratsTitleZh: lesson.completionData?.congratsTitleZh || `恭喜！你完成了 ${virtue.nameEn} ${virtue.nameZh}課程。`,
      congratsSubtitleZh:
        lesson.completionData?.congratsSubtitleZh ||
        `你已經完成 ${story.titleZh} 研讀、金句反思、生活挑戰承諾與情境測驗！`,
      encouragementMessageZh:
        lesson.completionData?.encouragementMessageZh ||
        `太棒了！只要你願意倚靠神在生活中選擇做對的事，你就是校園裡活出榮耀的榜樣！`,
      bibleBlessingZh: lesson.completionData?.bibleBlessingZh || `「${verse.textZh}」— ${verse.referenceZh}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Step Descriptors for the 7-Step Workflow
// ---------------------------------------------------------------------------
export function getLessonSteps(virtueIdOrCode: string = 'courage'): InteractiveLessonStep[] {
  const normId = normalizeVirtueId(virtueIdOrCode);
  const lesson = getLessonModelByVirtueId(normId);
  if (lesson?.steps && lesson.steps.length > 0) {
    return lesson.steps;
  }
  return [
    { id: 1, key: 'welcome', titleZh: '歡迎導讀', titleEn: 'Welcome', shortDescZh: '美德導引' },
    { id: 2, key: 'story', titleZh: '聖經故事', titleEn: 'Bible Story', shortDescZh: '故事精讀' },
    { id: 3, key: 'verse', titleZh: '核心金句', titleEn: 'Bible Verse', shortDescZh: '經文誦讀' },
    { id: 4, key: 'reflect', titleZh: '深思時間', titleEn: 'Think & Reflect', shortDescZh: '生活反思' },
    { id: 5, key: 'challenge', titleZh: '品格實踐', titleEn: 'Action Challenge', shortDescZh: '生活微行動' },
    { id: 6, key: 'quiz', titleZh: '情境測驗', titleEn: 'Mini Quiz', shortDescZh: '理解檢驗' },
    { id: 7, key: 'completion', titleZh: '結業成就', titleEn: 'Completion', shortDescZh: '榮譽總結' },
  ];
}

// ---------------------------------------------------------------------------
// Convert V001-V005 models to legacy Virtue array for existing UI components
// ---------------------------------------------------------------------------
export function getLegacyVirtuesData(): Virtue[] {
  return VIRTUES.map((v) => {
    const mainVerse = getVerseModelById(v.coreBibleVerses[0]) || VERSES[0];
    const mainStory = getStoryModelById(v.relatedBibleStories[0]) || STORIES[0];
    const lesson = getLessonModelByVirtueId(v.id);
    const activity = getActivityModelById(v.practiceActivities[0]) || ACTIVITIES[0];

    const legacyCode = (v.code || 'courage') as VirtueId;

    return {
      id: legacyCode,
      order: v.order,
      nameZh: v.nameZh,
      nameEn: v.nameEn,
      shortDescZh: v.description,
      shortDescEn: v.definitionEn,
      color: v.theme || {
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        bgLight: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-800',
        badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        accent: 'indigo',
      },
      iconName: v.theme?.iconName || 'Star',
      bibleVerse: {
        referenceZh: mainVerse.referenceZh,
        referenceEn: mainVerse.referenceEn,
        textZh: mainVerse.textZh,
        textEn: mainVerse.textEn,
      },
      bibleStory: {
        titleZh: mainStory.titleZh,
        titleEn: mainStory.titleEn,
        characterZh: mainStory.characterZh,
        characterEn: mainStory.characterEn,
        summaryZh: mainStory.summaryZh,
        fullStoryZh: mainStory.fullStoryZh || mainStory.storyActs.map((act) => act.content),
        keyTakeawayZh: mainStory.teenTakeawayZh,
        keyTakeawayEn: mainStory.teenTakeawayEn,
      },
      reflectionQuestion: {
        questionZh: lesson?.reflectionQuestions[0]?.questionZh || v.reflectionQuestions[0] || '',
        questionEn: `How can you practice ${v.nameEn} in your daily life?`,
        thoughtPromptZh: lesson?.reflectionQuestions[0]?.promptZh || '在日常生活中思考並寫下你的想法。',
        guideQuestionsZh: lesson?.reflectionQuestions.map((q) => q.questionZh) || v.reflectionQuestions,
      },
      practicalActivity: {
        titleZh: activity.titleZh,
        titleEn: activity.titleEn,
        descriptionZh: activity.challengeCoreStatement,
        stepsZh: activity.actionOptions.map((opt) => opt.titleZh),
        badgeNameZh: activity.badgeName,
      },
      quizQuestions: getAssessmentsForLesson(lesson?.lessonId || '').map((a) => ({
        id: a.assessmentId,
        scenarioZh: a.scenarioZh || '',
        questionZh: a.question,
        options: a.options,
        correctOptionId: a.correctAnswer,
        explanationZh: a.explanation,
        virtuePrincipleZh: a.virtuePrinciple || '',
      })),
      miniQuiz: {
        titleZh: `${v.nameZh} mini quiz`,
        descriptionZh: '3 題生活情境測驗',
        questions: getAssessmentsForLesson(lesson?.lessonId || '').map((a) => ({
          id: a.assessmentId,
          scenarioZh: a.scenarioZh || '',
          questionZh: a.question,
          options: a.options,
          correctOptionId: a.correctAnswer,
          explanationZh: a.explanation,
          virtuePrincipleZh: a.virtuePrinciple || '',
        })),
      },
    };
  });
}

// ---------------------------------------------------------------------------
// VELS v0.6.0 AI Tutor Context Factory
// ---------------------------------------------------------------------------
import { TutorContext } from '../ai/tutorTypes';
import { getStepInfo } from '../ai/tutorPrompt';

export function createTutorContext(
  virtueIdOrCode: string = 'courage',
  stepNumber: number = 1,
  studentState?: {
    reflectionDraft?: string;
    quizScore?: number;
    selectedChallengeTitle?: string;
  }
): TutorContext {
  const normId = normalizeVirtueId(virtueIdOrCode);
  const virtue = getVirtueModelById(normId) || VIRTUES[0];
  const lesson = getLessonModelByVirtueId(normId) || LESSONS[0];
  const story = getStoryModelById(lesson.bibleStoryId) || STORIES[0];
  const verses = getVersesForVirtue(normId);
  const activity = getActivityModelById(lesson.activityId) || ACTIVITIES[0];
  const assessments = getAssessmentsForLesson(lesson.lessonId);
  const step = getStepInfo(stepNumber);

  return {
    courseId: lesson.lessonId,
    virtueId: virtue.id,
    virtueCode: (virtue.code || 'courage') as VirtueId,
    virtueNameZh: virtue.nameZh,
    virtueNameEn: virtue.nameEn,
    aliasesZh: virtue.aliasesZh || [],
    aliasesEn: virtue.aliasesEn || [],
    currentStep: step,
    lessonTitleZh: lesson.titleZh,
    lessonTitleEn: lesson.titleEn,
    warmupQuestionZh: lesson.welcomeData?.warmupQuestionZh,
    definitionZh: virtue.definitionZh,
    definitionEn: virtue.definitionEn,
    verses: verses.map((v) => ({
      referenceZh: v.referenceZh,
      referenceEn: v.referenceEn,
      textZh: v.textZh,
      shortExplanationZh: v.shortExplanationZh,
      keyPoints: v.keyPoints
        ? v.keyPoints.map((kp: any) =>
            typeof kp === 'string' ? kp : `${kp.keyword}: ${kp.explanation}`
          )
        : [],
    })),
    stories: [
      {
        titleZh: story.titleZh,
        titleEn: story.titleEn,
        characterZh: story.characterZh,
        characterEn: story.characterEn,
        teenTakeawayZh: story.teenTakeawayZh,
      },
    ],
    activities: [
      {
        titleZh: activity.titleZh,
        challengeCoreStatement: activity.challengeCoreStatement,
        actionOptions: activity.actionOptions.map((o) => ({
          titleZh: o.titleZh,
          descZh: o.descZh,
          difficulty: o.difficulty,
        })),
      },
    ],
    assessments: assessments.map((a) => ({
      assessmentId: a.assessmentId,
      question: a.question,
      scenarioZh: a.scenarioZh,
      virtuePrinciple: a.virtuePrinciple,
    })),
    studentState,
  };
}

