import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '../../context/LanguageContext.jsx'

export default function Process() {
  const lineRef = useRef(null)
  const [lineLength, setLineLength] = useState(0)
  const { t, lang } = useTranslation()
  const isRTL = lang === 'ar'
  const steps = t('process.steps').map((s, i) => ({ ...s, num: `0${i + 1}` }))

  useEffect(() => {
    if (lineRef.current) setLineLength(lineRef.current.getBBox().height)
  }, [])

  return (
    <section id="process" className="py-24 px-6 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('process.label')}</span>
          <h2 className="section-heading">{t('process.heading')}</h2>
        </motion.div>

        <div className="relative">

          {/* Desktop line — always centred */}
          <svg
            ref={lineRef}
            className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2"
            width="2" height="100%"
            style={{ overflow: 'visible' }}
          >
            <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--border)" strokeWidth="2" strokeDasharray="8 6" />
            <line x1="1" y1="0" x2="1" y2={lineLength} stroke="var(--accent-fire)" strokeWidth="2" strokeDasharray="8 6"
              style={{ transition: 'stroke-dashoffset 2s ease' }} />
          </svg>

          {/* Mobile line — follows the circle side (left for EN, right for AR) */}
          <svg
            className="md:hidden absolute top-0"
            width="2" height="100%"
            style={{
              overflow: 'visible',
              left: isRTL ? 'auto' : '1.25rem',
              right: isRTL ? '1.25rem' : 'auto',
            }}
          >
            <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--border)" strokeWidth="2" strokeDasharray="8 6" />
            <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--accent-fire)" strokeWidth="2" strokeDasharray="8 6" />
          </svg>

          <div className="space-y-12 md:space-y-16">
            {steps.map((s, i) => {
              const even = i % 2 === 0
              // EN: even→left half, odd→right half
              // AR: even→right half, odd→left half
              const goesLeft = isRTL ? !even : even

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                >

                  {/* ── MOBILE: circle always left, text to the right ──
                      Same structure for EN and AR.
                      AR gets text-right so Arabic reads naturally.
                      The circle IS the left-5 anchor — it sits directly over the line. */}
                  {/* Mobile layout — force dir=ltr so flex order matches DOM order.
                      EN: [circle][text]   circle on LEFT,  line left-5
                      AR: [text][circle]   circle on RIGHT, line right-5
                      Text alignment is handled per-language inside.           */}
                  <div className="flex items-start gap-3 md:hidden" dir="ltr">
                    {/* EN: circle first → left */}
                    {!isRTL && (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10"
                        style={{ background: 'var(--accent-fire)', color: '#fff', boxShadow: '0 0 0 4px var(--bg-secondary)' }}
                      >
                        {s.num}
                      </div>
                    )}

                    <div className={`flex-1 pt-1 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      <h3 className="font-space font-semibold text-xl mb-2">{s.title}</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                    </div>

                    {/* AR: circle last → right */}
                    {isRTL && (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 z-10"
                        style={{ background: 'var(--accent-fire)', color: '#fff', boxShadow: '0 0 0 4px var(--bg-secondary)' }}
                      >
                        {s.num}
                      </div>
                    )}
                  </div>

                  {/* ── DESKTOP: 3-column grid [left | circle | right] ──
                      dir=ltr forces physical left→right column order regardless of page dir.
                      Text inside each column gets its own dir for correct Arabic rendering.  */}
                  <div className="hidden md:grid items-center" dir="ltr" style={{ gridTemplateColumns: '1fr 4rem 1fr' }}>

                    {/* Col 1 — physical LEFT half */}
                    <div className="pr-8 transition-all duration-700 ease-out hover:-translate-y-0.5">
                      {goesLeft && (
                        <div dir={isRTL ? 'rtl' : 'ltr'} className="text-right">
                          <h3 className="font-space font-semibold text-xl mb-2">{s.title}</h3>
                          <p style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Col 2 — circle, always centred */}
                    <div className="flex items-center justify-center relative z-10">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: 'var(--accent-fire)', color: '#fff', boxShadow: '0 0 0 4px var(--bg-secondary)' }}
                      >
                        {s.num}
                      </div>
                    </div>

                    {/* Col 3 — physical RIGHT half */}
                    <div className="pl-8 transition-all duration-700 ease-out hover:-translate-y-0.5">
                      {!goesLeft && (
                        <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'text-right' : 'text-left'}>
                          <h3 className="font-space font-semibold text-xl mb-2">{s.title}</h3>
                          <p style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}