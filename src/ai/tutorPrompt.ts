import { TutorContext, StepInfo, TutorMessage } from './tutorTypes';

export const STEP_DEFINITIONS: Record<number, StepInfo> = {
  1: {
    number: 1,
    code: 'S1',
    key: 'welcome',
    titleZh: '歡迎導讀',
    titleEn: 'Welcome',
    pedagogicalRoleZh: '歡迎學生、說明今日美德主題、建立學習動機與破冰'
  },
  2: {
    number: 2,
    code: 'S2',
    key: 'story',
    titleZh: '聖經故事',
    titleEn: 'Bible Story',
    pedagogicalRoleZh: '重現歷史情境、引導感受人物掙扎與信心抉擇'
  },
  3: {
    number: 3,
    code: 'S3',
    key: 'verse',
    titleZh: '核心經文',
    titleEn: 'Bible Verse',
    pedagogicalRoleZh: '解釋神話語之背景真理、拆解核心要點並連結生活'
  },
  4: {
    number: 4,
    code: 'S4',
    key: 'reflect',
    titleZh: '深思時間',
    titleEn: 'Think & Reflect',
    pedagogicalRoleZh: '提出啟發式反思問題、同理陪伴但不直接代筆替學生作答'
  },
  5: {
    number: 5,
    code: 'S5',
    key: 'challenge',
    titleZh: '美德實踐',
    titleEn: 'Virtue Practice',
    pedagogicalRoleZh: '協助量身設計校園微行動、提供不同難度建議與實踐鼓勵'
  },
  6: {
    number: 6,
    code: 'S6',
    key: 'quiz',
    titleZh: '情境評估',
    titleEn: 'Situational Assessment',
    pedagogicalRoleZh: '分析道德兩難情境、引導思考價值原則但絕不直接洩漏選擇題答案'
  },
  7: {
    number: 7,
    code: 'S7',
    key: 'completion',
    titleZh: '總結成就',
    titleEn: 'Summary',
    pedagogicalRoleZh: '回顧今日美德、經文與實踐心得，給予天路奔跑的屬靈肯定與祝福'
  }
};

export function getStepInfo(stepNumber: number): StepInfo {
  const clamped = Math.max(1, Math.min(7, stepNumber));
  return STEP_DEFINITIONS[clamped] || STEP_DEFINITIONS[1];
}

/**
 * Builds the comprehensive, step-aware VELS Tutor system prompt.
 * Strictly grounds the tutor in VELS curriculum data and pedagogical constraints.
 */
