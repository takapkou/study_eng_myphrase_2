export const pChapters = [
  {
    id: 'p01', code: 'P01', chunk: 'make + 人 + feel / V', title: '使役・感情の型', level: 'B1/B2',
    desc: '「〜は私を〜な気持ちにさせる」「〜が〜させてくれる」という使役構文。感情の原因を説明するときに使う。',
    sections: [
      { tag: 'make+feel', title: 'make + 人 + feel + 形容詞', pattern: 'Subject + makes/made + 人 + feel + 形容詞', phrases: [
        'It makes me feel warm and peaceful.',
        'These moments make me feel like I\'m living a full life.',
        'Positive reviews really make me feel appreciated.',
        'When my work supports others, it makes me feel proud.'
      ]},
      { tag: 'make+V', title: 'make + 人 + V（原形）', pattern: 'Subject + makes/made + 人 + 動詞の原形', phrases: [
        'It makes me happy.',
        'Spending time with friends makes me forget about stress.',
        'Success comes from small actions — each one makes a difference.'
      ]},
      { tag: 'keep', title: 'keep + 人 + 形容詞/V-ing', pattern: 'Subject + keeps + 人 + 形容詞 / V-ing', tip: '`keep` は状態の継続を示す。`make` が変化、`keep` が維持のニュアンス。', phrases: [
        'Everyone keeps me motivated for study.',
        'Positive feedback helps me stay motivated.',
        'Keeps me energized throughout the day.',
        'It helps me stay focused and reduce stress.'
      ]},
      { tag: 'help', title: 'help + 人 + V', pattern: 'Subject + helps + 人 + 動詞の原形（to は省略可）', phrases: [
        'It helps me relax.',
        'Spending time with friends helps me feel refreshed.',
        'It helps me start the day with energy and focus.',
        'It helps me return to work the next day with a positive mindset.',
        'Code review really helped lift the quality of the code.'
      ]},
      { tag: 'make it', title: 'make it easier/harder for + 人 + to + V', pattern: 'Subject + makes it + 形容詞 + for + 人 + to + V', phrases: [
        'E-books make it easier for me to access a huge volume of books.',
        'I find it easier to debug when the logs are well structured.',
        'Remote work makes it harder for me to collaborate in real time.'
      ]}
    ]
  },
  {
    id: 'p02', code: 'P02', chunk: 'give + 人 + 名詞', title: '「〜を与える」の型', level: 'B1/B2',
    desc: '`give me + 名詞` のチャンク。感情・エネルギー・達成感などを「もらう」表現に使う。',
    sections: [
      { tag: 'sense of', title: 'It gives me a sense of ~', pattern: 'It gives me a sense of + 名詞', tip: '`a sense of ~` は「〜という感覚・気持ち」。achievementは達成感、calmは落ち着き、progressは進歩感。', phrases: [
        'It gives me a sense of achievement when it works correctly without bugs.',
        'It gives me a sense of calm when I listen to music.',
        'Learning even one small thing in the morning gives me a sense of progress.'
      ]},
      { tag: 'energy', title: 'give me + 名詞（エネルギー・モチベーション）', pattern: 'Subject + gives me + 名詞', phrases: [
        'It gives me more chances to practice speaking.',
        'Even when I\'m busy, just talking with them for a few minutes gives me energy.',
        'Give me advice based on their own experience.'
      ]},
      { tag: 'chance', title: 'give + 人 + 機会', pattern: 'give + 人 + a chance / opportunity + to + V', phrases: [
        'It will give me more chances to speak in front of native speakers.',
        'Working on international projects gives me the opportunity to practice English every day.',
        'This role gives me the chance to develop both technical and communication skills.'
      ]},
      { tag: '比較', title: '日本語との対応', isCompare: true, compare: [
        { phrase: 'It gives me motivation.', desc: 'やる気をもらった' },
        { phrase: 'It gives me a sense of achievement.', desc: '達成感がある' },
        { phrase: 'It gives me energy.', desc: '元気が出た' },
        { phrase: 'It gives me a sense of calm.', desc: '落ち着く' }
      ]}
    ]
  },
  {
    id: 'p03', code: 'P03', chunk: 'I find it + 形容詞 + to + V', title: '感想・評価の型', level: 'B2',
    desc: '「〜するのが難しい/簡単/楽しいと感じる」という評価構文。`It is + 形容詞` を主観的に言い換えた形。',
    sections: [
      { tag: 'find it', title: 'I find it + 形容詞 + to + V', pattern: 'I find it + 形容詞 + to + 動詞の原形', tip: '`It is difficult to ~` は客観的な文。`I find it difficult to ~` は「私にとって〜が難しい」という主観が加わる。', phrases: [
        'I find it really difficult to study after a long day.',
        'I find it easier to debug when the logs are well structured.',
        'I find it challenging to express complex ideas in English.',
        'I find it helpful to break tasks into small steps.'
      ]},
      { tag: 'find+名詞', title: 'I find + 名詞 + 形容詞', pattern: 'I find + 名詞 + 形容詞（名詞が目的語）', phrases: [
        'I find joy in solving complex problems.',
        'I find the legacy code hard to maintain.',
        'I find this approach more reliable than the previous one.'
      ]},
      { tag: 'find+Ving', title: 'I find + V-ing + 形容詞', pattern: 'I find + V-ing + 形容詞', phrases: [
        'I find debugging without logs very time-consuming.',
        'I find working in a cross-cultural team stimulating.',
        'I find reading technical documentation in English challenging but rewarding.'
      ]},
      { tag: '比較', title: 'find vs think の違い', isCompare: true, compare: [
        { phrase: 'I think it\'s difficult.', desc: '頭で考えてそう思う' },
        { phrase: 'I find it difficult.', desc: '実際にやってみてそう感じる（経験ベース）' }
      ]}
    ]
  },
  {
    id: 'p04', code: 'P04', chunk: 'try to / try not to', title: '努力・意図の型', level: 'B1/B2',
    desc: '「〜しようとする」「〜しないようにする」という意図・努力を表す構文。',
    sections: [
      { tag: 'try to', title: 'try to + V — しようとする', pattern: 'I / We try to + 動詞の原形', phrases: [
        'Try to stay positive even when things don\'t go well.',
        'Try to reach a compromise with others.',
        'I will try to reproduce the bug while monitoring the logs.',
        'I try to break each task into small steps.'
      ]},
      { tag: 'try not', title: 'try not to + V — しないようにする', pattern: 'I try not to + 動詞の原形', phrases: [
        'Try not to overthink — just focus on the next step.',
        'I try not to let stress affect my work.',
        'Try not to make changes without testing first.'
      ]},
      { tag: 'try Ving', title: 'try + V-ing — 試しに〜してみる', pattern: 'Try + V-ing（別の方法を試す）', tip: '`try to + V` = 達成しようとする努力 / `try + V-ing` = 試みとして一度やってみる', phrases: [
        'If access rights are not reflected, please try restarting the PC once.',
        'Try enabling the function and see if the issue still occurs.',
        'Try adding a log at the entry point to trace the behavior.'
      ]},
      { tag: 'manage', title: 'manage to + V', pattern: 'manage to + 動詞の原形（困難を乗り越えて達成）', tip: '`manage` — used when something was difficult but achieved.', phrases: [
        'I managed to solve the issue with the help of some senior engineers.',
        'We managed to finish the test on schedule despite the delays.'
      ]}
    ]
  },
  {
    id: 'p05', code: 'P05', chunk: "That's why ~ / This is because ~", title: '因果を示す型', level: 'B1/B2',
    desc: '原因→結果を文でつなぐ構文。「だから〜です」「なぜなら〜だからです」の形。',
    sections: [
      { tag: "that's why", title: "That's why + 文", pattern: "[原因の説明]. That's why + [結果].", tip: "会話でも文章でも自然に使える。前の文を受けて「それがゆえに〜」と結果を述べる。", phrases: [
        "The product must follow strict rules. That's why there are still products on airplanes that don't support Bluetooth.",
        "The parameter was not set correctly. That's why the function failed.",
        "We got burned last time. That's why we always test before deploying."
      ]},
      { tag: 'because', title: 'This is because ~', pattern: '[結果の説明]. This is because + [理由].', phrases: [
        'The demand for Bluetooth-free products is still there. This is because strict regulations apply to airplanes.',
        'The system failed. This is because the parameter was not initialized.',
        "I'm motivated to improve my English. This is because I work with an international team every day."
      ]},
      { tag: 'due to', title: 'This is due to ~', pattern: 'Subject + is due to + 名詞', tip: '`due to + 名詞` で原因を名詞として簡潔に示す。`because of` とほぼ同義だが `due to` はやや formal。', phrases: [
        'The delay is due to an unexpected dependency issue.',
        'The crash is due to a memory leak in the audio module.',
        'The performance improvement is due to the optimization of background processes.'
      ]},
      { tag: 'reason', title: 'The reason ~ is that/because ~', pattern: 'The reason + S + V + is that/because + S + V', phrases: [
        "The reason I'm asking is that we saw similar behavior last week.",
        "The reason we haven't updated yet is that we're waiting for the hardware team.",
        'The reason I chose this approach is that it requires the fewest changes.'
      ]},
      { tag: 'result', title: 'As a result / Therefore', pattern: '[原因]. As a result / Therefore, + [結果].', phrases: [
        'The parameter was misconfigured. As a result, the module ignored the request.',
        'Some recent changes exposed a latent issue. Therefore, we need to review all related modules.',
        'The voltage dropped. As a result, the audio module stopped responding.'
      ]}
    ]
  },
  {
    id: 'p06', code: 'P06', chunk: 'enable / allow / let + 人 + to + V', title: '「可能にする」の型', level: 'B2',
    desc: '何かが「〜を可能にする」「〜できるようにする」という構文。技術文脈・ビジネス文脈両方で使う。',
    sections: [
      { tag: 'enable', title: 'enable + 人 + to + V', pattern: 'Subject + enables + 人 + to + 動詞の原形', tip: '`enable` は「機能・条件が整ったことで可能になる」ニュアンス。ツール・システム・設計の説明に多い。', phrases: [
        'It enables us to identify the gaps.',
        'Profiling the boot system enables us to identify delays in the startup sequence.',
        'This tool enables team members to track their tasks in real time.'
      ]},
      { tag: 'allow', title: 'allow + 人 + to + V', pattern: 'Subject + allows + 人 + to + 動詞の原形', tip: '`allow` は `enable` とほぼ同義だが、「許可・余地を与える」ニュアンスも含む。', phrases: [
        "It allows us to know quickly what's going wrong.",
        'This fix allows the function to work properly with regard to the setting parameter.',
        'The new design allows users to customize the interface easily.'
      ]},
      { tag: 'let', title: 'let + 人 + V（原形）', pattern: 'Subject + lets + 人 + 動詞の原形', tip: '`let` は最も口語的。依頼・許可のシーンで自然。', phrases: [
        'The tool lets you organize tasks by priority.',
        'This setting lets the system retry the connection automatically.',
        'Let me know if you have any questions.'
      ]},
      { tag: '比較', title: 'enable / allow / let / make it possible まとめ', isCompare: true, compare: [
        { phrase: 'enable + 人 + to + V', desc: '機能・設計が可能にする（formal）' },
        { phrase: 'allow + 人 + to + V', desc: '許容・余地を与える' },
        { phrase: 'let + 人 + V', desc: '許可する（口語的）' },
        { phrase: 'make it possible to + V', desc: '可能にする（強調）' }
      ]}
    ]
  },
  {
    id: 'p07', code: 'P07', chunk: 'There are situations where ~', title: '存在・状況の型', level: 'B2',
    desc: '特定の条件・状況が「存在する」ことを示す構文。問題・例外・ケースを説明するときに使う。',
    sections: [
      { tag: 'situations', title: 'There are situations where ~', pattern: 'There are situations where + S + V', tip: '「〜という状況がある」という存在の事実を示す。`sometimes` より論理的・説明的に聞こえる。', phrases: [
        'There are situations where the system does not respond correctly.',
        'There are situations where the parameter needs to be set manually.',
        'There are situations where the function is not called properly.'
      ]},
      { tag: 'cases', title: 'There are cases where ~ / There are times when ~', pattern: 'There are cases / times + when/where + S + V', phrases: [
        'There are cases where the issue only occurs under specific conditions.',
        'There are times when I feel my English skills are lacking.',
        'There are cases where a reboot resolves the issue immediately.'
      ]},
      { tag: 'there is', title: 'There is / are + 名詞', pattern: 'There is/are + 名詞 (+ 場所/条件)', phrases: [
        'There is a specific scenario that triggers this issue.',
        'There are several traditional Japanese sports such as judo and sumo.',
        'There are a number of possible causes we need to investigate.'
      ]},
      { tag: 'no', title: 'There is no + 名詞', pattern: 'There is no + 名詞', phrases: [
        'There is no room to override other functions.',
        'There is no clear timeline in place yet.',
        'There is no impact on the safety assessment.'
      ]}
    ]
  },
  {
    id: 'p08', code: 'P08', chunk: 'What I ~ is ~', title: 'What-cleft 構文', level: 'B2',
    desc: '「私が〜するのは〜だ」という分裂文（cleft sentence）。強調したい情報を前に出す構文。',
    sections: [
      { tag: 'what I', title: 'What I + V + is ~', pattern: 'What I + 動詞 + is + 名詞/形容詞/that節', phrases: [
        "What I like the most is that it's easy to set up and maintain.",
        'What I find challenging is expressing complex ideas in real time.',
        "What I'm asking is: what would make your time on the airplane better?"
      ]},
      { tag: 'what we', title: 'What we need is ~', pattern: 'What we need/want/have + is + 名詞', phrases: [
        'What we need is a permanent solution, not just a workaround.',
        'What we have is a latent issue that recent changes have exposed.',
        'What we need is a clearer interface between HW and SW.'
      ]},
      { tag: 'the thing', title: 'The thing is ~', pattern: 'The thing is (that) + 文', phrases: [
        "The thing is, we don't have enough time to rewrite the module from scratch.",
        "The thing is, the issue only appears when the function is enabled.",
        "The thing is, we haven't been able to reproduce it consistently."
      ]}
    ]
  },
  {
    id: 'p09', code: 'P09', chunk: "Just because ~ doesn't mean ~", title: '論理否定・必然の型', level: 'B2',
    desc: '「〜だからといって〜とは限らない」「〜するしかない」という論理的な言い方。',
    sections: [
      { tag: 'just because', title: "Just because ~ doesn't mean ~", pattern: "Just because + S + V + doesn't mean + S + V", tip: 'よくある思い込みや過剰な結論を否定するときに使う。ディスカッションで強力な反論表現。', phrases: [
        "Just because you're a genius doesn't mean you're going to be successful.",
        "Just because the test passed doesn't mean the fix is complete.",
        "Just because it worked last time doesn't mean it will work again."
      ]},
      { tag: 'no choice', title: 'I have no choice but to + V', pattern: 'I have no choice but to + 動詞の原形', tip: '「他に選択肢がない」という必然性を示す。`must` より状況に追い込まれたニュアンスが強い。', phrases: [
        "I have no choice but to study if I want to improve.",
        'We have no choice but to roll back to the previous version.',
        'I had no choice but to apply the workaround until the root cause was found.'
      ]},
      { tag: 'necessarily', title: "It doesn't necessarily mean ~", pattern: "It doesn't necessarily mean + that + S + V", phrases: [
        "It doesn't necessarily mean the issue is fixed just because it stopped appearing.",
        "The test passed, but it doesn't necessarily mean the code is production-ready."
      ]}
    ]
  },
  {
    id: 'p10', code: 'P10', chunk: 'Instead of / Rather than + V-ing', title: '代替・優先の型', level: 'B2',
    desc: '「〜するかわりに」「〜よりも〜する」という代替案・優先順位を示す構文。',
    sections: [
      { tag: 'instead', title: 'Instead of + V-ing', pattern: 'Instead of + V-ing, + 主文', phrases: [
        'Instead of giving up, face the problem, think deeply, and take action.',
        'Instead of applying another workaround, we should fix the root cause.',
        'Instead of rewriting the whole module, we can patch the affected function.'
      ]},
      { tag: 'rather', title: 'Rather than + V-ing', pattern: 'Rather than + V-ing, + 主文', tip: '`Instead of` と `Rather than` はほぼ同義。`Rather than` はやや比較・優先のニュアンスが強い。', phrases: [
        'Rather than applying a workaround, we should fix the root cause.',
        'To see challenges as opportunities rather than obstacles.',
        "Rather than just testing locally, we should verify in the staging environment."
      ]},
      { tag: 'prefer', title: 'prefer to + V + rather than + V', pattern: 'I prefer to + V + rather than + V', phrases: [
        'I prefer to debug step by step rather than guessing the cause.',
        'I prefer to study in the morning rather than at night.',
        'The team prefers to apply a fix rather than roll back.'
      ]}
    ]
  },
  {
    id: 'p11', code: 'P11', chunk: 'expose / reveal / evolve', title: '変化・露出・進化を示す構文', level: 'B2',
    desc: '「〜が明らかになった」「〜が進化している」という変化・発見を述べる構文。',
    sections: [
      { tag: 'expose', title: 'expose / reveal + 名詞', pattern: 'Subject + exposed/revealed + 名詞', tip: '`expose` は「潜んでいたものを表面化させる」、`reveal` は「明らかにする・明示する」。', phrases: [
        'Some recent changes have exposed a latent issue we were unaware of.',
        'The test results revealed an unexpected dependency between modules.',
        'The log data exposed a race condition in the initialization sequence.'
      ]},
      { tag: '現在完了', title: 'have + 過去分詞（変化の結果）', pattern: 'Subject + has/have + 過去分詞', tip: '現在完了で「変化の結果が今に続いている」ことを示す。`in the past few years` などと組み合わせると自然。', phrases: [
        'Some recent changes have exposed a latent issue.',
        'The new product has been sold well.',
        'Backend development has also evolved rapidly.'
      ]},
      { tag: 'the more', title: 'the + 比較級 ~, the + 比較級 ~', pattern: 'The + 比較級 + S + V, the + 比較級 + S + V', phrases: [
        'The more we test, the more confident we can be in the release.',
        'The clearer the requirements, the easier the implementation.',
        'The earlier we detect the issue, the less time it takes to fix.'
      ]}
    ]
  },
  {
    id: 'p12', code: 'P12', chunk: 'in order to / so that / for', title: '目的を示す構文', level: 'B1/B2',
    desc: '「〜するために」という目的を示す構文の使い分け。',
    sections: [
      { tag: 'in order to', title: 'in order to + V', pattern: 'Subject + V + in order to + 動詞の原形', phrases: [
        'Added logs to the code in order to trace the behavior.',
        'The module sends a request to the server in order to retrieve the list.',
        'We need to compile the performance data in order to analyze the issue.'
      ]},
      { tag: 'to+V', title: 'to + V（簡略形）', pattern: 'Subject + V + to + 動詞の原形', tip: '`to + V` は `in order to + V` の簡略形。日常会話では `to` だけで十分。', phrases: [
        'I will try to reproduce the bug while monitoring the logs and memory usage.',
        'We use the tool to organize the tasks.',
        'I often listen to tech podcasts while walking to make use of commute time.'
      ]},
      { tag: 'so that', title: 'so that + S + can + V', pattern: 'Subject + V + so that + S + can/will + V', phrases: [
        'So that I can improve my speaking skills, I practice every day.',
        'We added the code so that the internal clock does not jump backwards.',
        'Please keep a record of all bugs so that we can refer to them in the future.'
      ]},
      { tag: '比較', title: '目的表現まとめ', isCompare: true, compare: [
        { phrase: 'to + V', desc: '最も一般的・簡潔（B1）' },
        { phrase: 'in order to + V', desc: '目的を強調する（B2）' },
        { phrase: 'so that + can + V', desc: '結果・効果を意識した目的（B2）' },
        { phrase: 'for + 名詞', desc: '目的を名詞で示す（B1）' }
      ]}
    ]
  },
  {
    id: 'p13', code: 'P13', chunk: 'Based on ~ / According to ~', title: '根拠・参照の型', level: 'B2',
    desc: '情報の出所・根拠を示す構文。「〜に基づいて」「〜によると」の形。',
    sections: [
      { tag: 'based on', title: 'Based on ~ — 〜に基づいて', pattern: 'Based on + 名詞, + 主文', phrases: [
        'Based on past trends, the issue tends to occur more frequently after updates.',
        'Based on the log data, the crash is caused by a memory leak.',
        'Based on the rough design, we calculated a price estimate.'
      ]},
      { tag: 'according to', title: 'According to ~ — 〜によると', pattern: 'According to + 情報源, + 主文', tip: '`According to` は情報源を引用する。`Based on` は情報を根拠に判断を述べる、というニュアンスの違いがある。', phrases: [
        'According to the engineer in the US, there are tips for communicating with Japanese teams.',
        'According to the specification, the parameter should be configurable.',
        'According to the test results, the new version performs 7% better.'
      ]},
      { tag: 'given', title: 'given that ~ — 〜を考えると', pattern: 'Given that + S + V, + 主文', phrases: [
        "Given that we're behind schedule, we should prioritize the critical fixes.",
        'Given that the hardware team confirmed the spec, we can proceed.',
        'Given that the issue is intermittent, a log capture would help most.'
      ]}
    ]
  },
  {
    id: 'p14', code: 'P14', chunk: 'When ~ / Even when ~', title: '状況・条件を前置きする型', level: 'B1/B2',
    desc: '「〜なとき」「〜のときでさえ」という状況を前置きして、そのときの行動・感情を説明する構文。',
    sections: [
      { tag: 'when', title: 'When + S + V, + 主文', pattern: 'When + S + V, + [行動/感情/結果]', phrases: [
        "When things don't go well, try to stay positive.",
        'When my work supports others, I feel proud.',
        "When the voltage drops, the audio module stops responding."
      ]},
      { tag: 'even when', title: 'Even when + S + V — 〜のときでさえ', pattern: 'Even when + S + V, + 主文', tip: '`even when` は「そういう困難な状況でも」という逆境強調の意味が加わる。', phrases: [
        "Even when I'm busy, just talking with them for a few minutes gives me energy.",
        'Even when the test passes, we should still verify in the production environment.',
        "Even when I'm tired, I try to do at least 10 minutes of English study."
      ]},
      { tag: 'whenever', title: 'Whenever + S + V — 〜するたびに', pattern: 'Whenever + S + V, + 主文', phrases: [
        'Whenever I solve a difficult bug, I get a sense of achievement.',
        'Whenever the system restarts, the settings are lost.',
        'Whenever I work with the US team, I find new ways to communicate more effectively.'
      ]}
    ]
  },
  {
    id: 'p15', code: 'P15', chunk: 'Firstly / Secondly / The first benefit is ~', title: '意見を構造化する型', level: 'B2',
    desc: '意見・理由を複数の観点から整理して述べる構文。スピーキング・ライティング両方で使える。',
    sections: [
      { tag: 'firstly', title: 'for two reasons. Firstly, ~ Secondly, ~', pattern: 'I + 意見 + for two reasons. Firstly, + 理由1. Secondly, + 理由2.', tip: '意見を述べてから理由を列挙する。スピーキングでは `First, ~ Second, ~` でも自然。', phrases: [
        'I agree with this approach for two reasons. Firstly, it requires minimal code changes. Secondly, it can be tested independently.',
        "I chose this for two reasons. Firstly, it's faster to implement. Secondly, it doesn't affect other modules."
      ]},
      { tag: 'benefit', title: 'The first benefit is ~ / The second benefit is ~', pattern: 'The first benefit is that + S + V', phrases: [
        'The first benefit is that it reduces manual work.',
        "The second benefit is that it's easy to maintain.",
        'The main advantage is that it works without any additional configuration.'
      ]},
      { tag: 'what I like', title: 'What I like the most is ~', pattern: 'What I like / appreciate the most is (that) + 文', phrases: [
        "What I like the most is that it's easy to set up and maintain.",
        'What I appreciate about this approach is its simplicity.',
        'What I find most challenging is expressing ideas quickly in a meeting.'
      ]},
      { tag: 'among', title: 'Among them, I think ~ is the most ~', pattern: 'Among them, I think + 名詞 + is the most + 形容詞', phrases: [
        'Among them, I think the memory leak issue is the most critical.',
        'Among them, I think sumo is the most popular traditional Japanese sport.',
        'Among the options, I think Option A is the most practical.'
      ]}
    ]
  }
]
