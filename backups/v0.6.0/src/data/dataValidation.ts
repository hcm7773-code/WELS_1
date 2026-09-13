/**
 * VELS Mini - Data Structure & Consistency Validation Engine
 * 
 * Performs structural, relational, and business rule verification on:
 * - virtues.json
 * - verses.json
 * - stories.json
 * - lessons.json
 * - activities.json
 * - assessments.json
 */

import virtuesData from './virtues.json';
import versesData from './verses.json';
import storiesData from './stories.json';
import lessonsData from './lessons.json';
import activitiesData from './activities.json';
import assessmentsData from './assessments.json';

export interface ValidationIssue {
  type: 'ERROR' | 'WARNING' | 'INFO';
  code: string;
  message: string;
  target?: string;
}

export interface ValidationSummaryItem {
  key: string;
  label: string;
  passed: boolean;
  detail?: string;
}

export interface VELSValidationReport {
  isValid: boolean;
  checklist: ValidationSummaryItem[];
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  info: ValidationIssue[];
  stats: {
    virtuesCount: number;
    versesCount: number;
    storiesCount: number;
    lessonsCount: number;
    activitiesCount: number;
    assessmentsCount: number;
    assessmentsPerVirtue: Record<string, number>;
  };
  outputFormattedText: string;
}

/**
 * Validates all VELS JSON data models and relational foreign keys.
 */
