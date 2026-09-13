import React, { useState, useEffect, useMemo } from 'react';
import { Virtue, VirtueId, UserProgress } from '../types';
import { assembleInteractiveLesson, getLessonSteps } from '../services/contentRepository';
import { AITutor } from './AITutor';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  Save, 
  Bot, 
  Award, 
  ShieldAlert, 
  Check, 
  RotateCcw, 
  HelpCircle, 
  ChevronRight, 
  Home, 
  Flame, 
  CheckSquare, 
  Clock, 
  Target
} from 'lucide-react';

interface LessonDetailViewProps {
  virtues: Virtue[];
  currentVirtueId: VirtueId;
  progress: UserProgress;
  onSelectVirtue: (id: VirtueId) => void;
  onSaveReflection: (id: VirtueId, text: string) => void;
  onToggleActivity: (id: VirtueId) => void;
  onMarkLessonCompleted: (id: VirtueId) => void;
  onAskAITutor: (question: string) => void;
  onTakeQuiz: (id: VirtueId) => void;
  onSaveQuizScore?: (virtueId: VirtueId, score: number, total: number) => void;
  initialStep?: number;
  onReturnToDashboard?: () => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  virtues,
  currentVirtueId,
  progress,
  onSelectVirtue,
  onSaveReflection,
  onToggleActivity,
  onMarkLessonCompleted,
  onAskAITutor,
  onSaveQuizScore,
  initialStep = 1,
  onReturnToDashboard,
}) => {
  const virtue = virtues.find((v) => v.id === currentVirtueId) || virtues[0];
  const currentIndex = virtues.findIndex((v) => v.id === virtue.id);

  // Dynamically assemble content model v0.1 data from JSON repository
  const lessonData = useMemo(() => assembleInteractiveLesson(virtue.id), [virtue.id]);
  const lessonSteps = useMemo(() => getLessonSteps(virtue.id), [virtue.id]);

  // Lesson Step State (1 to 7)
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  // When initialStep prop changes
  useEffect(() => {
    if (initialStep >= 1 && initialStep <= 7) {
      setCurrentStep(initialStep);
    }
  }, [initialStep]);

  // Audio Reading state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Step 4 Reflection State: 3 questions individual inputs
  const [answers, setAnswers] = useState<Record<string, string>>({
    'q1-fear': '',
    'q2-david': '',
    'q3-school': '',
  });
  const [reflectionSaveToast, setReflectionSaveToast] = useState(false);

  // VELS v0.6.0 AI Tutor Companion State
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  const [aiTutorCustomQuestion, setAiTutorCustomQuestion] = useState<string | undefined>(undefined);

  const handleOpenAITutor = (prompt?: string) => {
    setAiTutorCustomQuestion(prompt);
    setIsAITutorOpen(true);
  };

  // Load any existing saved reflection for this virtue
  useEffect(() => {
    const saved = progress.reflections[virtue.id] || '';
    if (saved) {
      // Split or set into answers if available
      setAnswers((prev) => ({
        ...prev,
        'q1-fear': prev['q1-fear'] || saved,
      }));
    }
  }, [virtue.id, progress.reflections]);

  // Step 5 Challenge State
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    progress.selectedChallengeId?.[virtue.id] ||
      lessonData.courageChallenge.actionOptions[0]?.id ||
      'action-kindness'
  );
  const isChallengeCommitted = progress.completedActivities.includes(virtue.id);

  // Step 6 Quiz State
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [calculatedScore, setCalculatedScore] = useState<number>(
    progress.quizScores[virtue.id]?.score ?? 0
  );

  // Synchronize initial score if already taken
  useEffect(() => {
    if (progress.quizScores[virtue.id]) {
      setCalculatedScore(progress.quizScores[virtue.id].score);
    }
  }, [virtue.id, progress.quizScores]);

  // Handle TTS audio reading
  const handleReadText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Step Navigation
  const goToStep = (stepNumber: number) => {
    if (stepNumber < 1) stepNumber = 1;
    if (stepNumber > 7) stepNumber = 7;
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    if (currentStep < 7) {
      const next = currentStep + 1;
      goToStep(next);

      // Trigger automatic progress updates as student progresses
      if (currentStep === 4) {
        // Automatically save reflection if answers provided
        handleSaveAllReflections();
      }
      if (next === 7) {
        // Complete the lesson!
        onMarkLessonCompleted(virtue.id);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  // Step 4: Save reflection
  const handleSaveAllReflections = () => {
    const combined = [
      answers['q1-fear'] ? `【最近害怕面對】：${answers['q1-fear']}` : '',
      answers['q2-david'] ? `【若我是大衛】：${answers['q2-david']}` : '',
      answers['q3-school'] ? `【校園生活實踐】：${answers['q3-school']}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    onSaveReflection(virtue.id, combined || answers['q1-fear'] || '已完成反思');
    setReflectionSaveToast(true);
    setTimeout(() => setReflectionSaveToast(false), 2200);
  };

  // Step 5: Toggle Challenge
  const handleCommitChallenge = (actionId: string) => {
    setSelectedChallengeId(actionId);
    if (!isChallengeCommitted) {
      onToggleActivity(virtue.id);
    }
  };

  // Step 6: Quiz Answer Selection
  const handleSelectQuizOption = (questionId: string, optionId: string) => {
    if (quizSubmitted) return; // locked after submission unless retake
    setSelectedQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Step 6: Submit Quiz
  const handleSubmitQuiz = () => {
    let score = 0;
    const questions = lessonData.miniQuiz.questions;
    questions.forEach((q) => {
      if (selectedQuizAnswers[q.id] === q.correctOptionId) {
        score += 1;
      }
    });
    setCalculatedScore(score);
    setQuizSubmitted(true);

    if (onSaveQuizScore) {
      onSaveQuizScore(virtue.id, score, questions.length);
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Progress percentage calculation
  const progressPercent = Math.round((currentStep / 7) * 100);

  return (
    <div className="space-y-5 pb-20 max-w-3xl mx-auto">
      {/* 1. Top Virtue Switcher Carousel */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {virtues.map((v, idx) => {
          const isCurrent = v.id === virtue.id;
          const isDone = progress.completedLessons.includes(v.id);
          return (
            <button
              key={v.id}
              id={`lesson-selector-tab-${v.id}`}
              onClick={() => {
                onSelectVirtue(v.id);
                setCurrentStep(1);
              }}
              className={`flex-1 min-w-[96px] py-2 px-3 rounded-2xl border text-center transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-purple-900 text-white border-purple-800 shadow-md font-bold ring-2 ring-amber-400/40'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50/50'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[11px]">
                <span className={isCurrent ? 'text-amber-300 font-extrabold' : 'text-slate-400'}>
                  0{idx + 1}
                </span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="text-sm font-black truncate">{v.nameZh}</div>
              <div className={`text-[10px] tracking-tight truncate uppercase ${isCurrent ? 'text-purple-200' : 'text-slate-400'}`}>
                {v.nameEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Interactive 7-Step Stepper Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black border border-purple-200">
              第 {currentStep} 步 / 共 7 步
            </span>
            <span className="text-xs font-bold text-slate-500">
              {lessonSteps[currentStep - 1]?.titleZh}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="open-ai-tutor-stepper-btn"
              onClick={() => handleOpenAITutor()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-xs transition-all cursor-pointer"
              title="開啟以諾老師 AI 導師伴讀"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI 導師伴讀</span>
              <span className="bg-indigo-500/80 text-[10px] px-1 py-0.2 rounded-md">S{currentStep}</span>
            </button>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>進度 {progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3.5">
          <div
            className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 7 Interactive Step Pills (Scrollable on small mobile) */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
          {lessonSteps.map((s) => {
            const isPassed = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            return (
              <button
                key={s.id}
                id={`stepper-btn-${s.id}`}
                onClick={() => goToStep(s.id)}
                className={`py-1.5 px-1 rounded-xl text-center flex flex-col items-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-purple-900 text-white font-extrabold shadow-sm scale-102 ring-1 ring-amber-400'
                    : isPassed
                    ? 'bg-purple-50 text-purple-800 hover:bg-purple-100 font-semibold'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
                title={s.titleZh}
              >
                <span className="text-[10px] leading-none mb-0.5">
                  {isPassed ? '✓' : `S${s.id}`}
                </span>
                <span className="text-[11px] truncate max-w-full font-bold">
                  {s.titleZh.slice(0, 2)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          STEP 1: Welcome 歡迎導讀
         ========================================================================= */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Step 1 — Welcome</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
              {lessonData.welcome.bannerTitleZh}
            </h1>
            <p className="text-purple-200 text-sm sm:text-base leading-relaxed mb-5">
              {lessonData.welcome.subtitleZh}
            </p>

            {/* Definition Box */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-white/15 mb-6">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                美德簡短定義 Core Definition
              </span>
              <p className="text-white text-base sm:text-lg font-bold leading-relaxed">
                {lessonData.welcome.definitionZh}
              </p>
              <p className="text-purple-200/90 text-xs sm:text-sm mt-1.5 italic font-sans">
                "{lessonData.welcome.definitionEn}"
              </p>
            </div>

            {/* Learning Goals */}
            <div className="space-y-2.5 bg-black/20 rounded-2xl p-4 border border-white/10">
              <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-400" />
                <span>本單元學習目標 Learning Goals ({lessonData.welcome.estimatedMinutes} 分鐘)</span>
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-purple-100">
                {lessonData.welcome.learningGoals.map((goal, gIdx) => (
                  <li key={gIdx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {gIdx + 1}
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warm-up Callout */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-950 flex items-start gap-3">
            <span className="text-2xl shrink-0">💡</span>
            <div className="text-xs sm:text-sm leading-relaxed">
              <span className="font-extrabold block text-amber-900 mb-0.5">課前暖身小思考：</span>
              {lessonData.welcome.warmupQuestionZh}
            </div>
          </div>

          {/* S1 AI Tutor Quick Access */}
          <div className="flex justify-end">
            <button
              onClick={() => handleOpenAITutor(`我想了解更多關於「${virtue.nameZh}」在今天的學習亮點！`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-600" />
              <span>問問 AI 導師今日學習重點</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 2: Bible Story 聖經故事 (David and Goliath)
         ========================================================================= */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-black mb-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Step 2 — Bible Story</span>
                  <span>•</span>
                  <span>閱讀時間約 3 分鐘</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {lessonData.bibleStory.titleZh}
                </h2>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block mt-0.5">
                  Character: {lessonData.bibleStory.characterZh}
                </span>
              </div>

              <button
                id="listen-story-btn"
                onClick={() =>
                  handleReadText(
                    lessonData.bibleStory.storyActs
                      .map((act) => `${act.actTitle}。${act.content}`)
                      .join(' ')
                  )
                }
                className={`self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAudio ? '朗讀中...' : '聆聽故事朗讀'}</span>
              </button>
            </div>

            {/* 3 Story Acts */}
            <div className="space-y-4">
              {lessonData.bibleStory.storyActs.map((act) => (
                <div
                  key={act.actNumber}
                  className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-black text-purple-900">
                      {act.actTitle}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      第 {act.actNumber} 幕
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {act.content}
                  </p>
                  {act.highlight && (
                    <div className="bg-amber-100/60 text-amber-900 rounded-xl px-3 py-2 text-xs font-bold border-l-3 border-amber-500">
                      ⭐ 關鍵時刻：{act.highlight}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Teen Key Takeaway */}
            <div className="bg-gradient-to-r from-purple-50 via-amber-50 to-purple-50 rounded-2xl p-5 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-purple-900 font-black text-sm sm:text-base">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>給中學生的生命啟發 Key Takeaway</span>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm font-bold leading-relaxed">
                {lessonData.bibleStory.teenTakeawayZh}
              </p>
              <p className="text-slate-500 text-xs italic">
                "{lessonData.bibleStory.teenTakeawayEn}"
              </p>
            </div>

            {/* S2 AI Story Tutor Quick Access */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => handleOpenAITutor(`關於${lessonData.bibleStory.characterZh}的故事，我想向以諾老師請教歷史背景與人物心情！`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                <span>向 AI 導師詢問聖經故事細節</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 3: Bible Verse 核心金句 (1 Samuel 17:45)
         ========================================================================= */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Step 3 — Bible Verse 核心金句</span>
              </div>

              <button
                id="listen-verse-btn"
                onClick={() =>
                  handleReadText(
                    `${lessonData.bibleVerse.referenceZh}。${lessonData.bibleVerse.textZh}`
                  )
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAudio ? '朗讀中...' : '聆聽金句'}</span>
              </button>
            </div>

            {/* Scripture Golden Plaque */}
            <div className="bg-gradient-to-br from-amber-50 via-white to-purple-50/40 rounded-3xl p-6 sm:p-7 border border-amber-300/80 shadow-xs relative space-y-3">
              <div className="text-xs font-black text-amber-800 uppercase tracking-widest">
                Scripture Memory • 每日背誦
              </div>

              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                「{lessonData.bibleVerse.textZh}」
              </p>

              <span className="text-sm font-extrabold text-purple-900 block pt-1">
                — {lessonData.bibleVerse.referenceZh}
              </span>

              <div className="text-xs sm:text-sm text-slate-600 italic border-t border-amber-200/60 pt-3 leading-relaxed">
                "{lessonData.bibleVerse.textEn}"
                <span className="font-semibold text-slate-700 not-italic block mt-1">
                  — {lessonData.bibleVerse.referenceEn}
                </span>
              </div>
            </div>

            {/* Short Explanation */}
            <div className="bg-purple-50/70 rounded-2xl p-5 border border-purple-100 space-y-2">
              <h3 className="text-sm font-black text-purple-900 flex items-center gap-1.5">
                <span>📖 經文簡短解釋 Short Explanation</span>
              </h3>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
                {lessonData.bibleVerse.shortExplanationZh}
              </p>
            </div>

            {/* 3 Key Concepts */}
            <div className="space-y-2.5">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                🔍 關鍵字詞對比解密 Key Contrasts
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {lessonData.bibleVerse.keyPoints.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs space-y-1"
                  >
                    <span className="font-black text-purple-900 block">
                      {point.keyword}
                    </span>
                    <p className="text-slate-600 leading-normal">
                      {point.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* S3 AI Verse Tutor Quick Access */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => handleOpenAITutor(`這句經文「${lessonData.bibleVerse.textZh}」如何應用在現代中學生的校園生活中？`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <Bot className="w-3.5 h-3.5 text-amber-700" />
                <span>向 AI 導師請教金句在現代的應用</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 4: Think & Reflect 深思時間 (3 Reflection Questions)
         ========================================================================= */}
      {currentStep === 4 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black">
                <span>Step 4 — Think & Reflect 深思時間</span>
              </div>

              {reflectionSaveToast && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 animate-fade-in">
                  <Check className="w-3.5 h-3.5" /> 已自動儲存筆記
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {lessonData.thinkAndReflect.titleZh}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                {lessonData.thinkAndReflect.introZh}
              </p>
            </div>

            {/* 3 Reflection Question Input Cards */}
            <div className="space-y-4">
              {lessonData.thinkAndReflect.reflectionQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2.5"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-900 text-amber-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {q.number}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900">
                        {q.questionZh}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {q.promptZh}
                      </p>
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 self-center mr-1">
                      思考靈感：
                    </span>
                    {q.suggestedThoughts.map((thought, tIdx) => (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => {
                          const curr = answers[q.id] || '';
                          const updated = curr ? `${curr}、${thought}` : thought;
                          setAnswers((prev) => ({ ...prev, [q.id]: updated }));
                        }}
                        className="text-[11px] font-semibold bg-white hover:bg-purple-100 text-purple-900 px-2 py-0.5 rounded-lg border border-purple-200 transition-all cursor-pointer"
                      >
                        + {thought}
                      </button>
                    ))}
                  </div>

                  {/* Textarea */}
                  <textarea
                    id={`reflection-input-${q.id}`}
                    rows={2}
                    value={answers[q.id] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAnswers((prev) => ({ ...prev, [q.id]: val }));
                    }}
                    placeholder={q.placeholderZh}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white"
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
              <button
                id="save-reflection-btn"
                onClick={handleSaveAllReflections}
                className="px-5 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4 text-amber-300" />
                <span>儲存我的反思心得筆記</span>
              </button>

              <button
                id="ask-tutor-reflection-btn"
                onClick={() => {
                  const prompt = `我想討論${virtue.nameZh}課程的反思：面對生活中的挑戰，如何活出聖經人物的榜樣？`;
                  handleOpenAITutor(prompt);
                  onAskAITutor(prompt);
                }}
                className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-purple-200"
              >
                <Bot className="w-3.5 h-3.5 text-purple-600" />
                <span>向 AI 導師諮詢深思指引</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 5: Courage Challenge 勇氣挑戰 (1-day activity)
         ========================================================================= */}
      {currentStep === 5 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>Step 5 — {lessonData.courageChallenge.titleZh}</span>
              </div>

              {isChallengeCommitted && (
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 已承諾挑戰！
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {lessonData.courageChallenge.titleZh}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                {lessonData.courageChallenge.subtitleZh}
              </p>
            </div>

            {/* Main Statement Banner */}
            <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-2xl p-4 sm:p-5 text-purple-950 font-black text-base sm:text-lg shadow-sm border border-amber-300 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-900 text-amber-300 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold text-purple-900 block">
                  今日行動口號 Daily Action
                </span>
                <span>{lessonData.courageChallenge.challengeCoreStatement}</span>
              </div>
            </div>

            {/* 3 Practical Action Cards to Select */}
            <div className="space-y-2.5">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                請點選一項你今天承諾完成的品格微行動：
              </span>
              <div className="space-y-2.5">
                {lessonData.courageChallenge.actionOptions.map((opt) => {
                  const isSelected = selectedChallengeId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      id={`challenge-option-${opt.id}`}
                      onClick={() => setSelectedChallengeId(opt.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-purple-50/80 border-purple-600 shadow-xs ring-1 ring-purple-600'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isSelected
                            ? 'bg-purple-900 text-white'
                            : 'border-2 border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-xs font-black text-purple-900">
                            {opt.titleZh}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              opt.difficulty === '突破自我'
                                ? 'bg-rose-100 text-rose-700'
                                : opt.difficulty === '中度挑戰'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {opt.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {opt.descZh}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Commitment Action Button */}
            <button
              id="commit-challenge-btn"
              onClick={() => handleCommitChallenge(selectedChallengeId)}
              className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md ${
                isChallengeCommitted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-800 hover:to-indigo-800 text-white shadow-purple-900/20'
              }`}
            >
              <Award className="w-5 h-5 text-amber-400" />
              <span>
                {isChallengeCommitted
                  ? `✓ 已承諾！解鎖：${lessonData.courageChallenge.badgeName} (點擊可切換打卡)`
                  : `我承諾今天完成這項行動！點擊打卡解鎖${lessonData.courageChallenge.badgeName}`}
              </span>
            </button>

            {/* S5 AI Challenge Tutor Quick Access */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => handleOpenAITutor(`我想在學校實踐「${virtue.nameZh}」，能給我量身推薦適合初階的微行動靈感嗎？`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                <span>向 AI 導師尋求微行動靈感</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 6: Mini Quiz 情境測驗 (3 Questions)
         ========================================================================= */}
      {currentStep === 6 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-xs font-black">
                <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
                <span>Step 6 — Mini Quiz 勇氣情境測驗</span>
              </div>

              {quizSubmitted && (
                <div className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  得分：{calculatedScore} / {lessonData.miniQuiz.questions.length} 分
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {lessonData.miniQuiz.titleZh}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                {lessonData.miniQuiz.descriptionZh}
              </p>
            </div>

            {/* 3 Questions */}
            <div className="space-y-6">
              {lessonData.miniQuiz.questions.map((q, qIndex) => {
                const userChoice = selectedQuizAnswers[q.id];
                const isCorrect = userChoice === q.correctOptionId;

                return (
                  <div
                    key={q.id}
                    id={`quiz-item-${q.id}`}
                    className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-900 text-amber-300 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {qIndex + 1}
                      </span>
                      <div>
                        {q.scenarioZh && (
                          <p className="text-xs text-slate-500 mb-1 font-medium">
                            情境：{q.scenarioZh}
                          </p>
                        )}
                        <h3 className="text-sm sm:text-base font-black text-slate-900">
                          {q.questionZh}
                        </h3>
                      </div>
                    </div>

                    {/* 4 Options */}
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isThisChosen = userChoice === opt.id;
                        const isThisCorrect = opt.id === q.correctOptionId;

                        let styleClasses =
                          'bg-white border-slate-200 hover:bg-slate-100 text-slate-800';

                        if (quizSubmitted) {
                          if (isThisCorrect) {
                            styleClasses =
                              'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500';
                          } else if (isThisChosen && !isThisCorrect) {
                            styleClasses =
                              'bg-rose-50 border-rose-400 text-rose-950 line-through';
                          } else {
                            styleClasses = 'bg-white border-slate-200 text-slate-400';
                          }
                        } else if (isThisChosen) {
                          styleClasses =
                            'bg-purple-900 text-white border-purple-900 font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={opt.id}
                            id={`option-${q.id}-${opt.id}`}
                            type="button"
                            onClick={() => handleSelectQuizOption(q.id, opt.id)}
                            disabled={quizSubmitted}
                            className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-2.5 transition-all cursor-pointer ${styleClasses}`}
                          >
                            <span
                              className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 ${
                                isThisChosen && !quizSubmitted
                                  ? 'bg-amber-400 text-purple-950'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span className="flex-1 leading-snug">{opt.textZh}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {quizSubmitted && (
                      <div
                        className={`rounded-xl p-3.5 text-xs space-y-1.5 border animate-fade-in ${
                          isCorrect
                            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                            : 'bg-amber-50/80 border-amber-200 text-amber-950'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-black">
                          {isCorrect ? (
                            <span className="text-emerald-700">✓ 回答正確！</span>
                          ) : (
                            <span className="text-amber-800">
                              ✕ 正確答案是：{q.correctOptionId}
                            </span>
                          )}
                        </div>
                        <p className="leading-relaxed">{q.explanationZh}</p>
                        {q.virtuePrincipleZh && (
                          <div className="pt-1 font-bold text-purple-900 border-t border-slate-200/60">
                            ⭐ 品格原則：{q.virtuePrincipleZh}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Bottom */}
            <div className="pt-2">
              {!quizSubmitted ? (
                <button
                  id="submit-quiz-answers-btn"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedQuizAnswers).length === 0}
                  className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                    Object.keys(selectedQuizAnswers).length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-purple-900 hover:bg-purple-800 text-white'
                  }`}
                >
                  <CheckSquare className="w-4 h-4 text-amber-400" />
                  <span>
                    提交測驗答案 (已選 {Object.keys(selectedQuizAnswers).length} /{' '}
                    {lessonData.miniQuiz.questions.length} 題)
                  </span>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="retake-quiz-btn"
                    onClick={handleRetakeQuiz}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>重新測驗一次</span>
                  </button>

                  <button
                    id="go-to-completion-btn"
                    onClick={() => goToStep(7)}
                    className="flex-1 w-full py-3 px-6 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <span>查看成果並進入結業</span>
                    <ChevronRight className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              )}
            </div>

            {/* S6 AI Quiz Guidance Tutor Quick Access */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => handleOpenAITutor(`在「${virtue.nameZh}」情境測驗中，如果我對題目有疑惑，可以給我一個思考方向的思維濾鏡提示嗎？`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                <span>題目卡關？索取 AI 思維原則提示</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 7: Completion 結業成就 (Congratulations & Wrap-up)
         ========================================================================= */}
      {currentStep === 7 && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg text-center relative overflow-hidden space-y-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-300 text-purple-950 flex items-center justify-center shadow-lg transform -rotate-3 ring-4 ring-amber-400/30">
              <Award className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black mb-2">
                <span>🎉 課程順利完成 Course Completed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {lessonData.completion.congratsTitleZh}
              </h1>
              <p className="text-purple-200 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                {lessonData.completion.congratsSubtitleZh}
              </p>
            </div>

            {/* Achievement Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              {/* Card 1: Lesson Status */}
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15">
                <span className="text-[11px] font-bold text-amber-300 block uppercase">
                  課程進度
                </span>
                <span className="text-base font-black text-white block mt-0.5">
                  100% 全部完成
                </span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 已記錄至學習歷程
                </span>
              </div>

              {/* Card 2: Quiz Score */}
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15">
                <span className="text-[11px] font-bold text-amber-300 block uppercase">
                  測驗評分 Quiz Score
                </span>
                <span className="text-base font-black text-white block mt-0.5">
                  {calculatedScore} / {lessonData.miniQuiz.questions.length} 題正確
                </span>
                <span className="text-xs text-amber-300 font-bold block mt-1">
                  {calculatedScore === lessonData.miniQuiz.questions.length
                    ? '🏆 滿分！大衛信心勇者'
                    : '⭐ 良好！持續操練剛強'}
                </span>
              </div>

              {/* Card 3: Today's Action */}
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15">
                <span className="text-[11px] font-bold text-amber-300 block uppercase">
                  今日實踐承諾
                </span>
                <span className="text-xs font-black text-white block mt-0.5 line-clamp-2">
                  {lessonData.courageChallenge.challengeCoreStatement}
                </span>
                <span className="text-xs text-purple-200 font-medium block mt-1">
                  徽章：{lessonData.courageChallenge.badgeName}
                </span>
              </div>
            </div>

            {/* Encouragement Message */}
            <div className="bg-white/10 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-purple-100 leading-relaxed border border-white/15 text-left space-y-2">
              <span className="text-amber-300 font-black block">
                💌 給你的品格勉勵信：
              </span>
              <p>{lessonData.completion.encouragementMessageZh}</p>
              <div className="pt-2 border-t border-white/10 text-amber-200 font-bold text-xs italic">
                {lessonData.completion.bibleBlessingZh}
              </div>
            </div>

            {/* Completion Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
              <button
                id="return-to-dashboard-btn"
                onClick={() => {
                  if (onReturnToDashboard) {
                    onReturnToDashboard();
                  } else {
                    window.location.reload();
                  }
                }}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-purple-950 text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Home className="w-4 h-4" />
                <span>返回首頁查看今日成就</span>
              </button>

              <button
                id="talk-to-tutor-after-lesson-btn"
                onClick={() => {
                  const prompt = `我剛剛完成了 ${virtue.nameEn} ${virtue.nameZh}課程，我想跟你分享今天在學校要挑戰的事！`;
                  handleOpenAITutor(prompt);
                  onAskAITutor(prompt);
                }}
                className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/20"
              >
                <Bot className="w-4 h-4 text-amber-300" />
                <span>找 AI 導師聊聊今日心得與祝福</span>
              </button>

              <button
                id="review-from-step1-btn"
                onClick={() => goToStep(1)}
                className="px-4 py-2.5 rounded-2xl text-purple-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重新複習</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          Bottom Step Controller (Previous Step / Next Step Buttons)
         ========================================================================= */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <button
          id="lesson-prev-step-btn"
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className={`px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            currentStep === 1
              ? 'opacity-40 cursor-not-allowed text-slate-400 border-slate-200'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 cursor-pointer shadow-2xs'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>上一步 ({currentStep > 1 ? lessonSteps[currentStep - 2]?.titleZh : '已是第一步'})</span>
        </button>

        {currentStep < 7 ? (
          <button
            id="lesson-next-step-btn"
            onClick={handleNextStep}
            className="px-6 py-3 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>下一步 ({lessonSteps[currentStep]?.titleZh})</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        ) : (
          <button
            id="lesson-finish-btn"
            onClick={() => {
              if (onReturnToDashboard) {
                onReturnToDashboard();
              }
            }}
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-purple-950 text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>完成課程並返回首頁</span>
          </button>
        )}
      </div>

      {/* Persistent Floating AI Tutor Button */}
      <div className="fixed bottom-20 md:bottom-8 right-4 sm:right-8 z-40">
        <button
          id="floating-ai-tutor-summon-btn"
          onClick={() => handleOpenAITutor()}
          className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-indigo-400/30"
          title="隨時呼叫以諾老師 AI 導師伴讀"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-indigo-600 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-none">AI 導師伴讀</div>
            <div className="text-[10px] text-indigo-200 mt-0.5">S{currentStep} {lessonSteps[currentStep - 1]?.titleZh || '導引'}</div>
          </div>
        </button>
      </div>

      {/* VELS v0.6.0 AI Tutor Modal */}
      {isAITutorOpen && (
        <AITutor
          virtueIdOrCode={virtue.id}
          stepNumber={currentStep}
          isOpen={isAITutorOpen}
          onClose={() => {
            setIsAITutorOpen(false);
            setAiTutorCustomQuestion(undefined);
          }}
          mode="modal"
          initialQuestion={aiTutorCustomQuestion}
          onClearInitialQuestion={() => setAiTutorCustomQuestion(undefined)}
          studentState={{
            reflectionDraft: Object.values(answers).filter(Boolean).join('\n'),
            quizScore: calculatedScore,
            selectedChallengeTitle: lessonData.courageChallenge.actionOptions.find((o) => o.id === selectedChallengeId)?.titleZh,
          }}
        />
      )}
    </div>
  );
};
