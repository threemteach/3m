import { useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import './Projects.css'
import { useTranslation } from '../../context/LanguageContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import Button from '../ui/Button.jsx'
import ProjectModal from '../ui/ProjectModal.jsx'
import { supabase } from '../../lib/supabase'

const autoplayPlugin = Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })

export default function Projects() {
  const { t, lang } = useTranslation()
  const { dark } = useTheme()
  const navigate = useNavigate()
  const isRTL = lang === 'ar'
  const apiRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setProjects(data)
      })
  }, [])

  const localizedProjects = useMemo(() => {
    return projects.map(p => ({
      ...p,
      name: lang === 'ar' && p.name_ar ? p.name_ar : p.name,
      alt: lang === 'ar' && p.alt_ar ? p.alt_ar : p.alt,
      description: lang === 'ar' && p.description_ar ? p.description_ar : p.description,
      whatWeDid: lang === 'ar' && p.what_we_did_ar?.length ? p.what_we_did_ar : (p.what_we_did || []),
      features: lang === 'ar' && p.features_ar?.length ? p.features_ar : (p.features || []),
    }))
  }, [projects, lang])

  const slides = [...localizedProjects, ...localizedProjects, ...localizedProjects]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 25, direction: isRTL ? 'rtl' : 'ltr' },
    [autoplayPlugin]
  )

  useEffect(() => {
    apiRef.current = emblaApi
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) emblaApi.reInit()
  }, [dark, localizedProjects, emblaApi])

  if (!localizedProjects.length) return null

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
          <button className="carousel-btn carousel-btn-prev" onClick={() => apiRef.current?.scrollPrev()} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>

          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((p, i) => (
                <div key={i} className="embla__slide" role="group" aria-label={p.alt}>
                  <div
                    className="portfolio-card"
                    style={{
                      backgroundImage: `url(${dark ? p.dark : p.light})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <div className="portfolio-card-overlay" />
                    <span className="card-btn-wrap">
                      <button onClick={() => setSelected(p)} className="card-btn">{p.name}</button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn carousel-btn-next" onClick={() => apiRef.current?.scrollNext()} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="text-center mt-10">
          <Button
            variant="gradient"
            size="md"
            onClick={() => navigate('/projects')}
            className="group"
          >
            {t('projects.viewAll')}
            {isRTL ? <ArrowLeft size={16} className="mr-2" /> : <ArrowRight size={16} className="ml-2" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} lang={lang} isRTL={isRTL} dark={dark} />
        )}
      </AnimatePresence>
    </section>
  )
}
