import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useTranslation } from '../../context/LanguageContext.jsx'

export default function CTA() {
  const { t, lang } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(true)
      return
    }
    setError(false)

    const msg = `Email: ${form.email}${form.phone ? `\nPhone: ${form.phone}\n\n` : '\n\n'}${form.message}`
    emailjs.send(
      'service_l17n15p',
      'template_vhq0tqq',
      {
        name: form.name,
        email: form.email,
        message: msg,
      },
      'xB0arVXO19fOPn-7g',
    ).then(() => {
      setSubmitted(true)
    }).catch(() => {
      setError(true)
    })
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 dark:opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, var(--accent-electric) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, var(--accent-fire) 0%, transparent 50%)',
          animation: 'pulse-glow 4s ease-in-out infinite alternate',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-2xl mx-auto text-center"
      >
        <h2 className="font-space font-bold text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] mb-4">
          {t('cta.heading')}<br />
          <span style={{ color: 'var(--accent-fire)' }}>{t('cta.headingAccent')}</span>
        </h2>
        <p className="text-base md:text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {t('cta.desc')}
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-12"
          >
            <CheckCircle size={48} style={{ color: 'var(--accent-fire)' }} />
            <p className="text-lg font-medium">{t('cta.formSuccess')}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left max-w-lg mx-auto">
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('cta.formName')}
                className="w-full rounded-xl px-5 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  '--tw-ring-color': 'var(--accent-fire)',
                }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('cta.formEmail')}
                className="w-full rounded-xl px-5 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t('cta.formPhone')}
                className="w-full rounded-xl px-5 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder={t('cta.formMessage')}
                className="w-full rounded-xl px-5 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 resize-none"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            {error && (
              <p className="text-sm text-center" style={{ color: 'var(--accent-fire)' }}>
                {t('cta.formError')}
              </p>
            )}

            <button
              type="submit"
              className="w-full border-none cursor-pointer text-sm font-semibold rounded-xl px-6 py-3.5 transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2"
              style={{ background: 'var(--accent-fire)', color: '#FFF7E9' }}
            >
              {t('cta.formSubmit')} <Send size={16} />
            </button>
          </form>
        )}

        <p className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>
          {t('cta.footnote')}
        </p>
      </motion.div>
    </section>
  )
}
