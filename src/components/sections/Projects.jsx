import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Projects.css'
import { useTranslation } from '../../context/LanguageContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

const projects = [
  { name: 'Rent Go', url: 'https://rent-go.ae/', light: '/projects/rent_and_go_light.webp', dark: '/projects/rent_and_go_dark.webp', alt: 'Rent Go car rental booking platform homepage' },
  { name: 'Watan Alex', url: 'https://watan-alex.netlify.app/', light: '/projects/watan_alex_light.webp', dark: '/projects/watan_alex_dark.webp', alt: 'Watan Alex real estate property listings website' },
  { name: 'Royal CCR', url: 'https://royal-ccrs.vercel.app/', light: '/projects/royal_ccr.webp', dark: '/projects/royal_ccr.webp', alt: 'Royal CCR construction and contracting services site' },
  { name: 'Egyfield', url: 'https://egyfield.com/', light: '/projects/egyfield_light.webp', dark: '/projects/egyfield_dark.webp', alt: 'Egyfield oil and gas industry services website' },
]

const carouselOpts = {
  rtl: false,
  loop: true,
  margin: 19,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
  smartSpeed: 1000,
  responsive: { 0: { items: 1 }, 600: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } },
}

export default function Projects() {
  const owlRef = useRef(null)
  const { t, lang } = useTranslation()
  const { dark } = useTheme()

  useEffect(() => {
    const el = owlRef.current
    if (el && !el.classList.contains('owl-loaded') && window.$) {
      window.$(el).owlCarousel(carouselOpts)
    }
    return () => {
      if (el && el.classList.contains('owl-loaded')) {
        try { window.$(el).owlCarousel('destroy') } catch {}
      }
    }
  }, [dark])

  function scrollCarousel(dir) {
    const el = owlRef.current
    if (el && window.$(el).hasClass('owl-loaded')) {
      window.$(el).trigger(dir === 'prev' ? 'prev.owl.carousel' : 'next.owl.carousel')
    }
  }

  return (
    <section id="work" className="py-24 px-6 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <span className="section-label">{t('projects.label')}</span>
          <h2 className="section-heading">{t('projects.heading')}</h2>
          <p className="section-body mx-auto">{t('projects.desc')}</p>
        </motion.div>

        <div className="carousel-container">
          <button className="carousel-btn carousel-btn-prev" onClick={() => scrollCarousel('prev')} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>

          <div className="ue_listing_carousel owl-carousel owl-theme" ref={owlRef}>
            {projects.map((p, i) => (
              <div key={i} className="portfolio-card" data-project-index={i} role="img" aria-label={p.alt} style={{
                backgroundImage: `url(${dark ? p.dark : p.light})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
              }}>
                <div className="portfolio-card-overlay" />
                <span className="card-btn-wrap">
                  <a className="card-btn" href={p.url} target="_blank" rel="noreferrer">{p.name}</a>
                </span>
              </div>
            ))}
          </div>

          <button className="carousel-btn carousel-btn-next" onClick={() => scrollCarousel('next')} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
