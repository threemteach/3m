import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ArrowRight, Globe, ShoppingCart, Store, Cloud, Palette, Lightbulb } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'
import useLockedBody from '../../hooks/useLockedBody.js'

const icons = [
  <Globe size={16} />,
  <ShoppingCart size={16} />,
  <Store size={16} />,
  <Cloud size={16} />,
  <Palette size={16} />,
]
const accents = ['var(--accent-fire)', 'var(--accent-neon)', '#95BF47', 'var(--accent-fire)', 'var(--accent-neon)']
const cols = ['md:col-span-2', '', '', '', '']

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const itemAnim = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

export default function Services() {
  const [selected, setSelected] = useState(null)
  const { t, lang } = useTranslation()
  const servicesData = t('services.list').map((s, i) => ({ ...s, icon: icons[i], accent: accents[i], cols: cols[i] }))

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: servicesData.map(s => ({
        '@type': 'Question',
        name: s.title,
        acceptedAnswer: { '@type': 'Answer', text: s.tagline },
      })),
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'faq-schema'
    script.textContent = JSON.stringify(faqSchema)
    document.head.appendChild(script)
    return () => document.getElementById('faq-schema')?.remove()
  }, [lang])

  useLockedBody(!!selected)

  return (
    <section id="services" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('services.label')}</span>
          <h2 className="section-heading">{t('services.heading')}</h2>
          <p className="section-body mx-auto">{t('services.desc')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {servicesData.map((s, i) => (
            <motion.button
              key={i}
              variants={itemAnim}
              onClick={() => setSelected({ ...s, origIndex: i })}
              className={`group relative rounded-2xl p-6 md:p-8 border text-left cursor-pointer transition-all duration-700 ease-out hover:-translate-y-1 ${s.cols}`}
              style={{
                background: 'var(--bg-secondary)',
                borderColor: 'var(--card-border, var(--border))',
                boxShadow: 'var(--card-shadow, none)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.setProperty('--card-border', s.accent)
                e.currentTarget.style.setProperty('--card-shadow', `0 8px 30px color-mix(in srgb, ${s.accent} 12%, transparent)`)
              }}
              onMouseLeave={e => {
                e.currentTarget.style.removeProperty('--card-border')
                e.currentTarget.style.removeProperty('--card-shadow')
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="hero-service-icon" style={{ background: `linear-gradient(135deg, ${s.accent}, color-mix(in srgb, ${s.accent} 60%, var(--accent-electric)))` }}>{s.icon}</span>
                <h3 className="font-space font-semibold text-lg">{s.title}</h3>
              </div>
              <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>
                {s.tagline}
              </p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.tech.slice(0, 3).map(t => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `color-mix(in srgb, ${s.accent} 8%, transparent)`, color: s.accent }}
                  >
                    {t}
                  </span>
                ))}
                {s.tech.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                    +{s.tech.length - 3}
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: s.accent }}>
                {lang === 'en' ? 'Learn more' : 'اعرف أكثر'} <ArrowRight size={12} />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ServiceModal service={selected} onClose={() => setSelected(null)} lang={lang} />
        )}
      </AnimatePresence>
    </section>
  )
}

function ServiceModal({ service, onClose, lang }) {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto"
      style={{ background: 'rgba(8, 11, 20, 0.85)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl mx-4 my-8 md:my-16 rounded-3xl overflow-hidden"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 h-14 border-b" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <span className="hero-service-icon hero-service-icon-sm" style={{ background: `linear-gradient(135deg, ${service.accent}, color-mix(in srgb, ${service.accent} 60%, var(--accent-electric)))` }}>{service.icon}</span>
            <span className="font-space font-semibold">{service.title}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer transition-colors hover:border-[var(--accent-fire)]"
            style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-lg md:text-xl font-medium mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {service.tagline}
          </p>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {service.desc}
          </p>

          <div className="mb-8">
            <h4 className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'Who This Is For' : 'مَن يستخدم هذه الخدمة'}
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {service.audience}
            </p>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'Why 3M tech' : 'لماذا 3M tech'}
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {service.whyUs}
            </p>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'Business Benefits' : 'فوائد تجارية'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {service.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Check size={14} className="shrink-0 mt-0.5" style={{ color: service.accent }} />
                  {b}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'How We Do It' : 'كيف نعمل'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.process.map((p, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `color-mix(in srgb, ${service.accent} 12%, transparent)`, color: service.accent }}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold">{p.step}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'Technologies' : 'التقنيات'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.tech.map(t => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: `color-mix(in srgb, ${service.accent} 8%, transparent)`, color: service.accent }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-5 mb-8 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', borderLeft: `3px solid ${service.accent}` }}>
            <div className="flex items-start gap-3">
              <span className="text-lg shrink-0"><Lightbulb size={20} /></span>
              <div>
                  <span className="text-xs font-semibold tracking-wider" style={{ color: 'var(--text-muted)' }}>{lang === 'en' ? 'Real Impact' : 'تأثير حقيقي'}</span>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{service.useCase}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="gradient"
              size="md"
              className="group"
              onClick={() => { onClose(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300) }}
            >
              {service.cta} <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button variant="ghost" size="md" onClick={onClose}>
              {lang === 'en' ? 'Explore other services' : 'استعرض خدمات أخرى'}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
