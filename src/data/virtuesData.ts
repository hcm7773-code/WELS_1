import { Virtue } from '../types';

export const VIRTUES_DATA: Virtue[] = [
  {
    id: 'courage',
    order: 1,
    nameZh: '勇氣',
    nameEn: 'Courage',
    canonicalNameZh: '勇氣',
    canonicalNameEn: 'Courage',
    aliasesZh: ['勇敢', '無畏'],
    aliasesEn: ['Bravery', 'Boldness'],
    shortDescZh: '在恐懼和同儕壓力面前，堅持做對的事，依靠神剛強站立。',
    shortDescEn: 'Standing firm for what is right despite fear and peer pressure, trusting in God.',
    color: {
      primary: 'bg-amber-600 hover:bg-amber-700 text-white',
      bgLight: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      accent: 'amber',
    },
    iconName: 'ShieldAlert',
    bibleVerse: {
      referenceZh: '撒母耳記上 17:45',
      referenceEn: '1 Samuel 17:45',
      textZh: '大衛對非利士人說：「你來攻擊我，是靠著刀槍和銅戟；我來攻擊你，是靠著萬軍之耶和華的名，就是你所辱罵帶領以色列軍隊的神。」',
      textEn: 'David said to the Philistine, "You come against me with sword and spear and javelin, but I come against you in the name of the Lord Almighty, the God of the armies of Israel, whom you have defied."',
    },
    bibleStory: {
      titleZh: '少年大衛面對巨人歌利亞',
      titleEn: 'David and Goliath',
      characterZh: '大衛 (David)',
      characterEn: 'David',
      summaryZh: '面對身高近三米、身穿重甲且嘲弄神軍隊的非利士巨人，年少的牧羊人大衛沒有恐懼退縮，憑著對神的信靠挺身而出。',
      fullStoryZh: [
        '在以拉谷，非利士軍隊與以色列軍隊隔著山谷對峙。巨人歌利亞每天早晚出來罵陣，連續四十天，以色列全軍包括掃羅王都嚇得渾身發抖，沒有一人敢上前應戰。',
        '這時，少年大衛來到營地探望參軍的哥哥們。當他聽到歌利亞公然褻瀆永生神的軍隊時，內心激起了聖潔的義憤。雖然他的哥哥斥責他多管閒事，掃羅王也質疑他年幼無作戰經驗，但大衛回想起自己在野外牧羊時，神曾如何救他脫離獅子和熊的爪。',
        '掃羅將自己的銅盔和沉重鎧甲給大衛穿上，但大衛覺得笨重不合身。他脫下鎧甲，手中只拿著牧羊的手杖，在溪裡挑選了五塊光滑的小石子放在囊袋裡，手裡拿著甩石的機弦，就迎著巨人跑去。',
        '歌利亞見大衛年輕面紅，十分藐視他。大衛卻高聲說：「你來攻擊我，是靠著刀槍和銅戟；我來攻擊你，是靠著萬軍之耶和華的名！」大衛從囊中掏出一塊石子甩出，正中歌利亞的前額，巨人應聲仆倒。年少的大衛用不可動搖的勇氣，帶領整個民族得勝。'
      ],
      keyTakeawayZh: '真正的勇氣並不是「毫無恐懼」，而是在感到懼怕時，定睛在神的同在與應許上，勇敢跨出正義的一步。',
      keyTakeawayEn: 'True courage is not the absence of fear, but trusting God enough to step forward in faith even when intimidated.'
    },
    reflectionQuestion: {
      questionZh: '在班級或社交圈中，當大家都在隨波逐流（甚至起鬨排擠人）時，你敢不敢發出不同的聲音？',
      questionEn: 'When peers conform or tease others, do you dare to speak up or stand apart for what is right?',
      thoughtPromptZh: '想一想：你目前在學校或人際關係中面臨的最大「歌利亞」（恐懼或壓力）是什麼？大衛的經歷如何啟發你去依靠神？',
      guideQuestionsZh: [
        '回顧最近一次你因害怕別人眼光而放棄表達真實想法的經驗。',
        '如果今天有一位同學被不公平對待，你需要什麼樣的內心準備才能為他發聲？',
        '將你的擔憂交給神，用一句話寫下你今天的「勇氣宣言」。'
      ]
    },
    practicalActivity: {
      titleZh: '「今日勇氣微行動」挑戰',
      titleEn: 'Today’s Courage Micro-Action Challenge',
      descriptionZh: '挑選一項你平時因害羞或恐懼而推遲的正義或友好行動，在 24 小時內踏實完成。',
      stepsZh: [
        '主動跟班上一位平時很少說話、或看起來落單的同學打招呼問好。',
        '在遇到不合宜的話題或八卦討論時，禮貌地表示不贊同或選擇離開。',
        '在心中為自己面臨的一項挑戰（例如即將到來的考試、上台報告或人際誤會）做一個交託的禱告。'
      ],
      badgeNameZh: '大衛勇者之星 (David Courage Badge)'
    },
    quizQuestions: [
      {
        id: 'courage-q1',
        scenarioZh: '在午餐時間，幾位受歡迎的同學開始嘲笑一位新轉學生的口音和穿著，並邀你一起加入拍照上傳到班級群組。',
        scenarioEn: 'During lunch, popular classmates mock a new student and invite you to join them.',
        questionZh: '展現聖經所教導的「勇氣」，最合宜的回應是什麼？',
        questionEn: 'What is the most courageous and biblical response?',
        options: [
          { id: 'A', label: 'A', textZh: '笑著一起拍照，私底下再偷偷去安慰轉學生。' },
          { id: 'B', label: 'B', textZh: '溫和但堅定地拒絕參與，並提議大家換個話題，保護新同學的尊嚴。' },
          { id: 'C', label: 'C', textZh: '當場大聲辱罵帶頭嘲笑的同學，引發激烈爭吵。' },
          { id: 'D', label: 'D', textZh: '假裝沒看見立刻離開現場，因為不關自己的事。' }
        ],
        correctOptionId: 'B',
        explanationZh: '大衛面對歌利亞時充滿堅定與敬虔，而非盲目的血氣衝動。溫和堅定地拒絕作惡並維護他人，既有堅持真理的勇氣，又具備溫柔與智慧。',
        virtuePrincipleZh: '勇氣是堅持正義，用愛心說誠實話，不懼怕群體同儕壓力。'
      },
      {
        id: 'courage-q2',
        scenarioZh: '少年大衛迎戰巨人歌利亞時，掃羅王想把沉重的軍裝穿在大衛身上。',
        questionZh: '大衛為什麼最後決定脫去掃羅的鎧甲，只帶著手杖和甩石機弦？',
        options: [
          { id: 'A', label: 'A', textZh: '因為鎧甲太帥氣他怕弄髒。' },
          { id: 'B', label: 'B', textZh: '大衛清楚自己受神裝備的恩賜與經歷，不盲目模仿別人，單單倚靠萬軍之耶和華的名。' },
          { id: 'C', label: 'C', textZh: '因為掃羅的鎧甲品質很差容易破損。' },
          { id: 'D', label: 'D', textZh: '大衛想故意向歌利亞示弱，誘敵深入。' }
        ],
        correctOptionId: 'B',
        explanationZh: '大衛知道信靠神的真實經歷勝過外在虛浮的武裝。勇氣來自認識神與忠於神給自己的本色，而非硬套別人的外殼。',
        virtuePrincipleZh: '真正的勇氣扎根於對神的真實信心與自我認識。'
      },
      {
        id: 'courage-q3',
        scenarioZh: '約書亞記 1:9 提到：「你當剛強壯膽！不要懼怕，也不要驚惶。」',
        questionZh: '神吩咐約書亞不要懼怕的最核心理由是什麼？',
        options: [
          { id: 'A', label: 'A', textZh: '因為約書亞手下擁有幾百萬訓練精良的特種軍隊。' },
          { id: 'B', label: 'B', textZh: '因為耶利哥城的城牆非常脆弱容易被推倒。' },
          { id: 'C', label: 'C', textZh: '因為無論往哪裡去，耶和華他的神必與他同在。' },
          { id: 'D', label: 'D', textZh: '因為人生中不會再有任何困難與挫折。' }
        ],
        correctOptionId: 'C',
        explanationZh: '經文明確宣告：「因為你無論往哪裡去，耶和華你的神必與你同在。」神同在的應許是基督徒克制恐懼、展現剛強壯膽的最穩固基石。',
        virtuePrincipleZh: '神同在的應許是勇氣取之不盡的泉源。'
      }
    ]
  },
  {
    id: 'honesty',
    order: 2,
    nameZh: '誠實',
    nameEn: 'Honesty',
    canonicalNameZh: '誠實',
    canonicalNameEn: 'Honesty',
    aliasesZh: ['正直', '真實'],
    aliasesEn: ['Integrity', 'Truthfulness'],
    shortDescZh: '內心真實、言行一致，即使說實話需要付出代價也不弄虛作假。',
    shortDescEn: 'Speaking the truth in love and being trustworthy in words and actions, even when it is difficult.',
    color: {
      primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      bgLight: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      accent: 'emerald',
    },
    iconName: 'CheckCircle2',
    bibleVerse: {
      referenceZh: '箴言 12:22',
      referenceEn: 'Proverbs 12:22',
      textZh: '說謊言的嘴為耶和華所憎惡；行事誠實的，為他所喜悅。',
      textEn: 'The Lord detests lying lips, but he delights in people who are trustworthy.',
    },
    bibleStory: {
      titleZh: '但以理一生無可指責的正直',
      titleEn: 'Daniel’s Integrity and Honesty',
      characterZh: '但以理 (Daniel)',
      characterEn: 'Daniel',
      summaryZh: '但以理身處異邦朝廷幾十年，位高權重，政敵因嫉妒想挑他的毛病，卻完全找不到任何貪腐、欺瞞或過失。',
      fullStoryZh: [
        '少年但以理被擄到巴比倫王宮時，就立志不以王的膳和王所飲的酒玷污自己。他沒有用說謊或私下倒掉的方式應付，而是誠懇、坦白地請求太監長給他們十天的蔬菜白水試驗。',
        '到了大利烏王統治時期，但以理被立為三個總長之一，因他裡面有美好的靈性，顯然超乎其餘的人，王甚至想立他治理通國。這引發了其他總長和總督強烈的嫉妒。',
        '他們四處暗中查訪但以理治理國事的把柄，想尋找他在帳目、公文或人際往來中的漏洞。但聖經記載：「只是找不著他的錯誤過失，因他忠心辦事，毫無錯誤過失。」',
        '政敵無奈之下，只能承認：「我們要找這但以理的把柄，除非在他神的律法中就找不著。」但以理一生行在光中，他的誠實與忠心不僅贏得了君王的尊敬，更榮耀了天上的真神。'
      ],
      keyTakeawayZh: '誠實不只是「不說謊」，更是活出一種沒有隱藏、問心無愧的生命質感，讓人在光明中看見神的榮耀。',
      keyTakeawayEn: 'Honesty is more than not lying; it is living with transparency, integrity, and honor before God and people.'
    },
    reflectionQuestion: {
      questionZh: '在面對考試成績不理想、打破東西或犯錯時，你是否曾被誘惑說一個「小謊」來逃避懲罰？',
      questionEn: 'When facing mistakes or poor grades, have you felt tempted to tell a "small lie" to escape blame?',
      thoughtPromptZh: '想一想：說謊能換得短暫的安全感，但會破壞關係中的信任；坦誠雖會帶來暫時的尷尬，卻能換來內心的平靜。你選擇哪一個？',
      guideQuestionsZh: [
        '回顧一次你勇敢坦白錯誤的經歷，當時心情如何？最後結果是否比想像中更釋懷？',
        '當朋友希望你替他隱瞞作弊或違規時，你該如何用真誠與愛心來回應？',
        '今天給自己一個承諾：在任何細小的事上都堅持真實，不誇大、不掩飾。'
      ]
    },
    practicalActivity: {
      titleZh: '「光明坦蕩 24 小時」挑戰',
      titleEn: 'The 24-Hour Transparency Challenge',
      descriptionZh: '在今天的所有對話與作業中，嚴格守護真實，不誇大其詞，不推卸責任。',
      stepsZh: [
        '寫作業或考試完全憑自己實力，不抄襲、不作弊。',
        '若有答應父母或老師的事情沒完成，主動坦承並說明改進計劃，而非找藉口。',
        '如果有過去對別人隱瞞或說謊的事，尋求合適的機會向對方誠懇道歉修復關係。'
      ],
      badgeNameZh: '但以理明鏡徽章 (Daniel Integrity Badge)'
    },
    quizQuestions: [
      {
        id: 'honesty-q1',
        scenarioZh: '期末數學測驗時，坐在你旁邊的好朋友輕輕敲你桌子，比手勢希望你把考卷往旁邊挪一點讓他看第 3 題的計算過程。',
        questionZh: '基於聖經「誠實」與真朋友的原則，你最好的處理方式是？',
        options: [
          { id: 'A', label: 'A', textZh: '立刻挪過去給他看，因為友情比規矩更重要。' },
          { id: 'B', label: 'B', textZh: '輕輕搖頭專心作答；考後坦誠向他解釋：「因為珍惜你的誠信與我們的友誼，我考完很樂意教你，但考試時不能作弊。」' },
          { id: 'C', label: 'C', textZh: '在考場當場站起來大喊：「老師！某某人在作弊！」讓他當眾無地自容。' },
          { id: 'D', label: 'D', textZh: '故意把錯誤的答案寫大字給他抄，讓他考不及格得到教訓。' }
        ],
        correctOptionId: 'B',
        explanationZh: '真正的朋友不會用破壞道德誠信來維繫感情。拒絕協助作弊是維護雙方的誠實；考後主動願意陪伴學習，展現了用愛心說誠實話與真實的友誼。',
        virtuePrincipleZh: '真正的誠實包含愛心與原則，不為討好同儕而犧牲真理。'
      },
      {
        id: 'honesty-q2',
        scenarioZh: '但以理書記載，朝廷官員想找但以理治理國事的把柄，結果如何？',
        questionZh: '聖經如何描述但以理的辦事態度與品行？',
        options: [
          { id: 'A', label: 'A', textZh: '官員找到了他偷改帳本的證據。' },
          { id: 'B', label: 'B', textZh: '但以理私下送禮物給其他官員擺平了事情。' },
          { id: 'C', label: 'C', textZh: '找不著他的錯誤過失，因他忠心辦事，毫無錯誤過失。' },
          { id: 'D', label: 'D', textZh: '但以理因為心虛逃跑到了曠野。' }
        ],
        correctOptionId: 'C',
        explanationZh: '但以理書 6:4 記載：「只是找不著他的錯誤過失，因他忠心辦事，毫無錯誤過失。」這彰顯了一個人在暗處和明處皆有一致的誠實品格。',
        virtuePrincipleZh: '言行一致、表裡如一的誠實，在任何環境中都能成為神的見證。'
      },
      {
        id: 'honesty-q3',
        scenarioZh: '箴言 12:22 說：「說謊言的嘴為耶和華所憎惡；行事誠實的，為他所喜悅。」',
        questionZh: '這句經文提醒中學生，在日常生活追求「誠實」的最大動力應該是什麼？',
        options: [
          { id: 'A', label: 'A', textZh: '只是為了逃避被校長處罰或記過。' },
          { id: 'B', label: 'B', textZh: '知道神看重內心的真實，行事誠實能夠討神的喜悅，得著良心的自由平安。' },
          { id: 'C', label: 'C', textZh: '為了在社交媒體上宣傳自己是個完美的人。' },
          { id: 'D', label: 'D', textZh: '只要沒有人看見，偶爾說一點點謊言也是可以的。' }
        ],
        correctOptionId: 'B',
        explanationZh: '聖經提醒我們，誠實的終極對象是神。敬畏神的人明白神鑒察人心，誠實不是外在表演，而是渴望行在真理光中、蒙神喜悅的生活方式。',
        virtuePrincipleZh: '敬畏神是維持內心純潔與誠實行動的根本動力。'
      }
    ]
  },
  {
    id: 'compassion',
    order: 3,
    nameZh: '同情心',
    nameEn: 'Compassion',
    canonicalNameZh: '同情心',
    canonicalNameEn: 'Compassion',
    aliasesZh: ['憐憫', '慈心'],
    aliasesEn: ['Mercy', 'Kindness'],
    shortDescZh: '看見他人的痛苦與需要，感同身受並主動伸出溫暖的援助之手。',
    shortDescEn: 'Noticing the struggles of others with empathy and being moved to take practical, loving action.',
    color: {
      primary: 'bg-rose-600 hover:bg-rose-700 text-white',
      bgLight: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-800',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
      accent: 'rose',
    },
    iconName: 'HeartHandshake',
    bibleVerse: {
      referenceZh: '歌羅西書 3:12',
      referenceEn: 'Colossians 3:12',
      textZh: '所以，你們既是神的選民，聖潔蒙愛的人，就要穿上憐憫、恩慈、謙虛、溫柔、忍耐的心。',
      textEn: 'Therefore, as God’s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.',
    },
    bibleStory: {
      titleZh: '好撒馬利亞人的愛心實踐',
      titleEn: 'The Good Samaritan',
      characterZh: '好撒馬利亞人 (The Good Samaritan)',
      characterEn: 'The Good Samaritan',
      summaryZh: '一個人在路旁被強盜打得半死。備受尊敬的宗教領袖選擇繞道避開，反而是被歧視的撒馬利亞人動了慈心，不計代價地悉心照護。',
      fullStoryZh: [
        '有一個人從耶路撒冷下耶利哥去，落在強盜手中。強盜剝去他的衣裳，把他打個半死，就扔下他走了。傷者倒在血泊中，動彈不得。',
        '碰巧有一個祭司從這條路下來，看見他，就從路旁繞過去走開了。又有一個利未人來到這地方，看見他，同樣從另一邊繞過去了。他們可能害怕耽誤自己的職務，或擔心惹上麻煩。',
        '唯有一個撒馬利亞人行路來到那裡，看見受傷的旅人，就動了慈心！在當時，猶太人和撒馬利亞人彼此仇視，但這人完全放下了偏見與隔閡。',
        '他上前用油和酒倒在傷口上，包裹好，扶他騎上自己的牲口，帶到客店裡照應。第二天，他拿出二錢銀子交給店主說：「請你照應他，此外所費用的，我回來必還你。」耶穌問：「你想，這三個人中，哪一個是落在強盜手中之人的鄰舍呢？」'
      ],
      keyTakeawayZh: '憐憫不是坐在椅子上的同情嘆息，而是「看見痛苦、動了慈心、停下腳步、付諸行動」。',
      keyTakeawayEn: 'Compassion is not passive pity; it is moving toward someone in pain and offering practical help across boundaries.'
    },
    reflectionQuestion: {
      questionZh: '在校園或家庭生活裡，你是否曾因為「怕惹麻煩」或「跟我無關」而對別人的孤單或眼淚視而不見？',
      questionEn: 'In your daily life, have you ever turned away from someone crying or isolated because you felt it wasn’t your business?',
      thoughtPromptZh: '想一想：誰是你身邊受傷的「路旁旅人」？耶穌問我們：「誰是他的鄰舍？」你願意成為那個願意停下腳步的人嗎？',
      guideQuestionsZh: [
        '在你的班級中，哪一位同學最常被冷落或被大家忽視？',
        '當別人軟弱或犯錯時，你是傾向指責嘲笑，還是願意先體會他的處境？',
        '寫下一個本週你能做出的溫暖小舉動（例如寫一張鼓勵便條紙、替同學拿一本作業本）。'
      ]
    },
    practicalActivity: {
      titleZh: '「校園好撒馬利亞人」暖心行動',
      titleEn: 'Campus Good Samaritan Caring Action',
      descriptionZh: '跨越舒適圈，向一位不是你核心好友圈的人表達純粹的善意與關懷。',
      stepsZh: [
        '主動留意身邊看起來情緒低落或需要幫助的人（同學、校工阿姨、學弟妹）。',
        '送上一句真誠的問候或小小的鼓勵便箋（「願神祝福你今天有平安力量！」）。',
        '在放學後或空檔，主動替家長或同學分擔一項看似微小卻繁瑣的事情。'
      ],
      badgeNameZh: '好撒馬利亞憐憫徽章 (Good Samaritan Compassion Badge)'
    },
    quizQuestions: [
      {
        id: 'compassion-q1',
        scenarioZh: '放學時下著大雨，你看到一位平常在班上不太受歡迎、性格有些沉默的同學沒有帶傘，正站在校門口發愁。',
        questionZh: '哪一個行動最體現好撒馬利亞人的「憐憫」品格？',
        options: [
          { id: 'A', label: 'A', textZh: '當作沒看見，趕快撐傘跑走，怕被其他同學看到說閒話。' },
          { id: 'B', label: 'B', textZh: '走到他身旁主動邀請：「我有一把大傘，你要去捷運站或公車站嗎？我們一起撐過去吧。」' },
          { id: 'C', label: 'C', textZh: '走過去對他說：「誰叫你出門不看氣象預報，真是自作自受。」' },
          { id: 'D', label: 'D', textZh: '在社交平台上拍他的背影發限時動態，配文寫「好可憐喔」。' }
        ],
        correctOptionId: 'B',
        explanationZh: '好撒馬利亞人的核心在於「動了慈心」並「化為具體行動」。放下成見與面子，主動共撐一把傘提供實際幫助，正是活出基督憐憫的典範。',
        virtuePrincipleZh: '憐憫是放下偏見，以具體、及時的溫暖行動扶持需要幫助的人。'
      },
      {
        id: 'compassion-q2',
        scenarioZh: '在耶穌講的好撒馬利亞人比喻中，祭司和利未人看見受傷的同胞為什麼都繞道走開？',
        questionZh: '這個故事給身為中學生的我們最深刻的反省是什麼？',
        options: [
          { id: 'A', label: 'A', textZh: '說明我們出門時一定要隨身攜帶急救包。' },
          { id: 'B', label: 'B', textZh: '說明宗教知識若沒有化為真實的愛心與行動，就毫無意義；我們不能用任何藉口對他人的痛苦視而不見。' },
          { id: 'C', label: 'C', textZh: '說明受傷的人應該自己承擔責任，不要依賴路人。' },
          { id: 'D', label: 'D', textZh: '說明撒馬利亞人比所有人都富有。' }
        ],
        correctOptionId: 'B',
        explanationZh: '祭司和利未人擁有最高的宗教知識與地位，卻缺乏實踐愛心的憐憫。耶穌藉此教導我們，真正的信仰必然表現在對困苦之人的切實相助中。',
        virtuePrincipleZh: '真信仰是帶著憐憫與行動的心，而非冷漠的旁觀者。'
      },
      {
        id: 'compassion-q3',
        scenarioZh: '歌羅西書 3:12 吩咐信徒要「穿上憐憫、恩慈、謙虛、溫柔、忍耐的心」。',
        questionZh: '經文中用「穿上 (clothe yourselves)」這個動詞比喻，代表憐憫具有什麼特質？',
        options: [
          { id: 'A', label: 'A', textZh: '憐憫需要像衣服一樣昂貴，只有有錢人才能擁有。' },
          { id: 'B', label: 'B', textZh: '憐憫是每天清晨有意識的選擇與操練，就像穿衣服一樣穿在身上，成為別人看得見的溫暖保護。' },
          { id: 'C', label: 'C', textZh: '憐憫只是表面功夫，隨時可以脫掉扔在一旁。' },
          { id: 'D', label: 'D', textZh: '只有在重要節日才需要偶爾展現一下憐憫。' }
        ],
        correctOptionId: 'B',
        explanationZh: '「穿上」意味著每天主動的決定與生活習慣。我們蒙神深愛，因此每天都要有意識地穿上溫柔與憐憫，去照亮和溫暖周遭的世界。',
        virtuePrincipleZh: '憐憫是基督徒每日在神愛中主動選擇穿上的生命品格。'
      }
    ]
  },
  {
    id: 'responsibility',
    order: 4,
    nameZh: '責任',
    nameEn: 'Responsibility',
    canonicalNameZh: '責任',
    canonicalNameEn: 'Responsibility',
    aliasesZh: ['負責', '忠心管家'],
    aliasesEn: ['Faithfulness', 'Stewardship'],
    shortDescZh: '對神賦予的才幹、時間與人際承諾盡心竭力，敢於承擔後果。',
    shortDescEn: 'Being faithful in what you are entrusted with—time, talents, and relationships—and owning your choices.',
    color: {
      primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      bgLight: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-800',
      badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      accent: 'indigo',
    },
    iconName: 'ClipboardCheck',
    bibleVerse: {
      referenceZh: '路加福音 16:10',
      referenceEn: 'Luke 16:10',
      textZh: '人在最小的事上忠心，在大事上也忠心；在最小的事上有不義，在大事上也有不義。',
      textEn: 'Whoever can be trusted with very little can also be trusted with much, and whoever is dishonest with very little will also be dishonest with much.',
    },
    bibleStory: {
      titleZh: '少年約瑟逆境中的忠心負責',
      titleEn: 'Joseph’s Diligence and Stewardship',
      characterZh: '約瑟 (Joseph)',
      characterEn: 'Joseph',
      summaryZh: '約瑟雖遭遇背叛被賣到埃及為奴，甚至被誣陷下監，但他始終在每個崗位盡職負責，在最小的事上忠心，最終承擔拯救天下的大任。',
      fullStoryZh: [
        '少年約瑟被親哥哥們嫉妒出賣，淪落到埃及波提乏家中作奴隸。面對驟變與不公，約瑟沒有整天怨天尤人、消極怠工，反而凡事敬畏神，認真做好主人交代的每一件瑣碎家務。',
        '波提乏見耶和華與約瑟同在，使他手裡所辦的盡都順利，就派他管理全家，將一切所有的都交在他手裡。後來，約瑟拒絕女主人的誘惑犯罪，持守正直，反被誣告含冤下到監獄。',
        '即使身在陰暗的監獄裡，約瑟依然展現強大的責任感。司獄見約瑟處事忠信，就把監裡所有的囚犯都交給他管理。無論身處高位還是谷底，約瑟都把手中的職責做到極致。',
        '三十歲時，約瑟被提拔為埃及宰相。在豐年時他嚴謹規劃儲糧，在七個荒年到來時拯救了埃及以及周邊列國包括他父親全家的性命。他的責任心與忠心，成全了神偉大的美意。'
      ],
      keyTakeawayZh: '責任感始於「在不起眼的小事上忠心」。不用等待大事臨頭，從今天整理好自己的書包與時間開始。',
      keyTakeawayEn: 'Responsibility begins with being faithful in the small, unseen things today before God entrusts greater tasks tomorrow.'
    },
    reflectionQuestion: {
      questionZh: '在班級值日生、小組專題或家務分工中，你是否常想著「別人會做」而悄悄偷懶？',
      questionEn: 'In team projects or household chores, do you ever slack off assuming others will handle it?',
      thoughtPromptZh: '想一想：路加福音 16:10 提醒我們「小事忠心，大事也忠心」。你目前每天生活裡，神交託給你最重要的「小事」是什麼？',
      guideQuestionsZh: [
        '檢查自己的時間管理：最近是否常常把作業或複習拖延到深夜最後一刻？',
        '當你在小組討論中答應承擔一部分工作時，你是否會主動準時交付？',
        '寫下一個本週你要主動承擔的責任（例如整理自己的房間、主動洗碗、每天按時交作業）。'
      ]
    },
    practicalActivity: {
      titleZh: '「小事忠心管家」落實任務',
      titleEn: 'Faithful in Little Things Stewardship Task',
      descriptionZh: '選擇一個平時容易拖延的個人職責，立即用心完成，並記錄心得。',
      stepsZh: [
        '將書桌、書包或電子檔案夾整理乾淨，建立井井有條的作息秩序。',
        '主動幫忙家裡做一項家務，不需父母提醒催促。',
        '按時高質量完成各科作業，對自己的學習進度完全負起責任。'
      ],
      badgeNameZh: '約瑟忠心管家徽章 (Joseph Faithful Steward Badge)'
    },
    quizQuestions: [
      {
        id: 'responsibility-q1',
        scenarioZh: '公民課進行分組報告，你被分配負責整理第三章的資料與簡報製作，週五必須向全班報告。到了週四晚上你發現自己花太多時間打電動，簡報才做了一半。',
        questionZh: '此時最展現「責任與承擔」的行動是？',
        options: [
          { id: 'A', label: 'A', textZh: '立刻在群組謊稱自己感冒發燒，請組長幫忙把剩下做完。' },
          { id: 'B', label: 'B', textZh: '關掉遊戲，向組員坦白進度，專注熬夜認真把簡報做好，並對自己的拖延致歉且確保報告品質。' },
          { id: 'C', label: 'C', textZh: '直接複製維基百科的文字貼上去敷衍交差，不管排版與內容正確度。' },
          { id: 'D', label: 'D', textZh: '週五直接曠課不到學校，逃避上台。' }
        ],
        correctOptionId: 'B',
        explanationZh: '負責任的人敢於承認錯誤並全力補救，不推卸給隊友，也不敷衍了事。及時止損、專注把答應的事盡心竭力完成，是責任感的真諦。',
        virtuePrincipleZh: '責任是認清自己的承諾，敢於為行動後果擔當，並全力以赴完成託付。'
      },
      {
        id: 'responsibility-q2',
        scenarioZh: '約瑟被下在埃及監獄時，他所處的環境極為惡劣且充滿冤屈。',
        questionZh: '約瑟在監獄中的表現如何體現出神的品格？',
        options: [
          { id: 'A', label: 'A', textZh: '他整天怨恨上帝，煽動其他囚犯暴動越獄。' },
          { id: 'B', label: 'B', textZh: '他依然忠心服事司獄與其他囚犯，凡事盡職負責，贏得眾人的信任。' },
          { id: 'C', label: 'C', textZh: '他賄賂獄卒給他換到單人冷氣牢房。' },
          { id: 'D', label: 'D', textZh: '他假裝生病躺平什麼事都不做。' }
        ],
        correctOptionId: 'B',
        explanationZh: '約瑟身處谷底依然持守敬虔與忠誠。真正的品格不取決於環境有多順利，而在於逆境中依然選擇對手頭的每一件小事盡職盡責。',
        virtuePrincipleZh: '環境不能限制忠心；無論在哪裡，都要為主盡責做到最好。'
      },
      {
        id: 'responsibility-q3',
        scenarioZh: '路加福音 16:10 說：「人在最小的事上忠心，在大事上也忠心。」',
        questionZh: '對於中學生的生活而言，「在最小的事上忠心」最貼切的體現是？',
        options: [
          { id: 'A', label: 'A', textZh: '每天按時起床、整理床鋪、認真做筆記、信守對朋友父母的小約定。' },
          { id: 'B', label: 'B', textZh: '現在小事都不用管，只要等高中畢業再去拯救世界就好。' },
          { id: 'C', label: 'C', textZh: '只在有老師監督的時候才假裝認真。' },
          { id: 'D', label: 'D', textZh: '只要成績好，生活習慣再邋遢混亂也沒關係。' }
        ],
        correctOptionId: 'A',
        explanationZh: '偉大的品格是從日常微小的習慣累積而成的。守時、守信、收拾身邊環境、認真對待作業，都是在最小的事上操練忠心負責的最好土壤。',
        virtuePrincipleZh: '在無人注意的細節上忠心，是走向成熟品格的必經之路。'
      }
    ]
  },
  {
    id: 'perseverance',
    order: 5,
    nameZh: '毅力',
    nameEn: 'Perseverance',
    canonicalNameZh: '毅力',
    canonicalNameEn: 'Perseverance',
    aliasesZh: ['堅持', '堅毅'],
    aliasesEn: ['Endurance', 'Persistence'],
    shortDescZh: '在遭遇挫折、疲憊或看不到成果時，依然堅定信念，持之以恆。',
    shortDescEn: 'Continuing faithfully toward God-given goals despite hardships, delays, and obstacles.',
    color: {
      primary: 'bg-teal-600 hover:bg-teal-700 text-white',
      bgLight: 'bg-teal-50',
      border: 'border-teal-200',
      text: 'text-teal-800',
      badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
      accent: 'teal',
    },
    iconName: 'Flame',
    bibleVerse: {
      referenceZh: '加拉太書 6:9',
      referenceEn: 'Galatians 6:9',
      textZh: '我們行善，不可喪志；若不灰心，到了時候就要收成。',
      textEn: 'Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.',
    },
    bibleStory: {
      titleZh: '使徒保羅跑盡當跑的路',
      titleEn: 'Paul’s Unstoppable Race of Faith',
      characterZh: '使徒保羅 (Apostle Paul)',
      characterEn: 'Apostle Paul',
      summaryZh: '保羅傳揚福音歷經重重逼迫、船難、鞭打與下監，甚至身負「刺」的苦楚，但他不畏艱難奔跑到底，守住了所信的道。',
      fullStoryZh: [
        '使徒保羅接受主的呼召後，奔走羅馬帝國各地建立教會。他的旅程絕非一帆風順，而是充滿險阻：三次被棍打、一次被石頭打、三次遇著船難、一晝一夜在深海裡掙扎。',
        '他多次經歷江河的危險、盜賊的危險、同族的危險、外邦人的危險，又屢次受勞碌、受困苦、不得睡、又飢又渴、受寒冷赤身。更有一根「刺」加在他肉體上讓他痛苦難耐。',
        '然而，面對苦難與挫折，保羅在哥林多後書堅定地說：「我們四面受敵，卻不被困住；心裡作難，卻不致失望；遭逼迫，卻不被丟棄；打倒了，卻不致死亡。」主的恩典在他軟弱處顯得完全。',
        '到了生命的終點，保羅坐在羅馬陰冷的死囚監牢中，寫信給提摩太總結他的一生：「那美好的仗我已經打過了，當跑的路我已經跑盡了，所信的道我已經守住了。從此以後，有公義的冠冕為我存留。」'
      ],
      keyTakeawayZh: '堅持不是依靠自我的蠻力硬撐，而是把目光定睛在永恆的盼望上，在每次跌倒後靠主再次站起來。',
      keyTakeawayEn: 'Perseverance is running with endurance the race set before us, fixing our eyes on Jesus who sustains our steps.'
    },
    reflectionQuestion: {
      questionZh: '在學習某門困難科目、練習樂器或培養良好作息時，你是否曾因短時間內沒看到成績而想半途而廢？',
      questionEn: 'Have you felt like giving up on a difficult subject or skill because you didn’t see immediate results?',
      thoughtPromptZh: '想一想：農夫撒種後需要耐心等候秋雨春雨。神應許我們「若不灰心，到了時候就要收成」。你目前需要為哪件事堅持下去？',
      guideQuestionsZh: [
        '辨認你目前最想放棄的一件事，背後真正的原因是疲累、挫敗感還是缺乏自信？',
        '如果保羅現在坐在你身邊，看著你的努力，他會對你說什麼鼓勵的話？',
        '寫下一個「不放棄的承諾」：即使今天進步只有 1%，我也要為目標持守前行。'
      ]
    },
    practicalActivity: {
      titleZh: '「持之以恆馬拉松」打卡',
      titleEn: 'Perseverance Marathon Habit Tracker',
      descriptionZh: '挑選一件有益但需要毅力的小習慣（如每天背 5 個生字、運動 15 分鐘、安靜默想 5 分鐘），堅持連續執行。',
      stepsZh: [
        '選定目標，寫在書桌前醒目處，告訴神：「主啊，求賜我堅忍到底的心志。」',
        '每當萌生想偷懶或放棄念頭時，默念加拉太書 6:9：「若不灰心，到了時候就要收成。」',
        '邀請一位好朋友或家長作為你的「堅持夥伴」，互相鼓勵打氣。'
      ],
      badgeNameZh: '保羅堅毅冠冕徽章 (Paul Endurance Badge)'
    },
    quizQuestions: [
      {
        id: 'perseverance-q1',
        scenarioZh: '小明在練習英語口語演講比賽，前兩次模擬考分數都很低，發音也常被糾正。距離正式比賽只剩兩週，他沮喪地想退賽不去了。',
        questionZh: '若你運用聖經中「堅持」的智慧來勉勵小明，最好的建議是？',
        options: [
          { id: 'A', label: 'A', textZh: '「沒天賦就趕快放棄吧，免得正式比賽上台丟人現眼。」' },
          { id: 'B', label: 'B', textZh: '「挫折是成長必經的磨練。保羅說『行善不可喪志，到了時候就要收成』。我們一起分析問題，每天進步一點點，堅持到底就是最美的得勝。」' },
          { id: 'C', label: 'C', textZh: '「直接花錢請別人替你去比賽好了。」' },
          { id: 'D', label: 'D', textZh: '「去跟評審老師吵架，抗議他給分太嚴格不公。」' }
        ],
        correctOptionId: 'B',
        explanationZh: '真正的堅忍並非盲目樂觀，而是在挫折中看到磨練生命的價值。用經文與同理心陪伴朋友重新審視努力的過程，正是彼此扶持的典範。',
        virtuePrincipleZh: '堅持是相信努力的過程神都看重，在灰心時仰望應許重新得力。'
      },
      {
        id: 'perseverance-q2',
        scenarioZh: '提摩太後書 4:7 保羅在面對生命的最後階段時宣告了什麼？',
        questionZh: '保羅能夠跑盡當跑之路的最關鍵心態是什麼？',
        options: [
          { id: 'A', label: 'A', textZh: '他靠著自己的超能力打敗了所有人。' },
          { id: 'B', label: 'B', textZh: '「那美好的仗我已經打過了，當跑的路我已經跑盡了，所信的道我已經守住了。」他至死忠心仰望主的榮耀冠冕。' },
          { id: 'C', label: 'C', textZh: '他抱怨神對他太不公平，讓他受了太多苦。' },
          { id: 'D', label: 'D', textZh: '他後悔自己當初不該信耶穌。' }
        ],
        correctOptionId: 'B',
        explanationZh: '保羅回顧一生，縱然傷痕累累，但他以打美好的仗、跑盡當跑的路為榮，堅守信仰至終，為所有基督徒樹立了堅忍不拔的標杆。',
        virtuePrincipleZh: '堅持的終點是公義的冠冕與神稱許的喜樂。'
      },
      {
        id: 'perseverance-q3',
        scenarioZh: '加拉太書 6:9 提醒：「我們行善，不可喪志；若不灰心，到了時候就要收成。」',
        questionZh: '這句經文對面臨學業和品格成長的中學生，最大的心理建設是什麼？',
        options: [
          { id: 'A', label: 'A', textZh: '成果常常需要時間孕育，不要因為眼前暫時看不到進步就放棄行善或努力，神的時候到了必定收成。' },
          { id: 'B', label: 'B', textZh: '只要今天禱告，明天立刻就能不勞而獲考全校第一名。' },
          { id: 'C', label: 'C', textZh: '行善如果沒有立刻拿到好處，就應該立刻停下來。' },
          { id: 'D', label: 'D', textZh: '收成只屬於天生聰明幸運的人，平凡人不用嘗試。' }
        ],
        correctOptionId: 'A',
        explanationZh: '生命的收穫如植物生長，需要耐性與澆灌。經文特別提醒「到了時候 (at the proper time)」，培養我們在逆境與沉潛期依然持守善道、不灰心的毅力。',
        virtuePrincipleZh: '堅毅是在信心中等候神的時間，持續耕耘不放棄。'
      }
    ]
  }
];