export function validateVELSData(): VELSValidationReport {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const info: ValidationIssue[] = [];

  const virtues = Array.isArray(virtuesData) ? (virtuesData as any[]) : [];
  const verses = Array.isArray(versesData) ? (versesData as any[]) : [];
  const stories = Array.isArray(storiesData) ? (storiesData as any[]) : [];
  const lessons = Array.isArray(lessonsData) ? (lessonsData as any[]) : [];
  const activities = Array.isArray(activitiesData) ? (activitiesData as any[]) : [];
  const assessments = Array.isArray(assessmentsData) ? (assessmentsData as any[]) : [];

  // -------------------------------------------------------------------------
  // 1. JSON Structure Validation
  // -------------------------------------------------------------------------
  let jsonStructureValid = true;
  if (!Array.isArray(virtuesData) || virtues.length === 0) {
    errors.push({ type: 'ERROR', code: 'E_VIRTUES_INVALID', message: 'virtues.json must be a non-empty array' });
    jsonStructureValid = false;
  }
  if (!Array.isArray(versesData) || verses.length === 0) {
    errors.push({ type: 'ERROR', code: 'E_VERSES_INVALID', message: 'verses.json must be a non-empty array' });
    jsonStructureValid = false;
  }
  if (!Array.isArray(storiesData) || stories.length === 0) {
    errors.push({ type: 'ERROR', code: 'E_STORIES_INVALID', message: 'stories.json must be a non-empty array' });
    jsonStructureValid = false;
  }
  if (!Array.isArray(lessonsData) || lessons.length === 0) {
    errors.push({ type: 'ERROR', code: 'E_LESSONS_INVALID', message: 'lessons.json must be a non-empty array' });
    jsonStructureValid = false;
  }
  if (!Array.isArray(activitiesData) || activities.length === 0) {
    errors.push({ type: 'ERROR', code: 'E_ACTIVITIES_INVALID', message: 'activities.json must be a non-empty array' });
    jsonStructureValid = false;
  }
  if (!Array.isArray(assessmentsData) || assessments.length === 0) {
    errors.push({ type: 'ERROR', code: 'E_ASSESSMENTS_INVALID', message: 'assessments.json must be a non-empty array' });
    jsonStructureValid = false;
  }

  // -------------------------------------------------------------------------
  // 2. ID Uniqueness Check
  // -------------------------------------------------------------------------
  let idsUnique = true;
  function checkUniqueness(items: any[], idField: string, datasetName: string) {
    const seen = new Set<string>();
    items.forEach((item, index) => {
      const id = item[idField];
      if (!id || typeof id !== 'string') {
        errors.push({
          type: 'ERROR',
          code: 'E_MISSING_ID',
          message: `${datasetName}[${index}] is missing required ID property '${idField}'`,
        });
        idsUnique = false;
      } else if (seen.has(id)) {
        errors.push({
          type: 'ERROR',
          code: 'E_DUPLICATE_ID',
          message: `Duplicate ID '${id}' found in ${datasetName}`,
          target: id,
        });
        idsUnique = false;
      } else {
        seen.add(id);
      }
    });
  }

  checkUniqueness(virtues, 'id', 'virtues.json');
  checkUniqueness(verses, 'verseId', 'verses.json');
  checkUniqueness(stories, 'storyId', 'stories.json');
  checkUniqueness(lessons, 'lessonId', 'lessons.json');
  checkUniqueness(activities, 'activityId', 'activities.json');
  checkUniqueness(assessments, 'assessmentId', 'assessments.json');

  const virtueIdSet = new Set(virtues.map((v) => v.id));
  const verseIdSet = new Set(verses.map((v) => v.verseId));
  const storyIdSet = new Set(stories.map((s) => s.storyId));
  const lessonIdSet = new Set(lessons.map((l) => l.lessonId));
  const activityIdSet = new Set(activities.map((a) => a.activityId));
  const assessmentIdSet = new Set(assessments.map((a) => a.assessmentId));

  // -------------------------------------------------------------------------
  // 3. Foreign-Key Relationships Check
  // -------------------------------------------------------------------------
  let relationshipsValid = true;

  // Lessons Foreign Keys
  lessons.forEach((l) => {
    // virtueId
    if (!virtueIdSet.has(l.virtueId)) {
      errors.push({
        type: 'ERROR',
        code: 'E_FK_LESSON_VIRTUE',
        message: `Lesson '${l.lessonId}' references non-existent virtueId: '${l.virtueId}'`,
        target: l.lessonId,
      });
      relationshipsValid = false;
    }
    // bibleStoryId
    if (!storyIdSet.has(l.bibleStoryId)) {
      errors.push({
        type: 'ERROR',
        code: 'E_FK_LESSON_STORY',
        message: `Lesson '${l.lessonId}' references non-existent bibleStoryId: '${l.bibleStoryId}'`,
        target: l.lessonId,
      });
      relationshipsValid = false;
    }
    // verseIds
    if (Array.isArray(l.verseIds)) {
      l.verseIds.forEach((vId: string) => {
        if (!verseIdSet.has(vId)) {
          errors.push({
            type: 'ERROR',
            code: 'E_FK_LESSON_VERSE',
            message: `Lesson '${l.lessonId}' references non-existent verseId: '${vId}'`,
            target: l.lessonId,
          });
          relationshipsValid = false;
        }
      });
    } else {
      errors.push({
        type: 'ERROR',
        code: 'E_LESSON_VERSE_ARRAY',
        message: `Lesson '${l.lessonId}' verseIds must be an array`,
        target: l.lessonId,
      });
      relationshipsValid = false;
    }
    // activityId
    if (!activityIdSet.has(l.activityId)) {
      errors.push({
        type: 'ERROR',
        code: 'E_FK_LESSON_ACTIVITY',
        message: `Lesson '${l.lessonId}' references non-existent activityId: '${l.activityId}'`,
        target: l.lessonId,
      });
      relationshipsValid = false;
    }
    // assessmentId
    if (!assessmentIdSet.has(l.assessmentId)) {
      errors.push({
        type: 'ERROR',
        code: 'E_FK_LESSON_ASSESSMENT',
        message: `Lesson '${l.lessonId}' references non-existent assessmentId: '${l.assessmentId}'`,
        target: l.lessonId,
      });
      relationshipsValid = false;
    }
    // assessmentIds (array)
    if (Array.isArray(l.assessmentIds)) {
      l.assessmentIds.forEach((aId: string) => {
        if (!assessmentIdSet.has(aId)) {
          errors.push({
            type: 'ERROR',
            code: 'E_FK_LESSON_ASSESSMENT_LIST',
            message: `Lesson '${l.lessonId}' references non-existent assessmentId in assessmentIds: '${aId}'`,
            target: l.lessonId,
          });
          relationshipsValid = false;
        }
      });
    }
  });

  // Virtues Foreign Keys
  virtues.forEach((v) => {
    // coreBibleVerses
    if (Array.isArray(v.coreBibleVerses)) {
      v.coreBibleVerses.forEach((vId: string) => {
        if (!verseIdSet.has(vId)) {
          errors.push({
            type: 'ERROR',
            code: 'E_FK_VIRTUE_VERSE',
            message: `Virtue '${v.id}' references non-existent verseId in coreBibleVerses: '${vId}'`,
            target: v.id,
          });
          relationshipsValid = false;
        }
      });
    }
    // relatedBibleStories
    if (Array.isArray(v.relatedBibleStories)) {
      v.relatedBibleStories.forEach((sId: string) => {
        if (!storyIdSet.has(sId)) {
          errors.push({
            type: 'ERROR',
            code: 'E_FK_VIRTUE_STORY',
            message: `Virtue '${v.id}' references non-existent storyId in relatedBibleStories: '${sId}'`,
            target: v.id,
          });
          relationshipsValid = false;
        }
      });
    }
    // practiceActivities
    if (Array.isArray(v.practiceActivities)) {
      v.practiceActivities.forEach((actId: string) => {
        if (!activityIdSet.has(actId)) {
          errors.push({
            type: 'ERROR',
            code: 'E_FK_VIRTUE_ACTIVITY',
            message: `Virtue '${v.id}' references non-existent activityId in practiceActivities: '${actId}'`,
            target: v.id,
          });
          relationshipsValid = false;
        }
      });
    }
    // assessmentIds
    if (Array.isArray(v.assessmentIds)) {
      v.assessmentIds.forEach((aId: string) => {
        if (!assessmentIdSet.has(aId)) {
          errors.push({
            type: 'ERROR',
            code: 'E_FK_VIRTUE_ASSESSMENT',
            message: `Virtue '${v.id}' references non-existent assessmentId in assessmentIds: '${aId}'`,
            target: v.id,
          });
          relationshipsValid = false;
        }
      });
    }
  });

  // Assessments Foreign Keys
  assessments.forEach((a) => {
    if (!virtueIdSet.has(a.virtueId)) {
      errors.push({
        type: 'ERROR',
        code: 'E_FK_ASSESS_VIRTUE',
        message: `Assessment '${a.assessmentId}' references non-existent virtueId: '${a.virtueId}'`,
        target: a.assessmentId,
      });
      relationshipsValid = false;
    }
    if (!lessonIdSet.has(a.lessonId)) {
      errors.push({
        type: 'ERROR',
        code: 'E_FK_ASSESS_LESSON',
        message: `Assessment '${a.assessmentId}' references non-existent lessonId: '${a.lessonId}'`,
        target: a.assessmentId,
      });
      relationshipsValid = false;
    }
  });

  // Stories Foreign Keys
  stories.forEach((s) => {
    if (!virtueIdSet.has(s.virtueId)) {
      errors.push({
        type: 'ERROR',
        code: 'E_FK_STORY_VIRTUE',
        message: `Story '${s.storyId}' references non-existent virtueId: '${s.virtueId}'`,
        target: s.storyId,
      });
      relationshipsValid = false;
    }
  });

  // Verses Foreign Keys
  verses.forEach((v) => {
    if (!virtueIdSet.has(v.virtueId)) {
      errors.push({
        type: 'ERROR',
        code: 'E_FK_VERSE_VIRTUE',
        message: `Verse '${v.verseId}' references non-existent virtueId: '${v.virtueId}'`,
        target: v.verseId,
      });
      relationshipsValid = false;
    }
  });

  // Activities Foreign Keys
  activities.forEach((act) => {
    if (!virtueIdSet.has(act.virtueId)) {
      errors.push({
        type: 'ERROR',
        code: 'E_FK_ACTIVITY_VIRTUE',
        message: `Activity '${act.activityId}' references non-existent virtueId: '${act.virtueId}'`,
        target: act.activityId,
      });
      relationshipsValid = false;
    }
  });

  // -------------------------------------------------------------------------
  // 4. 5 Virtues Availability & Semantic Standards Check
  // -------------------------------------------------------------------------
  const requiredVirtueIds = ['V001', 'V002', 'V003', 'V004', 'V005'];
  const missingVirtues = requiredVirtueIds.filter((id) => !virtueIdSet.has(id));
  let fiveVirtuesAvailable = missingVirtues.length === 0 && virtues.length === 5;
  if (!fiveVirtuesAvailable) {
    errors.push({
      type: 'ERROR',
      code: 'E_VIRTUES_COUNT',
      message: `Expected 5 virtues (V001-V005), found ${virtues.length}. Missing: ${missingVirtues.join(', ') || 'None'}`,
    });
  }

  // Strict semantic standard check (Canonical Name & Alias Architecture)
  const semanticStandards: Record<string, { en: string; canonicalZh: string; aliasesZh: string[]; forbiddenZh: string[] }> = {
    V001: { en: 'Courage', canonicalZh: '勇氣', aliasesZh: ['勇敢', '無畏'], forbiddenZh: ['財政', '賠償', '尋求'] },
    V002: { en: 'Honesty', canonicalZh: '誠實', aliasesZh: ['正直', '真實'], forbiddenZh: ['財政', '賠償', '尋求'] },
    V003: { en: 'Compassion', canonicalZh: '同情心', aliasesZh: ['憐憫', '慈心'], forbiddenZh: ['財政', '賠償', '尋求', '心同情'] },
    V004: { en: 'Responsibility', canonicalZh: '責任', aliasesZh: ['負責', '忠心管家'], forbiddenZh: ['財政', '賠償', '尋求'] },
    V005: { en: 'Perseverance', canonicalZh: '毅力', aliasesZh: ['堅持', '堅毅'], forbiddenZh: ['財政', '賠償', '尋求'] },
  };

  virtues.forEach((v) => {
    const std = semanticStandards[v.id];
    if (std) {
      if (v.nameEn !== std.en) {
        errors.push({
          type: 'ERROR',
          code: 'E_VIRTUE_SEMANTIC_EN',
          message: `Virtue ${v.id} English name must be canonical '${std.en}', but found '${v.nameEn}'`,
          target: v.id,
        });
        fiveVirtuesAvailable = false;
      }
      if (v.nameZh !== std.canonicalZh) {
        errors.push({
          type: 'ERROR',
          code: 'E_VIRTUE_SEMANTIC_ZH',
          message: `Virtue ${v.id} Chinese name must be canonical '${std.canonicalZh}', but found '${v.nameZh}'`,
          target: v.id,
        });
        fiveVirtuesAvailable = false;
      }
      for (const forbidden of std.forbiddenZh) {
        if (v.nameZh.includes(forbidden)) {
          errors.push({
            type: 'ERROR',
            code: 'E_VIRTUE_SEMANTIC_INVALID',
            message: `Virtue ${v.id} contains invalid/anomalous translation '${forbidden}' (not corresponding to canonical '${std.en}')`,
            target: v.id,
          });
          fiveVirtuesAvailable = false;
        }
      }
    }
  });

  // -------------------------------------------------------------------------
  // 5. Courage Lesson Completeness (S1 - S7)
  // -------------------------------------------------------------------------
  let courageLessonComplete = true;
  const courageLesson = lessons.find((l) => l.lessonId === 'LESSON_V001_COURAGE' || l.virtueId === 'V001');
  if (!courageLesson) {
    errors.push({
      type: 'ERROR',
      code: 'E_COURAGE_LESSON_MISSING',
      message: "Courage lesson ('LESSON_V001_COURAGE') was not found in lessons.json",
    });
    courageLessonComplete = false;
  } else {
    // Check 7 steps definition
    const stepKeys = ['welcome', 'story', 'verse', 'reflect', 'challenge', 'quiz', 'completion'];
    const definedSteps = Array.isArray(courageLesson.steps) ? courageLesson.steps : [];
    if (definedSteps.length !== 7) {
      errors.push({
        type: 'ERROR',
        code: 'E_COURAGE_STEP_COUNT',
        message: `Courage lesson must have 7 steps, but found ${definedSteps.length}`,
      });
      courageLessonComplete = false;
    }
    stepKeys.forEach((key, idx) => {
      const step = definedSteps.find((s: any) => s.key === key && s.id === idx + 1);
      if (!step) {
        errors.push({
          type: 'ERROR',
          code: 'E_COURAGE_STEP_MISSING',
          message: `Courage lesson is missing step ${idx + 1} (${key})`,
        });
        courageLessonComplete = false;
      }
    });

    // S1 Welcome
    if (!courageLesson.welcomeData || !courageLesson.welcomeData.bannerTitleZh || !courageLesson.welcomeData.learningGoals) {
      errors.push({ type: 'ERROR', code: 'E_COURAGE_S1_WELCOME', message: 'Courage lesson S1 Welcome data is incomplete' });
      courageLessonComplete = false;
    }
    // S2 Story
    const courageStory = stories.find((s) => s.storyId === courageLesson.bibleStoryId);
    if (!courageStory || !courageStory.storyActs || courageStory.storyActs.length < 3) {
      errors.push({ type: 'ERROR', code: 'E_COURAGE_S2_STORY', message: 'Courage lesson S2 Bible Story data is incomplete or has < 3 acts' });
      courageLessonComplete = false;
    }
    // S3 Verse
    const courageVerse = verses.find((v) => courageLesson.verseIds && courageLesson.verseIds.includes(v.verseId));
    if (!courageVerse || !courageVerse.textZh || !courageVerse.shortExplanationZh) {
      errors.push({ type: 'ERROR', code: 'E_COURAGE_S3_VERSE', message: 'Courage lesson S3 Bible Verse data is incomplete' });
      courageLessonComplete = false;
    }
    // S4 Reflection
    if (!Array.isArray(courageLesson.reflectionQuestions) || courageLesson.reflectionQuestions.length < 3) {
      errors.push({ type: 'ERROR', code: 'E_COURAGE_S4_REFLECT', message: 'Courage lesson S4 Reflection must have at least 3 questions' });
      courageLessonComplete = false;
    }
    // S5 Activity Practice
    const courageAct = activities.find((a) => a.activityId === courageLesson.activityId);
    if (!courageAct || !courageAct.title || !courageAct.completionCriteria) {
      errors.push({ type: 'ERROR', code: 'E_COURAGE_S5_ACTIVITY', message: 'Courage lesson S5 Activity Practice is incomplete' });
      courageLessonComplete = false;
    }
    // S6 Assessment
    const courageAssessments = assessments.filter((a) => a.virtueId === 'V001');
    if (courageAssessments.length < 3) {
      errors.push({ type: 'ERROR', code: 'E_COURAGE_S6_QUIZ', message: `Courage lesson S6 Quiz must have at least 3 questions (found ${courageAssessments.length})` });
      courageLessonComplete = false;
    }
    // S7 Completion
    if (!courageLesson.completionData || !courageLesson.completionData.congratsTitleZh) {
      errors.push({ type: 'ERROR', code: 'E_COURAGE_S7_COMPLETION', message: 'Courage lesson S7 Completion data is missing' });
      courageLessonComplete = false;
    }
  }

  // -------------------------------------------------------------------------
  // 6 & 7. 15 Assessments Available (3 per Virtue) & Schema Check
  // -------------------------------------------------------------------------
  const assessmentsPerVirtue: Record<string, number> = {
    V001: 0,
    V002: 0,
    V003: 0,
    V004: 0,
    V005: 0,
  };

  assessments.forEach((a, idx) => {
    // Count per virtue
    if (assessmentsPerVirtue[a.virtueId] !== undefined) {
      assessmentsPerVirtue[a.virtueId]++;
    } else {
      warnings.push({
        type: 'WARNING',
        code: 'W_ASSESSMENT_UNKNOWN_VIRTUE',
        message: `Assessment ${a.assessmentId} has unexpected virtueId '${a.virtueId}'`,
        target: a.assessmentId,
      });
    }

    // Required fields: assessmentId, lessonId, virtueId, question, options, correctAnswer, explanation, difficulty
    const requiredFields = [
      'assessmentId',
      'lessonId',
      'virtueId',
      'question',
      'options',
      'correctAnswer',
      'explanation',
      'difficulty',
    ];
    requiredFields.forEach((field) => {
      if (a[field] === undefined || a[field] === null || a[field] === '') {
        errors.push({
          type: 'ERROR',
          code: 'E_ASSESSMENT_FIELD_MISSING',
          message: `Assessment '${a.assessmentId || `index_${idx}`}' is missing required field '${field}'`,
          target: a.assessmentId,
        });
      }
    });

    // Options validation
    if (!Array.isArray(a.options) || a.options.length < 2) {
      errors.push({
        type: 'ERROR',
        code: 'E_ASSESSMENT_OPTIONS',
        message: `Assessment '${a.assessmentId}' options must be an array of at least 2 options`,
        target: a.assessmentId,
      });
    } else {
      const optionIds = a.options.map((opt: any) => opt.id);
      if (!optionIds.includes(a.correctAnswer)) {
        errors.push({
          type: 'ERROR',
          code: 'E_ASSESSMENT_CORRECT_ANSWER',
          message: `Assessment '${a.assessmentId}' correctAnswer '${a.correctAnswer}' does not match any option ID`,
          target: a.assessmentId,
        });
      }
    }
  });

  const totalAssessmentsValid = assessments.length === 15;
  const eachVirtueHasThree = requiredVirtueIds.every((vId) => assessmentsPerVirtue[vId] === 3);
  let assessmentsCountValid = true;

  if (!totalAssessmentsValid || !eachVirtueHasThree) {
    assessmentsCountValid = false;
    errors.push({
      type: 'ERROR',
      code: 'E_ASSESSMENTS_DISTRIBUTION',
      message: `Expected exactly 15 assessments (3 per virtue). Total: ${assessments.length}. Distribution: ${JSON.stringify(assessmentsPerVirtue)}`,
    });
  }

  // -------------------------------------------------------------------------
  // 8. Activity Schema Validation
  // -------------------------------------------------------------------------
  activities.forEach((act, idx) => {
    // Required fields: activityId, virtueId, title, description, difficulty, completionCriteria
    const requiredFields = ['activityId', 'virtueId', 'title', 'description', 'difficulty', 'completionCriteria'];
    requiredFields.forEach((field) => {
      if (!act[field] || typeof act[field] !== 'string' || act[field].trim() === '') {
        errors.push({
          type: 'ERROR',
          code: 'E_ACTIVITY_FIELD_MISSING',
          message: `Activity '${act.activityId || `index_${idx}`}' is missing required field '${field}'`,
          target: act.activityId,
        });
      }
    });
  });

  // -------------------------------------------------------------------------
  // 9. Orphan Records Check
  // -------------------------------------------------------------------------
  let noOrphanRecords = true;

  // Check if any verse is unreferenced
  const referencedVerseIds = new Set<string>();
  virtues.forEach((v) => v.coreBibleVerses?.forEach((id: string) => referencedVerseIds.add(id)));
  lessons.forEach((l) => l.verseIds?.forEach((id: string) => referencedVerseIds.add(id)));
  verses.forEach((v) => {
    if (!referencedVerseIds.has(v.verseId)) {
      warnings.push({
        type: 'WARNING',
        code: 'W_ORPHAN_VERSE',
        message: `Verse '${v.verseId}' is defined in verses.json but never referenced by any virtue or lesson`,
        target: v.verseId,
      });
      noOrphanRecords = false;
    }
  });

  // Check if any story is unreferenced
  const referencedStoryIds = new Set<string>();
  virtues.forEach((v) => v.relatedBibleStories?.forEach((id: string) => referencedStoryIds.add(id)));
  lessons.forEach((l) => referencedStoryIds.add(l.bibleStoryId));
  stories.forEach((s) => {
    if (!referencedStoryIds.has(s.storyId)) {
      warnings.push({
        type: 'WARNING',
        code: 'W_ORPHAN_STORY',
        message: `Story '${s.storyId}' is defined in stories.json but never referenced by any virtue or lesson`,
        target: s.storyId,
      });
      noOrphanRecords = false;
    }
  });

  // Check if any activity is unreferenced
  const referencedActivityIds = new Set<string>();
  virtues.forEach((v) => v.practiceActivities?.forEach((id: string) => referencedActivityIds.add(id)));
  lessons.forEach((l) => referencedActivityIds.add(l.activityId));
  activities.forEach((a) => {
    if (!referencedActivityIds.has(a.activityId)) {
      warnings.push({
        type: 'WARNING',
        code: 'W_ORPHAN_ACTIVITY',
        message: `Activity '${a.activityId}' is defined in activities.json but never referenced by any virtue or lesson`,
        target: a.activityId,
      });
      noOrphanRecords = false;
    }
  });

  // Check if any assessment is unreferenced
  const referencedAssessmentIds = new Set<string>();
  virtues.forEach((v) => v.assessmentIds?.forEach((id: string) => referencedAssessmentIds.add(id)));
  lessons.forEach((l) => {
    if (l.assessmentId) referencedAssessmentIds.add(l.assessmentId);
    l.assessmentIds?.forEach((id: string) => referencedAssessmentIds.add(id));
  });
  assessments.forEach((a) => {
    if (!referencedAssessmentIds.has(a.assessmentId)) {
      warnings.push({
        type: 'WARNING',
        code: 'W_ORPHAN_ASSESSMENT',
        message: `Assessment '${a.assessmentId}' is defined in assessments.json but never referenced by any virtue or lesson`,
        target: a.assessmentId,
      });
      noOrphanRecords = false;
    }
  });

  // -------------------------------------------------------------------------
  // Summary Checklist & Report Formulation
  // -------------------------------------------------------------------------
  const checklist: ValidationSummaryItem[] = [
    { key: 'jsonStructure', label: 'JSON structure valid', passed: jsonStructureValid },
    { key: 'idsUnique', label: 'IDs unique', passed: idsUnique },
    { key: 'relationshipsValid', label: 'Relationships valid', passed: relationshipsValid },
    { key: 'fiveVirtues', label: '5 virtues available', passed: fiveVirtuesAvailable },
    { key: 'courageLesson', label: 'Courage lesson complete', passed: courageLessonComplete },
    { key: 'fifteenAssessments', label: '15 assessments available', passed: assessmentsCountValid },
    { key: 'noOrphans', label: 'No orphan records', passed: noOrphanRecords },
  ];

  const isValid = errors.length === 0 && checklist.every((item) => item.passed);

  // Build formatted text matching the prompt requirements
  let outputFormattedText = 'VELS Data Validation\n';
  checklist.forEach((item) => {
    outputFormattedText += `${item.passed ? '✓' : '✗'} ${item.label}\n`;
  });

  if (errors.length > 0) {
    outputFormattedText += '\n[ERROR]\n';
    errors.forEach((err) => {
      outputFormattedText += `• (${err.code}) ${err.message}\n`;
    });
  }

  if (warnings.length > 0) {
    outputFormattedText += '\n[WARNING]\n';
    warnings.forEach((warn) => {
      outputFormattedText += `• (${warn.code}) ${warn.message}\n`;
    });
  }

  if (info.length > 0) {
    outputFormattedText += '\n[INFO]\n';
    info.forEach((inf) => {
      outputFormattedText += `• (${inf.code}) ${inf.message}\n`;
    });
  }

  return {
    isValid,
    checklist,
    errors,
    warnings,
    info,
    stats: {
      virtuesCount: virtues.length,
      versesCount: verses.length,
      storiesCount: stories.length,
      lessonsCount: lessons.length,
      activitiesCount: activities.length,
      assessmentsCount: assessments.length,
      assessmentsPerVirtue,
    },
    outputFormattedText,
  };
}
