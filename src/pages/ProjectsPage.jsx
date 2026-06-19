import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Check, ArrowUpRight, Layers, Palette, Code, Gauge, Smartphone } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const projects = [
  {
    name: 'Rent Go',
    url: 'https://rent-go.ae/',
    light: '/projects/rent_and_go_light.webp',
    dark: '/projects/rent_and_go_dark.webp',
    alt: 'Rent Go car rental booking platform homepage',
    tag: 'Web App',
    description: 'A full-featured car rental booking platform with real-time availability, fleet management, and online payments.',
    whatWeDid: ['UI/UX Design', 'Frontend Development', 'Booking Engine', 'Payment Integration', 'Admin Dashboard'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'Node.js'],
    features: ['Real-time car availability', 'Online booking with payment', 'Fleet management dashboard', 'Multi-language support'],
    icon: Smartphone,
  },
  {
    name: 'Watan Alex',
    url: 'https://watan-alex.netlify.app/',
    light: '/projects/watan_alex_light.webp',
    dark: '/projects/watan_alex_dark.webp',
    alt: 'Watan Alex real estate property listings website',
    tag: 'Web App',
    description: 'A modern real estate platform showcasing property listings with advanced search, virtual tours, and agent profiles.',
    whatWeDid: ['UI/UX Design', 'Frontend Development', 'Property CMS', 'Map Integration', 'SEO Optimization'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Mapbox', 'Sanity CMS'],
    features: ['Advanced property search', 'Interactive maps', 'Virtual tour support', 'Agent management system'],
    icon: Layers,
  },
  {
    name: 'Royal CCR',
    url: 'https://royal-ccrs.vercel.app/',
    light: '/projects/royal_ccr.webp',
    dark: '/projects/royal_ccr.webp',
    alt: 'Royal CCR construction and contracting services site',
    tag: 'Web App',
    description: 'A professional corporate website for a construction and contracting company showcasing their portfolio and services.',
    whatWeDid: ['UI/UX Design', 'Frontend Development', 'Portfolio Showcase', 'Contact System', 'Performance Optimization'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    features: ['Project portfolio gallery', 'Service showcase', 'Contact inquiry form', 'Fast loading performance'],
    icon: Code,
  },
  {
    name: 'Egyfield',
    url: 'https://egyfield.com/',
    light: '/projects/egyfield_light.webp',
    dark: '/projects/egyfield_dark.webp',
    alt: 'Egyfield oil and gas industry services website',
    tag: 'Web App',
    description: 'A B2B corporate website for an oil and gas services company, featuring their expertise, projects, and industry insights.',
    whatWeDid: ['UI/UX Design', 'Frontend Development', 'Corporate CMS', 'Blog/News System', 'Multilingual Support'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Headless CMS', 'i18n'],
    features: ['Corporate brand identity', 'News and insights blog', 'Project case studies', 'Arabic & English support'],
    icon: Gauge,
  },
]

export default function ProjectsPage() {
  const { t, lang } = useTranslation()
  const { dark } = useTheme()
  const [selected, setSelected] = useState(null)
  const isRTL = lang === 'ar'

  return (
    <div className="min-h-screen pt-28 pb-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="section-label">{t('projects.label')}</span>
          <h1 className="section-heading text-4xl md:text-5xl">{t('projects.heading')}</h1>
          <p className="section-body mx-auto">{t('projects.desc')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <motion.button
              key={i}
              onClick={() => setSelected(p)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative w-full text-left border-none cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden"
              style={{
                background: 'var(--bg-secondary)',
                border: '2px solid var(--border)',
                aspectRatio: '3 / 4',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <img
                src={dark ? p.dark : p.light}
                alt={p.alt}
                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(195,74,54,0.2), rgba(74,58,140,0.2))' }} />
              <div className="absolute top-4 left-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: 'var(--accent-fire)', color: '#fff' }}>
                  {p.tag}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-base md:text-2xl font-bold text-white mb-0.5 md:mb-1">{p.name}</h3>
                <p className="text-xs md:text-sm text-white/70 line-clamp-1">{p.description}</p>
              </div>
              <div className="absolute bottom-5 md:bottom-6 right-5 md:right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <ArrowUpRight size={18} className="text-white" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} lang={lang} isRTL={isRTL} dark={dark} />
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectModal({ project, onClose, lang, isRTL, dark }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto py-8 md:py-16 px-4"
      style={{ background: 'rgba(8, 11, 20, 0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
        style={{ background: 'var(--bg-primary)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all hover:scale-110"
          style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(8px)' }}
        >
          <X size={16} />
        </button>

        <div className="relative h-48 md:h-72 overflow-hidden">
          <img
            src={dark ? project.dark : project.light}
            alt={project.alt}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: 'var(--accent-fire)', color: '#fff' }}>
              {project.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3" style={{ color: 'var(--text-primary)' }}>{project.name}</h2>
          </div>
        </div>

        <div className="p-5 md:p-8 pt-3 md:pt-4" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          <div className="mb-8">
            <h4 className="text-xs font-semibold tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'What We Did' : 'ما قمنا به'}
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {project.whatWeDid.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm px-3 md:px-4 py-2.5 md:py-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                  <Check size={12} className="shrink-0 md:w-[14px]" style={{ color: 'var(--accent-fire)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'Key Features' : 'المميزات الرئيسية'}
            </h4>
            <ul className="space-y-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent-fire)' }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-semibold tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'Technologies' : 'التقنيات'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="text-xs px-3.5 py-1.5 rounded-full font-medium"
                  style={{ background: `color-mix(in srgb, var(--accent-fire) 10%, transparent)`, color: 'var(--accent-fire)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 text-sm font-semibold px-6 py-3.5 rounded-full border-none cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            style={{ background: 'var(--accent-fire)', color: '#FFF7E9' }}
          >
            <ExternalLink size={16} />
            {lang === 'en' ? 'Visit Website' : 'زيارة الموقع'}
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
