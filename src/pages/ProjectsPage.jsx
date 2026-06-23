import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Layers, Palette, Code, Gauge, Globe, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import useSEO from '../hooks/useSEO.js'
import ProjectModal from '../components/ui/ProjectModal.jsx'

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
    icon: Globe,
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
  useSEO({
    title: lang === 'en' ? 'Our Work' : 'أعمالنا',
    description: lang === 'en' ? 'Explore our portfolio of web apps, e-commerce platforms, and Shopify stores built for businesses in Egypt and beyond.' : 'تصفح أعمالنا من تطبيقات الويب ومنصات التجارة الإلكترونية ومتاجر Shopify التي بنيناها للشركات في مصر وخارجها.',
    path: '/projects',
  })
  const [selected, setSelected] = useState(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const timerRef = useRef(null)
  const isRTL = lang === 'ar'

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  function startTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % projects.length)
    }, 4500)
  }

  useEffect(() => {
    if (!isDesktop) return
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [isDesktop])

  function goTo(index) {
    clearInterval(timerRef.current)
    setFeaturedIndex(index)
    startTimer()
  }

  const goNext = () => goTo((featuredIndex + 1) % projects.length)
  const goPrev = () => goTo((featuredIndex - 1 + projects.length) % projects.length)

  function ProjectCard({ project, featured, active, alwaysBorder, className = '' }) {
    return (
      <motion.button
        onClick={() => {
          if (featured) { setSelected(project); return }
          goTo(projects.indexOf(project))
          setTimeout(() => setSelected(project), 200)
        }}
        className={`group relative w-full text-left cursor-pointer overflow-hidden ${className}`}
        animate={active && !featured ? {
          scale: 1.05,
          boxShadow: '0 0 0 3px rgba(195,74,54,0.12), 0 0 20px rgba(195,74,54,0.1)',
        } : {
          scale: 1,
        }}
        whileHover={{
          y: -8,
          boxShadow: active && !featured
            ? '0 0 0 5px rgba(195,74,54,0.2), 0 0 35px rgba(195,74,54,0.18)'
            : '0 0 0 3px rgba(195,74,54,0.1), 0 16px 48px -8px rgba(0,0,0,0.2)',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundPosition = 'bottom center' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundPosition = 'top center' }}
        style={{
          backgroundImage: `url(${dark ? project.dark : project.light})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          border: alwaysBorder ? '1.5px solid var(--accent-fire)' : featured ? '1.5px solid var(--accent-fire)' : active && !featured ? '2px solid var(--accent-fire)' : '1.5px solid transparent',
          borderRadius: 24,
          aspectRatio: featured ? '16 / 9' : isDesktop ? '3 / 4' : '4 / 3',
          boxShadow: featured ? 'none' : active ? '0 0 0 3px rgba(195,74,54,0.12), 0 0 20px rgba(195,74,54,0.1)' : 'none',
          transition: 'background-position 1.5s ease, box-shadow 0.4s ease, transform 0.4s ease',
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className={`absolute ${featured ? 'top-4 md:top-7 left-4 md:left-7' : 'top-3 left-3 md:top-5 md:left-5'}`}>
          <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-widest px-3 py-1.5 md:px-5 md:py-2 rounded-full" style={{ background: 'var(--accent-fire)', color: '#fff' }}>
            {featured && <Eye size={12} />}
            {project.tag}
          </span>
        </div>
        <div className={`absolute ${featured ? 'top-4 md:top-7 right-4 md:right-7' : 'top-3 right-3 md:top-5 md:right-5'} opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-3 group-hover:translate-x-0`}>
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Eye size={15} className="text-white" />
          </div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 ${featured ? 'p-6 md:p-10' : 'p-5 md:p-7'}`} style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
          {featured && (
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white/40 mb-1 md:mb-2 block">{lang === 'en' ? 'Featured Project' : 'مشروع مميز'}</span>
          )}
          <h3 className={`font-bold text-white mb-1 ${featured ? 'text-2xl md:text-4xl' : 'text-lg md:text-2xl'}`}>{project.name}</h3>
          <p className={`text-white/60 line-clamp-1 ${featured ? 'text-xs md:text-base' : 'text-[11px] md:text-sm'}`}>{project.description}</p>
          <div className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0 ${featured ? 'mt-4 md:mt-6' : 'mt-3 md:mt-4'}`}>
            <span className={`text-[10px] md:text-xs font-medium text-white flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${featured ? 'md:px-5 md:py-2.5' : 'md:px-4 md:py-2'}`} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <ArrowUpRight size={12} /> {lang === 'en' ? 'View Project' : 'عرض المشروع'}
            </span>
          </div>
        </div>
      </motion.button>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="section-label">{t('projects.label')}</span>
          <h1 className="section-heading text-4xl md:text-5xl">{t('projects.heading')}</h1>
          <p className="section-body mx-auto max-w-2xl">{t('projects.desc')}</p>
        </motion.div>

        {/* Desktop: featured hero with nav + all projects grid */}
        <div className="hidden lg:flex flex-col gap-6 md:gap-10">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              >
                <ProjectCard project={projects[featuredIndex]} featured />
              </motion.div>
            </AnimatePresence>

            <button onClick={goPrev} className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-200 hover:scale-110 hover:brightness-125" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(8px)' }}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={goNext} className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-200 hover:scale-110 hover:brightness-125" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(8px)' }}>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {projects.map((p, i) => (
              <ProjectCard key={i} project={p} active={i === featuredIndex} />
            ))}
          </div>
        </div>

        {/* Mobile: simple equal grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard project={p} alwaysBorder />
            </motion.div>
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


