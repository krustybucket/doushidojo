let _staticDataCache = null;

export function getStaticData() {
    if (_staticDataCache) return _staticDataCache;

    // *** GUIDE CONTENT (JAPANESE FORMS) ***
    const TENSE_GUIDE = [
    {
      name: "Polite Present (Masu form)",
      usage: "Used in formal situations to state habits, general truths, or future actions.",
      structure: "Verb stem + ます (masu). For Ru-verbs: drop 'ru' add 'masu'. For U-verbs: change 'u' sound to 'i' sound + 'masu'.",
      example: "食べる (taberu) -> 食べます (tabemasu) / 行く (iku) -> 行きます (ikimasu)",
      exceptions: "する (suru) becomes します (shimasu). 来る (kuru) becomes 来ます (kimasu)."
    },
    {
      name: "Polite Past (Mashita form)",
      usage: "Used in formal situations to describe an action completed in the past.",
      structure: "Verb stem + ました (mashita). Follows the same stem rules as the Masu form.",
      example: "食べる (taberu) -> 食べました (tabemashita)",
      exceptions: "する (suru) becomes しました (shimashita). 来る (kuru) becomes 来ました (kimashita)."
    },
    {
      name: "Plain Negative (Nai form)",
      usage: "Used in casual speech to state that an action will not happen.",
      structure: "Ru-verbs: drop 'ru', add 'nai'. U-verbs: change 'u' sound to 'a' sound + 'nai'.",
      example: "食べる (taberu) -> 食べない (tabenai) / 行く (iku) -> 行かない (ikanai)",
      exceptions: "ある (aru) completely changes to ない (nai). する (suru) becomes しない (shinai). 来る (kuru) becomes こない (konai)."
    },
    {
      name: "Te-Form",
      usage: "Used to connect sentences, make requests (with kudasai), or indicate ongoing action (with iru).",
      structure: "Ru-verbs: drop 'ru', add 'te'. U-verbs depend on ending (u/tsu/ru -> tte, mu/bu/nu -> nde, ku -> ite, gu -> ide).",
      example: "食べる (taberu) -> 食べて (tabete) / 飲む (nomu) -> 飲んで (nonde)",
      exceptions: "行く (iku) is an exception and becomes 行って (itte) instead of 行いて (iite). する (suru) -> して (shite). 来る (kuru) -> 来て (kite)."
    },
    {
      name: "Plain Past (Ta form)",
      usage: "Casual past tense. Follows the exact same conjugation rules as the Te-form, but ending in 'ta' or 'da'.",
      structure: "Ru-verbs: drop 'ru', add 'ta'. U-verbs: te -> ta, de -> da.",
      example: "食べる (taberu) -> 食べた (tabeta) / 飲む (nomu) -> 飲んだ (nonda)",
      exceptions: "行く (iku) becomes 行った (itta). する (suru) -> した (shita). 来る (kuru) -> 来た (kita)."
    },
    {
      name: "Potential Form (Can do)",
      usage: "Expresses the ability or potential to do something.",
      structure: "Ru-verbs: drop 'ru', add 'rareru'. U-verbs: change 'u' sound to 'e' sound + 'ru'.",
      example: "食べる (taberu) -> 食べられる (taberareru) / 飲む (nomu) -> 飲める (nomeru)",
      exceptions: "する (suru) becomes できる (dekiru). 来る (kuru) becomes 来られる (korareru)."
    },
    {
      name: "Volitional Form (Let's do)",
      usage: "Used to suggest an action or express intention to do something.",
      structure: "Ru-verbs: drop 'ru', add 'you'. U-verbs: change 'u' sound to 'o' sound + 'u'.",
      example: "食べる (taberu) -> 食べよう (tabeyou) / 行く (iku) -> 行こう (ikou)",
      exceptions: "する (suru) becomes しよう (shiyou). 来る (kuru) becomes こよう (koyou)."
    },
    {
      name: "Conditional 'Tara' Form (If / When)",
      usage: "The most common 'if/then' or 'when' conditional in Japanese.",
      structure: "Simply add 'ra' (ら) to the Plain Past (Ta form).",
      example: "食べる (taberu) -> 食べたら (tabetara) / 飲む (nomu) -> 飲んだら (nondara)"
    },
    {
      name: "Conditional 'Ba' Form (If)",
      usage: "Used for logical conditions ('If X happens, Y will happen').",
      structure: "Ru-verbs: drop 'ru', add 'reba'. U-verbs: change 'u' sound to 'e' sound + 'ba'.",
      example: "食べる (taberu) -> 食べれば (tabereba) / 行く (iku) -> 行けば (ikeba)",
      exceptions: "する (suru) becomes すれば (sureba). 来る (kuru) becomes くれば (kureba)."
    },
    {
      name: "Passive Form (Be done to)",
      usage: "Expresses an action done *to* the subject, often implying inconvenience.",
      structure: "Ru-verbs: drop 'ru', add 'rareru'. U-verbs: change 'u' sound to 'a' sound + 'reru'.",
      example: "叱る (shikaru) -> 叱られる (shikarareru) / 踏む (fumu) -> 踏まれる (fumareru)",
      exceptions: "する (suru) becomes される (sareru). 来る (kuru) becomes こられる (korareru)."
    },
    {
      name: "Causative Form (Make / Let someone do)",
      usage: "Used when someone forces or allows someone else to do an action.",
      structure: "Ru-verbs: drop 'ru', add 'saseru'. U-verbs: change 'u' sound to 'a' sound + 'seru'.",
      example: "待つ (matsu) -> 待たせる (mataseru) / 食べる (taberu) -> 食べさせる (tabesaseru)",
      exceptions: "する (suru) becomes させる (saseru). 来る (kuru) becomes こさせる (kosaseru)."
    },
    {
      name: "Causative-Passive Form (Be made to do)",
      usage: "Used when you are forced to do something against your will.",
      structure: "Ru-verbs: drop 'ru', add 'saserareru'. U-verbs (ending in su): 'saserareru'. Other U-verbs: change 'u' to 'a' + 'sareru'.",
      example: "飲む (nomu) -> 飲まされる (nomasareru) / 待つ (matsu) -> 待たされる (matasareru)",
      exceptions: "する (suru) becomes させられる (saserareru). 来る (kuru) becomes こさせられる (kosaserareru)."
    },
    {
      name: "Imperative Form (Command)",
      usage: "A forceful command to do something. Usually used by men, in emergencies, or in sports.",
      structure: "Ru-verbs: drop 'ru', add 'ro'. U-verbs: change 'u' sound to 'e' sound.",
      example: "食べる (taberu) -> 食べろ (tabero) / 行く (iku) -> 行け (ike)",
      exceptions: "する (suru) becomes しろ (shiro). 来る (kuru) becomes こい (koi)."
    },
    {
      name: "Prohibitive Form (Negative Command)",
      usage: "A forceful command *not* to do something.",
      structure: "Verb dictionary form + な (na).",
      example: "入る (hairu) -> 入るな (hairuna) / 食べる (taberu) -> 食べるな (taberuna)"
    }
  ];

    // *** CUSTOM SENTENCE LIBRARY (JAPANESE) ***
    const CUSTOM_LIBRARY = [
        // 食べる (Taberu) - To eat
        {
            "verb": "食べる (taberu)",
            "tense": "Polite Present (Masu)",
            "text": "私は毎日りんごを[食べます]。",
            "translation": "I eat an apple every day.",
            "kana": "たべます",
            "reading": "わたし は まいにち りんご を たべます。"
        },
        {
            "verb": "食べる (taberu)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、美味しいケーキを[食べました]。",
            "translation": "I ate a delicious cake yesterday.",
            "kana": "たべました",
            "reading": "きのう、 おいしい ケーキ を たべました。"
        },
        {
            "verb": "食べる (taberu)",
            "tense": "Te-form",
            "text": "野菜を[食べて]ください。",
            "translation": "Please eat your vegetables.",
            "kana": "たべて",
            "reading": "やさい を たべて ください。"
        },
        {
            "verb": "食べる (taberu)",
            "tense": "Plain Negative (Nai)",
            "text": "私はお肉を[食べない]。",
            "translation": "I don't eat meat. (Casual)",
            "kana": "たべない",
            "reading": "わたし は おにく を たべない。"
        },
        {
            "verb": "食べる (taberu)",
            "tense": "Plain Past (Ta)",
            "text": "もう朝ごはんを[食べた]？",
            "translation": "Did you already eat breakfast? (Casual)",
            "kana": "たべた",
            "reading": "もう あさごはん を たべた？"
        },

        // 飲む (Nomu) - To drink
        {
            "verb": "飲む (nomu)",
            "tense": "Polite Present (Masu)",
            "text": "毎朝コーヒーを[飲みます]。",
            "translation": "I drink coffee every morning.",
            "kana": "のみます",
            "reading": "まいあさ コーヒー を のみます。"
        },
        {
            "verb": "飲む (nomu)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日ビールをたくさん[飲みました]。",
            "translation": "I drank a lot of beer yesterday.",
            "kana": "のみました",
            "reading": "きのう ビール を たくさん のみました。"
        },
        {
            "verb": "飲む (nomu)",
            "tense": "Te-form",
            "text": "薬を[飲んで]ください。",
            "translation": "Please take (drink) your medicine.",
            "kana": "のんで",
            "reading": "くすり を のんで ください。"
        },
        {
            "verb": "飲む (nomu)",
            "tense": "Plain Negative (Nai)",
            "text": "今日はワインを[飲まない]。",
            "translation": "I won't drink wine today. (Casual)",
            "kana": "のまない",
            "reading": "きょう は ワイン を のまない。"
        },

        // 行く (Iku) - To go
        {
            "verb": "行く (iku)",
            "tense": "Polite Present (Masu)",
            "text": "明日、東京へ[行きます]。",
            "translation": "I will go to Tokyo tomorrow.",
            "kana": "いきます",
            "reading": "あした、 とうきょう へ いきます。"
        },
        {
            "verb": "行く (iku)",
            "tense": "Polite Past (Mashita)",
            "text": "先週、海へ[行きました]。",
            "translation": "I went to the beach last week.",
            "kana": "いきました",
            "reading": "せんしゅう、 うみ へ いきました。"
        },
        {
            "verb": "行く (iku)",
            "tense": "Te-form",
            "text": "早く学校に[行って]ください。",
            "translation": "Please go to school quickly.",
            "kana": "いって",
            "reading": "はやく がっこう に いって ください。",
            "exception": "行く (iku) is an exception for the te-form. Even though it ends in 'ku', it becomes 行って (itte), not 行いて (iite)."
        },
        {
            "verb": "行く (iku)",
            "tense": "Plain Negative (Nai)",
            "text": "今日はどこにも[行かない]。",
            "translation": "I'm not going anywhere today. (Casual)",
            "kana": "いかない",
            "reading": "きょう は どこ に も いかない。"
        },

        // する (Suru) - To do
        {
            "verb": "する (suru)",
            "tense": "Polite Present (Masu)",
            "text": "今夜、日本語の勉強を[します]。",
            "translation": "I will study Japanese tonight.",
            "kana": "します",
            "reading": "こんや、 にほんご の べんきょう を します。",
            "exception": "する (suru) is an irregular verb. The stem changes to し (shi) -> します (shimasu)."
        },
        {
            "verb": "する (suru)",
            "tense": "Polite Past (Mashita)",
            "text": "週末はテニスを[しました]。",
            "translation": "I played tennis over the weekend.",
            "kana": "しました",
            "reading": "しゅうまつ は テニス を しました。",
            "exception": "する (suru) is irregular. The past polite is しました (shimashita)."
        },
        {
            "verb": "する (suru)",
            "tense": "Te-form",
            "text": "宿題を[して]ください。",
            "translation": "Please do your homework.",
            "kana": "して",
            "reading": "しゅくだい を して ください。",
            "exception": "する (suru) is irregular. Its te-form is して (shite)."
        },
        {
            "verb": "する (suru)",
            "tense": "Plain Negative (Nai)",
            "text": "無理は[しない]でください。",
            "translation": "Please don't overdo it. (do the impossible)",
            "kana": "しない",
            "reading": "むり は しない で ください。",
            "exception": "する (suru) is irregular. Its nai-form is しない (shinai)."
        },

        // 来る (Kuru) - To come
        {
            "verb": "来る (kuru)",
            "tense": "Polite Present (Masu)",
            "text": "明日、友達が家に[来ます]。",
            "translation": "My friend will come to my house tomorrow.",
            "kana": "きます",
            "reading": "あした、 ともだち が いえ に きます。",
            "exception": "来る (kuru) is an irregular verb. The stem changes to き (ki) -> 来ます (kimasu)."
        },
        {
            "verb": "来る (kuru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、母が[来ました]。",
            "translation": "My mother came over yesterday.",
            "kana": "きました",
            "reading": "きのう、 はは が きました。",
            "exception": "来る (kuru) is irregular. The past polite is 来ました (kimashita)."
        },
        {
            "verb": "来る (kuru)",
            "tense": "Te-form",
            "text": "こっちに[来て]ください。",
            "translation": "Please come here.",
            "kana": "きて",
            "reading": "こっち に きて ください。",
            "exception": "来る (kuru) is irregular. Its te-form is 来て (kite)."
        },
        {
            "verb": "来る (kuru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼はパーティーに[来ない]と思う。",
            "translation": "I don't think he will come to the party.",
            "kana": "こない",
            "reading": "かれ は パーティー に こない と おもう。",
            "exception": "来る (kuru) is irregular. The pronunciation changes! Its nai-form is こない (konai)."
        },

        // 話す (Hanasu) - To speak
        {
            "verb": "話す (hanasu)",
            "tense": "Polite Present (Masu)",
            "text": "私は英語と日本語を[話します]。",
            "translation": "I speak English and Japanese.",
            "kana": "はなします",
            "reading": "わたし は えいご と にほんご を はなします。"
        },
        {
            "verb": "話す (hanasu)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、先生と[話しました]。",
            "translation": "I talked to the teacher yesterday.",
            "kana": "はなしました",
            "reading": "きのう、 せんせい と はなしました。"
        },
        {
            "verb": "話す (hanasu)",
            "tense": "Te-form",
            "text": "もっとゆっくり[話して]ください。",
            "translation": "Please speak more slowly.",
            "kana": "はなして",
            "reading": "もっと ゆっくり はなして ください。"
        }, {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "毎朝シャワーを[浴びます]。",
            "translation": "I take a shower every morning.",
            "kana": "あびます",
            "reading": "まいあさ しゃわー を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "太陽の光を[浴びます]。",
            "translation": "I bask in the sunlight.",
            "kana": "あびます",
            "reading": "たいよう の ひかり を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "試合の後で冷たい水を[浴びます]。",
            "translation": "I pour cold water over myself after the game.",
            "kana": "あびます",
            "reading": "しあい の あと で つめたい みず を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "スポットライトを[浴びます]。",
            "translation": "I step into the spotlight.",
            "kana": "あびます",
            "reading": "すぽっとらいと を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "賞賛を[浴びます]。",
            "translation": "I receive praise.",
            "kana": "あびます",
            "reading": "しょうさん を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "夜に熱いシャワーを[浴びます]。",
            "translation": "I take a hot shower at night.",
            "kana": "あびます",
            "reading": "よる に あつい しゃわー を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "公園で日光を[浴びます]。",
            "translation": "I bask in the sun at the park.",
            "kana": "あびます",
            "reading": "こうえん で にっこう を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "毎日、お湯を[浴びます]。",
            "translation": "I bathe in hot water every day.",
            "kana": "あびます",
            "reading": "まいにち、 おゆ を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "夏はよくシャワーを[浴びます]。",
            "translation": "I often take showers in the summer.",
            "kana": "あびます",
            "reading": "なつ は よく しゃわー を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Present (Masu)",
            "text": "彼はいつも非難を[浴びます]。",
            "translation": "He always receives criticism.",
            "kana": "あびます",
            "reading": "かれ は いつも ひなん を あびます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "今朝シャワーを[浴びました]。",
            "translation": "I took a shower this morning.",
            "kana": "あびました",
            "reading": "けさ しゃわー を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "海でたっぷり太陽を[浴びました]。",
            "translation": "I basked in plenty of sun at the beach.",
            "kana": "あびました",
            "reading": "うみ で たっぷり たいよう を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼は冷たい視線を[浴びました]。",
            "translation": "He was subjected to a cold stare.",
            "kana": "あびました",
            "reading": "かれ は つめたい しせん を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "優勝して歓声を[浴びました]。",
            "translation": "After winning, we were showered with cheers.",
            "kana": "あびました",
            "reading": "ゆうしょう して かんせい を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日の夜、シャワーを[浴びました]。",
            "translation": "I took a shower last night.",
            "kana": "あびました",
            "reading": "きのう の よる、 しゃわー を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "選手たちはフラッシュを[浴びました]。",
            "translation": "The players were bathed in camera flashes.",
            "kana": "あびました",
            "reading": "せんしゅ たち は ふらっしゅ を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "たくさんの批判を[浴びました]。",
            "translation": "I received a lot of criticism.",
            "kana": "あびました",
            "reading": "たくさん の ひはん を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "突然、雨を[浴びました]。",
            "translation": "I was suddenly showered with rain.",
            "kana": "あびました",
            "reading": "とつぜん、 あめ を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "舞台でスポットライトを[浴びました]。",
            "translation": "I was bathed in the spotlight on stage.",
            "kana": "あびました",
            "reading": "ぶたい で すぽっとらいと を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Polite Past (Mashita)",
            "text": "帰宅してすぐにシャワーを[浴びました]。",
            "translation": "I took a shower immediately after returning home.",
            "kana": "あびました",
            "reading": "きたく して すぐ に しゃわー を あびました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "シャワーを[浴びて]から寝ます。",
            "translation": "I will sleep after taking a shower.",
            "kana": "あびて",
            "reading": "しゃわー を あびて から ねます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "日光を[浴びて]、元気になりました。",
            "translation": "I basked in the sun and felt energetic.",
            "kana": "あびて",
            "reading": "にっこう を あびて、 げんき に なりました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "水を[浴びて]、目を覚まします。",
            "translation": "I dash water on myself to wake up.",
            "kana": "あびて",
            "reading": "みず を あびて、 め を さまします。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "賞賛を[浴びて]、彼は笑顔を見せた。",
            "translation": "Bathed in praise, he showed a smile.",
            "kana": "あびて",
            "reading": "しょうさん を あびて、 かれ は えがお を みせた。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "太陽の光を[浴びて]育った野菜です。",
            "translation": "These are vegetables grown bathing in sunlight.",
            "kana": "あびて",
            "reading": "たいよう の ひかり を あびて そだった やさい です。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "早くシャワーを[浴びて]ください。",
            "translation": "Please take a shower quickly.",
            "kana": "あびて",
            "reading": "はやく しゃわー を あびて ください。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "雨を[浴びて]、服が濡れました。",
            "translation": "My clothes got wet from being caught in the rain.",
            "kana": "あびて",
            "reading": "あめ を あびて、 ふく が ぬれました。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "朝日を[浴びて]散歩します。",
            "translation": "I take a walk bathing in the morning sun.",
            "kana": "あびて",
            "reading": "あさひ を あびて さんぽ します。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "注目を[浴びて]緊張しています。",
            "translation": "I am nervous being the center of attention.",
            "kana": "あびて",
            "reading": "ちゅうもく を あびて きんちょう しています。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Te-form",
            "text": "冷水を[浴びて]体を鍛えます。",
            "translation": "I train my body by dashing cold water on myself.",
            "kana": "あびて",
            "reading": "れいすい を あびて からだ を きたえます。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "今日はシャワーを[浴びない]。",
            "translation": "I will not take a shower today.",
            "kana": "あびない",
            "reading": "きょう は しゃわー を あびない。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "あまり日光を[浴びない]と、不健康です。",
            "translation": "It is unhealthy if you don't get much sunlight.",
            "kana": "あびない",
            "reading": "あまり にっこう を あびない と、 ふけんこう です。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は決して非難を[浴びない]。",
            "translation": "He never receives criticism.",
            "kana": "あびない",
            "reading": "かれ は けっして ひなん を あびない。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "夜はシャワーを[浴びない]つもりです。",
            "translation": "I don't intend to take a shower at night.",
            "kana": "あびない",
            "reading": "よる は しゃわー を あびない つもり です。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "紫外線を[浴びない]ように気をつけています。",
            "translation": "I am careful not to be exposed to UV rays.",
            "kana": "あびない",
            "reading": "しがいせん を あびない よう に き を つけて います。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰も注目を[浴びない]場所です。",
            "translation": "It is a place that gets no attention.",
            "kana": "あびない",
            "reading": "だれ も ちゅうもく を あびない ばしょ です。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "冷たい水は[浴びない]でください。",
            "translation": "Please do not dash cold water on yourself.",
            "kana": "あびない",
            "reading": "つめたい みず は あびない で ください。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "最近、あまり太陽の光を[浴びない]。",
            "translation": "Lately, I haven't been basking in the sunlight much.",
            "kana": "あびない",
            "reading": "さいきん、 あまり たいよう の ひかり を あびない。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "雨を[浴びない]ように傘をさします。",
            "translation": "I use an umbrella so I don't get rained on.",
            "kana": "あびない",
            "reading": "あめ を あびない よう に かさ を さします。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Negative (Nai)",
            "text": "朝はシャワーを[浴びない]派です。",
            "translation": "I am the type who doesn't take a shower in the morning.",
            "kana": "あびない",
            "reading": "あさ は しゃわー を あびない は です。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "昨日、シャワーを[浴びた]。",
            "translation": "I took a shower yesterday.",
            "kana": "あびた",
            "reading": "きのう、 しゃわー を あびた。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "ビーチでたくさん日光を[浴びた]。",
            "translation": "I got a lot of sun at the beach.",
            "kana": "あびた",
            "reading": "びーち で たくさん にっこう を あびた。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は大きな拍手を[浴びた]。",
            "translation": "He received a loud round of applause.",
            "kana": "あびた",
            "reading": "かれ は おおきな はくしゅ を あびた。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "突然の雨を[浴びた]。",
            "translation": "I was caught in a sudden shower.",
            "kana": "あびた",
            "reading": "とつぜん の あめ を あびた。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "彼女は世間の注目を[浴びた]。",
            "translation": "She drew the public's attention.",
            "kana": "あびた",
            "reading": "かのじょ は せけん の ちゅうもく を あびた。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "朝起きてすぐにシャワーを[浴びた]。",
            "translation": "I took a shower right after waking up in the morning.",
            "kana": "あびた",
            "reading": "あさ おきて すぐ に しゃわー を あびた。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "厳しい批判を[浴びた]ことがある。",
            "translation": "I have been subjected to harsh criticism before.",
            "kana": "あびた",
            "reading": "きびしい ひはん を あびた こと が ある。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "スポットライトを[浴びた]瞬間を覚えている。",
            "translation": "I remember the moment I was bathed in the spotlight.",
            "kana": "あびた",
            "reading": "すぽっとらいと を あびた しゅんかん を おぼえて いる。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "冷たい水を[浴びた]ので、風邪をひいた。",
            "translation": "I caught a cold because I was drenched in cold water.",
            "kana": "あびた",
            "reading": "つめたい みず を あびた ので、 かぜ を ひいた。"
        },
        {
            "verb": "浴びる (abiru)",
            "tense": "Plain Past (Ta)",
            "text": "たっぷり朝日を[浴びた]。",
            "translation": "I basked in plenty of morning sun.",
            "kana": "あびた",
            "reading": "たっぷり あさひ を あびた。"
        }, {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "雨が止んで、気温が[上がります]。",
            "translation": "The rain stops, and the temperature rises.",
            "kana": "あがります",
            "reading": "あめ が やんで、 きおん が あがります。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "このエレベーターは最上階まで[上がります]。",
            "translation": "This elevator goes up to the top floor.",
            "kana": "あがります",
            "reading": "この えれべーたー は さいじょうかい まで あがります。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "緊張すると、すぐに顔が赤く[上がります]。",
            "translation": "When I get nervous, my face turns red immediately.",
            "kana": "あがります",
            "reading": "きんちょう する と、 すぐに かお が あかく あがります。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "毎日、お風呂に[上がります]。",
            "translation": "I get out of the bath every day.",
            "kana": "あがります",
            "reading": "まいにち、 おふろ に あがります。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "給料が少し[上がります]。",
            "translation": "My salary will go up a little.",
            "kana": "あがります",
            "reading": "きゅうりょう が すこし あがります。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "舞台に[上がります]。",
            "translation": "I go up onto the stage.",
            "kana": "あがります",
            "reading": "ぶたい に あがります。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "成果が目に見えて[上がります]。",
            "translation": "The results improve visibly.",
            "kana": "あ上がります",
            "reading": "せいか が め に みえて あがります。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "どうぞ、こちらへ[上がります]か？",
            "translation": "Would you like to come in (up) here?",
            "kana": "あがります",
            "reading": "どうぞ、 こちら へ あがります か？"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "物価がどんどん[上がります]。",
            "translation": "Prices keep rising rapidly.",
            "kana": "あがります",
            "reading": "ぶっか が どんどん あがります。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Present (Masu)",
            "text": "階段を[上がります]。",
            "translation": "I go up the stairs.",
            "kana": "あがります",
            "reading": "かいだん を あがります。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、成績が[上がりました]。",
            "translation": "My grades went up yesterday.",
            "kana": "あがりました",
            "reading": "きのう、 せいせき が あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "ようやく雨が[上がりました]。",
            "translation": "The rain has finally stopped.",
            "kana": "あがりました",
            "reading": "ようやく あめ が あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "人前で話して、とても[上がりました]。",
            "translation": "I got very nervous speaking in public.",
            "kana": "あがりました",
            "reading": "ひとまえ で はなして、 とても あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "消費税が[上がりました]。",
            "translation": "The consumption tax went up.",
            "kana": "あ上がりました",
            "reading": "しょうひぜい が あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "客席から歓声が[上がりました]。",
            "translation": "Cheers rose from the audience.",
            "kana": "あがりました",
            "reading": "きゃくせき から かんせい が あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "靴を脱いで座敷に[上がりました]。",
            "translation": "I took off my shoes and stepped up into the tatami room.",
            "kana": "あがりました",
            "reading": "くつ を ぬいで ざしき に あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "花火が夜空に[上がりました]。",
            "translation": "Fireworks went up in the night sky.",
            "kana": "あがりました",
            "reading": "はなび が よぞら に あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "利益が予想以上に[上がりました]。",
            "translation": "Profits rose more than expected.",
            "kana": "あがりました",
            "reading": "りえき が よそういじょう に あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "二階へ[上がりました]。",
            "translation": "I went up to the second floor.",
            "kana": "あがりました",
            "reading": "にかい へ あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Polite Past (Mashita)",
            "text": "血圧が[上がりました]。",
            "translation": "My blood pressure rose.",
            "kana": "あがりました",
            "reading": "けつあつ が あがりました。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "温度が[上がって]、氷が溶けた。",
            "translation": "The temperature rose, and the ice melted.",
            "kana": "あがって",
            "reading": "おんど が あがって、 こおり が とけた。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "二階に[上がって]、本を取ってきます。",
            "translation": "I'll go upstairs and get a book.",
            "kana": "あがって",
            "reading": "にかい に あがって、 ほん を とってきます。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "雨が[上がって]、虹が出た。",
            "translation": "The rain stopped, and a rainbow appeared.",
            "kana": "あがって",
            "reading": "あめ が あがって、 にじ が でた。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "どうぞ、中へ[上がって]ください。",
            "translation": "Please, come inside.",
            "kana": "あ上がって",
            "reading": "どうぞ、 なか へ あがって ください。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "スピードが[上がって]危ない。",
            "translation": "The speed is increasing and it's dangerous.",
            "kana": "あがって",
            "reading": "すぴーど が あがって あぶない。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "お風呂から[上がって]、牛乳を飲む。",
            "translation": "I get out of the bath and drink milk.",
            "kana": "あがって",
            "reading": "おふろ から あがって、 ぎゅうにゅう を のむ。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "舞台に[上がって]挨拶をする。",
            "translation": "I go up on stage and give a greeting.",
            "kana": "あがって",
            "reading": "ぶたい に あがって あいさつ を する。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "テンションが[上がって]眠れない。",
            "translation": "I'm so excited I can't sleep.",
            "kana": "あがって",
            "reading": "てんしょん が あがって ねむれない。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "物価が[上がって]生活が苦しい。",
            "translation": "Prices have risen and life is difficult.",
            "kana": "あがって",
            "reading": "ぶっか が あがって せいかつ が くるしい。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Te-form",
            "text": "坂を[上がって]右に曲がってください。",
            "translation": "Go up the hill and turn right.",
            "kana": "あがって",
            "reading": "さか を あがって みぎ に まがって ください。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "雨がなかなか[上がらない]。",
            "translation": "The rain just won't stop.",
            "kana": "あがらない",
            "reading": "あめ が なかなか あがらない。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "そんなに簡単には給料が[上がらない]。",
            "translation": "Salaries don't go up that easily.",
            "kana": "あがらない",
            "reading": "そんなに かんたん に は きゅうりょう が あがらない。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "今日は気分が[上がらない]。",
            "translation": "I'm not feeling up to it today.",
            "kana": "あがらない",
            "reading": "きょう は きぶん が あがらない。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "このエレベーターは上まで[上がらない]。",
            "translation": "This elevator doesn't go to the top.",
            "kana": "あがらない",
            "reading": "この えれべーたー は うえ まで あがらない。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "テストの点数が[上がらない]ので困っている。",
            "translation": "I'm in trouble because my test scores aren't going up.",
            "kana": "あがらない",
            "reading": "てすと の てんすう が あがらない ので こまっている。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "足が重くて[上がらない]。",
            "translation": "My legs are heavy and won't lift.",
            "kana": "あがらない",
            "reading": "あし が おもくて あがらない。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は大舞台でも[上がらない]強心臓だ。",
            "translation": "He has nerves of steel and doesn't get nervous even on a big stage.",
            "kana": "あがらない",
            "reading": "かれ は おおぶたい でも あがらない きょうしんぞう だ。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "いくら努力しても効果が[上がらない]。",
            "translation": "No matter how much I try, I'm not seeing results.",
            "kana": "あがらない",
            "reading": "いくら どりょく しても こうか が あがらない。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "水位が[上がらない]ように祈る。",
            "translation": "I pray that the water level doesn't rise.",
            "kana": "あがらない",
            "reading": "すいい が あがらない ように いのる。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Negative (Nai)",
            "text": "家の中へ[上がらない]で、ここで待っていて。",
            "translation": "Don't come into the house, wait here.",
            "kana": "あがらない",
            "reading": "いえ の なか へ あがらない で、 ここ で まっていて。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "やっと雨が[上がった]。",
            "translation": "The rain finally stopped.",
            "kana": "あがった",
            "reading": "やっと あめ が あがった。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "さっき、二階へ[上がった]よ。",
            "translation": "I went upstairs a moment ago.",
            "kana": "あがった",
            "reading": "さっき、 にかい へ あがった よ。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "ガソリン代がまた[上がった]。",
            "translation": "Gas prices went up again.",
            "kana": "あがった",
            "reading": "がそりん だい が また あがった。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は緊張して[上がった]ようだ。",
            "translation": "It seems he got nervous.",
            "kana": "あがった",
            "reading": "かれ は きんちょう して あがった ようだ。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "花火が綺麗に[上がった]。",
            "translation": "The fireworks went up beautifully.",
            "kana": "あがった",
            "reading": "はなび が きれい に あがった。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "風呂から[上がった]ら、電話して。",
            "translation": "Call me when you get out of the bath.",
            "kana": "あがった",
            "reading": "ふろ から あがったら、 でんわ して。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "昨日、気温が30度まで[上がった]。",
            "translation": "The temperature rose to 30 degrees yesterday.",
            "kana": "あがった",
            "reading": "きのう、 きおん が さんじゅうど まで あがった。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "一気に階段を[上がった]。",
            "translation": "I went up the stairs all at once.",
            "kana": "あがった",
            "reading": "いっきに かいだん を あがった。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "歓声が[上がった]瞬間、鳥肌が立った。",
            "translation": "The moment the cheers rose, I got goosebumps.",
            "kana": "あがった",
            "reading": "かんせい が あがった しゅんかん、 とりはだ が たった。"
        },
        {
            "verb": "上がる (agaru)",
            "tense": "Plain Past (Ta)",
            "text": "質が[上がった]のは間違いない。",
            "translation": "There is no doubt that the quality has improved.",
            "kana": "あがった",
            "reading": "しつ が あがった の は まちがいない。"
        }, {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "毎日、荷物を二階へ[上げます]。",
            "translation": "I carry the luggage up to the second floor every day.",
            "kana": "あげます",
            "reading": "まいにち、 にもつ を にかい へ あげます。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "右手を高く[上げます]。",
            "translation": "I raise my right hand high.",
            "kana": "あげます",
            "reading": "みぎて を たかく あげます。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "もっとスピードを[上げます]。",
            "translation": "I will increase the speed more.",
            "kana": "あげます",
            "reading": "もっと すぴーど を あげます。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "テレビの音量を[上げます]ね。",
            "translation": "I'll turn up the TV volume, okay?",
            "kana": "あげます",
            "reading": "てれび の おんりょう を あげます ね。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "この会社は利益を[上げます]。",
            "translation": "This company generates profits.",
            "kana": "あげます",
            "reading": "この かいしゃ は りえき を あげます。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "窓を[上げます]か？",
            "translation": "Shall I raise the window?",
            "kana": "あげます",
            "reading": "まど を あげます か？"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "彼はいつも成果を[上げます]。",
            "translation": "He always produces results.",
            "kana": "あげます",
            "reading": "かれ は いつも せいか を あげます。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "花火を[上げます]。",
            "translation": "We will set off fireworks.",
            "kana": "あげます",
            "reading": "はなび を あげます。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "少し温度を[上げます]。",
            "translation": "I will raise the temperature a little.",
            "kana": "あげます",
            "reading": "すこし おんど を あげます。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Present (Masu)",
            "text": "旗を[上げます]。",
            "translation": "I raise the flag.",
            "kana": "あげます",
            "reading": "はた を あげます。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、商品の値段を[上げました]。",
            "translation": "We raised the price of the product yesterday.",
            "kana": "あげました",
            "reading": "きのう、 しょうひん の ねだん を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "大きな声を[上げました]。",
            "translation": "I raised a loud voice (shouted).",
            "kana": "あげました",
            "reading": "おおきな こえ を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "テストの平均点を[上げました]。",
            "translation": "I raised the average test score.",
            "kana": "あげました",
            "reading": "てすと の へいきんてん を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "全力を[上げました]。",
            "translation": "I gave it my all.",
            "kana": "あげました",
            "reading": "ぜんりょく を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "棚の上に本を[上げました]。",
            "translation": "I put the book up on the shelf.",
            "kana": "あげました",
            "reading": "たな の うえ に ほん を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼女は顔を[上げました]。",
            "translation": "She looked up (raised her face).",
            "kana": "あげました",
            "reading": "かのじょ は かお を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "椅子を[上げました]。",
            "translation": "I raised the chair.",
            "kana": "あげました",
            "reading": "いす を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "質を[上げました]。",
            "translation": "We improved (raised) the quality.",
            "kana": "あげました",
            "reading": "しつ を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "スピードを[上げました]。",
            "translation": "I increased the speed.",
            "kana": "あげました",
            "reading": "すぴーど を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Polite Past (Mashita)",
            "text": "最後に勝利を[上げました]。",
            "translation": "In the end, we achieved (raised) a victory.",
            "kana": "あげました",
            "reading": "さいご に しょうり を あげました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "温度を[上げて]ください。",
            "translation": "Please turn up the temperature.",
            "kana": "あげて",
            "reading": "おんど を あげて ください。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "声を[上げて]笑う。",
            "translation": "To laugh out loud (raising one's voice).",
            "kana": "あげて",
            "reading": "こえ を あげて わらう。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "荷物を[上げて]おきました。",
            "translation": "I moved the luggage up (in advance).",
            "kana": "あげて",
            "reading": "にもつ を あげて おきました。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "手を[上げて]横断歩道を渡ります。",
            "translation": "Cross the crosswalk with your hand raised.",
            "kana": "あげて",
            "reading": "て を あげて おうだんほどう を わたります。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "売り上げを[上げて]、ボーナスをもらう。",
            "translation": "Increase sales and get a bonus.",
            "kana": "あげて",
            "reading": "うりあげ を あげて、 ぼーなす を もらう。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "空を見[上げて]ごらん。",
            "translation": "Try looking up at the sky.",
            "kana": "あげて",
            "reading": "そら を みあげて ごらん。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "腰を[上げて]作業をする。",
            "translation": "To get up (lift one's hips) and work.",
            "kana": "あげて",
            "reading": "こし を あげて さぎょう を する。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "名前を[上げて]説明する。",
            "translation": "Explain by mentioning (raising) names.",
            "kana": "あげて",
            "reading": "なまえ を あげて せつめい する。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "シャッターを[上げて]店を開ける。",
            "translation": "Raise the shutter and open the shop.",
            "kana": "あげて",
            "reading": "しゃったー を あげて みせ を あける。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Te-form",
            "text": "幕を[上げて]劇を始める。",
            "translation": "Raise the curtain and start the play.",
            "kana": "あげて",
            "reading": "まく を あげて げき を はじめる。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "これ以上、値段を[上げない]でください。",
            "translation": "Please do not raise the price any further.",
            "kana": "あげない",
            "reading": "これ いじょう、 ねだん を あげない で ください。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は絶対に弱音を[上げない]。",
            "translation": "He never whines (raises a weak sound).",
            "kana": "あげない",
            "reading": "かれ は ぜったい に よわね を あげない。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだスピードを[上げない]ほうがいい。",
            "translation": "It's better not to increase the speed yet.",
            "kana": "あげない",
            "reading": "まだ すぴーど を あげない ほう が いい。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "無理に声を[上げない]。",
            "translation": "I won't force myself to raise my voice.",
            "kana": "あげない",
            "reading": "むり に こえ を あげない。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "基準を[上げない]と合格できない。",
            "translation": "If we don't raise the standard, we can't pass.",
            "kana": "あげない",
            "reading": "きじゅん を あげない と ごうかく できない。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は手を[上げない]で質問した。",
            "translation": "He asked a question without raising his hand.",
            "kana": "あげない",
            "reading": "かれ は て を あげない で しつもん した。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "温度を[上げない]設定にする。",
            "translation": "Set it so it doesn't raise the temperature.",
            "kana": "あげない",
            "reading": "おんど を あげない せってい に する。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "そこまでハードルを[上げない]で。",
            "translation": "Don't raise the bar (hurdle) that much.",
            "kana": "あげない",
            "reading": "そこ まで はーどる を あげない で。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "旗を[上げない]理由は何ですか？",
            "translation": "What is the reason for not raising the flag?",
            "kana": "あげない",
            "reading": "はた を あげない りゆう は なん です か？"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Negative (Nai)",
            "text": "窓を[上げない]まま走った。",
            "translation": "I drove without putting the window up.",
            "kana": "あげない",
            "reading": "まど を あげない まま はしった。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "ようやく利益を[上げた]。",
            "translation": "Finally, we generated a profit.",
            "kana": "あげた",
            "reading": "ようやく りえき を あげた。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "彼はゆっくりと顔を[上げた]。",
            "translation": "He slowly raised his face.",
            "kana": "あげた",
            "reading": "かれ は ゆっくり と かお を あげた。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "花火を百発[上げた]。",
            "translation": "We set off a hundred fireworks.",
            "kana": "あげた",
            "reading": "はなび を ひゃっぱつ あげた。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "誰がテレビの音を[上げた]の？",
            "translation": "Who turned up the TV volume?",
            "kana": "あげた",
            "reading": "だれ が てれび の おと を あげた の？"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "一気にスピードを[上げた]。",
            "translation": "I increased the speed all at once.",
            "kana": "あげた",
            "reading": "いっき に すぴーど を あげた。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "重い腰を[上げた]。",
            "translation": "I finally got moving (raised my heavy hips).",
            "kana": "あげた",
            "reading": "おもい こし を あげた。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "成果を[上げた]人が評価される。",
            "translation": "People who produce results are evaluated.",
            "kana": "あげた",
            "reading": "せいか を あげた ひと が ひょうか される。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "軍艦旗を[上げた]。",
            "translation": "They raised the naval ensign.",
            "kana": "あげた",
            "reading": "ぐんかんき を あげた。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "昨晩、熱を[上げた]。",
            "translation": "I ran a fever last night.",
            "kana": "あげた",
            "reading": "さくばん、 ねつ を あげた。"
        },
        {
            "verb": "上げる (ageru)",
            "tense": "Plain Past (Ta)",
            "text": "声を[上げた]が、誰もいなかった。",
            "translation": "I called out, but no one was there.",
            "kana": "あげた",
            "reading": "こえ を あげた が、 だれ も いなかった。"
        }, {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "私は家族を[愛します]。",
            "translation": "I love my family.",
            "kana": "あいします",
            "reading": "わたし は かぞく を あいします。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "平和を[愛します]。",
            "translation": "I love peace.",
            "kana": "あいします",
            "reading": "へいわ を あいします。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "彼は自分の仕事を[愛します]。",
            "translation": "He loves his work.",
            "kana": "あいします",
            "reading": "かれ は じぶん の しごと を あいします。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "私たちはこの町を[愛します]。",
            "translation": "We love this town.",
            "kana": "あいします",
            "reading": "わたしたち は この まち を あいします。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "自然を[愛します]か？",
            "translation": "Do you love nature?",
            "kana": "あいします",
            "reading": "しぜん を あいします か？"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "伝統を[愛します]。",
            "translation": "I love tradition.",
            "kana": "あいします",
            "reading": "でんとう を あいします。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "芸術を[愛します]。",
            "translation": "I love art.",
            "kana": "あいします",
            "reading": "げいじゅつ を あいします。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "動物を[愛します]。",
            "translation": "I love animals.",
            "kana": "あいします",
            "reading": "どうぶつ を あいします。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "地元の人々は、この川を[愛します]。",
            "translation": "The local people love this river.",
            "kana": "あいします",
            "reading": "じもと の ひとびと は、 この かわ を あいします。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Present (Masu)",
            "text": "真実を[愛します]。",
            "translation": "I love the truth.",
            "kana": "あいします",
            "reading": "しんじつ を あいします。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼女を心から[愛しました]。",
            "translation": "I loved her from the bottom of my heart.",
            "kana": "あいしました",
            "reading": "かのじょ を こころから あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "祖父は故郷を深く[愛しました]。",
            "translation": "My grandfather deeply loved his hometown.",
            "kana": "あいしました",
            "reading": "そふ は こきょう を ふかく あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "多くのファンがその歌手を[愛しました]。",
            "translation": "Many fans loved that singer.",
            "kana": "あいしました",
            "reading": "おおく の ふぁん が その かしゅ を あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼は一生、一人の女性を[愛しました]。",
            "translation": "He loved one woman all his life.",
            "kana": "あいしました",
            "reading": "かれ は いっしょう、 ひとり の じょせい を あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "かつてはこの家を[愛しました]。",
            "translation": "I once loved this house.",
            "kana": "あいしました",
            "reading": "かつて は この いえ を あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "国民は王様を[愛しました]。",
            "translation": "The citizens loved the King.",
            "kana": "あいしました",
            "reading": "こくみん は おうさま を あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "その犬は飼い主を[愛しました]。",
            "translation": "That dog loved its owner.",
            "kana": "あいしました",
            "reading": "その いぬ は かいぬし を あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "私たちは自由を[愛しました]。",
            "translation": "We loved freedom.",
            "kana": "あいしました",
            "reading": "わたしたち は じゆう を あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "人々はその風景を[愛しました]。",
            "translation": "People loved that landscape.",
            "kana": "あいしました",
            "reading": "ひとびと は その ふうけい を あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼はその本をとても[愛しました]。",
            "translation": "He loved that book very much.",
            "kana": "あいしました",
            "reading": "かれ は その ほん を とても あいしました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "自分を[愛して]、他人も愛しなさい。",
            "translation": "Love yourself, and love others too.",
            "kana": "あいして",
            "reading": "じぶん を あいして、 たにん も あいしなさい。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "家族を[愛して]、毎日頑張っています。",
            "translation": "I love my family and work hard every day.",
            "kana": "あいして",
            "reading": "かぞく を あいして、 まいにち がんばっています。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "彼を[愛して]いますか？",
            "translation": "Do you love him?",
            "kana": "あいして",
            "reading": "かれ を あいして います か？"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "音楽を[愛して]やまない。",
            "translation": "I never stop loving music.",
            "kana": "あいして",
            "reading": "おんがく を あいして やまない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "猫を[愛して]、一緒に暮らしています。",
            "translation": "I love cats and live with one.",
            "kana": "あいして",
            "reading": "ねこ を あいして、 いっしょ に くらしています。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "国を[愛して]、尽くしたい。",
            "translation": "I love my country and want to serve it.",
            "kana": "あいして",
            "reading": "くに を あいして、 つくしたい。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "お互いを[愛して]、協力しましょう。",
            "translation": "Let's love and cooperate with each other.",
            "kana": "あいして",
            "reading": "おたがい を あいして、 きょうりょく しましょう。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "仕事を[愛して]いる姿は素晴らしい。",
            "translation": "The way you love your work is wonderful.",
            "kana": "あいして",
            "reading": "しごと を あいして いる すがた は すばらしい。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "子供を[愛して]育てています。",
            "translation": "I am raising my child with love.",
            "kana": "あいして",
            "reading": "こども を あいして そだてています。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Te-form",
            "text": "地球を[愛して]守りましょう。",
            "translation": "Let's love and protect the Earth.",
            "kana": "あいして",
            "reading": "ちきゅう を あいして まもりましょう。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "もう彼を[愛さない]。",
            "translation": "I don't love him anymore.",
            "kana": "あいさない",
            "reading": "もう かれ を あいさない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "自分を[愛さない]人は、他人も愛せない。",
            "translation": "People who don't love themselves cannot love others.",
            "kana": "あいさない",
            "reading": "じぶん を あいさない ひと は、 たにん も あいせない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "嘘をつく人を[愛さない]。",
            "translation": "I don't love people who tell lies.",
            "kana": "あいさない",
            "reading": "うそ を つく ひと を あいさない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "暴力は、誰も[愛さない]。",
            "translation": "No one loves violence.",
            "kana": "あいさない",
            "reading": "ぼうりょく は、 だれ も あいさない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "お金を[愛さない]わけではないが、一番ではない。",
            "translation": "It's not that I don't love money, but it's not number one.",
            "kana": "あいさない",
            "reading": "おかね を あいさない わけ ではない が、 いちばん ではない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "孤独を[愛さない]。",
            "translation": "I don't love loneliness.",
            "kana": "あいさない",
            "reading": "こどく を あいさない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "争いを[愛さない]国民だ。",
            "translation": "We are people who do not love conflict.",
            "kana": "あいさない",
            "reading": "あらそい を あいさない こくみん だ。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "そんな残酷な世界は[愛さない]。",
            "translation": "I won't love such a cruel world.",
            "kana": "あいさない",
            "reading": "そんな ざんこく な せかい は あいさない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は何も[愛さない]冷たい人だ。",
            "translation": "He is a cold person who loves nothing.",
            "kana": "あいさない",
            "reading": "かれ は なに も あいさない つめたい ひと だ。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Negative (Nai)",
            "text": "不潔な場所を[愛さない]。",
            "translation": "I don't love dirty places.",
            "kana": "あいさない",
            "reading": "ふけつ な ばしょ を あいさない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "心から彼女を[愛した]。",
            "translation": "I loved her from my heart.",
            "kana": "あいした",
            "reading": "こころから かのじょ を あいした。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "多くの人に[愛した]曲です。",
            "translation": "This is a song loved by many people (Note: typically 'aisareta', but used here as active past).",
            "kana": "あいした",
            "reading": "おおく の ひと に あいした きょく です。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は故郷を[愛した]。",
            "translation": "He loved his hometown.",
            "kana": "あいした",
            "reading": "かれ は こきょう を あいした。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "かつて[愛した]人は、もういない。",
            "translation": "The person I once loved is no longer here.",
            "kana": "あいした",
            "reading": "かつて あいした ひと は、 もう いない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "作家は自分の作品を[愛した]。",
            "translation": "The author loved their own work.",
            "kana": "あいした",
            "reading": "さっか は じぶん の さくひん を あいした。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "母が[愛した]花が咲きました。",
            "translation": "The flowers my mother loved have bloomed.",
            "kana": "あいした",
            "reading": "はは が あいした はな が さきました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "私たちは自由のために[愛した]。",
            "translation": "We loved for the sake of freedom.",
            "kana": "あいした",
            "reading": "わたしたち は じゆう の ため に あいした。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "国民が[愛した]大統領だった。",
            "translation": "He was a president the citizens loved.",
            "kana": "あいした",
            "reading": "こくみん が あいした だいとうりょう だった。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は研究を[愛した]。",
            "translation": "He loved his research.",
            "kana": "あいした",
            "reading": "かれ は けんきゅう を あいした。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Plain Past (Ta)",
            "text": "その犬は家族全員を[愛した]。",
            "translation": "That dog loved the entire family.",
            "kana": "あいした",
            "reading": "その いぬ は かぞく ぜんいん を あいした。"
        }, {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "毎朝、窓を[開けます]。",
            "translation": "I open the window every morning.",
            "kana": "あけます",
            "reading": "まいあさ、 まど を あけます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "店を午前九時に[開けます]。",
            "translation": "We open the shop at 9:00 AM.",
            "kana": "あけます",
            "reading": "みせ を ごぜん くじ に あけます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "プレゼントの箱を[開けます]。",
            "translation": "I will open the gift box.",
            "kana": "あけます",
            "reading": "ぷぜんと の はこ を あけます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "鍵を使ってドアを[開けます]。",
            "translation": "I open the door using a key.",
            "kana": "あけます",
            "reading": "かぎ を つかって どあ を あけます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "教科書の10ページを[開けます]。",
            "translation": "I will open the textbook to page 10.",
            "kana": "あけます",
            "reading": "きょうかしょ の じゅっぺーじ を あけます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "目を大きく[開けます]。",
            "translation": "I open my eyes wide.",
            "kana": "あけます",
            "reading": "め を おおきく あけます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "瓶の蓋を[開けます]。",
            "translation": "I will open the lid of the bottle.",
            "kana": "あけます",
            "reading": "びん の ふた を あけます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "新しい通路を[開けます]。",
            "translation": "We will open up a new pathway.",
            "kana": "あけます",
            "reading": "あたらしい つうろ を あけます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "引き出しを[開けます]ね。",
            "translation": "I'm going to open the drawer.",
            "kana": "あけます",
            "reading": "ひきだし を あけます ね。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Present (Masu)",
            "text": "口を[開けます]。",
            "translation": "I open my mouth.",
            "kana": "あけます",
            "reading": "くち を あけます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "暑かったので、窓を[開けました]。",
            "translation": "It was hot, so I opened the window.",
            "kana": "あけました",
            "reading": "あつかった ので、 まど を あけました。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、手紙を[開けました]。",
            "translation": "I opened the letter yesterday.",
            "kana": "あけました",
            "reading": "きのう、 てがみ を あけました。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "冷蔵庫を[開けました]が、何もありませんでした。",
            "translation": "I opened the refrigerator, but there was nothing in it.",
            "kana": "あけました",
            "reading": "れいぞうこ を あけました が、 なにも ありませんでした。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼のためにドアを[開けました]。",
            "translation": "I opened the door for him.",
            "kana": "あけました",
            "reading": "かれ の ため に どあ を あけました。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "缶詰を[開けました]。",
            "translation": "I opened the canned food.",
            "kana": "あけました",
            "reading": "かんづめ を あけました。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "穴を[開けました]。",
            "translation": "I made (opened) a hole.",
            "kana": "あけました",
            "reading": "あな を あけました。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "カーテンを[開けました]。",
            "translation": "I opened the curtains.",
            "kana": "あけました",
            "reading": "かーてん を あけました。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "カバンの中を[開けました]。",
            "translation": "I opened the inside of the bag.",
            "kana": "あけました",
            "reading": "かばん の なか を あけました。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "ようやく道を[開けました]。",
            "translation": "We finally cleared (opened) the way.",
            "kana": "あけました",
            "reading": "ようやく みち を あけました。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Polite Past (Mashita)",
            "text": "小包を[開けました]か？",
            "translation": "Did you open the parcel?",
            "kana": "あけました",
            "reading": "こづつみ を あけました か？"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "窓を[開けて]ください。",
            "translation": "Please open the window.",
            "kana": "あけて",
            "reading": "まど を あけて ください。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "箱を[開けて]中身を確認する。",
            "translation": "Open the box and check the contents.",
            "kana": "あけて",
            "reading": "はこ を あけて なかみ を かくにん する。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "少し間隔を[開けて]並んでください。",
            "translation": "Please line up with a little space between you.",
            "kana": "あけて",
            "reading": "すこし かんかく を あけて ならんで ください。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "口を[開けて]笑う。",
            "translation": "To laugh with one's mouth open.",
            "kana": "あけて",
            "reading": "くち を あけて わらう。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "鍵を[開けて]中に入る。",
            "translation": "Unlock (open) the key and go inside.",
            "kana": "あけて",
            "reading": "かぎ を あけて なか に はいる。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "目を[開けて]夢を見る。",
            "translation": "To dream with one's eyes open.",
            "kana": "あけて",
            "reading": "め を あけて ゆめ を みる。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "予定を[開けて]おく。",
            "translation": "To keep one's schedule open (in advance).",
            "kana": "あけて",
            "reading": "よてい を あけて おく。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "ワインを[開けて]乾杯しましょう。",
            "translation": "Let's open the wine and toast.",
            "kana": "あけて",
            "reading": "わいん を あけて かんぱい しましょう。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "袋を[開けて]分ける。",
            "translation": "Open the bag and distribute (the contents).",
            "kana": "あけて",
            "reading": "ふくろ を あけて わける。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Te-form",
            "text": "道を[開けて]もらった。",
            "translation": "I had someone clear (open) the way for me.",
            "kana": "あけて",
            "reading": "みち を あけて もらった。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "そのドアを[開けない]で。",
            "translation": "Don't open that door.",
            "kana": "あけない",
            "reading": "その どあ を あけない で。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は心の内を[開けない]。",
            "translation": "He doesn't open up his heart.",
            "kana": "あけない",
            "reading": "かれ は こころ の うち を あけない。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "冬は窓をあまり[開けない]。",
            "translation": "I don't open the window much in winter.",
            "kana": "あけない",
            "reading": "ふゆ は まど を あまり あけない。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰もこの箱を[開けない]ように。",
            "translation": "Make sure nobody opens this box.",
            "kana": "あけない",
            "reading": "だれ も この はこ を あけない ように。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "夜遅くは店を[開けない]。",
            "translation": "We don't open the shop late at night.",
            "kana": "あけない",
            "reading": "よる おそく は みせ を あけない。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "穴を[開けない]ように注意する。",
            "translation": "Be careful not to make (open) a hole.",
            "kana": "あけない",
            "reading": "あな を あけない ように ちゅうい する。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "口を[開けない]で話す。",
            "translation": "To speak without opening one's mouth.",
            "kana": "あけない",
            "reading": "くち を あけない で はなす。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "差を[開けない]ように走る。",
            "translation": "To run so as not to let the gap widen.",
            "kana": "あけない",
            "reading": "さ を あけない ように はしる。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "カーテンを[開けない]まま寝た。",
            "translation": "I went to sleep without opening the curtains.",
            "kana": "あけない",
            "reading": "かーてん を あけない まま ねた。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Negative (Nai)",
            "text": "秘密なので、誰にも[開けない]で。",
            "translation": "It's a secret, so don't open it for anyone.",
            "kana": "あけない",
            "reading": "ひみつ なので、 だれ に も あけない で。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "さっき窓を[開けた]。",
            "translation": "I opened the window a moment ago.",
            "kana": "あけた",
            "reading": "さっき まど を あけた。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "封筒をハサミで[開けた]。",
            "translation": "I opened the envelope with scissors.",
            "kana": "あけた",
            "reading": "ふうとう を はさみ で あけた。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "彼がドアを[開けた]瞬間、風が入った。",
            "translation": "The moment he opened the door, a breeze came in.",
            "kana": "あけた",
            "reading": "かれ が どあ を あけた しゅんかん、 かぜ が はいった。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "シャンパンを[開けた]。",
            "translation": "I opened the champagne.",
            "kana": "あけた",
            "reading": "しゃんぱん を あけた。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "昨日から予定を[開けた]のに。",
            "translation": "Even though I cleared my schedule since yesterday.",
            "kana": "あけた",
            "reading": "きのう から よてい を あけた のに。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "新しく店を[開けた]ばかりだ。",
            "translation": "I just opened a new shop.",
            "kana": "あけた",
            "reading": "あたらしく みせ を あけた ばかり だ。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "壁に穴を[開けた]。 ",
            "translation": "I made a hole in the wall.",
            "kana": "あけた",
            "reading": "かべ に あな を あけた。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "目を[開けた]ら、朝だった。",
            "translation": "When I opened my eyes, it was morning.",
            "kana": "あけた",
            "reading": "め を あけた ら、 あさ だった。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "引き出しを全部[開けた]。",
            "translation": "I opened all the drawers.",
            "kana": "あけた",
            "reading": "ひきだし を ぜんぶ あけた。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Plain Past (Ta)",
            "text": "席を[開けた]隙に、誰かが座った。",
            "translation": "While I left the seat (opened it), someone sat down.",
            "kana": "あけた",
            "reading": "せき を あけた すき に、 だれか が すわった。"
        }, {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "悪い習慣を[諦めます]。",
            "translation": "I will give up my bad habits.",
            "kana": "あきらめます",
            "reading": "わるい しゅうかん を あきらめます。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "彼はすぐに試合を[諦めます]。",
            "translation": "He gives up on matches easily.",
            "kana": "あきらめます",
            "reading": "かれ は すぐに しあい を あきらめます。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "夢を[諦めます]か？",
            "translation": "Will you give up on your dream?",
            "kana": "あきらめます",
            "reading": "ゆめ を あきらめます か？"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "無理だと思ったら[諦めます]。",
            "translation": "If I think it's impossible, I give up.",
            "kana": "あきらめます",
            "reading": "むり だ と おもったら あきらめます。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "その計画を[諦めます]。",
            "translation": "I will abandon that plan.",
            "kana": "あきらめます",
            "reading": "その けいかく を あきらめます。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "交渉を[諦めます]。",
            "translation": "I will give up the negotiations.",
            "kana": "あきらめます",
            "reading": "こうしょう を あきらめます。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "欲張るのを[諦めます]。",
            "translation": "I will give up being greedy.",
            "kana": "あきらめます",
            "reading": "よくばる の を あきらめます。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "今の地位を[諦めます]。",
            "translation": "I will relinquish my current position.",
            "kana": "あきらめます",
            "reading": "いま の ちい を あきらめます。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "勝負を[諦めます]。",
            "translation": "I will concede the match.",
            "kana": "あきらめます",
            "reading": "しょうぶ を あきらめます。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Present (Masu)",
            "text": "どうしてもダメなら[諦めます]。",
            "translation": "If it really doesn't work, I will give up.",
            "kana": "あきらめます",
            "reading": "どうしても だめ なら あきらめます。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "留学の夢を[諦めました]。",
            "translation": "I gave up on my dream of studying abroad.",
            "kana": "あきらめました",
            "reading": "りゅうがく の ゆめ を あきらめました。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "渋滞がひどいので外出を[諦めました]。",
            "translation": "The traffic was so bad that I gave up on going out.",
            "kana": "あきらめました",
            "reading": "じゅうたい が ひどい ので がいしゅつ を あきらめました。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "結局、彼は説得を[諦めました]。",
            "translation": "In the end, he gave up on persuading them.",
            "kana": "あきらめました",
            "reading": "けっきょく、 かれ は せっとく を あきらめました。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "高いので買うのを[諦めました]。",
            "translation": "It was expensive, so I gave up on buying it.",
            "kana": "あきらめました",
            "reading": "たかい ので かう の を あきらめました。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "雨でハイキングを[諦めました]。",
            "translation": "I gave up on the hiking because of rain.",
            "kana": "あきらめました",
            "reading": "あめ で はいきんぐ を あきらめました。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日は遅かったので、夕食を[諦めました]。",
            "translation": "It was late yesterday, so I gave up on dinner.",
            "kana": "あきらめました",
            "reading": "きのう は おそかった ので、 ゆうしょく を あきらめました。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "最後まで戦いましたが、途中で[諦めました]。",
            "translation": "I fought until the end, but gave up halfway.",
            "kana": "あきらめました",
            "reading": "さいご まで たたかいました が、 とちゅう で あきらめました。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "探し物を[諦めました]か？",
            "translation": "Did you give up looking for the lost item?",
            "kana": "あきらめました",
            "reading": "さがしもの を あきらめました か？"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "そのチャンスを[諦めました]。",
            "translation": "I gave up on that chance.",
            "kana": "あきらめました",
            "reading": "その ちゃんす を あきらめました。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼女は結婚を[諦めました]。",
            "translation": "She gave up on getting married.",
            "kana": "あきらめました",
            "reading": "かのじょ は けっこん を あきらめました。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "早く[諦めて]、次に行こう。",
            "translation": "Give up quickly and let's move on to the next one.",
            "kana": "あきらめて",
            "reading": "はやく あきらめて、 つぎ に いこう。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "夢を[諦めて]はいけない。",
            "translation": "You must not give up on your dreams.",
            "kana": "あきらめて",
            "reading": "ゆめ を あきらめて は いけない。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "彼は仕事を[諦めて]故郷に帰った。",
            "translation": "He gave up his job and returned to his hometown.",
            "kana": "あきらめて",
            "reading": "かれ は しごと を あきらめて こきょう に かえった。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "そんなに簡単に[諦めて]いいの？",
            "translation": "Is it okay to give up that easily?",
            "kana": "あきらめて",
            "reading": "そんなに かんたん に あきらめて いい の？"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "戦いを[諦めて]、平和を選んだ。",
            "translation": "He gave up the fight and chose peace.",
            "kana": "あきらめて",
            "reading": "たたかい を あきらめて、 へいわ を えらんだ。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "希望を[諦めて]はいけません。",
            "translation": "You must not give up hope.",
            "kana": "あきらめて",
            "reading": "きぼう を あきらめて は いけません。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "全てを[諦めて]、一からやり直す。",
            "translation": "Give up everything and start over from scratch.",
            "kana": "あきらめて",
            "reading": "すべて を あきらめて、 いち から やりなおす。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "彼女はダイエットを[諦めて]しまった。",
            "translation": "She ended up giving up on her diet.",
            "kana": "あきらめて",
            "reading": "かのじょ は だいえっと を あきらめて しまった。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "現実を見て[諦めて]ください。",
            "translation": "Please face reality and give up.",
            "kana": "あきらめて",
            "reading": "げんじつ を みて あきらめて ください。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Te-form",
            "text": "計画を[諦めて]、別の方法を探す。",
            "translation": "Give up the plan and look for another method.",
            "kana": "あきらめて",
            "reading": "けいかく を あきらめて、 べつの ほうほう を さがす。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "私は絶対に[諦めない]。",
            "translation": "I will absolutely not give up.",
            "kana": "あきらめない",
            "reading": "わたし は ぜったい に あきらめない。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "最後まで[諦めない]で頑張ろう。",
            "translation": "Let's do our best and not give up until the end.",
            "kana": "あきらめない",
            "reading": "さいご まで あきらめない で がんばろう。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼はどんなに苦しくても[諦めない]。",
            "translation": "No matter how painful it is, he doesn't give up.",
            "kana": "あきらめない",
            "reading": "かれ は どんなに くるしくても あきらめない。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "可能性が少しでもあるなら[諦めない]。",
            "translation": "If there's even a little possibility, I won't give up.",
            "kana": "あきらめない",
            "reading": "かのうせい が すこし でも ある なら あきらめない。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "夢を[諦めない]ことが大切だ。",
            "translation": "It is important not to give up on your dreams.",
            "kana": "あきらめない",
            "reading": "ゆめ を あきらめない こと が たいせつ だ。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰が何と言おうと[諦めない]。",
            "translation": "No matter what anyone says, I won't give up.",
            "kana": "あきらめない",
            "reading": "だれ が なに と いおう と あきらめない。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ[諦めない]ほうがいいですよ。",
            "translation": "It's better not to give up yet.",
            "kana": "あきらめない",
            "reading": "まだ あきらめない ほう が いい です よ。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼女は決して自分の信念を[諦めない]。",
            "translation": "She never gives up on her beliefs.",
            "kana": "あきらめない",
            "reading": "かのじょ は けっして じぶん の しんねん を あきらめない。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "奇跡を信じて[諦めない]。",
            "translation": "I believe in miracles and won't give up.",
            "kana": "あきらめない",
            "reading": "きせき を しんじて あきらめない。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Negative (Nai)",
            "text": "途中で[諦めない]強さが必要だ。",
            "translation": "The strength to not give up halfway is necessary.",
            "kana": "あきらめない",
            "reading": "とちゅう で あきらめない つよさ が ひつよう だ。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "結局、その勝負を[諦めた]。",
            "translation": "In the end, I gave up on that match.",
            "kana": "あきらめた",
            "reading": "けっきょく、 その しょうぶ を あきらめた。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "昨日、ようやく決心を[諦めた]。",
            "translation": "Yesterday, I finally gave up on my determination.",
            "kana": "あきらめた",
            "reading": "きのう、 ようやく けっしん を あきらめた。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は夢を[諦めた]ことを後悔している。",
            "translation": "He regrets giving up on his dream.",
            "kana": "あきらめた",
            "reading": "かれ は ゆめ を あきらめた こと を こうかい している。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "雨が降ってきたので、走るのを[諦めた]。",
            "translation": "It started raining, so I gave up on running.",
            "kana": "あきらめた",
            "reading": "あめ が ふってきた ので、 はしる の を あきらめた。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "もう全て[諦めた]よ。",
            "translation": "I've given up on everything already.",
            "kana": "あきらめた",
            "reading": "もう すべて あきらめた よ。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は途中で[諦めた]が、私は続けた。",
            "translation": "He gave up halfway, but I continued.",
            "kana": "あきらめた",
            "reading": "かれ は とちゅう で あきらめた が、 わたし は つづけた。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "一度[諦めた]ことのある挑戦だ。",
            "translation": "It's a challenge I once gave up on.",
            "kana": "あきらめた",
            "reading": "いちど あきらめた こと の ある ちょうせん だ。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "彼女はついにその恋を[諦めた]。",
            "translation": "She finally gave up on that love.",
            "kana": "あきらめた",
            "reading": "かのじょ は ついに その こい を あきらめた。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "その場の空気を読んで[諦めた]。",
            "translation": "I read the room and gave up.",
            "kana": "あきらめた",
            "reading": "その ば の くうき を よんで あきらめた。"
        },
        {
            "verb": "諦める (akirameru)",
            "tense": "Plain Past (Ta)",
            "text": "結局、彼は説得を[諦めた]ようだ。",
            "translation": "It seems he gave up on the persuasion in the end.",
            "kana": "あきらめた",
            "reading": "けっきょく、 かれ は せっとく を あきらめた ようだ。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "同じものばかり食べていると[飽きます]。",
            "translation": "If I eat only the same thing, I get tired of it.",
            "kana": "あきます",
            "reading": "おなじ もの ばかり たべて いる と あきます。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "このゲームはすぐに[飽きます]か？",
            "translation": "Do you get bored of this game quickly?",
            "kana": "あきます",
            "reading": "この げーむ は すぐに あきます か？"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "毎日同じ作業だと[飽きます]ね。",
            "translation": "Doing the same task every day makes one get bored, doesn't it?",
            "kana": "あきます",
            "reading": "まいにち おなじ さぎょう だと あきます ね。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "単調なメロディーはすぐに[飽きます]。",
            "translation": "I get tired of monotonous melodies quickly.",
            "kana": "あきます",
            "reading": "たんちょう な めろでぃー は すぐに あきます。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "都会の生活に[飽きます]。",
            "translation": "I get tired of city life.",
            "kana": "あきます",
            "reading": "とかい の せいかつ に あきます。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "子供は新しいおもちゃにすぐ[飽きます]。",
            "translation": "Children get bored with new toys immediately.",
            "kana": "あきます",
            "reading": "こども は あたらしい おもちゃ に すぐ あきます。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "流行はすぐに[飽きます]。",
            "translation": "Trends are quickly grown tired of.",
            "kana": "あきます",
            "reading": "りゅうこう は すぐに あきます。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "長い話には[飽きます]。",
            "translation": "I get bored with long stories.",
            "kana": "あきます",
            "reading": "ながい はなし に は あきます。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "贅沢な暮らしもいつかは[飽きます]。",
            "translation": "One gets tired of a luxurious life eventually.",
            "kana": "あきます",
            "reading": "ぜいたく な くらし も いつか は あきます。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Present (Masu)",
            "text": "同じ服をずっと着ていると[飽きます]。",
            "translation": "I get tired of wearing the same clothes all the time.",
            "kana": "あきます",
            "reading": "おなじ ふく を ずっと きて いる と あきます。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "その仕事に[飽きました]。",
            "translation": "I got bored with that job.",
            "kana": "あきました",
            "reading": "その しごと に あきました。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "古い趣味には[飽きました]。",
            "translation": "I got tired of my old hobby.",
            "kana": "あきました",
            "reading": "ふるい しゅみ に は あきました。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日の映画は途中で[飽きました]。",
            "translation": "I got bored halfway through yesterday's movie.",
            "kana": "あきました",
            "reading": "きのう の えいが は とちゅう で あきました。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "ずっと勉強ばかりで[飽きました]。",
            "translation": "I got tired of doing nothing but studying.",
            "kana": "あきました",
            "reading": "ずっと べんきょう ばかり で あきました。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼の自慢話には[飽きました]。",
            "translation": "I got tired of his bragging.",
            "kana": "あきました",
            "reading": "かれ の じまんばなし に は あきました。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "この本は三ページで[飽きました]。",
            "translation": "I got bored with this book after three pages.",
            "kana": "あきました",
            "reading": "この ほん は さんぺーじ で あきました。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "インスタントラーメンに[飽きました]か？",
            "translation": "Did you get tired of instant ramen?",
            "kana": "あきました",
            "reading": "いんすたんと らーめん に あきました か？"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "都会の喧騒に[飽きました]。",
            "translation": "I grew tired of the hustle and bustle of the city.",
            "kana": "あきました",
            "reading": "とかい の けんそう に あきました。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "雨続きで、家の中にいるのに[飽きました]。",
            "translation": "I got tired of staying indoors due to the continuous rain.",
            "kana": "あきました",
            "reading": "あめつづき で、 いえ の なか に いる の に あきました。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Polite Past (Mashita)",
            "text": "その話は聞き[飽きました]。",
            "translation": "I'm tired of hearing that story.",
            "kana": "あきました",
            "reading": "その はなし は きき あきました。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "仕事に[飽きて]、辞めてしまった。",
            "translation": "I got bored with work and quit.",
            "kana": "あきて",
            "reading": "しごと に あきて、 やめて しまった。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "この料理に[飽きて]きた。",
            "translation": "I'm starting to get tired of this dish.",
            "kana": "あきて",
            "reading": "この りょうり に あきて きた。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "勉強に[飽きて]、遊びに行った。",
            "translation": "I got tired of studying and went out to play.",
            "kana": "あきて",
            "reading": "べんきょう に あきて、 あそび に いった。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "テレビに[飽きて]、本を読み始めた。",
            "translation": "I got bored with the TV and started reading a book.",
            "kana": "あきて",
            "reading": "てれび に あきて、 ほん を よみはじめた。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "同じ景色に[飽きて]しまった。",
            "translation": "I've grown tired of the same scenery.",
            "kana": "あきて",
            "reading": "おなじ けしき に あきて しまった。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "練習に[飽きて]、休みたくなった。",
            "translation": "I got bored with practice and wanted to rest.",
            "kana": "あきて",
            "reading": "れんしゅう に あきて、 やすみたくなった。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "都会に[飽きて]、田舎へ引っ越す。",
            "translation": "I got tired of the city and moved to the countryside.",
            "kana": "あきて",
            "reading": "とかい に あきて、 いなか へ ひっこす。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "待つのに[飽きて]、帰ってしまった。",
            "translation": "I got tired of waiting and went home.",
            "kana": "あきて",
            "reading": "まつ の に あきて、 かえって しまった。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "話に[飽きて]、あくびをした。",
            "translation": "I got bored with the talk and yawned.",
            "kana": "あきて",
            "reading": "はなし に あきて、 あくび を した。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Te-form",
            "text": "おもちゃに[飽きて]、床に投げた。",
            "translation": "I got bored with the toy and threw it on the floor.",
            "kana": "あきて",
            "reading": "おもちゃ に あきて、 ゆか に なげた。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "何度見ても[飽きない]映画だ。",
            "translation": "It's a movie I never get tired of, no matter how many times I watch it.",
            "kana": "あきない",
            "reading": "なんど みても あきない えいが だ。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "この仕事は変化があって[飽きない]。",
            "translation": "This job has variety, so I don't get bored.",
            "kana": "あきない",
            "reading": "この しごと は へんか が あって あきない。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は何事にも[飽きない]性格だ。",
            "translation": "He has a personality that never gets bored with anything.",
            "kana": "あきない",
            "reading": "かれ は なにごと に も あきない せいかく だ。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "この景色はずっと見ていても[飽きない]。",
            "translation": "I never get tired of looking at this scenery.",
            "kana": "あきない",
            "reading": "この けしき は ずっと みて いても あきない。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "納豆は毎日食べても[飽きない]。",
            "translation": "I don't get tired of eating natto every day.",
            "kana": "あきない",
            "reading": "なっとう は まいにち たべても あきない。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "読書は一生続けても[飽きない]だろう。",
            "translation": "I probably won't get bored with reading even if I continue it for a lifetime.",
            "kana": "あきない",
            "reading": "どくしょ は いっしょう つづけて も あきない だろう。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼女の歌声は聴いていて[飽きない]。",
            "translation": "I never get tired of listening to her singing voice.",
            "kana": "あきない",
            "reading": "かのじょ の うたごえ は きいて いて あきない。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "子供が[飽きない]工夫をする。",
            "translation": "I will find ways to keep the child from getting bored.",
            "kana": "あきない",
            "reading": "こども が あきない くふう を する。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "パズルは奥が深くて[飽きない]。",
            "translation": "Puzzles are deep and never get boring.",
            "kana": "あきない",
            "reading": "ぱずる は おく が ふかくて あきない。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Negative (Nai)",
            "text": "趣味が多いので[飽きない]生活だ。",
            "translation": "I have many hobbies, so my life is never boring.",
            "kana": "あきない",
            "reading": "しゅみ が おおい ので あきない せいかつ だ。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "そのゲームはもう[飽きた]。",
            "translation": "I'm already bored with that game.",
            "kana": "あきた",
            "reading": "その げーむ は もう あきた。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "同じ文句は聞き[飽きた]よ。",
            "translation": "I'm tired of hearing the same complaints.",
            "kana": "あきた",
            "reading": "おなじ もんく は きき あきた よ。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "彼はすぐに熱が[飽きた]。",
            "translation": "His enthusiasm cooled (he got bored) quickly.",
            "kana": "あきた",
            "reading": "かれ は すぐに ねつ が あきた。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "都会の暮らしにはもう[飽きた]。",
            "translation": "I'm already tired of living in the city.",
            "kana": "あきた",
            "reading": "とかい の くらし に は もう あきた。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "毎日カレーで[飽きた]。",
            "translation": "I got tired of having curry every day.",
            "kana": "あきた",
            "reading": "まいにち かれー で あきた。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "練習に[飽きた]子供たちが遊び始めた。",
            "translation": "The children who got bored with practice started playing.",
            "kana": "あきた",
            "reading": "れんしゅう に あきた こどもたち が あそび はじめた。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "この服、デザインが古いし[飽きた]な。",
            "translation": "This clothing's design is old, and I'm tired of it.",
            "kana": "あきた",
            "reading": "この ふく、 でざいん が ふるい し あきた な。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "待つのに[飽きた]から、先に行くよ。",
            "translation": "I got tired of waiting, so I'm going ahead.",
            "kana": "あきた",
            "reading": "まつ の に あきた から、 さき に いく よ。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "一週間でそのダイエットに[飽きた]。",
            "translation": "I got tired of that diet in a week.",
            "kana": "あきた",
            "reading": "いっしゅうかん で その だいえっと に あきた。"
        },
        {
            "verb": "飽きる (akiru)",
            "tense": "Plain Past (Ta)",
            "text": "独身生活に[飽きた]ので結婚したい。",
            "translation": "I'm tired of single life, so I want to get married.",
            "kana": "あきた",
            "reading": "どくしん せいかつ に あきた ので けっこん したい。"
        }, {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "自動でドアが[開きます]。",
            "translation": "The door opens automatically.",
            "kana": "あきます",
            "reading": "じどう で どあ が あきます。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "この店は何時に[開きます]か？",
            "translation": "What time does this shop open?",
            "kana": "あきます",
            "reading": "この みせ は なんじ に あきます か？"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "ボタンを押すと蓋が[開きます]。",
            "translation": "The lid opens when you press the button.",
            "kana": "あきます",
            "reading": "ぼたん を おす と ふた が あきます。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "風で窓が[開きます]。",
            "translation": "The window opens because of the wind.",
            "kana": "あきます",
            "reading": "かぜ で まど が あきます。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "春になると花が[開きます]。",
            "translation": "Flowers bloom (open) when spring comes.",
            "kana": "あきます",
            "reading": "はる に なる と はな が あきます。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "新しい道が[開きます]。",
            "translation": "A new path opens up.",
            "kana": "あきます",
            "reading": "あたらしい みち が あきます。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "銀行の口座が[開きます]。",
            "translation": "A bank account will be opened.",
            "kana": "あきます",
            "reading": "ぎんこう の こうざ が あきます。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "幕が[開きます]。",
            "translation": "The curtain rises (opens).",
            "kana": "あきます",
            "reading": "まく が あきます。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "鍵が壊れていて[開きます]か？",
            "translation": "The lock is broken; will it open?",
            "kana": "あきます",
            "reading": "かぎ が こわれて いて あきます か？"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Present (Masu)",
            "text": "未来への扉が[開きます]。",
            "translation": "The door to the future opens.",
            "kana": "あきます",
            "reading": "みらい への とびら が あきます。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "やっと蓋が[開きました]。",
            "translation": "The lid finally opened.",
            "kana": "あきました",
            "reading": "やっと ふた が あきました。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、新しいモールが[開きました]。",
            "translation": "A new mall opened yesterday.",
            "kana": "あきました",
            "reading": "きのう、 あたらしい もーる が あきました。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "窓が急に[開きました]。",
            "translation": "The window opened suddenly.",
            "kana": "あきました",
            "reading": "まど が きゅうに あきました。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "点差が大きく[開きました]。",
            "translation": "The score gap widened (opened) significantly.",
            "kana": "あきました",
            "reading": "てんさ が おおきく あきました。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "封筒が[開きました]。",
            "translation": "The envelope opened.",
            "kana": "あきました",
            "reading": "ふうとう が あきました。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "九時にデパートが[開きました]。",
            "translation": "The department store opened at nine.",
            "kana": "あきました",
            "reading": "くじ に でぱーと が あきました。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "引き出しが[開きました]。",
            "translation": "The drawer opened.",
            "kana": "あきました",
            "reading": "ひきだし が あきました。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "目の前がパッと[開きました]。",
            "translation": "The view in front of me suddenly opened up.",
            "kana": "あきました",
            "reading": "めのまえ が ぱっと あきました。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "傘が[開きました]か？",
            "translation": "Did the umbrella open?",
            "kana": "あきました",
            "reading": "かさ が あきました か？"
        },
        {
            "verb": "開く (aku)",
            "tense": "Polite Past (Mashita)",
            "text": "心の色が[開きました]。",
            "translation": "My heart opened up.",
            "kana": "あきました",
            "reading": "こころ の いろ が あきました。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "ドアが[開いて]、客が入ってきた。",
            "translation": "The door opened, and a customer came in.",
            "kana": "あいて",
            "reading": "どあ が あいて、 きゃく が はいってきた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "窓が[開いて]いて、寒いですね。",
            "translation": "The window is open, so it's cold, isn't it?",
            "kana": "あいて",
            "reading": "まど が あいて いて、 さむい です ね。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "穴が[開いて]しまった。",
            "translation": "A hole has opened up (formed).",
            "kana": "あいて",
            "reading": "あな が あいて しまった。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "口が[開いて]いますよ。",
            "translation": "Your mouth is open.",
            "kana": "あいて",
            "reading": "くち が あいて います よ。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "封が[開いて]いる手紙を見つけた。",
            "translation": "I found a letter with the seal open.",
            "kana": "あいて",
            "reading": "ふう が あいて いる てがみ を みつけた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "花が[開いて]、庭が綺麗だ。",
            "translation": "The flowers are blooming (open), and the garden is beautiful.",
            "kana": "あいて",
            "reading": "はな が あいて、 にわ が きれい だ。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "傘を[開いて]外に出る。",
            "translation": "I open my umbrella and go outside.",
            "kana": "あいて",
            "reading": "かさ を あいて そと に でる。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "道が[開いて]、車が通りやすくなった。",
            "translation": "The road opened up, making it easier for cars to pass.",
            "kana": "あいて",
            "reading": "みち が あいて、 くるま が とおりやすく なった。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "袋が[開いて]中身がこぼれた。",
            "translation": "The bag opened, and the contents spilled.",
            "kana": "あいて",
            "reading": "ふくろ が あいて なかみ が こぼれた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Te-form",
            "text": "予定が[開いて]いるか確認する。",
            "translation": "Check if your schedule is open.",
            "kana": "あいて",
            "reading": "よてい が あいて いる か かくにん する。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "この瓶、どうしても[開かない]。",
            "translation": "This jar just won't open no matter what.",
            "kana": "あかない",
            "reading": "この びん、 どうしても あかない。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "今日は祝日だから店が[開かない]。",
            "translation": "The shop won't open today because it's a holiday.",
            "kana": "あかない",
            "reading": "きょう は しゅくじつ だから みせ が あかない。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "鍵がないとドアは[開かない]。",
            "translation": "The door won't open without a key.",
            "kana": "あかない",
            "reading": "かぎ が ない と どあ は あかない。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "まだつぼみで、花が[開かない]。",
            "translation": "It's still a bud, so the flower won't open.",
            "kana": "あかない",
            "reading": "まだ つぼみ で、 はな が あかない。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "錆びていて蓋が[開かない]。",
            "translation": "The lid won't open because it's rusty.",
            "kana": "あかない",
            "reading": "さびて いて ふた が あかない。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "霧で視界が[開かない]。",
            "translation": "The view won't open up (is blocked) because of the fog.",
            "kana": "あかない",
            "reading": "きり で しかい が あかない。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "暗証番号を間違えると[開かない]。",
            "translation": "If you get the PIN wrong, it won't open.",
            "kana": "あかない",
            "reading": "あんしょうばんごう を まちがえる と あかない。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "彼はなかなか心を[開かない]。",
            "translation": "He doesn't open his heart easily.",
            "kana": "あかない",
            "reading": "かれ は なかなか こころ を あかない。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "この本はページがくっついて[開かない]。",
            "translation": "The pages of this book are stuck and won't open.",
            "kana": "あかない",
            "reading": "この ほん は ぺーじ が くっついて あかない。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Negative (Nai)",
            "text": "踏切が[開かない]ので遅刻した。",
            "translation": "I was late because the railroad crossing didn't open.",
            "kana": "あかない",
            "reading": "ふみきり が あかない ので ちこく した。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "さっきまで[開いた]窓が閉まっている。",
            "translation": "The window that was open until a moment ago is closed.",
            "kana": "あいた",
            "reading": "さっき まで あいた まど が しまっている。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "ようやくドアが[開いた]。",
            "translation": "The door finally opened.",
            "kana": "あいた",
            "reading": "ようやく どあ が あいた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "靴下に穴が[開いた]。",
            "translation": "A hole opened up in my sock.",
            "kana": "あいた",
            "reading": "くつした に あな が あいた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "梅の花が[開いた]。",
            "translation": "The plum blossoms opened.",
            "kana": "あいた",
            "reading": "うめ の はな が あいた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "点差が五点に[開いた]。",
            "translation": "The score gap widened to five points.",
            "kana": "あいた",
            "reading": "てんさ が ごてん に あいた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "目の前が急に[開いた]。",
            "translation": "The space in front of me suddenly opened up.",
            "kana": "あいた",
            "reading": "めのまえ が きゅうに あいた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "やっと心が[開いた]ようだ。",
            "translation": "It seems his heart finally opened.",
            "kana": "あいた",
            "reading": "やっと こころ が あいた ようだ。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "本をパッと[開いた]。",
            "translation": "I flipped (opened) the book open.",
            "kana": "あいた",
            "reading": "ほん を ぱっと あいた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "傘が自動で[開いた]。",
            "translation": "The umbrella opened automatically.",
            "kana": "あいた",
            "reading": "かさ が じどう で あいた。"
        },
        {
            "verb": "開く (aku)",
            "tense": "Plain Past (Ta)",
            "text": "封筒が少し[開いた]状態で届いた。",
            "translation": "The envelope arrived in a slightly open state.",
            "kana": "あいた",
            "reading": "ふうとう が すこし あいた じょうたい で とどいた。"
        }, {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "料理を作りすぎて[余ります]。",
            "translation": "I make too much food, so there are leftovers.",
            "kana": "あまります",
            "reading": "りょうり を つくりすぎて あまります。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "予算が少し[余ります]ね。",
            "translation": "The budget will have a little left over, won't it?",
            "kana": "あまります",
            "reading": "よさん が すこし あまります ね。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "時間が[余ります]か？",
            "translation": "Will there be time left over?",
            "kana": "あまります",
            "reading": "じかん が あまります か？"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "10を3で割ると1[余ります]。",
            "translation": "If you divide 10 by 3, there is a remainder of 1.",
            "kana": "あまります",
            "reading": "じゅう を さん で わる と いち あまります。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "人手が[余ります]。",
            "translation": "There is surplus manpower.",
            "kana": "あまります",
            "reading": "ひとで が あまります。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "生地が[余ります]。",
            "translation": "There will be fabric/dough left over.",
            "kana": "あまります",
            "reading": "きじ が あまります。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "場所が[余ります]。",
            "translation": "There is extra space.",
            "kana": "あまります",
            "reading": "ばしょ が あまります。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "材料が[余ります]。",
            "translation": "The materials will be left over.",
            "kana": "あまります",
            "reading": "ざいりょう が あまります。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "チケットが[余ります]。",
            "translation": "Tickets will be left over.",
            "kana": "あまります",
            "reading": "ちけっと が あまります。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Present (Masu)",
            "text": "力はまだ[余ります]。",
            "translation": "I still have energy to spare.",
            "kana": "あまります",
            "reading": "ちから は まだ あまります。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "お菓子が[余りました]。",
            "translation": "There were sweets left over.",
            "kana": "あまりました",
            "reading": "おかし が あまりました。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "結局、小銭が[余りました]。",
            "translation": "In the end, some small change was left over.",
            "kana": "あまりました",
            "reading": "けっきょく、 こぜに が あまりました。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "思ったより時間が[余りました]。",
            "translation": "There was more time left over than I expected.",
            "kana": "あまりました",
            "reading": "おもった より じかん が あまりました。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "紙が大量に[余りました]。",
            "translation": "A large amount of paper was left over.",
            "kana": "あまりました",
            "reading": "かみ が たいりょう に あまりました。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "ご飯が[余りました]か？",
            "translation": "Was there any rice left over?",
            "kana": "あまりました",
            "reading": "ごはん が あまりました か？"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "一人分[余りました]。",
            "translation": "There was enough for one person left over.",
            "kana": "あまりました",
            "reading": "ひとりぶん あまりました。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "席がいくつか[余りました]。",
            "translation": "A few seats were left over.",
            "kana": "あまりました",
            "reading": "せき が いくつか あまりました。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "電力が[余りました]。",
            "translation": "There was a surplus of electric power.",
            "kana": "あまりました",
            "reading": "でんりょく が あまりました。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "言葉が[余りました]。",
            "translation": "Words were left unsaid (too many words).",
            "kana": "あまりました",
            "reading": "ことば が あまりました。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Polite Past (Mashita)",
            "text": "運が[余りました]。",
            "translation": "Luck was on my side (surplus of luck).",
            "kana": "あまりました",
            "reading": "うん が あまりました。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "ご飯が[余って]しまった。",
            "translation": "The rice ended up being left over.",
            "kana": "あまって",
            "reading": "ごはん が あまって しまった。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "時間が[余って]暇だ。",
            "translation": "I have time left over, so I'm free.",
            "kana": "あまって",
            "reading": "じかん が あまって ひま だ。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "お金が[余って]も貯金します。",
            "translation": "Even if money is left over, I will save it.",
            "kana": "あまって",
            "reading": "おかね が あまって も ちょきん します。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "手が[余って]いるなら手伝って。",
            "translation": "If you have hands to spare (are free), please help.",
            "kana": "あまって",
            "reading": "て が あまって いる なら てつだって。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "材料が[余って]困っている。",
            "translation": "I'm troubled because materials are left over.",
            "kana": "あまって",
            "reading": "ざいりょう が あまって こまっている。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "体力が[余って]いて眠れない。",
            "translation": "I have energy to spare and can't sleep.",
            "kana": "あまって",
            "reading": "たいりょく が あまって いて ねむれない。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "チケットが[余って]しまったのであげます。",
            "translation": "Since I have extra tickets, I'll give them to you.",
            "kana": "あまって",
            "reading": "ちけっと が あまって しまった ので あげます。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "場所が[余って]有効活用したい。",
            "translation": "Space is left over, so I want to use it effectively.",
            "kana": "あまって",
            "reading": "ばしょ が あまって ゆうこうかつよう したい。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "パンが[余って]固くなった。",
            "translation": "The bread was left over and became hard.",
            "kana": "あまって",
            "reading": "ぱん が あまって かたくなった。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Te-form",
            "text": "予算が[余って]ラッキーだ。",
            "translation": "Lucky that the budget was left over.",
            "kana": "あまって",
            "reading": "よさん が あまって らっきー だ。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "時間は一分も[余らない]。",
            "translation": "There isn't even a minute of time left over.",
            "kana": "あまらない",
            "reading": "じかん は いっぷん も あまらない。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "お金が全然[余らない]。",
            "translation": "There is no money left over at all.",
            "kana": "あまらない",
            "reading": "おかね が ぜんぜん あまらない。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "食べ物は[余らない]ようにする。",
            "translation": "I'll make sure no food is left over.",
            "kana": "あまらない",
            "reading": "たべもの は あまらない ように する。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "今回は材料が[余らない]はずだ。",
            "translation": "This time, the materials shouldn't be left over.",
            "kana": "あまらない",
            "reading": "こんかい は ざいりょう が あまらない はず だ。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "チケットが[余らない]か心配だ。",
            "translation": "I'm worried if the tickets won't be left over.",
            "kana": "あまらない",
            "reading": "ちけっと が あまらない か しんぱい だ。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "人手は[余らない]どころか足りない。",
            "translation": "Far from being surplus, we are short of hands.",
            "kana": "あまらない",
            "reading": "ひとで は あまらない どころか たりない。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "生地が[余らない]ように裁断する。",
            "translation": "Cut the fabric so that none is left over.",
            "kana": "あまらない",
            "reading": "きじ が あまらない ように さいだん する。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "100を10で割ると[余らない]。",
            "translation": "When you divide 100 by 10, there is no remainder.",
            "kana": "あまらない",
            "reading": "ひゃく を じゅう で わる と あまらない。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "場所が全く[余らない]。",
            "translation": "There is no extra space at all.",
            "kana": "あまらない",
            "reading": "ばしょ が まったく あまらない。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Negative (Nai)",
            "text": "力は少しも[余らない]ほど疲れた。",
            "translation": "I'm so tired that I don't have a bit of energy to spare.",
            "kana": "あまらない",
            "reading": "ちから は すこし も あまらない ほど つかれた。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "思った以上に[余った]。",
            "translation": "There was more left over than I thought.",
            "kana": "あまった",
            "reading": "おもった いじょう に あまった。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "パンが[余った]から明日食べよう。",
            "translation": "The bread was left over, so let's eat it tomorrow.",
            "kana": "あまった",
            "reading": "ぱん が あまった から あした たべよう。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "時間が10分[余った]。",
            "translation": "There were 10 minutes left over.",
            "kana": "あまった",
            "reading": "じかん が じゅっぷん あまった。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "予算が[余った]分は返金する。",
            "translation": "The leftover budget will be refunded.",
            "kana": "あまった",
            "reading": "よさん が あまった ぶん は へんきん する。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "席が[余った]ので座れた。",
            "translation": "There was an extra seat, so I could sit down.",
            "kana": "あまった",
            "reading": "せき が あまった ので すわれた。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "材料が[余った]ので別の料理を作った。",
            "translation": "Since materials were left over, I made another dish.",
            "kana": "あまった",
            "reading": "ざいりょう が あまった ので べつの りょうり を つくった。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "チケットが二枚[余った]。",
            "translation": "Two tickets were left over.",
            "kana": "あまった",
            "reading": "ちけっと が にまい あまった。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "電力がかなり[余った]らしい。",
            "translation": "Apparently, quite a lot of electric power was left over.",
            "kana": "あまった",
            "reading": "でんりょく が かなり あまった らしい。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "体力が[余った]ので走りに行った。",
            "translation": "I had extra energy, so I went for a run.",
            "kana": "あまった",
            "reading": "たいりょく が あまった ので はしり に いった。"
        },
        {
            "verb": "余る (amaru)",
            "tense": "Plain Past (Ta)",
            "text": "小銭が数円[余った]。",
            "translation": "A few yen in small change was left over.",
            "kana": "あまった",
            "reading": "こぜに が すうえん あまった。"
        }, {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "両親の健康を[案じます]。",
            "translation": "I worry about my parents' health.",
            "kana": "あんじます",
            "reading": "りょうしん の けんこう を あんじます。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "今後の情勢を[案じます]。",
            "translation": "I am concerned about the future situation.",
            "kana": "あんじます",
            "reading": "こんご の じょうせい を あんじます。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "子供の将来を[案じます]か？",
            "translation": "Do you worry about your child's future?",
            "kana": "あんじます",
            "reading": "こども の しょうらい を あんじます か？"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "策を[案じます]。",
            "translation": "I will devise a plan.",
            "kana": "あんじます",
            "reading": "さく を あんじます。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "身の安全を[案じます]。",
            "translation": "I worry for my physical safety.",
            "kana": "あんじます",
            "reading": "みの あんぜん を あんじます。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "事の成り行きを[案じます]。",
            "translation": "I am anxious about how things will turn out.",
            "kana": "あんじます",
            "reading": "こと の なりゆき を あんじます。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "友人の身の上を[案じます]。",
            "translation": "I worry about my friend's circumstances.",
            "kana": "あんじます",
            "reading": "ゆうじん の みのうえ を あんじます。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "国の行方を[案じます]。",
            "translation": "I worry about the direction of the country.",
            "kana": "あんじます",
            "reading": "くに の ゆくえ を あんじます。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "売上の減少を[案じます]。",
            "translation": "I am concerned about the decrease in sales.",
            "kana": "あんじます",
            "reading": "うりあげ の げんしょう を あんじます。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Present (Masu)",
            "text": "一人暮らしの祖母を[案じます]。",
            "translation": "I worry about my grandmother who lives alone.",
            "kana": "あんじます",
            "reading": "ひとりぐらし の そぼ を あんじます。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "結果を[案じました]。",
            "translation": "I was worried about the results.",
            "kana": "あんじました",
            "reading": "けっか を あんじました。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼の遅刻を[案じました]。",
            "translation": "I was concerned about his lateness.",
            "kana": "あんじました",
            "reading": "かれ の ちこく を あんじました。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "台風の影響を[案じました]。",
            "translation": "I was worried about the effects of the typhoon.",
            "kana": "あんじました",
            "reading": "たいふう の えいきょう を あんじました。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "新しい計画を[案じました]。",
            "translation": "I devised (thought up) a new plan.",
            "kana": "あんじました",
            "reading": "あたらしい けいかく を あんじました。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "家族の安否を[案じました]か？",
            "translation": "Were you worried about your family's safety?",
            "kana": "あんじました",
            "reading": "かぞく の あんぴ を あんじました か？"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "不況の長期化を[案じました]。",
            "translation": "I was concerned about the prolonged recession.",
            "kana": "あんじました",
            "reading": "ふきょう の ちょうきか を あんじました。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "プロジェクトの失敗を[案じました]。",
            "translation": "I was worried about the project failing.",
            "kana": "あんじました",
            "reading": "ぷろじぇくと の しっぱい を あんじました。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "病状の悪化を[案じました]。",
            "translation": "I was concerned about the worsening of the medical condition.",
            "kana": "あんじました",
            "reading": "びょうじょう の あっか を あんじました。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "一晩中、友人を[案じました]。",
            "translation": "I worried about my friend all night long.",
            "kana": "あんじました",
            "reading": "ひとばんじゅう、 ゆうじん を あんじました。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Polite Past (Mashita)",
            "text": "資金不足を[案じました]。",
            "translation": "I was concerned about the lack of funds.",
            "kana": "あんじました",
            "reading": "しきんぶそく を あんじました。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "母は私を[案じて]電話をくれた。",
            "translation": "My mother called me, worried about me.",
            "kana": "あんじて",
            "reading": "はは は わたし を あんじて でんわ を くれた。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "将来を[案じて]ばかりいても始まらない。",
            "translation": "It's no use just worrying about the future.",
            "kana": "あんじて",
            "reading": "しょうらい を あんじて ばかり いても はじまらない。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "策を[案じて]実行に移す。",
            "translation": "Devise a plan and put it into action.",
            "kana": "あんじて",
            "reading": "さく を あんじて じっこう に うつす。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "状況を[案じて]対策を立てる。",
            "translation": "Worrying about the situation, we will set up countermeasures.",
            "kana": "あんじて",
            "reading": "じょうきょう を あんじて たいさく を たてる。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "身を[案じて]忠告する。",
            "translation": "To give advice out of concern for someone's well-being.",
            "kana": "あんじて",
            "reading": "み を あんじて ちゅうこく する。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "周囲を[案じて]静かにする。",
            "translation": "Be quiet out of consideration (concern) for the surroundings.",
            "kana": "あんじて",
            "reading": "しゅうい を あんじて しずかに する。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "彼を[案じて]家まで行った。",
            "translation": "Worried about him, I went to his house.",
            "kana": "あんじて",
            "reading": "かれ を あんじて いえ まで いった。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "行く末を[案じて]貯金する。",
            "translation": "Save money out of concern for the future.",
            "kana": "あんじて",
            "reading": "ゆくすえ を あんじて ちょきん する。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "体調を[案じて]早く寝る。",
            "translation": "Go to bed early out of concern for one's physical condition.",
            "kana": "あんじて",
            "reading": "たいちょう を あんじて はやく ねる。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Te-form",
            "text": "不備を[案じて]再確認する。",
            "translation": "Reconfirm out of concern for flaws.",
            "kana": "あんじて",
            "reading": "ふび を あんじて さいかくにん する。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "あまり[案じない]でください。",
            "translation": "Please don't worry too much.",
            "kana": "あんじない",
            "reading": "あまり あんじない で ください。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は自分のことを[案じない]。",
            "translation": "He doesn't worry about himself.",
            "kana": "あんじない",
            "reading": "かれ は じぶん の こと を あんじない。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "結果を[案じない]わけにはいかない。",
            "translation": "I can't help but worry about the result.",
            "kana": "あんじない",
            "reading": "けっか を あんじない わけ に は いかない。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰もこの問題を[案じない]。",
            "translation": "Nobody is concerned about this problem.",
            "kana": "あんじない",
            "reading": "だれ も この もんだい を あんじない。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "将来を[案じない]若者が増えている。",
            "translation": "The number of young people who don't worry about the future is increasing.",
            "kana": "あんじない",
            "reading": "しょうらい を あんじない わかもの が ふえている。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "失敗を[案じない]勇気が必要だ。",
            "translation": "The courage not to worry about failure is necessary.",
            "kana": "あんじない",
            "reading": "しっぱい を あんじない ゆうき が ひつよう だ。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "周囲の目を[案じない]で行動する。",
            "translation": "Act without worrying about how others see you.",
            "kana": "あんじない",
            "reading": "しゅうい の め を あんじない で こうどう する。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は危険を[案じない]。",
            "translation": "He doesn't worry about danger.",
            "kana": "あんじない",
            "reading": "かれ は きけん を あんじない。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "少しも[案じない]様子だった。",
            "translation": "He didn't seem worried in the least.",
            "kana": "あんじない",
            "reading": "すこし も あんじない ようす だった。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Negative (Nai)",
            "text": "細部を[案じない]大雑把な性格だ。",
            "translation": "He has a careless personality that doesn't worry about details.",
            "kana": "あんじない",
            "reading": "さいぶ を あんじない おおざっぱ な せいかく だ。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "彼の無事を[案じた]。",
            "translation": "I worried about his safety.",
            "kana": "あんじた",
            "reading": "かれ の ぶじ を あんじた。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "良いアイデアを[案じた]。",
            "translation": "I thought up (devised) a good idea.",
            "kana": "あんじた",
            "reading": "よい あいであ を あんじた。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "親が子供を[案じた]結果だ。",
            "translation": "This is the result of parents worrying about their child.",
            "kana": "あんじた",
            "reading": "おや が こども を あんじた けっか だ。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "誰もがその行く末を[案じた]。",
            "translation": "Everyone was concerned about its future.",
            "kana": "あんじた",
            "reading": "だれもが その ゆくすえ を あんじた。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "夜通し策を[案じた]。",
            "translation": "I devised a plan all night long.",
            "kana": "あんじた",
            "reading": "よどおし さく を あんじた。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "彼女の健康状態を[案じた]。",
            "translation": "I was concerned about her health condition.",
            "kana": "あんじた",
            "reading": "かのじょ の けんこう じょうたい を あんじた。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "失敗の可能性を[案じた]。",
            "translation": "I worried about the possibility of failure.",
            "kana": "あんじた",
            "reading": "しっぱい の かのうせい を あんじた。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "事態を重く[案じた]。",
            "translation": "I viewed the situation with serious concern.",
            "kana": "あんじた",
            "reading": "じたい を おもく あんじた。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "友人が[案じた]通りになった。",
            "translation": "It turned out exactly as my friend had feared (worried).",
            "kana": "あんじた",
            "reading": "ゆうじん が あんじた とおり に なった。"
        },
        {
            "verb": "案じる (anjiru)",
            "tense": "Plain Past (Ta)",
            "text": "一人で解決策を[案じた]。",
            "translation": "I thought up a solution by myself.",
            "kana": "あんじた",
            "reading": "ひとり で かいけつさく を あんじた。"
        }, {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "毎朝、顔を[洗います]。",
            "translation": "I wash my face every morning.",
            "kana": "あらいます",
            "reading": "まいあさ、 かお を あらいます。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "食後に皿を[洗います]か？",
            "translation": "Do you wash the dishes after a meal?",
            "kana": "あらいます",
            "reading": "しょくご に さら を あらいます か？"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "週末に車を[洗います]。",
            "translation": "I wash my car on weekends.",
            "kana": "あらいます",
            "reading": "しゅうまつ に くるま を あらいます。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "お米を[洗います]。",
            "translation": "I will wash (rinse) the rice.",
            "kana": "あらいます",
            "reading": "おこめ を あらいます。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "この洗剤で服を[洗います]。",
            "translation": "I wash clothes with this detergent.",
            "kana": "あらいます",
            "reading": "この せんざい で ふく を あらいます。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "外から帰ったら手を[洗います]。",
            "translation": "I wash my hands when I get home from outside.",
            "kana": "あらいます",
            "reading": "そと から かえったら て を あらいます。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "野菜を綺麗に[洗います]。",
            "translation": "I wash the vegetables thoroughly.",
            "kana": "あらいます",
            "reading": "やさい を きれい に あらいます。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "犬の体を[洗います]。",
            "translation": "I wash my dog's body.",
            "kana": "あらいます",
            "reading": "いぬ の からだ を あらいます。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "靴を自分で[洗います]。",
            "translation": "I wash my shoes by myself.",
            "kana": "あらいます",
            "reading": "くつ を じぶん で あらいます。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Present (Masu)",
            "text": "筆を水で[洗います]。",
            "translation": "I wash the brush with water.",
            "kana": "あらいます",
            "reading": "ふで を みず で あらいます。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、シーツを[洗いました]。",
            "translation": "I washed the sheets yesterday.",
            "kana": "あらいました",
            "reading": "きのう、 しーつ を あらいました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "もう手を[洗いました]か？",
            "translation": "Have you already washed your hands?",
            "kana": "あらいました",
            "reading": "もう て を あらいました か？"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "汚れた窓を[洗いました]。",
            "translation": "I washed the dirty windows.",
            "kana": "あらいました",
            "reading": "よごれた まど を あらいました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "彼は一生懸命、廊下を[洗いました]。",
            "translation": "He washed the hallway very hard.",
            "kana": "あらいました",
            "reading": "かれ は いっしょうけんめい、 ろうか を あらいました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "お風呂場を[洗いました]。",
            "translation": "I washed the bathroom.",
            "kana": "あらいました",
            "reading": "おふろば を あらいました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "ブラシを石鹸で[洗いました]。",
            "translation": "I washed the brush with soap.",
            "kana": "あらいました",
            "reading": "ぶらし を せっけん で あらいました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "泥だらけの服を[洗いました]。",
            "translation": "I washed the mud-covered clothes.",
            "kana": "あらいました",
            "reading": "どろだらけ の ふく を あらいました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "彼女は髪を[洗いました]。",
            "translation": "She washed her hair.",
            "kana": "あらいました",
            "reading": "かのじょ は かみ を あらいました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "果物を洗ってから[食べました]。",
            "translation": "I washed the fruit before eating it.",
            "kana": "あらいました",
            "reading": "くだもの を あらって から たべました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Polite Past (Mashita)",
            "text": "全部の皿を[洗いました]。",
            "translation": "I washed all the dishes.",
            "kana": "あらいました",
            "reading": "ぜんぶ の さら を あらいました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "手を[洗って]からご飯を食べなさい。",
            "translation": "Wash your hands before eating a meal.",
            "kana": "あらって",
            "reading": "て を あらって から ごはん を たべなさい。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "皿を[洗って]、棚にしまいました。",
            "translation": "I washed the dishes and put them in the cupboard.",
            "kana": "あらって",
            "reading": "さら を あらって、 たな に しまいました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "服を[洗って]干しました。",
            "translation": "I washed the clothes and hung them to dry.",
            "kana": "あらって",
            "reading": "ふく を あらって ほしました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "じゃがいもをよく[洗って]ください。",
            "translation": "Please wash the potatoes well.",
            "kana": "あらって",
            "reading": "じゃがいも を よく あらって ください。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "顔を[洗って]スッキリしました。",
            "translation": "I washed my face and felt refreshed.",
            "kana": "あらって",
            "reading": "かお を あらって すっきり しました。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "靴を[洗って]、太陽の下に置いた。",
            "translation": "I washed the shoes and put them under the sun.",
            "kana": "あらって",
            "reading": "くつ を あらって、 たいよう の した に おいた。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "汚れを水で[洗って]落とす。",
            "translation": "Wash off the dirt with water.",
            "kana": "あらって",
            "reading": "よごれ を みず で あらって おとす。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "布を[洗って]再利用する。",
            "translation": "Wash the cloth and reuse it.",
            "kana": "あらって",
            "reading": "ぬの を あらって さいりよう する。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "傷口を綺麗に[洗って]消毒した。",
            "translation": "I washed the wound clean and disinfected it.",
            "kana": "あらって",
            "reading": "きずぐち を きれい に あらって しょうどく した。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Te-form",
            "text": "洗車機で車を[洗って]もらった。",
            "translation": "I had my car washed at the car wash.",
            "kana": "あらって",
            "reading": "せんしゃき で くるま を あらって もらった。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "忙しくて髪を[洗わない]。",
            "translation": "I'm so busy I don't wash my hair.",
            "kana": "あらわない",
            "reading": "いそがしくて かみ を あらわない。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は手を[あらわない]で食事をする。",
            "translation": "He eats without washing his hands.",
            "kana": "あらわない",
            "reading": "かれ は て を あらわない で しょくじ を する。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "この素材は水で[洗わない]ほうがいい。",
            "translation": "It is better not to wash this material with water.",
            "kana": "あらわない",
            "reading": "この そざい は みず で あらわない ほう が いい。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "今日は皿を[洗わない]と決めた。",
            "translation": "I decided not to wash the dishes today.",
            "kana": "あらわない",
            "reading": "きょう は さら を あらわない と きめた。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "野菜を[洗わない]で食べるのは危ない。",
            "translation": "It is dangerous to eat vegetables without washing them.",
            "kana": "あらわない",
            "reading": "やさい を あらわない で たべる の は あぶない。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "あまり頻繁に[洗わない]ほうが生地が傷まない。",
            "translation": "The fabric won't get damaged if you don't wash it too often.",
            "kana": "あらわない",
            "reading": "あまり ひんぱん に あらわない ほう が きじ が いたまない。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "汚れがひどくないので、今日は[洗わない]。",
            "translation": "Since it's not very dirty, I won't wash it today.",
            "kana": "あらわない",
            "reading": "よごれ が ひどくない ので、 きょう は あらわない。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "石鹸を使って[洗わない]でください。",
            "translation": "Please do not wash using soap.",
            "kana": "あらわない",
            "reading": "せっけん を つかって あらわない で ください。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "彼女は服を[洗わない]まま放置した。",
            "translation": "She left the clothes without washing them.",
            "kana": "あらわない",
            "reading": "かのじょ は ふく を あらわない まま ほうち した。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ新しいから[洗わない]。",
            "translation": "It's still new, so I won't wash it.",
            "kana": "あらわない",
            "reading": "まだ あたらしい から あらわない。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "さっき手を[洗った]ばかりだ。",
            "translation": "I just washed my hands a moment ago.",
            "kana": "あらった",
            "reading": "さっき て を あらった ばかり だ。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "車を[洗った]のに雨が降ってきた。",
            "translation": "Even though I washed the car, it started raining.",
            "kana": "あらった",
            "reading": "くるま を あらった のに あめ が ふってきた。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "彼は自分の靴を綺麗に[洗った]。",
            "translation": "He washed his shoes clean.",
            "kana": "あらった",
            "reading": "かれ は じぶん の くつ を きれい に あらった。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "昨日、溜まっていた洗濯物を[洗った]。",
            "translation": "Yesterday, I washed the laundry that had piled up.",
            "kana": "あらった",
            "reading": "きのう、 たまっていた せんたくもの を あらった。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "犬を[洗った]らとても綺麗になった。",
            "translation": "I washed the dog, and it became very clean.",
            "kana": "あらった",
            "reading": "いぬ を あらった ら とても きれい に なった。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "お米を三回[洗った]。",
            "translation": "I washed the rice three times.",
            "kana": "あらった",
            "reading": "おこめ を さんかい あらった。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "筆を綺麗に[洗った]か？",
            "translation": "Did you wash the brush clean?",
            "kana": "あらった",
            "reading": "ふで を きれい に あらった か？"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "シーツを[洗った]ので気持ちがいい。",
            "translation": "I washed the sheets, so it feels good.",
            "kana": "あらった",
            "reading": "しーつ を あらった ので きもち が いい。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "皿を[洗った]後、手を拭いた。",
            "translation": "After washing the dishes, I wiped my hands.",
            "kana": "あらった",
            "reading": "さら を あらった あと、 て を ふいた。"
        },
        {
            "verb": "洗う (arau)",
            "tense": "Plain Past (Ta)",
            "text": "野菜を[洗った]水で植物に水をやる。",
            "translation": "I water the plants with the water I used to wash vegetables.",
            "kana": "あらった",
            "reading": "やさい を あらった みず で しょくぶつ に みず を やる。"
        }, {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "霧の中から人影が[現れます]。",
            "translation": "A figure appears from within the fog.",
            "kana": "あらわれます",
            "reading": "きり の なか から ひとかげ が あらわれます。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "春になると新しい芽が[現れます]。",
            "translation": "New buds appear when spring comes.",
            "kana": "あらわれます",
            "reading": "はる に なる と あたらしい め が あらわれます。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "努力の結果が数字に[現れます]。",
            "translation": "The results of your efforts appear in the numbers.",
            "kana": "あらわれます",
            "reading": "どりょく の けっか が すうじ に あらわれます。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "不満が顔に[現れます]ね。",
            "translation": "Dissatisfaction shows on your face, doesn't it?",
            "kana": "あらわれます",
            "reading": "ふまん が かお に あらわれます ね。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "たまに珍しい鳥が庭に[現れます]。",
            "translation": "Rare birds occasionally appear in the garden.",
            "kana": "あらわれます",
            "reading": "たまに めずらしい とり が にわ に あらわれます。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "隠れていた本性が[現れます]。",
            "translation": "One's hidden true nature comes to light (appears).",
            "kana": "あらわれます",
            "reading": "かくれていた ほんしょう が あらわれます。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "画面にメニューが[現れます]。",
            "translation": "The menu appears on the screen.",
            "kana": "あらわれます",
            "reading": "がめん に めにゅー が あらわれます。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "太陽が雲の間から[現れます]。",
            "translation": "The sun appears from between the clouds.",
            "kana": "あらわれます",
            "reading": "たいよう が くも の あいだ から あらわれます。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "疲れが肌に[現れます]。",
            "translation": "Fatigue shows (appears) on the skin.",
            "kana": "あらわれます",
            "reading": "つかれ が はだ に あらわれます。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Present (Masu)",
            "text": "奇跡が[現れます]か？",
            "translation": "Will a miracle manifest (appear)?",
            "kana": "あらわれます",
            "reading": "きせき が あらわれます か？"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "ついに救世主が[現れました]。",
            "translation": "Finally, a savior appeared.",
            "kana": "あらわれました",
            "reading": "ついに きゅうせいしゅ が あらわれました。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼の目に涙が[現れました]。",
            "translation": "Tears appeared in his eyes.",
            "kana": "あらわれました",
            "reading": "かれ の め に なみだ が あらわれました。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "角を曲がると海が[現れました]。",
            "translation": "When I turned the corner, the sea appeared.",
            "kana": "あらわれました",
            "reading": "かど を まがる と うみ が あらわれました。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "突然、クマが道に[現れました]。",
            "translation": "Suddenly, a bear appeared on the road.",
            "kana": "あらわれました",
            "reading": "とつぜん、 くま が みち に あらわれました。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "問題点がはっきりと[現れました]。",
            "translation": "The problems appeared clearly.",
            "kana": "あらわれました",
            "reading": "もんだいてん が はっきり と あらわれました。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "待ち合わせ場所に彼が[現れました]か？",
            "translation": "Did he show up (appear) at the meeting place?",
            "kana": "あらわれました",
            "reading": "まちあわせ ばしょ に かれ が あらわれました か？"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "心の迷いが態度に[現れました]。",
            "translation": "The hesitation in my heart appeared in my attitude.",
            "kana": "あらわれました",
            "reading": "こころ の まよい が たいど に あらわれました。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "新しい証拠が[現れました]。",
            "translation": "New evidence appeared.",
            "kana": "あらわれました",
            "reading": "あたらしい しょうこ が あらわれました。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "山頂に登ると絶景が[現れました]。",
            "translation": "Upon reaching the summit, a superb view appeared.",
            "kana": "あらわれました",
            "reading": "さんちょう に のぼる と ぜっけい が あらわれました。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日の夜、幽霊が[現れました]。",
            "translation": "A ghost appeared last night.",
            "kana": "あらわれました",
            "reading": "きのう の よる、 ゆうれい が あらわれました。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "犯人が姿を[現して]、捕まった。",
            "translation": "The culprit appeared and was caught.",
            "kana": "あらわれて",
            "reading": "はんにん が すがた を あらわれて、 つかまった。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "効果が[現れて]きて嬉しい。",
            "translation": "I'm happy that the effects are starting to appear.",
            "kana": "あらわれて",
            "reading": "こうか が あらわれて きて うれしい。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "星が[現れて]、空が輝きだした。",
            "translation": "Stars appeared, and the sky began to shine.",
            "kana": "あらわれて",
            "reading": "ほし が あらわれて、 そら が かがやきだした。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "症状が[現れて]から薬を飲む。",
            "translation": "Take medicine after symptoms appear.",
            "kana": "あらわれて",
            "reading": "しょうじょう が あらわれて から くすり を のむ。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "真実が[現れて]、誤解が解けた。",
            "translation": "The truth came to light (appeared), and the misunderstanding was cleared.",
            "kana": "あらわれて",
            "reading": "しんじつ が あらわれて、 ごかい が とけた。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "敵が目の前に[現れて]驚いた。",
            "translation": "I was surprised when the enemy appeared before my eyes.",
            "kana": "あらわれて",
            "reading": "てき が めのまえ に あらわれて おどろいた。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "疲れが[現れて]、倒れてしまった。",
            "translation": "Fatigue showed, and I collapsed.",
            "kana": "あらわれて",
            "reading": "つかれ が あらわれて、 たおれて しまった。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "チャンスが[現れて]、すぐにつかんだ。",
            "translation": "An opportunity appeared, and I grabbed it immediately.",
            "kana": "あらわれて",
            "reading": "ちゃんす が あらわれて、 すぐに つかんだ。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "名前がリストに[現れて]安心した。",
            "translation": "I was relieved when my name appeared on the list.",
            "kana": "あらわれて",
            "reading": "なまえ が りすと に あらわれて あんしん した。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Te-form",
            "text": "月が[現れて]、夜道が明るくなった。",
            "translation": "The moon appeared, and the night path became bright.",
            "kana": "あらわれて",
            "reading": "つき が あらわれて、 よみち が あかるく なった。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は今日は[現れない]と思う。",
            "translation": "I don't think he will show up today.",
            "kana": "あらわれない",
            "reading": "かれ は きょう は あらわれない と おもう。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "薬を飲んでも効果が[現れない]。",
            "translation": "Even after taking medicine, the effects don't appear.",
            "kana": "あらわれない",
            "reading": "くすり を のんでも こうか が あらわれない。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "感情が顔に[現れない]タイプだ。",
            "translation": "He is the type whose emotions don't show (appear) on his face.",
            "kana": "あらわれない",
            "reading": "かんじょう が かお に あらわれない たいぷ だ。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "雲が多くて太陽が[現れない]。",
            "translation": "There are many clouds, so the sun doesn't appear.",
            "kana": "あらわれない",
            "reading": "くも が おおくて たいよう が あらわれない。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "新しい星がなかなか[現れない]。",
            "translation": "A new star just won't appear.",
            "kana": "あらわれない",
            "reading": "あたらしい ほし が なかなか あらわれない。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "いくら待ってもバスが[現れない]。",
            "translation": "No matter how long I wait, the bus doesn't appear.",
            "kana": "あらわれない",
            "reading": "いくら まっても ばす が あらわれない。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "本心が[現れない]ように気をつける。",
            "translation": "I'll be careful so my true feelings don't show.",
            "kana": "あらわれない",
            "reading": "ほんしん が あらわれない ように き を つける。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "不思議と疲れが[現れない]。",
            "translation": "Strangely, fatigue doesn't show.",
            "kana": "あらわれない",
            "reading": "ふしぎ と つかれ が あらわれない。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰も助けに[現れない]。",
            "translation": "Nobody appears to help.",
            "kana": "あらわれない",
            "reading": "だれ も たすけ に あらわれない。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Negative (Nai)",
            "text": "矛盾が[現れない]ように説明する。",
            "translation": "Explain so that no contradictions appear.",
            "kana": "あらわれない",
            "reading": "むじゅん が あらわれない ように せつめい する。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "昨日、公園に猫が[現れた]。",
            "translation": "A cat appeared in the park yesterday.",
            "kana": "あらわれた",
            "reading": "きのう、 こうえん に ねこ が あらわれた。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "ようやく希望が[現れた]。",
            "translation": "Hope has finally appeared.",
            "kana": "あらわれた",
            "reading": "ようやく きぼう が あらわれた。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "彼の本性が[現れた]瞬間だった。",
            "translation": "It was the moment his true nature appeared.",
            "kana": "あらわれた",
            "reading": "かれ の ほんしょう が あらわれた しゅんかん だった。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "虹が空に[現れた]。",
            "translation": "A rainbow appeared in the sky.",
            "kana": "あらわれた",
            "reading": "にじ が そら に あらわれた。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "ついに彼が[現れた]か！",
            "translation": "So he finally showed up (appeared)!",
            "kana": "あらわれた",
            "reading": "ついに かれ が あらわれた か！"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "不満が態度に[現れた]。",
            "translation": "Dissatisfaction appeared in his attitude.",
            "kana": "あらわれた",
            "reading": "ふまん が たいど に あらわれた。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "新しい課題が次々と[現れた]。",
            "translation": "New challenges appeared one after another.",
            "kana": "あらわれた",
            "reading": "あたらしい かだい が つぎつぎ と あらわれた。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "画面にエラーが[現れた]。",
            "translation": "An error appeared on the screen.",
            "kana": "あらわれた",
            "reading": "がめん に えらー が あらわれた。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "森の奥に古い塔が[現れた]。",
            "translation": "An old tower appeared deep in the forest.",
            "kana": "あらわれた",
            "reading": "もり の おく に ふるい とう が あらわれた。"
        },
        {
            "verb": "現れる (arawareru)",
            "tense": "Plain Past (Ta)",
            "text": "ついにその時が[現れた]。",
            "translation": "The time has finally arrived (appeared).",
            "kana": "あらわれた",
            "reading": "ついに その とき が あらわれた。"
        }, {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "感謝の気持ちを言葉で[表します]。",
            "translation": "I express my feelings of gratitude with words.",
            "kana": "あらわします",
            "reading": "かんしゃ の きもち を ことば で あらわします。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "赤い色は情熱を[表します]。",
            "translation": "The color red represents passion.",
            "kana": "あらわします",
            "reading": "あかい いろ は じょうねつ を あらわします。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "この図は人口の推移を[表します]か？",
            "translation": "Does this diagram show the population transition?",
            "kana": "あらわします",
            "reading": "この ず は じんこう の すいい を あらわします か？"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "態度で不満を[表します]。",
            "translation": "I show my dissatisfaction through my attitude.",
            "kana": "あらわします",
            "reading": "たいど で ふまん を あらわします。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "絵で風景を[表します]。",
            "translation": "I depict the scenery in a painting.",
            "kana": "あらわします",
            "reading": "え で ふうけい を あらわします。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "記号で場所を[表します]。",
            "translation": "I represent the location with a symbol.",
            "kana": "あらわします",
            "reading": "きごう で ばしょ を あらわします。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "数字で結果を[表します]。",
            "translation": "I express the results in numbers.",
            "kana": "あらわします",
            "reading": "すうじ で けっか を あらわします。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "拍手で賛成を[表します]。",
            "translation": "I show my agreement by applauding.",
            "kana": "あらわします",
            "reading": "はくしゅ で さんせい を あらわします。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "一言でその映画を[表します]。",
            "translation": "I'll describe (express) that movie in one word.",
            "kana": "あらわします",
            "reading": "ひとこと で その えいが を あらわします。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Present (Masu)",
            "text": "顔色に変えて感情を[表します]。",
            "translation": "Emotions show through the change in complexion.",
            "kana": "あらわします",
            "reading": "かおいろ に かえて かんじょう を あらわします。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "喜びを全身で[表しました]。",
            "translation": "I expressed my joy with my whole body.",
            "kana": "あらわしました",
            "reading": "よろこび を ぜんしん で あらわしました。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "彼は沈黙で怒りを[表しました]。",
            "translation": "He showed his anger through silence.",
            "kana": "あらわしました",
            "reading": "かれ は ちんもく で いかり を あらわしました。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "音楽で自由を[表しました]。",
            "translation": "I expressed freedom through music.",
            "kana": "あらわしました",
            "reading": "おんがく で じゆう を あらわしました。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "グラフが減少を[表しました]。",
            "translation": "The graph showed a decrease.",
            "kana": "あらわしました",
            "reading": "ぐらふ が げんしょう を あらわしました。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "丁寧に誠意を[表しました]。",
            "translation": "I expressed my sincerity politely.",
            "kana": "あらわしました",
            "reading": "ていねい に せいい を あらわしました。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "看板が店の名前を[表しました]。",
            "translation": "The sign showed the name of the shop.",
            "kana": "あらわしました",
            "reading": "かんばん が みせ の なまえ を あらわしました。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "ダンスで感情を[表しました]か？",
            "translation": "Did you express your emotions through dance?",
            "kana": "あらわしました",
            "reading": "だんす で かんじょう を あらわしました か？"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "詩で愛を[表しました]。",
            "translation": "I expressed love in a poem.",
            "kana": "あらわしました",
            "reading": "し で あい を あらわしました。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "色の違いがランクを[表しました]。",
            "translation": "The difference in colors represented the ranks.",
            "kana": "あらわしました",
            "reading": "いろ の ちがい が らんく を あらわしました。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Polite Past (Mashita)",
            "text": "会釈をして敬意を[表しました]。",
            "translation": "I showed respect by bowing slightly.",
            "kana": "あらわしました",
            "reading": "えしゃく を して けいい を あらわしました。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "言葉に[表して]伝えてください。",
            "translation": "Please put it into words and convey it.",
            "kana": "あらわして",
            "reading": "ことば に あらわして つたえて ください。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "図に[表して]説明する。",
            "translation": "Explain by representing it in a diagram.",
            "kana": "あらわして",
            "reading": "ず に あらわして せつめい する。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "誠意を[表して]謝罪した。",
            "translation": "He apologized, showing his sincerity.",
            "kana": "あらわして",
            "reading": "せいい を あらわして しゃざい した。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "記号を[表して]地図を作る。",
            "translation": "Make a map by displaying symbols.",
            "kana": "あらわして",
            "reading": "きごう を あらわして ちず を つくる。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "個性を[表して]服を選ぶ。",
            "translation": "Choose clothes that express your personality.",
            "kana": "あらわして",
            "reading": "こせい を あらわして ふく を えらぶ。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "表情に[表して]はいけない。",
            "translation": "You must not show it on your face (expression).",
            "kana": "あらわして",
            "reading": "ひょうじょう に あらわして は いけない。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "感謝を[表して]贈り物をした。",
            "translation": "I gave a gift to show my gratitude.",
            "kana": "あらわして",
            "reading": "かんしゃ を あらわして おくりもの を した。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "意見を[表して]議論に参加する。",
            "translation": "Participate in the discussion by expressing your opinion.",
            "kana": "あらわして",
            "reading": "いけん を あらわして ぎろん に さんか する。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "メロディーを[表して]曲を作る。",
            "translation": "Create a song by expressing a melody.",
            "kana": "あらわして",
            "reading": "めろでぃー を あらわして きょく を つくる。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Te-form",
            "text": "数字に[表して]比較する。",
            "translation": "Compare by expressing in numbers.",
            "kana": "あらわして",
            "reading": "すうじ に あらわして ひかく する。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "うまく言葉に[表せない]。",
            "translation": "I can't express it well in words.",
            "kana": "あらわさない",
            "reading": "うまく ことば に あらわさない。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は感情を[表さない]。",
            "translation": "He doesn't show his emotions.",
            "kana": "あらわさない",
            "reading": "かれ は かんじょう を あらわさない。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "このマークは何を[表さない]のですか？",
            "translation": "What does this mark not represent?",
            "kana": "あらわさない",
            "reading": "この まーく は なに を あらわさない の です か？"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "不満を顔に[表さない]ようにする。",
            "translation": "I try not to show dissatisfaction on my face.",
            "kana": "あらわさない",
            "reading": "ふまん を かお に あらわさない ように する。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "態度は何も[表さない]。",
            "translation": "His attitude doesn't show anything.",
            "kana": "あらわさない",
            "reading": "たいど は なにも あらわさない。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "結果を数字に[表さない]方針だ。",
            "translation": "It is our policy not to express results in numbers.",
            "kana": "あらわさない",
            "reading": "けっか を すうじ に あらわさない ほうしん だ。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "個性を[表さない]制服は嫌いだ。",
            "translation": "I hate uniforms that don't express individuality.",
            "kana": "あらわさない",
            "reading": "こせい を あらわさない せいふく は きらい だ。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "感謝を形に[表さない]と伝わらない。",
            "translation": "If you don't express gratitude in some form, it won't be conveyed.",
            "kana": "あらわさない",
            "reading": "かんしゃ を かたち に あらわさない と つたわらない。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "その記号は危険を[表さない]。",
            "translation": "That symbol does not represent danger.",
            "kana": "あらわさない",
            "reading": "その きごう は きけん を あらわさない。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Negative (Nai)",
            "text": "何も[表さない]白紙の状態。",
            "translation": "A blank state that represents nothing.",
            "kana": "あらわさない",
            "reading": "なにも あらわさない はくし の じょうたい。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "誠意を態度で[表した]。",
            "translation": "He showed his sincerity through his attitude.",
            "kana": "あらわした",
            "reading": "せいい を たいど で あらわした。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "感動を涙で[表した]。",
            "translation": "I expressed my deep emotion with tears.",
            "kana": "あらわした",
            "reading": "かんどう を なみだ で あらわした。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "この線が境界を[表した]。",
            "translation": "This line represented the boundary.",
            "kana": "あらわした",
            "reading": "この せん が きょうかい を あらわした。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "拍手で歓迎を[表した]か？",
            "translation": "Did you show your welcome by applauding?",
            "kana": "あらわした",
            "reading": "はくしゅ で かんげい を あらわした か？"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "絵の具で海を[表した]。",
            "translation": "I depicted the sea with paints.",
            "kana": "あらわした",
            "reading": "えのぐ で うみ を あらわした。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "数字が成長を[表した]。",
            "translation": "The numbers showed growth.",
            "kana": "あらわした",
            "reading": "すうじ が せいちょう を あらわした。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "一言で感想を[表した]。",
            "translation": "I expressed my impressions in one word.",
            "kana": "あらわした",
            "reading": "ひとこと で かんそう を あらわした。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "記号がトイレの場所を[表した]。",
            "translation": "The symbol showed the location of the restroom.",
            "kana": "あらわした",
            "reading": "きごう が といれ の ばしょ を あらわした。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "色で熱さを[表した]。",
            "translation": "I represented the heat with color.",
            "kana": "あらわした",
            "reading": "いろ で あつさ を あらわした。"
        },
        {
            "verb": "表す (arawasu)",
            "tense": "Plain Past (Ta)",
            "text": "全身で喜びを[表した]。",
            "translation": "I expressed joy with my whole body.",
            "kana": "あらわした",
            "reading": "ぜんしん で よろこび を あらわした。"
        }, {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "机の上に本が[あります]。",
            "translation": "There is a book on the desk.",
            "kana": "あります",
            "reading": "つくえ の うえ に ほん が あります。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "明日は会議が[あります]か？",
            "translation": "Is there a meeting tomorrow?",
            "kana": "あります",
            "reading": "あした は かいぎ が あります か？"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "駅の近くに銀行が[あります]。",
            "translation": "There is a bank near the station.",
            "kana": "あります",
            "reading": "えき の ちかく に ぎんこう が あります。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "質問が[あります]。",
            "translation": "I have a question.",
            "kana": "あります",
            "reading": "しつもん が あります。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "時間はたっぷり[あります]。",
            "translation": "There is plenty of time.",
            "kana": "あります",
            "reading": "じかん は たっぷり あります。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "地下に駐車場が[あります]。",
            "translation": "There is a parking lot in the basement.",
            "kana": "あります",
            "reading": "ちか に ちゅうしゃじょう が あります。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "この町には古いお寺が[あります]。",
            "translation": "There are old temples in this town.",
            "kana": "あります",
            "reading": "この まち に は ふるい おてら が あります。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "理由がいくつか[あります]。",
            "translation": "There are several reasons.",
            "kana": "あります",
            "reading": "りゆう が いくつか あります。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "可能性はまだ[あります]。",
            "translation": "There is still a possibility.",
            "kana": "あります",
            "reading": "かのうせい は まだ あります。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Present (Masu)",
            "text": "庭に大きな木が[あります]。",
            "translation": "There is a large tree in the garden.",
            "kana": "あります",
            "reading": "にわ に おおきな き が あります。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日はパーティーが[ありました]。",
            "translation": "There was a party yesterday.",
            "kana": "ありました",
            "reading": "きのう は ぱーてぃー が ありました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "昔、ここに学校が[ありました]。",
            "translation": "Long ago, there was a school here.",
            "kana": "ありました",
            "reading": "むかし、 ここ に がっこう が ありました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "大きな地震が[ありました]か？",
            "translation": "Was there a big earthquake?",
            "kana": "ありました",
            "reading": "おおきな じしん が ありました か？"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "財布の中に1000円[ありました]。",
            "translation": "There was 1000 yen in my wallet.",
            "kana": "ありました",
            "reading": "さいふ の なか に せんえん ありました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "いい考えが[ありました]。",
            "translation": "I had a good idea.",
            "kana": "ありました",
            "reading": "いい かんがえ が ありました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "予定が[ありました]ので、行けませんでした。",
            "translation": "I had plans, so I couldn't go.",
            "kana": "ありました",
            "reading": "よてい が ありました ので、 いけませんでした。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "以前、同じ問題が[ありました]。",
            "translation": "There was the same problem before.",
            "kana": "ありました",
            "reading": "いぜん、 おなじ もんだい が ありました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "窓の外に猫が[ありました]。(Note: inanimate/abstract, but often used for sightings or things existing in a state)",
            "translation": "There was a cat outside the window. (Note: 'iru' is standard for animals, but 'aru' is sometimes used for things 'found' or 'located')",
            "kana": "ありました",
            "reading": "まど の そと に ねこ が ありました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "冷蔵庫に牛乳が[ありました]。",
            "translation": "There was milk in the refrigerator.",
            "kana": "ありました",
            "reading": "れいぞうこ に ぎゅうにゅう が ありました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Polite Past (Mashita)",
            "text": "道に迷った時、標識が[ありました]。",
            "translation": "When I got lost, there was a sign.",
            "kana": "ありました",
            "reading": "みち に まよった とき、 ひょうしき が ありました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "宿題が[あって]、遊びに行けません。",
            "translation": "I have homework, so I can't go out to play.",
            "kana": "あって",
            "reading": "しゅくだい が あって、 あそび に いけません。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "雨が[あって]の緑です。",
            "translation": "The greenery exists because of the rain.",
            "kana": "あって",
            "reading": "あめ が あって の みどり です。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "勇気が[あって]こそ、成功できます。",
            "translation": "Only because you have courage can you succeed.",
            "kana": "あって",
            "reading": "ゆうき が あって こそ、 せいこう できます。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "お金が[あって]も、幸せとは限りません。",
            "translation": "Even if you have money, it doesn't necessarily mean you're happy.",
            "kana": "あって",
            "reading": "おかね が あって も、 しあわせ と は かぎりません。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "自信が[あって]、堂々としています。",
            "translation": "He has confidence and carries himself with dignity.",
            "kana": "あって",
            "reading": "じしん が あって、 どうどう と して います。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "トラブルが[あって]、到着が遅れました。",
            "translation": "There was a trouble, so the arrival was delayed.",
            "kana": "あって",
            "reading": "とらぶる が あって、 とうちゃく が おくれました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "縁が[あって]、彼と知り合いました。",
            "translation": "Through a twist of fate, I got to know him.",
            "kana": "あって",
            "reading": "えん が あって、 かれ と しりあいました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "魅力が[あって]、惹きつけられます。",
            "translation": "It has charm and attracts people.",
            "kana": "あって",
            "reading": "みりょく が あって、 ひきつけられます。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "余裕が[あって]、優しい人です。",
            "translation": "He is a kind person with peace of mind (room to spare).",
            "kana": "あって",
            "reading": "よゆう が あって、 やさしい ひと です。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Te-form",
            "text": "理由が[あって]、辞めることにしました。",
            "translation": "I have a reason, so I decided to quit.",
            "kana": "あって",
            "reading": "りゆう が あって、 やめる こと に しました。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "時間がないので、[急ぎます]。",
            "translation": "Since there is no time, I will hurry.",
            "kana": "ない",
            "reading": "じかん が ない ので、 いそぎます。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "お金が全く[ない]。",
            "translation": "I have no money at all.",
            "kana": "ない",
            "reading": "おかね が まったく ない。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "冷蔵庫に何が[ない]ですか？",
            "translation": "What is not in the refrigerator?",
            "kana": "ない",
            "reading": "れいぞうこ に なに が ない です か？"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "やる気が[ない]。",
            "translation": "I have no motivation.",
            "kana": "ない",
            "reading": "やるき が ない。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "何の罪も[ない]。",
            "translation": "There is no guilt at all.",
            "kana": "ない",
            "reading": "なん の つみ も ない。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "これ以外に道は[ない]。",
            "translation": "There is no other way but this.",
            "kana": "ない",
            "reading": "これ いがい に みち は ない。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "実力が[ない]わけではない。",
            "translation": "It's not that I don't have the ability.",
            "kana": "ない",
            "reading": "じつりょく が ない わけ で は ない。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰も[ない]ところに住みたい。",
            "translation": "I want to live where there is nobody.",
            "kana": "ない",
            "reading": "だれ も ない ところ に すみたい。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "一点の曇りも[ない]。",
            "translation": "There isn't a single speck of cloud (completely clear).",
            "kana": "ない",
            "reading": "いってん の くもり も ない。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Negative (Nai)",
            "text": "不思議でなら[ない]。",
            "translation": "I can't help but find it strange.",
            "kana": "ない",
            "reading": "ふしぎ で なら ない。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "昔、ここに公園が[あった]。",
            "translation": "There used to be a park here.",
            "kana": "あった",
            "reading": "むかし、 ここ に こうえん が あった。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "いい考えが[あった]ぞ！",
            "translation": "I had a great idea!",
            "kana": "あった",
            "reading": "いい かんがえ が あった ぞ！"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "そんなことが[あった]のか。",
            "translation": "So that kind of thing happened.",
            "kana": "あった",
            "reading": "そんな こと が あった の か。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "机の上に本が[あった]はずだ。",
            "translation": "There should have been a book on the desk.",
            "kana": "あった",
            "reading": "つくえ の うえ に ほん が あった はず だ。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "勇気が[あった]彼はヒーローだ。",
            "translation": "He, who had courage, is a hero.",
            "kana": "あった",
            "reading": "ゆうき が あった かれ は ひーろー です。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "事件が[あった]現場に行く。",
            "translation": "I'm going to the scene where the incident occurred.",
            "kana": "あった",
            "reading": "じけん が あった げんば に いく。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "魅力が[あった]作品だった。",
            "translation": "It was a work that had charm.",
            "kana": "あった",
            "reading": "みりょく が あった さくひん だった。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "さっきまでそこに[あった]のに。",
            "translation": "It was right there until just a moment ago.",
            "kana": "あった",
            "reading": "さっき まで そこ に あった のに。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "関係が[あった]と思われる。",
            "translation": "It is thought that there was a connection.",
            "kana": "あった",
            "reading": "かんけい が あった と おもわれる。"
        },
        {
            "verb": "ある (aru)",
            "tense": "Plain Past (Ta)",
            "text": "雪が[あった]山道を歩く。",
            "translation": "I walk on a mountain path where there was snow.",
            "kana": "あった",
            "reading": "ゆき が あった やまみち を あるく。"
        }, {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "駅まで[歩きます]。",
            "translation": "I walk to the station.",
            "kana": "あるきます",
            "reading": "えき まで あるきます。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "公園を[歩きます]か？",
            "translation": "Do you walk in the park?",
            "kana": "あるきます",
            "reading": "こうえん を あるきます か？"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "毎日一時間[歩きます]。",
            "translation": "I walk for one hour every day.",
            "kana": "あるきます",
            "reading": "まいにち いちじかん あるきます。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "砂浜を[歩きます]。",
            "translation": "I walk on the sandy beach.",
            "kana": "あるきます",
            "reading": "すなはま を あるきます。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "ゆっくり[歩きます]。",
            "translation": "I walk slowly.",
            "kana": "あるきます",
            "reading": "ゆっくり あるきます。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "山道を[歩きます]。",
            "translation": "I walk along the mountain path.",
            "kana": "あるきます",
            "reading": "やまみち を あるきます。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "犬と一緒に[歩きます]。",
            "translation": "I walk with my dog.",
            "kana": "あるきます",
            "reading": "いぬ と いっしょ に あるきます。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "背筋を伸ばして[歩きます]。",
            "translation": "I walk with my back straight.",
            "kana": "あるきます",
            "reading": "せすじ を のばして あるきます。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "夜道を一人で[歩きます]。",
            "translation": "I walk the night streets alone.",
            "kana": "あるきます",
            "reading": "よみち を ひとり で あるきます。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Present (Masu)",
            "text": "裸足で[歩きます]。",
            "translation": "I walk barefoot.",
            "kana": "あるきます",
            "reading": "はだし で あるきます。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日はたくさん[歩きました]。",
            "translation": "I walked a lot yesterday.",
            "kana": "あるきました",
            "reading": "きのう は たくさん あるきました。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "雨の中を[歩きました]。",
            "translation": "I walked in the rain.",
            "kana": "あるきました",
            "reading": "あめ の なか を あるきました。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "どのくらい[歩きました]か？",
            "translation": "How far did you walk?",
            "kana": "あるきました",
            "reading": "どのくらい あるきました か？"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "川沿いを[歩きました]。",
            "translation": "I walked along the river.",
            "kana": "あるきました",
            "reading": "かわぞい を あるきました。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "急いで[歩きました]。",
            "translation": "I walked in a hurry.",
            "kana": "あるきました",
            "reading": "いそいで あるきました。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "暗い道を[歩きました]。",
            "translation": "I walked along a dark road.",
            "kana": "あるきました",
            "reading": "くらい みち を あるきました。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "目的地まで[歩きました]。",
            "translation": "I walked to the destination.",
            "kana": "あるきました",
            "reading": "もくてきち まで あるきました。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "並んで[歩きました]。",
            "translation": "We walked side by side.",
            "kana": "あるきました",
            "reading": "ならんで あるきました。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "街中を[歩きました]。",
            "translation": "I walked through the city.",
            "kana": "あるきました",
            "reading": "まちじゅう を あるきました。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Polite Past (Mashita)",
            "text": "迷いながら[歩きました]。",
            "translation": "I walked while being lost.",
            "kana": "あるきました",
            "reading": "まよい ながら あるきました。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "[歩いて]帰りましょう。",
            "translation": "Let's walk home.",
            "kana": "あるいて",
            "reading": "あるいて かえりましょう。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "前を見て[歩いて]ください。",
            "translation": "Please walk while looking forward.",
            "kana": "あるいて",
            "reading": "まえ を みて あるいて ください。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "あちこちを[歩いて]回る。",
            "translation": "To walk around here and there.",
            "kana": "あるいて",
            "reading": "あちこち を あるいて まわる。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "疲れたので、[歩いて]いられない。",
            "translation": "I'm tired, so I can't keep walking.",
            "kana": "あるいて",
            "reading": "つかれた ので、 あるいて いられない。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "駅まで[歩いて]十分です。",
            "translation": "It takes ten minutes to walk to the station.",
            "kana": "あるいて",
            "reading": "えき まで あるいて じゅっぷん です。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "二人で[歩いて]いく。",
            "translation": "The two of us will walk on.",
            "kana": "あるいて",
            "reading": "ふたり で あるいて いく。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "足音を立てずに[歩いて]みた。",
            "translation": "I tried walking without making a sound.",
            "kana": "あるいて",
            "reading": "あしおと を たてずに あるいて みた。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "一歩ずつ[歩いて]進む。",
            "translation": "Move forward by walking step by step.",
            "kana": "あるいて",
            "reading": "いっぽ ずつ あるいて すすむ。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "近所を[歩いて]いたら、彼に会った。",
            "translation": "While walking in the neighborhood, I ran into him.",
            "kana": "あるいて",
            "reading": "きんじょ を あるいて いたら、 かれ に あった。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Te-form",
            "text": "胸を張って[歩いて]ほしい。",
            "translation": "I want you to walk with your head held high.",
            "kana": "あるいて",
            "reading": "むね を はって あるいて ほしい。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "今日は[歩かない]つもりです。",
            "translation": "I don't intend to walk today.",
            "kana": "あるかない",
            "reading": "きょう は あるかない つもり です。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "あまり[歩かない]でください。",
            "translation": "Please don't walk too much.",
            "kana": "あるかない",
            "reading": "あまり あるかない で ください。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "一歩も[歩かない]。",
            "translation": "I won't walk even a single step.",
            "kana": "あるかない",
            "reading": "いっぽ も あるかない。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は外を[歩かない]。",
            "translation": "He doesn't walk outside.",
            "kana": "あるかない",
            "reading": "かれ は そと を あるかない。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "足が痛くて[歩かない]ほうがいい。",
            "translation": "My leg hurts, so it's better not to walk.",
            "kana": "あるかない",
            "reading": "あし が いたくて あるかない ほう が いい。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "都会の人はよく[歩かない]？ (Note: Seeking confirmation)",
            "translation": "Don't city people walk a lot?",
            "kana": "あるかない",
            "reading": "とかい の ひと は よく あるかない？"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "階段を[歩かない]でエレベーターを使う。",
            "translation": "Use the elevator instead of walking the stairs.",
            "kana": "あるかない",
            "reading": "かいだん を あるかない で えれべーたー を つかう。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "近道を知っているので[歩かない]。",
            "translation": "I know a shortcut, so I won't walk (the long way).",
            "kana": "あるかない",
            "reading": "ちかみち を しっている ので あるかない。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "危ない所は[歩かない]。",
            "translation": "I don't walk in dangerous places.",
            "kana": "あるかない",
            "reading": "あぶない ところ は あるかない。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Negative (Nai)",
            "text": "ふらふらして[歩かない]ように気をつける。",
            "translation": "I'll be careful not to walk unsteadily.",
            "kana": "あるかない",
            "reading": "ふらふら して あるかない ように き を つける。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "昨日、海辺を[歩いた]。",
            "translation": "I walked along the beach yesterday.",
            "kana": "あるいた",
            "reading": "きのう、 うみべ を あるいた。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "昔はここをよく[歩いた]ものだ。",
            "translation": "I used to walk here often in the past.",
            "kana": "あるいた",
            "reading": "むかし は ここ を よく あるいた もの だ。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "急いで駅まで[歩いた]。",
            "translation": "I walked quickly to the station.",
            "kana": "あるいた",
            "reading": "いそいで えき まで あるいた。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "彼は一人で[歩いた]。",
            "translation": "He walked alone.",
            "kana": "あるいた",
            "reading": "かれ は ひとり で あるいた。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "暗い夜道を[歩いた]ことがある。",
            "translation": "I have walked a dark road at night before.",
            "kana": "あるいた",
            "reading": "くらい よみち を あるいた こと が ある。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "雨の中、傘をさして[歩いた]。",
            "translation": "I walked in the rain with an umbrella.",
            "kana": "あるいた",
            "reading": "あめ の なか、 かさ を さして あるいた。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "二人で並んで[歩いた]。",
            "translation": "The two of us walked side by side.",
            "kana": "あるいた",
            "reading": "ふたり で ならんで あるいた。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "今日は1万歩[歩いた]。",
            "translation": "I walked 10,000 steps today.",
            "kana": "あるいた",
            "reading": "きょう は いちまんぽ あるいた。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "近所を[歩いた]だけで疲れた。",
            "translation": "I got tired just from walking in the neighborhood.",
            "kana": "あるいた",
            "reading": "きんじょ を あるいた だけ で つかれた。"
        },
        {
            "verb": "歩く (aruku)",
            "tense": "Plain Past (Ta)",
            "text": "どこまでも[歩いた]。",
            "translation": "I walked on and on (to everywhere).",
            "kana": "あるいた",
            "reading": "どこ まで も あるいた。"
        }, {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "時間がなくて[焦ります]。",
            "translation": "I feel rushed because there is no time.",
            "kana": "あせります",
            "reading": "じかん が なくて あせります。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "テスト中に問題が解けないと[焦ります]か？",
            "translation": "Do you panic if you can't solve a problem during a test?",
            "kana": "あせります",
            "reading": "てすと ちゅう に もんだい が とけない と あせります か？"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "人前で話すと、どうしても[焦ります]。",
            "translation": "When I speak in public, I inevitably get flustered.",
            "kana": "あせります",
            "reading": "ひとまえ で はなす と、 どうしても あせります。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "締め切りが近づくと[焦ります]。",
            "translation": "I get anxious as the deadline approaches.",
            "kana": "あせります",
            "reading": "しめきり が ちかづく と あせります。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "間違いを指摘されると少し[焦ります]。",
            "translation": "I get a bit flustered when my mistakes are pointed out.",
            "kana": "あせります",
            "reading": "まちがい を してき される と すこし あせります。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "返信が遅いと、嫌われたかと[焦ります]。",
            "translation": "When a reply is late, I panic thinking I might be disliked.",
            "kana": "あせります",
            "reading": "へんしん が おそい と、 きらわれた か と あせります。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "道に迷うと、つい[焦ります]。",
            "translation": "When I get lost, I unintentionally start to panic.",
            "kana": "あせります",
            "reading": "みち に まよう と、 つい あせります。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "周りが成功しているのを見ると[焦ります]。",
            "translation": "I feel impatient when I see others succeeding around me.",
            "kana": "あせります",
            "reading": "まわり が せいこう して いる の を みる と あせります。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "忘れ物をしたことに気づいて[焦ります]。",
            "translation": "I panic upon realizing I forgot something.",
            "kana": "あせります",
            "reading": "わすれもの を した こと に きづいて あせります。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Present (Masu)",
            "text": "予定が狂うと[焦ります]ね。",
            "translation": "It's flustering when plans go wrong, isn't it?",
            "kana": "あせります",
            "reading": "よてい が くるう と あせります ね。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "電車に乗り遅れそうで[焦りました]。",
            "translation": "I panicked because it looked like I would miss the train.",
            "kana": "あせりました",
            "reading": "でんしゃ に のりおくれそうで あせりました。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "財布を忘れた時は本当に[焦りました]。",
            "translation": "I really panicked when I forgot my wallet.",
            "kana": "あせりました",
            "reading": "さいふ を わすれた とき は ほんとう に あせりました。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "急な質問に[焦りました]か？",
            "translation": "Were you flustered by the sudden question?",
            "kana": "あせりました",
            "reading": "きゅう な しつもん に あせりました か？"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "パソコンが動かなくなって[焦りました]。",
            "translation": "I panicked when my computer stopped working.",
            "kana": "あせりました",
            "reading": "ぱそこん が うごかなく なって あせりました。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "大事な書類を失くして[焦りました]。",
            "translation": "I was in a panic after losing an important document.",
            "kana": "あせりました",
            "reading": "だいじ な しょるい を なくして あせりました。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "名前を度忘れして[焦りました]。",
            "translation": "I got flustered because their name escaped me.",
            "kana": "あせりました",
            "reading": "なまえ を どわすれ して あせりました。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "料理を焦がして少し[焦りました]。",
            "translation": "I panicked a little when I burnt the food.",
            "kana": "あせりました",
            "reading": "りょうり を こがして すこし あせりました。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "遅刻しそうだったので、とても[焦りました]。",
            "translation": "I was very rushed because I was about to be late.",
            "kana": "あせりました",
            "reading": "ちこく しそう だったので、 とても あせりました。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "鍵が見つからなくて[焦りました]。",
            "translation": "I was frantic when I couldn't find my keys.",
            "kana": "あせりました",
            "reading": "かぎ が みつからなくて あせりました。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Polite Past (Mashita)",
            "text": "予想外の出来事に[焦りました]。",
            "translation": "I was flustered by the unexpected event.",
            "kana": "あせりました",
            "reading": "よそうがい の できごと に あせりました。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "[焦って]ミスをしてしまった。",
            "translation": "I panicked and ended up making a mistake.",
            "kana": "あせって",
            "reading": "あせって みす を して しまった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "そんなに[焦って]どこへ行くの？",
            "translation": "Where are you going in such a hurry?",
            "kana": "あせって",
            "reading": "そんなに あせって どこ へ いく の？"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "落ち着いて、[焦って]はいけません。",
            "translation": "Calm down, you must not panic.",
            "kana": "あせって",
            "reading": "おちついて、 あせって は いけません。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "締め切りに[焦って]、徹夜した。",
            "translation": "Rushed by the deadline, I stayed up all night.",
            "kana": "あせって",
            "reading": "しめきり に あせって、 てつや した。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "彼は[焦って]、言葉に詰まった。",
            "translation": "He got flustered and was at a loss for words.",
            "kana": "あせって",
            "reading": "かれ は あせって、 ことば に つまった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "転びそうになって、[焦って]手を伸ばした。",
            "translation": "I almost fell and frantically reached out my hand.",
            "kana": "あせって",
            "reading": "ころびそう に なって、 あせって て を のばした。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "そんなに[焦って]食べなくてもいいですよ。",
            "translation": "You don't have to eat in such a rush.",
            "kana": "あせって",
            "reading": "そんなに あせって たべなくても いい です よ。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "返事を[焦って]、間違ったことを言った。",
            "translation": "Rushing for an answer, I said the wrong thing.",
            "kana": "あせって",
            "reading": "へんじ を あせって、 まちがった こと を いった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "[焦って]ボタンを掛け違えた。",
            "translation": "In my haste, I buttoned my shirt wrong.",
            "kana": "あせって",
            "reading": "あせって ぼたん を かけちがえた。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Te-form",
            "text": "階段を[焦って]降りるのは危ない。",
            "translation": "It is dangerous to rush down the stairs.",
            "kana": "あせって",
            "reading": "かいだん を あせって おりる の は あぶない。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "そんなに[焦らない]でください。",
            "translation": "Please don't be in such a hurry.",
            "kana": "あせらない",
            "reading": "そんなに あせらない で ください。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は滅多に[焦らない]。",
            "translation": "He rarely gets flustered.",
            "kana": "あせらない",
            "reading": "かれ は めったに あせらない。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "結果を[焦らない]ほうがいいですよ。",
            "translation": "It is better not to be impatient for results.",
            "kana": "あせらない",
            "reading": "けっか を あせらない ほう が いい です よ。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "時間がたっぷりあるから[焦らない]。",
            "translation": "There is plenty of time, so I won't rush.",
            "kana": "あせらない",
            "reading": "じかん が たっぷり ある から あせらない。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "トラブルが起きても[焦らない]ことが大事だ。",
            "translation": "It's important not to panic even if trouble occurs.",
            "kana": "あせらない",
            "reading": "とらぶる が おきても あせらない こと が だいじ だ。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだチャンスはあるから、[焦らない]で。",
            "translation": "There's still a chance, so don't panic.",
            "kana": "あせらない",
            "reading": "まだ ちゃんす は ある から、 あせらない で。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "試験に落ちても、[焦らない]で次を目指そう。",
            "translation": "Even if you fail the exam, don't lose heart (panic) and aim for the next one.",
            "kana": "あせらない",
            "reading": "しけん に おちても、 あせらない で つぎ を めざそう。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼女はどんな時も[焦らない]冷静な人だ。",
            "translation": "She is a cool-headed person who never gets flustered no matter what.",
            "kana": "あせらない",
            "reading": "かのじょ は どんな とき も あせらない れいせい な ひと だ。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "焦っても[焦らない]ふりをした。",
            "translation": "Even though I was panicking, I pretended not to be.",
            "kana": "あせらない",
            "reading": "あせっても あせらない ふり を した。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Negative (Nai)",
            "text": "ゆっくり進めば[焦らない]で済む。",
            "translation": "If you go slowly, you can manage without rushing.",
            "kana": "あせらない",
            "reading": "ゆっくり すすめば あせらない で すむ。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "さっきは本当に[焦った]よ。",
            "translation": "I was really in a panic a moment ago.",
            "kana": "あせった",
            "reading": "さっき は ほんとう に あせった よ。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "急に名前を呼ばれて[焦った]。",
            "translation": "I was flustered when my name was called suddenly.",
            "kana": "あせった",
            "reading": "きゅう に なまえ を よばれて あせった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "失敗しそうになって[焦った]か？",
            "translation": "Did you panic when it looked like you were going to fail?",
            "kana": "あせった",
            "reading": "しっぱい しそう に なって あせった か？"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "忘れ物を思い出した瞬間、[焦った]。",
            "translation": "The moment I remembered what I'd forgotten, I panicked.",
            "kana": "あせった",
            "reading": "わすれもの を おもいだした しゅんかん、 あせった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "テストの残り時間が少なくて[焦った]。",
            "translation": "I was rushed because there was little time left on the test.",
            "kana": "あせった",
            "reading": "てすと の のこり じかん が すくなくて あせった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は顔には出さなかったが、心中[焦った]。",
            "translation": "He didn't show it on his face, but he was panicking inside.",
            "kana": "あせった",
            "reading": "かれ は かお に は ださなかった が、 しんちゅう あせった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "暗い道で物音がして[焦った]。",
            "translation": "I panicked when I heard a sound on the dark road.",
            "kana": "あせった",
            "reading": "くらい みち で ものおと が して あせった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "予定より早く客が来て[焦った]。",
            "translation": "I was flustered because the guest arrived earlier than planned.",
            "kana": "あせった",
            "reading": "よてい より はやく きゃく が きて あせった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "スマホの充電が切れて[焦った]。",
            "translation": "I panicked when my smartphone battery died.",
            "kana": "あせった",
            "reading": "すまほ の じゅうでん が きれて あせった。"
        },
        {
            "verb": "焦る (aseru)",
            "tense": "Plain Past (Ta)",
            "text": "答えが分からなくてかなり[焦った]。",
            "translation": "I didn't know the answer and was quite flustered.",
            "kana": "あせった",
            "reading": "こたえ が わからなくて かなり あせった。"
        }, {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "休日は友達と[遊びます]。",
            "translation": "I play with my friends on my days off.",
            "kana": "あそびます",
            "reading": "きゅうじつ は ともだち と あそびます。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "公園で子供たちが[遊びます]か？",
            "translation": "Do children play in the park?",
            "kana": "あそびます",
            "reading": "こうえん で こどもたち が あそびます か？"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "たまには外で[遊びます]。",
            "translation": "Sometimes I play outside.",
            "kana": "あそびます",
            "reading": "たまに は そと で あそびます。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "夜遅くまで[遊びます]。",
            "translation": "I play until late at night.",
            "kana": "あそびます",
            "reading": "よる おそく まで あそびます。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "テレビゲームで[遊びます]。",
            "translation": "I play with video games.",
            "kana": "あそびます",
            "reading": "てれびげーむ で あそびます。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "海に行って[遊びます]。",
            "translation": "I will go to the sea and play.",
            "kana": "あそびます",
            "reading": "うみ に いって あそびます。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "おもちゃで[遊びます]。",
            "translation": "I play with toys.",
            "kana": "あそびます",
            "reading": "おもちゃ で あそびます。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "みんなで楽しく[遊びます]。",
            "translation": "We all play together happily.",
            "kana": "あそびます",
            "reading": "みんな で たのしく あそびます。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "仕事の後は[遊びます]。",
            "translation": "I play after work.",
            "kana": "あそびます",
            "reading": "しごと の あと は あそびます。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Present (Masu)",
            "text": "室内で[遊びます]。",
            "translation": "I play indoors.",
            "kana": "あそびます",
            "reading": "しつない で あそびます。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日は一日中[遊びました]。",
            "translation": "Yesterday I played all day long.",
            "kana": "あそびました",
            "reading": "きのう は いちにちじゅう あそびました。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "どこで[遊びました]か？",
            "translation": "Where did you play?",
            "kana": "あそびました",
            "reading": "どこ で あそびました か？"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "昔はよくここで[遊びました]。",
            "translation": "I often played here in the past.",
            "kana": "あそびました",
            "reading": "むかし は よく ここ で あそびました。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "トランプをして[遊びました]。",
            "translation": "We played cards.",
            "kana": "あそびました",
            "reading": "とらんぷ を して あそびました。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "泥んこになって[遊びました]。",
            "translation": "We played and got covered in mud.",
            "kana": "あそびました",
            "reading": "どろんこ に なって あそびました。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "遊園地で[遊びました]。",
            "translation": "We played at the amusement park.",
            "kana": "あそびました",
            "reading": "ゆうえんち で あそびました。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "夜通し[遊びました]。",
            "translation": "We played all through the night.",
            "kana": "あそびました",
            "reading": "よどおし あそびました。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "川で[遊びました]。",
            "translation": "We played in the river.",
            "kana": "あそびました",
            "reading": "かわ で あそびました。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "時間を忘れて[遊びました]。",
            "translation": "I played and forgot about the time.",
            "kana": "あそびました",
            "reading": "じかん を わすれて あそびました。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Polite Past (Mashita)",
            "text": "従兄弟と[遊びました]。",
            "translation": "I played with my cousins.",
            "kana": "あそびました",
            "reading": "いとこ と あそびました。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "外で[遊んで]きなさい。",
            "translation": "Go play outside.",
            "kana": "あそんで",
            "reading": "そと で あそんで きなさい。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "遊んでばかり[いて]はいけません。",
            "translation": "You must not do nothing but play.",
            "kana": "あそんで",
            "reading": "あそんで ばかり いて は いけません。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "みんなで[遊んで]楽しかった。",
            "translation": "It was fun playing with everyone.",
            "kana": "あそんで",
            "reading": "みんな で あそんで たのしかった。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "犬と[遊んで]リラックスする。",
            "translation": "I relax by playing with my dog.",
            "kana": "あそんで",
            "reading": "いぬ と あそんで りらっくす する。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "一生懸命[遊んで]、よく寝る。",
            "translation": "Play hard and sleep well.",
            "kana": "あそんで",
            "reading": "いっしょうけんめい あそんで、 よく ねる。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "都会で[遊んで]回る。",
            "translation": "To go around and play in the city.",
            "kana": "あそんで",
            "reading": "とかい で あそんで まわる。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "彼は[遊んで]暮らしている。",
            "translation": "He lives a life of leisure (playing).",
            "kana": "あそんで",
            "reading": "かれ は あそんで くらして いる。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "ゲームをして[遊んで]いた。",
            "translation": "I was playing games.",
            "kana": "あそんで",
            "reading": "げーむ を して あそんで いた。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "おもちゃを[遊んで]片付ける。",
            "translation": "Play with toys and then tidy up.",
            "kana": "あそんで",
            "reading": "おもちゃ を あそんで かたづける。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Te-form",
            "text": "公園で[遊んで]から帰る。",
            "translation": "I will go home after playing in the park.",
            "kana": "あそんで",
            "reading": "こうえん で あそんで から かえる。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "今日は[遊ばない]。",
            "translation": "I won't play today.",
            "kana": "あそばない",
            "reading": "きょう は あそばない。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "あまり[遊ばない]で勉強しなさい。",
            "translation": "Study without playing too much.",
            "kana": "あそばない",
            "reading": "あまり あそばない で べんきょう しなさい。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "外では[遊ばない]のですか？",
            "translation": "Do you not play outside?",
            "kana": "あそばない",
            "reading": "そと で は あそばない の です か？"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は真面目で[遊ばない]。",
            "translation": "He is serious and doesn't play around.",
            "kana": "あそばない",
            "reading": "かれ は まじめ で あそばない。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "一人では[遊ばない]タイプだ。",
            "translation": "I am the type who doesn't play alone.",
            "kana": "あそばない",
            "reading": "ひとり で は あそばない たいぷ だ。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "平日は忙しくて[遊ばない]。",
            "translation": "I'm busy on weekdays, so I don't play.",
            "kana": "あそばない",
            "reading": "へいじつ は いそがしくて あそばない。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "危険な所では[遊ばない]。",
            "translation": "I don't play in dangerous places.",
            "kana": "あそばない",
            "reading": "きけん な ところ で は あそばない。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "お金がないから[遊ばない]。",
            "translation": "I won't play because I have no money.",
            "kana": "あそばない",
            "reading": "おかね が ない から あそばない。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "夜は[遊ばない]ようにしている。",
            "translation": "I make it a point not to play at night.",
            "kana": "あそばない",
            "reading": "よる は あそばない ように して いる。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Negative (Nai)",
            "text": "うるさく[遊ばない]でください。",
            "translation": "Please don't play noisily.",
            "kana": "あそばない",
            "reading": "うるさく あそばない で ください。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "昨日、友達と[遊んだ]。",
            "translation": "I played with friends yesterday.",
            "kana": "あそんだ",
            "reading": "きのう、 ともだち と あそんだ。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "子供の頃、よく[遊んだ]。",
            "translation": "I played a lot when I was a child.",
            "kana": "あそんだ",
            "reading": "こども の ころ、 よく あそんだ。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "外で[遊んだ]か？",
            "translation": "Did you play outside?",
            "kana": "あそんだ",
            "reading": "そと で あそんだ か？"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "一日中ゲームで[遊んだ]。",
            "translation": "I played games all day long.",
            "kana": "あそんだ",
            "reading": "いちにちじゅう げーむ で あそんだ。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "朝まで[遊んだ]こともある。",
            "translation": "There were times when I played until morning.",
            "kana": "あそんだ",
            "reading": "あさ まで あそんだ こと も ある。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "公園でかけっこをして[遊んだ]。",
            "translation": "We played by racing in the park.",
            "kana": "あそんだ",
            "reading": "こうえん で かけっこ を して あそんだ。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "みんなで賑やかに[遊んだ]。",
            "translation": "We all played boisterously.",
            "kana": "あそんだ",
            "reading": "みんな で にぎやか に あそんだ。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "疲れるまで[遊んだ]。",
            "translation": "I played until I was tired.",
            "kana": "あそんだ",
            "reading": "つかれる まで あそんだ。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "知らない子と[遊んだ]。",
            "translation": "I played with a child I didn't know.",
            "kana": "あそんだ",
            "reading": "しらない こ と あそんだ。"
        },
        {
            "verb": "遊ぶ (asobu)",
            "tense": "Plain Past (Ta)",
            "text": "夢中で[遊んだ]。",
            "translation": "I played intently.",
            "kana": "あそんだ",
            "reading": "むちゅう で あそんだ。"
        }, {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "子供に夢を[与えます]。",
            "translation": "I give dreams to children.",
            "kana": "あたえます",
            "reading": "こども に ゆめ を あたえます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "植物に水と光を[与えます]。",
            "translation": "I give water and light to the plants.",
            "kana": "あたえます",
            "reading": "しょくぶつ に みず と ひかり を あたえます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "この薬は副作用を[与えます]か？",
            "translation": "Does this medicine cause (give) side effects?",
            "kana": "あたえます",
            "reading": "この くすり は ふくさよう を あたえます か？"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "彼にチャンスを[与えます]。",
            "translation": "I will give him a chance.",
            "kana": "あたえます",
            "reading": "かれ に ちゃんす を あたえます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "社会に良い影響を[与えます]。",
            "translation": "It gives a good influence to society.",
            "kana": "あたえます",
            "reading": "しゃかい に よい えいきょう を あたえます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "犬に餌を[与えます]。",
            "translation": "I give food to the dog.",
            "kana": "あたえます",
            "reading": "いぬ に えさ を あたえます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "学生に課題を[与えます]。",
            "translation": "I give assignments to the students.",
            "kana": "あたえます",
            "reading": "がくせい に かだい を あたえます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "勇気を[与えます]。",
            "translation": "It gives courage.",
            "kana": "あたえます",
            "reading": "ゆうき を あたえます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "損害を[与えます]。",
            "translation": "It causes (gives) damage.",
            "kana": "あたえます",
            "reading": "そんがい を あたえます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Present (Masu)",
            "text": "印象を[与えます]。",
            "translation": "It gives an impression.",
            "kana": "あたえます",
            "reading": "いんしょう を あたえます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼に大きな衝撃を[与えました]。",
            "translation": "It gave him a great shock.",
            "kana": "あたえました",
            "reading": "かれ に おおきな しょうげき を ああたえました。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "賞を[与えました]。",
            "translation": "I gave (awarded) a prize.",
            "kana": "あたえました",
            "reading": "しょう を あたえました。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "ヒントを[与えました]か？",
            "translation": "Did you give a hint?",
            "kana": "あたえました",
            "reading": "ひんと を あたえました か？"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "安心感を[与えました]。",
            "translation": "It gave a sense of security.",
            "kana": "あたえました",
            "reading": "あんしんかん を あたえました。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "罰を[与えました]。",
            "translation": "I gave a punishment.",
            "kana": "あたえました",
            "reading": "ばつ を あたえました。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "不快感を[与えました]。",
            "translation": "It gave a feeling of discomfort.",
            "kana": "あたえました",
            "reading": "ふかいかん を あたえました。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "感動を[与えました]。",
            "translation": "It gave (inspired) deep emotion.",
            "kana": "あたえました",
            "reading": "かんどう を あたえました。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "許可を[与えました]。",
            "translation": "I gave permission.",
            "kana": "あたえました",
            "reading": "きょか を あたえました。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "損害を[与えました]。",
            "translation": "It caused damage.",
            "kana": "あたえました",
            "reading": "そんがい を あたえました。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Polite Past (Mashita)",
            "text": "満足を[与えました]。",
            "translation": "It gave satisfaction.",
            "kana": "あたえました",
            "reading": "まんぞく を あたえました。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Te-form",
            "text": "影響を[与えて]いる。",
            "translation": "It is giving (exerting) an influence.",
            "kana": "あたえて",
            "reading": "えいきょう を あたえて いる。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Te-form",
            "text": "勇気を[与えて]ください。",
            "translation": "Please give me courage.",
            "kana": "あたえて",
            "reading": "ゆうき を あたえて ください。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Te-form",
            "text": "苦痛を[あたえて]しまった。",
            "translation": "I ended up giving (causing) pain.",
            "kana": "あたえて",
            "reading": "くつう を あたえて しまった。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Te-form",
            "text": "餌を[与えて]育てる。",
            "translation": "Raise it by giving food.",
            "kana": "あたえて",
            "reading": "えさ を あたえて そだてる。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Te-form",
            "text": "自由を[与えて]もらう。",
            "translation": "To be given freedom.",
            "kana": "あたえて",
            "reading": "じゆう を あたえて もらう。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Te-form",
            "text": "機会を[与えて]感謝する。",
            "translation": "To be grateful for being given an opportunity.",
            "kana": "あたえて",
            "reading": "きかい を あたえて かんしゃ する。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Te-form",
            "text": "印象を[与えて]惹きつける。",
            "translation": "Attract by giving an impression.",
            "kana": "あたえて",
            "reading": "いんしょう を あたえて ひきつける。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Te-form",
            "text": "損害を[与えて]はいけない。",
            "translation": "You must not cause damage.",
            "kana": "あたえて",
            "reading": "そんがい を あたえて は いけない。"
        },
        {
            "verb": "ataeru (与える)",
            "tense": "Te-form",
            "text": "ヒントを[与えて]解かせる。",
            "translation": "Make them solve it by giving a hint.",
            "kana": "あたえて",
            "reading": "ひんと を あたえて とかせる。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Te-form",
            "text": "希望を[与えて]励ます。",
            "translation": "Encourage by giving hope.",
            "kana": "あたえて",
            "reading": "きぼう を あたえて はげます。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "影響を[与えない]。",
            "translation": "It doesn't give an influence.",
            "kana": "あたえない",
            "reading": "えいきょう を あたえない。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "餌を[与えない]でください。",
            "translation": "Please do not give food.",
            "kana": "あたえない",
            "reading": "えさ を あたえない で ください。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "何も[与えない]のですか？",
            "translation": "Are you giving nothing?",
            "kana": "あたえない",
            "reading": "なにも あたえない の です か？"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "損害を[与えない]ように気をつける。",
            "translation": "Be careful not to cause damage.",
            "kana": "あたえない",
            "reading": "そんがい を あたえない ように き を つける。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "不快感を[与えない]服装をする。",
            "translation": "Wear clothes that don't give a feeling of discomfort.",
            "kana": "あたえない",
            "reading": "ふかいかん を あたえない ふくそう を する。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "自由を[与えない]方針だ。",
            "translation": "It is the policy not to give freedom.",
            "kana": "あたえない",
            "reading": "じゆう を あたえない ほうしん だ。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "ヒントを[与えない]で解く。",
            "translation": "Solve it without being given hints.",
            "kana": "あたえない",
            "reading": "ひんと を あたえない で とく。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は誰にも迷惑を[与えない]。",
            "translation": "He doesn't give (cause) trouble to anyone.",
            "kana": "あたえない",
            "reading": "かれ は だれ に も めいわく を あたえない。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "刺激を[与えない]ほうがいい。",
            "translation": "It's better not to give stimulation.",
            "kana": "あたえない",
            "reading": "しげき を あたえない ほう が いい。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Negative (Nai)",
            "text": "希望を[与えない]ようなことは言わない。",
            "translation": "I don't say things that don't give hope.",
            "kana": "あたえない",
            "reading": "きぼう を あたえない ような こと は いわない。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "彼にチャンスを[与えた]。",
            "translation": "I gave him a chance.",
            "kana": "あたえた",
            "reading": "かれ に ちゃんす を あたえた。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "感動を[与えた]作品だった。",
            "translation": "It was a work that gave (inspired) deep emotion.",
            "kana": "あたえた",
            "reading": "かんどう を あたえた さくひん だった。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "ヒントを[与えた]か？",
            "translation": "Did you give a hint?",
            "kana": "あたえた",
            "reading": "ひんと を あたえた か？"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "社会に大きな影響を[与えた]。",
            "translation": "It gave a big influence to society.",
            "kana": "あたえた",
            "reading": "しゃかい に おおきな えいきょう を あたえた。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "犬に餌を[与えた]。",
            "translation": "I gave food to the dog.",
            "kana": "あたえた",
            "reading": "いぬ に えさ を あたえた。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "安心感を[与えた]。",
            "translation": "It gave a sense of security.",
            "kana": "あたえた",
            "reading": "あんしんかん を あたえた。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "損害を[与えた]責任をとる。",
            "translation": "Take responsibility for the damage caused (given).",
            "kana": "あたえた",
            "reading": "そんがい を あたえた せきにん を とる。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "賞を[与えた]。",
            "translation": "I gave (awarded) a prize.",
            "kana": "あたえた",
            "reading": "しょう を あたえた。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "不快感を[与えた]なら謝る。",
            "translation": "If I gave (caused) discomfort, I apologize.",
            "kana": "あたえた",
            "reading": "ふかいかん を あたえた なら あやまる。"
        },
        {
            "verb": "与える (ataeru)",
            "tense": "Plain Past (Ta)",
            "text": "勇気を[与えた]言葉だった。",
            "translation": "They were words that gave courage.",
            "kana": "あたえた",
            "reading": "ゆうき を あたえた ことば だった。"
        }, {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "宝くじが[当たります]。",
            "translation": "I will win the lottery.",
            "kana": "あたります",
            "reading": "たからくじ が あたります。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "この予報はよく[当たります]か？",
            "translation": "Does this forecast often come true (hit the mark)?",
            "kana": "あたります",
            "reading": "この よほう は よく あたります か？"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "日光が[当たります]。",
            "translation": "The sunlight shines on (hits) it.",
            "kana": "あたります",
            "reading": "にっこう が あたります。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "ボールが頭に[当たります]。",
            "translation": "The ball hits my head.",
            "kana": "あたります",
            "reading": "ぼーる が あたま に あたります。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "私の予想が[当たります]。",
            "translation": "My prediction will come true.",
            "kana": "あたります",
            "reading": "わたし の よそう が あたります。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "彼は誰にでも八つ[当たります]。",
            "translation": "He takes out his anger on everyone.",
            "kana": "あたります",
            "reading": "かれ は だれ に でも やつ あたります。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "この仕事は私が[当たります]。",
            "translation": "I will take charge of (address) this task.",
            "kana": "あたります",
            "reading": "この しごと は わたし が あたります。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "賞品が[当たります]。",
            "translation": "I will win a prize.",
            "kana": "あたります",
            "reading": "しょうひん が あたります。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "壁に[当たります]。",
            "translation": "It hits the wall.",
            "kana": "あたります",
            "reading": "かべ に あたります。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Present (Masu)",
            "text": "毒に[当たります]。",
            "translation": "To be poisoned (by food).",
            "kana": "あたります",
            "reading": "どく に あたります。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "矢が的に[当たりました]。",
            "translation": "The arrow hit the target.",
            "kana": "あたりました",
            "reading": "や が まと に あたりました。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "推測が[当たりました]。",
            "translation": "The guess was correct.",
            "kana": "あたりました",
            "reading": "すいそく が あたりました。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "抽選で何が[当たりました]か？",
            "translation": "What did you win in the lottery?",
            "kana": "あたりました",
            "reading": "ちゅうせん で なに が あたりました か？"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "光が反射して目に[当たりました]。",
            "translation": "The light reflected and hit my eyes.",
            "kana": "あたりました",
            "reading": "ひかり が はんしゃ して め に あたりました。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "牡蠣に[当たりました]。",
            "translation": "I got food poisoning from oysters.",
            "kana": "あたりました",
            "reading": "かき に あたりました。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "ちょうどその日は日曜日に[当たりました]。",
            "translation": "That day happened to fall on a Sunday.",
            "kana": "あたりました",
            "reading": "ちょうど その ひ は にちようび に あたりました。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "全力でぶつかって[当たりました]。",
            "translation": "I collided with it at full force.",
            "kana": "あたりました",
            "reading": "ぜんりょく で ぶつかって あたりました。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "特賞が[当たりました]。",
            "translation": "I won the grand prize.",
            "kana": "あたりました",
            "reading": "とくしょう が あたりました。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "風が顔に[当たりました]。",
            "translation": "The wind hit my face.",
            "kana": "あたりました",
            "reading": "かぜ が かお に あたりました。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼は私に八つ[当たりました]。",
            "translation": "He took his frustration out on me.",
            "kana": "あたりました",
            "reading": "かれ は わたし に やつ あたりました。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "火に[当たって]暖まる。",
            "translation": "Warm oneself by the fire.",
            "kana": "あたって",
            "reading": "ひ に あたって あたたまる。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "壁に[当たって]跳ね返る。",
            "translation": "Hit the wall and bounce back.",
            "kana": "あたって",
            "reading": "かべ に あたって はねかえる。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "調査に[当たって]いる。",
            "translation": "Currently engaged in an investigation.",
            "kana": "あたって",
            "reading": "ちょうさ に あたって いる。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "日光を[当たって]はいけない。",
            "translation": "You must not be exposed to (hit by) sunlight.",
            "kana": "あたって",
            "reading": "にっこう を あたって は いけない。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "予想が[当たって]嬉しい。",
            "translation": "I'm happy because my prediction was right.",
            "kana": "あたって",
            "reading": "よそう が あたって うれしい。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "準備に[当たって]細心の注意を払う。",
            "translation": "Pay close attention when addressing preparations.",
            "kana": "あたって",
            "reading": "じゅんび に あたって さいしん の ちゅうい を はらう。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "宝くじが[当たって]家を建てた。",
            "translation": "I won the lottery and built a house.",
            "kana": "あたって",
            "reading": "たからくじ が あたって いえ を たてた。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "石に[当たって]転んだ。",
            "translation": "Hit a rock and fell down.",
            "kana": "あたって",
            "reading": "いし に あたって ころんだ。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "冷たい風に[当たって]風邪を引いた。",
            "translation": "I caught a cold from being exposed to the cold wind.",
            "kana": "あたって",
            "reading": "つめたい かぜ に あたって かぜ を ひいた。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Te-form",
            "text": "何かに[当たって]音がした。",
            "translation": "It hit something and made a sound.",
            "kana": "あたって",
            "reading": "なにか に あたって おと が した。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "今日は[当たらない]予感がする。",
            "translation": "I have a feeling I won't win (hit) today.",
            "kana": "あたらない",
            "reading": "きょう は あたらない よかん が する。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "あまり日光に[当たらない]でください。",
            "translation": "Please don't stay in the sun (be hit by sunlight) too much.",
            "kana": "あたらない",
            "reading": "あまり にっこう に あたらない で ください。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "この番号は[当たらない]のですか？",
            "translation": "Does this number not win?",
            "kana": "あたらない",
            "reading": "この ばんごう は あたらない の です か？"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "非難には[当たらない]。",
            "translation": "It does not deserve (is not hit by) criticism.",
            "kana": "あたらない",
            "reading": "ひなん に は あたらない。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "全く[当たらない]占いだ。",
            "translation": "This fortune-telling doesn't hit the mark at all.",
            "kana": "あたらない",
            "reading": "まったく あたらない うらない だ。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "心配するに[当たらない]。",
            "translation": "There is no need (it doesn't warrant) to worry.",
            "kana": "あたらない",
            "reading": "しんぱい する に あたらない。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は誰にも八つ[当たらない]。",
            "translation": "He doesn't take his anger out on anyone.",
            "kana": "あたらない",
            "reading": "かれ は だれ に も やつ あたらない。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "ボールが[当たらない]ように避ける。",
            "translation": "Avoid the ball so it doesn't hit you.",
            "kana": "あたらない",
            "reading": "ぼーる が あたらない ように よける。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "新鮮なので、[当たらない]でしょう。",
            "translation": "It's fresh, so you probably won't get (poisoned).",
            "kana": "あたらない",
            "reading": "しんせん なので、 あたらない でしょう。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Negative (Nai)",
            "text": "そんなに[当たらない]ものだ。",
            "translation": "Winning isn't that common (it's how it is).",
            "kana": "あたらない",
            "reading": "そんなに あたらない もの だ。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "予想がピタリと[当たった]。",
            "translation": "The prediction was exactly right.",
            "kana": "あたった",
            "reading": "よそう が ぴたり と あたった。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "ボールが窓に[当たった]。",
            "translation": "The ball hit the window.",
            "kana": "あたった",
            "reading": "ぼーる が まど に あたった。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "くじが[当たった]か？",
            "translation": "Did you win the lottery?",
            "kana": "あたった",
            "reading": "くじ が あたった か？"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "強い風が[当たった]。",
            "translation": "A strong wind hit.",
            "kana": "あたった",
            "reading": "つよい かぜ が あたった。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "日光が[当たった]場所が色あせた。",
            "translation": "The spot where the sun hit faded.",
            "kana": "あたった",
            "reading": "にっこう が あたった ばしょ が いろあせた。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "賞品が三つも[当たった]。",
            "translation": "I won as many as three prizes.",
            "kana": "あたった",
            "reading": "しょうひん が みっつ も あたった。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "昨日の雨は予報通り[当たった]。",
            "translation": "Yesterday's rain hit (occurred) just as forecast.",
            "kana": "あたった",
            "reading": "きのう の あめ は よほう どおり あたった。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "柱に頭を[当たった]。",
            "translation": "I hit my head on a pillar.",
            "kana": "あたった",
            "reading": "はしら に あたま を あたった。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "彼はイライラして周りに[当たった]。",
            "translation": "He was frustrated and took it out on those around him.",
            "kana": "あたった",
            "reading": "かれ は いらいら して まわり に あたった。"
        },
        {
            "verb": "当たる (ataru)",
            "tense": "Plain Past (Ta)",
            "text": "私の番が[当たった]。",
            "translation": "My turn came (was hit/assigned).",
            "kana": "あたった",
            "reading": "わたし の ばん が あたった。"
        }, {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "スープを[温めます]。",
            "translation": "I will warm up the soup.",
            "kana": "あたためます",
            "reading": "すーぷ を あたためます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "お弁当を[温めます]か？",
            "translation": "Will you warm up the lunch box?",
            "kana": "あたためます",
            "reading": "おべんとう を あたためます か？"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "手をこすって[温めます]。",
            "translation": "I warm my hands by rubbing them.",
            "kana": "あたためます",
            "reading": "て を こすって あたためます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "ミルクを少し[温めます]。",
            "translation": "I will warm the milk a little.",
            "kana": "あたためます",
            "reading": "みるく を すこし あたためます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "部屋を[温めます]。",
            "translation": "I will warm up the room.",
            "kana": "あたためます",
            "reading": "へや を あたためます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "お風呂を[温めます]。",
            "translation": "I will heat up the bath.",
            "kana": "あたためます",
            "reading": "おふろ を あたためます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "冷えた体を[温めます]。",
            "translation": "I warm my chilled body.",
            "kana": "あたためます",
            "reading": "ひえた からだ を あたためます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "レンジで[温めます]。",
            "translation": "I warm it up in the microwave.",
            "kana": "あたためます",
            "reading": "れんじ で あたためます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "この計画を長く[温めます]。(Figurative: to cherish/nurse an idea)",
            "translation": "I have been nurturing this plan for a long time.",
            "kana": "あたためます",
            "reading": "この けいかく を ながく あたためます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Present (Masu)",
            "text": "心を[温めます]。",
            "translation": "It warms the heart.",
            "kana": "あたためます",
            "reading": "こころ を あたためます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "コーヒーを[温めました]。",
            "translation": "I warmed up the coffee.",
            "kana": "あたためました",
            "reading": "こーひー を あたためました。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "パンを[温めました]か？",
            "translation": "Did you warm up the bread?",
            "kana": "あたためました",
            "reading": "ぱん を あたためました か？"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "ストーブで部屋を[温めました]。",
            "translation": "I warmed the room with a stove.",
            "kana": "あたためました",
            "reading": "すとーぶ で へや を あたためました。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "毛布で体を[温めました]。",
            "translation": "I warmed my body with a blanket.",
            "kana": "あたためました",
            "reading": "もうふ で からだ を あたためました。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "ピザを[温めました]。",
            "translation": "I warmed up the pizza.",
            "kana": "あたためました",
            "reading": "ぴざ を あたためました。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "お湯を[温めました]。",
            "translation": "I heated up the water.",
            "kana": "あたためました",
            "reading": "おゆ を あたためました。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "ホットミルクを[温めました]。",
            "translation": "I warmed the hot milk.",
            "kana": "あたためました",
            "reading": "ほっと みるく を あたためました。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "懐を[温めました]。(Idiom: to fill one's pockets)",
            "translation": "I lined my pockets (made some money).",
            "kana": "あたためました",
            "reading": "ふところ を あたためました。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "旧交を[温めました]。(Idiom: to renew an old friendship)",
            "translation": "I renewed an old friendship.",
            "kana": "あたためました",
            "reading": "きゅうこう を あたためました。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Polite Past (Mashita)",
            "text": "少しだけ[温めました]。",
            "translation": "I warmed it up just a little.",
            "kana": "あたためました",
            "reading": "すこし だけ あたためました。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "スープを[温めて]飲みましょう。",
            "translation": "Let's warm up the soup and drink it.",
            "kana": "あたためて",
            "reading": "すーぷ を あたためて のみましょう。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "ここを[温めて]ください。",
            "translation": "Please warm this part.",
            "kana": "あたためて",
            "reading": "ここ を あたためて ください。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "手を[温めて]あげる。",
            "translation": "I will warm your hands for you.",
            "kana": "あたためて",
            "reading": "て を あたためて あげる。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "お弁当を[温めて]もらえますか？",
            "translation": "Could you warm up my lunch box?",
            "kana": "あたためて",
            "reading": "おべんとう を あたためて もらえます か？"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "しっかり[温めて]から食べてね。",
            "translation": "Eat it after warming it up thoroughly.",
            "kana": "あたためて",
            "reading": "しっかり あたためて から たべて ね。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "体を[温めて]休みます。",
            "translation": "I'll warm my body and rest.",
            "kana": "あたためて",
            "reading": "からだ を あたためて やすみます。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "レンジで[温めて]出す。",
            "translation": "Warm it in the microwave and serve.",
            "kana": "あたためて",
            "reading": "れんじ で あたためて だす。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "アイディアを[温めて]おく。",
            "translation": "I'll keep the idea in mind (nurture it).",
            "kana": "あたためて",
            "reading": "あいでぃあ を あたためて おく。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "卵を[温めて]孵化させる。",
            "translation": "Warm the egg to hatch it.",
            "kana": "あたためて",
            "reading": "たまご を あたためて ふか させる。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Te-form",
            "text": "心を[温めて]くれる言葉だ。",
            "translation": "They are words that warm my heart.",
            "kana": "あたためて",
            "reading": "こころ を あたためて くれる ことば だ。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "今日はスープを[温めない]。",
            "translation": "I won't warm up the soup today.",
            "kana": "あたためない",
            "reading": "きょう は あたためない。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "あまり[温めない]でください。",
            "translation": "Please don't warm it up too much.",
            "kana": "あたためない",
            "reading": "あまり あたためない で ください。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "お風呂を[温めない]のですか？",
            "translation": "Aren't you going to heat up the bath?",
            "kana": "あたためない",
            "reading": "おふろ を あたためない の です か？"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "部屋を[温めない]と寒いですよ。",
            "translation": "It will be cold if you don't warm the room.",
            "kana": "あたためない",
            "reading": "へや を あたためない と さむい です よ。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "刺身は[温めない]ほうがいい。",
            "translation": "It's better not to warm up sashimi.",
            "kana": "あたためない",
            "reading": "さしみ は あたためない ほう が いい。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "懐を[温めない]生活。",
            "translation": "A life where one doesn't line their pockets (poor life).",
            "kana": "あたためない",
            "reading": "ふところ を あたためない せいかつ。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "ミルクを[温めない]で飲む。",
            "translation": "Drink milk without warming it.",
            "kana": "あたためない",
            "reading": "みるく を あたためない で のむ。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は計画を[温めない]で実行した。",
            "translation": "He executed the plan without nurturing it (rushed).",
            "kana": "あたためない",
            "reading": "かれ は けいかく を あたためない で じっこう した。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "手を[温めない]と字が書けない。",
            "translation": "I can't write unless I warm my hands.",
            "kana": "あたためない",
            "reading": "て を あたためない と じ が かけない。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Negative (Nai)",
            "text": "これ以上[温めない]ほうが安全だ。",
            "translation": "It's safer not to warm it any further.",
            "kana": "あたためない",
            "reading": "これ いじょう あたためない ほう が あんぜん だ。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "お弁当を[温めた]。",
            "translation": "I warmed up the lunch box.",
            "kana": "あたためた",
            "reading": "おべんとう を あたためた。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "スープを[温めた]か？",
            "translation": "Did you warm up the soup?",
            "kana": "あたためた",
            "reading": "すーぷ を あたためた か？"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "ストーブで部屋を[温めた]。",
            "translation": "I warmed the room with the stove.",
            "kana": "あたためた",
            "reading": "すとーぶ で へや を あたためた。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "レンジで[温めた]ピザを食べる。",
            "translation": "I eat pizza warmed in the microwave.",
            "kana": "あたためた",
            "reading": "れんじ で あたためた ぴざ を たべる。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "しっかり手を[温めた]。",
            "translation": "I warmed my hands well.",
            "kana": "あたためた",
            "reading": "しっかり て を あたためた。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は長年アイディアを[温めた]。",
            "translation": "He nurtured the idea for many years.",
            "kana": "あたためた",
            "reading": "かれ は ながねん あいでぃあ を あたためた。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "お風呂を[温めた]から入って。",
            "translation": "I heated the bath, so please go in.",
            "kana": "あたためた",
            "reading": "おふろ を あたためた から はいって。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "冷えた体を[温めた]。",
            "translation": "I warmed my cold body.",
            "kana": "あたためた",
            "reading": "ひえた からだ を あたためた。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "再会して旧交を[温めた]。",
            "translation": "We met again and renewed our old friendship.",
            "kana": "あためた",
            "reading": "さいかい して きゅうこう を あたためた。"
        },
        {
            "verb": "温める (atatameru)",
            "tense": "Plain Past (Ta)",
            "text": "少し[温めた]ほうが美味しい。",
            "translation": "It tastes better if you warm it up a bit.",
            "kana": "あたためた",
            "reading": "すこし あたためた ほう が おいしい。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "答えを[当てます]。",
            "translation": "I will guess the answer.",
            "kana": "あてます",
            "reading": "こたえ を あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "的に矢を[当てます]。",
            "translation": "I hit the target with an arrow.",
            "kana": "あてます",
            "reading": "まと に や を あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "先生は学生に質問を[当てます]。",
            "translation": "The teacher calls on the students with questions.",
            "kana": "あてます",
            "reading": "せんせい は がくせい に しつもん を あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "日に[当てます]。",
            "translation": "I will expose it to the sun.",
            "kana": "あてます",
            "reading": "ひ に あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "額に手を[当てます]。",
            "translation": "I place my hand on my forehead.",
            "kana": "あてます",
            "reading": "ひたい に て を あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "宝くじを[当てます]。",
            "translation": "I will win the lottery.",
            "kana": "あてます",
            "reading": "たからくじ を あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "暗闇をライトで[当てます]。",
            "translation": "I shine a light on the darkness.",
            "kana": "あてます",
            "reading": "くらやみ を らいと で あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "彼を新しい任務に[当てます]。",
            "translation": "I will assign him to a new task.",
            "kana": "あてます",
            "reading": "かれ を あたらしい にんむ に あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "ボールをピンに[当てます]。",
            "translation": "I hit the pins with the ball.",
            "kana": "あてます",
            "reading": "ぼーる を ぴん に あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Present (Masu)",
            "text": "推測を[当てます]。",
            "translation": "I will make a correct guess.",
            "kana": "あてます",
            "reading": "すいそく を あてます。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "犯人を[当てました]。",
            "translation": "I guessed the culprit.",
            "kana": "あてました",
            "reading": "はんにん を あてました。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "宝くじを[当てました]。",
            "translation": "I won the lottery.",
            "kana": "あてました",
            "reading": "たからくじ を あてました。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "ボールを窓に[当てました]。",
            "translation": "I hit the window with the ball.",
            "kana": "あてました",
            "reading": "ぼーる を まど に あてました。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "彼はその仕事に私を[当てました]。",
            "translation": "He assigned me to that job.",
            "kana": "あてました",
            "reading": "かれ は その しごと に わたし を あてました。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "懐中電灯で道を[当てました]。",
            "translation": "I shone the flashlight on the path.",
            "kana": "あてました",
            "reading": "かいちゅうでんとう で みち を あてました。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "的の真ん中を[当てました]。",
            "translation": "I hit the center of the target.",
            "kana": "あてました",
            "reading": "まと の まんなか を あてました。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "肩にカイロを[当てました]。",
            "translation": "I applied a heat pack to my shoulder.",
            "kana": "あてました",
            "reading": "かた に かいろ を あてました。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "その予算を教育に[当てました]。",
            "translation": "I allocated that budget to education.",
            "kana": "あてました",
            "reading": "その よさん を きょういく に あてました。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "見事に予想を[当てました]。",
            "translation": "I hit the prediction perfectly.",
            "kana": "あてました",
            "reading": "みごと に よそう を あてました。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Polite Past (Mashita)",
            "text": "名前を[当てました]か？",
            "translation": "Did you guess the name?",
            "kana": "あてました",
            "reading": "なまえ を あてました か？"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "氷を[当てて]冷やす。",
            "translation": "Apply ice to cool it down.",
            "kana": "あてて",
            "reading": "こおり を あてて ひやす。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "予想を[当てて]喜ぶ。",
            "translation": "Getting the prediction right and being happy.",
            "kana": "あてて",
            "reading": "よそう を あてて よろこぶ。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "焦点を[当てて]考える。",
            "translation": "Think by focusing on it.",
            "kana": "あてて",
            "reading": "しょうてん を あてて かんがえる。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "宝くじを[当てて]家を買いたい。",
            "translation": "I want to win the lottery and buy a house.",
            "kana": "あてて",
            "reading": "たからくじ を あてて いえ を かいたい。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "先生に[当てられて]困った。",
            "translation": "I was troubled because the teacher called on me.",
            "kana": "あてられて",
            "reading": "せんせい に あてられて こまった。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "ライトを[当てて]確認する。",
            "translation": "Shine a light and check.",
            "kana": "あてて",
            "reading": "らいと を あてて かくにん する。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "耳を[当てて]聞く。",
            "translation": "Listen with your ear pressed against it.",
            "kana": "あてて",
            "reading": "みみ を あてて きく。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "布を[当てて]縫う。",
            "translation": "Sew by applying a cloth.",
            "kana": "あてて",
            "reading": "ぬの を あてて ぬう。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "熱を[当てて]曲げる。",
            "translation": "Bend it by applying heat.",
            "kana": "あてて",
            "reading": "ねつ を あてて まげる。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Te-form",
            "text": "指を[当てて]数える。",
            "translation": "Count by touching with a finger.",
            "kana": "あてて",
            "reading": "ゆび を あてて かぞえる。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰も[当てない]でしょう。",
            "translation": "No one will probably guess it.",
            "kana": "あてない",
            "reading": "だれ も あてない でしょう。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "人に[当てない]ように投げる。",
            "translation": "Throw it so as not to hit people.",
            "kana": "あてない",
            "reading": "ひと に あてない ように なげる。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "日に[当てない]でください。",
            "translation": "Please do not expose it to the sun.",
            "kana": "あてない",
            "reading": "ひ に あてない で ください。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "答えを[当てない]ほうが面白い。",
            "translation": "It's more interesting not to guess the answer.",
            "kana": "あてない",
            "reading": "こたえ を あてない ほう が おもしろい。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ誰も[当てない]のですか？",
            "translation": "Has no one guessed it yet?",
            "kana": "あてない",
            "reading": "まだ だれ も あてない の です か？"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "光を[当てない]ようにする。",
            "translation": "Try not to shine light on it.",
            "kana": "あてない",
            "reading": "ひかり を あてない ように する。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "自分に[当てない]でね。",
            "translation": "Don't aim it at yourself.",
            "kana": "あてない",
            "reading": "じぶん に あてない で ね。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "予算を[当てない]ことにした。",
            "translation": "Decided not to allocate the budget.",
            "kana": "あてない",
            "reading": "よさん を あてない こと に した。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "ボールを[当てない]ように避ける。",
            "translation": "Avoid it so the ball doesn't hit.",
            "kana": "あてない",
            "reading": "ぼーる を あてない ように よける。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Negative (Nai)",
            "text": "役割を[当てない]。",
            "translation": "Do not assign a role.",
            "kana": "あてない",
            "reading": "やくわり を あてない。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "彼が犯人を[当てた]。",
            "translation": "He guessed the culprit.",
            "kana": "あてた",
            "reading": "かれ が はんにん を あてた。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "ダーツを真ん中に[当てた]。",
            "translation": "I hit the center with the dart.",
            "kana": "あてた",
            "reading": "だーつ を まんなか に あてた。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "母が私の嘘を[当てた]。",
            "translation": "My mother saw through my lie.",
            "kana": "あてた",
            "reading": "はは が わたし の うそ を あてた。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は私に役割を[当てた]。",
            "translation": "He assigned a role to me.",
            "kana": "あてた",
            "reading": "かれ は わたし に やくわり を あてた。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "懐中電灯で前を[当てた]。",
            "translation": "I shone the flashlight in front.",
            "kana": "あてた",
            "reading": "かいちゅうでんとう で まえ を あてた。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "宝くじを[当てた]人は誰？",
            "translation": "Who is the person who won the lottery?",
            "kana": "あてた",
            "reading": "たからくじ を あてた ひと は だれ？"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "氷を腫れた所に[当てた]。",
            "translation": "I applied ice to the swollen part.",
            "kana": "あてた",
            "reading": "こおり を はれた ところ に あてた。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "ライトを看板に[当てた]。",
            "translation": "I shone the light on the sign.",
            "kana": "あてた",
            "reading": "らいと を かんばん に あてた。"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "予想が[当てた]！",
            "translation": "The prediction was right!",
            "kana": "あてた",
            "reading": "よそう が あてた！"
        },
        {
            "verb": "当てる (ateru)",
            "tense": "Plain Past (Ta)",
            "text": "指を唇に[当てた]。",
            "translation": "I placed a finger to my lips.",
            "kana": "あてた",
            "reading": "ゆび を くちびる に あてた。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "ここに人が[集まります]。",
            "translation": "People gather here.",
            "kana": "あつまります",
            "reading": "ここ に ひと が あつまります。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "お金が[集まります]か？",
            "translation": "Will the money be collected (gathered)?",
            "kana": "あつまります",
            "reading": "おかね が あつまります か？"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "放課後、教室に[集まります]。",
            "translation": "We gather in the classroom after school.",
            "kana": "あつまります",
            "reading": "ほうかご、 きょうしつ に あつまります。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "データが徐々に[集まります]。",
            "translation": "The data is gradually being gathered.",
            "kana": "あつまります",
            "reading": "でーた が じょじょ に あつまります。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "ゴミが隅に[集まります]。",
            "translation": "Trash gathers in the corner.",
            "kana": "あつまります",
            "reading": "ごみ が すみ に あつまります。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "広場に鳩が[集まります]。",
            "translation": "Pigeons gather in the square.",
            "kana": "あつまります",
            "reading": "ひろば に はと が あつまります。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "注目が彼に[集まります]。",
            "translation": "Attention gathers on him.",
            "kana": "あつまります",
            "reading": "ちゅうもく が かれ に あつまります。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "雲が[集まります]。",
            "translation": "Clouds are gathering.",
            "kana": "あつまります",
            "reading": "くも が あつまります。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "一箇所に[集まります]。",
            "translation": "They gather in one place.",
            "kana": "あつまります",
            "reading": "いっかしょ に あつまります。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Present (Masu)",
            "text": "全国からファンが[集まります]。",
            "translation": "Fans gather from all over the country.",
            "kana": "あつまります",
            "reading": "ぜんこく から ふぁん が あつまります。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日は親戚が[集まりました]。",
            "translation": "Relatives gathered yesterday.",
            "kana": "あつまりました",
            "reading": "きのう は しんせき が あつまりました。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "駅前に警察が[集まりました]。",
            "translation": "Police gathered in front of the station.",
            "kana": "あつまりました",
            "reading": "えきまえ に けいさつ が あつまりました。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "寄付金がたくさん[集まりました]。",
            "translation": "A lot of donation money was gathered.",
            "kana": "あつまりました",
            "reading": "きふきん が たくさん あつまりました。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "何時に[集まりました]か？",
            "translation": "What time did you gather?",
            "kana": "あつまりました",
            "reading": "なんじ に あつまりました か？"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "会場に観客が[集まりました]。",
            "translation": "Spectators gathered at the venue.",
            "kana": "あつまりました",
            "reading": "かいじょう に かんきゃく が あつまりました。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "有力な情報が[集まりました]。",
            "translation": "Powerful information was gathered.",
            "kana": "あつまりました",
            "reading": "ゆうりょく な じょうほう が あつまりました。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "虫が光に[集まりました]。",
            "translation": "Insects gathered toward the light.",
            "kana": "あつまりました",
            "reading": "むし が ひかり に あつまりました。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "期待が[集まりました]。",
            "translation": "Expectations gathered (heightened).",
            "kana": "あつまりました",
            "reading": "きたい が あつまりました。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "公園に子供たちが[集まりました]。",
            "translation": "Children gathered in the park.",
            "kana": "あつまりました",
            "reading": "こうえん に こどもたち が あつまりました。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Polite Past (Mashita)",
            "text": "全員[集まりました]か？",
            "translation": "Is everyone gathered?",
            "kana": "あつまりました",
            "reading": "ぜんいん あつまりました か？"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "みんなで[集まって]話しましょう。",
            "translation": "Let's gather everyone and talk.",
            "kana": "あつまって",
            "reading": "みんな で あつまって はなしりましょう。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "一箇所に[集まって]ください。",
            "translation": "Please gather in one place.",
            "kana": "あつまって",
            "reading": "いっかしょ に あつまって ください。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "猫が[集まって]寝ている。",
            "translation": "The cats are gathered and sleeping.",
            "kana": "あつまって",
            "reading": "ねこ が あつまって ねて いる。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "寄付が[集まって]助かった。",
            "translation": "The donations gathered and it helped.",
            "kana": "あつまって",
            "reading": "きふ が あつまって たすかった。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "人がたくさん[集まって]いる。",
            "translation": "A lot of people are gathering.",
            "kana": "あつまって",
            "reading": "ひと が たくさん あつまって いる。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "情報が[集まって]から判断する。",
            "translation": "Judge after the information has gathered.",
            "kana": "あつまって",
            "reading": "じょうほう が あつまって から はんだん する。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "雲が[集まって]雨になった。",
            "translation": "Clouds gathered and it turned into rain.",
            "kana": "あつまって",
            "reading": "くも が あつまって あめ に なった。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "そこに[集まって]はいけない。",
            "translation": "You must not gather there.",
            "kana": "あつまって",
            "reading": "そこ に あつまって は いけない。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "学生が[集まって]パーティーをする。",
            "translation": "Students gather and have a party.",
            "kana": "あつまって",
            "reading": "がくせい が あつまって ぱーてぃー を する。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Te-form",
            "text": "視線が[集まって]緊張する。",
            "translation": "Eyes gather on me and I get nervous.",
            "kana": "あつまって",
            "reading": "しせん が あつまって きんちょう する。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "今日は人が[集まらない]。",
            "translation": "People won't gather today.",
            "kana": "あつまらない",
            "reading": "きょう は ひと が あつまらない。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "お金が全然[集まらない]。",
            "translation": "Money isn't gathering at all.",
            "kana": "あつまらない",
            "reading": "おかね が ぜんぜん あつまらない。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "ここに[集まらない]でください。",
            "translation": "Please do not gather here.",
            "kana": "あつまらない",
            "reading": "ここ に あつまらない で ください。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "いいアイディアが[集まらない]。",
            "translation": "Good ideas aren't gathering.",
            "kana": "あつまらない",
            "reading": "いい あいでぃあ が あつまらない。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "ゴミが[集まらない]ように掃除する。",
            "translation": "Clean so that trash doesn't gather.",
            "kana": "あつまらない",
            "reading": "ごみ が あつまらない ように そうじ する。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだメンバーが[集まらない]。",
            "translation": "The members haven't gathered yet.",
            "kana": "あつまらない",
            "reading": "まだ めんばー が あつまらない。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "期待ほど[集まらない]。",
            "translation": "They don't gather as much as expected.",
            "kana": "あつまらない",
            "reading": "きたい ほど あつまらない。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "どこにも[集まらない]。",
            "translation": "They don't gather anywhere.",
            "kana": "あつまらない",
            "reading": "どこ に も あつまらない。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "雨の日は人が[集まらない]。",
            "translation": "People don't gather on rainy days.",
            "kana": "あつまらない",
            "reading": "あめ の ひ は ひと が あつまらない。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Negative (Nai)",
            "text": "注目が[集まらない]ようにする。",
            "translation": "Try not to draw attention (attention not gathering).",
            "kana": "あつまらない",
            "reading": "ちゅうもく が あつまらない ように する。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "大勢の人が[集まった]。",
            "translation": "A large number of people gathered.",
            "kana": "あつまった",
            "reading": "おおぜい の ひと が あつまった。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "寄付金が目標額まで[集まった]。",
            "translation": "Donations gathered up to the target amount.",
            "kana": "あつまった",
            "reading": "きふきん が もくひょうがく まで あつまった。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "誰が[集まった]の？",
            "translation": "Who gathered?",
            "kana": "あつまった",
            "reading": "だれ が あつまった の？"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "広場に鳩が[集まった]。",
            "translation": "Pigeons gathered in the square.",
            "kana": "あつまった",
            "reading": "ひろば に はと が あつまった。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "昨夜、友達が[集まった]。",
            "translation": "Friends gathered last night.",
            "kana": "あつまった",
            "reading": "さくや、 ともだち が あつまった。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "興味が[集まった]。",
            "translation": "Interest gathered (was piqued).",
            "kana": "あつまった",
            "reading": "きょうみ が あつまった。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "会場に熱気が[集まった]。",
            "translation": "Excitement gathered in the venue.",
            "kana": "あつまった",
            "reading": "かいじょう に ねっき が あつまった。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "資料が[集まった]ので書き始める。",
            "translation": "Since the materials gathered, I will start writing.",
            "kana": "あつまった",
            "reading": "しりょう が あつまった ので かきはじめる。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "一箇所に[集まった]。",
            "translation": "They gathered in one place.",
            "kana": "あつまった",
            "reading": "いっかしょ に あつまった。"
        },
        {
            "verb": "集まる (atsumaru)",
            "tense": "Plain Past (Ta)",
            "text": "期待が彼に[集まった]。",
            "translation": "Expectations gathered on him.",
            "kana": "あつまった",
            "reading": "きたい が かれ に あつまった。"
        }, {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "切手を[集めます]。",
            "translation": "I collect stamps.",
            "kana": "あつめます",
            "reading": "きって を あつめます。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "資料を[集めます]か？",
            "translation": "Will you collect the materials?",
            "kana": "あつめます",
            "reading": "しりょう を あつめます か？"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "寄付を[集めます]。",
            "translation": "I collect donations.",
            "kana": "あつめます",
            "reading": "きふ を あつめます。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "注目を[集めます]。",
            "translation": "It attracts (collects) attention.",
            "kana": "あつめます",
            "reading": "ちゅうもく を あつめます。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "落ち葉を[集めます]。",
            "translation": "I gather fallen leaves.",
            "kana": "あつめます",
            "reading": "おちば を あつめます。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "メンバーを[集めます]。",
            "translation": "I will gather the members.",
            "kana": "あつめます",
            "reading": "めんばー を あつめます。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "情報を[集めます]。",
            "translation": "I collect information.",
            "kana": "あつめます",
            "reading": "じょうほう を あつめます。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "一箇所に[集めます]。",
            "translation": "I gather them in one place.",
            "kana": "あつめます",
            "reading": "いっかしょ に あつめます。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "ゴミを[集めます]。",
            "translation": "I collect the trash.",
            "kana": "あつめます",
            "reading": "ごみ を あつめます。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Present (Masu)",
            "text": "人気を[集めます]。",
            "translation": "It gains (collects) popularity.",
            "kana": "あつめます",
            "reading": "にんき を あつめます。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "アンケートを[集めました]。",
            "translation": "I collected the questionnaires.",
            "kana": "あつめました",
            "reading": "あんけーと を あつめました。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "誰がこれを[集めました]か？",
            "translation": "Who collected this?",
            "kana": "あつめました",
            "reading": "だれ が これ を あつめました か？"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "署名を[集めました]。",
            "translation": "I collected signatures.",
            "kana": "あつめました",
            "reading": "しょめい を あつめました。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "知恵を[集めました]。",
            "translation": "We pooled (collected) our wisdom.",
            "kana": "あつめました",
            "reading": "ちえ を あつめました。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "中古車を[集めました]。",
            "translation": "I collected used cars.",
            "kana": "あつめました",
            "reading": "ちゅうこしゃ を あつめました。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "落ち葉を山に[集めました]。",
            "translation": "I gathered the fallen leaves into a pile.",
            "kana": "あつめました",
            "reading": "おちば を やま に あつめました。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "勇気を[集めました]。",
            "translation": "I mustered (collected) my courage.",
            "kana": "あつめました",
            "reading": "ゆうき を あつめました。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "証拠を[集めました]。",
            "translation": "I collected evidence.",
            "kana": "あつめました",
            "reading": "しょうこ を あつめました。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "庭に石を[集めました]。",
            "translation": "I gathered stones in the garden.",
            "kana": "あつめました",
            "reading": "にわ に いし を あつめました。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Polite Past (Mashita)",
            "text": "視線を[集めました]。",
            "translation": "It drew (collected) everyone's gaze.",
            "kana": "あつめました",
            "reading": "しせん を あつめました。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "資料を[集めて]ください。",
            "translation": "Please collect the materials.",
            "kana": "あつめて",
            "reading": "しりょう を あつめて ください。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "みんなを[集めて]相談する。",
            "translation": "Gather everyone and consult with them.",
            "kana": "あつめて",
            "reading": "みんな を あつめて そうだん する。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "情報を[集めて]から決める。",
            "translation": "Decide after collecting information.",
            "kana": "あつめて",
            "reading": "じょうほう を あつめて から きめる。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "落ち葉を[集めて]燃やす。",
            "translation": "Gather fallen leaves and burn them.",
            "kana": "あつめて",
            "reading": "おちば を あつめて もやす。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "お金を[集めて]旅行に行く。",
            "translation": "Collect money and go on a trip.",
            "kana": "あつめて",
            "reading": "おかね を あつめて りょこう に いく。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "ポイントを[集めて]景品をもらう。",
            "translation": "Collect points and get a prize.",
            "kana": "あつめて",
            "reading": "ぽいんと を あつめて けいひん を もらう。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "力を[集めて]頑張る。",
            "translation": "Gather our strength and do our best.",
            "kana": "あつめて",
            "reading": "ちから を あつめて がんばる。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "ゴミを[集めて]捨てる。",
            "translation": "Collect the trash and throw it away.",
            "kana": "あつめて",
            "reading": "ごみ を あつめて すてる。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "人を[集めて]はいけません。",
            "translation": "You must not gather people.",
            "kana": "あつめて",
            "reading": "ひと を あつめて は いけません。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Te-form",
            "text": "知恵を[集めて]解決する。",
            "translation": "Solve it by pooling (collecting) wisdom.",
            "kana": "あつめて",
            "reading": "ちえ を あつめて かいけつ する。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "もう切手は[集めない]。",
            "translation": "I don't collect stamps anymore.",
            "kana": "あつめない",
            "reading": "もう きって は あつめない。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "無理に人を[集めない]でください。",
            "translation": "Please don't force people to gather.",
            "kana": "あつめない",
            "reading": "むり に ひと を あつめない で ください。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "ゴミを[集めない]のですか？",
            "translation": "Are you not collecting the trash?",
            "kana": "あつめない",
            "reading": "ごみ を あつめない の です か？"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "情報を[集めない]と失敗する。",
            "translation": "If you don't collect information, you will fail.",
            "kana": "あつめない",
            "reading": "じょうほう を あつめない と しっぱい する。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "注目を[集めない]ように歩く。",
            "translation": "Walk so as not to attract attention.",
            "kana": "あつめない",
            "reading": "ちゅうもく を あつめない ように あるく。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "古い雑誌は[集めない]ことにした。",
            "translation": "I decided not to collect old magazines.",
            "kana": "あつめない",
            "reading": "ふるい ざっし は あつめない こと に した。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "寄付を[集めない]方針だ。",
            "translation": "It is the policy not to collect donations.",
            "kana": "あつめない",
            "reading": "きふ を あつめない ほうしん だ。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "虫を[集めない]で。",
            "translation": "Don't collect bugs.",
            "kana": "あつめない",
            "reading": "むし を あつめない で。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "証拠を[集めない]わけにはいかない。",
            "translation": "I cannot help but collect evidence.",
            "kana": "あつめない",
            "reading": "しょうこ を あつめない わけ に は いかない。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Negative (Nai)",
            "text": "一箇所に[集めない]ほうがいい。",
            "translation": "It's better not to gather them in one place.",
            "kana": "あつめない",
            "reading": "いっかしょ に あつめない ほう が いい。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "貝殻をたくさん[集めた]。",
            "translation": "I collected many seashells.",
            "kana": "あつめた",
            "reading": "かいがら を たくさん あつめた。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "アンケートを[集めた]か？",
            "translation": "Did you collect the questionnaires?",
            "kana": "あつめた",
            "reading": "あんけーと を あつめた か？"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "彼がメンバーを[集めた]。",
            "translation": "He gathered the members.",
            "kana": "あつめた",
            "reading": "かれ が めんばー を あつめた。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "一番多くの票を[集めた]。",
            "translation": "He collected the most votes.",
            "kana": "あつめた",
            "reading": "いちばん おおく の ひょう を あつめた。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "落ち葉を[集めた]山を作った。",
            "translation": "I made a pile of the fallen leaves I gathered.",
            "kana": "あつめた",
            "reading": "おちば を あつめた やま を つくった。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "公園に子供を[集めた]。",
            "translation": "I gathered the children in the park.",
            "kana": "あつめた",
            "reading": "こうえん に こども を あつめた。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "寄付を[集めた]お金で木を植える。",
            "translation": "Plant trees with the money collected from donations.",
            "kana": "あつめた",
            "reading": "きふ を あつめた おかね で き を うえる。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "情報を[集めた]結果、分かった。",
            "translation": "As a result of collecting information, I understood.",
            "kana": "あつめた",
            "reading": "じょうほう を あつめた けっか、 わかった。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "関心を[集めた]ニュースだ。",
            "translation": "It is news that drew (collected) interest.",
            "kana": "あつめた",
            "reading": "かんしん を あつめた にゅーす だ。"
        },
        {
            "verb": "集める (atsumeru)",
            "tense": "Plain Past (Ta)",
            "text": "一箇所に[集めた]荷物。",
            "translation": "Luggage gathered in one place.",
            "kana": "あつめた",
            "reading": "いっかしょ に あつめた にもつ。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "計算が[合います]。",
            "translation": "The calculations match.",
            "kana": "あいます",
            "reading": "けいさん が あいます。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "この靴はサイズが[合います]か？",
            "translation": "Does this shoe fit (match) your size?",
            "kana": "あいます",
            "reading": "この くつ は さいず が あいます か？"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "意見が[合います]。",
            "translation": "Our opinions agree (match).",
            "kana": "あいます",
            "reading": "いけん が あいます。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "口に[合います]。",
            "translation": "It suits (matches) my taste.",
            "kana": "あいます",
            "reading": "くち に あいます。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "目が[合います]。",
            "translation": "Our eyes meet (match).",
            "kana": "あいます",
            "reading": "め が あいます。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "色が[合います]。",
            "translation": "The colors match.",
            "kana": "あいます",
            "reading": "いろ が あいます。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "性格が[合います]。",
            "translation": "Our personalities match.",
            "kana": "あいます",
            "reading": "せいかく が あいます。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "条件が[合います]。",
            "translation": "The conditions match.",
            "kana": "あいます",
            "reading": "じょうけん が あいます。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "話が[合います]。",
            "translation": "We are on the same page (our talk matches).",
            "kana": "あいます",
            "reading": "はなし が あいます。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Present (Masu)",
            "text": "気が[合います]。",
            "translation": "We get along well (our spirits match).",
            "kana": "あいます",
            "reading": "き が あいます。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "答えが[合いました]。",
            "translation": "The answers matched.",
            "kana": "あいました",
            "reading": "こたえ が あいました。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "タイミングが[合いました]か？",
            "translation": "Did the timing match?",
            "kana": "あいました",
            "reading": "たいみんぐ が あいました か？"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "焦点が[合いました]。",
            "translation": "The focus matched (was in focus).",
            "kana": "あいました",
            "reading": "しょうてん が あいました。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "リズムが[合いました]。",
            "translation": "The rhythms matched.",
            "kana": "あいました",
            "reading": "りずむ が あいました。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "服の好みが[合いました]。",
            "translation": "Our tastes in clothes matched.",
            "kana": "あいました",
            "reading": "ふく の このみ が あいました。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "鍵が[合いました]。",
            "translation": "The key matched (fitted).",
            "kana": "あいました",
            "reading": "かぎ が あいました。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "意気が[合いました]。",
            "translation": "We were in high spirits together (spirits matched).",
            "kana": "あいました",
            "reading": "いき が あいました。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "予想が[合いました]。",
            "translation": "The prediction matched (the result).",
            "kana": "あいました",
            "reading": "よそう が あいました。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "つじつまが[合いました]。",
            "translation": "It was consistent (the coherence matched).",
            "kana": "あいました",
            "reading": "つじつま が あいました。"
        },
        {
            "verb": "合う (au)",
            "tense": "Polite Past (Mashita)",
            "text": "歩調が[合いました]。",
            "translation": "We were in step (our pace matched).",
            "kana": "あいました",
            "reading": "ほちょう が あいました。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "お互い助け[合って]生きる。",
            "translation": "Live by helping each other.",
            "kana": "あって",
            "reading": "おたがい たすけあって いきる。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "計算が[合って]いるか確認する。",
            "translation": "Check if the calculation matches.",
            "kana": "あって",
            "reading": "けいさん が あって いる か かくにん する。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "口に[あって]よかった。",
            "translation": "I'm glad it matched your taste.",
            "kana": "あって",
            "reading": "くち に あって よかった。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "話し[合って]決めましょう。",
            "translation": "Let's decide by talking (matching words) with each other.",
            "kana": "あって",
            "reading": "はなしあって きめましょう。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "気が[あって]仲良くなった。",
            "translation": "We got along (spirits matched) and became close.",
            "kana": "あって",
            "reading": "き が あって なかよく なった。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "条件が[あって]契約した。",
            "translation": "The conditions matched, so we contracted.",
            "kana": "あって",
            "reading": "じょうけん が あって けいやく した。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "タイミングが[あって]会えた。",
            "translation": "The timing matched, so we could meet.",
            "kana": "あって",
            "reading": "たいみんぐ が あって あえた。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "サイズが[あって]いない。",
            "translation": "The size does not match (fit).",
            "kana": "あって",
            "reading": "さいず が あって いない。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "目が[あって]笑った。",
            "translation": "Our eyes met (matched) and we laughed.",
            "kana": "あって",
            "reading": "め が あって わらった。"
        },
        {
            "verb": "合う (au)",
            "tense": "Te-form",
            "text": "歩調を[あって]歩く。(Note: Usually 合わせて)",
            "translation": "Walk in step (pace matching).",
            "kana": "あって",
            "reading": "ほちょう を あって あるく。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "計算が[合わない]。",
            "translation": "The calculations don't match.",
            "kana": "あわない",
            "reading": "けいさん が あわない。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "サイズが[合わない]のですか？",
            "translation": "Does the size not match (fit)?",
            "kana": "あわない",
            "reading": "さいず が あわない の です か？"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "口に[合わない]かもしれない。",
            "translation": "It might not suit (match) your taste.",
            "kana": "あわない",
            "reading": "くち に あわない かもしれない。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "彼とは意見が[合わない]。",
            "translation": "My opinions don't agree (match) with his.",
            "kana": "あわない",
            "reading": "かれ と は いけん が あわない。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "色が[合わない]ので変える。",
            "translation": "The colors don't match, so I'll change them.",
            "kana": "あわない",
            "reading": "いろ が あわない ので かえる。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "タイミングが[合わない]ことが多い。",
            "translation": "It's common for the timing not to match.",
            "kana": "あわない",
            "reading": "たいみんぐ が あわない こと が おおい。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "性格が[合わない]と大変だ。",
            "translation": "It's hard if personalities don't match.",
            "kana": "あわない",
            "reading": "せいかく が あわない と たいへん だ。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "焦点が[合わない]カメラ。",
            "translation": "A camera that doesn't focus (match focus).",
            "kana": "あわない",
            "reading": "しょうてん が あわない かめら。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "つじつまが[合わない]話だ。",
            "translation": "It's an inconsistent (coherence doesn't match) story.",
            "kana": "あわない",
            "reading": "つじつま が あわない はなし だ。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Negative (Nai)",
            "text": "気が[合わない]人とは距離を置く。",
            "translation": "Keep distance from people you don't get along with (spirits don't match).",
            "kana": "あわない",
            "reading": "き が あわない ひと と は きょり を おく。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "答えがピタリと[合った]。",
            "translation": "The answers matched perfectly.",
            "kana": "あった",
            "reading": "こたえ が ぴたり と あった。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "サイズが[合った]か？",
            "translation": "Did the size match (fit)?",
            "kana": "あった",
            "reading": "さいず が あった か？"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "彼と目が[合った]。",
            "translation": "My eyes met (matched) with his.",
            "kana": "あった",
            "reading": "かれ と め が あった。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "タイミングが[合った]ので行けた。",
            "translation": "The timing matched, so I could go.",
            "kana": "あった",
            "reading": "たいみんぐ が あった ので いけた。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "条件が[合った]ので契約した。",
            "translation": "The conditions matched, so I contracted.",
            "kana": "あった",
            "reading": "じょうけん が あった ので けいやく した。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "口に[合った]ようで嬉しい。",
            "translation": "I'm glad it seems to have matched your taste.",
            "kana": "あった",
            "reading": "くち に あった よう で うれしい。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "意見が[合った]試しがない。",
            "translation": "There's never been a time our opinions matched.",
            "kana": "あった",
            "reading": "いけん が あった ためし が ない。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "色が[合った]服を選ぶ。",
            "translation": "Choose clothes with colors that matched.",
            "kana": "あった",
            "reading": "いろ が あった ふく を えらぶ。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "気が[合った]仲間。",
            "translation": "Companions who got along (spirits matched).",
            "kana": "あった",
            "reading": "き が あった なかま。"
        },
        {
            "verb": "合う (au)",
            "tense": "Plain Past (Ta)",
            "text": "鍵が[合った]瞬間、安心した。",
            "translation": "The moment the key matched (fitted), I felt relieved.",
            "kana": "あった",
            "reading": "かぎ が あった しゅんかん、 あんしん した。"
        }, {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "手を[合わせます]。",
            "translation": "I put my hands together (in prayer).",
            "kana": "あわせます",
            "reading": "て を あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "声を[合わせます]。",
            "translation": "We harmonize (put our voices together).",
            "kana": "あわせます",
            "reading": "こえ を あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "スケジュールを[合わせます]。",
            "translation": "I will adjust (match) the schedule.",
            "kana": "あわせます",
            "reading": "すけじゅーる を あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "力を[合わせます]。",
            "translation": "We will combine our efforts.",
            "kana": "あわせます",
            "reading": "ちから を あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "答えを[合わせます]。",
            "translation": "I will check (match) the answers.",
            "kana": "あわせます",
            "reading": "こたえ を あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "鏡に自分を[合わせます]。",
            "translation": "I check myself in the mirror.",
            "kana": "あわせます",
            "reading": "かがみ に じぶん を あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "服にネクタイを[合わせます]。",
            "translation": "I match a tie to the suit.",
            "kana": "あわせます",
            "reading": "ふく に ねくたい を あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "ピントを[合わせます]。",
            "translation": "I will adjust the focus.",
            "kana": "あわせます",
            "reading": "ぴんと を あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "リズムに[合わせます]。",
            "translation": "I keep time with the rhythm.",
            "kana": "あわせます",
            "reading": "りずむ に あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Present (Masu)",
            "text": "目線を[合わせます]。",
            "translation": "I make eye contact (match eye level).",
            "kana": "あわせます",
            "reading": "めせん を あわせます。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "タイミングを[合わせました]。",
            "translation": "I matched the timing.",
            "kana": "あわせました",
            "reading": "たいみんぐ を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "全員で口を[合わせました]。",
            "translation": "Everyone coordinated their stories (matched mouths).",
            "kana": "あわせました",
            "reading": "ぜんいん で くち を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "時計を[合わせました]。",
            "translation": "I set (adjusted) the clock.",
            "kana": "あわせました",
            "reading": "とけい を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "条件を[合わせました]。",
            "translation": "I met the conditions.",
            "kana": "あわせました",
            "reading": "じょうけん を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "色を[合わせました]。",
            "translation": "I matched the colors.",
            "kana": "あわせました",
            "reading": "いろ を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "歩調を[合わせました]。",
            "translation": "I kept pace with them.",
            "kana": "あわせました",
            "reading": "ほちょう を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "意見を[合わせました]。",
            "translation": "I aligned my opinion.",
            "kana": "あわせました",
            "reading": "いけん を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "調子を[合わせました]。",
            "translation": "I went along with the mood.",
            "kana": "あわせました",
            "reading": "ちょうし を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "顔を[合わせました]。",
            "translation": "We met face to face.",
            "kana": "あわせました",
            "reading": "かお を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Polite Past (Mashita)",
            "text": "設定を[合わせました]。",
            "translation": "I adjusted the settings.",
            "kana": "あわせました",
            "reading": "せってい を あわせました。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "力を[合わせて]頑張りましょう。",
            "translation": "Let's work together and do our best.",
            "kana": "あわせて",
            "reading": "ちから を あわせて がんばりましょう。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "手を[合わせて]祈る。",
            "translation": "Join hands and pray.",
            "kana": "あわせて",
            "reading": "て を あわせて いのる。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "答えを[合わせて]みる。",
            "translation": "Try checking the answers.",
            "kana": "あわせて",
            "reading": "こたえ を あわせて みる。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "予定を[合わせて]から連絡します。",
            "translation": "I'll contact you after coordinating the schedule.",
            "kana": "あわせて",
            "reading": "よてい を あわせて から れんらく します。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "ピントを[合わせて]写真を撮る。",
            "translation": "Adjust the focus and take a picture.",
            "kana": "あわせて",
            "reading": "ぴんと を あわせて しゃしん を とる。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "音楽に[合わせて]踊る。",
            "translation": "Dance to the music.",
            "kana": "あわせて",
            "reading": "おんがく に あわせて おどる。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "歩調を[合わせて]歩く。",
            "translation": "Walk in step with others.",
            "kana": "あわせて",
            "reading": "ほちょう を あわせて あるく。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "周囲に[合わせて]行動する。",
            "translation": "Act in accordance with those around you.",
            "kana": "あわせて",
            "reading": "しゅうい に あわせて こうどう する。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "サイズを[合わせて]買う。",
            "translation": "Buy it after matching the size.",
            "kana": "あわせて",
            "reading": "さいず を あわせて かう。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Te-form",
            "text": "鏡に[合わせて]みる。",
            "translation": "Try matching it against the mirror.",
            "kana": "あわせて",
            "reading": "かがみ に あわせて みる。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "意見を[合わせない]。",
            "translation": "I won't align my opinion.",
            "kana": "あわせない",
            "reading": "いけん を あわせない。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "目を[合わせない]ようにする。",
            "translation": "Try not to make eye contact.",
            "kana": "あわせない",
            "reading": "め を あわせない ように する。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "タイミングが[合わせない]。",
            "translation": "I can't match the timing.",
            "kana": "あわせない",
            "reading": "たいみんぐ が あわせない。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "顔を[合わせない]で帰る。",
            "translation": "Go home without meeting face to face.",
            "kana": "あわせない",
            "reading": "かお を あわせない で かえる。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "無理に[合わせない]ほうがいい。",
            "translation": "It's better not to force a match.",
            "kana": "あわせない",
            "reading": "むり に あわせない ほう が いい。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "リズムを[合わせない]とずれる。",
            "translation": "If you don't match the rhythm, it'll be off.",
            "kana": "あわせない",
            "reading": "りずむ を あわせない と ずれる。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "ピントを[合わせない]で撮る。",
            "translation": "Take a photo without focusing.",
            "kana": "あわせない",
            "reading": "ぴんと を あわせない で とる。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "色を[合わせない]スタイル。",
            "translation": "A style that doesn't match colors.",
            "kana": "あわせない",
            "reading": "いろ を あわせない すたいる。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "スケジュールを[合わせない]人だ。",
            "translation": "He is a person who doesn't coordinate schedules.",
            "kana": "あわせない",
            "reading": "すけじゅーる を あわせない ひと だ。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Negative (Nai)",
            "text": "設定を[合わせない]。",
            "translation": "I won't adjust the settings.",
            "kana": "あわせない",
            "reading": "せってい を あわせない。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "手を[合わせた]。",
            "translation": "I put my hands together.",
            "kana": "あわせた",
            "reading": "て を あわせた。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "彼に歩調を[合わせた]。",
            "translation": "I matched my pace to his.",
            "kana": "あわせた",
            "reading": "かれ に ほちょう を あわせた。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "やっとピントが[合わせた]。(Note: usually 合った)",
            "translation": "I finally adjusted the focus.",
            "kana": "あわせた",
            "reading": "やっと ぴんと が あわせた。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "口を[合わせた]嘘。",
            "translation": "A lie with coordinated stories.",
            "kana": "あわせた",
            "reading": "くち を あわせた うそ。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "鏡で姿を[合わせた]。",
            "translation": "I checked my appearance in the mirror.",
            "kana": "あわせた",
            "reading": "かがみ で すがた を あわせた。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "全員で力を[合わせた]。",
            "translation": "Everyone combined their strength.",
            "kana": "あわせた",
            "reading": "ぜんいん で ちから を あわせた。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "曲に[合わせた]振り付け。",
            "translation": "Choreography matched to the song.",
            "kana": "あわせた",
            "reading": "きょく に あわせた ふりつけ。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "目線を[合わせた]。",
            "translation": "I met their gaze.",
            "kana": "あわせた",
            "reading": "めせん を あわせた。"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "時計を[合わせた]か？",
            "translation": "Did you set the clock?",
            "kana": "あわせた",
            "reading": "とけい を あわせた か？"
        },
        {
            "verb": "合わせる (awaseru)",
            "tense": "Plain Past (Ta)",
            "text": "答えを[合わせた]結果。",
            "translation": "The result of checking the answers.",
            "kana": "あわせた",
            "reading": "こたえ を あわせた けっか。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "すぐに[謝ります]。",
            "translation": "I will apologize immediately.",
            "kana": "あやまります",
            "reading": "すぐ に あやまります。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "彼に[謝ります]か？",
            "translation": "Will you apologize to him?",
            "kana": "あやまります",
            "reading": "かれ に あやまります か？"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "誠意を持って[謝ります]。",
            "translation": "I will apologize with sincerity.",
            "kana": "あやまります",
            "reading": "せいい を もって あやまります。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "理由を言って[謝ります]。",
            "translation": "I will state the reason and apologize.",
            "kana": "あやまります",
            "reading": "りゆう を いって あやまります。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "ちゃんと[謝ります]。",
            "translation": "I will apologize properly.",
            "kana": "あやまります",
            "reading": "ちゃんと あやまります。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "あとで[謝ります]。",
            "translation": "I will apologize later.",
            "kana": "あやまります",
            "reading": "あと で あやまります。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "メールで[謝ります]。",
            "translation": "I will apologize via email.",
            "kana": "あやまります",
            "reading": "めーる で あやまります。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "先生に[謝ります]。",
            "translation": "I will apologize to the teacher.",
            "kana": "あやまります",
            "reading": "せんせい に あやまります。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "皆に[謝ります]。",
            "translation": "I apologize to everyone.",
            "kana": "あやまります",
            "reading": "みんな に あやまります。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Present (Masu)",
            "text": "間違いを[謝ります]。",
            "translation": "I apologize for the mistake.",
            "kana": "あやまります",
            "reading": "まちがい を あやまります。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日[謝りました]。",
            "translation": "I apologized yesterday.",
            "kana": "あやまりました",
            "reading": "きのう あやまりました。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "本人に[謝りました]か？",
            "translation": "Did you apologize to the person themselves?",
            "kana": "あやまりました",
            "reading": "ほんにん に あやまりました か？"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "素直に[謝りました]。",
            "translation": "I apologized honestly.",
            "kana": "あやまりました",
            "reading": "すなお に あやまりました。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "電話で[謝りました]。",
            "translation": "I apologized over the phone.",
            "kana": "あやまりました",
            "reading": "でんわ で あやまりました。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "何度も[謝りました]。",
            "translation": "I apologized many times.",
            "kana": "あやまりました",
            "reading": "なんど も あやまりました。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "深く[謝りました]。",
            "translation": "I apologized deeply.",
            "kana": "あやまりました",
            "reading": "ふかく あやまりました。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "泣きながら[謝りました]。",
            "translation": "I apologized while crying.",
            "kana": "あやまりました",
            "reading": "なきながら あやまりました。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "親に[謝りました]。",
            "translation": "I apologized to my parents.",
            "kana": "あやまりました",
            "reading": "おや に ああやまりました。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "遅刻を[謝りました]。",
            "translation": "I apologized for being late.",
            "kana": "あやまりました",
            "reading": "ちこく を あやまりました。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Polite Past (Mashita)",
            "text": "やっと[謝りました]。",
            "translation": "I finally apologized.",
            "kana": "あやまりました",
            "reading": "やっと あやまりました。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "[謝って]済む問題ではない。",
            "translation": "It's not an issue that can be solved just by apologizing.",
            "kana": "あやまって",
            "reading": "あやまって すむ もんだい で は ない。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "ちゃんと[謝って]ください。",
            "translation": "Please apologize properly.",
            "kana": "あやまって",
            "reading": "ちゃんと あやまって ください。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "彼女に[謝って]きた。",
            "translation": "I went and apologized to her.",
            "kana": "あやまって",
            "reading": "かのじょ に あやまって きた。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "素直に[謝って]許してもらう。",
            "translation": "Apologize honestly and get forgiven.",
            "kana": "あやまって",
            "reading": "すなお に あやまって ゆるして もらう。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "[謝って]も許さない。",
            "translation": "I won't forgive you even if you apologize.",
            "kana": "あやまって",
            "reading": "あやまって も ゆるさない。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "頭を下げて[謝って]いる。",
            "translation": "He is bowing his head and apologizing.",
            "kana": "あやまって",
            "reading": "あたま を さげて あやまって いる。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "嘘を[謝って]ほしい。",
            "translation": "I want you to apologize for the lie.",
            "kana": "あやまって",
            "reading": "うそ を あやまって ほしい。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "一緒に[謝って]あげる。",
            "translation": "I will go and apologize with you.",
            "kana": "あやまって",
            "reading": "いっしょ に あやまって あげる。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "手紙を書いて[謝って]みた。",
            "translation": "I tried apologizing by writing a letter.",
            "kana": "あやまって",
            "reading": "てがみ を かいて あやまって みた。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Te-form",
            "text": "急いで[謝って]ね。",
            "translation": "Apologize quickly, okay?",
            "kana": "あやまって",
            "reading": "いそいで あやまって ね。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "絶対に[謝らない]。",
            "translation": "I will absolutely not apologize.",
            "kana": "あやまらない",
            "reading": "ぜったい に あやまらない。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "どうして[謝らない]の？",
            "translation": "Why won't you apologize?",
            "kana": "あやまらない",
            "reading": "どうして あやまらない の？"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "彼は自分から[謝らない]人だ。",
            "translation": "He is a person who doesn't apologize on his own.",
            "kana": "あやまらない",
            "reading": "かれ は じぶん から あやまらない ひと だ。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ[謝らない]ほうがいい。",
            "translation": "It's better not to apologize yet.",
            "kana": "あやまらない",
            "reading": "まだ あやまらない ほう が いい。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "[謝らない]と大変なことになる。",
            "translation": "If you don't apologize, things will get bad.",
            "kana": "あやまらない",
            "reading": "あやまらない と たいへんな こと に なる。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "一言も[謝らない]。",
            "translation": "He doesn't apologize even a single word.",
            "kana": "あやまらない",
            "reading": "ひとこと も あやまらない。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "[謝らない]理由は何？",
            "translation": "What is the reason for not apologizing?",
            "kana": "あやまらない",
            "reading": "あやまらない りゆう は なに？"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰にも[謝らない]つもりだ。",
            "translation": "I don't intend to apologize to anyone.",
            "kana": "あやまらない",
            "reading": "だれ に も あやまらない つもり だ。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "ミスをしても[謝らない]。",
            "translation": "He doesn't apologize even if he makes a mistake.",
            "kana": "あやまらない",
            "reading": "みす を しても あやまらない。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Negative (Nai)",
            "text": "素直に[謝らない]子供。",
            "translation": "A child who won't apologize honestly.",
            "kana": "あやまらない",
            "reading": "すなお に あやまらない こども。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "さっき[謝った]。",
            "translation": "I apologized just now.",
            "kana": "あやまった",
            "reading": "さっき あやまった。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "もう彼女に[謝った]？",
            "translation": "Did you already apologize to her?",
            "kana": "あやまった",
            "reading": "もう かのじょ に あやまった？"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "勇気を出して[謝った]。",
            "translation": "I gathered my courage and apologized.",
            "kana": "あやまった",
            "reading": "ゆうき を だして あやまった。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "彼が[謝った]ので許した。",
            "translation": "I forgave him because he apologized.",
            "kana": "あやまった",
            "reading": "かれ が あやまった ので ゆるした。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "泣きながら[謝った]記憶がある。",
            "translation": "I remember apologizing while crying.",
            "kana": "あやまった",
            "reading": "なきながら あやまった きおく が ある。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "皆の前で[謝った]。",
            "translation": "I apologized in front of everyone.",
            "kana": "あやまった",
            "reading": "みんな の まえ で あやまった。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "メールで何度も[謝った]。",
            "translation": "I apologized many times via email.",
            "kana": "あやまった",
            "reading": "めーる で なんど も あやまった。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "遅刻したことを[謝った]。",
            "translation": "I apologized for being late.",
            "kana": "あやまった",
            "reading": "ちこく した こと を あやまった。"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "結局、誰が[謝った]の？",
            "translation": "In the end, who apologized?",
            "kana": "あやまった",
            "reading": "けっきょく、 だれ が あやまった の？"
        },
        {
            "verb": "謝る (ayamaru)",
            "tense": "Plain Past (Ta)",
            "text": "素直に[謝った]ほうがよかった。",
            "translation": "It would have been better to apologize honestly.",
            "kana": "あやまった",
            "reading": "すなお に あやまった ほう が よかった。"
        }, {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "壁に[ぶつかります]。",
            "translation": "I hit (bump into) a wall.",
            "kana": "ぶつかります",
            "reading": "かべ に ぶつかります。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "意見が[ぶつかります]か？",
            "translation": "Do your opinions clash (collide)?",
            "kana": "ぶつかります",
            "reading": "いけん が ぶつかります か？"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "予定が[ぶつかります]。",
            "translation": "The schedules conflict (overlap).",
            "kana": "ぶつかります",
            "reading": "よてい が ぶつかります。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "大きな問題に[ぶつかります]。",
            "translation": "I encounter (run into) a big problem.",
            "kana": "ぶつかります",
            "reading": "おおきな もんだい に ぶつかります。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "人と[ぶつかります]。",
            "translation": "I bump into people.",
            "kana": "ぶつかります",
            "reading": "ひと と ぶつかります。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "自転車が[ぶつかります]。",
            "translation": "The bicycle will collide.",
            "kana": "ぶつかります",
            "reading": "じてんしゃ が ぶつかります。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "困難に[ぶつかります]。",
            "translation": "I face (run into) a difficulty.",
            "kana": "ぶつかります",
            "reading": "こんなん に ぶつかります。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "正面から[ぶつかります]。",
            "translation": "I will clash head-on.",
            "kana": "ぶつかります",
            "reading": "しょうめん から ぶつかります。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "現実に[ぶつかります]。",
            "translation": "I face (hit) reality.",
            "kana": "ぶつかります",
            "reading": "げんじつ に ぶつかります。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Present (Masu)",
            "text": "どちらが[ぶつかります]か？",
            "translation": "Which one will collide?",
            "kana": "ぶつかります",
            "reading": "どちら が ぶつかります か？"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "電柱に[ぶつかりました]。",
            "translation": "I hit a utility pole.",
            "kana": "ぶつかりました",
            "reading": "でんちゅう に ぶつかりました。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、彼と[ぶつかりました]か？",
            "translation": "Did you clash with him yesterday?",
            "kana": "ぶつかりました",
            "reading": "きのう、 かれ と ぶつかりました か？"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "船が岩に[ぶつかりました]。",
            "translation": "The ship struck a rock.",
            "kana": "ぶつかりました",
            "reading": "ふね が いわ に ぶつかりました。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "偶然、友達に[ぶつかりました]。",
            "translation": "I accidentally bumped into a friend.",
            "kana": "ぶつかりました",
            "reading": "ぐうぜん、 ともだち に ぶつかりました。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "壁に強く[ぶつかりました]。",
            "translation": "I hit the wall hard.",
            "kana": "ぶつかりました",
            "reading": "かべ に つよく ぶつかりました。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "意見が激しく[ぶつかりました]。",
            "translation": "Our opinions clashed violently.",
            "kana": "ぶつかりました",
            "reading": "いけん が はげしく ぶつかりました。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "予定が[ぶつかりました]のでキャンセルします。",
            "translation": "My schedule conflicted, so I'll cancel.",
            "kana": "ぶつかりました",
            "reading": "よてい が ぶつかりました ので きゃんせる します。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "正面から正義と[ぶつかりました]。",
            "translation": "I clashed head-on with justice.",
            "kana": "ぶつかりました",
            "reading": "しょうめん から せいぎ と ぶつかりました。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "限界に[ぶつかりました]。",
            "translation": "I hit my limit.",
            "kana": "ぶつかりました",
            "reading": "げんかい に ぶつかりました。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Polite Past (Mashita)",
            "text": "誰が[ぶつかりました]か？",
            "translation": "Who bumped (into someone)?",
            "kana": "ぶつかりました",
            "reading": "だれ が ぶつかりました か？"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "人と[ぶつかって]転んだ。",
            "translation": "I bumped into a person and fell.",
            "kana": "ぶつかって",
            "reading": "ひと と ぶつかって ころんだ。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "壁に[ぶつかって]止まる。",
            "translation": "Hit the wall and stop.",
            "kana": "ぶつかって",
            "reading": "かべ に ぶつかって とまる。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "予定が[ぶつかって]困っている。",
            "translation": "Schedules are conflicting, and I'm in trouble.",
            "kana": "ぶつかって",
            "reading": "よてい が ぶつかって こまっている。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "何度も[ぶつかって]覚える。",
            "translation": "Learn by hitting (obstacles) many times.",
            "kana": "ぶつかって",
            "reading": "なんど も ぶつかって おぼえる。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "本音で[ぶつかって]みよう。",
            "translation": "Let's try clashing with our true feelings.",
            "kana": "ぶつかって",
            "reading": "ほんね で ぶつかって みよう。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "困難に[ぶつかって]も諦めない。",
            "translation": "Don't give up even if you run into difficulties.",
            "kana": "ぶつかって",
            "reading": "こんなん に ぶつかって も あきらめない。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "石に[ぶつかって]痛い。",
            "translation": "It hurts from hitting a stone.",
            "kana": "ぶつかって",
            "reading": "いし に ぶつかって いたい。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "車が[ぶつかって]壊れた。",
            "translation": "The car hit (something) and broke.",
            "kana": "ぶつかって",
            "reading": "くるま が ぶつかって こわれた。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "真正面から[ぶつかって]いけ。",
            "translation": "Go and clash head-on.",
            "kana": "ぶつかって",
            "reading": "ましょうめん から ぶつかって いけ。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Te-form",
            "text": "現実に[ぶつかって]悟った。",
            "translation": "I hit reality and realized.",
            "kana": "ぶつかって",
            "reading": "げんじつ に ぶつかって さとった。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "壁には[ぶつからない]。",
            "translation": "I won't hit the wall.",
            "kana": "ぶつからない",
            "reading": "かべ に は ぶつからない。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "人に[ぶつからない]ように歩く。",
            "translation": "Walk so as not to bump into people.",
            "kana": "ぶつからない",
            "reading": "ひと に ぶつからない ように あるく。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "予定は[ぶつからない]はずだ。",
            "translation": "The schedules shouldn't conflict.",
            "kana": "ぶつからない",
            "reading": "よてい は ぶつからない はず だ。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "意見が[ぶつからない]のはおかしい。",
            "translation": "It's strange that opinions don't clash.",
            "kana": "ぶつからない",
            "reading": "いけん が ぶつからない の は おかしい。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "困難に[ぶつからない]人生はない。",
            "translation": "There is no life where you don't run into difficulties.",
            "kana": "ぶつからない",
            "reading": "こんなん に ぶつからない じんせい は ない。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "物は[ぶつからない]ように置く。",
            "translation": "Place things so they don't collide.",
            "kana": "ぶつからない",
            "reading": "もの は ぶつからない ように おく。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "真正面から[ぶつからない]戦法。",
            "translation": "A tactic of not clashing head-on.",
            "kana": "ぶつからない",
            "reading": "ましょうめん から ぶつからない せんぽう。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "どうしても[ぶつからない]。",
            "translation": "They just won't collide.",
            "kana": "ぶつからない",
            "reading": "どうしても ぶつからない。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "障害物に[ぶつからない]センサー。",
            "translation": "A sensor that doesn't hit obstacles.",
            "kana": "ぶつからない",
            "reading": "しょうがいぶつ に ぶつからない せんさー。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Negative (Nai)",
            "text": "本音で[ぶつからない]理由。",
            "translation": "The reason for not clashing with true feelings.",
            "kana": "ぶつからない",
            "reading": "ほんね で ぶつからない りゆう。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "自転車が[ぶつかった]。",
            "translation": "The bicycle collided.",
            "kana": "ぶつかった",
            "reading": "じてんしゃ が ぶつかった。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "誰かに[ぶつかった]？",
            "translation": "Did you bump into someone?",
            "kana": "ぶつかった",
            "reading": "だれか に ぶつかった？"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "大きな壁に[ぶつかった]。",
            "translation": "I hit a big wall (obstacle).",
            "kana": "ぶつかった",
            "reading": "おおきな かべ に ぶつかった。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "予定が[ぶつかった]から調整する。",
            "translation": "The schedules conflicted, so I'll adjust.",
            "kana": "ぶつかった",
            "reading": "よてい が ぶつかった から ちょうせい する。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "意見が[ぶつかった]結果、決まった。",
            "translation": "As a result of clashing opinions, it was decided.",
            "kana": "ぶつかった",
            "reading": "いけん が ぶつかった けっか、 きまった。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "石に[ぶつかった]衝撃。",
            "translation": "The impact of hitting a stone.",
            "kana": "ぶつかった",
            "reading": "いし に ぶつかった しょうげき。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "真正面から[ぶつかった]。",
            "translation": "I clashed head-on.",
            "kana": "ぶつかった",
            "reading": "ましょうめん から ぶつかった。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "限界に[ぶつかった]気がした。",
            "translation": "I felt like I hit my limit.",
            "kana": "ぶつかった",
            "reading": "げんかい に ぶつかった き が した。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "不意に[ぶつかった]。",
            "translation": "I bumped into (it) unexpectedly.",
            "kana": "ぶつかった",
            "reading": "ふい に ぶつかった。"
        },
        {
            "verb": "ぶつかる (butsukaru)",
            "tense": "Plain Past (Ta)",
            "text": "やっと現実に[ぶつかった]。",
            "translation": "I finally faced (hit) reality.",
            "kana": "ぶつかった",
            "reading": "やっと げんじつ に ぶつかった。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "答えが[違います]。",
            "translation": "The answer is different (wrong).",
            "kana": "ちがいます",
            "reading": "こたえ が ちがいます。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "何が[違います]か？",
            "translation": "What is different?",
            "kana": "ちがいます",
            "reading": "なに が ちがいます か？"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "意見が[違います]。",
            "translation": "Our opinions are different.",
            "kana": "ちがいます",
            "reading": "いけん が ちがいます。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "話が[違います]。",
            "translation": "The story is different (from what I heard).",
            "kana": "ちがいます",
            "reading": "はなし が ちがいます。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "色が[違います]。",
            "translation": "The colors are different.",
            "kana": "ちがいます",
            "reading": "いろ が ちがいます。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "桁が[違います]。",
            "translation": "The orders of magnitude are different.",
            "kana": "ちがいます",
            "reading": "けた が ちがいます。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "雰囲気が[違います]。",
            "translation": "The atmosphere is different.",
            "kana": "ちがいます",
            "reading": "ふんいき が ちがいます。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "習慣が[違います]。",
            "translation": "The customs are different.",
            "kana": "ちがいます",
            "reading": "しゅうかん が ちがいます。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "サイズが[違います]。",
            "translation": "The sizes are different.",
            "kana": "ちがいます",
            "reading": "さいず が ちがいます。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Present (Masu)",
            "text": "種類が[違います]。",
            "translation": "The types are different.",
            "kana": "ちがいます",
            "reading": "しゅるい が ちがいます。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "予想と[違いました]。",
            "translation": "It was different from my prediction.",
            "kana": "ちがいました",
            "reading": "よそう と ちがいました。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "どこが[違いました]か？",
            "translation": "Where was it different?",
            "kana": "ちがいました",
            "reading": "どこ が ちがいました か？"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "やり方が[違いました]。",
            "translation": "The method was different.",
            "kana": "ちがいました",
            "reading": "やりかた が ちがいました。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "以前と[違いました]。",
            "translation": "It was different from before.",
            "kana": "ちがいました",
            "reading": "いぜん と ちがいました。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "道が[違いました]。",
            "translation": "The path was wrong (different).",
            "kana": "ちがいました",
            "reading": "みち が ちがいました。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "名前が[違いました]。",
            "translation": "The name was different.",
            "kana": "ちがいました",
            "reading": "なまえ が ちがいました。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "意味が[違いました]。",
            "translation": "The meaning was different.",
            "kana": "ちがいました",
            "reading": "いみ が ちがいました。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "味が[違いました]。",
            "translation": "The taste was different.",
            "kana": "ちがいました",
            "reading": "あじ が ちがいました。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "日付が[違いました]。",
            "translation": "The date was different.",
            "kana": "ちがいました",
            "reading": "ひづけ が ちがいました。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Polite Past (Mashita)",
            "text": "何から何まで[違いました]。",
            "translation": "Everything was different.",
            "kana": "ちがいました",
            "reading": "なに から なに まで ちがいました。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "形が[違って]いる。",
            "translation": "The shapes are different.",
            "kana": "ちがって",
            "reading": "かたち が ちがって いる。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "予想と[違って]驚いた。",
            "translation": "It was different from my expectation and I was surprised.",
            "kana": "ちがって",
            "reading": "よそう と ちがって おどろいた。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "話が[違って]困る。",
            "translation": "The story is different and it's a problem.",
            "kana": "ちがって",
            "reading": "はなし が ちがって こまる。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "前と[違って]きれいだ。",
            "translation": "It's different from before and is beautiful.",
            "kana": "ちがって",
            "reading": "まえ と ちがって きれいだ。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "性格が[違って]も仲がいい。",
            "translation": "Even if our personalities are different, we are close.",
            "kana": "ちがって",
            "reading": "せいかく が ちがって も なか が いい。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "事実と[違って]いたら教えて。",
            "translation": "Tell me if it's different from the facts.",
            "kana": "ちがって",
            "reading": "じじつ と ちがって いたら おしえて。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "場所を[違って]（間違えて）しまった。",
            "translation": "I got the place wrong (different).",
            "kana": "ちがって",
            "reading": "ばしょ を ちがって しまった。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "考え方が[違って]当然だ。",
            "translation": "It's natural that ways of thinking are different.",
            "kana": "ちがって",
            "reading": "かんがえかた が ちがって とうぜんだ。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "種類が[違って]見える。",
            "translation": "They look like different types.",
            "kana": "ちがって",
            "reading": "しゅるい が ちがって みえる。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Te-form",
            "text": "昨日と[違って]寒い。",
            "translation": "It's different from yesterday and is cold.",
            "kana": "ちがって",
            "reading": "きのう と ちがって さむい。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "それは[違わない]。",
            "translation": "That is not different (it's not wrong).",
            "kana": "ちがわない",
            "reading": "それ は ちがわない。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "意見は[違わない]はずだ。",
            "translation": "Opinions shouldn't be different.",
            "kana": "ちがわない",
            "reading": "いけん は ちがわない はず だ。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "前と[違わない]。",
            "translation": "It's not different from before.",
            "kana": "ちがわない",
            "reading": "まえ と ちがわない。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "どこも[違わない]。",
            "translation": "Nowhere is different.",
            "kana": "ちがわない",
            "reading": "どこ も ちがわない。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "答えが[違わない]か確認する。",
            "translation": "Check if the answer is not wrong.",
            "kana": "ちがわない",
            "reading": "こたえ が ちがわない か かくにん する。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "本物と[違わない]出来栄え。",
            "translation": "A result that is not different from the real thing.",
            "kana": "ちがわない",
            "reading": "ほんもの と ちがわない できばえ。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "何一つ[違わない]。",
            "translation": "Not a single thing is different.",
            "kana": "ちがわない",
            "reading": "なにひとつ ちがわない。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "以前と[違わない]風景。",
            "translation": "A landscape not different from before.",
            "kana": "ちがわない",
            "reading": "いぜん と ちがわない ふうけい。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "意味はそれほど[違わない]。",
            "translation": "The meanings aren't that different.",
            "kana": "ちがわない",
            "reading": "いみ は それほど ちがわない。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Negative (Nai)",
            "text": "双子だから[違わない]。",
            "translation": "They aren't different because they are twins.",
            "kana": "ちがわない",
            "reading": "ふたご だから ちがわない。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "答えが[違った]。",
            "translation": "The answer was different (wrong).",
            "kana": "ちがった",
            "reading": "こたえ が ちがった。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "誰かが[違った]？",
            "translation": "Was someone different?",
            "kana": "ちがった",
            "reading": "だれか が ちがった？"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "道が[違った]ので戻る。",
            "translation": "The path was wrong, so I'll go back.",
            "kana": "ちがった",
            "reading": "みち が ちがった ので もどる。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "予想が[違った]。",
            "translation": "The prediction was different (wrong).",
            "kana": "ちがった",
            "reading": "よそう が ちがった。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "やり方が[違った]ようだ。",
            "translation": "It seems the method was different.",
            "kana": "ちがった",
            "reading": "やりかた が ちがった よう だ。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "雰囲気がガラリと[違った]。",
            "translation": "The atmosphere was completely different.",
            "kana": "ちがった",
            "reading": "ふんいき が がらり と ちがった。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "話が[違った]じゃないか。",
            "translation": "The story was different, wasn't it?",
            "kana": "ちがった じゃない か。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "以前と[違った]点を探す。",
            "translation": "Look for points that were different from before.",
            "kana": "ちがった",
            "reading": "いぜん と ちがった てん を さがす。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "名前が[違った]ので驚いた。",
            "translation": "I was surprised because the name was different.",
            "kana": "ちがった",
            "reading": "なまえ が ちがった ので おどろいた。"
        },
        {
            "verb": "違う (chigau)",
            "tense": "Plain Past (Ta)",
            "text": "味が[違った]気がする。",
            "translation": "I feel like the taste was different.",
            "kana": "ちがった",
            "reading": "あじ が ちがった き が する。"
        }, {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "洗濯でセーターが[縮みます]。",
            "translation": "The sweater will shrink in the wash.",
            "kana": "ちぢみます",
            "reading": "せんたく で せーたー が ちぢみます。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "身が[縮みます]。",
            "translation": "I shrink (with fear/cold).",
            "kana": "ちぢみます",
            "reading": "み が ちぢみます。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "寿命が[縮みます]。",
            "translation": "One's lifespan shortens.",
            "kana": "ちぢみます",
            "reading": "じゅみょう が ちぢみます。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "布が[縮みます]か？",
            "translation": "Does the fabric shrink?",
            "kana": "ちぢみます",
            "reading": "ぬの が ちぢみます か？"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "寒さでゴムが[縮みます]。",
            "translation": "Rubber contracts (shrinks) due to the cold.",
            "kana": "ちぢみます",
            "reading": "さむさ で ごむ が ちぢみます。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "胃が[縮みます]。",
            "translation": "The stomach shrinks.",
            "kana": "ちぢみます",
            "reading": "い が ちぢみます。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "距離が[縮みます]。",
            "translation": "The distance shortens.",
            "kana": "ちぢみます",
            "reading": "きょり が ちぢみます。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "筋肉が[縮みます]。",
            "translation": "The muscles contract.",
            "kana": "ちぢみます",
            "reading": "きんにく が ちぢみます。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "背が[縮みます]。",
            "translation": "One's height shrinks.",
            "kana": "ちぢみます",
            "reading": "せ が ちぢみます。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Present (Masu)",
            "text": "乾燥で[縮みます]ね。",
            "translation": "It shrinks due to drying, doesn't it?",
            "kana": "ちぢみます",
            "reading": "かんそう で ちぢみます ね。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "シャツが[縮みました]。",
            "translation": "The shirt shrank.",
            "kana": "ちぢみました",
            "reading": "しゃつ が ちぢみました。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "寿命が[縮みました]よ。",
            "translation": "My life expectancy shortened (I was so scared).",
            "kana": "ちぢみました",
            "reading": "じゅみょう が ちぢみました よ。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "少し[縮みました]か？",
            "translation": "Did it shrink a little?",
            "kana": "ちぢみました",
            "reading": "すこし ちぢみました か？"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "期待で胸が[縮みました]。",
            "translation": "My chest tightened (shrank) with expectation.",
            "kana": "ちぢみました",
            "reading": "きたい で むね が ちぢみました。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "一気に[縮みました]。",
            "translation": "It shrank all at once.",
            "kana": "ちぢみました",
            "reading": "いっき に ちぢみました。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "点差が[縮みました]。",
            "translation": "The score gap narrowed (shrank).",
            "kana": "ちぢみました",
            "reading": "てんさ が ちぢみました。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "丈が[縮みました]。",
            "translation": "The length shrank.",
            "kana": "ちぢみました",
            "reading": "たけ が ちぢみました。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "恐ろしくて身が[縮みました]。",
            "translation": "I cringed (shrank) with fear.",
            "kana": "ちぢみました",
            "reading": "おそろしくて み が ちぢみました。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "洗ったら[縮みました]。",
            "translation": "It shrank when I washed it.",
            "kana": "ちぢみました",
            "reading": "あらったら ちぢみました。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Polite Past (Mashita)",
            "text": "予想以上に[縮みました]。",
            "translation": "It shrank more than expected.",
            "kana": "ちぢみました",
            "reading": "よそう いじょう に ちぢみました。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "セーターが[縮んで]しまった。",
            "translation": "The sweater unfortunately shrank.",
            "kana": "ちぢんで",
            "reading": "せーたー が ちぢんで しまった。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "身が[縮んで]動けない。",
            "translation": "I'm huddling (shrunk) and can't move.",
            "kana": "ちぢんで",
            "reading": "み が ちぢんで うごけない。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "布が[縮んで]固くなった。",
            "translation": "The cloth shrank and became stiff.",
            "kana": "ちぢんで",
            "reading": "ぬの が ちぢんで かたくなった。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "距離が[縮んで]きた。",
            "translation": "The distance has started to shorten.",
            "kana": "ちぢんで",
            "reading": "きょり が ちぢんで きた。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "寿命が[縮んで]も構わない。",
            "translation": "I don't mind even if it shortens my life.",
            "kana": "ちぢんで",
            "reading": "じゅみょう が ちぢんで も かまわない。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "乾燥して[縮んで]いる。",
            "translation": "It is dry and shrinking.",
            "kana": "ちぢんで",
            "reading": "かんそう して ちぢんで いる。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "筋肉が[縮んで]痛い。",
            "translation": "The muscle is contracted and hurts.",
            "kana": "ちぢんで",
            "reading": "きんにく が ちぢんで いたい。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "胃が[縮んで]食べられない。",
            "translation": "My stomach has shrunk and I can't eat.",
            "kana": "ちぢんで",
            "reading": "い が ちぢんで たべられない。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "小さく[縮んで]見える。",
            "translation": "It looks small and shrunken.",
            "kana": "ちぢんで",
            "reading": "ちいさく ちぢんで みえる。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Te-form",
            "text": "一気に[縮んで]びっくりした。",
            "translation": "I was surprised it shrank all at once.",
            "kana": "ちぢんで",
            "reading": "いっき に ちぢんで びっくり した。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "この素材は[縮まない]。",
            "translation": "This material doesn't shrink.",
            "kana": "ちぢまない",
            "reading": "この そざい は ちぢまない。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "寿命は[縮まない]よ。",
            "translation": "Your life won't be shortened.",
            "kana": "ちぢまない",
            "reading": "じゅみょう は ちぢまない よ。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "洗っても[縮まない]。",
            "translation": "It doesn't shrink even if you wash it.",
            "kana": "ちぢまない",
            "reading": "あらっても ちぢまない。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "なかなか点差が[縮まない]。",
            "translation": "The score gap just won't narrow.",
            "kana": "ちぢまない",
            "reading": "なかなか てんさ が ちぢまない。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "[縮まない]ように工夫する。",
            "translation": "Take measures so it doesn't shrink.",
            "kana": "ちぢまない",
            "reading": "ちぢまない ように くふう する。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "距離が全然[縮まない]。",
            "translation": "The distance doesn't shorten at all.",
            "kana": "ちぢまない",
            "reading": "きょり が ぜんぜん ちぢまない。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "寒くても[縮まない]。",
            "translation": "It doesn't contract even if it's cold.",
            "kana": "ちぢまない",
            "reading": "さむくても ちぢまない。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "胃はそんなにすぐ[縮まない]。",
            "translation": "The stomach doesn't shrink that quickly.",
            "kana": "ちぢまない",
            "reading": "い は そんなに すぐ ちぢまない。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "背が[縮まない]ように運動する。",
            "translation": "Exercise so your height doesn't shrink.",
            "kana": "ちぢまない",
            "reading": "せ が ちぢまない ように うんどう する。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Negative (Nai)",
            "text": "サイズが[縮まない]服。",
            "translation": "Clothes whose size doesn't shrink.",
            "kana": "ちぢまない",
            "reading": "さいず が ちぢまない ふく。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "丈がかなり[縮まった]。",
            "translation": "The length shrank considerably.",
            "kana": "ちぢんだ",
            "reading": "たけ が かなり ちぢんだ。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "寿命が[縮まった]気がした。",
            "translation": "I felt like my life expectancy shortened.",
            "kana": "ちぢんだ",
            "reading": "じゅみょう が ちぢんだ き が した。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "点差が[縮まった]。",
            "translation": "The score gap narrowed.",
            "kana": "ちぢんだ",
            "reading": "てんさ が ちぢんだ。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "洗ったらすごく[縮まった]。",
            "translation": "It shrank a lot when I washed it.",
            "kana": "ちぢんだ",
            "reading": "あらったら すごく ちぢんだ。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "寒さで身が[縮まった]。",
            "translation": "My body curled up (shrank) from the cold.",
            "kana": "ちぢんだ",
            "reading": "さむさ で み が ちぢんだ。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "筋肉が[縮まった]状態。",
            "translation": "A state where the muscle has contracted.",
            "kana": "ちぢんだ",
            "reading": "きんにく が ちぢんだ じょうたい。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "距離が少し[縮まった]。",
            "translation": "The distance shortened a little.",
            "kana": "ちぢんだ",
            "reading": "きょり が すこし ちぢんだ。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "胃が[縮まった]みたいだ。",
            "translation": "It seems my stomach has shrunk.",
            "kana": "ちぢんだ",
            "reading": "い が ちぢんだ みたい だ。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "背が[縮まった]と言われた。",
            "translation": "I was told my height shrank.",
            "kana": "ちぢんだ",
            "reading": "せ が ちぢんだ と いわれた。"
        },
        {
            "verb": "縮む (chijimu)",
            "tense": "Plain Past (Ta)",
            "text": "一晩で[縮まった]。",
            "translation": "It shrank overnight.",
            "kana": "ちぢんだ",
            "reading": "ひとばん で ちぢんだ。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "愛を[誓います]。",
            "translation": "I swear (vow) my love.",
            "kana": "ちかいます",
            "reading": "あい を ちかいます。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "神に[誓います]か？",
            "translation": "Do you swear to God?",
            "kana": "ちかいます",
            "reading": "かみ に ちかいます か？"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "復讐を[誓います]。",
            "translation": "I vow revenge.",
            "kana": "ちかいます",
            "reading": "ふくしゅう を ちかいます。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "心に[誓います]。",
            "translation": "I swear in my heart.",
            "kana": "ちかいます",
            "reading": "こころ に ちかいます。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "勝利を[誓います]。",
            "translation": "I vow victory.",
            "kana": "ちかいます",
            "reading": "しょうり を ちかいます。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "再会を[誓います]。",
            "translation": "I vow to meet again.",
            "kana": "ちかいます",
            "reading": "さいかい を ちかいます。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "忠誠を[誓います]。",
            "translation": "I swear loyalty.",
            "kana": "ちかいます",
            "reading": "ちゅうせい を ちかいます。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "真実を[誓います]。",
            "translation": "I swear the truth.",
            "kana": "ちかいます",
            "reading": "しんじつ を ちかいます。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "固く[誓います]。",
            "translation": "I firmly vow.",
            "kana": "ちかいます",
            "reading": "かたく ちかいます。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Present (Masu)",
            "text": "永遠を[誓います]。",
            "translation": "I vow forever.",
            "kana": "ちかいます",
            "reading": "えいえん を ちかいます。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "成功を[誓いました]。",
            "translation": "I vowed success.",
            "kana": "ちかいました",
            "reading": "せいこう を ちかいました。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "何を[誓いました]か？",
            "translation": "What did you vow?",
            "kana": "ちかいました",
            "reading": "なに を ちかいました か？"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "一生の愛を[誓いました]。",
            "translation": "I vowed lifelong love.",
            "kana": "ちかいました",
            "reading": "いっしょう の あい を ちかいました。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "心の中で[誓いました]。",
            "translation": "I vowed in my heart.",
            "kana": "ちかいました",
            "reading": "こころ の なか で ちかいました。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "二度としないと[誓いました]。",
            "translation": "I vowed never to do it again.",
            "kana": "ちかいました",
            "reading": "にど と しない と ちかいました。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "旗の下で[誓いました]。",
            "translation": "I swore under the flag.",
            "kana": "ちかいました",
            "reading": "はた の した で ちかいました。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "皆の前で[誓いました]。",
            "translation": "I vowed in front of everyone.",
            "kana": "ちかいました",
            "reading": "みんな の まえ で ちかいました。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "固い約束を[誓いました]。",
            "translation": "I swore a firm promise.",
            "kana": "ちかいました",
            "reading": "かたい やくそく を ちかいました。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "神聖な場所で[誓いました]。",
            "translation": "I vowed in a sacred place.",
            "kana": "ちかいました",
            "reading": "しんせいな ばしょ で ちかいました。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日、彼に[誓いました]。",
            "translation": "I swore it to him yesterday.",
            "kana": "ちかいました",
            "reading": "きのう、 かれ に ちかいました。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "勝利を[誓って]戦う。",
            "translation": "Fight having vowed victory.",
            "kana": "ちかって",
            "reading": "しょうり を ちかって たたかう。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "心に[誓って]実行する。",
            "translation": "Vow in your heart and carry it out.",
            "kana": "ちかって",
            "reading": "こころ に ちかって じっこう する。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "神に[誓って]本当です。",
            "translation": "I swear to God it's the truth.",
            "kana": "ちかって",
            "reading": "かみ に ちかって ほんとう です。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "愛を[誓って]結婚した。",
            "translation": "They married after vowing love.",
            "kana": "ちかって",
            "reading": "あい を ちかって けっこん した。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "復讐を[誓って]旅に出る。",
            "translation": "Go on a journey having vowed revenge.",
            "kana": "ちかって",
            "reading": "ふくしゅう を ちかって たび に でる。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "二度と負けないと[誓って]練習する。",
            "translation": "Practice having vowed never to lose again.",
            "kana": "ちかって",
            "reading": "にど と まけない と ちかって れんしゅう する。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "固く[誓って]離れない。",
            "translation": "Vow firmly and not leave.",
            "kana": "ちかって",
            "reading": "かたく ちかって はなれない。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "真実を[誓って]証言する。",
            "translation": "Testify having sworn to tell the truth.",
            "kana": "ちかって",
            "reading": "しんじつ を ちかって しょうげん する。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "再会を[誓って]別れた。",
            "translation": "They parted having vowed to meet again.",
            "kana": "ちかって",
            "reading": "さいかい を ちかって わかれた。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Te-form",
            "text": "何を[誓って]ここに来たの？",
            "translation": "What did you vow when you came here?",
            "kana": "ちかって",
            "reading": "なに を ちかって ここ に きた の？"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "何も[誓わない]。",
            "translation": "I won't vow anything.",
            "kana": "ちかわない",
            "reading": "なにも ちかわない。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "神には[誓わない]。",
            "translation": "I won't swear to God.",
            "kana": "ちかわない",
            "reading": "かみ に は ちかわない。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "復讐なんて[誓わない]ほうがいい。",
            "translation": "It is better not to vow something like revenge.",
            "kana": "ちかわない",
            "reading": "ふくしゅう なんて ちかわない ほう が いい。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "心に[誓わない]と続かない。",
            "translation": "It won't last unless you vow it in your heart.",
            "kana": "ちかわない",
            "reading": "こころ に ちかわない と つづかない。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "忠誠を[誓わない]兵士。",
            "translation": "A soldier who doesn't swear loyalty.",
            "kana": "ちかわない",
            "reading": "ちゅうせい を ちかわない へいし。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "愛を[誓わない]結婚もある。",
            "translation": "There are marriages where love is not vowed.",
            "kana": "ちかわない",
            "reading": "あい を ちかわない けっこん も ある。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "二度としないと[誓わない]のですか？",
            "translation": "Will you not vow never to do it again?",
            "kana": "ちかわない",
            "reading": "にど と しない と ちかわない の です か？"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "再会を[誓わない]で別れる。",
            "translation": "Part without vowing to meet again.",
            "kana": "ちかわない",
            "reading": "さいかい を ちかわない で わかれる。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "口先だけで[誓わない]。",
            "translation": "I won't vow with just words.",
            "kana": "ちかわない",
            "reading": "くちさき だけ で ちかわない。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Negative (Nai)",
            "text": "真実を[誓わない]つもり？",
            "translation": "Do you intend not to swear the truth?",
            "kana": "ちかわない",
            "reading": "しんじつ を ちかわない つもり？"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "成功を[誓った]。",
            "translation": "I vowed success.",
            "kana": "ちかった",
            "reading": "せいこう を ちかった。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "神に[誓った]？",
            "translation": "Did you swear to God?",
            "kana": "ちかった",
            "reading": "かみ に ちかった？"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "あの日[誓った]ことは忘れない。",
            "translation": "I won't forget what I vowed that day.",
            "kana": "ちかった",
            "reading": "あの ひ ちかった こと は わすれない。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "復讐を[誓った]目。",
            "translation": "Eyes that vowed revenge.",
            "kana": "ちかった",
            "reading": "ふくしゅう を ちかった め。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "永遠の愛を[誓った]二人。",
            "translation": "The two who vowed eternal love.",
            "kana": "ちかった",
            "reading": "えいえん の あい を ちかった ふたり。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "心に強く[誓った]。",
            "translation": "I strongly vowed in my heart.",
            "kana": "ちかった",
            "reading": "こころ に つよく ちかった。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "再会を[誓った]場所。",
            "translation": "The place where we vowed to meet again.",
            "kana": "ちかった",
            "reading": "さいかい を ちかった ばしょ。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "忠誠を[誓った]相手。",
            "translation": "The person to whom I swore loyalty.",
            "kana": "ちかった",
            "reading": "ちゅうせい を ちかった あいて。"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "誰に[誓った]の？",
            "translation": "To whom did you vow?",
            "kana": "ちかった",
            "reading": "だれ に ちかった の？"
        },
        {
            "verb": "誓う (chikau)",
            "tense": "Plain Past (Ta)",
            "text": "固く[誓った]約束だ。",
            "translation": "It is a firmly vowed promise.",
            "kana": "ちかった",
            "reading": "かたく ちかった やくそく だ。"
        }, {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "目的地に[近づきます]。",
            "translation": "I am approaching the destination.",
            "kana": "ちかづきます",
            "reading": "もくてきち に ちかづきます。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "試験が[近づきます]ね。",
            "translation": "The exam is drawing near, isn't it?",
            "kana": "ちかづきます",
            "reading": "しけん が ちかづきます ね。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "彼にそっと[近づきます]。",
            "translation": "I quietly approach him.",
            "kana": "ちかづきます",
            "reading": "かれ に そっと ちかづきます。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "完成に[近づきます]。",
            "translation": "It is approaching completion.",
            "kana": "ちかづきます",
            "reading": "かんせい に ちかづきます。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "冬が[近づきます]。",
            "translation": "Winter is approaching.",
            "kana": "ちかづきます",
            "reading": "ふゆ が ちかづきます。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "真相に[近づきます]。",
            "translation": "I am getting closer to the truth.",
            "kana": "ちかづきます",
            "reading": "しんそう に ちかづきます。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "理想に[近づきます]。",
            "translation": "I am getting closer to the ideal.",
            "kana": "ちかづきます",
            "reading": "りそう に ちかづきます。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "船が岸に[近づきます]。",
            "translation": "The ship is approaching the shore.",
            "kana": "ちかづきます",
            "reading": "ふね が きし に ちかづきます。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "目標に[近づきます]。",
            "translation": "I am approaching the goal.",
            "kana": "ちかづきます",
            "reading": "もくひょう に ちかづきます。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Present (Masu)",
            "text": "足音が[近づきます]。",
            "translation": "The sound of footsteps is getting closer.",
            "kana": "ちかづきます",
            "reading": "あしおと が ちかづきます。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "台風が[近づきました]。",
            "translation": "A typhoon approached.",
            "kana": "ちかづきました",
            "reading": "たいふう が ちかづきました。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "限界に[近づきました]。",
            "translation": "I approached my limit.",
            "kana": "ちかづきました",
            "reading": "げんかい に ちかづきました。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "そっと[近づきました]か？",
            "translation": "Did you approach quietly?",
            "kana": "ちかづきました",
            "reading": "そっと ちかづきました か？"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "答えに[近づきました]。",
            "translation": "I got closer to the answer.",
            "kana": "ちかづきました",
            "reading": "こたえ に ちかづきました。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "車が[近づきました]。",
            "translation": "A car approached.",
            "kana": "ちかづきました",
            "reading": "くるま が ちかづきました。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "駅に[近づきました]。",
            "translation": "We got closer to the station.",
            "kana": "ちかづきました",
            "reading": "えき に ちかづきました。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "春が[近づきました]ね。",
            "translation": "Spring has drawn near, hasn't it?",
            "kana": "ちかづきました",
            "reading": "はる が ちかづきました ね。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "夢に一歩[近づきました]。",
            "translation": "I took one step closer to my dream.",
            "kana": "ちかづきました",
            "reading": "ゆめ に いっぽ ちかづきました。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "誰かが後ろから[近づきました]。",
            "translation": "Someone approached from behind.",
            "kana": "ちかづきました",
            "reading": "だれか が うしろ から ちかづきました。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Polite Past (Mashita)",
            "text": "ようやく完成に[近づきました]。",
            "translation": "It finally approached completion.",
            "kana": "ちかづきました",
            "reading": "ようやく かんせい に ちかづきました。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "犬が[近づいて]きた。",
            "translation": "A dog came closer.",
            "kana": "ちかづいて",
            "reading": "いぬ が ちかづいて きた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "火に[近づいて]はいけない。",
            "translation": "You must not go near the fire.",
            "kana": "ちかづいて",
            "reading": "ひ に ちかづいて は いけない。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "顔を[近づけて]（近づいて）見る。",
            "translation": "Bring your face close and look.",
            "kana": "ちかづいて",
            "reading": "かお を ちかづいて みる。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "ゴールが[近づいて]わくわくする。",
            "translation": "The goal is getting closer and I'm excited.",
            "kana": "ちかづいて",
            "reading": "ごーる が ちかづいて わくわく する。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "そっと[近づいて]驚かす。",
            "translation": "Approach quietly and surprise them.",
            "kana": "ちかづいて",
            "reading": "そっと ちかづいて おどろかす。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "真相に[近づいて]いる気がする。",
            "translation": "I feel like I'm getting closer to the truth.",
            "kana": "ちかづいて",
            "reading": "しんそう に ちかづいて いる き が する。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "駅に[近づいて]アナウンスが流れた。",
            "translation": "As we neared the station, an announcement was made.",
            "kana": "ちかづいて",
            "reading": "えき に ちかづいて あなうんす が ながれた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "二人が[近づいて]座る。",
            "translation": "The two sit closer together.",
            "kana": "ちかづいて",
            "reading": "ふたり が ちかづいて すわる。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "冬が[近づいて]寒くなった。",
            "translation": "Winter approached and it became cold.",
            "kana": "ちかづいて",
            "reading": "ふゆ が ちかづいて さむくなった。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Te-form",
            "text": "目標に[近づいて]安心した。",
            "translation": "I felt relieved as I got closer to the goal.",
            "kana": "ちかづいて",
            "reading": "もくひょう に ちかづいて あんしん した。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "知らない人に[近づかない]。",
            "translation": "I don't go near strangers.",
            "kana": "ちかづかない",
            "reading": "しらない ひと に ちかづかない。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "なかなかゴールに[近づかない]。",
            "translation": "I'm not getting closer to the goal easily.",
            "kana": "ちかづかない",
            "reading": "なかなか ごーる に ちかづかない。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "危ないから[近づかない]で。",
            "translation": "It's dangerous, so don't go near.",
            "kana": "ちかづかない",
            "reading": "あぶない から ちかづかない で。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "真相にはまだ[近づかない]。",
            "translation": "We aren't near the truth yet.",
            "kana": "ちかづかない",
            "reading": "しんそう に は まだ ちかづかない。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "その犬には[近づかない]ほうがいい。",
            "translation": "It's better not to go near that dog.",
            "kana": "ちかづかない",
            "reading": "その いぬ に は ちかづかない ほう が いい。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "理想には全然[近づかない]。",
            "translation": "I'm not getting close to the ideal at all.",
            "kana": "ちかづかない",
            "reading": "りそう に は ぜんぜん ちかづかない。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "台風は[近づかない]らしい。",
            "translation": "I heard the typhoon won't approach.",
            "kana": "ちかづかない",
            "reading": "たいふう は ちかづかない らしい。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "あまり[近づかない]ようにする。",
            "translation": "I will try not to get too close.",
            "kana": "ちかづかない",
            "reading": "あまり ちかづかない ように する。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "完成にはまだ[近づかない]。",
            "translation": "It's not near completion yet.",
            "kana": "ちかづかない",
            "reading": "かんせい に は まだ ちかづかない。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Negative (Nai)",
            "text": "誰にも[近づかない]で一人でいる。",
            "translation": "Stay alone without going near anyone.",
            "kana": "ちかづかない",
            "reading": "だれ に も ちかづかない で ひとり で いる。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "猫が[近づいた]。",
            "translation": "A cat approached.",
            "kana": "ちかづいた",
            "reading": "ねこ が ちかづいた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "試験が[近づいた]ので勉強する。",
            "translation": "Since the exam has drawn near, I will study.",
            "kana": "ちかづいた",
            "reading": "しけん が ちかづいた ので べんきょう する。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "目的地に[近づいた]。",
            "translation": "I approached the destination.",
            "kana": "ちかづいた",
            "reading": "もくてきち に ちかづいた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "一歩、夢に[近づいた]。",
            "translation": "I got one step closer to my dream.",
            "kana": "ちかづいた",
            "reading": "いっぽ、 ゆめ に ちかづいた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "車が急に[近づいた]。",
            "translation": "A car suddenly approached.",
            "kana": "ちかづいた",
            "reading": "くるま が きゅう に ちかづいた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "完成にかなり[近づいた]。",
            "translation": "It got quite close to completion.",
            "kana": "ちかづいた",
            "reading": "かんせい に かなり ちかづいた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "真相に少し[近づいた]。",
            "translation": "I got a little closer to the truth.",
            "kana": "ちかづいた",
            "reading": "しんそう に すこし ちかづいた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "足音がだんだん[近づいた]。",
            "translation": "The footsteps gradually got closer.",
            "kana": "ちかづいた",
            "reading": "あしおと が だんだん ちかづいた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "二人、距離が[近づいた]。",
            "translation": "The two of them got closer.",
            "kana": "ちかづいた",
            "reading": "ふたり、 きょり が ちかづいた。"
        },
        {
            "verb": "近づく (chikazuku)",
            "tense": "Plain Past (Ta)",
            "text": "誰が[近づいた]の？",
            "translation": "Who approached?",
            "kana": "ちかづいた",
            "reading": "だれ が ちかづいた の？"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "桜が[散ります]。",
            "translation": "The cherry blossoms fall (scatter).",
            "kana": "ちります",
            "reading": "さくら が ちります。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "気が[散ります]。",
            "translation": "I get distracted (my attention scatters).",
            "kana": "ちります",
            "reading": "き が ちります。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "火花が[散ります]。",
            "translation": "Sparks fly (scatter).",
            "kana": "ちります",
            "reading": "ひばな が ちります。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "雲が[散ります]。",
            "translation": "The clouds disperse.",
            "kana": "ちります",
            "reading": "くも が ちります。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "噂が[広まります]。",
            "translation": "Rumors spread (scatter).",
            "kana": "ひろまります",
            "reading": "うわさ が ひろまります。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "敵が[散ります]。",
            "translation": "The enemy scatters.",
            "kana": "ちります",
            "reading": "てき が ちります。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "葉が[散ります]か？",
            "translation": "Do the leaves fall?",
            "kana": "ちります",
            "reading": "は が ちります か？"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "一気に[散ります]。",
            "translation": "They fall (scatter) all at once.",
            "kana": "ちります",
            "reading": "いっき に ちります。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "夢が[散ります]。",
            "translation": "Dreams are shattered (scattered).",
            "kana": "ちります",
            "reading": "ゆめ が ちります。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Present (Masu)",
            "text": "蜘蛛の子を散らすように[散ります]。",
            "translation": "They scatter like baby spiders.",
            "kana": "ちります",
            "reading": "くものこ を ちらす ように ちります。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "花が[散りました]。",
            "translation": "The flowers fell.",
            "kana": "ちりました",
            "reading": "はな が ちりました。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "気が[散りました]か？",
            "translation": "Were you distracted?",
            "kana": "ちりました",
            "reading": "き が ちりました か？"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "霧が[散りました]。",
            "translation": "The fog dispersed.",
            "kana": "ちりました",
            "reading": "きり が ちりました。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "火花が激しく[散りました]。",
            "translation": "Sparks flew violently.",
            "kana": "ちりました",
            "reading": "ひばな が はげしく ちりました。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "観客が[散りました]。",
            "translation": "The audience dispersed.",
            "kana": "ちりました",
            "reading": "かんきゃく が ちりました。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "夢と[散りました]。",
            "translation": "It ended in a dream (vanished).",
            "kana": "ちりました",
            "reading": "ゆめ と ちりました。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "インクが[散りました]。",
            "translation": "The ink splattered (scattered).",
            "kana": "ちりました",
            "reading": "いんく が ちりました。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "光が[散りました]。",
            "translation": "The light scattered.",
            "kana": "ちりました",
            "reading": "ひかり が ちりました。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "一瞬で[散りました]。",
            "translation": "It scattered in an instant.",
            "kana": "ちりました",
            "reading": "いっしゅん で ちりました。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Polite Past (Mashita)",
            "text": "何が[散りました]か？",
            "translation": "What scattered?",
            "kana": "ちりました",
            "reading": "なに が ちりました か？"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "花が[散って]きれいだ。",
            "translation": "The flowers have fallen and it's beautiful.",
            "kana": "ちって",
            "reading": "はな が ちって きれいだ。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "気が[散って]集中できない。",
            "translation": "I'm distracted and can't concentrate.",
            "kana": "ちって",
            "reading": "き が ちって しゅうちゅう できない。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "雲が[散って]晴れてきた。",
            "translation": "The clouds dispersed and it cleared up.",
            "kana": "ちって",
            "reading": "くも が ちって はれて きた。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "火花が[散って]危ない。",
            "translation": "Sparks are flying and it's dangerous.",
            "kana": "ちって",
            "reading": "ひばな が ちって あぶない。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "夢が[散って]悲しい。",
            "translation": "My dreams are shattered and I'm sad.",
            "kana": "ちって",
            "reading": "ゆめ が ちって かなしい。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "インクが[散って]汚れた。",
            "translation": "The ink splattered and got dirty.",
            "kana": "ちって",
            "reading": "いんく が ちって よごれた。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "人が[散って]いく。",
            "translation": "People are scattering away.",
            "kana": "ちって",
            "reading": "ひと が ちって いく。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "霧が[散って]前が見える。",
            "translation": "The fog dispersed and I can see ahead.",
            "kana": "ちって",
            "reading": "きり が ちって まえ が みえる。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "一気に[散って]しまった。",
            "translation": "They unfortunately scattered all at once.",
            "kana": "ちって",
            "reading": "いっき に ちって しまった。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Te-form",
            "text": "四方に[散って]探す。",
            "translation": "Scatter in all directions and search.",
            "kana": "ちって",
            "reading": "しほう に ちって さがす。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ花は[散らない]。",
            "translation": "The flowers haven't fallen yet.",
            "kana": "ちらない",
            "reading": "まだ はな は ちらない。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "気が[散らない]ようにする。",
            "translation": "I will try not to get distracted.",
            "kana": "ちらない",
            "reading": "き が ちらない ように する。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "噂は簡単には[散らない]。",
            "translation": "Rumors don't disperse easily.",
            "kana": "ちらない",
            "reading": "うわさ は かんたん に は ちらない。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "火花は[散らない]はずだ。",
            "translation": "Sparks shouldn't fly.",
            "kana": "ちらない",
            "reading": "ひばな は ちらない はず だ。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "雲が[ちらない]。",
            "translation": "The clouds don't disperse.",
            "kana": "ちらない",
            "reading": "くも が ちらない。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "夢はまだ[散らない]。",
            "translation": "The dream isn't shattered yet.",
            "kana": "ちらない",
            "reading": "ゆめ は まだ ちらない。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "一箇所にいて[散らない]。",
            "translation": "Stay in one place and don't scatter.",
            "kana": "ちらない",
            "reading": "いっかしょ に いて ちらない。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "インクが[ちらない]ペン。",
            "translation": "A pen that doesn't splatter ink.",
            "kana": "ちらない",
            "reading": "いんく が ちらない ぺん。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "霧が[ちらない]と困る。",
            "translation": "It's a problem if the fog doesn't disperse.",
            "kana": "ちらない",
            "reading": "きり が ちらない と こまる。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Negative (Nai)",
            "text": "光が[ちらない]ように遮る。",
            "translation": "Block the light so it doesn't scatter.",
            "kana": "ちらない",
            "reading": "ひかり が ちらない ように さえぎる。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "桜が[散った]。",
            "translation": "The cherry blossoms fell.",
            "kana": "ちった",
            "reading": "さくら が ちった。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "気が[散った]。",
            "translation": "I got distracted.",
            "kana": "ちった",
            "reading": "き が ちった。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "雲が[散った]。",
            "translation": "The clouds dispersed.",
            "kana": "ちった",
            "reading": "くも が ちった。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "火花が[散った]。",
            "translation": "Sparks flew.",
            "kana": "ちった",
            "reading": "ひばな が ちった。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "観客が蜘蛛の子を散らすように[散った]。",
            "translation": "The audience scattered in all directions.",
            "kana": "ちった",
            "reading": "かんきゃく が くものこ を ちらす ように ちった。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "夢がはかなく[散った]。",
            "translation": "The dream was fleetingly shattered.",
            "kana": "ちった",
            "reading": "ゆめ が はかなく ちった。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "インクが[散った]跡。",
            "translation": "The mark where ink splattered.",
            "kana": "ちった",
            "reading": "いんく が ちった あと。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "一気に[散った]ね。",
            "translation": "They scattered all at once, didn't they?",
            "kana": "ちった",
            "reading": "いっき に ちった ね。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "光が乱反射して[散った]。",
            "translation": "The light was diffusely reflected and scattered.",
            "kana": "ちった",
            "reading": "ひかり が らんはんしゃ して ちった。"
        },
        {
            "verb": "散る (chiru)",
            "tense": "Plain Past (Ta)",
            "text": "彼は戦場に[散った]。",
            "translation": "He perished on the battlefield.",
            "kana": "ちった",
            "reading": "かれ は せんじょう に ちった。"
        }, {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "期待を[抱きます]。",
            "translation": "I hold expectations.",
            "kana": "だきます",
            "reading": "きたい を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "疑問を[抱きます]。",
            "translation": "I harbor doubts.",
            "kana": "だきます",
            "reading": "ぎもん を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "不安を[抱きます]。",
            "translation": "I feel uneasy.",
            "kana": "だきます",
            "reading": "ふあん を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "野心を[抱きます]。",
            "translation": "I harbor ambition.",
            "kana": "だきます",
            "reading": "やしん を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "興味を[抱きます]。",
            "translation": "I have an interest.",
            "kana": "だきます",
            "reading": "きょうみ を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "恋心を[抱きます]。",
            "translation": "I have feelings of love.",
            "kana": "だきます",
            "reading": "こいごころ を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "反感を[抱きます]。",
            "translation": "I feel antipathy.",
            "kana": "だきます",
            "reading": "はんかん を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "理想を[抱きます]。",
            "translation": "I hold an ideal.",
            "kana": "だきます",
            "reading": "りそう を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "恐怖を[抱きます]。",
            "translation": "I feel fear.",
            "kana": "だきます",
            "reading": "きょうふ を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Present (Masu)",
            "text": "夢を[抱きます]。",
            "translation": "I harbor a dream.",
            "kana": "だきます",
            "reading": "ゆめ を だきます。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "殺意を[抱きました]。",
            "translation": "I harbored murderous intent.",
            "kana": "だきました",
            "reading": "さつい を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "不信感を[抱きました]。",
            "translation": "I felt a sense of distrust.",
            "kana": "だきました",
            "reading": "ふしんかん を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "強い願いを[抱きました]。",
            "translation": "I held a strong wish.",
            "kana": "だきました",
            "reading": "つよい ねがい を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "恨みを[抱きました]。",
            "translation": "I held a grudge.",
            "kana": "だきました",
            "reading": "うらみ を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "好意を[抱きました]。",
            "translation": "I felt a liking for someone.",
            "kana": "だきました",
            "reading": "こうい を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "希望を[抱きました]。",
            "translation": "I held onto hope.",
            "kana": "だきました",
            "reading": "きぼう を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "違和感を[抱きました]。",
            "translation": "I felt something was wrong.",
            "kana": "だきました",
            "reading": "いわかん を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "劣等感を[抱きました]。",
            "translation": "I felt an inferiority complex.",
            "kana": "だきました",
            "reading": "れっとうかん を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "親しみを[抱きました]。",
            "translation": "I felt a sense of familiarity.",
            "kana": "だきました",
            "reading": "したしみ を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Polite Past (Mashita)",
            "text": "情熱を[抱きました]。",
            "translation": "I felt passion.",
            "kana": "だきました",
            "reading": "じょうねつ を だきました。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "大志を[抱いて]生きる。",
            "translation": "Live with great ambition.",
            "kana": "だいて",
            "reading": "たいし を だいて いきる。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "信念を[抱いて]戦う。",
            "translation": "Fight while holding onto your beliefs.",
            "kana": "だいて",
            "reading": "しんねん を だいて たたかう。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "疑問を[抱いて]調査する。",
            "translation": "Investigate with doubts in mind.",
            "kana": "だいて",
            "reading": "ぎもん を だいて ちょうさ する。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "不安を[抱いて]待つ。",
            "translation": "Wait with anxiety.",
            "kana": "だいて",
            "reading": "ふあん を だいて まつ。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "期待を[抱いて]待機する。",
            "translation": "Wait with expectation.",
            "kana": "だいて",
            "reading": "きたい を だいて たいき する。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "恋心を[抱いて]しまった。",
            "translation": "I ended up having feelings of love.",
            "kana": "だいて",
            "reading": "こいごころ を だいて しまった。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "憎しみを[抱いて]はいけない。",
            "translation": "You must not harbor hatred.",
            "kana": "だいて",
            "reading": "にくしみ を だいて は いけない。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "夢を[抱いて]努力する。",
            "translation": "Strive while holding onto a dream.",
            "kana": "だいて",
            "reading": "ゆめ を だいて どりょく する。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "誇りを[抱いて]働く。",
            "translation": "Work with pride.",
            "kana": "だいて",
            "reading": "ほこり を だいて はたらく。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Te-form",
            "text": "希望を[抱いて]進む。",
            "translation": "Move forward with hope.",
            "kana": "だいて",
            "reading": "きぼう を だいて すすむ。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "悪意は[抱かない]。",
            "translation": "I don't harbor ill will.",
            "kana": "だかない",
            "reading": "あくい は だかない。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "偏見を[抱かない]ようにする。",
            "translation": "I will try not to have prejudices.",
            "kana": "だかない",
            "reading": "へんけん を だかない ように する。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "恨みは[抱かない]主義だ。",
            "translation": "It's my principle not to hold grudges.",
            "kana": "だかない",
            "reading": "うらみ は だかない しゅぎ だ。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "幻想を[抱かない]ほうがいい。",
            "translation": "It's better not to have illusions.",
            "kana": "だかない",
            "reading": "げんそう を だかない ほう が いい。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "敵意を[抱かない]でください。",
            "translation": "Please don't feel hostile.",
            "kana": "だかない",
            "reading": "てきい を だかない で ください。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "あまり期待を[抱かない]。",
            "translation": "I don't have much expectation.",
            "kana": "だかない",
            "reading": "あまり きたい を だかない。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "不安を[抱かない]はずがない。",
            "translation": "It's impossible not to feel anxious.",
            "kana": "だかない",
            "reading": "ふあん を だかない はず が ない。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "何の疑問も[抱かない]。",
            "translation": "I don't have any doubts.",
            "kana": "だかない",
            "reading": "なん の ぎもん も だかない。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "劣等感を[抱かない]人。",
            "translation": "A person who doesn't feel inferior.",
            "kana": "だかない",
            "reading": "れっとうかん を だかない ひと。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Negative (Nai)",
            "text": "執着を[抱かない]。",
            "translation": "I don't have an attachment.",
            "kana": "だかない",
            "reading": "しゅうちゃく を だかない。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "彼は野望を[抱いた]。",
            "translation": "He harbored an ambition.",
            "kana": "だいた",
            "reading": "かれ は やぼう を だいた。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "強い憤りを[抱いた]。",
            "translation": "I felt a strong indignation.",
            "kana": "だいた",
            "reading": "つよい いきどおり を だいた。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "誰が殺意を[抱いた]のか？",
            "translation": "Who harbored murderous intent?",
            "kana": "だいた",
            "reading": "だれ が さつい を だいた の か？"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "一瞬、不信感を[抱いた]。",
            "translation": "I felt a sense of distrust for a moment.",
            "kana": "だいた",
            "reading": "いっしゅん、 ふしんかん を だいた。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "その言葉に感銘を[抱いた]。",
            "translation": "I was deeply impressed by those words.",
            "kana": "だいた",
            "reading": "その ことば に かんめい を だいた。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "彼女に憧れを[抱いた]。",
            "translation": "I felt an admiration for her.",
            "kana": "だいた",
            "reading": "かのじょ に あこがれ を だいた。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "危機感を[抱いた]。",
            "translation": "I felt a sense of crisis.",
            "kana": "だいた",
            "reading": "ききかん を だいた。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "将来に不安を[抱いた]。",
            "translation": "I felt anxious about the future.",
            "kana": "だいた",
            "reading": "しょうらい に ふあん を だいた。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "不思議な感情を[抱いた]。",
            "translation": "I felt a strange emotion.",
            "kana": "だいた",
            "reading": "ふしぎな かんじょう を だいた。"
        },
        {
            "verb": "抱く (daku)",
            "tense": "Plain Past (Ta)",
            "text": "希望を[抱いた]人は多い。",
            "translation": "There are many people who held hope.",
            "kana": "だいた",
            "reading": "きぼう を だいた ひと は おおい。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "人を[騙します]。",
            "translation": "I trick people.",
            "kana": "だまします",
            "reading": "ひと を だまします。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "敵を[騙します]。",
            "translation": "I deceive the enemy.",
            "kana": "だまします",
            "reading": "てき を だまします。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "子供を[騙します]か？",
            "translation": "Do you trick children?",
            "kana": "だまします",
            "reading": "こども を だまします か？"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "言葉で[騙します]。",
            "translation": "I deceive with words.",
            "kana": "だまします",
            "reading": "ことば で だまします。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "自分を[騙します]。",
            "translation": "I deceive myself.",
            "kana": "だまします",
            "reading": "じぶん を だまします。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "巧妙に[騙します]。",
            "translation": "I deceive skillfully.",
            "kana": "だまします",
            "reading": "こうみょう に だまします。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "世間を[騙します]。",
            "translation": "I deceive the world.",
            "kana": "だまします",
            "reading": "せけん を だまします。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "偽物で[騙します]。",
            "translation": "I deceive with a fake.",
            "kana": "だまします",
            "reading": "にせもの で だまします。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "笑顔で[騙します]。",
            "translation": "I deceive with a smile.",
            "kana": "だまします",
            "reading": "えがお で だまします。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Present (Masu)",
            "text": "簡単に[騙します]ね。",
            "translation": "You trick (them) easily, don't you?",
            "kana": "だまします",
            "reading": "かんたん に だまします ね。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "悪い奴に[騙されました]。",
            "translation": "I was tricked by a bad person.",
            "kana": "だまされました",
            "reading": "わるい やつ に だまされました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "お金を[騙し取りました]。",
            "translation": "They swindled the money.",
            "kana": "だましとりました",
            "reading": "おかね を だましとりました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "嘘で[騙しました]。",
            "translation": "I deceived them with a lie.",
            "kana": "だましました",
            "reading": "うそ で だましました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "すっかり[騙されました]。",
            "translation": "I was completely fooled.",
            "kana": "だまされました",
            "reading": "すっかり だまされました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "彼を[騙しました]か？",
            "translation": "Did you trick him?",
            "kana": "だましました",
            "reading": "かれ を だましました か？"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "偽装して[騙しました]。",
            "translation": "I disguised it and deceived them.",
            "kana": "だましました",
            "reading": "ぎそう して だましました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "誰が[騙しました]か？",
            "translation": "Who did the tricking?",
            "kana": "だましました",
            "reading": "だれ が だましました か？"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "一瞬で[騙されました]。",
            "translation": "I was tricked in an instant.",
            "kana": "だまされました",
            "reading": "いっしゅん で だまされました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "老人を[騙しました]。",
            "translation": "They tricked an elderly person.",
            "kana": "だましました",
            "reading": "ろうじん を だましました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Polite Past (Mashita)",
            "text": "まんまと[騙されました]ね。",
            "translation": "You were successfully fooled, weren't you?",
            "kana": "だまされました",
            "reading": "まんまと だまされました ね。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "人を[騙して]はいけない。",
            "translation": "You must not trick people.",
            "kana": "だまして",
            "reading": "ひと を だまして は いけない。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "自分を[騙して]までやるな。",
            "translation": "Don't do it even by deceiving yourself.",
            "kana": "だまして",
            "reading": "じぶん を だまして まで やるな。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "敵を[騙して]勝つ。",
            "translation": "Win by deceiving the enemy.",
            "kana": "だまして",
            "reading": "てき を だまして かつ。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "巧みに[騙して]連れ出す。",
            "translation": "Skillfully deceive and take (someone) out.",
            "kana": "だまして",
            "reading": "たくみ に だまして つれだす。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "言葉を濁して[騙して]いる。",
            "translation": "They are being vague and deceiving.",
            "kana": "だまして",
            "reading": "ことば を にごして だまして いる。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "金銭を[騙し取って]逃げる。",
            "translation": "Swindle money and run away.",
            "kana": "だましとって",
            "reading": "きんせん を だましとって にげる。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "平気で[騙して]くる。",
            "translation": "They trick you without a second thought.",
            "kana": "だまして",
            "reading": "へいき で だまして くる。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "子供を[騙して]薬を飲ませる。",
            "translation": "Trick the child into taking medicine.",
            "kana": "だまして",
            "reading": "こども を だまして くすり を のませる。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "世間を[騙して]儲ける。",
            "translation": "Deceive the world and profit.",
            "kana": "だまして",
            "reading": "せけん を だまして もうける。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Te-form",
            "text": "嘘を[騙して]通す。",
            "translation": "Maintain a lie by deceiving.",
            "kana": "だまして",
            "reading": "うそ を だまして とおす。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "私は誰も[騙さない]。",
            "translation": "I don't trick anyone.",
            "kana": "だまさない",
            "reading": "わたし は だれ も だまさない。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "決して[騙さない]と誓う。",
            "translation": "I swear I will never deceive.",
            "kana": "だまさない",
            "reading": "けっして だまさない と ちかう。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "もう二度と[騙さない]で。",
            "translation": "Please don't trick me ever again.",
            "kana": "だまさない",
            "reading": "もう にど と だまさない で。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "自分だけは[騙さない]。",
            "translation": "I won't deceive only myself.",
            "kana": "だまさない",
            "reading": "じぶん だけ は だまさない。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "簡単に[騙さない]ように注意する。",
            "translation": "Be careful not to be easily tricked.",
            "kana": "だまさない",
            "reading": "かんたん に だまさない ように ちゅうい する。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "誰も[騙さない]正直な人。",
            "translation": "An honest person who tricks no one.",
            "kana": "だまさない",
            "reading": "だれ も だまさない しょうじきな ひと。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "客を[騙さない]商売。",
            "translation": "A business that doesn't trick customers.",
            "kana": "だまさない",
            "reading": "きゃく を だまさない しょうばい。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "悪いことは[騙さない]。",
            "translation": "I don't deceive about bad things.",
            "kana": "だまさない",
            "reading": "わるい こと は だまさない。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "味方を[騙さない]でくれ。",
            "translation": "Please don't deceive your allies.",
            "kana": "だまさない",
            "reading": "みかた を だまさない で くれ。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Negative (Nai)",
            "text": "嘘で[騙さない]。",
            "translation": "I don't deceive with lies.",
            "kana": "だまさない",
            "reading": "うそ で だまさない。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "あいつが俺を[騙した]。",
            "translation": "That guy tricked me.",
            "kana": "だました",
            "reading": "あいつ が おれ を だました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "巧妙に世間を[騙した]。",
            "translation": "They skillfully deceived the world.",
            "kana": "だました",
            "reading": "こうみょう に せけん を だました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "誰が彼を[騙した]んだ？",
            "translation": "Who was it that tricked him?",
            "kana": "だました",
            "reading": "だれ が かれ を だました んだ？"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "まんまと[騙した]ぞ。",
            "translation": "I successfully tricked them.",
            "kana": "だました",
            "reading": "まんまと だました ぞ。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "嘘をついて[騙した]罪。",
            "translation": "The sin of lying and deceiving.",
            "kana": "だました",
            "reading": "うそ を ついて だました つみ。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "一瞬の隙に[騙した]。",
            "translation": "I tricked them in a split second.",
            "kana": "だました",
            "reading": "いっしゅん の すき に だました。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "みんなを[騙した]報いだ。",
            "translation": "It's the retribution for tricking everyone.",
            "kana": "だました",
            "reading": "みんな を だました むくい だ。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "親友を[騙した]ことが悔しい。",
            "translation": "I regret tricking my best friend.",
            "kana": "だました",
            "reading": "しんゆう を だました こと が くやしい。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "笑顔で[騙した]んだね。",
            "translation": "You tricked them with a smile, didn't you?",
            "kana": "だました",
            "reading": "えがお で だました んだ ね。"
        },
        {
            "verb": "騙す (damasu)",
            "tense": "Plain Past (Ta)",
            "text": "本物だと[騙した]。",
            "translation": "They tricked (them) into thinking it was real.",
            "kana": "だました",
            "reading": "ほんもの だ と だました。"
        }, {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "ゴミを[出します]。",
            "translation": "I will take out the trash.",
            "kana": "だします",
            "reading": "ごみ を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "結論を[出します]。",
            "translation": "I will reach a conclusion.",
            "kana": "だします",
            "reading": "けつろん を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "手紙を[出します]。",
            "translation": "I will mail a letter.",
            "kana": "だします",
            "reading": "てがみ を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "本を[出します]。",
            "translation": "I will publish a book.",
            "kana": "だします",
            "reading": "ほん を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "答えを[出します]。",
            "translation": "I will give the answer.",
            "kana": "だします",
            "reading": "こたえ を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "熱を[出します]。",
            "translation": "I will run a fever.",
            "kana": "だします",
            "reading": "ねつ を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "案を[出します]。",
            "translation": "I will propose an idea.",
            "kana": "だします",
            "reading": "あん を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "力を[出します]。",
            "translation": "I will put forth effort.",
            "kana": "だします",
            "reading": "ちから を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "大きな声を[出します]。",
            "translation": "I will speak in a loud voice.",
            "kana": "だします",
            "reading": "おおきな こえ を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Present (Masu)",
            "text": "宿題を[出します]。",
            "translation": "I will hand in my homework.",
            "kana": "だします",
            "reading": "しゅくだい を だします。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "財布を[出しました]。",
            "translation": "I took out my wallet.",
            "kana": "だしました",
            "reading": "さいふ を だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "新製品を[出しました]。",
            "translation": "We released a new product.",
            "kana": "だしました",
            "reading": "しんせいひん を だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "条件を[出しました]。",
            "translation": "I set out the conditions.",
            "kana": "だしました",
            "reading": "じょうけん を だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "勇気を[出しました]。",
            "translation": "I summoned my courage.",
            "kana": "だしました",
            "reading": "ゆうき を だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "結果を[出しました]。",
            "translation": "I produced results.",
            "kana": "だしました",
            "reading": "けっか を だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "指示を[出しました]。",
            "translation": "I issued instructions.",
            "kana": "だしました",
            "reading": "しじ を だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "スピードを[出しました]。",
            "translation": "I picked up speed.",
            "kana": "だしました",
            "reading": "すぴーど を だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "クリーニングに[出しました]。",
            "translation": "I sent it to the dry cleaners.",
            "kana": "だしました",
            "reading": "くりーにんぐ に だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "顔を[出しました]。",
            "translation": "I showed my face.",
            "kana": "だしました",
            "reading": "かお を だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Polite Past (Mashita)",
            "text": "お茶を[出しました]。",
            "translation": "I served tea.",
            "kana": "だしました",
            "reading": "おちゃ を だしました。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "手を[出して]ください。",
            "translation": "Please hold out your hand.",
            "kana": "だして",
            "reading": "て を だして ください。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "お腹を[出して]寝る。",
            "translation": "Sleep with your belly exposed.",
            "kana": "だして",
            "reading": "おなか を だして ねる。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "名前を[出して]呼ぶ。",
            "translation": "Call out the name.",
            "kana": "だして",
            "reading": "なまえ を だして よぶ。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "火を[出して]料理する。",
            "translation": "Produce fire and cook.",
            "kana": "だして",
            "reading": "ひ を だして りょうり する。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "本音を[出して]話す。",
            "translation": "Speak your true feelings.",
            "kana": "だして",
            "reading": "ほんね を だして はなす。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "舌を[出して]笑う。",
            "translation": "Stick out your tongue and laugh.",
            "kana": "だして",
            "reading": "した を だして わらう。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "店を[出して]商売する。",
            "translation": "Open a shop and do business.",
            "kana": "だして",
            "reading": "みせ を だして しょうばい する。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "船を[出して]海へ行く。",
            "translation": "Take out the boat and go to sea.",
            "kana": "だして",
            "reading": "ふね を だして うみ へ いく。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "広告を[出して]集客する。",
            "translation": "Put out an ad and attract customers.",
            "kana": "だして",
            "reading": "こうこく を だして しゅうきゃく する。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Te-form",
            "text": "勇気を[出して]告白する。",
            "translation": "Summon courage and confess.",
            "kana": "だして",
            "reading": "ゆうき を だして こくはく する。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "ボロを[出さない]。",
            "translation": "I won't show my flaws.",
            "kana": "ださない",
            "reading": "ぼろ を ださない。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "口を[出さない]で。",
            "translation": "Don't interfere.",
            "kana": "ださない",
            "reading": "くち を ださない で。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "結論を[出さない]まま終わる。",
            "translation": "End without reaching a conclusion.",
            "kana": "ださない",
            "reading": "けつろん を ださない まま おわる。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "一歩も外に[出さない]。",
            "translation": "I won't let you take a single step outside.",
            "kana": "ださない",
            "reading": "いっぽ も そと に ださない。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "本を[出さない]作家。",
            "translation": "An author who doesn't publish books.",
            "kana": "ださない",
            "reading": "ほん を ださない さっか。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "指示を[出さない]リーダー。",
            "translation": "A leader who doesn't give instructions.",
            "kana": "ださない",
            "reading": "しじ を ださない りーだー。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "答えを[出さない]問題。",
            "translation": "A problem that doesn't yield an answer.",
            "kana": "ださない",
            "reading": "こたえ を ださない もんだい。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "音を[出さない]ように歩く。",
            "translation": "Walk so as not to make a sound.",
            "kana": "ださない",
            "reading": "お吐き を ださない ように あるく。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "熱を[出さない]ように気をつける。",
            "translation": "Be careful not to run a fever.",
            "kana": "ださない",
            "reading": "ねつ を ださない ように き を つける。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Negative (Nai)",
            "text": "スピードを[出さない]で運転する。",
            "translation": "Drive without speeding.",
            "kana": "ださない",
            "reading": "すぴーど を ださない で うんてん する。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "宿題を[出した]。",
            "translation": "I handed in the homework.",
            "kana": "だした",
            "reading": "しゅくだい を だした。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "答えを[出した]。",
            "translation": "I gave the answer.",
            "kana": "だした",
            "reading": "こたえ を だした。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "結論を[出した]。",
            "translation": "I reached a conclusion.",
            "kana": "だした",
            "reading": "けつろん を だした。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "本を[出した]。",
            "translation": "I published a book.",
            "kana": "だした",
            "reading": "ほん を だした。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "ゴミを[出した]？",
            "translation": "Did you take out the trash?",
            "kana": "だした",
            "reading": "ごみ を だした？"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "勇気を[出した]。",
            "translation": "I summoned my courage.",
            "kana": "だした",
            "reading": "ゆうき を だした。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "スピードを[出した]。",
            "translation": "I increased the speed.",
            "kana": "だした",
            "reading": "すぴーど を だした。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "大きな声を[出した]。",
            "translation": "I raised my voice.",
            "kana": "だした",
            "reading": "おおきな こえ を だした。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "手紙を[出した]。",
            "translation": "I mailed the letter.",
            "kana": "だした",
            "reading": "てがみ を だした。"
        },
        {
            "verb": "出す (dasu)",
            "tense": "Plain Past (Ta)",
            "text": "熱を[出した]。",
            "translation": "I ran a fever.",
            "kana": "だした",
            "reading": "ねつ を だした。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "買い物に[出かけます]。",
            "translation": "I go out shopping.",
            "kana": "でかけます",
            "reading": "かいもの に でかけます。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "今から[出かけます]。",
            "translation": "I'm going out now.",
            "kana": "でかけます",
            "reading": "いま から でかけます。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "散歩に[出かけます]。",
            "translation": "I go out for a walk.",
            "kana": "でかけます",
            "reading": "さんぽ に でかけます。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "一緒に[出かけます]か？",
            "translation": "Shall we go out together?",
            "kana": "でかけます",
            "reading": "いっしょ に でかけます か？"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "仕事に[出かけます]。",
            "translation": "I leave for work.",
            "kana": "でかけます",
            "reading": "しごと に でかけます。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "旅行に[出かけます]。",
            "translation": "I'm going on a trip.",
            "kana": "でかけます",
            "reading": "りょこう に でかけます。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "毎日[出かけます]。",
            "translation": "I go out every day.",
            "kana": "でかけます",
            "reading": "まいにち でかけます。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "遊びに[出かけます]。",
            "translation": "I go out to play/have fun.",
            "kana": "でかけます",
            "reading": "あそび に でかけます。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "一人で[出かけます]。",
            "translation": "I go out alone.",
            "kana": "でかけます",
            "reading": "ひとり で でかけます。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Present (Masu)",
            "text": "そろそろ[出かけます]ね。",
            "translation": "I'll be heading out soon.",
            "kana": "でかけます",
            "reading": "そろそろ でかけます ね。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "朝早く[出かけました]。",
            "translation": "I went out early in the morning.",
            "kana": "でかけました",
            "reading": "あさ はやく でかけました。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "家族と[出かけました]。",
            "translation": "I went out with my family.",
            "kana": "でかけました",
            "reading": "かぞく と でかけました。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "どこへ[出かけました]か？",
            "translation": "Where did you go?",
            "kana": "でかけました",
            "reading": "どこ へ でかけました か？"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日[出かけました]。",
            "translation": "I went out yesterday.",
            "kana": "でかけました",
            "reading": "きのう でかけました。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "公園へ[出かけました]。",
            "translation": "I went out to the park.",
            "kana": "でかけました",
            "reading": "こうえん へ でかけました。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "急いで[出かけました]。",
            "translation": "I left in a hurry.",
            "kana": "でかけました",
            "reading": "いそいで でかけました。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "遠くに[出かけました]。",
            "translation": "I went somewhere far.",
            "kana": "でかけました",
            "reading": "とおく に でかけました。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "パーティーに[出かけました]。",
            "translation": "I went out to a party.",
            "kana": "でかけました",
            "reading": "ぱーてぃー に でかけました。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "用事で[出かけました]。",
            "translation": "I went out on an errand.",
            "kana": "でかけました",
            "reading": "ようじ で でかけました。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Polite Past (Mashita)",
            "text": "さっき[出かけました]よ。",
            "translation": "They went out just a while ago.",
            "kana": "でかけました",
            "reading": "さっき でかけました よ。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "準備をして[出かけて]ください。",
            "translation": "Please get ready and go out.",
            "kana": "でかけて",
            "reading": "じゅんび を して でかけて ください。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "帽子をかぶって[出かけて]いく。",
            "translation": "Put on a hat and head out.",
            "kana": "でかけて",
            "reading": "ぼうし を かぶって でかけて いく。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "友達と[出かけて]楽しむ。",
            "translation": "Go out with friends and enjoy.",
            "kana": "でかけて",
            "reading": "ともだち と でかけて たのしむ。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "雨の中[出かけて]しまった。",
            "translation": "I unfortunately went out in the rain.",
            "kana": "でかけて",
            "reading": "あめ の なか でかけて しまった。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "手ぶらで[出かけて]いい？",
            "translation": "Is it okay to go out empty-handed?",
            "kana": "でかけて",
            "reading": "てぶら で でかけて いい？"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "寄り道して[出かけて]くる。",
            "translation": "Take a detour and come back.",
            "kana": "でかけて",
            "reading": "よりみち して でかけて くる。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "おめかしして[出かけて]いく。",
            "translation": "Dress up and head out.",
            "kana": "でかけて",
            "reading": "おめかし して でかけて いく。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "忘れ物をして[出かけて]しまった。",
            "translation": "I went out and forgot something.",
            "kana": "でかけて",
            "reading": "わすれもの を して でかけて しまった。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "笑顔で[出かけて]いった。",
            "translation": "They went out with a smile.",
            "kana": "でかけて",
            "reading": "えがお で でかけて いった。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Te-form",
            "text": "慌てて[出かけて]転んだ。",
            "translation": "I rushed out and fell down.",
            "kana": "でかけて",
            "reading": "あわてて でかけて ころんだ。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "今日はどこにも[出かけない]。",
            "translation": "I'm not going anywhere today.",
            "kana": "でかけない",
            "reading": "きょう は どこ に も でかけない。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "雨の日は[出かけない]ほうがいい。",
            "translation": "It's better not to go out on rainy days.",
            "kana": "でかけない",
            "reading": "あめ の ひ は でかけない ほう が いい。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "夜は[出かけない]ようにしている。",
            "translation": "I make it a point not to go out at night.",
            "kana": "でかけない",
            "reading": "よる は でかけない ように している。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "一人では[出かけない]。",
            "translation": "I don't go out alone.",
            "kana": "でかけない",
            "reading": "ひとり で は でかけない。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ[出かけない]で。",
            "translation": "Don't go out yet.",
            "kana": "でかけない",
            "reading": "まだ でかけない で。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "全然[出かけない]休日。",
            "translation": "A holiday where I don't go out at all.",
            "kana": "でかけない",
            "reading": "ぜんぜん でかけない きゅうじつ。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "用がないなら[出かけない]。",
            "translation": "If there's no business, I won't go out.",
            "kana": "でかけない",
            "reading": "よう が ない なら でかけない。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "外に[出かけない]生活。",
            "translation": "A life of not going outside.",
            "kana": "でかけない",
            "reading": "そと に でかけない せいかつ。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰も[出かけない]。",
            "translation": "Nobody is going out.",
            "kana": "でかけない",
            "reading": "だれ も でかけない。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Negative (Nai)",
            "text": "そんな格好で[出かけない]で。",
            "translation": "Don't go out dressed like that.",
            "kana": "でかけない",
            "reading": "そんな かっこう で でかけない で。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "さっき[出かけた]よ。",
            "translation": "They headed out just a moment ago.",
            "kana": "でかけた",
            "reading": "さっき でかけた よ。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "買い物に[出かけた]きりだ。",
            "translation": "They went out shopping and haven't returned.",
            "kana": "でかけた",
            "reading": "かいもの に でかけた きり だ。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "どこへ[出かけた]の？",
            "translation": "Where did you go out to?",
            "kana": "でかけた",
            "reading": "どこ へ でかけた の？"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "家族全員で[出かけた]。",
            "translation": "The whole family went out.",
            "kana": "でかけた",
            "reading": "かぞく ぜんいん で でかけた。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "昨日[出かけた]場所。",
            "translation": "The place I went to yesterday.",
            "kana": "でかけた",
            "reading": "きのう でかけた ばしょ。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "遠くまで[出かけた]。",
            "translation": "I went out quite far.",
            "kana": "でかけた",
            "reading": "とおく まで でかけた。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "急いで[出かけた]跡がある。",
            "translation": "There are signs of a hurried departure.",
            "kana": "でかけた",
            "reading": "いそいで でかけた あと が ある。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "旅行に[出かけた]友達。",
            "translation": "A friend who went on a trip.",
            "kana": "でかけた",
            "reading": "りょこう に でかけた ともだち。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "気分転換に[出かけた]。",
            "translation": "I went out for a change of pace.",
            "kana": "でかけた",
            "reading": "きぶんてんかん に でかけた。"
        },
        {
            "verb": "出かける (dekakeru)",
            "tense": "Plain Past (Ta)",
            "text": "一人で[出かけた]はずだ。",
            "translation": "They should have gone out alone.",
            "kana": "でかけた",
            "reading": "ひとり で でかけた はず だ。"
        }, {
            "verb": "できる (dekiru)",
            "tense": "Polite Present (Masu)",
            "text": "料理が[できます]。",
            "translation": "I can cook.",
            "kana": "できます",
            "reading": "りょうり が できます。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Polite Present (Masu)",
            "text": "新しい店が[できます]。",
            "translation": "A new shop will be built.",
            "kana": "できます",
            "reading": "あたらしい みせ が できます。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Polite Present (Masu)",
            "text": "準備は[できます]か？",
            "translation": "Will the preparations be ready?",
            "kana": "できます",
            "reading": "じゅんび は できます か？"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Polite Present (Masu)",
            "text": "日本語が少し[できます]。",
            "translation": "I can speak a little Japanese.",
            "kana": "できます",
            "reading": "にほんご が すこし できます。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Polite Present (Masu)",
            "text": "明日なら[できます]。",
            "translation": "I can do it if it's tomorrow.",
            "kana": "できます",
            "reading": "あした なら できます。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Polite Past (Mashita)",
            "text": "宿題が[できました]。",
            "translation": "The homework is finished.",
            "kana": "できました",
            "reading": "しゅくだい が できました。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Polite Past (Mashita)",
            "text": "友達が[できました]。",
            "translation": "I made a friend.",
            "kana": "できました",
            "reading": "ともだち が できました。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Polite Past (Mashita)",
            "text": "夕食が[できました]よ。",
            "translation": "Dinner is ready!",
            "kana": "できました",
            "reading": "ゆうしょく が できました よ。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Polite Past (Mashita)",
            "text": "精一杯[できました]。",
            "translation": "I was able to do my very best.",
            "kana": "できました",
            "reading": "せいいっぱい できました。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Polite Past (Mashita)",
            "text": "いい経験が[できました]。",
            "translation": "I was able to have a good experience.",
            "kana": "できました",
            "reading": "いい けいけん が できました。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Te-form",
            "text": "自分に[できて]、彼にできないことはない。",
            "translation": "There is nothing I can do that he cannot.",
            "kana": "できて",
            "reading": "じぶん に できて、かれ に できない こと は ない。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Te-form",
            "text": "行列が[できて]いる。",
            "translation": "A queue is forming.",
            "kana": "できて",
            "reading": "ぎょうれつ が できて いる。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Te-form",
            "text": "新しく[できて]、まだ綺麗な建物。",
            "translation": "A building that was newly built and is still beautiful.",
            "kana": "できて",
            "reading": "あたらしく できて、まだ きれいな たてもの。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Te-form",
            "text": "準備が[できて]から連絡します。",
            "translation": "I will contact you after the preparations are ready.",
            "kana": "できて",
            "reading": "じゅんび が できて から れんらく します。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Te-form",
            "text": "仕事が[できて]嬉しい。",
            "translation": "I'm happy that I can do the work.",
            "kana": "できて",
            "reading": "しごと が できて うれしい。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Negative (Nai)",
            "text": "何も[できない]。",
            "translation": "I can't do anything.",
            "kana": "できない",
            "reading": "なにも できない。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Negative (Nai)",
            "text": "我慢[できない]！",
            "translation": "I can't stand it!",
            "kana": "できない",
            "reading": "がまん できない！"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ返事が[できない]。",
            "translation": "I can't give an answer yet.",
            "kana": "できない",
            "reading": "まだ へんじ が できない。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Negative (Nai)",
            "text": "泳ぐことが[できない]。",
            "translation": "I cannot swim.",
            "kana": "できない",
            "reading": "およぐ こと が できない。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Negative (Nai)",
            "text": "解決[できない]問題。",
            "translation": "A problem that cannot be solved.",
            "kana": "できない",
            "reading": "かいけつ できない もんだい。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Past (Ta)",
            "text": "やっと[できた]！",
            "translation": "I finally did it!",
            "kana": "できた",
            "reading": "やっと できた！"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Past (Ta)",
            "text": "傷が[できた]。",
            "translation": "I got a wound/scratch.",
            "kana": "できた",
            "reading": "きず が できた。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Past (Ta)",
            "text": "いい案が[できた]。",
            "translation": "A good plan was made.",
            "kana": "できた",
            "reading": "いい あん が できた。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Past (Ta)",
            "text": "急用が[できた]。",
            "translation": "Something urgent came up.",
            "kana": "できた",
            "reading": "きゅうよう が できた。"
        },
        {
            "verb": "できる (dekiru)",
            "tense": "Plain Past (Ta)",
            "text": "彼女が[できた]らしい。",
            "translation": "I heard he got a girlfriend.",
            "kana": "できた",
            "reading": "かのじょ が できた らしい。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Present (Masu)",
            "text": "部屋から[出ます]。",
            "translation": "I leave the room.",
            "kana": "でます",
            "reading": "へや から でます。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Present (Masu)",
            "text": "試合に[出ます]。",
            "translation": "I will participate in the match.",
            "kana": "でます",
            "reading": "しあい に でます。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Present (Masu)",
            "text": "電話に[出ます]。",
            "translation": "I will answer the phone.",
            "kana": "でます",
            "reading": "でんわ に でます。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Present (Masu)",
            "text": "涙が[出ます]。",
            "translation": "Tears come out.",
            "kana": "でます",
            "reading": "なみだ が でます。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Present (Masu)",
            "text": "テレビに[出ます]。",
            "translation": "I will appear on TV.",
            "kana": "でます",
            "reading": "てれび に でます。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Past (Mashita)",
            "text": "外に[出ました]。",
            "translation": "I went outside.",
            "kana": "でました",
            "reading": "そと に でました。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Past (Mashita)",
            "text": "結論が[出ました]。",
            "translation": "The conclusion has come out.",
            "kana": "でました",
            "reading": "けつろん が でました。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Past (Mashita)",
            "text": "スピードが[出ました]。",
            "translation": "Speed was gained.",
            "kana": "でました",
            "reading": "すぴーど が でました。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Past (Mashita)",
            "text": "お化けが[出ました]！",
            "translation": "A ghost appeared!",
            "kana": "でました",
            "reading": "おばけ が でました！"
        },
        {
            "verb": "出る (deru)",
            "tense": "Polite Past (Mashita)",
            "text": "大学を[出ました]。",
            "translation": "I graduated from university.",
            "kana": "でました",
            "reading": "だいがく を でました。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Te-form",
            "text": "前に[出て]ください。",
            "translation": "Please step forward.",
            "kana": "でて",
            "reading": "まえ に でて ください。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Te-form",
            "text": "家を[出て]駅へ行く。",
            "translation": "Leave the house and go to the station.",
            "kana": "でて",
            "reading": "いえ を でて えき へ いく。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Te-form",
            "text": "芽が[出て]きた。",
            "translation": "The sprouts have started to come out.",
            "kana": "でて",
            "reading": "め が でて きた。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Te-form",
            "text": "熱が[出て]寝込む。",
            "translation": "Have a fever and stay in bed.",
            "kana": "でて",
            "reading": "ねつ が でて ねこむ。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Te-form",
            "text": "勇気が[出て]きた。",
            "translation": "I'm starting to feel courageous.",
            "kana": "でて",
            "reading": "ゆうき が でて きた。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Negative (Nai)",
            "text": "声が[出ない]。",
            "translation": "My voice won't come out.",
            "kana": "でない",
            "reading": "こえ が でない。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Negative (Nai)",
            "text": "今日は外に[出ない]。",
            "translation": "I won't go outside today.",
            "kana": "でない",
            "reading": "きょう は そと に でない。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Negative (Nai)",
            "text": "答えが[出ない]。",
            "translation": "The answer doesn't come out.",
            "kana": "でない",
            "reading": "こたえ が でない。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Negative (Nai)",
            "text": "名前が思い出[出ない]。",
            "translation": "The name won't come to mind.",
            "kana": "でない",
            "reading": "なまえ が おもいだせない。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Negative (Nai)",
            "text": "何も[でない]よ。",
            "translation": "Nothing is coming out.",
            "kana": "でない",
            "reading": "なにも でない よ。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Past (Ta)",
            "text": "月が[出た]。",
            "translation": "The moon appeared.",
            "kana": "でた",
            "reading": "つき が でた。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Past (Ta)",
            "text": "会議に[出た]。",
            "translation": "I attended the meeting.",
            "kana": "でた",
            "reading": "かいぎ に でた。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Past (Ta)",
            "text": "ボロが[出た]。",
            "translation": "The flaws/secrets came out.",
            "kana": "でた",
            "reading": "ぼろ が でた。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Past (Ta)",
            "text": "いい結果が[出た]。",
            "translation": "A good result came out.",
            "kana": "でた",
            "reading": "いい けっか が でた。"
        },
        {
            "verb": "出る (deru)",
            "tense": "Plain Past (Ta)",
            "text": "さっき家を[出た]ところだ。",
            "translation": "I just left home.",
            "kana": "でた",
            "reading": "さっき いえ を でた ところ だ。"
        }, {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "将来の夢を[描きます]。",
            "translation": "I draw/visualize my future dreams.",
            "kana": "えがきます",
            "reading": "しょうらい の ゆめ を えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "地図を[描きます]。",
            "translation": "I draw a map.",
            "kana": "えがきます",
            "reading": "ちず を えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "美しい風景を[描きます]。",
            "translation": "I depict a beautiful landscape.",
            "kana": "えがきます",
            "reading": "うつくしい ふうけい を えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "円を[描きます]。",
            "translation": "I draw a circle.",
            "kana": "えがきます",
            "reading": "えん を えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "物語を[描きます]。",
            "translation": "I portray a story.",
            "kana": "えがきます",
            "reading": "ものがたり を えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "理想の自分を[描きます]。",
            "translation": "I envision my ideal self.",
            "kana": "えがきます",
            "reading": "りそう の じぶん を えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "人の心情を[描きます]。",
            "translation": "I describe human emotions.",
            "kana": "えがきます",
            "reading": "ひと の しんじょう を えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "油絵で[描きます]。",
            "translation": "I paint with oil colors.",
            "kana": "えがきます",
            "reading": "あぶらえ で えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "細部まで[描きます]。",
            "translation": "I draw down to the fine details.",
            "kana": "えがきます",
            "reading": "さいぶ まで えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Present (Masu)",
            "text": "日常を[描きます]。",
            "translation": "I depict everyday life.",
            "kana": "えがきます",
            "reading": "にちじょう を えがきます。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "似顔絵を[描きました]。",
            "translation": "I drew a portrait.",
            "kana": "えがきました",
            "reading": "にがおえ を えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "放物線を[描きました]。",
            "translation": "It traced a parabola.",
            "kana": "えがきました",
            "reading": "ほうぶつせん を えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "昨日の出来事を[描きました]。",
            "translation": "I depicted yesterday's events.",
            "kana": "えがきました",
            "reading": "きのう の できごと を えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "大きな夢を[描きました]。",
            "translation": "I envisioned a big dream.",
            "kana": "えがきました",
            "reading": "おおきな ゆめ を えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "詳細な図面を[描きました]。",
            "translation": "I drew a detailed blueprint.",
            "kana": "えがきました",
            "reading": "しょうさいな ずめん を えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "漫画で[描きました]。",
            "translation": "I drew it in a manga style.",
            "kana": "えがきました",
            "reading": "まんが で えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "壁に絵を[描きました]。",
            "translation": "I drew a picture on the wall.",
            "kana": "えがきました",
            "reading": "かべ に え を えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "情熱的に[描きました]。",
            "translation": "I depicted it passionately.",
            "kana": "えがきました",
            "reading": "じょうねつてき に えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "砂の上に[描きました]。",
            "translation": "I drew it on the sand.",
            "kana": "えがきました",
            "reading": "すな の うえ に えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Polite Past (Mashita)",
            "text": "心に[描きました]。",
            "translation": "I pictured it in my mind.",
            "kana": "えがきました",
            "reading": "こころ に えがきました。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "地図を[描いて]説明する。",
            "translation": "Draw a map and explain.",
            "kana": "えがいて",
            "reading": "ちず を えがいて せつめい する。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "夢を[描いて]努力する。",
            "translation": "Envision a dream and work hard.",
            "kana": "えがいて",
            "reading": "ゆめ を えがいて どりょく する。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "円を[描いて]切る。",
            "translation": "Draw a circle and cut it out.",
            "kana": "えがいて",
            "reading": "えん を えがいて きる。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "絵を[描いて]過ごす。",
            "translation": "Spend time drawing pictures.",
            "kana": "えがいて",
            "reading": "え を えがいて すごす。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "未来を[描いて]ワクワクする。",
            "translation": "Visualize the future and get excited.",
            "kana": "えがいて",
            "reading": "みらい を えがいて わくわく する。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "自由に[描いて]ください。",
            "translation": "Please draw freely.",
            "kana": "えがいて",
            "reading": "じゆう に えがいて ください。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "情景を[描いて]伝える。",
            "translation": "Depict the scene and convey it.",
            "kana": "えがいて",
            "reading": "じょうけい を えがいて つたえる。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "眉を[描いて]化粧を終える。",
            "translation": "Draw eyebrows and finish makeup.",
            "kana": "えがいて",
            "reading": "まゆ を えがいて けしょう を おえる。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "理想を[描いて]止まない。",
            "translation": "Never stop envisioning the ideal.",
            "kana": "えがいて",
            "reading": "りそう を えがいて やまない。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Te-form",
            "text": "サインを[描いて]もらう。",
            "translation": "Get (someone) to draw a signature/sketch.",
            "kana": "えがいて",
            "reading": "さいん を えがいて もらう。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "嘘を[描かない]。",
            "translation": "I don't depict lies.",
            "kana": "えがかない",
            "reading": "うそ を えがかない。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "夢を[描かない]人。",
            "translation": "A person who doesn't envision dreams.",
            "kana": "えがかない",
            "reading": "ゆめ を えがかない ひと。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "円を上手く[描けない]。",
            "translation": "I can't draw a circle well.",
            "kana": "えがけない",
            "reading": "えん を うまく えがけない。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "現実を[描かない]映画。",
            "translation": "A movie that doesn't depict reality.",
            "kana": "えがかない",
            "reading": "げんじつ を えがかない えいが。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "何も[描かない]紙。",
            "translation": "A paper with nothing drawn on it.",
            "kana": "えがかない",
            "reading": "なにも えがかない かみ。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "未来を[描かない]のは怖い。",
            "translation": "It's scary not to envision the future.",
            "kana": "えがかない",
            "reading": "みらい を えがかない の は こわい。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "詳しく[描かない]でいい。",
            "translation": "You don't need to draw it in detail.",
            "kana": "えがかない",
            "reading": "くわしく えがかない で いい。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "景色を[描かない]画家。",
            "translation": "A painter who doesn't paint landscapes.",
            "kana": "え g かない",
            "reading": "けしき を えがかない がか。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "希望を[描かない]物語。",
            "translation": "A story that doesn't portray hope.",
            "kana": "えがかない",
            "reading": "きぼう を えがかない ものがたり。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Negative (Nai)",
            "text": "眉を[描かない]で外出する。",
            "translation": "Go out without drawing eyebrows.",
            "kana": "えがかない",
            "reading": "まゆ を えがかない で がいしゅつ する。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "地図を[描いた]。",
            "translation": "I drew a map.",
            "kana": "えがいた",
            "reading": "ちず を えがいた。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "夢を[描いた]あの日。",
            "translation": "That day when I envisioned my dream.",
            "kana": "えがいた",
            "reading": "ゆめ を えがいた あの ひ。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "放物線を[描いた]ボール。",
            "translation": "A ball that traced a parabola.",
            "kana": "えがいた",
            "reading": "ほうぶつせん を えがいた ぼーる。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "心に[描いた]世界。",
            "translation": "The world I pictured in my heart.",
            "kana": "えがいた",
            "reading": "こころ に えがいた せかい。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "円を[描いた]跡。",
            "translation": "The mark where a circle was drawn.",
            "kana": "えがいた",
            "reading": "えん を えがいた あと。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "作家が[描いた]真実。",
            "translation": "The truth depicted by the author.",
            "kana": "えがいた",
            "reading": "さっか が えがいた しんじつ。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "絵の具で[描いた]。",
            "translation": "I drew it with paints.",
            "kana": "えがいた",
            "reading": "えのぐ で えがいた。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "未来図を[描いた]。",
            "translation": "I drew a map for the future.",
            "kana": "えがいた",
            "reading": "みらいず を えがいた。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "鮮明に[描いた]。",
            "translation": "I depicted it vividly.",
            "kana": "えがいた",
            "reading": "せんめい に えがいた。"
        },
        {
            "verb": "描く (egaku)",
            "tense": "Plain Past (Ta)",
            "text": "眉を[描いた]？",
            "translation": "Did you draw your eyebrows?",
            "kana": "えがいた",
            "reading": "まゆ を えがいた？"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "好きな色を[選びます]。",
            "translation": "I will choose the color I like.",
            "kana": "えらびます",
            "reading": "すきな いろ を えらびます。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "リーダーを[選びます]。",
            "translation": "We will choose a leader.",
            "kana": "えらびます",
            "reading": "りーだー を えらびます。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "言葉を[選びます]。",
            "translation": "I will choose my words carefully.",
            "kana": "えらびます",
            "reading": "ことば を えらびます。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "どれを[選びます]か？",
            "translation": "Which one will you choose?",
            "kana": "えらびます",
            "reading": "どれ を えらびます か？"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "慎重に[選びます]。",
            "translation": "I will choose cautiously.",
            "kana": "えらびます",
            "reading": "しんちょう に えらびます。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "メニューから[選びます]。",
            "translation": "I will choose from the menu.",
            "kana": "えらびます",
            "reading": "めにゅー から えらびます。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "新しい道を[選びます]。",
            "translation": "I will choose a new path.",
            "kana": "えらびます",
            "reading": "あたらしい みち を えらびます。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "プレゼントを[選びます]。",
            "translation": "I will pick out a present.",
            "kana": "えらびます",
            "reading": "ぷれぜんと を えらびます。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "自分を[選びます]か？",
            "translation": "Will you choose yourself?",
            "kana": "えらびます",
            "reading": "じぶん を えらびます か？"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Present (Masu)",
            "text": "基準で[選びます]。",
            "translation": "I will choose based on criteria.",
            "kana": "えらびます",
            "reading": "きじゅん で えらびます。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "これを[選びました]。",
            "translation": "I chose this.",
            "kana": "えらびました",
            "reading": "これ を えらびました。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "彼を[選びました]。",
            "translation": "I chose him.",
            "kana": "えらびました",
            "reading": "かれ を えらびました。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "結局どっちを[選びました]か？",
            "translation": "Which one did you choose in the end?",
            "kana": "えらびました",
            "reading": "けっきょく どっち を えらびました か？"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "難しい方を[選びました]。",
            "translation": "I chose the difficult one.",
            "kana": "えらびました",
            "reading": "むずかしい ほう を えらびました。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "服を[選びました]。",
            "translation": "I picked out some clothes.",
            "kana": "えらびました",
            "reading": "ふく を えらびました。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "市長を[選びました]。",
            "translation": "We elected a mayor.",
            "kana": "えらびました",
            "reading": "しちょう を えらびました。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "最良の策を[選びました]。",
            "translation": "I chose the best plan.",
            "kana": "えらびました",
            "reading": "さいりょう の さく を えらびました。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "ランダムに[選びました]。",
            "translation": "I chose at random.",
            "kana": "えらびました",
            "reading": "らんだむ に えらびました。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "一足先に[選びました]。",
            "translation": "I chose it a step ahead of others.",
            "kana": "えらびました",
            "reading": "ひとあしさき に えらびました。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Polite Past (Mashita)",
            "text": "理由があって[選びました]。",
            "translation": "I chose it for a reason.",
            "kana": "えらびました",
            "reading": "りゆう が あって えらびました。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "よく[選んで]ください。",
            "translation": "Please choose carefully.",
            "kana": "えらんで",
            "reading": "よく えらんで ください。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "服を[選んで]あげる。",
            "translation": "I'll pick out clothes for you.",
            "kana": "えらんで",
            "reading": "ふく を えらんで あげる。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "道を[選んで]進む。",
            "translation": "Choose a path and move forward.",
            "kana": "えらんで",
            "reading": "みち を えらんで すすむ。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "言葉を[選んで]話す。",
            "translation": "Speak while choosing words carefully.",
            "kana": "えらんで",
            "reading": "ことば を えらんで はなす。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "自分を[選んで]くれてありがとう。",
            "translation": "Thank you for choosing me.",
            "kana": "えらんで",
            "reading": "じぶん を えらんで くれて ありがとう。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "一つを[選んで]取ってください。",
            "translation": "Pick one and take it.",
            "kana": "えらんで",
            "reading": "ひとつ を えらんで とって ください。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "時間を[選んで]連絡する。",
            "translation": "Choose a time and contact.",
            "kana": "えらんで",
            "reading": "じかん を えらんで れんらく する。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "カードを[選んで]見せる。",
            "translation": "Pick a card and show it.",
            "kana": "えらんで",
            "reading": "かーど を えらんで みせる。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "基準を[選んで]設定する。",
            "translation": "Choose criteria and set them up.",
            "kana": "えらんで",
            "reading": "きじゅん を えらんで せってい する。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Te-form",
            "text": "迷って[選んで]しまった。",
            "translation": "I hesitated but ended up choosing it.",
            "kana": "えらんで",
            "reading": "まよって えらんで しまった。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "誰も[選ばない]。",
            "translation": "I won't choose anyone.",
            "kana": "えらばない",
            "reading": "だれ も えらばない。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "手段を[選ばない]。",
            "translation": "Use any means necessary (not choosing methods).",
            "kana": "えらばない",
            "reading": "しゅだん を えらばない。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "場所を[選ばない]仕事。",
            "translation": "A job that can be done anywhere.",
            "kana": "えらばない",
            "reading": "ばしょ を えらばない しごと。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ[選ばない]ほうがいい。",
            "translation": "It's better not to choose yet.",
            "kana": "えらばない",
            "reading": "まだ えらばない ほう が いい。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "これだけは[選ばない]。",
            "translation": "I will never choose this one.",
            "kana": "えらばない",
            "reading": "これ だけ は えらばない。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "妥協を[選ばない]。",
            "translation": "I will not choose to compromise.",
            "kana": "えらばない",
            "reading": "だきょう を えらばない。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "相手を[選ばない]。",
            "translation": "I don't discriminate against who I deal with.",
            "kana": "えらばない",
            "reading": "あいて を えらばない。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "そんな服[選ばない]よ。",
            "translation": "I wouldn't choose those clothes.",
            "kana": "えらばない",
            "reading": "そんな ふく えらばない よ。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "一人を[選ばない]理由。",
            "translation": "The reason for not choosing one person.",
            "kana": "えらばない",
            "reading": "ひとり を えらばない りゆう。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Negative (Nai)",
            "text": "適当に[選ばない]で。",
            "translation": "Please don't choose at random.",
            "kana": "えらばない",
            "reading": "てきとう に えらばない で。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "昨日[選んだ]服。",
            "translation": "The clothes I chose yesterday.",
            "kana": "えらんだ",
            "reading": "きのう えらんだ ふく。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "誰がこれを[選んだ]の？",
            "translation": "Who chose this?",
            "kana": "えらんだ",
            "reading": "だれ が これ を えらんだ の？"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "最悪の道を[選んだ]。",
            "translation": "I chose the worst path.",
            "kana": "えらんだ",
            "reading": "さいあく の みち を えらんだ。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "宝物を[選んだ]気分だ。",
            "translation": "I feel like I've chosen a treasure.",
            "kana": "えらんだ",
            "reading": "たからもの を えらんだ きぶん だ。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "名前で[選んだ]。",
            "translation": "I chose it by name.",
            "kana": "えらんだ",
            "reading": "なまえ で えらんだ。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "慎重に[選んだ]はずだ。",
            "translation": "I should have chosen carefully.",
            "kana": "えらんだ",
            "reading": "しんちょう に えらんだ はず だ。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "彼は退職を[選んだ]。",
            "translation": "He chose to resign.",
            "kana": "えらんだ",
            "reading": "かれ は たいしょく を えらんだ。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "正解を[選んだ]。",
            "translation": "I chose the correct answer.",
            "kana": "えらんだ",
            "reading": "せいかい を えらんだ。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "色で[選んだ]だけだ。",
            "translation": "I only chose it for the color.",
            "kana": "えらんだ",
            "reading": "いろ で えらんだ だけ だ。"
        },
        {
            "verb": "選ぶ (erabu)",
            "tense": "Plain Past (Ta)",
            "text": "運命が[選んだ]道。",
            "translation": "The path chosen by fate.",
            "kana": "えらんだ",
            "reading": "うんめい が えらんだ みち。"
        }, {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "新しい知識を[得ます]。",
            "translation": "I gain new knowledge.",
            "kana": "えます",
            "reading": "あたらしい ちしき を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "許可を[得ます]。",
            "translation": "I will obtain permission.",
            "kana": "えます",
            "reading": "きょか を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "信頼を[得ます]。",
            "translation": "I earn trust.",
            "kana": "えます",
            "reading": "しんらい を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "利益を[得ます]。",
            "translation": "I make a profit.",
            "kana": "えます",
            "reading": "りえき を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "情報を[得ます]。",
            "translation": "I get information.",
            "kana": "えます",
            "reading": "じょうほう を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "確信を[得ます]。",
            "translation": "I gain confidence/conviction.",
            "kana": "えます",
            "reading": "かくしん を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "市民権を[得ます]。",
            "translation": "It gains social acceptance (citizenship).",
            "kana": "えます",
            "reading": "しみんけん を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "同意を[得ます]。",
            "translation": "I will get consent.",
            "kana": "えます",
            "reading": "どうい を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "ヒントを[得ます]。",
            "translation": "I get a hint.",
            "kana": "えます",
            "reading": "ひんと を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Present (Masu)",
            "text": "満足を[得ます]。",
            "translation": "I derive satisfaction.",
            "kana": "えます",
            "reading": "まんぞく を えます。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "多くの経験を[得ました]。",
            "translation": "I gained a lot of experience.",
            "kana": "えました",
            "reading": "おおく の けいけん を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "高い評価を[得ました]。",
            "translation": "I received a high evaluation.",
            "kana": "えました",
            "reading": "たかい ひょうか を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "承認を[得ました]。",
            "translation": "I obtained approval.",
            "kana": "えました",
            "reading": "しょうにん を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "勇気を[得ました]。",
            "translation": "I gained courage.",
            "kana": "えました",
            "reading": "ゆうき を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "富を[得ました]。",
            "translation": "I acquired wealth.",
            "kana": "えました",
            "reading": "とみ を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "自由を[得ました]。",
            "translation": "I gained freedom.",
            "kana": "えました",
            "reading": "じゆう を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "結果を[得ました]。",
            "translation": "I obtained results.",
            "kana": "えました",
            "reading": "けっか を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "地位を[得ました]。",
            "translation": "I attained a position.",
            "kana": "えました",
            "reading": "ちい を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "理解を[得ました]。",
            "translation": "I gained understanding.",
            "kana": "えました",
            "reading": "りかい を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Polite Past (Mashita)",
            "text": "チャンスを[得ました]。",
            "translation": "I got a chance.",
            "kana": "えました",
            "reading": "ちゃんす を えました。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "許可を[得て]入館する。",
            "translation": "Obtain permission and enter the building.",
            "kana": "えて",
            "reading": "きょか を えて にゅうかん する。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "情報を[得て]判断する。",
            "translation": "Get information and make a judgment.",
            "kana": "えて",
            "reading": "じょうほう を えて はんだん する。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "信頼を[得て]成功した。",
            "translation": "I gained trust and succeeded.",
            "kana": "えて",
            "reading": "しんらい を えて せいこう した。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "経験を[得て]成長する。",
            "translation": "Gain experience and grow.",
            "kana": "えて",
            "reading": "けいけん を えて せいちょう する。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "ヒントを[得て]解決する。",
            "translation": "Get a hint and solve the problem.",
            "kana": "えて",
            "reading": "ひんと を えて かいけつ する。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "富を[得て]贅沢する。",
            "translation": "Acquire wealth and live luxuriously.",
            "kana": "えて",
            "reading": "とみ を えて ぜいたく する。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "確信を[得て]話す。",
            "translation": "Gain conviction and speak.",
            "kana": "えて",
            "reading": "かくしん を えて はなす。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "同意を[得て]進める。",
            "translation": "Get consent and proceed.",
            "kana": "えて",
            "reading": "どうい を えて すすめる。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "栄養を[得て]生きる。",
            "translation": "Obtain nutrition and live.",
            "kana": "えて",
            "reading": "えいよう を えて いきる。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Te-form",
            "text": "地位を[得て]威張る。",
            "translation": "Gain a position and act big.",
            "kana": "えて",
            "reading": "ちい を えて いばる。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "何も[得ない]。",
            "translation": "I gain nothing.",
            "kana": "えない",
            "reading": "なにも えない。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "許可を[得ない]で入るな。",
            "translation": "Don't enter without getting permission.",
            "kana": "えない",
            "reading": "きょか を えない で はいるな。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "理解を[得ない]行動。",
            "translation": "An action that does not gain understanding.",
            "kana": "えない",
            "reading": "りかい を えない こうどう。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "利益を[得ない]仕事。",
            "translation": "Work that doesn't yield profit.",
            "kana": "えない",
            "reading": "りえき を えない しごと。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "信頼を[得ない]嘘つき。",
            "translation": "A liar who gains no trust.",
            "kana": "えない",
            "reading": "しんらい を えない うそつき。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "情報を[得ない]と困る。",
            "translation": "It's a problem if I don't get information.",
            "kana": "えない",
            "reading": "じょうほう を えない と こまる。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "満足を[得ない]まま帰る。",
            "translation": "Return without gaining satisfaction.",
            "kana": "えない",
            "reading": "まんぞく を えない まま かえる。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "確証を[得ない]話。",
            "translation": "A story that hasn't gained corroboration.",
            "kana": "えない",
            "reading": "かくしょう を えない はなし。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "地位を[得ない]道を選ぶ。",
            "translation": "Choose a path that doesn't lead to status.",
            "kana": "えない",
            "reading": "ちい を えない みち を えらぶ。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Negative (Nai)",
            "text": "賛成を[得ない]提案。",
            "translation": "A proposal that doesn't gain support.",
            "kana": "えない",
            "reading": "さんせい を えない ていあん。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "知識を[得た]。",
            "translation": "I gained knowledge.",
            "kana": "えた",
            "reading": "ちしき を えた。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "同意を[得た]。",
            "translation": "I got consent.",
            "kana": "えた",
            "reading": "どうい を えた。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "チャンスを[得た]。",
            "translation": "I got a chance.",
            "kana": "えた",
            "reading": "ちゃんす を えた。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "市民権を[得た]言葉。",
            "translation": "A word that gained social acceptance.",
            "kana": "えた",
            "reading": "しみんけん を えた ことば。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "大きな富を[得た]。",
            "translation": "I acquired great wealth.",
            "kana": "えた",
            "reading": "おおきな とみ を えた。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "信頼を[得た]リーダー。",
            "translation": "A leader who gained trust.",
            "kana": "えた",
            "reading": "しんらい を えた りーだー。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "ついに自由を[得た]。",
            "translation": "I finally gained freedom.",
            "kana": "えた",
            "reading": "ついに じゆう を えた。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "確信を[得た]瞬間。",
            "translation": "The moment I gained conviction.",
            "kana": "えた",
            "reading": "かくしん を えた しゅんかん。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "いい結果を[得た]。",
            "translation": "I got a good result.",
            "kana": "えた",
            "reading": "いい けっか を えた。"
        },
        {
            "verb": "得る (eru)",
            "tense": "Plain Past (Ta)",
            "text": "情報を[得た]か？",
            "translation": "Did you get the information?",
            "kana": "えた",
            "reading": "じょうほう を えた か？"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "風が[吹きます]。",
            "translation": "The wind blows.",
            "kana": "ふきます",
            "reading": "かぜ が ふきます。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "口笛を[吹きます]。",
            "translation": "I whistle.",
            "kana": "ふきます",
            "reading": "くちぶえ を ふきます。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "トランペットを[吹きます]。",
            "translation": "I play the trumpet.",
            "kana": "ふきます",
            "reading": "とらんぺっと を ふきます。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "シャボン玉を[吹きます]。",
            "translation": "I blow soap bubbles.",
            "kana": "ふきます",
            "reading": "しゃぼんだま を ふきます。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "ホコリを[吹きます]。",
            "translation": "I blow away the dust.",
            "kana": "ふきます",
            "reading": "ほこり を ふきます。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "熱いお茶を[吹きます]。",
            "translation": "I blow on hot tea.",
            "kana": "ふきます",
            "reading": "あつい おちゃ を ふきます。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "法螺を[吹きます]。",
            "translation": "I talk big (blow a conch).",
            "kana": "ふきます",
            "reading": "ほら を ふきます。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "春の風が[吹きます]ね。",
            "translation": "The spring wind is blowing, isn't it?",
            "kana": "ふきます",
            "reading": "はる の かぜ が ふきます ね。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "ロウソクを[吹きます]。",
            "translation": "I blow out the candle.",
            "kana": "ふきます",
            "reading": "ろうそく を ふきます。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Present (Masu)",
            "text": "強く[吹きます]か？",
            "translation": "Does it blow strongly?",
            "kana": "ふきます",
            "reading": "つよく ふきます か？"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "そよ風が[吹きました]。",
            "translation": "A gentle breeze blew.",
            "kana": "ふきました",
            "reading": "そよかぜ が ふきました。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "口笛を[吹きました]。",
            "translation": "I whistled.",
            "kana": "ふきました",
            "reading": "くちぶえ を ふきました。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "フルートを[吹きました]。",
            "translation": "I played the flute.",
            "kana": "ふきました",
            "reading": "ふるーと を ふきました。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "風が激しく[吹きました]。",
            "translation": "The wind blew violently.",
            "kana": "ふきました",
            "reading": "かぜ が はげしく ふきました。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "火を[吹きました]。",
            "translation": "It breathed fire.",
            "kana": "ふきました",
            "reading": "ひ を ふきました。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "大きなシャボン玉を[吹きました]。",
            "translation": "I blew a big soap bubble.",
            "kana": "ふきました",
            "reading": "おおきな しゃぼんだま を ふきました。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "埃を[吹きました]か？",
            "translation": "Did you blow off the dust?",
            "kana": "ふきました",
            "reading": "ほこり を ふきました か？"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "昨晩は嵐が[吹きました]。",
            "translation": "A storm blew last night.",
            "kana": "ふきました",
            "reading": "さくばん は あらし が ふきました。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "冷たい風が[吹きました]。",
            "translation": "A cold wind blew.",
            "kana": "ふきました",
            "reading": "つめたい かぜ が ふきました。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Polite Past (Mashita)",
            "text": "一息に[吹きました]。",
            "translation": "I blew it in one breath.",
            "kana": "ふきました",
            "reading": "ひといき に ふきました。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "口笛を[吹いて]呼ぶ。",
            "translation": "Call (someone) by whistling.",
            "kana": "ふいて",
            "reading": "くちぶえ を ふいて よぶ。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "風が[吹いて]涼しい。",
            "translation": "The wind is blowing and it's cool.",
            "kana": "ふいて",
            "reading": "かぜ が ふいて すずしい。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "笛を[吹いて]行進する。",
            "translation": "March while playing the flute.",
            "kana": "ふいて",
            "reading": "ふえ を ふいて こうしん する。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "熱いスープを[吹いて]飲む。",
            "translation": "Blow on hot soup and drink it.",
            "kana": "ふいて",
            "reading": "あつい すーぷ を ふいて のむ。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "ロウソクを[吹いて]消す。",
            "translation": "Blow out the candle.",
            "kana": "ふいて",
            "reading": "ろうそく を ふいて けす。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "埃を[吹いて]飛ばす。",
            "translation": "Blow away the dust.",
            "kana": "ふいて",
            "reading": "ほこり を ふいて とばす。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "風が[吹いて]葉が舞う。",
            "translation": "The wind blows and leaves dance.",
            "kana": "ふいて",
            "reading": "かぜ が ふいて は が まう。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "シャボン玉を[吹いて]遊ぶ。",
            "translation": "Play by blowing bubbles.",
            "kana": "ふいて",
            "reading": "しゃぼんだま を ふいて あそぶ。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "法螺を[吹いて]笑われる。",
            "translation": "Talk big and get laughed at.",
            "kana": "ふいて",
            "reading": "ほら を ふいて わらわれる。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Te-form",
            "text": "思い切り[吹いて]ください。",
            "translation": "Please blow with all your might.",
            "kana": "ふいて",
            "reading": "おもいきり ふいて ください。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "風が[吹かない]。",
            "translation": "The wind doesn't blow.",
            "kana": "ふかない",
            "reading": "かぜ が ふかない。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "口笛を[吹かない]で。",
            "translation": "Don't whistle.",
            "kana": "ふかない",
            "reading": "くちぶえ を ふかない で。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "笛を上手く[吹けない]。",
            "translation": "I can't play the flute well.",
            "kana": "ふけない",
            "reading": "ふえ を うまく ふけない。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "ロウソクが[吹かない]と消えない。",
            "translation": "The candle won't go out if I don't blow on it.",
            "kana": "ふかない",
            "reading": "ろうそく が ふかない と きえない。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "今日は風が[吹かない]ね。",
            "translation": "The wind isn't blowing today, is it?",
            "kana": "ふかない",
            "reading": "きょう は かぜ が ふかない ね。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "強く[吹かない]ように気をつける。",
            "translation": "Be careful not to blow too hard.",
            "kana": "ふかない",
            "reading": "つよく ふかない ように き を つける。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "法螺は[吹かない]主義だ。",
            "translation": "It's my principle not to talk big.",
            "kana": "ふかない",
            "reading": "ほら は ふかない しゅぎ だ。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "全然[吹かない]。",
            "translation": "It doesn't blow at all.",
            "kana": "ふかない",
            "reading": "ぜんぜん ふかない。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "埃を[吹かない]ほうがいい。",
            "translation": "It's better not to blow the dust.",
            "kana": "ふかない",
            "reading": "ほこり を ふかない ほう が いい。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ笛を[吹かない]でください。",
            "translation": "Please don't play the flute yet.",
            "kana": "ふかない",
            "reading": "まだ ふえ を ふかない で ください。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "強い風が[吹いた]。",
            "translation": "A strong wind blew.",
            "kana": "ふいた",
            "reading": "つよい かぜ が ふいた。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "口笛を[吹いた]のは誰？",
            "translation": "Who was it that whistled?",
            "kana": "ふいた",
            "reading": "くちぶえ を ふいた の は だれ？"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "ロウソクを[吹いた]。",
            "translation": "I blew out the candle.",
            "kana": "ふいた",
            "reading": "ろうそく を ふいた。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "埃を[吹いた]。",
            "translation": "I blew off the dust.",
            "kana": "ふいた",
            "reading": "ほこり を ふいた。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "サックスを[吹いた]。",
            "translation": "I played the sax.",
            "kana": "ふいた",
            "reading": "さっくす を ふいた。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "新風が[吹いた]。",
            "translation": "A new wind blew (metaphorically).",
            "kana": "ふいた",
            "reading": "しんぷう が ふいた。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "思い切り[吹いた]。",
            "translation": "I blew with all my might.",
            "kana": "ふいた",
            "reading": "おもいきり ふいた。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "シャボン玉が[吹いた]風に乗る。",
            "translation": "The soap bubble rides the wind it was blown into.",
            "kana": "ふいた",
            "reading": "しゃぼんだま が ふいた かぜ に のる。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "冷たい風が[吹いた]朝。",
            "translation": "The morning a cold wind blew.",
            "kana": "ふいた",
            "reading": "つめたい かぜ が ふいた あさ。"
        },
        {
            "verb": "吹く (fuku)",
            "tense": "Plain Past (Ta)",
            "text": "法螺を[吹いた]だろ。",
            "translation": "You talked big, didn't you?",
            "kana": "ふいた",
            "reading": "ほら を ふいた だろ。"
        }, {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "税金を[含みます]。",
            "translation": "It includes tax.",
            "kana": "ふくみます",
            "reading": "ぜいきん を ふくみます。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "ビタミンを多く[含みます]。",
            "translation": "It contains a lot of vitamins.",
            "kana": "ふくみます",
            "reading": "びたみん を おおく ふくみます。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "水分を[含みます]。",
            "translation": "It contains moisture.",
            "kana": "ふくみます",
            "reading": "すいぶん を ふくみます。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "手数料も[含みます]か？",
            "translation": "Does it include the handling fee?",
            "kana": "ふくみます",
            "reading": "てすうりょう も ふくみます か？"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "皮肉を[含みます]。",
            "translation": "It contains irony.",
            "kana": "ふくみます",
            "reading": "ひにく を ふくみます。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "意味を[含みます]。",
            "translation": "It contains meaning.",
            "kana": "ふくみます",
            "reading": "いみ を ふくみます。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "例外を[含みます]。",
            "translation": "It includes exceptions.",
            "kana": "ふくみます",
            "reading": "れいがい を ふくみます。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "塩分を[含みます]。",
            "translation": "It contains salt.",
            "kana": "ふくみます",
            "reading": "えんぶん を ふくみます。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "全員[含みます]。",
            "translation": "It includes everyone.",
            "kana": "ふくみます",
            "reading": "ぜんいん ふくみます。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Present (Masu)",
            "text": "諸経費を[含みます]。",
            "translation": "It includes various expenses.",
            "kana": "ふくみます",
            "reading": "しょけいひ を ふくみます。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "送料を[含みました]。",
            "translation": "I included the shipping cost.",
            "kana": "ふくみました",
            "reading": "そうりょう を ふくみました。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "毒を[含みました]。",
            "translation": "It contained poison.",
            "kana": "ふくみました",
            "reading": "どく を ふくみました。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "彼をメンバーに[含みました]。",
            "translation": "I included him in the members.",
            "kana": "ふくみました",
            "reading": "かれ を めんばー に ふくみました。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "怒りを[含みました]。",
            "translation": "It contained anger.",
            "kana": "ふくみました",
            "reading": "いかり を ふくみました。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "それも計算に[含みました]。",
            "translation": "I included that in the calculation too.",
            "kana": "ふくみました",
            "reading": "それ も けいさん に ふくみました。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "糖分を多く[含みました]。",
            "translation": "It contained a lot of sugar.",
            "kana": "ふくみました",
            "reading": "とうぶん を おおく ふくみました。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "涙を[含みました]。",
            "translation": "Eyes welled up with tears (contained tears).",
            "kana": "ふくみました",
            "reading": "なみだ を ふくみました。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "含意を[含みました]。",
            "translation": "It contained implications.",
            "kana": "ふくみました",
            "reading": "がんい を ふくみました。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "この分を[含みました]か？",
            "translation": "Did you include this portion?",
            "kana": "ふくみました",
            "reading": "この ぶん を ふくみました か？"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Polite Past (Mashita)",
            "text": "全額を[含みました]。",
            "translation": "It included the full amount.",
            "kana": "ふくみました",
            "reading": "ぜんがく を ふくみました。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "水を口に[含んで]ください。",
            "translation": "Please hold water in your mouth.",
            "kana": "ふくんで",
            "reading": "みず を くち に ふくんで ください。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "私を[含んで]五人です。",
            "translation": "There are five people, including me.",
            "kana": "ふくんで",
            "reading": "わたし を ふくんで ごにん です。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "意味を[含んで]笑う。",
            "translation": "Smile meaningfully (containing meaning).",
            "kana": "ふくんで",
            "reading": "いみ を ふくんで わらう。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "水分を[含んで]重くなる。",
            "translation": "Become heavy containing moisture.",
            "kana": "ふくんで",
            "reading": "すいぶん を ふくんで おもく なる。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "将来を[含んで]考える。",
            "translation": "Think while including the future.",
            "kana": "ふくんで",
            "reading": "しょうらい を ふくんで かんがえる。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "皮肉を[含んで]言う。",
            "translation": "Speak sarcastically (containing irony).",
            "kana": "ふくんで",
            "reading": "ひにく を ふくんで いう。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "全員を[含んで]移動する。",
            "translation": "Move while including everyone.",
            "kana": "ふくんで",
            "reading": "ぜんいん を ふくんで いどう する。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "条件を[含んで]契約する。",
            "translation": "Contract while including conditions.",
            "kana": "ふくんで",
            "reading": "じょうけん を ふくんで けいやく する。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "恨みを[含んで]死ぬ。",
            "translation": "Die while harboring (containing) a grudge.",
            "kana": "ふくんで",
            "reading": "うらみ を ふくんで しぬ。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Te-form",
            "text": "心を[含んで]接する。",
            "translation": "Engage with one's whole heart (containing heart).",
            "kana": "ふくんで",
            "reading": "こころ を ふくんで せっする。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "例外を[含まない]。",
            "translation": "It does not include exceptions.",
            "kana": "ふくまない",
            "reading": "れいがい を ふくまない。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "私を[含まない]で。",
            "translation": "Don't include me.",
            "kana": "ふくまない",
            "reading": "わたし を ふくまない で。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "アルコールを[含まない]飲料。",
            "translation": "Non-alcoholic beverage (contains no alcohol).",
            "kana": "ふくまない",
            "reading": "あるこーる を ふくまない いんりょう。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "悪意を[含まない]言葉。",
            "translation": "Words that contain no malice.",
            "kana": "ふくまない",
            "reading": "あくい を ふくまない ことば。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "送料を[含まない]価格。",
            "translation": "Price that does not include shipping.",
            "kana": "ふくまない",
            "reading": "そうりょう を ふくまない かかく。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "水分を[含まない]乾燥剤。",
            "translation": "A desiccant that contains no moisture.",
            "kana": "ふくまない",
            "reading": "すいぶん を ふくまない かんそうざい。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "彼を[含まない]理由。",
            "translation": "The reason for not including him.",
            "kana": "ふくまない",
            "reading": "かれ を ふくまない りゆう。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "何も[含まない]空っぽの箱。",
            "translation": "An empty box containing nothing.",
            "kana": "ふくまない",
            "reading": "なにも ふくまない からっぽ の はこ。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "嘘を[含まない]真実。",
            "translation": "Truth containing no lies.",
            "kana": "ふくまない",
            "reading": "うそ を ふくまない しんじつ。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Negative (Nai)",
            "text": "添加物を[含まない]食品。",
            "translation": "Food containing no additives.",
            "kana": "ふくまない",
            "reading": "てんかぶつ を ふくまない しょくひん。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "税を[含んだ]値段。",
            "translation": "The tax-inclusive price.",
            "kana": "ふくんだ",
            "reading": "ぜい を ふくんだ ねだん。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "私を[含んだ]全員。",
            "translation": "Everyone, including me.",
            "kana": "ふくんだ",
            "reading": "わたし を ふくんだ ぜんいん。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "水分をたっぷり[含んだ]土。",
            "translation": "Soil that contained plenty of moisture.",
            "kana": "ふくんだ",
            "reading": "すいぶん を たっぷり ふくんだ つち。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "皮肉を[含んだ]返事。",
            "translation": "A reply that contained irony.",
            "kana": "ふくんだ",
            "reading": "ひにく を ふくんだ へんじ。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "意味を[含んだ]視線。",
            "translation": "A glance that contained meaning.",
            "kana": "ふくんだ",
            "reading": "いみ を ふくんだ しせん。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "恨みを[含んだ]声。",
            "translation": "A voice that contained resentment.",
            "kana": "ふくんだ",
            "reading": "うらみ を ふくんだ こえ。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "例外も[含んだ]。",
            "translation": "It included exceptions too.",
            "kana": "ふくんだ",
            "reading": "れいがい も ふくんだ。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "毒を[含んだ]林檎。",
            "translation": "An apple that contained poison.",
            "kana": "ふくんだ",
            "reading": "どく を ふくんだ りんご。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "心を[含んだ]贈り物。",
            "translation": "A gift that contained one's heart.",
            "kana": "ふくんだ",
            "reading": "こころ を ふくんだ おくりもの。"
        },
        {
            "verb": "含む (fukumu)",
            "tense": "Plain Past (Ta)",
            "text": "全てを[含んだ]合計。",
            "translation": "The total that included everything.",
            "kana": "ふくんだ",
            "reading": "すべて を ふくんだ ごうけい。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "展示品に[触れます]。",
            "translation": "I touch the exhibits.",
            "kana": "ふれます",
            "reading": "てんじひん に ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "話題に[触れます]。",
            "translation": "I will touch upon the topic.",
            "kana": "ふれます",
            "reading": "わだい に ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "空気に[触れます]。",
            "translation": "It is exposed to the air.",
            "kana": "ふれます",
            "reading": "くうき に ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "法に[触れます]。",
            "translation": "It violates (touches) the law.",
            "kana": "ふれます",
            "reading": "ほう に ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "琴線に[触れます]。",
            "translation": "It touches a chord (in one's heart).",
            "kana": "ふれます",
            "reading": "きんせん に ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "目に[触れます]。",
            "translation": "It catches one's eye.",
            "kana": "ふれます",
            "reading": "め に ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "逆鱗に[触れます]。",
            "translation": "I will provoke (touch the imperial wrath) him.",
            "kana": "ふれます",
            "reading": "げきりん に ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "外の世界に[触れます]。",
            "translation": "I experience (touch) the outside world.",
            "kana": "ふれます",
            "reading": "そと の せかい に ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "光に[触れます]。",
            "translation": "It is exposed to light.",
            "kana": "ふれます",
            "reading": "ひかり に ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Present (Masu)",
            "text": "袖が[触れます]。",
            "translation": "Sleeves touch.",
            "kana": "ふれます",
            "reading": "そで が ふれます。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "その件に[触れました]。",
            "translation": "I touched upon that matter.",
            "kana": "ふれました",
            "reading": "その けん に ふれました。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "手が[触れました]。",
            "translation": "Hands touched.",
            "kana": "ふれました",
            "reading": "て が ふれました。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "文化に[触れました]。",
            "translation": "I experienced (touched) the culture.",
            "kana": "ふれました",
            "reading": "ぶんか に ふれました。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "規則に[触れました]か？",
            "translation": "Did it violate the rules?",
            "kana": "ふれました",
            "reading": "きそく に ふれました か？"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "核心に[触れました]。",
            "translation": "I touched on the core of the issue.",
            "kana": "ふれました",
            "reading": "かくしん に ふれました。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "風に[触れました]。",
            "translation": "It was exposed to the wind.",
            "kana": "ふれました",
            "reading": "かぜ に ふれました。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "優しさに[触れました]。",
            "translation": "I experienced (touched) kindness.",
            "kana": "ふれました",
            "reading": "やさしさ に ふれました。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "冷たい水に[触れました]。",
            "translation": "I touched cold water.",
            "kana": "ふれました",
            "reading": "つめたい みず に ふれました。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "秘密に[触れました]。",
            "translation": "I touched upon a secret.",
            "kana": "ふれました",
            "reading": "ひみつ に ふれました。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Polite Past (Mashita)",
            "text": "人目に[触れました]。",
            "translation": "It caught the public eye.",
            "kana": "ふれました",
            "reading": "ひとめ に ふれました。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "作品に[触れて]ください。",
            "translation": "Please touch the artwork.",
            "kana": "ふれて",
            "reading": "さくひん に ふれて ください。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "外気に[触れて]リフレッシュする。",
            "translation": "Experience the outside air and refresh.",
            "kana": "ふれて",
            "reading": "がいき に ふれて りふれっしゅ する。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "真実に[触れて]驚く。",
            "translation": "Be surprised touching upon the truth.",
            "kana": "ふれて",
            "reading": "しんじつ に ふれて おどろく。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "その話題に[触れて]はいけない。",
            "translation": "You must not touch upon that topic.",
            "kana": "ふれて",
            "reading": "その わだい に ふれて は いけない。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "手と手が[触れて]ドキッとする。",
            "translation": "Startled by hands touching.",
            "kana": "ふれて",
            "reading": "て と て が ふれて どきっとする。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "法に[触れて]逮捕される。",
            "translation": "Violate the law and be arrested.",
            "kana": "ふれて",
            "reading": "ほう に ふれて たいほ される。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "芸術に[触れて]感銘を受ける。",
            "translation": "Be moved by experiencing art.",
            "kana": "ふれて",
            "reading": "げいじゅつ に ふれて かんめい を うける。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "水に[触れて]冷たさを知る。",
            "translation": "Touch water and know the coldness.",
            "kana": "ふれて",
            "reading": "みず に ふれて つめたさ を しる。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "過去に[触れて]悲しくなる。",
            "translation": "Become sad touching upon the past.",
            "kana": "ふれて",
            "reading": "かこ に ふれて かなしく なる。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Te-form",
            "text": "熱に[触れて]溶ける。",
            "translation": "Melt being exposed to heat.",
            "kana": "ふれて",
            "reading": "ねつ に ふれて とける。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "展示品に[触れない]でください。",
            "translation": "Please do not touch the exhibits.",
            "kana": "ふれない",
            "reading": "てんじひん に ふれない で ください。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "その事には[触れない]ほうがいい。",
            "translation": "It is better not to touch upon that matter.",
            "kana": "ふれない",
            "reading": "その こと に は ふれない ほう が いい。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "法に[触れない]範囲でやる。",
            "translation": "Do it within a range that doesn't violate the law.",
            "kana": "ふれない",
            "reading": "ほう に ふれない はんい で やる。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "人目に[触れない]場所。",
            "translation": "A place that doesn't catch the public eye.",
            "kana": "ふれない",
            "reading": "ひとめ に ふれない ばしょ。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "まだ核心には[触れない]。",
            "translation": "I won't touch upon the core issue yet.",
            "kana": "ふれない",
            "reading": "まだ かくしん に は ふれない。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "誰の手にも[触れない]。",
            "translation": "It touches no one's hand.",
            "kana": "ふれない",
            "reading": "だれ の て に も ふれない。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "光に[触れない]ように保存する。",
            "translation": "Store it so it isn't exposed to light.",
            "kana": "ふれない",
            "reading": "ひかり に ふれない ように ほぞん する。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "何にも[触れない]生活。",
            "translation": "A life where I experience (touch) nothing.",
            "kana": "ふれない",
            "reading": "なに に も ふれない せいかつ。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "逆鱗に[触れない]ようにする。",
            "translation": "Try not to provoke (touch the wrath of) him.",
            "kana": "ふれない",
            "reading": "げきりん に ふれない ように する。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Negative (Nai)",
            "text": "話題に[触れない]理由。",
            "translation": "The reason for not touching upon the topic.",
            "kana": "ふれない",
            "reading": "わだい に ふれない りゆう。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "偶然手が[触れた]。",
            "translation": "Hands touched by chance.",
            "kana": "ふれた",
            "reading": "ぐうぜん て が ふれた。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "その問題に[触れた]。",
            "translation": "I touched upon that problem.",
            "kana": "ふれた",
            "reading": "その もんだい に ふれた。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "異文化に[触れた]経験。",
            "translation": "The experience of experiencing a different culture.",
            "kana": "ふれた",
            "reading": "いぶんか に ふれた けいけん。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "法に[触れた]可能性。",
            "translation": "The possibility of having violated the law.",
            "kana": "ふれた",
            "reading": "ほう に ふれた かのうせい。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "心に[触れた]言葉。",
            "translation": "Words that touched my heart.",
            "kana": "ふれた",
            "reading": "こころ に ふれた ことば。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "空気に[触れた]瞬間。",
            "translation": "The moment it was exposed to the air.",
            "kana": "ふれた",
            "reading": "くうき に ふれた しゅんかん。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "人目に[触れた]くない。",
            "translation": "I don't want it to catch the public eye.",
            "kana": "ふれた",
            "reading": "ひとめ に ふれたくない。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "秘密に[触れた]代償。",
            "translation": "The price for touching upon a secret.",
            "kana": "ふれた",
            "reading": "ひみつ に ふれた だいしょう。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "袖振り合うも多生の[縁]。",
            "translation": "Even a chance meeting (sleeves touching) is due to fate.",
            "kana": "ふれた",
            "reading": "そで ふりあう も たしょう の えん。"
        },
        {
            "verb": "触れる (fureru)",
            "tense": "Plain Past (Ta)",
            "text": "核心に[触れた]気がした。",
            "translation": "I felt like I touched upon the core.",
            "kana": "ふれた",
            "reading": "かくしん に ふれた き が した。"
        }, {
            "verb": "愛する (aisuru)",
            "tense": "Potential Form (Can do)",
            "text": "誰もが誰かを[愛せます]。",
            "translation": "Anyone can love someone.",
            "kana": "あいせます",
            "reading": "だれも が だれか を あいせます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Potential Form (Can do)",
            "text": "この瓶の蓋を[開けられます]か。",
            "translation": "Can you open the lid of this bottle?",
            "kana": "あけられます",
            "reading": "この びん の ふた を あけられます か。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Volitional Form (Let's do)",
            "text": "もっと世界を[愛そう]。",
            "translation": "Let's love the world more.",
            "kana": "あいそう",
            "reading": "もっと せかい を あいそう。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Volitional Form (Let's do)",
            "text": "暑いから窓を[開けよう]。",
            "translation": "It's hot, so let's open the window.",
            "kana": "あけよう",
            "reading": "あつい から まど を あけよう。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If / When)",
            "text": "自分を[愛したら]、人生が変わります。",
            "translation": "If you love yourself, your life will change.",
            "kana": "あいしたら",
            "reading": "じぶん を あいしたら、 じんせい が かわります。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If / When)",
            "text": "箱を[開けたら]、手紙が入っていました。",
            "translation": "When I opened the box, there was a letter inside.",
            "kana": "あけたら",
            "reading": "はこ を あけたら、 てがみ が はいっていました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If)",
            "text": "お互いに[愛せば]、平和になります。",
            "translation": "If we love each other, there will be peace.",
            "kana": "あいせば",
            "reading": "おたがいに あいせば、 へいわ に なります。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If)",
            "text": "扉を[開ければ]、風が通ります。",
            "translation": "If you open the door, the breeze will come through.",
            "kana": "あければ",
            "reading": "とびら を あければ、 かぜ が とおります。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Potential Form (Can do)",
            "text": "彼は家族を深く[愛せます]。",
            "translation": "He can love his family deeply.",
            "kana": "あいせます",
            "reading": "かれ は かぞく を ふかく あいせます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Potential Form (Can do)",
            "text": "鍵がなくて、ドアが[開けられない]。",
            "translation": "I don't have a key, so I can't open the door.",
            "kana": "あけられない",
            "reading": "かぎ が なくて、 どあ が あけられない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Volitional Form (Let's do)",
            "text": "隣人を[愛しましょう]。",
            "translation": "Let us love our neighbors.",
            "kana": "あいしましょう",
            "reading": "りんじん を あいしましょう。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Volitional Form (Let's do)",
            "text": "プレゼントを[開けましょう]！",
            "translation": "Let's open the present!",
            "kana": "あけましょう",
            "reading": "ぷれぜんと を あけましょう！"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If / When)",
            "text": "誰かを[愛したら]、優しくなれます。",
            "translation": "If you love someone, you can become kind.",
            "kana": "あいしたら",
            "reading": "だれか を あいしたら、 やさしく なれます。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If / When)",
            "text": "カーテンを[開けたら]、富士山が見えました。",
            "translation": "When I opened the curtains, I could see Mt. Fuji.",
            "kana": "あけたら",
            "reading": "かーてん を あけたら、 ふじさん が みえました。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If)",
            "text": "仕事を[愛せば]、苦労は感じません。",
            "translation": "If you love your work, you won't feel the hardship.",
            "kana": "あいせば",
            "reading": "しごと を あいせば、 くろう は かんじません。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If)",
            "text": "口を大きく[開ければ]、喉が見えます。",
            "translation": "If you open your mouth wide, I can see your throat.",
            "kana": "あければ",
            "reading": "くち を おおきく あければ、 のど が みえます。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Potential Form (Can do)",
            "text": "もっと素直に[愛せる]ようになりたい。",
            "translation": "I want to be able to love more honestly.",
            "kana": "あいせる",
            "reading": "もっと すなお に あいせる よう に なりたい。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Potential Form (Can do)",
            "text": "子供でもこの箱を[開けられます]。",
            "translation": "Even a child can open this box.",
            "kana": "あけられます",
            "reading": "こども でも この はこ を あけられます。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Volitional Form (Let's do)",
            "text": "自分の運命を[愛そう]。",
            "translation": "Let's love our destiny.",
            "kana": "あいそう",
            "reading": "じぶん の うんめい を あいそう。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Volitional Form (Let's do)",
            "text": "新しいビジネスを[開けよう]としている。",
            "translation": "I am trying to open a new business.",
            "kana": "あけよう",
            "reading": "あたらしい びじねす を あけよう と している。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If / When)",
            "text": "真実を[愛したら]、自由になれる。",
            "translation": "If you love the truth, you can be free.",
            "kana": "あいしたら",
            "reading": "しんじつ を あいしたら、 じゆう に なれる。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If / When)",
            "text": "朝に窓を[開けたら]、空気が爽やかだった。",
            "translation": "When I opened the window in the morning, the air was refreshing.",
            "kana": "あけたら",
            "reading": "あさ に まど を あけたら、 くうき が さわやか だった。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If)",
            "text": "自然を[愛せば]、心も豊かになる。",
            "translation": "If you love nature, your heart will become rich.",
            "kana": "あいせば",
            "reading": "しぜん を あいせば、 こころ も ゆたか に なる。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If)",
            "text": "鍵を[開ければ]、中に入れますよ。",
            "translation": "If you unlock (open) the key, you can go inside.",
            "kana": "あければ",
            "reading": "かぎ を あければ、 なか に はいれます よ。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Potential Form (Can do)",
            "text": "あんな酷い人は[愛せません]。",
            "translation": "I cannot love such a terrible person.",
            "kana": "あいせません",
            "reading": "あんな ひどい ひと は あいせません。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Potential Form (Can do)",
            "text": "アプリが重くて、ファイルが[開けられません]。",
            "translation": "The app is slow, so I cannot open the file.",
            "kana": "あけられません",
            "reading": "あぷり が おもくて、 ふぁいる が あけられません。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Volitional Form (Let's do)",
            "text": "人類を[愛そう]なんて、大げさかな。",
            "translation": "Is it too grand to say 'Let's love humanity'?",
            "kana": "あいそう",
            "reading": "じんるい を あいそう なんて、 おおげさ かな。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Volitional Form (Let's do)",
            "text": "ワインを[開けよう]。乾杯しよう。",
            "translation": "Let's open the wine. Let's toast.",
            "kana": "あけよう",
            "reading": "わいん を あけよう。 かんぱい しよう。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If / When)",
            "text": "ペットを[愛したら]、家族の一員です。",
            "translation": "If you love your pet, they are a member of the family.",
            "kana": "あいしたら",
            "reading": "ぺっと を あいしたら、 かぞく の いちいん です。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If / When)",
            "text": "冷蔵庫を[開けたら]、ケーキがなくなっていた。",
            "translation": "When I opened the fridge, the cake was gone.",
            "kana": "あけたら",
            "reading": "れいぞうこ を あけたら、 けーき が なくなって いた。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If)",
            "text": "敵をも[愛せば]、争いはなくなるだろう。",
            "translation": "If one loves even their enemies, conflict will likely vanish.",
            "kana": "あいせば",
            "reading": "てき を も あいせば、 あらそい は なくなる だろう。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If)",
            "text": "目を[開ければ]、美しい景色が広がっている。",
            "translation": "If you open your eyes, a beautiful landscape spreads out.",
            "kana": "あければ",
            "reading": "め を あければ、 うつくしい けしき が ひろがって いる。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Potential Form (Can do)",
            "text": "あなたは自分を[愛せます]か。",
            "translation": "Can you love yourself?",
            "kana": "あいせます",
            "reading": "あなた は じぶん を あいせます か。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Potential Form (Can do)",
            "text": "力がないから、この蓋は[開けられない]。",
            "translation": "I have no strength, so I can't open this lid.",
            "kana": "あけられない",
            "reading": "ちから が ない から、 この ふた は あけられない。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Volitional Form (Let's do)",
            "text": "もっと音楽を[愛そう]。",
            "translation": "Let's love music more.",
            "kana": "あいそう",
            "reading": "もっと おんがく を あいそう。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Volitional Form (Let's do)",
            "text": "明日、店を[開けよう]と思う。",
            "translation": "I think I will open the shop tomorrow.",
            "kana": "あけよう",
            "reading": "あした、 みせ を あけよう と おもう。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If / When)",
            "text": "誰かを本気で[愛したら]、強くなれる。",
            "translation": "If you truly love someone, you can become strong.",
            "kana": "あいしたら",
            "reading": "だれか を ほんき で あいしたら、 つよく なれる。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If / When)",
            "text": "引き出しを[開けたら]、古い写真が出てきた。",
            "translation": "When I opened the drawer, an old photo came out.",
            "kana": "あけたら",
            "reading": "ひきだし を あけたら、 ふるい しゃしん が でて きた。"
        },
        {
            "verb": "愛する (aisuru)",
            "tense": "Conditional Form (If)",
            "text": "故郷を[愛せば]、守りたくなる。",
            "translation": "If you love your hometown, you will want to protect it.",
            "kana": "あいせば",
            "reading": "こきょう を あいせば、 まもりたく なる。"
        },
        {
            "verb": "開ける (akeru)",
            "tense": "Conditional Form (If)",
            "text": "この道を[開ければ]、村が活性化する。",
            "translation": "If we open this road, the village will be revitalized.",
            "kana": "あければ",
            "reading": "この みち を あければ、 むら が かっせいか する。"
        }

    ];

    const ALL_TENSES = [...new Set(CUSTOM_LIBRARY.map(item => item.tense))].sort();
    const ALL_VERBS = [...new Set(CUSTOM_LIBRARY.map(item => item.verb))].sort();

    // Maps the Japanese verb directly to an English translation for the UI headers
    const VERB_TRANSLATIONS = {
        "浴びる (abiru)": "To bathe",
        "上がる (agaru)": "To rise",
        "上げる (ageru)": "To raise",
        "愛する (aisuru)": "To love",
        "開ける (akeru)": "To open",
        "諦める (akirameru)": "To give up",
        "飽きる (akiru)": "To get tired of",
        "開く (aku)": "To open (intransitive)",
        "余る (amaru)": "To remain",
        "案じる (anjiru)": "To worry",
        "洗う (arau)": "To wash",
        "現れる (arawareru)": "To appear",
        "表す (arawasu)": "To express",
        "ある (aru)": "To be / To exist (inanimate)",
        "歩く (aruku)": "To walk",
        "焦る (aseru)": "To rush / To panic",
        "遊ぶ (asobu)": "To play",
        "与える (ataeru)": "To give",
        "当たる (ataru)": "To hit / To win",
        "温める (atatameru)": "To warm up",
        "当てる (ateru)": "To hit (target) / To guess",
        "集まる (atsumaru)": "To gather (intransitive)",
        "集める (atsumeru)": "To collect",
        "会う (au)": "To meet",
        "合わせる (awaseru)": "To match / To combine",
        "謝る (ayamaru)": "To apologize",
        "ぶつかる (butsukaru)": "To bump into / To clash",
        "違う (chigau)": "To differ / To be wrong",
        "縮む (chijimu)": "To shrink",
        "誓う (chikau)": "To swear / To vow",
        "近づく (chikazuku)": "To approach",
        "散る (chiru)": "To fall / To scatter",
        "抱く (daku)": "To embrace / To hold",
        "騙す (damasu)": "To deceive",
        "出す (dasu)": "To take out",
        "出かける (dekakeru)": "To go out",
        "できる (dekiru)": "To be able to",
        "出る (deru)": "To exit / To leave",
        "描く (egaku)": "To draw / To depict",
        "選ぶ (erabu)": "To choose",
        "得る (eru)": "To obtain",
        "吹く (fuku)": "To blow",
        "含む (fukumu)": "To include",
        "触れる (fureru)": "To touch / To mention",
        "降る (furu)": "To fall (rain/snow)",
        "震える (furueru)": "To shiver",
        "塞ぐ (fusagu)": "To block / To close up",
        "防ぐ (fusegu)": "To prevent",
        "太る (futoru)": "To gain weight",
        "増やす (fuyasu)": "To increase",
        "頑張る (ganbaru)": "To do one's best",
        "生える (haeru)": "To grow (plants/hair)",
        "入る (hairu)": "To enter",
        "始まる (hajimaru)": "To begin (intransitive)",
        "始める (hajimeru)": "To start (transitive)",
        "測る (hakaru)": "To measure",
        "履く (haku)": "To wear (on feet/legs)",
        "運ぶ (hakobu)": "To transport / To carry",
        "離れる (hanareru)": "To separate",
        "話す (hanasu)": "To speak",
        "払う (harau)": "To pay",
        "張る (haru)": "To stick / To stretch",
        "挟まる (hasamaru)": "To get caught in between",
        "挟む (hasamu)": "To insert / To sandwich",
        "走る (hashiru)": "To run",
        "働く (hataraku)": "To work",
        "減らす (herasu)": "To decrease (transitive)",
        "減る (heru)": "To decrease (intransitive)",
        "引く (hiku)": "To pull",
        "開く (hiraku)": "To open",
        "拾う (hirou)": "To pick up",
        "広まる (hiromaru)": "To spread",
        "冷やす (hiyasu)": "To cool / To refrigerate",
        "吠える (hoeru)": "To bark",
        "微笑む (hohoemu)": "To smile",
        "褒める (homeru)": "To praise",
        "掘る (horu)": "To dig",
        "威張る (ibaru)": "To act big / To boast",
        "いじめる (ijimeru)": "To bully",
        "生かす (ikasu)": "To make use of",
        "生きる (ikiru)": "To live",
        "行く (iku)": "To go",
        "祈る (inoru)": "To pray",
        "入れる (ireru)": "To put in",
        "いる (iru)": "To be / To exist (animate)",
        "要る (iru)": "To need",
        "急ぐ (isogu)": "To hurry",
        "痛む (itamu)": "To hurt / To ache",
        "至る (itaru)": "To reach / To arrive at",
        "言う (iu)": "To say",
        "祝う (iwau)": "To celebrate",
        "嫌がる (iyagaru)": "To hate / To dislike",
        "帰る (kaeru)": "To return home",
        "変える (kaeru)": "To change (transitive)",
        "返す (kaesu)": "To return something",
        "限る (kagiru)": "To limit",
        "掛かる (kakaru)": "To take (time/money)",
        "掛ける (kakeru)": "To hang / To call",
        "書く (kaku)": "To write",
        "隠れる (kakureru)": "To hide (intransitive)",
        "隠す (kakusu)": "To hide (transitive)",
        "構う (kamau)": "To mind / To care",
        "噛む (kamu)": "To bite / To chew",
        "悲しむ (kanashimu)": "To be sad",
        "考える (kangaeru)": "To think",
        "感じる (kanjiru)": "To feel",
        "枯れる (kareru)": "To wither",
        "借りる (kariru)": "To borrow",
        "重なる (kasanaru)": "To overlap",
        "重ねる (kasaneru)": "To stack / To repeat",
        "貸す (kasu)": "To lend",
        "片付く (katazuku)": "To be tidied up",
        "勝つ (katsu)": "To win",
        "買う (kau)": "To buy",
        "渇く (kawaku)": "To be thirsty",
        "変わる (kawaru)": "To change (intransitive)",
        "通う (kayou)": "To commute",
        "飾る (kazaru)": "To decorate",
        "数える (kazoeru)": "To count",
        "消す (kesu)": "To erase / To turn off",
        "消える (kieru)": "To disappear / To go out",
        "聞こえる (kikoeru)": "To be heard",
        "聞く (kiku)": "To listen / To ask",
        "決める (kimeru)": "To decide",
        "禁じる (kinjiru)": "To forbid",
        "切る (kiru)": "To cut",
        "着る (kiru)": "To wear (on upper body)",
        "こぼれる (koboreru)": "To spill (intransitive)",
        "こぼす (kobosu)": "To spill (transitive)",
        "越える (koeru)": "To cross over",
        "答える (kotaeru)": "To answer",
        "断る (kotowaru)": "To refuse",
        "壊れる (kowareru)": "To break (intransitive)",
        "壊す (kowasu)": "To break (transitive)",
        "組む (kumu)": "To put together / To cross",
        "比べる (kuraberu)": "To compare",
        "暮らす (kurasu)": "To live / To get along",
        "繰り返す (kurikaesu)": "To repeat",
        "来る (kuru)": "To come",
        "苦しむ (kurushimu)": "To suffer",
        "加える (kuwaeru)": "To add (transitive)",
        "加わる (kuwawaru)": "To join",
        "間違える (machigaeru)": "To make a mistake",
        "曲がる (magaru)": "To turn / To bend",
        "曲げる (mageru)": "To bend / To twist",
        "任せる (makaseru)": "To entrust",
        "負ける (makeru)": "To lose",
        "巻く (maku)": "To roll / To wind",
        "守る (mamoru)": "To protect",
        "学ぶ (manabu)": "To learn",
        "間に合う (maniau)": "To be in time",
        "招く (maneku)": "To invite",
        "待つ (matsu)": "To wait",
        "回る (mawaru)": "To turn around (intransitive)",
        "回す (mawasu)": "To turn (transitive)",
        "迷う (mayou)": "To get lost / To hesitate",
        "混ざる (mazaru)": "To be mixed",
        "混ぜる (mazeru)": "To mix",
        "目立つ (medatsu)": "To stand out",
        "巡る (meguru)": "To go around",
        "見える (mieru)": "To be seen",
        "磨く (migaku)": "To polish / To brush",
        "見る (miru)": "To see / To watch",
        "見せる (miseru)": "To show",
        "認める (mitomeru)": "To admit / To recognize",
        "見つかる (mitsukaru)": "To be found",
        "見つける (mitsukeru)": "To find",
        "戻る (modoru)": "To return / To go back",
        "戻す (modosu)": "To restore / To put back",
        "燃える (moeru)": "To burn",
        "もらう (morau)": "To receive",
        "持つ (motsu)": "To hold / To have",
        "向かう (mukau)": "To face / To head towards",
        "向ける (mukeru)": "To turn towards",
        "向く (muku)": "To face / To be suited for",
        "結ぶ (musubu)": "To tie / To connect",
        "なでる (naderu)": "To pet / To stroke",
        "眺める (nagameru)": "To gaze at",
        "流れる (nagareru)": "To flow",
        "流す (nagasu)": "To let flow / To flush",
        "投げる (nageru)": "To throw",
        "泣く (naku)": "To cry",
        "鳴く (naku)": "To make sound (animal)",
        "なくなる (nakunaru)": "To disappear / To be lost",
        "なくす (nakusu)": "To lose something",
        "直る (naoru)": "To be fixed / To heal",
        "直す (naosu)": "To fix / To repair",
        "並べる (naraberu)": "To line up (transitive)",
        "並ぶ (narabu)": "To line up (intransitive)",
        "習う (narau)": "To learn (from someone)",
        "慣れる (nareru)": "To get used to",
        "なる (naru)": "To become",
        "悩む (nayamu)": "To worry",
        "寝る (neru)": "To sleep",
        "似合う (niau)": "To suit / To match",
        "逃げる (nigeru)": "To run away",
        "握る (nigiru)": "To grasp / To grip",
        "にらむ (niramu)": "To glare at",
        "似る (niru)": "To resemble",
        "伸ばす (nobasu)": "To stretch / To lengthen",
        "伸びる (nobiru)": "To stretch / To grow",
        "登る (noboru)": "To climb",
        "残る (nokoru)": "To remain / To be left",
        "残す (nokosu)": "To leave behind",
        "飲む (nomu)": "To drink",
        "乗る (noru)": "To ride / To get on",
        "除く (nozoku)": "To remove / To exclude",
        "望む (nozomu)": "To desire / To wish for",
        "脱ぐ (nugu)": "To take off (clothes)",
        "抜ける (nukeru)": "To come out / To fall out",
        "抜く (nuku)": "To extract / To pull out",
        "濡れる (nureru)": "To get wet",
        "塗る (nuru)": "To paint / To spread",
        "盗む (nusumu)": "To steal",
        "覚える (oboeru)": "To remember",
        "落ちる (ochiru)": "To fall",
        "驚く (odoroku)": "To be surprised",
        "踊る (odoru)": "To dance",
        "終える (oeru)": "To finish",
        "補う (oginau)": "To compensate",
        "起きる (okiru)": "To wake up",
        "行う (okonau)": "To perform",
        "怒る (okoru)": "To get angry",
        "起こる (okoru)": "To occur / To happen",
        "起こす (okosu)": "To wake someone up / To cause",
        "遅れる (okureru)": "To be late",
        "送る (okuru)": "To send",
        "思い出す (omoidasu)": "To remember / To recall",
        "思う (omou)": "To think",
        "折れる (oreru)": "To break / To be folded",
        "降りる (oriru)": "To get off / To descend",
        "下ろす (orosu)": "To take down / To withdraw",
        "折る (oru)": "To fold / To break (transitive)",
        "収める (osameru)": "To supply / To dedicate",
        "教える (oshieru)": "To teach / To tell",
        "惜しむ (oshimu)": "To regret",
        "恐れる (osoreru)": "To fear",
        "押す (osu)": "To push",
        "訪れる (otozureru)": "To visit",
        "追う (ou)": "To chase",
        "終わる (owaru)": "To end",
        "泳ぐ (oyogu)": "To swim",
        "下がる (sagaru)": "To go down",
        "探す (sagasu)": "To search",
        "下げる (sageru)": "To lower / To hang",
        "咲く (saku)": "To bloom",
        "叫ぶ (sakebu)": "To shout",
        "避ける (sakeru)": "To avoid",
        "冷める (sameru)": "To cool down",
        "支える (sasaeru)": "To support",
        "誘う (sasou)": "To invite",
        "刺す (sasu)": "To pierce / To stab",
        "騒ぐ (sawagu)": "To make noise",
        "触る (sawaru)": "To touch",
        "責める (semeru)": "To blame",
        "しゃべる (shaberu)": "To chat",
        "縛る (shibaru)": "To tie / To bind",
        "敷く (shiku)": "To spread out",
        "閉める (shimeru)": "To close",
        "示す (shimesu)": "To show",
        "信じる (shinjiru)": "To believe",
        "死ぬ (shinu)": "To die",
        "調べる (shiraberu)": "To investigate",
        "知らせる (shiraseru)": "To notify",
        "知る (shiru)": "To know",
        "従う (shitagau)": "To obey",
        "沈む (shizumu)": "To sink",
        "育てる (sodateru)": "To raise / To rear",
        "育つ (sodatsu)": "To grow up",
        "染める (someru)": "To dye",
        "備える (sonaeru)": "To prepare / To equip",
        "揃う (sorou)": "To be complete / To gather",
        "沿う (sou)": "To run along",
        "滑る (suberu)": "To slip / To slide",
        "過ぎる (sugiru)": "To pass / To exceed",
        "過ごす (sugosu)": "To spend time",
        "空く (suku)": "To become empty",
        "救う (sukuu)": "To save / To rescue",
        "住む (sumu)": "To live / To reside",
        "済む (sumu)": "To finish",
        "する (suru)": "To do",
        "勧める (susumeru)": "To recommend",
        "進む (susumu)": "To advance",
        "捨てる (suteru)": "To throw away",
        "吸う (suu)": "To breathe in",
        "座る (suwaru)": "To sit",
        "食べる (taberu)": "To eat",
        "耐える (taeru)": "To endure",
        "高まる (takamaru)": "To rise / To swell",
        "高める (takameru)": "To raise / To elevate",
        "保つ (tamotsu)": "To keep / To preserve",
        "頼む (tanomu)": "To request / To ask",
        "楽しむ (tanoshimu)": "To enjoy",
        "倒れる (taoreru)": "To fall over",
        "倒す (taosu)": "To defeat",
        "足りる (tariru)": "To be sufficient",
        "確かめる (tashikameru)": "To confirm",
        "足す (tasu)": "To add",
        "助ける (tasukeru)": "To help / To save",
        "戦う (tatakau)": "To fight",
        "叩く (tataku)": "To strike",
        "立てる (tateru)": "To stand up",
        "立つ (tatsu)": "To stand",
        "頼る (tayoru)": "To rely on",
        "尋ねる (tazuneru)": "To ask / To inquire",
        "手伝う (tetsudau)": "To help",
        "飛ぶ (tobu)": "To fly",
        "溶ける (tokeru)": "To melt",
        "解く (toku)": "To solve / To untie",
        "止まる (tomaru)": "To stop (intransitive)",
        "止める (tomeru)": "To stop (transitive)",
        "取れる (toreru)": "To come off",
        "取る (toru)": "To take",
        "捕まえる (tsukamaeru)": "To catch",
        "捕まる (tsukamaru)": "To be caught",
        "掴む (tsukamu)": "To grab",
        "疲れる (tsukareru)": "To get tired",
        "使う (tsukau)": "To use",
        "付ける (tsukeru)": "To attach / To turn on",
        "着く (tsuku)": "To arrive",
        "作る (tsukuru)": "To make",
        "詰まる (tsumaru)": "To be blocked",
        "詰める (tsumeru)": "To stuff / To pack",
        "積もる (tsumoru)": "To pile up",
        "積む (tsumu)": "To pile up / To load",
        "繋がる (tsunagaru)": "To be connected",
        "繋ぐ (tsunagu)": "To connect",
        "連れる (tsureru)": "To take along",
        "伝える (tsutaeru)": "To convey",
        "伝わる (tsutawaru)": "To be transmitted",
        "務める (tsutomeru)": "To serve as",
        "包む (tsutsumu)": "To wrap",
        "続ける (tsuzukeru)": "To continue (transitive)",
        "続く (tsuzuku)": "To continue (intransitive)",
        "奪う (ubau)": "To snatch / To steal",
        "動かす (ugokasu)": "To move (transitive)",
        "動く (ugoku)": "To move (intransitive)",
        "伺う (ukagau)": "To ask / To visit (humble)",
        "浮かぶ (ukabu)": "To float",
        "受ける (ukeru)": "To receive / To take (exam)",
        "受け取る (uketoru)": "To receive",
        "生まれる (umareru)": "To be born",
        "産む (umu)": "To give birth",
        "裏切る (uragiru)": "To betray",
        "売る (uru)": "To sell",
        "疑う (utagau)": "To doubt / To suspect",
        "歌う (utau)": "To sing",
        "打つ (utsu)": "To hit / To strike",
        "写す (utsusu)": "To copy / To photograph",
        "移る (utsuru)": "To move / To transfer",
        "別れる (wakareru)": "To part / To break up",
        "分かる (wakaru)": "To understand",
        "沸かす (wakasu)": "To boil (water)",
        "分ける (wakeru)": "To divide / To share",
        "沸く (waku)": "To boil (intransitive)",
        "笑う (warau)": "To laugh / To smile",
        "割れる (wareru)": "To break / To crack",
        "忘れる (wasureru)": "To forget",
        "渡る (wataru)": "To cross over",
        "渡す (watasu)": "To hand over",
        "破れる (yabureru)": "To get torn",
        "破る (yaburu)": "To tear / To break (promise)",
        "焼ける (yakeru)": "To burn / To be roasted",
        "焼く (yaku)": "To bake / To grill",
        "辞める (yameru)": "To quit",
        "止む (yamu)": "To stop (rain/snow)",
        "やる (yaru)": "To do / To give",
        "痩せる (yaseru)": "To lose weight",
        "休む (yasumu)": "To rest / To take a break",
        "雇う (yatou)": "To hire",
        "呼ぶ (yobu)": "To call",
        "読む (yomu)": "To read",
        "喜ぶ (yorokobu)": "To be glad / To be pleased",
        "寄る (yoru)": "To drop by",
        "寄せる (yoseru)": "To bring near",
        "酔う (you)": "To get drunk",
        "許す (yurusu)": "To forgive / To permit",
        "揺れる (yureru)": "To shake / To sway"
    };

    _staticDataCache = {
        CUSTOM_LIBRARY,
        TENSE_GUIDE,
        ALL_TENSES,
        ALL_VERBS,
        VERB_TRANSLATIONS
    };

    return _staticDataCache;
}