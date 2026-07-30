export type SupportedLanguage = 'id' | 'en' | 'ja' | 'ko' | 'zh' | 'ms'

export interface SupportBannerTranslation {
  message: string
  cta: string
  searchQuery: string
}

export const SUPPORT_BANNER_TRANSLATIONS: Record<SupportedLanguage, SupportBannerTranslation> = {
  id: {
    message: 'Sepertinya Anda sedang mengalami masa sulit. Anda tidak sendirian — berbicara dengan seseorang yang bisa membantu sangat berarti.',
    cta: 'Temukan layanan kesehatan mental',
    searchQuery: 'Layanan Sejiwa 119 kesehatan mental Indonesia',
  },
  en: {
    message: "It seems you're going through a difficult time. You're not alone — talking to someone who can help can mean a lot.",
    cta: 'Find mental health support',
    searchQuery: 'mental health support services',
  },
  ja: {
    message: '大変な時期を過ごしているようです。あなたは一人ではありません — 支えてくれる人と話すことはとても重要です。',
    cta: '心の健康サポートを見つける',
    searchQuery: 'こころの耳 心理相談',
  },
  ko: {
    message: '어려운 시간을 보내고 계신 것 같습니다. 혼자가 아닙니다 — 도움을 줄 수 있는 사람과 이야기하는 것이 큰 도움이 될 수 있습니다.',
    cta: '정신건강 지원 찾기',
    searchQuery: '정신건강 위기상담 전화',
  },
  zh: {
    message: '看起来您正在经历一段困难时期。您并不孤单 — 与能够帮助您的人交谈可能会有很大意义。',
    cta: '寻找心理健康支持',
    searchQuery: '心理援助热线',
  },
  ms: {
    message: 'Nampaknya anda sedang melalui masa yang sukar. Anda tidak keseorangan — bercakap dengan seseorang yang boleh membantu sangat bermakna.',
    cta: 'Cari sokongan kesihatan mental',
    searchQuery: 'Talian Kasih 15999 kesihatan mental Malaysia',
  },
}
