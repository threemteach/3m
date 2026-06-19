import { useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Sparkles, Zap, Globe, Code2, Smartphone, ShoppingBag, Palette, ShoppingCart } from 'lucide-react'
import Button from '../ui/Button.jsx'
import ThreeBackground from '../ui/ThreeBackground.jsx'
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

function ServicePill({ icon: Icon, label, delay, color }) {
  return (
    <div className="hero-service-pill" style={{ '--anim-delay': delay + 's' }}>
      <span className="hero-service-pill-icon" style={{ color }}>
        <Icon size={14} />
      </span>
      <span>{label}</span>
    </div>
  )
}

function OrbitalVisual() {
  return (
    <div className="hero-orbital">
      <div className="hero-orbital-core">
        <div className="hero-orbital-core-inner">
          <Code2 size={28} strokeWidth={1.5} />
        </div>
      </div>
      <div className="hero-orbital-ring hero-orbital-ring-1">
        <div className="hero-orbital-dot" style={{ '--dot-color': 'var(--accent-fire)' }}>
          <Globe size={14} />
        </div>
      </div>
      <div className="hero-orbital-ring hero-orbital-ring-2">
        <div className="hero-orbital-dot" style={{ '--dot-color': 'var(--accent-fire)' }}>
          <Smartphone size={14} />
        </div>
      </div>
      <div className="hero-orbital-ring hero-orbital-ring-3">
        <div className="hero-orbital-dot" style={{ '--dot-color': 'var(--accent-fire)' }}>
          <ShoppingBag size={14} />
        </div>
      </div>
      <div className="hero-orbital-glow" />
    </div>
  )
}

const badgeIcons = {
  globe: Globe,
  'mobile-alt': Smartphone,
  palette: Palette,
}

