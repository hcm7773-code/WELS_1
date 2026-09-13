import { InteractiveLessonData, InteractiveLessonStep } from '../types';

export const COURAGE_LESSON_STEPS: InteractiveLessonStep[] = [
  {
    id: 1,
    key: 'welcome',
    titleZh: '歡迎導讀',
    titleEn: 'Welcome',
    shortDescZh: '美德核心目標與學習準備',
  },
  {
    id: 2,
    key: 'story',
    titleZh: '聖經故事',
    titleEn: 'Bible Story',
    shortDescZh: 'David and Goliath 少年大衛面對巨人',
  },
  {
    id: 3,
    key: 'verse',
    titleZh: '核心金句',
    titleEn: 'Bible Verse',
    shortDescZh: '撒母耳記上 17:45 (1 Samuel 17:45)',
  },
  {
    id: 4,
    key: 'reflect',
    titleZh: '深思時間',
    titleEn: 'Think & Reflect',
    shortDescZh: '3 個校園與生活反思引導',
  },
  {
    id: 5,
    key: 'challenge',
    titleZh: '勇氣挑戰',
    titleEn: 'Courage Challenge',
    shortDescZh: '今日生活微行動實踐打卡',
  },
  {
    id: 6,
    key: 'quiz',
    titleZh: '情境測驗',
    titleEn: 'Mini Quiz',
    shortDescZh: '3 題生活實戰與聖經理解測驗',
  },
  {
    id: 7,
    key: 'completion',
    titleZh: '結業成就',
    titleEn: 'Completion',
    shortDescZh: '獲得大衛勇者徽章與評量總結',
  },
];

