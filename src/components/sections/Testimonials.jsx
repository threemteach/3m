import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useTranslation } from '../../context/LanguageContext.jsx'

const testimonials = [
  { name: 'أحمد', nameEn: 'Ahmed', business: 'عقارات الإسكندرية', businessEn: 'Alexandria Real Estate', textEn: 'They built our property listing platform from scratch. The team understood exactly what we needed and delivered in two weeks. Direct communication with the developer made all the difference.', textAr: 'بنوا لنا منصة عقارات من الصفر. الفريق فهم بالضبط احتياجاتنا وسلّم في أسبوعين. التواصل المباشر مع المطور كان هو الفارق الحقيقي.', rating: 5 },
  { name: 'سارة', nameEn: 'Sarah', business: 'متجر إلكتروني', businessEn: 'Online Boutique', textEn: 'I needed a Shopify store that actually works for the Egyptian market — local payments, local shipping. They set everything up and it\'s been running smoothly since day one.', textAr: 'كنت محتاجة متجر Shopify يشتغل فعليًا للسوق المصري — مدفوعات محلية وشحن محلي. هما ضبطوا كل حاجة والشغّال ماشي بسلاسة من أول يوم.', rating: 5 },
  { name: 'محمد', nameEn: 'Mohamed', business: 'شركة تقنية ناشئة', businessEn: 'Tech Startup', textEn: 'We came with just a rough idea and they turned it into a working MVP in three weeks. No fluff, no delays — just honest work delivered on time.', textAr: 'جينا بفكرة بس وهما حولوها لـ MVP شغالة في تلات أسابيع. بدون مبالغة ولا تأخير — شغل نضيف ومسلّم في الوقت المحدد.', rating: 5 },
]

export default function Testimonials() {
  const { t, lang } = useTranslation()
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" className="py-24 px-6 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="section-label">{lang === 'en' ? 'TESTIMONIALS' : 'توصيات العملاء'}</span>
          <h2 className="section-heading">
            {lang === 'en' ? 'What Our Clients Say' : 'ماذا يقول عملاؤنا'}
          </h2>
          <p className="section-body mx-auto">
            {lang === 'en' ? 'Real words from real clients.' : 'كلمات حقيقية من عملاء حقيقيين.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl p-6 md:p-8 border flex flex-col"
              style={{
                background: 'var(--bg-primary)',
                borderColor: i === active ? 'var(--accent-fire)' : 'var(--border)',
              }}
              onMouseEnter={() => setActive(i)}
            >
              <Quote size={24} className="mb-3" style={{ color: 'var(--accent-fire)', opacity: 0.3 }} />

              <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--text-secondary)' }}>
                "{lang === 'en' ? test.textEn : test.textAr}"
              </p>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: test.rating }).map((_, s) => (
                  <Star key={s} size={14} fill="var(--accent-fire)" style={{ color: 'var(--accent-fire)' }} />
                ))}
              </div>

              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {lang === 'en' ? test.nameEn : test.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'en' ? test.businessEn : test.business}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