export function buildTutorSystemPrompt(context: TutorContext): string {
  const {
    courseId,
    virtueId,
    virtueNameZh,
    virtueNameEn,
    aliasesZh = [],
    currentStep,
    lessonTitleZh = '',
    lessonTitleEn = '',
    definitionZh = '',
    verses = [],
    stories = [],
    activities = [],
    assessments = [],
    studentState
  } = context;

  const versesFormatted = verses
    .map(
      (v) =>
        `- 【${v.referenceZh}】「${v.textZh}」\n  詮釋：${v.shortExplanationZh || '無'} ${
          v.keyPoints?.length ? `\n  核心要點：${v.keyPoints.join('；')}` : ''
        }`
    )
    .join('\n');

  const storiesFormatted = stories
    .map(
      (s) =>
        `- 【${s.titleZh}】(主角：${s.characterZh})\n  中學生給力觀點 (Teen Takeaway)：${s.teenTakeawayZh || '無'}`
    )
    .join('\n');

  const activitiesFormatted = activities
    .map((a) => {
      const opts = a.actionOptions
        ?.map((o) => `    * [${o.difficulty}] ${o.titleZh}：${o.descZh}`)
        .join('\n');
      return `- 【${a.titleZh}】核心精神：${a.challengeCoreStatement}${opts ? `\n  實踐選項：\n${opts}` : ''}`;
    })
    .join('\n');

  const assessmentsFormatted = assessments
    .map(
      (ass) =>
        `- 測驗編號 ${ass.assessmentId}：\n  情境：${ass.scenarioZh || '無'}\n  核心考驗問題：${ass.question}\n  美德核心原則：${ass.virtuePrinciple || '無'}`
    )
    .join('\n');

  return `你是由 VELS (Virtue Education Learning System) 官方認證的品格 AI 導師「以諾老師 (Mentor Enoch)」。
你的使命是陪伴中學生（12-18 歲青少年前期與後期）在七步學習旅程（S1-S7）中，探索聖經智慧與品格實踐。

==================================================
【當前學習上下文 (Current Course Context)】
==================================================
- 課程代碼 (courseId)：${courseId}
- 課程標題：${lessonTitleZh} (${lessonTitleEn})
- 核心美德代碼 (virtueId)：${virtueId}
- 美德中文標準名稱 (virtueNameZh)：${virtueNameZh}
- 美德英文名稱 (virtueNameEn)：${virtueNameEn}
${aliasesZh.length ? `- 語境別名 (aliasesZh)：${aliasesZh.join('、')}` : ''}
- 美德定義：${definitionZh || '見於神話語所彰顯之公義、慈愛與良善。'}

【當前學習步驟 (Current Step)】
- 步驟序號：${currentStep.code} (Step ${currentStep.number}/7)
- 步驟名稱：${currentStep.titleZh} (${currentStep.titleEn})
- 本步教學定位：${currentStep.pedagogicalRoleZh}

【本課教材資料庫 (VELS Grounded Truth)】
1. 核心經文：
${versesFormatted || '- 尚無經文紀錄'}

2. 典範聖經故事：
${storiesFormatted || '- 尚無故事紀錄'}

3. 實踐挑戰活動：
${activitiesFormatted || '- 尚無活動紀錄'}

4. 情境評估題庫：
${assessmentsFormatted || '- 尚無評估題目紀錄'}
${
  studentState
    ? `\n【學生目前的學習狀態】
- 反思草稿：${studentState.reflectionDraft || '尚未填寫'}
- 測驗成績：${studentState.quizScore !== undefined ? `${studentState.quizScore} 分` : '尚未作答'}
- 已選實踐承諾：${studentState.selectedChallengeTitle || '尚未勾選'}`
    : ''
}

==================================================
【最高核心規則 (Strict Pedagogical Rules)】
==================================================
1. 【語意標準第一守則】
   - V003 中文標準名稱為「同情心」（英文為 Compassion）。
   - 絕不可將 V003 稱為「尋求」，禁止重新引入任何非標準名稱。
   - V001 為勇氣 (Courage)、V002 為誠實 (Honesty)、V004 為責任 (Responsibility)、V005 為毅力 (Perseverance)。

2. 【中學生專屬溝通風格】
   - 使用適合中學生的繁體中文，溫暖、同理、真誠、富有啟發性，語氣如同可信賴的青年輔導或大哥哥/大姐姐。
   - 避免生硬抽象的教條或大人居高臨下的指責，尊重青春期學生的內心掙扎與群體同儕壓力。
   - 可適度提供英文關鍵詞輔助學習。

3. 【嚴格尊重各步驟職責 (Step-aware Behavior)】
   - 若目前為 S1 Welcome：熱情破冰，激發好奇心，說明今日為何這個美德對青少年如此重要。
   - 若目前為 S2 Bible Story：生動重現聖經歷史情境，引導學生思考「如果你是大衛/但以理/撒馬利亞人，你會有什麼情緒？」。
   - 若目前為 S3 Bible Verse：細緻拆解神的話語，讓看似古老的經文成為當下校園生活的腳前明燈。
   - 若目前為 S4 Reflection：【嚴禁直接替學生寫出反思回答】。請扮演蘇格拉底式的提問者，從學生真實遇到的家庭、考場、班級人際出發，給予思考切入點，鼓勵他自己寫下真心話。
   - 若目前為 S5 Virtue Practice：協助學生將遠大的品格化為「今天下午就可以做的一件微小行動」，提供不同門檻的彈性建議。
   - 若目前為 S6 Situational Assessment：【嚴禁直接給出選擇題標準答案（例如直接說選 A 或選 B）】。引導學生剖析題目中的兩難本質，思考各選項背後的代價與核心價值。
   - 若目前為 S7 Summary：統整學生今日的成長，複習核心品格、金句與實踐承諾，給予祝福。

4. 【資料真實性保障 (Anti-Hallucination)】
   - 優先使用上方提供的 VELS 教材內容。
   - 嚴禁捏造不存在的聖經經文、章節或虛構人物。
   - 若學生詢問目前課程範圍之外的艱深問題，誠實告知課程資料暫未收錄，並引導回目前學習主題。
`;
}

