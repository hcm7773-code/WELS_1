import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { PRESET_TUTOR_QUESTIONS } from '../data/virtuesData';
import { generateTutorResponse } from '../services/aiTutorService';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Volume2, 
  RefreshCw, 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  MessageSquare,
  Flame,
  Check
} from 'lucide-react';

interface AITutorViewProps {
  initialQuestion?: string;
  onClearInitialQuestion?: () => void;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  initialQuestion,
  onClearInitialQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `同學你好！我是 VELS 品格 AI 助教「以諾老師 (Mentor Enoch)」。\n\n在中學校園生活中，我們常常遇到很多不確定、人際壓力和內心拔河——比如朋友要你看作弊答案、面對被嘲笑的恐懼、或是讀書感到疲憊想放棄。\n\n在這裡，你可以放心地提出任何真實的問題。我不只會給你一個標準答案，而是會陪伴你從聖經品格與人物的智慧中，找到屬於你的勇氣與方向。今天有什麼放在心上的事想聊聊嗎？`,
      timestamp: '剛剛',
      thinkingPoints: [
        '任何真實的困惑都是品格成長的起點。',
        '聖經人物也曾身處與我們相似的掙扎與考驗。',
        '做對的選擇往往需要勇氣，但神必與你同在。'
      ],
      bibleVerseTag: '箴言 4:23「你要保守你心，勝過保守一切，因為一生的果效是由心發出。」',
      suggestedQuestions: [
        '好朋友考試想偷看我答案，我不給會破壞友情嗎？',
        '看到同學在班上被排擠，我不敢出聲怎麼辦？',
        '做什麼事都提不起勁，聖經怎麼看「堅持」的意義？'
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle incoming initial question (e.g. from lesson detail)
  useEffect(() => {
    if (initialQuestion) {
      handleSend(initialQuestion);
      if (onClearInitialQuestion) {
        onClearInitialQuestion();
      }
    }
  }, [initialQuestion]);

  const handleSend = async (textToSend?: string) => {
    const question = (textToSend || inputVal).trim();
    if (!question || isTyping) return;

    setInputVal('');

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await generateTutorResponse(question, messages);
      const assistantMsg: ChatMessage = {
        id: 'assistant-' + Date.now(),
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thinkingPoints: response.thinkingPoints,
        bibleVerseTag: response.bibleVerseTag,
        suggestedQuestions: response.suggestedQuestions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: 'error-' + Date.now(),
        sender: 'assistant',
        text: '抱歉，剛才連線稍有延遲。但請記得：神是我們在患難中隨時的幫助。請隨時再問我一次！',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSpeech = (msgId: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingId === msgId) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.95;
      utterance.onstart = () => setSpeakingId(msgId);
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('確定要重新開始對話嗎？')) {
      window.speechSynthesis?.cancel();
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'assistant',
          text: '對話已重置。我是以諾老師，隨時準備好與你探討品格、信仰與生活！',
          timestamp: '剛剛',
          suggestedQuestions: [
            '勇氣與衝動有什麼不同？',
            '誠實一定會帶來好的結果嗎？',
            '如何對不喜歡的人產生憐憫之心？'
          ]
        }
      ]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-24 md:pb-10">
      {/* Header Profile Card */}
      <div 
        id="ai-tutor-header"
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-amber-500 text-white flex items-center justify-center shadow-md">
              <Bot className="w-8 h-8" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                以諾老師 (Mentor Enoch)
              </h1>
              <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                AI 品格助教
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Bible Character Education AI Teaching Assistant • 蘇格拉底式引導提問
            </p>
          </div>
        </div>

        <button
          id="clear-chat-btn"
          onClick={handleClearHistory}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>重新開始對話</span>
        </button>
      </div>

      {/* Preset Student Questions Quick Picks */}
      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80">
        <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>中學生常見問題推薦（點擊直接向以諾老師提問）：</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PRESET_TUTOR_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              id={`preset-q-${idx}`}
              onClick={() => handleSend(item.question)}
              className="shrink-0 px-3 py-1.5 bg-white hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-semibold transition-all shadow-2xs text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-amber-700 block">
                [{item.category}]
              </span>
              <span className="truncate max-w-[240px] block">{item.question}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div 
        id="ai-chat-messages-container"
        className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs min-h-[420px] max-h-[580px] overflow-y-auto space-y-6"
      >
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          const isAudioPlaying = speakingId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${isAssistant ? 'items-start' : 'items-start flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs font-bold text-sm ${
                  isAssistant
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-amber-300'
                }`}
              >
                {isAssistant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>

              {/* Message Content Bubble */}
              <div className={`max-w-[85%] sm:max-w-[78%] space-y-2.5 ${isAssistant ? 'text-left' : 'text-left'}`}>
                <div
                  className={`p-4 sm:p-5 rounded-3xl text-sm leading-relaxed shadow-xs ${
                    isAssistant
                      ? 'bg-slate-50 border border-slate-200/80 text-slate-800'
                      : 'bg-indigo-600 text-white rounded-tr-xs'
                  }`}
                >
                  <p className="whitespace-pre-line font-normal">{msg.text}</p>

                  {/* Bible Verse Tag if present */}
                  {msg.bibleVerseTag && (
                    <div className="mt-3 pt-3 border-t border-slate-200 flex items-start gap-2 bg-amber-50/90 text-amber-950 p-2.5 rounded-xl border border-amber-200/80 text-xs">
                      <BookOpen className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-amber-900">聖經基石經文：</span>
                        <span>{msg.bibleVerseTag}</span>
                      </div>
                    </div>
                  )}

                  {/* Socratic Thinking Points if present */}
                  {msg.thinkingPoints && msg.thinkingPoints.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs space-y-1.5">
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>以諾老師引導你思考的 3 個問題：</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                        {msg.thinkingPoints.map((tp, idx) => (
                          <li key={idx}>{tp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Controls for message */}
                <div className="flex items-center gap-3 px-2 text-[11px] text-slate-700">
                  <span>{msg.timestamp}</span>

                  {isAssistant && (
                    <button
                      onClick={() => handleSpeech(msg.id, msg.text)}
                      className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                        isAudioPlaying ? 'text-amber-600 animate-pulse' : 'hover:text-indigo-600'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isAudioPlaying ? '停止朗讀' : '語音朗讀'}</span>
                    </button>
                  )}
                </div>

                {/* Suggested follow up questions */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {msg.suggestedQuestions.map((sq, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sq)}
                        className="text-[11px] font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200 transition-all text-left cursor-pointer"
                      >
                        💬 {sq}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 animate-spin" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              <span className="font-semibold text-slate-600 ml-1">
                以諾老師正在為你思考聖經智慧與引導問題...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box (Large Accessible Button & Responsive Field) */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            id="tutor-chat-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isTyping}
            placeholder="輸入任何關於學校、同儕、家庭或品格的問題..."
            className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 placeholder:text-slate-400"
          />

          <button
            id="tutor-chat-send-btn"
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className={`px-5 sm:px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              !inputVal.trim() || isTyping
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md active:scale-98'
            }`}
          >
            <span className="hidden sm:inline">提問</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[11px] text-slate-700 px-3 pt-2">
          <span>AI 助教遵循溫暖、引導思考與聖經價值原則</span>
          <span>按 Enter 送出</span>
        </div>
      </div>
    </div>
  );
};
