import { useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'

function AnimatedGradientText({ children }) {
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)

  useEffect(() => {
    if ('ontouchstart' in window) return
    function move(e) {
      setX((e.clientX / window.innerWidth) * 100)
      setY((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <span
      className="hero-gradient-text"
      style={{
        backgroundImage: `radial-gradient(circle at ${x}% ${y}%, #d96b4a, var(--accent-fire))`,
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </span>
  )
}

function Typewriter({ words }) {
  const [wi, setWi] = useState(0)
  const [d, setD] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = words[wi]
    let t
    if (!del) {
      if (d.length < cur.length) t = setTimeout(() => setD(cur.slice(0, d.length + 1)), 60)
      else t = setTimeout(() => setDel(true), 2000)
    } else {
      if (d.length > 0) t = setTimeout(() => setD(d.slice(0, -1)), 30)
      else { setDel(false); setWi((wi + 1) % words.length) }
    }
    return () => clearTimeout(t)
  }, [d, del, wi])

  return (
    <span className="hero-typewriter">
      <span className="hero-typewriter-text">{d}</span>
      <span className="hero-typewriter-cursor" />
    </span>
  )
}

export default function Hero() {
  const { t, lang } = useTranslation()
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 0.3], ['0%', '12%'])
  const isRTL = lang === 'ar'

  return (
    <section id="hero" className="hero-section hero-section-v2">

      {/* ── SVG beam background ── */}
      <motion.div className="hero-svg-bg" style={{ y: bgY }} aria-hidden="true">
        <img
          src="/background.svg"
          alt=""
          className="hero-svg-img"
          draggable="false"
        />
      </motion.div>

      {/* ── Noise grain ── */}
      <div className="hero-noise" />

      {/* ── Centred content ── */}
      <div className="hero-content hero-content-v2">
        <div className="hero-inner-v2">

          {/* Badge */}
          <div className="hero-badge hero-anim-fade-up" style={{ animationDelay: '0s' }}>
            <span className="hero-badge-dot" />
            <Sparkles size={12} />
            <span>{t('hero.label')}</span>
          </div>

          {/* Heading */}
          <h1
            className="hero-heading hero-heading-v2 hero-anim-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="hero-heading-line">{t('hero.line1')}</span>
            <span className="hero-heading-line">
              {t('hero.line2')}{' '}
              <AnimatedGradientText>{t('hero.line3')}</AnimatedGradientText>
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="hero-tagline hero-tagline-v2 hero-anim-fade-up-50"
            style={{ animationDelay: '0.2s' }}
          >
            {t('hero.tagline')}
          </p>

          {/* Typewriter */}
          <div
            className="hero-typewriter-wrap hero-typewriter-v2 hero-anim-fade"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="hero-typewriter-label">{t('hero.weBuild')}</span>
            <Typewriter words={t('hero.words')} />
          </div>

          {/* CTAs */}
          <div
            className="hero-cta-group hero-cta-v2 hero-anim-fade-up-50"
            style={{ animationDelay: '0.35s' }}
          >
            <Button
              variant="gradient"
              size="md"
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="group hero-cta-primary"
            >
              {t('hero.seeOurWork')}
              {isRTL
                ? <ArrowLeft size={16} className="hero-cta-arrow" />
                : <ArrowRight size={16} className="hero-cta-arrow" />}
            </Button>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-cta-secondary"
            >
              {t('hero.getQuote')}
              {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