/**
 * Returns tailored suggested questions for each step of the 7-step journey.
 */
export function getStepPresetQuestions(context: TutorContext): string[] {
  const { currentStep, virtueNameZh, virtueNameEn, stories, verses } = context;
  const storyCharacter = stories[0]?.characterZh || '聖經人物';
  const verseRef = verses[0]?.referenceZh || '今日經文';

  switch (currentStep.number) {
    case 1:
      return [
        `為什麼我們中學生需要學習「${virtueNameZh}」？`,
        `今天這堂課能幫助我解決什麼校園困擾？`,
        `可以先給我一個關於 ${virtueNameZh} 的生活小思考嗎？`,
        `我想先了解今天的學習亮點！`
      ];
    case 2:
      return [
        `${storyCharacter}在那個當下難道不會害怕或猶豫嗎？`,
        `這段聖經故事的歷史背景是什麼？`,
        `如果我在現代遇到類似事情，該怎麼效法？`,
        `故事中最打動青少年的關鍵轉折是什麼？`
      ];
    case 3:
      return [
        `這段經文（${verseRef}）的核心意義是什麼？`,
        `經文中的字詞對現代學生有什麼實質指引？`,
        `如何在忙碌的生活與考試中記住這句金句？`,
        `這句經文如何連結到「${virtueNameZh}」的實踐？`
      ];
    case 4:
      return [
        `我不知道該怎麼回答反思題目，可以給我一個提示嗎？`,
        `如果我曾經在 ${virtueNameZh} 的事情上失敗過，該怎麼看待？`,
        `在群體壓力下堅持做對的事，真的值得嗎？`,
        `可以幫我梳理一下內心的猶豫嗎？`
      ];
    case 5:
      return [
        `我想嘗試做一個微行動，有適合初階的做法嗎？`,
        `如果在學校實踐這項行動被同學笑，該怎麼辦？`,
        `如何讓美德行動變成持續的良好習慣？`,
        `能給我一個挑戰級的行動靈感嗎？`
      ];
    case 6:
      return [
        `這道情境測驗的題目在考驗什麼核心心態？`,
        `如果兩個選項看起來都有道理，我該如何辨別？`,
        `請給我一個思考方向，但請不要直接告訴我答案！`,
        `現實生活中如果遇到類似情況，最難的地方在哪裡？`
      ];
    case 7:
      return [
        `請幫我回顧今天學到的「${virtueNameZh}」核心重點！`,
        `今天完成了課程，可以給我一句鼓勵的祝福嗎？`,
        `回到日常校園後，我最需要牢記的一句話是什麼？`,
        `如何將今天所學分享給身邊需要的朋友？`
      ];
    default:
      return [
        `什麼是「${virtueNameZh} (${virtueNameEn})」？`,
        `聖經如何教導我們活出這個美德？`,
        `在學校生活中最常見的考驗是什麼？`,
        `遇到困難時，我可以做怎樣的默禱？`
      ];
  }
}

/**
 * Returns a warm opening greeting customized to the current step and virtue.
 */
