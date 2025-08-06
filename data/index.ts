// Mock data for the Persian Reading Tutor app
// These would be replaced with actual API calls in a production environment

export const wordLookupExample = {
  word: "نمونه",
  definition: "معنی به فارسی (برای زبان‌آموزان پیشرفته)",
  translation: "example (English translation for second-language mode)",
  pronunciation: "/næmuːnɛ/ (IPA notation)",
  partOfSpeech: "noun",
  example: "این یک نمونه خوب است.",
  exampleTranslation: "This is a good example.",
  synonyms: ["مثال", "الگو"],
  antonyms: ["غیرنمونه"],
};

export const sentenceParaphraseExample = {
  original_sentence: "جمله اصلی به فارسی.",
  paraphrase_persian: "جمله بازنویسی شده به فارسی ساده‌تر.",
  paraphrase_english: "English paraphrase for second-language learners.",
  explanation: "این بازنویسی برای ساده‌سازی ساختار جمله انجام شده است، با تمرکز بر واژگان کلیدی.",
};

export const timelineExample = [
  {
    event: "جان پرواز کرد و رفت.",
    description: "جان از خانه خارج شد و به فرودگاه رفت.",
    date: "1404-05-01",
    entities: ["جان", "فرودگاه"],
    importance: "high" as const
  },
  {
    event: "جان در جامائیکا فرود آمد.",
    description: "او به مقصد رسید و شروع به گشت و گذار کرد.",
    date: "1404-05-02",
    entities: ["جان", "جامائیکا"],
    importance: "medium" as const
  },
  {
    event: "جان عشق زندگی‌اش را ملاقات کرد.",
    description: "در یک مهمانی محلی، او با کسی آشنا شد.",
    date: "1404-05-03",
    entities: ["جان", "عشق زندگی"],
    importance: "high" as const
  }
];

export const narrativeInsightsExample = {
  narrative_structure: {
    beginning: "معرفی شخصیت‌ها و صحنه اولیه.",
    middle: "اوج داستان با رویدادهای کلیدی.",
    end: "حل مسئله و نتیجه‌گیری."
  },
  themes: ["عشق", "سفر", "کشف خود"],
  tone: "رسمی و الهام‌بخش (formal and inspirational)",
  key_insights: [
    "داستان بر پایه عناصر فرهنگی ایرانی ساخته شده است.",
    "تمرکز بر رشد شخصیتی (adjusted for learner mode)."
  ],
  symbolism: "پرواز نماد آزادی است."
};

export const comprehensionQuestionsExample = [
  {
    question: "جان کجا فرود آمد؟",
    options: [
      "ایران",
      "جامائیکا",
      "آمریکا",
      "فرانسه"
    ],
    correct_answer: "جامائیکا",
    explanation: "بر اساس متن، جان در جامائیکا فرود آمد (with English translation in second-language mode)."
  },
  {
    question: "تم اصلی داستان چیست؟",
    options: [
      "جنگ",
      "عشق و کشف",
      "اقتصاد",
      "سیاست"
    ],
    correct_answer: "عشق و کشف",
    explanation: "داستان بر سفر و ملاقات عشقی تمرکز دارد."
  }
];

export const summaryExample = {
  full_summary: "خلاصه کامل متن به فارسی (با ترجمه انگلیسی در حالت second-language).",
  key_points: [
    "نقطه کلیدی ۱",
    "نقطه کلیدی ۲"
  ],
  length: "short" as const
};