export const DAILY_VERSE = {
  referenceZh: '彌迦書 6:8',
  referenceEn: 'Micah 6:8',
  textZh: '世人哪，耶和華已指示你何為善。他向你所要的是什麼呢？只要你行公義，好憐憫，存謙卑的心，與你的神同行。',
  textEn: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.',
  reflectionShortZh: '品格教育不是繁瑣的規條，而是每天存著謙卑溫暖的心，活出公義與愛，與神同行。'
};

export const PRESET_TUTOR_QUESTIONS = [
  {
    category: '勇氣 Courage',
    question: '朋友在背後嘲笑新轉來的同學，我害怕被排擠不敢出聲，該怎麼辦？',
    virtueId: 'courage'
  },
  {
    category: '誠實 Honesty',
    question: '考試時好朋友拜託我給他看答案，我不給會壞了友情嗎？',
    virtueId: 'honesty'
  },
  {
    category: '同情心 Compassion',
    question: '有些同學脾氣很怪很難相處，聖經叫我們要愛人如己，這有可能做到嗎？',
    virtueId: 'compassion'
  },
  {
    category: '責任 Responsibility',
    question: '答應父母和老師要做的事情一直拖延，我該如何克服「等一下再做」的心態？',
    virtueId: 'responsibility'
  },
  {
    category: '毅力 Perseverance',
    question: '我很努力讀書但成績還是沒有起色，真的很灰心想放棄，聖經怎麼看努力的意義？',
    virtueId: 'perseverance'
  }
];
