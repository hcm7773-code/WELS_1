import React, { useState } from 'react';
import { 
  Code2, 
  Sparkles, 
  ShieldCheck, 
  Server, 
  Bot, 
  Copy, 
  Check, 
  Cpu, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const GeminiIntegrationGuide: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sampleServerCode = `// server/geminiTutor.ts (Express Backend)
import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// 1. 初始化 Google GenAI SDK (確保 GEMINI_API_KEY 僅存於伺服器環境變數)
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

// 2. 設定專為中學生設計的品格助教 System Instruction
const SYSTEM_INSTRUCTION = \`
你名為「以諾老師 (Mentor Enoch)」，是專為中學生設計的「VELS Mini (Virtue Education Learning System)」聖經品格教育 AI 助教。
你的對象是 12-18 歲的中學生，你的職責是溫暖陪伴、啟發思考，引導他們活出聖經中的五大核心美德：
1. 勇氣 (Courage)
2. 誠實 (Honesty)
3. 憐憫 (Compassion)
4. 責任 (Responsibility)
5. 堅持 (Perseverance)

回答原則：
- 語氣：親切、溫暖、具同理心，避免生硬說教或居高臨下的指責。
- 聖經連結：結合聖經人物故事（如大衛、但以理、好撒馬利亞人、約瑟、保羅）與適當金句。
- 蘇格拉底式引導：不要直接給死板標準答案，提出 2-3 個啟發性問題引導學生自我反思。
- 行動建議：給予一個日常生活中容易踏出的微小實踐步驟。
\`;

router.post('/api/tutor/chat', async (req, res) => {
  try {
    const { prompt, history } = req.body;
    
    // 呼叫 Gemini 2.5 Flash 模型 (快速、智能、合適青少年教育場景)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });

    res.json({
      reply: response.text,
      status: 'success'
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'AI 助教目前忙碌中，請稍後再試。' });
  }
});

export default router;`;

  const sampleClientHook = `// src/services/aiTutorService.ts (切換至真實 API 呼叫)
export async function generateTutorResponseWithGemini(userPrompt: string) {
  // 當已配置後端 API 時，直接向伺服器發送請求：
  const res = await fetch('/api/tutor/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: userPrompt }),
  });

  if (!res.ok) {
    throw new Error('API Request Failed');
  }

  const data = await res.json();
  return {
    text: data.reply,
    // 亦可請 Gemini 直接回傳 JSON 結構包含 thinkingPoints 與 bibleVerseTag
  };
}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-12">
      {/* Top Banner */}
      <div 
        id="api-guide-header"
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
          <Code2 className="w-3.5 h-3.5 text-amber-700" />
          <span>未來擴充指南</span>
          <span>•</span>
          <span>Gemini API Integration Guide</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          如何將 VELS Mini 接上 Google Gemini API
        </h1>
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Step-by-step Technical Roadmap for Live AI Integration
        </span>
        <p className="text-sm text-slate-600 leading-relaxed">
          VELS Mini 目前採用模組化架構，以本地智慧導師引擎模擬中學生品格教育情境。當準備好上線生產環境時，請遵循以下步驟無縫切換至 Google Gemini API。
        </p>
      </div>

      {/* 3 Core Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">取得與配置 API Key</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            在 Google AI Studio 申請 API Key，並配置於伺服器環境變數 <code className="bg-slate-100 px-1 py-0.5 rounded text-amber-800">GEMINI_API_KEY</code>。
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">建立後端 API 代理</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            透過 Express 建立 <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-800">/api/tutor/chat</code> 路由，確保金鑰絕不暴露給前端瀏覽器。
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">注入品格教育 Prompt</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            設定 System Instructions，約束模型遵循蘇格拉底式引導、溫暖同理與聖經人物價值觀。
          </p>
        </div>
      </div>

      {/* Backend Code Implementation Block */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
            <Server className="w-4 h-4" />
            <span>步驟一：後端 Express + @google/genai 實作範例</span>
          </div>
          <button
            onClick={() => handleCopy('server', sampleServerCode)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition-all text-white cursor-pointer"
          >
            {copiedSection === 'server' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>已複製程式碼</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>複製代碼</span>
              </>
            )}
          </button>
        </div>

        <pre className="text-xs font-mono bg-slate-950 p-4 rounded-2xl overflow-x-auto text-slate-300 leading-relaxed border border-slate-800">
          <code>{sampleServerCode}</code>
        </pre>
      </div>

      {/* Frontend Client Integration */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-400">
            <Cpu className="w-4 h-4" />
            <span>步驟二：前端 aiTutorService.ts 替換</span>
          </div>
          <button
            onClick={() => handleCopy('client', sampleClientHook)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 transition-all text-white cursor-pointer"
          >
            {copiedSection === 'client' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>已複製</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>複製代碼</span>
              </>
            )}
          </button>
        </div>

        <pre className="text-xs font-mono bg-slate-950 p-4 rounded-2xl overflow-x-auto text-slate-300 leading-relaxed border border-slate-800">
          <code>{sampleClientHook}</code>
        </pre>
      </div>

      {/* Safe AI Pedagogy Notice */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>中學生教育 AI 安全與品質建議</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside leading-relaxed">
          <li>
            <strong>內容安全過濾 (Safety Settings)：</strong>啟用 Gemini 預設嚴格安全門檻，封鎖霸凌、自殘、暴力與不當內容。
          </li>
          <li>
            <strong>結構化輸出 (Structured Outputs)：</strong>可以使用 <code className="bg-slate-100 px-1 rounded text-indigo-600">responseSchema</code> 要求 Gemini 回傳包含思考引導題與聖經經文的 JSON 物件。
          </li>
          <li>
            <strong>優選模型 (Model Selection)：</strong>推薦使用 <code className="bg-slate-100 px-1 rounded text-amber-700">gemini-2.5-flash</code>，回應速度極快（小於 1 秒），對話流暢且成本經濟。
          </li>
        </ul>
      </div>
    </div>
  );
};
