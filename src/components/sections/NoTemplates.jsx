import { motion } from 'framer-motion'
import { useTranslation } from '../../context/LanguageContext.jsx'

export default function NoTemplates() {
  const { lang } = useTranslation()

  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto text-center">

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          {lang === 'ar' ? ' فلسفتنا' : 'OUR PHILOSOPHY'}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6 leading-tight mt-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {lang === 'ar'
            ? <>لا نستخدم القوالب. <span style={{ color: 'var(--accent-fire)' }}>نبني كل شيء من الصفر.</span></>
            : <>We don't use templates. <span style={{ color: 'var(--accent-fire)' }}>We build everything from scratch.</span></>
          }
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {lang === 'ar'
            ? 'كل تصميم فريد، كل كود مكتوب خصيصاً لك. لا قوالب جاهزة، لا حلول متساوية — فقط منتج مصمم حول علامتك التجارية وأهدافك.'
            : 'Every design is unique, every line of code is written specifically for you. No pre-built templates, no one-size-fits-all — just a product crafted around your brand and your goals.'
          }
        </motion.p>

      </div>
    </section>
  )
}