function ServiceBadge({ icon, label, delay }) {
  const IconComp = badgeIcons[icon]
  return (
    <div className="hero-stat-card" style={{ '--anim-delay': delay + 's' }}>
      <span className="hero-stat-value" style={{ color: 'var(--accent-fire)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 16 }}>
        {IconComp && <IconComp size={14} />}
      </span>
      <span className="hero-stat-label" style={{ fontSize: 10 }}>{label}</span>
    </div>
  )
}

export default function Hero() {
  const { t, lang } = useTranslation()
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 0.3], ['0%', '20%'])
  const isRTL = lang === 'ar'

  const serviceItems = [
    { icon: Globe, label: lang === 'en' ? 'Web Apps' : 'تطبيقات ويب', color: 'var(--accent-fire)' },
    { icon: Smartphone, label: lang === 'en' ? 'Mobile' : 'جوال', color: 'var(--accent-fire)' },
    { icon: ShoppingBag, label: lang === 'en' ? 'E-Commerce' : 'تجارة إلكترونية', color: 'var(--accent-fire)' },
    { icon: Zap, label: lang === 'en' ? 'SaaS' : 'SaaS', color: 'var(--accent-fire)' },
  ]

  return (
    <section id="hero" className="hero-section">
      <ThreeBackground />

      <motion.div className="hero-bg-effects" style={{ y: bgY }}>
        <div className="hero-bg-gradient" />
        <div className="hero-bg-orb hero-bg-orb-1" />
        <div className="hero-bg-orb hero-bg-orb-2" />
        <div className="hero-bg-orb hero-bg-orb-3" />
      </motion.div>

      <div className="hero-noise" />

      <div className="hero-content">
        <div className="hero-layout">
          <div className="hero-text-side">
            <div className="hero-badge hero-anim-fade-up" style={{ animationDelay: '0s' }}>
              <span className="hero-badge-dot" />
              <Sparkles size={12} />
              <span>{t('hero.label')}</span>
            </div>

            <h1 className="hero-heading hero-anim-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="hero-heading-line">{t('hero.line1')}</span>
              <span className="hero-heading-line">
                {t('hero.line2')}{' '}
                <AnimatedGradientText>{t('hero.line3')}</AnimatedGradientText>
              </span>
            </h1>

            <p className="hero-tagline hero-anim-fade-up-50" style={{ animationDelay: '0.2s' }}>
              {t('hero.tagline')}
            </p>

            <div className="hero-typewriter-wrap hero-anim-fade" style={{ animationDelay: '0.3s' }}>
              <span className="hero-typewriter-label">{lang === 'en' ? 'We build' : 'نبني'}</span>
              <Typewriter words={t('hero.words')} />
            </div>

            <div className="hero-cta-group hero-anim-fade-up-50" style={{ animationDelay: '0.35s' }}>
              <Button
                variant="gradient"
                size="md"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="group hero-cta-primary"
              >
                {lang === 'en' ? 'See Our Work' : 'شاهد أعمالنا'}
                {isRTL ? <ArrowLeft size={16} className="hero-cta-arrow" /> : <ArrowRight size={16} className="hero-cta-arrow" />}
              </Button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta-secondary"
              >
                {lang === 'en' ? 'Get a free quote' : 'احصل على عرض سعر'}
                {isRTL ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
              </button>
            </div>

            <div className="hero-services-row hero-anim-fade" style={{ animationDelay: '0.5s' }}>
              {serviceItems.map((s, i) => (
                <ServicePill key={i} icon={s.icon} label={s.label} color={s.color} delay={0.55 + i * 0.08} />
              ))}
            </div>
          </div>

          <div className="hero-visual-side hero-anim-scale" style={{ animationDelay: '0.4s' }}>
            <div className="hero-grid-overlay" />
            <OrbitalVisual />

            <div className="hero-mockup-browser hero-anim-fade-up" style={{ animationDelay: '0.7s' }}>
              <div className="hero-mockup-browser-bar">
                <span /><span /><span />
              </div>
              <div className="hero-mockup-browser-body">
                <div className="hero-mockup-line hero-mockup-line-short" />
                <div className="hero-mockup-line hero-mockup-line-long" />
                <div className="hero-mockup-line hero-mockup-line-medium" />
                <div className="hero-mockup-line hero-mockup-line-long" />
                <div className="hero-mockup-line hero-mockup-line-short" />
              </div>
            </div>

            <div className="hero-mockup-phone hero-anim-slide-right" style={{ animationDelay: '0.9s' }}>
              <div className="hero-mockup-phone-notch" />
              <div className="hero-mockup-phone-screen">
                <div className="hero-mockup-phone-dot" />
                <div className="hero-mockup-phone-bar" />
                <div className="hero-mockup-phone-bar hero-mockup-phone-bar-short" />
              </div>
            </div>

            <div className="hero-floating-stats">
              <ServiceBadge icon="globe" label={lang === 'en' ? 'Web Development' : 'تطوير الويب'} delay={0.6} />
              <ServiceBadge icon="mobile-alt" label={lang === 'en' ? 'Mobile Apps' : 'تطبيقات الجوال'} delay={0.7} />
              <ServiceBadge icon="palette" label={lang === 'en' ? 'UI/UX Design' : 'تصميم واجهات'} delay={0.8} />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-mobile-stats hero-anim-fade-up-50" style={{ animationDelay: '0.7s' }}>
        <div className="hero-mobile-stats-inner">
          <div className="hero-mobile-stat">
            <span className="hero-mobile-stat-value" style={{ color: 'var(--accent-fire)', fontSize: 12 }}>
              <Globe size={12} /> {lang === 'en' ? 'Web' : 'ويب'}
            </span>
          </div>
          <div className="hero-mobile-stat-divider" />
          <div className="hero-mobile-stat">
            <span className="hero-mobile-stat-value" style={{ color: 'var(--accent-fire)', fontSize: 12 }}>
              <Smartphone size={12} /> {lang === 'en' ? 'Mobile' : 'جوال'}
            </span>
          </div>
          <div className="hero-mobile-stat-divider" />
          <div className="hero-mobile-stat">
            <span className="hero-mobile-stat-value" style={{ color: 'var(--accent-fire)', fontSize: 12 }}>
              <Palette size={12} /> {lang === 'en' ? 'UI/UX' : 'تصميم'}
            </span>
          </div>
          <div className="hero-mobile-stat-divider" />
          <div className="hero-mobile-stat">
            <span className="hero-mobile-stat-value" style={{ color: 'var(--accent-fire)', fontSize: 12 }}>
              <ShoppingCart size={12} /> {lang === 'en' ? 'Shopify' : 'متاجر'}
            </span>
          </div>
        </div>
      </div>

    </section>
  )
}
