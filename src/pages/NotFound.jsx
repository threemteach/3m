import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext.jsx'
import useSEO from '../hooks/useSEO.js'

export default function NotFound() {
  const { t, dir } = useTranslation()
  useSEO({ title: '404', description: 'Page not found', path: '', noindex: true })

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 600px 300px at 50% 40%, var(--glow-violet), transparent 70%)',
      }} />

      <div className="relative z-10 text-center max-w-lg">
        <div className="text-[clamp(6rem,12vw,10rem)] font-space font-bold leading-none mb-4" style={{
          background: 'linear-gradient(135deg, var(--accent-fire), #d96b4a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          404
        </div>
        <h1 className="font-space font-bold text-2xl md:text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
          {dir === 'rtl' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-sm md:text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
          {dir === 'rtl'
            ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
            : 'Sorry, the page you\'re looking for doesn\'t exist or has been moved.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
          style={{ background: 'linear-gradient(135deg, var(--accent-fire), #d96b4a)' }}
        >
          {dir === 'rtl' ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          {dir === 'rtl' ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </div>
    </section>
  )
}
