import { ChatMessage } from '../types';

interface TutorResponsePayload {
  text: string;
  thinkingPoints: string[];
  bibleVerseTag: string;
  suggestedQuestions: string[];
}

/**
 * VELS Mini AI Teaching Assistant Service
 * Warm, biblical character education mentor designed for secondary school students.
 * Follows Socratic pedagogy: Empathy -> Biblical Perspective -> Reflective Questions -> Actionable Step.
 */
export async function generateTutorResponse(
  userPrompt: string,
  history: ChatMessage[] = []
): Promise<TutorResponsePayload> {
  // Simulate natural AI thinking delay (600ms - 1000ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  const prompt = userPrompt.trim().toLowerCase();

  // 1. Peer pressure / Bullying / Speaking up / Courage
  if (
    prompt.includes('排擠') ||
    prompt.includes('嘲笑') ||
    prompt.includes('同儕') ||
    prompt.includes('霸凌') ||
    prompt.includes('不敢') ||
    prompt.includes('害怕') ||
    prompt.includes('勇氣')
  ) {
    return {
      text: `同學你好，我看見了你內心的善良與掙扎！你能夠意識到別人受傷，並且渴望做對的事，這本身就非常可貴。\n\n在學校的環境中，面對群體的眼光和可能被孤立的風險，感到恐懼是完全正常的反應。聖經中的少年大衛在面對巨人歌利亞時，全軍的成年戰士都退縮了，大衛並不是不害怕，而是他深知**「萬軍之耶和華與他同在」**。\n\n勇氣不代表我們要用激烈的言語去硬碰硬，很多時候，勇氣是在關鍵時刻給予受傷者一個溫暖的眼神、在午餐時主動坐到他身旁，或是溫和但堅定地對嘲笑者說：「嘿，我們別這樣開玩笑吧。」\n\n神造每個人都有不可抹滅的尊嚴，當你願意為弱小者點燃一盞燈，神必賜你剛強的心！`,
      thinkingPoints: [
        '面對恐懼時，我最害怕失去的是什麼？是別人的認同，還是內心的平安？',
        '耶穌基督如何對待那些在社會被孤立或邊緣化的人？',
        '真正的受歡迎與真實的尊嚴，哪一個更能經得起時間的考驗？'
      ],
      bibleVerseTag: '約書亞記 1:9「你當剛強壯膽！不要懼怕，也不要驚惶；因為你無論往哪裡去，耶和華你的神必與你同在。」',
      suggestedQuestions: [
        '如果我的好朋友就是帶頭嘲笑別人的人，我該如何私下跟他說？',
        '怎樣在不激化衝突的情況下，保護受委屈的同學？',
        '聖經中還有哪位人物曾冒險為同胞爭取正義？'
      ]
    };
  }

  // 2. Cheating / Exam / Honesty vs Friendship / Lying
  if (
    prompt.includes('作弊') ||
    prompt.includes('誠實') ||
    prompt.includes('說謊') ||
    prompt.includes('隱瞞') ||
    prompt.includes('考試') ||
    prompt.includes('講實話') ||
    prompt.includes('借看')
  ) {
    return {
      text: `親愛的同學，謝謝你提出這麼真實、很多中學生都會遇到的道德兩難！在友情與誠信之間拉扯，心裡一定很沉重。\n\n你想維護友誼的心意是好的，但我們需要停下來想一想：**「什麼才是對朋友長遠真正有益的愛？」**\n\n聖經中的但以理在異邦巴比倫宮廷中，面臨各種妥協的誘惑，但他立志持守真理。聖經記載政敵完全找不著他的過失，因為他行在光中。若我們因「講義氣」而幫忙作弊或掩飾，其實是在無形中削弱了朋友面對真實挑戰的能力，甚至讓他習慣了僥倖。\n\n你可以嘗試考後真誠地向他說：「因為我很在乎我們這段友誼，我不希望我們任何一個人因為作弊留下遺憾。這次考試我不能給你看，但考完之後，我非常願意把你不會的題目一步一步算給你看！」真正的友情是經得起真理淬鍊的。`,
      thinkingPoints: [
        '用虛假換來的友情，能帶給我們心靈長久的踏實嗎？',
        '當我選擇誠實時，神應許給我們什麼樣的喜悅與自由？',
        '我如何能在堅持原則的同時，用溫柔和同理心表達我的關懷？'
      ],
      bibleVerseTag: '箴言 12:22「說謊言的嘴為耶和華所憎惡；行事誠實的，為他所喜悅。」',
      suggestedQuestions: [
        '如果我已經跟朋友說了實話，他卻生氣不理我，該怎麼面對？',
        '如果不小心說了謊，該如何鼓起勇氣承認並道歉？',
        '誠實和「說話不懂看場合刺傷人」有什麼本質區別？'
      ]
    };
  }

  // 3. Difficult peers / Anger / Compassion / Loving enemies
  if (
    prompt.includes('難相處') ||
    prompt.includes('討厭') ||
    prompt.includes('憐憫') ||
    prompt.includes('原諒') ||
    prompt.includes('生氣') ||
    prompt.includes('愛人') ||
    prompt.includes('吵架')
  ) {
    return {
      text: `這是一個非常深刻而且誠實的問題！要愛一個容易相處、對我們友善的人很容易；但要面對一個脾氣古怪、尖銳甚至曾經傷害過我們的人，感到生氣與抗拒是人之常情。\n\n耶穌講過「好撒馬利亞人」的故事。在當時，猶太人與撒馬利亞人世世代代互看不順眼。然而，當那個撒馬利亞人看見倒在血泊中的受傷者時，他放下了族群恩怨與既定標籤，看見的是一個「同樣需要恩慈的生命」。\n\n有時候，刺蝟般傷人的同學，內心往往也是傷痕累累、渴望被注意卻不知如何表達。憐憫並不代表你要毫無界線地任由對方欺負，而是**「在心中不被仇恨綑綁，並願意以神的眼光看待對方的價值」**。試著先為他做一個默默的祝福禱告，你會發現你的心境會有奇妙的轉變！`,
      thinkingPoints: [
        '當有人刺傷我時，我能不能看見他尖銳背後的脆弱或孤單？',
        '原諒一個人，到底是釋放了對方，還是釋放了自己緊繃的心？',
        '我可以用什麼健康的方式設立界線，同時又保持心靈的善意？'
      ],
      bibleVerseTag: '歌羅西書 3:12「你們既是神的選民，聖潔蒙愛的人，就要穿上憐憫、恩慈、謙虛、溫柔、忍耐的心。」',
      suggestedQuestions: [
        '怎樣在保護自己不受言語傷害的前提下，展現基督的愛？',
        '遇到常常在背後說我壞話的同學，我該怎麼調整心態？',
        '聖經中耶穌在十字架上如何為逼迫祂的人禱告？'
      ]
    };
  }

  // 4. Procrastination / Laziness / Responsibility / Habits
  if (
    prompt.includes('拖延') ||
    prompt.includes('等一下') ||
    prompt.includes('懶惰') ||
    prompt.includes('責任') ||
    prompt.includes('手機') ||
    prompt.includes('專心') ||
    prompt.includes('自律') ||
    prompt.includes('作業')
  ) {
    return {
      text: `哈囉！你提到的「等一下再做」是現代青少年（甚至大人）最常見的心靈拔河！滑手機、打電動的即時快樂，往往比坐下來寫作業更具吸引力。\n\n聖經在路加福音中教導了一條無比寶貴的法則：**「人在最小的事上忠心，在大事上也忠心。」**\n\n聖經裡的少年約瑟，即使被賣到外地成為家奴，甚至被冤枉下在監獄裡，他都沒有因為環境不起眼而敷衍躺平。他認真打理好主人交代的每件小事，最終在最關鍵的時刻被神重用，拯救了無數人的生命。\n\n責任感不是靠某天突然爆發的超能力，而是由「現在這個瞬間」的微小決定累積出來的。你可以試試「5 分鐘法則」：先不把整份作業當作龐然大物，只要告訴自己「我現在就專注打開課本寫 5 分鐘就好」。只要起步，聖靈會加添你自律與持守的力量！`,
      thinkingPoints: [
        '當我一直拖延時，我的心靈是真的得到了放鬆，還是背負著更多的焦慮？',
        '我如何將每天平淡的作業與作息，看作神所託付的一塊小花園？',
        '今天我可以先從哪一件最容易完成的小事開始踏出第一步？'
      ],
      bibleVerseTag: '路加福音 16:10「人在最小的事上忠心，在大事上也忠心；在最小的事上有不義，在大事上也有不義。」',
      suggestedQuestions: [
        '如何設定每天讀書與使用手機的健康界線？',
        '如果已經欠了好多項作業，感到被壓垮時該如何重整腳步？',
        '聖經中還有哪些人物在困境中展現忠心負責？'
      ]
    };
  }

  // 5. Burnout / Frustration / Perseverance / Giving up / Grades
  if (
    prompt.includes('放棄') ||
    prompt.includes('灰心') ||
    prompt.includes('成績') ||
    prompt.includes('挫折') ||
    prompt.includes('堅持') ||
    prompt.includes('很累') ||
    prompt.includes('努力') ||
    prompt.includes('失敗')
  ) {
    return {
      text: `拍拍你的肩膀，辛苦了！付出許多心血與時間，卻沒有立刻看到期待的成績或掌聲，那種無力感是極其真實的，你想停下來喘口氣也是人之常情。\n\n使徒保羅在奔跑信仰的道路時，曾遭遇狂風、船難、被毆打、下監，甚至身上有一根痛苦的「刺」。然而他在加拉太書寫下一句溫暖而有力的承諾：**「我們行善，不可喪志；若不灰心，到了時候就要收成。」**\n\n請記得：植物的種子在泥土深處向下扎根時，地表上是一片漆黑、什麼也看不見的。現在你所付出的每一滴汗水、每一次反覆練習，都在建立你生命的韌性與深度。神衡量你的價值，絕非只看一張成績單上的數字，祂看重的是你在挫敗中依然信靠祂、願意再試一次的堅毅品格！`,
      thinkingPoints: [
        '我現在感到疲倦，是因為方法需要調整，還是因為我把自己的價值完全綁定在短期結果上了？',
        '聖經說「到了時候就要收成」，神的時間表與我自己的急躁有何不同？',
        '今天我可以給自己一個什麼樣的肯定與喘息空間？'
      ],
      bibleVerseTag: '加拉太書 6:9「我們行善，不可喪志；若不灰心，到了時候就要收成。」',
      suggestedQuestions: [
        '當考試考砸了，該如何跟期望很高的父母溝通？',
        '如何在讀書感到枯燥焦慮時，透過禱告恢復心靈的平靜？',
        '堅持到底的人，通常具備什麼樣的心態與習慣？'
      ]
    };
  }

  // Default warm Socratic mentor response for other questions
  return {
    text: `你好！我是 VELS 品格助教以諾老師（Mentor Enoch）。很高興你願意停下腳步，思考關於品格與生命的課題！\n\n中學時期是塑造我們價值觀、人格特質最關鍵的黃金階段。在日常生活、課業與人際互動中，我們每天都在做出選擇：是選擇隨波逐流，還是依靠神的話語活出**勇氣 (Courage)、誠實 (Honesty)、同情心 (Compassion)、責任 (Responsibility) 與毅力 (Perseverance)**？\n\n針對你剛才提到的問題，聖經詩篇 119:105 說：「你的話是我腳前的燈，是我路上的光。」邀請你試著把心靜下來，問問自己：\n1. 在這件事上，耶穌會如何看待與回應？\n2. 什麼樣的選擇能帶給你心靈深處長久的真實平安？\n\n請隨時告訴我你的想法，無論是校園裡的煩惱還是對聖經人物的好奇，我們一起探索！`,
    thinkingPoints: [
      '這件事的核心價值觀是什麼？與神所喜悅的品格有何關聯？',
      '如果做出最容易的選擇與做出最正確的選擇之間有衝突，我該如何抉擇？',
      '我生命中有哪些值得信賴的師長或屬靈同伴可以一同禱告分擔？'
    ],
    bibleVerseTag: '彌迦書 6:8「世人哪，耶和華已指示你何為善。他向你所要的是什麼呢？只要你行公義，好憐憫，存謙卑的心，與你的神同行。」',
    suggestedQuestions: [
      '我想深入了解「大衛面對歌利亞」的勇氣故事',
      '在學校遇到困難時，如何養成即時默禱的習慣？',
      '五大美德中，我現在最需要加強哪一個？'
    ]
  };
}
