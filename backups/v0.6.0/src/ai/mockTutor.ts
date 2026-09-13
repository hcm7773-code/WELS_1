import { TutorRequest, TutorResponse } from './tutorTypes';

/**
 * High-quality, context-aware Mock AI Tutor.
 * Serves as the reliable local prototype and fallback when live Gemini API is unreachable or offline.
 * Adheres strictly to Socratic pedagogy for secondary school students.
 */
export function getMockTutorResponse(request: TutorRequest): TutorResponse {
  const { userMessage, context } = request;
  const prompt = userMessage.trim().toLowerCase();
  const stepNumber = context.currentStep.number;
  const virtueNameZh = context.virtueNameZh; // '同情心', '勇氣', '誠實', '責任', '毅力'
  const virtueNameEn = context.virtueNameEn;
  const primaryVerse = context.verses[0];
  const primaryStory = context.stories[0];

  const defaultVerseTag = primaryVerse
    ? `${primaryVerse.referenceZh}「${primaryVerse.textZh}」`
    : undefined;

  // -------------------------------------------------------------
  // Specific query: "什麼是同情心？" / Compassion definition
  // -------------------------------------------------------------
  if (
    context.virtueId === 'V003' ||
    context.virtueCode === 'compassion' ||
    prompt.includes('同情心') ||
    prompt.includes('憐憫')
  ) {
    if (prompt.includes('什麼是') || prompt.includes('定義') || prompt.includes('意思') || prompt.includes('怎麼做')) {
      return {
        assistantMessage: `同情心 (Compassion) 就是**「看見別人的需要與痛苦，感同身受，並且願意用實際行動伸出援手」**。\n\n它不只是一時的情緒或是高高在上的同情，而是像好撒馬利亞人一樣，跨越冷漠與隔閡，彎下腰來陪伴、扶持脆弱的人。\n\n在學校生活中，同情心可以非常具體：當看見同學被孤立、心情低落或是弄丟了東西，主動問一句「還好嗎？需要我幫忙嗎？」，就是基督同情心之愛的流露！你可以想想看，最近身邊有沒有哪位同學，正需要這一份溫暖的同情心？`,
        thinkingPoints: [
          '同情心與「可憐別人」有什麼不同？（前者是站在平等的位置同行相助）',
          '當看見別人遇到困難，是什麼阻礙了我們伸出雙手？是害羞、害怕麻煩，還是冷漠？',
          '彌迦書 6:8 提醒我們「好憐憫」，這如何成為我們每日活出的生命品格？'
        ],
        bibleVerseTag: '彌迦書 6:8「只要你行公義，好憐憫，存謙卑的心，與你的神同行。」',
        suggestedQuestions: [
          '如果需要幫助的同學脾氣很怪，我該如何表達同情心？',
          '同情心在班級團體中如何化為具體行動？',
          '好撒馬利亞人為什麼願意停下腳步幫助陌生人？'
        ],
        stepGuidance: '同情心是從「看見」到「動心」，再到「行動」的完整過程。',
        source: 'mock'
      };
    }
  }

  // -------------------------------------------------------------
  // Step-aware Routing: S1 to S7
  // -------------------------------------------------------------

  // S1: Welcome & Motivation
  if (stepNumber === 1 || prompt.includes('亮點') || prompt.includes('為什麼需要') || prompt.includes('這堂課')) {
    return {
      assistantMessage: `哈囉同學！學習「${virtueNameZh} (${virtueNameEn})」對中學生來說，是建構強大內心世界的關鍵拼圖！\n\n在中學校園裡，我們每天都會面臨各種微小的抉擇：是要迎合群體還是堅持正直？是要冷漠旁觀還是給予同情心與幫助？是要輕言放棄還是堅持跑完？\n\n今天這堂課不是死板的教條，而是要帶你透過聖經中【${primaryStory?.characterZh || '典範人物'}】的傳奇經歷，發現神賜給青少年的真正力量。跟著七步旅程一步一步往前走，你會發現自己比想像中更有影響力！`,
      thinkingPoints: [
        `真正的強大不是從不跌倒，而是在每次選擇中朝向神的心意前進。`,
        `今天給自己 10 分鐘的專注時間，好好沉澱並裝備這項美德。`
      ],
      bibleVerseTag: defaultVerseTag,
      suggestedQuestions: [
        `這堂課的七個步驟分別有什麼意義？`,
        `聖經人物在青少年時期也會遇到迷惘嗎？`,
        `如何將這堂課的內容應用在今天的學校生活中？`
      ],
      stepGuidance: 'S1 導讀階段：保持好奇與期待，預備好心田領受神的話語。',
      source: 'mock'
    };
  }

  // S2: Scripture & Bible Story Explanation
  if (stepNumber === 2 || prompt.includes('歷史背景') || prompt.includes('故事') || prompt.includes('為什麼會') || prompt.includes('害怕')) {
    return {
      assistantMessage: `關於【${primaryStory?.titleZh || '聖經故事'}】，這是一個極具戲劇性與張力的歷史現場！\n\n請想像一下當時的真實氛圍：${primaryStory?.characterZh || '聖經主角'}並不是什麼刀槍不入的超級英雄，他也會感到緊張、壓力甚至面對眾人的質疑。但他之所以能在關鍵時刻活出「${virtueNameZh}」，是因為他把目光從「眼前的困難」轉向了**「全能且信實的神」**。\n\n在中學生生活中，我們也常常面臨自己的「巨人」或「考驗」——可能是考試的焦慮、同儕的排擠，或是對未來的擔憂。聖經的故事告訴我們：只要有神同在，弱小的少年也能成就非凡的美德！`,
      thinkingPoints: [
        `${primaryStory?.characterZh || '主角'}在做出抉擇前，內心最關鍵的倚靠是什麼？`,
        `如果換成是你站在那個歷史現場，你最擔心的會是什麼？`,
        `這個故事帶給你最大的 Teen Takeaway（中學生給力觀點）是什麼？`
      ],
      bibleVerseTag: defaultVerseTag,
      suggestedQuestions: [
        `如果我在學校也遇到巨大的同儕壓力，該如何效法？`,
        `為什麼周圍的大人都退縮時，少年卻能挺身而出？`,
        `聖經中還有哪些人物也展現過類似的生命特質？`
      ],
      stepGuidance: 'S2 故事階段：深入人物的心理與信仰核心，找到與自身生活的共鳴。',
      source: 'mock'
    };
  }

  // S3: Core Bible Verse Deep-Dive
  if (stepNumber === 3 || prompt.includes('經文') || prompt.includes('金句') || prompt.includes('在說什麼') || prompt.includes('怎麼理解')) {
    return {
      assistantMessage: `這節核心經文【${primaryVerse?.referenceZh || '今日金句'}】蘊含著非常深刻的生活智慧：\n\n「${primaryVerse?.textZh || ''}」\n\n在希伯來文與聖經脈絡中，這句話不只是一句美麗的座右銘，而是一把能解開日常生活困境的「鑰匙」！\n${primaryVerse?.shortExplanationZh ? `\n👉 核心意涵：${primaryVerse.shortExplanationZh}\n` : ''}\n當你在學校感到孤單、困惑或是面臨挑戰時，你可以試著在心裡默背這句經文。神的話語帶有能力，能在你心裡種下平安與堅定！`,
      thinkingPoints: [
        `這句經文中最觸動你心靈的一個詞是什麼？為什麼？`,
        `在忙碌的考試與補習生活中，你通常用什麼方式讓自己安靜下來？`,
        `神應許祂的同在，這對你的日常生活帶來什麼實質安全感？`
      ],
      bibleVerseTag: defaultVerseTag,
      suggestedQuestions: [
        `如何養成每天默想這句金句的習慣？`,
        `這句經文如何轉化為具體的校園人際行動？`,
        `經文中的應許在什麼情況下最能帶給我安慰？`
      ],
      stepGuidance: 'S3 經文階段：反覆咀嚼字句背後的真理，讓神的話成為力量泉源。',
      source: 'mock'
    };
  }

  // S4: Deep Reflection (Non-authoring, purely inspiring Socratic questions)
  if (stepNumber === 4 || prompt.includes('不知道怎麼寫') || prompt.includes('反思') || prompt.includes('提示') || prompt.includes('卡關') || prompt.includes('回答')) {
    return {
      assistantMessage: `很棒！你願意誠實說出「不知道怎麼寫」或是感到卡關，這本身就是最真實、最珍貴的反思起點！\n\n在 S4 深思時間裡，以諾老師**絕不會直接幫你寫出制式答案**，因為任何抄來的漂亮句子都比不上你心中最真誠的一句感受。你可以試著從以下三個方向想一想：\n\n1. **回想一個畫面**：最近一兩週在學校、補習班或家裡，有沒有哪一刻讓你感到猶豫或掙扎？\n2. **辨認心中的情緒**：那時候你心裡最深處在擔心什麼？是害怕被同學討厭、怕考不好，還是覺得太累了？\n3. **對話與交託**：如果現在神就在你身旁聽你說話，你想對祂說一句什麼心裡話？\n\n試著拿起筆或在輸入框裡，先寫下一小句話就好。真實，就是成長的第一步！`,
      thinkingPoints: [
        `神接納我們所有的真實情感，包括迷惘、害怕與軟弱。`,
        `深思不是為了交作業，而是為了讓心靈與真理對話。`,
        `只要寫出你心中真實的想法，就是最棒的反思！`
      ],
      bibleVerseTag: defaultVerseTag,
      suggestedQuestions: [
        `如果我寫出來的感想很不屬靈，神會接納嗎？`,
        `我該如何把內心的軟弱轉化為禱告？`,
        `反思之後，我的下一步可以是什麼？`
      ],
      stepGuidance: 'S4 深思階段：導師提供思考角度與同理，由學生親自寫下心靈答案。',
      source: 'mock'
    };
  }

  // S5: Virtue Practice & Action Plan
  if (stepNumber === 5 || prompt.includes('實踐') || prompt.includes('挑戰') || prompt.includes('微行動') || prompt.includes('怎麼做') || prompt.includes('初階')) {
    return {
      assistantMessage: `太讚了！能把美德從大腦的認知化為腳步的實踐，這正是 VELS 學習的核心靈魂！\n\n關於「${virtueNameZh}」的微行動，以諾老師為你整理了不同難度的實踐靈感，你可以依自己的步調選擇：\n\n🌱 **初階微行動 (Easy)**：\n- 在今天向一位心情低落或被忽略的同學說一句真誠的問候。\n- 在心裡默默為一位很難相處的同學做一個 30 秒的祝福禱告。\n\n🌿 **進階微行動 (Medium)**：\n- 當班上有人在起鬨嘲笑某個同學時，不跟著起鬨，並溫和地轉移話題。\n- 誠實面對一項拖延很久的作業，設鬧鐘專注完成 15 分鐘。\n\n🌳 **挑戰級微行動 (Hard)**：\n- 主動約一位常落單的同學一起吃午餐或討論功課。\n- 鼓起勇氣私下向一位好朋友坦白並為之前的小誤會道歉。\n\n你今天想挑戰哪一個？選一個最有感動的，跨出信心的第一步吧！`,
      thinkingPoints: [
        `行動不在於轟轟烈烈，而在於持之以恆的微小善意。`,
        `每一個奉神之名伸出的溫暖舉動，都能在校園中帶出光芒。`
      ],
      bibleVerseTag: defaultVerseTag,
      suggestedQuestions: [
        `如果我實踐微行動時對方沒有好的反應，該怎麼調適？`,
        `如何讓微行動變成每天自然的校園習慣？`,
        `可以和我一起為今天選定的挑戰做個禱告嗎？`
      ],
      stepGuidance: 'S5 實踐階段：鼓勵可執行的微小行動，降低起步門檻，累積品格信心。',
      source: 'mock'
    };
  }

  // S6: Situational Assessment & Quiz Dilemmas (No answer leaking)
  if (stepNumber === 6 || prompt.includes('測驗') || prompt.includes('題目') || prompt.includes('答案') || prompt.includes('選項') || prompt.includes('提示')) {
    return {
      assistantMessage: `在 S6 情境評估測驗中，以諾老師**不能直接透露哪一個是正確選項（例如告訴你選 A 或選 B）**，因為真正的道德分辨力必須由你自己的良知與智慧來啟動！\n\n不過，我可以給你兩個非常關鍵的「分辨濾鏡」來幫助你思考：\n\n💡 **濾鏡一：動機與心態**\n這個選項所採取的行動，是出於自私、面子、恐懼，還是出於真誠的愛、對神的敬畏與對他人的同情心/責任？\n\n💡 **濾鏡二：長遠的生命果效**\n表面上看起來容易妥協的選擇，往往在暗處埋下遺憾；而合乎神心意的選擇，雖然當下可能需要勇氣或承擔代價，但最終必定能帶來真實的心靈平安與自由。\n\n仔細讀題目中的情境，想想看哪一個選項最能活出「${virtueNameZh}」的聖經真理？你一定能選出最智慧的決定！`,
      thinkingPoints: [
        `測驗的目的不是為了打分數，而是檢驗我們在生活實境中的判斷力。`,
        `神看重的是內心深處的純全，而非僅僅是表面的標準答案。`
      ],
      bibleVerseTag: defaultVerseTag,
      suggestedQuestions: [
        `為什麼很多時候做對的選擇反而覺得很孤單？`,
        `如果我在現實生活中不小心選錯了，神會原諒我嗎？`,
        `如何培養日常生活中敏銳的屬靈分辨力？`
      ],
      stepGuidance: 'S6 評估階段：解析兩難本質與核心原則，引導學生自主做出道德判斷。',
      source: 'mock'
    };
  }

  // S7: Summary & Heavenly Blessing
  if (stepNumber === 7 || prompt.includes('總結') || prompt.includes('祝福') || prompt.includes('結束') || prompt.includes('收穫')) {
    return {
      assistantMessage: `🎉 拍拍手！恭喜你完成了今天「${virtueNameZh} (${virtueNameEn})」的整套學習旅程！\n\n讓我們一起做個精彩的收成回顧：\n1. **心靈的看見**：透過【${primaryStory?.titleZh || '聖經故事'}】，我們看見了神如何在真實人的軟弱中彰顯祂的信實與榮耀。\n2. **真理的燈塔**：【${primaryVerse?.referenceZh || '今日經文'}】成了你奔跑天路時不可動搖的基石。\n3. **雙手的實踐**：你所承諾的微小行動，已經在屬靈的世界裡點燃了一盞溫暖的燈火。\n\n「我們行善，不可喪志；若不灰心，到了時候就要收成！」願主耶穌的平安與恩典常與你同在，明天在校園裡，帶著剛強、仁愛、謹守的心，繼續成為身邊人的美好祝福！`,
      thinkingPoints: [
        `今天的結業不是終點，而是明天校園新生活的起跑線。`,
        `記得常常回顧今天的反思筆記與實踐承諾。`
      ],
      bibleVerseTag: defaultVerseTag,
      suggestedQuestions: [
        `下週我想繼續挑戰下一個美德，有什麼推薦順序？`,
        `如何將這套學習方法分享給團契或小組的同學？`,
        `請為我在學校面臨的挑戰做個差遣祝福！`
      ],
      stepGuidance: 'S7 總結階段：統整學習軌跡，賦予屬靈肯定，給予持續奔跑的祝福。',
      source: 'mock'
    };
  }

  // -------------------------------------------------------------
  // Default General Mentor Dialogue
  // -------------------------------------------------------------
  return {
    assistantMessage: `同學你好！我是 VELS 品格 AI 導師「以諾老師」。\n\n你剛才分享的這點非常值得深入探討！在青少年面對的課業壓力、人際關係與品格考驗中，我們常會在「隨波逐流」與「活出真理」之間拉扯。\n\n我們正在學習的【${virtueNameZh} (${virtueNameEn})】正是面對這個難題的最好解藥。聖經說：「你的話是我腳前的燈，是我路上的光。」（詩篇 119:105）\n\n邀請你試著想一想：在剛才你所說的情境中，耶穌會如何看待身邊的人？什麼樣的選擇能讓你的內心享有深層的平安？隨時告訴我你的想法，我們一起尋求成長！`,
    thinkingPoints: [
      `任何真實的困惑都是生命成長的沃土。`,
      `不急著尋找速成方法，讓神的話語慢慢引導我們的心。`,
      `在目前的步驟 (S${stepNumber}) 中，我們正為這個課題累積寶貴的智慧。`
    ],
    bibleVerseTag: defaultVerseTag || '箴言 4:23「你要保守你心，勝過保守一切，因為一生的果效是由心發出。」',
    suggestedQuestions: [
      `可以結合今天的經文再為我解說一次嗎？`,
      `如果身邊的朋友都不重視這個美德，我該怎麼堅持？`,
      `可以給我一個在學校容易實踐的小建議嗎？`
    ],
    stepGuidance: `目前處於 S${stepNumber} ${context.currentStep.titleZh} 階段，以諾老師陪伴你一步步前行。`,
    source: 'mock'
  };
}