export const COURAGE_LESSON_DATA: InteractiveLessonData = {
  id: 'lesson-courage-01',
  virtueId: 'courage',
  nameZh: '勇氣',
  nameEn: 'Courage',

  // Step 1: Welcome
  welcome: {
    bannerTitleZh: '今日美德：勇氣 Courage',
    subtitleZh: '透過聖經人物大衛的生命經歷，在恐懼與壓力面前，學習倚靠神做對的事。',
    definitionZh: '在恐懼、同儕壓力或未知困難面前，不隨波逐流，堅定選擇站在真理與公義這一邊。',
    definitionEn: 'Standing firm for what is right despite fear and peer pressure, trusting wholeheartedly in God.',
    estimatedMinutes: 8,
    learningGoals: [
      '理解真正的勇氣不是「毫無恐懼」，而是「即使害怕依然倚靠神向前」',
      '從少年大衛身上學會：不被外在強弱限制，專注神的同在與自己真實的恩賜',
      '在校園日常生活中，找出一個能實踐勇氣的具體行動並踏出第一步',
    ],
    warmupQuestionZh: '當身邊的同學都在做某件不妥當的事，或者你看見有人被冷落時，你曾感到害怕或猶豫過嗎？今天這堂課正是為你預備的！',
  },

  // Step 2: Bible Story
  bibleStory: {
    titleZh: '少年大衛迎戰巨人歌利亞',
    titleEn: 'David and Goliath',
    characterZh: '大衛 (David) & 歌利亞 (Goliath)',
    characterEn: 'David and Goliath',
    readingTimeMinutes: 3,
    storyActs: [
      {
        actNumber: 1,
        actTitle: '第一幕：恐懼籠罩的山谷',
        content: '在以拉谷兩側的山頭上，非利士軍隊與以色列軍隊隔著深谷嚴陣以待。每天早晨與黃昏，非利士陣營中走出一名身材魁梧、身高將近三米的巨人歌利亞。他頭戴沉重的銅盔、身穿厚重的鎧甲，手持巨大的鐵矛，連續四十天高聲辱罵以色列軍隊和永生神。聽見他的吼叫，包括國王掃羅在內的以色列全軍都嚇得臉色發白、渾身發抖，沒有一人敢出去應戰。',
        highlight: '當大家都被巨人的威勢嚇退時，整個營地充滿了恐懼與絕望的氣氛。',
      },
      {
        actNumber: 2,
        actTitle: '第二幕：牧羊少年的不同眼光',
        content: '這一天，年少清秀的大衛帶著烤餅和乳酪來到軍營探望參軍的哥哥們。當大衛聽見歌利亞公然嘲諷神的軍隊時，他的內心燃起了聖潔的義憤。雖然哥哥訓斥他年幼好事，掃羅王也對他說：「你年紀還小，怎能去迎戰久經沙場的戰士？」但大衛勇敢地回憶起他在曠野牧羊時，神曾多次救他脫離獅子與熊的利爪。掃羅把自己的鎧甲套給大衛，大衛試著走動卻發現沉重無比，於是他脫下別人的軍裝，只拿著自己的牧羊手杖，在溪邊撿了五塊光滑的小石子，帶著甩石機弦就向巨人走去。',
        highlight: '大衛不穿別人的鎧甲，因為他深知神以往在暗處磨練他的恩賜與同在。',
      },
      {
        actNumber: 3,
        actTitle: '第三幕：萬軍之耶和華的名',
        content: '歌利亞看見向他走來的大衛只是個面色紅潤的年輕人，狂傲地蔑視並咒罵大衛。大衛毫不退縮，高聲回應：「你來攻擊我，是靠著刀槍和銅戟；我來攻擊你，是靠著萬軍之耶和華的名！」話音未落，大衛奔向戰線，從囊中取出一塊石子用機弦甩出。石子呼嘯飛去，精準嵌入歌利亞的額頭，龐大無比的巨人重重撲倒在地！年少的大衛用不可動搖的信心與勇氣，扭轉了整個國家的命運。',
        highlight: '真正的勝敗不在於武器有多鋒利，而在於我們倚靠的是誰！',
      },
    ],
    teenTakeawayZh: '在生活中，每個人都會遇到自己的「歌利亞」——可能是棘手的考試、人際誤會、同學的冷嘲熱諷，或是孤單害怕的感覺。勇氣不是裝作不怕，而是像大衛一樣，把目光從巨人身上移開，轉向那位比一切問題都更偉大的神！',
    teenTakeawayEn: 'True courage is not the absence of fear, but fixing our eyes on the greatness of God instead of the size of the giant before us.',
  },

  // Step 3: Bible Verse
  bibleVerse: {
    referenceZh: '撒母耳記上 17:45',
    referenceEn: '1 Samuel 17:45',
    textZh: '大衛對非利士人說：「你來攻擊我，是靠著刀槍和銅戟；我來攻擊你，是靠著萬軍之耶和華的名，就是你所辱罵帶領以色列軍隊的神。」',
    textEn: 'David said to the Philistine, "You come against me with sword and spear and javelin, but I come against you in the name of the Lord Almighty, the God of the armies of Israel, whom you have defied."',
    shortExplanationZh: '這節經文揭示了真正聖經勇氣的秘密：大衛之所以不退縮，不是因為自己肌肉結實或武器尖銳，而是因為他知道神的名至高至大。當你在學校面對困難、壓力或誘惑時，你不是孤身一人在奮鬥，神的全能正是你勇氣的底氣。',
    keyPoints: [
      {
        keyword: '刀槍和銅戟 (Sword & Spear)',
        explanation: '代表世界上看得見的外在優勢、權力、名氣或同儕的強大氣勢。',
      },
      {
        keyword: '萬軍之耶和華的名 (Name of the Lord)',
        explanation: '代表至高無上的主權、公義與永不改變的信實，是信靠者最穩固的避難所。',
      },
      {
        keyword: '迎戰奔跑 (Ran toward the line)',
        explanation: '勇氣是一種信心的行動，不只停留在心中想，而是勇敢跨步向前。',
      },
    ],
  },

  // Step 4: Think & Reflect
  thinkAndReflect: {
    titleZh: '深思時間 Think & Reflect',
    introZh: '透過以下 3 個問題沉澱心靈，誠實面對自己的內心感受，並寫下你的品格學習筆記：',
    reflectionQuestions: [
      {
        id: 'q1-fear',
        number: 1,
        questionZh: '你最近害怕面對什麼事情？',
        promptZh: '在課業、考試、上台發表、同儕眼光或家庭生活中，有什麼讓你感到緊張、想逃避或害怕的「巨人」嗎？',
        placeholderZh: '例如：最近英文上台口頭報告讓我很緊張，我總擔心說錯會被台下同學笑...',
        suggestedThoughts: [
          '擔心表現不夠好被同儕評價',
          '害怕在新環境或陌生小組中開口',
          '面臨重大考試或競賽的壓力',
          '不敢拒絕朋友不合理的要求',
        ],
      },
      {
        id: 'q2-david',
        number: 2,
        questionZh: '如果你是 David，你會怎麼做？',
        promptZh: '想像你站在高大狂傲的歌利亞面前，身邊所有人都在發抖。你會如何克服恐懼？你會如何向神禱告尋求勇氣？',
        placeholderZh: '例如：如果我是大衛，我一開始一定也會發抖，但我會先深呼吸禱告，告訴自己神與我同在，不要去看歌利亞的身高，而是想起神過去給我的平安...',
        suggestedThoughts: [
          '先安靜默禱，將恐懼交給神',
          '脫掉盲從模仿別人的沉重面具（如掃羅的鎧甲）',
          '運用神給自己的特質與經歷去應對',
          '宣告神的公義比眼前的恐懼更大',
        ],
      },
      {
        id: 'q3-school',
        number: 3,
        questionZh: '在學校生活中，勇氣可以如何實踐？',
        promptZh: '聖經中的勇氣並不是逞兇鬥狠，而是在日常選擇中堅持善良與真理。在校園裡，你可以做哪些具體展現勇氣的事？',
        placeholderZh: '例如：當班上有人在起鬨嘲笑某位同學時，我能勇敢不跟著笑，甚至走過去邀請那位同學一起吃午餐...',
        suggestedThoughts: [
          '不跟風嘲笑或轉傳傷人的同儕八卦',
          '勇敢向老師或同學坦承自己不懂或做錯的事',
          '主動關心看起來被孤立、落單的新同學',
          '在分組合作中，主動承擔別人不想做的困難工作',
        ],
      },
    ],
  },

  // Step 5: Courage Challenge
  courageChallenge: {
    titleZh: '今日勇氣挑戰 Courage Challenge',
    subtitleZh: '把聖經的教導轉化為真實生活的行動，今天勇敢做一件正確但有點困難的事情！',
    challengeCoreStatement: '今天勇敢做一件正確但有點困難的事情。',
    actionOptions: [
      {
        id: 'action-kindness',
        category: '同儕友好',
        titleZh: '主動向一位落單或不常說話的同學微笑打招呼',
        descZh: '跨出自己舒適的社交小圈子，給需要溫暖的同學一句真誠的問候或讚美。',
        difficulty: '輕鬆嘗試',
      },
      {
        id: 'action-integrity',
        category: '堅持正義',
        titleZh: '面對不合宜的八卦或嘲弄時，勇敢不跟風並轉換話題',
        descZh: '當身邊的人在背後議論他人時，溫和地說「我們換個話題聊吧」或選擇不隨之起舞。',
        difficulty: '中度挑戰',
      },
      {
        id: 'action-honesty',
        category: '真誠坦白',
        titleZh: '勇敢承認一項自己近期做錯或拖延的小事，並真誠道歉',
        descZh: '不再找藉口掩飾，主動向父母、老師或朋友說明實情，修復彼此的信任。',
        difficulty: '突破自我',
      },
    ],
    badgeName: '大衛勇者徽章 (David Courage Star)',
    badgeDescription: '恭喜！你踏出了生命實踐的重要一步，活出以神為依靠的剛強勇氣！',
    commitmentTipsZh: [
      '行動前在心中默默禱告一句：「主啊，賜我像大衛一樣剛強仁愛的心。」',
      '不需要驚天動地，哪怕只是一句真誠的話，就是了不起的勇氣！',
      '記住：只要做的是對的事，神一定與你同行！',
    ],
  },

  // Step 6: Mini Quiz
  miniQuiz: {
    titleZh: '勇氣情境測驗 Mini Quiz',
    descriptionZh: '透過 3 題生活情境與經文理解，檢驗你對大衛戰勝歌利亞與品格勇氣的掌握度！',
    questions: [
      {
        id: 'courage-quiz-1',
        scenarioZh: '在下課時間，幾位班上受歡迎的同學圍在一起嘲笑一位新轉學生的口音，並起鬨要大家一起拍照上傳到限時動態。',
        questionZh: '展現聖經所教導的「剛強勇氣」，最合宜的回應是什麼？',
        options: [
          { id: 'A', label: 'A', textZh: '笑著一起拍照跟風，私底下再偷偷私訊轉學生說對不起。' },
          { id: 'B', label: 'B', textZh: '溫和但堅定地表示「這樣不好玩」，拒絕加入，並提議聊別的話題。' },
          { id: 'C', label: 'C', textZh: '當場失控大聲辱罵帶頭的同學，並動手搶奪對方手機。' },
          { id: 'D', label: 'D', textZh: '裝作沒看見立刻轉頭走開，告訴自己反正不關我的事。' },
        ],
        correctOptionId: 'B',
        explanationZh: '大衛迎戰歌利亞是因著敬畏神與堅持真理，而非盲目的血氣衝動。溫和堅定地拒絕參與惡行並保護同儕尊嚴，既有堅持公義的勇氣，又兼具溫柔智慧。',
        virtuePrincipleZh: '真正的勇氣是堅持做對的事，拒絕隨波逐流，用愛心說誠實話。',
      },
      {
        id: 'courage-quiz-2',
        scenarioZh: '少年大衛迎戰巨人歌利亞之前，掃羅王想把自己的沉重青銅鎧甲和佩刀給大衛穿上。',
        questionZh: '大衛最後為什麼選擇脫去掃羅的鎧甲，只帶著手杖、五塊光滑石子與機弦？',
        options: [
          { id: 'A', label: 'A', textZh: '因為掃羅的鎧甲太帥氣，大衛怕弄髒。' },
          { id: 'B', label: 'B', textZh: '大衛清楚神以往牧羊時給自己的裝備與恩賜，不盲目模仿別人，單單倚靠神的名。' },
          { id: 'C', label: 'C', textZh: '因為大衛想故意裝作柔弱無能，藉此誘敵深入。' },
          { id: 'D', label: 'D', textZh: '因為鎧甲是假貨，防護力非常差。' },
        ],
        correctOptionId: 'B',
        explanationZh: '大衛深知神在平時放羊保護羊群時，就已經賜給他甩石與信靠神的真實經歷。勇氣來自於真誠接納自己、發揮神所賜的恩賜，而不是硬穿別人不合身的外在武裝。',
        virtuePrincipleZh: '真正的勇氣扎根於信靠神與做忠於真實的自己，不偽裝、不盲從。',
      },
      {
        id: 'courage-quiz-3',
        scenarioZh: '撒母耳記上 17:45 中，大衛向巨人宣告：「你來攻擊我，是靠著刀槍和銅戟；我來攻擊你，是靠著萬軍之耶和華的名...」',
        questionZh: '這句經文揭示少年大衛能夠毫不退縮、戰勝龐大恐懼的最根本力量泉源是什麼？',
        options: [
          { id: 'A', label: 'A', textZh: '大衛自認為自己是全以色列機弦技術第一名的神射手。' },
          { id: 'B', label: 'B', textZh: '大衛相信神的全能超越世上任何強大的武器與巨人，神必定為正義爭戰。' },
          { id: 'C', label: 'C', textZh: '大衛看準了今天風向適合甩石子，勝率很高。' },
          { id: 'D', label: 'D', textZh: '大衛知道掃羅王的後援部隊就躲在後面隨時準備開火。' },
        ],
        correctOptionId: 'B',
        explanationZh: '大衛將眼光從世俗的「刀槍與銅戟」轉向「萬軍之耶和華的名」。他不是倚靠自己的力量或機率，而是完全確信神的信實與大能，這正是基督徒剛強壯膽的終極基石。',
        virtuePrincipleZh: '勇氣的根基不是我們有多強，而是我們所信靠的神有多偉大。',
      },
    ],
  },

  // Step 7: Completion
  completion: {
    congratsTitleZh: '恭喜！你完成了 Courage 勇氣課程。',
    congratsSubtitleZh: '你已經完成大衛與歌利亞故事研讀、金句反思、生活挑戰承諾與情境測驗！',
    encouragementMessageZh: '太棒了！親愛的同學，就像年少的大衛一樣，你不需要等長大成為大人物才有勇氣。今天，在你的班級、家庭與社群中，只要你願意倚靠神選擇誠實、友愛與堅定，你就是校園裡活出榮耀的勇者！',
    bibleBlessingZh: '「你當剛強壯膽！不要懼怕，也不要驚惶；因為你無論往哪裡去，耶和華你的神必與你同在。」— 約書亞記 1:9',
  },
};
