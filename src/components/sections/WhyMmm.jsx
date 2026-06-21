import { motion } from 'framer-motion'
import { Zap, Shield, Users, Clock, BarChart3, MessageCircle } from 'lucide-react'
import { useTranslation } from '../../context/LanguageContext.jsx'

const icons = [Clock, Shield, Users, BarChart3, MessageCircle, Zap]
const iconColors = ['var(--accent-fire)', 'var(--accent-neon)', 'var(--accent-electric)', 'var(--accent-fire)', 'var(--accent-neon)', 'var(--accent-electric)']

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const itemAnim = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

export default function WhyMmm() {
  const { t } = useTranslation()
  const cards = t('whyMmm.cards')

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-electric), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('whyMmm.label')}</span>
          <h2 className="section-heading">{t('whyMmm.heading')}</h2>
          <p className="section-body mx-auto">{t('whyMmm.desc')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map((d, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={i}
                variants={itemAnim}
                className="rounded-2xl p-6 md:p-8 border"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconColors[i], color: '#fff' }}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-space font-semibold text-lg mb-1">{d.title}</h3>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'color-mix(in srgb, var(--accent-neon) 8%, transparent)', color: 'var(--accent-neon)' }}>
                        {t('whyMmm.badgeUs')}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--accent-neon)' }}>{d.us}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'color-mix(in srgb, var(--accent-fire) 8%, transparent)', color: 'var(--accent-fire)' }}>
                        {t('whyMmm.badgeThem')}
                      </span>
                      <span className="text-sm line-through" style={{ color: 'var(--text-muted)' }}>{d.them}</span>
                    </div>

                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{d.detail}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center p-8 rounded-3xl border"
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
        >
          <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {t('whyMmm.bottomLine')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
