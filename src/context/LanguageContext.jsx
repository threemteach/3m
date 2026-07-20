import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { en, ar } from '../i18n/translations.js'

export const LanguageContext = createContext()

const translations = { en, ar }

function getCookie(name) {
  try {
    return document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1]
  } catch { return null }
}

function setCookie(name, value) {
  try {
    document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Lax`
  } catch {}
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const cached = getCookie('lang')
      if (cached) return cached
      const navLang = navigator.language || navigator.userLanguage || ''
      return navLang.startsWith('ar') ? 'ar' : 'en'
    } catch { return 'en' }
  })

  const setLang = useCallback((l) => {
    setLangState(l)
    setCookie('lang', l)
  }, [])

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = lang
    document.documentElement.classList.toggle('rtl', dir === 'rtl')
    document.title = lang === 'ar'
      ? '3M tech — استوديو صناعة البرمجيات الرقمية'
      : '3M tech — Digital Craftsmanship Studio'
  }, [lang])

  const t = useCallback((key) => {
    const keys = key.split('.')
    let val = translations[lang]
    for (const k of keys) {
      val = val?.[k]
    }
    return val ?? key
  }, [lang])

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useTranslation = () => {
  const ctx = useContext(LanguageContext)
  return { t: ctx.t, lang: ctx.lang, setLang: ctx.setLang, dir: ctx.dir }
}
