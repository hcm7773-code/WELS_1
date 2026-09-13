# VELS Mini
Virtue Education Learning System

## 1. Product Vision
中學生聖經品格教育學習系統。

專為中學生設計的數位品格培育與價值引導平台，結合聖經歷史典範人物、日常生活情境反思、微行動習慣操練與情境化測驗，幫助青少年在真實校園與家庭生活中建立堅韌、正直與同理的品格根基。

---

## 2. Target Users
- **中學生 (Middle / High School Students)**：透過情境式、故事化與 7 步驟微學習旅程，在日常面臨同儕壓力、課業挑戰與人際抉擇時獲得清晰引導。
- **教師與輔導老師 (Educators & Counselors)**：班級品格教育、生命教育課程、團契或晨間導讀的結構化教學輔助工具。
- **家長 (Parents)**：促進親子共讀與價值觀對話，理解青少年當前心理困擾並給予正向陪伴。

---

## 3. Core Virtues (Canonical Virtue Dictionary / 方案 B)
- **V001** = 勇氣 / Courage (別名 Alias: 勇敢, 無畏 / Bravery, Boldness)
- **V002** = 誠實 / Honesty (別名 Alias: 正直, 真實 / Integrity, Truthfulness)
- **V003** = 同情心 / Compassion (別名 Alias: 憐憫, 慈心 / Mercy, Kindness)
- **V004** = 責任 / Responsibility (別名 Alias: 負責, 忠心管家 / Faithfulness, Stewardship)
- **V005** = 毅力 / Perseverance (別名 Alias: 堅持, 堅毅 / Endurance, Persistence)

本系統首階段收錄 5 大核心品格（美德），採「Canonical Name（系統唯一正式名稱）+ Alias（教材／故事語境別名）」雙層架構：

| 代碼 | 正式英文 (Canonical En) | 正式中文 (Canonical Zh) | 常用別名 (Aliases) | 典範聖經人物 | 核心金句出處 | 實踐核心目標 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **V001** | Courage | 勇氣 | 勇敢、無畏 | 大衛 (David) | 撒母耳記上 17:45, 約書亞記 1:9 | 倚靠神的名，在恐懼與同儕壓力前堅持做對的事 |
| **V002** | Honesty | 誠實 | 正直、真實 | 但以理 (Daniel) | 箴言 12:22 | 言行一致、暗處純全，以愛心說誠實話 |
| **V003** | Compassion | 同情心 | 憐憫、慈心 | 好撒馬利亞人 (Good Samaritan) | 彌迦書 6:8 | 感同身受他人痛苦，跨出冷漠主動給予實質相助 |
| **V004** | Responsibility | 責任 | 負責、忠心管家 | 約瑟 (Joseph) | 歌羅西書 3:23 | 忠心做好交託的每件小事，不找藉口，使命必達 |
| **V005** | Perseverance | 毅力 | 堅持、堅毅 | 保羅 (Paul) | 加拉太書 6:9, 提摩太後書 4:7 | 行善不灰心，在瓶頸與逆境中持守善良直到收成 |

---

## 4. VELS 7-Step Learning Journey
每個美德課程皆遵循嚴謹的 7 步驟漸進式學習循環（Learning Cycle），引導學生由淺入深、知行合一：

- **S1 Welcome（歡迎導讀）**：啟發學習動機，明確定義美德內涵、中英對照與預估學習時間。
- **S2 Scripture（聖經故事）**：以適合青少年的現代生動敘事，透過 3 幕起承轉合（Act I / II / III）呈現聖經歷史場景與生命轉折點。
- **S3 Core Concept（核心金句與概念）**：聚焦經文核心原文意涵與白話解析，提供雙語對照與語音朗讀功能。
- **S4 Reflection（生活深度反思）**：提供 3 道貼近中學校園與內心糾葛的反思提問，引導學生記錄個人反思筆記。
- **S5 Virtue Practice（品格實踐挑戰）**：提供具體可行、可在 24 小時內落實的校園/生活微行動，支持承諾打卡與專屬勳章收集。
- **S6 Scenario Assessment（情境測驗）**：貼近校園生活的實際情境選擇題，即時給予答案解析與背後聖經原則指引。
- **S7 Completion（結業成就）**：收錄結業勉勵、聖經祝福經文，自動結算成就積分與累計學習進度。

---

## 5. Current MVP Features
- **Mobile-first UI**：以手機優先設計，所有觸控目標 ≥ 44px，底層響應式導覽適應不同螢幕大小。
- **Virtue navigation**：直覺美德卡片與清單切換，清楚標示每個美德的學習狀態與核心色系。
- **Lesson system**：解耦式結構化課程引擎，支援美德獨立進入與連續通關。
- **7-step learning journey**：嚴格落實 S1 至 S7 的進度步進與防呆狀態管理。
- **Bible stories**：專為青少年閱讀體驗改編的 3 幕故事結構與 Teen Takeaway 總結。
- **Bible verses**：支援中英雙語對照、Web Speech API 語音朗讀、一鍵複製與重點剖析。
- **Reflection**：引導式思考提示（Thought Prompts）與本機持久化思考筆記本。
- **Practice activities**：分級難度挑戰（輕鬆嘗試 / 中度挑戰 / 突破自我）與實踐承諾宣告。
- **Scenario assessment**：非死記硬背的校園人際情境題，強化道德推論與價值辨析。
- **Quiz**：自動評分、即時回饋、答題詳解與聖經核心原則解析。
- **Learning progress**：全域追蹤已完成美德數、已挑戰任務與測驗通過狀態。
- **Learning streak**：連續學習天數（Streak）記錄，激勵每日持續靈修與品格打卡。
- **Completion record**：本機 LocalStorage 資料持久化，隨時保存個人學習歷程。
- **AI Tutor interface**：溫暖同理的「以諾老師 (Mentor Enoch)」對話介面，採用蘇格拉底引導模式與常用情境預設提問。