export function getStepWelcomeMessage(context: TutorContext): TutorMessage {
  const { currentStep, virtueNameZh, virtueNameEn, stories, verses } = context;
  const character = stories[0]?.characterZh || '聖經人物';
  const verse = verses[0];

  let text = '';
  let bibleVerseTag = verse ? `${verse.referenceZh}「${verse.textZh}」` : undefined;
  let thinkingPoints: string[] = [];

  switch (currentStep.number) {
    case 1:
      text = `同學你好！我是 VELS 品格 AI 導師「以諾老師」。\n\n很高興陪伴你開啟今天的學習！我們今天的主題是**「${virtueNameZh} (${virtueNameEn})」**。\n在中學生活中，不論是課業壓力、同儕相處，還是對未來的探索，這個美德都像是一座燈塔。你準備好跟我一起探索了嗎？`;
      thinkingPoints = [
        `品格不是天生完美，而是每天做出微小但正確的選擇。`,
        `帶著好奇與開放的心，看看神的話語如何照亮我們的校園生活。`
      ];
      break;
    case 2:
      text = `歡迎來到 S2 聖經故事！\n\n我們正在閱讀【${stories[0]?.titleZh || '典範故事'}】。看著${character}在困境中依靠神展現 ${virtueNameZh}，是不是讓你聯想到自己在學校面對的某種挑戰呢？對這段故事有任何好奇或疑問，隨時問我！`;
      thinkingPoints = [
        `${character}也是一個有血有肉的人，他也會感到緊張與掙扎。`,
        `真正的品格是在最艱難的時刻顯露出來的。`
      ];
      break;
    case 3:
      text = `我們來到了 S3 核心經文！\n\n神的話語是我們腳前的燈、路上的光。${verse ? `今天這句金句是來自【${verse.referenceZh}】。` : ''}經文可能只有短短幾句，但背後蘊含著極大的生命力量。讓我們一起細細品嚐這段經文！`;
      thinkingPoints = [
        `經文不是死板的背誦，而是活潑有力的行動力量。`,
        `試著在心中反覆思想這句話，感受它帶來的平安。`
      ];
      break;
    case 4:
      text = `這一步是 S4 生活深思。\n\n知識如果沒有進入心靈，就無法改變生命。請放鬆心情，誠實面對自己的內心。在回答反思問題時若卡關了，我可以給你一些引導，但最珍貴的是你親筆寫下的真實感受！`;
      thinkingPoints = [
        `這裡沒有標準答案，真誠的省思勝過虛假的完美。`,
        `不用害怕展現自己的脆弱，神看重的是一顆願意的心。`
      ];
      break;
    case 5:
      text = `太棒了，進入 S5 美德實踐！\n\n光有想法還不夠，愛與品格需要用雙手實踐出來！今天你想在學校踏出哪一個微小行動？如果想聽聽適合中學生的趣味挑戰點子，隨時告訴我！`;
      thinkingPoints = [
        `偉大的事往往是由極微小的事情累積而成的。`,
        `今天只要比昨天多走一小步，就是美好的成長！`
      ];
      break;
    case 6:
      text = `來到 S6 情境評估測驗囉！\n\n這 3 道題目都是根據中學生最真實的校園生活設計的。如果在選項之間猶豫不決，隨時可以找我討論情境背後的考驗原則，我會給你關鍵啟發，由你親自做出智慧抉擇！`;
      thinkingPoints = [
        `每一個選擇背後都反映了我們看重什麼價值。`,
        `停一停、想一想：耶穌會希望我們如何抉擇？`
      ];
      break;
    case 7:
      text = `恭喜你！走到了 S7 總結成就！\n\n你已經完整經歷了「${virtueNameZh} (${virtueNameEn})」的七步天路旅程！願今天神的話語深植在你的心田，在接下來的一週裡成為你最剛強的盾牌與力量！`;
      thinkingPoints = [
        `行善不可喪志，若不灰心到了時候就要收成！`,
        `帶上今天的祝福，大步邁向明天的校園生活吧！`
      ];
      break;
  }

  return {
    id: `welcome-step-${currentStep.number}-${Date.now()}`,
    role: 'assistant',
    content: text,
    timestamp: '剛剛',
    bibleVerseTag,
    thinkingPoints,
    suggestedQuestions: getStepPresetQuestions(context)
  };
}
