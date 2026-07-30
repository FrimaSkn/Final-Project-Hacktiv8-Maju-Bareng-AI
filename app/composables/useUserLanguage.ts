type SupportedLanguage = 'id' | 'en' | 'ja' | 'ko' | 'zh' | 'ms'

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['id', 'en', 'ja', 'ko', 'zh', 'ms']

export function useUserLanguage(): { lang: ComputedRef<SupportedLanguage> } {
  const lang = computed<SupportedLanguage>(() => {
    if (!import.meta.client) return 'en'

    const browserLang = navigator.language.toLowerCase()
    const baseLang = browserLang.split('-')[0] as SupportedLanguage

    if (SUPPORTED_LANGUAGES.includes(baseLang)) {
      return baseLang
    }

    return 'en'
  })

  return { lang }
}