---

## 6. Data Architecture
專案全面採用內容與展示分離（Content-UI Decoupling）架構，課程內容全部抽取並收錄於標準化 JSON 資料模型：

```text
src/data/
├── virtues.json          # 5 大美德主定義、中英文稱呼、描述與主題樣式
├── verses.json           # 核心聖經金句、中英對照與要點解析
├── stories.json          # 聖經人物故事（3 幕結構與青少年啟發）
├── lessons.json          # 課程配置與 7-Step 流程規格
├── activities.json       # 實踐行動選項、難度評級與通關標準
├── assessments.json      # 15 道情境測驗題（每美德 3 題）
└── dataValidation.ts     # 自動化資料完整性與關聯驗證引擎
```

---

## 7. Assessment
- 目前題庫共收錄 **15 道**情境測驗題。
- 嚴格遵守**每個 Virtue 配屬 3 題**之完整架構：
  - **V001 勇氣 (Courage)**：3 題（面對排擠、大衛甩石器鎧甲哲理、萬軍之耶和華之名）
  - **V002 誠實 (Honesty)**：3 題（考場作弊抉擇、但以理朝廷辦事純全、箴言 12:22 敬畏神的心）
  - **V003 同情心 (Compassion)**：3 題（受傷同儕相助、好撒馬利亞人比喻深刻反思、彌迦書 6:8 好憐憫之實踐）
  - **V004 責任 (Responsibility)**：3 題（分組報告瑣碎任務、約瑟在埃及監獄忠信、歌羅西書 3:23 如給主做）
  - **V005 毅力 (Perseverance)**：3 題（成績瓶頸不灰心、保羅跑盡當跑之路、加拉太書 6:9 到了時候必定收成）
- 每一題皆包含：`assessmentId`, `lessonId`, `virtueId`, `question`, `options`, `correctAnswer`, `explanation`, `difficulty`，並附帶 `scenarioZh` 與 `virtuePrinciple`。

---

## 8. Data Validation
專案內建專屬自動化資料檢驗器 `validateVELSData()` (`src/data/dataValidation.ts`)，在 Development Mode 啟動時自動執行，把關資料庫等級之一致性：

- **JSON validation**：確認 6 大資料檔案結構皆為合法且非空的陣列物件。
- **ID uniqueness**：嚴格檢查所有實體 ID（`id`, `verseId`, `storyId`, `lessonId`, `activityId`, `assessmentId`）在集合內部與跨模組的絕對唯一性。
- **Foreign-key validation**：完整驗證雙向外鍵約束（如 `lesson.virtueId` 存在於 virtues、`lesson.bibleStoryId` 存在於 stories、`lesson.verseIds` 存在於 verses、`lesson.activityId` 存在於 activities、`lesson.assessmentIds` 存在於 assessments）。
- **Courage S1-S7 validation**：深入檢驗 Courage 課程 S1 Welcome 至 S7 Completion 之全部 7 個步驟及附屬資料節點的完整度。
- **Assessment validation**：檢驗 15 題分佈、每個美德 3 題、選項合法性與正確答案存在性。
- **Activity validation**：檢驗活動難度、標題、說明與通關標準欄位。
- **Orphan record detection**：掃描孤立資料，確保沒有任何未被引用的金句、故事、活動或題目。

---

## 9. Current Technology
- **React** (v19 + Hooks)
- **TypeScript** (嚴格型別定義與靜態檢查)
- **Vite** (高效能前端建置工具)
- **Tailwind CSS** (響應式 Utility-First 樣式架構)
- **Lucide React** (一致化現代圖示庫)
- **JSON Mock Data** (規範化關聯式資料集)

---

## 10. Current Version
**VELS Mini v0.5.0**

---

## 11. Future Roadmap
- **v0.6 GitHub + Cursor**：建立正式開源/團隊協作儲存庫，導入 Cursor Rules 與敏捷開發流程。
- **v0.7 Gemini AI Tutor**：透過 Server-Side API 串接 Google Gemini API，實現真人在線般的動態共感陪伴。
- **v0.8 PostgreSQL**：遷移至關聯式資料庫，支援多用戶註冊、班級管理與成長歷史雲端同步。
- **v0.9 Neo4j Knowledge Graph**：建構聖經美德、人物歷史事件、金句與當代道德情境之知識圖譜。
- **v0.9+ RAG / GraphRAG**：導入圖譜檢索增強生成（GraphRAG），提供精準有據的品格解答。
- **v1.0 AI Character Education Copilot**：成為全球華語中學生、教師與家長的智慧品格教育副駕駛。

---

## 12. Development Principles
- **Data-driven architecture**：以結構化資料驅動前端呈現，核心邏輯不寫死於視圖元件中。
- **Mobile-first**：以青少年手機操作習慣為最高優先級，注重留白、字體大小與觸控反饋。
- **Modular components**：嚴格模組化拆分 UI 元件與服務層，確保維護性與可測試性。
- **Validation before expansion**：先完成資料模型與一致性校驗，再進行大規模內容擴展。
- **Separate content from UI**：文字、經文與題目全數抽離至資料層，方便多語系擴充與教師自訂教材。
- **Future database migration ready**：所有主外鍵命名與結構均相容關聯式資料庫（PostgreSQL Schema）標準。
- **Future RAG/GraphRAG ready**：實體與關聯屬性天然契合圖資料庫節點（Nodes）與關係（Edges）定義。
