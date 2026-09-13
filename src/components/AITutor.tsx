import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Bot, Send, Sparkles, User, Volume2, RotateCcw, X, Lightbulb, BookOpen, ChevronRight, HelpCircle, Compass, ShieldCheck } from 'lucide-react';
import { TutorContext, TutorMessage } from '../ai/tutorTypes';
import { getStepInfo, getStepPresetQuestions, getStepWelcomeMessage } from '../ai/tutorPrompt';
import { askTutor } from '../ai/geminiTutor';
import { createTutorContext } from '../services/contentRepository';

interface AITutorProps {
  virtueIdOrCode?: string;
  stepNumber?: number;
  initialQuestion?: string;
  isOpen?: boolean;
  onClose?: () => void;
  mode?: 'drawer' | 'modal' | 'embedded';
  studentState?: {
    reflectionDraft?: string;
    quizScore?: number;
    selectedChallengeTitle?: string;
  };
  onClearInitialQuestion?: () => void;
}

export const AITutor: React.FC<AITutorProps> = ({
  virtueIdOrCode = 'courage',
  stepNumber = 1,
  initialQuestion,
  isOpen = true,
  onClose,
  mode = 'embedded',
  studentState,
  onClearInitialQuestion,
}) => {
  // Build dynamic Tutor Context based on active virtue and step
  const context: TutorContext = useMemo(() => {
    return createTutorContext(virtueIdOrCode, stepNumber, studentState);
  }, [virtueIdOrCode, stepNumber, studentState]);

  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or re-anchor greeting when virtue or step changes
  useEffect(() => {
    const welcomeMsg = getStepWelcomeMessage(context);
    setMessages([welcomeMsg]);
  }, [context.virtueId, context.currentStep.number]);

  // Handle incoming initial question
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim()) {
      handleSendMessage(initialQuestion.trim());
      if (onClearInitialQuestion) {
        onClearInitialQuestion();
      }
    }
  }, [initialQuestion]);

  // Scroll to bottom on new message or loading state change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setInputValue('');

    const userMessage: TutorMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const response = await askTutor({
        conversationHistory: updatedHistory,
        userMessage: query,
        context,
      });

      const assistantMessage: TutorMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.assistantMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thinkingPoints: response.thinkingPoints,
        suggestedQuestions: response.suggestedQuestions,
        bibleVerseTag: response.bibleVerseTag,
        stepGuidance: response.stepGuidance,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Failed to get AI Tutor response:', err);
      const errorMessage: TutorMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: '抱歉，導師連線稍有延遲。但請記得：神是我們在患難中隨時的幫助。請隨時再問我一次！',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    if (window.confirm('確定要重新開始與以諾老師的對話嗎？')) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setSpeakingMsgId(null);
      setMessages([getStepWelcomeMessage(context)]);
    }
  };

  const handleSpeech = (msgId: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingMsgId === msgId) {
        window.speechSynthesis.cancel();
        setSpeakingMsgId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.95;
      utterance.onstart = () => setSpeakingMsgId(msgId);
      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Quick preset questions for the current step
  const presetQuestions = useMemo(() => {
    return getStepPresetQuestions(context);
  }, [context]);

  // If used as drawer or modal and not open, don't render
  if ((mode === 'drawer' || mode === 'modal') && !isOpen) {
    return null;
  }

  const containerClasses =
    mode === 'drawer'
      ? 'fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white shadow-2xl flex flex-col border-l border-slate-200'
      : mode === 'modal'
      ? 'fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/40 backdrop-blur-xs'
      : 'w-full bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col overflow-hidden';

  const innerModalClasses =
    mode === 'modal'
      ? 'bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden'
      : 'flex-1 flex flex-col min-h-0';

  return (
    <div className={containerClasses}>
      <div className={innerModalClasses}>
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">VELS AI 導師 • 以諾老師</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                  v0.6.0 Prototype
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <span>{context.virtueNameZh} {context.virtueNameEn}</span>
                <span>•</span>
                <span className="text-indigo-400 font-semibold">{context.currentStep.code} {context.currentStep.titleZh}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetConversation}
              title="重新開始對話"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                title="關閉導師面板"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Step Pedagogical Guide Banner */}
        <div className="bg-indigo-50/80 border-b border-indigo-100 px-4 py-2.5 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-indigo-900 truncate">
            <Compass className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-medium truncate">
              {context.currentStep.code} 導引重點：{context.currentStep.pedagogicalRoleZh}
            </span>
          </div>
          <span className="text-[11px] text-indigo-600 shrink-0 font-semibold bg-white px-2 py-0.5 rounded-md border border-indigo-200">
            Step {context.currentStep.number}/7
          </span>
        </div>

        {/* Message Conversation Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[520px] bg-slate-50/50">
          {messages.map((msg) => {
            const isAssistant = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAssistant ? 'items-start' : 'items-end justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl p-4 shadow-xs text-sm leading-relaxed ${
                    isAssistant
                      ? 'bg-white border border-slate-200 text-slate-800'
                      : 'bg-indigo-600 text-white rounded-br-xs'
                  }`}
                >
                  {/* Message Content */}
                  <div className="whitespace-pre-line break-words">{msg.content}</div>

                  {/* Thinking Points Card for Socratic Guidance */}
                  {isAssistant && msg.thinkingPoints && msg.thinkingPoints.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>以諾老師的引導思考點：</span>
                      </div>
                      <ul className="space-y-1 pl-4 text-xs text-slate-600 list-disc">
                        {msg.thinkingPoints.map((tp, idx) => (
                          <li key={idx} className="leading-snug">
                            {tp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Bible Verse Tag */}
                  {isAssistant && msg.bibleVerseTag && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-start gap-1.5 text-xs text-indigo-700 bg-indigo-50/60 p-2 rounded-xl">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                      <span className="font-medium leading-snug">{msg.bibleVerseTag}</span>
                    </div>
                  )}

                  {/* Footer Meta & TTS */}
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{msg.timestamp || '剛剛'}</span>
                    {isAssistant && (
                      <button
                        onClick={() => handleSpeech(msg.id, msg.content)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-slate-100 transition-colors ${
                          speakingMsgId === msg.id ? 'text-indigo-600 font-semibold' : 'text-slate-500'
                        }`}
                        title="朗讀訊息"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{speakingMsgId === msg.id ? '播放中...' : '朗讀'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {!isAssistant && (
                  <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mb-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 animate-pulse mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs text-xs text-slate-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                <span>以諾老師正在結合 {context.currentStep.code} 課程與聖經脈絡為你思考...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Step-Aware Suggested Preset Question Chips */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>{context.currentStep.code} 常見思考提問：</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSendMessage(q)}
                className="text-left text-xs bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 px-2.5 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1 disabled:opacity-50"
              >
                <span className="truncate max-w-[280px]">{q}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              placeholder={`在 ${context.currentStep.code} 遇到想法？問問以諾老師...`}
              className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm px-4 py-2.5 rounded-2xl border border-transparent focus:border-indigo-500 focus:outline-hidden transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white disabled:text-slate-400 p-2.5 rounded-2xl transition-all shadow-xs shrink-0 cursor-pointer disabled:cursor-not-allowed"
              title="發送訊息"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>依據 VELS 官方品格課程標準回答</span>
            </span>
            <span>按 Enter 發送</span>
          </div>
        </div>
      </div>
    </div>
  );
};
