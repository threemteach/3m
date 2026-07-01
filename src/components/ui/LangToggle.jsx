import { useTranslation } from '../../context/LanguageContext.jsx'

export default function LangToggle() {
  const { lang, setLang } = useTranslation()

  function toggle() {
    const next = lang === 'en' ? 'ar' : 'en'
    setLang(next)
    window.location.reload()
  }

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border cursor-pointer transition-all duration-200 hover:border-[var(--accent-electric)]"
      style={{
        background: 'var(--bg-tertiary)',
        borderColor: 'var(--border)',
        color: 'var(--text-secondary)',
      }}
      aria-label="Toggle language"
    >
      {lang === 'en' ? 'ع' : 'EN'}
    </button>
  )
}
