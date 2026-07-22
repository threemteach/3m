import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ExternalLink } from 'lucide-react'
import NavControls from '../ui/NavControls.jsx'
import useScrollSpy from '../../hooks/useScrollSpy.js'
import { useTranslation } from '../../context/LanguageContext.jsx'

const sectionIds = ['hero', 'services', 'about-page', 'process', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { t, lang } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const active = useScrollSpy(sectionIds, 120, location.pathname)
  const isProjectsPage = location.pathname === '/projects'

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = useCallback((id) => {
    setOpen(false)
    if (id === 'work') {
      if (!isProjectsPage) navigate('/projects')
      return
    }
    if (id === 'about-page') {
      navigate('/about')
      return
    }
    if (isProjectsPage) {
      navigate('/')
      const timer = setInterval(() => {
        const el = document.getElementById(id)
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); clearInterval(timer) }
      }, 50)
      setTimeout(() => clearInterval(timer), 3000)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [isProjectsPage, navigate])

  const effectiveActive = isProjectsPage ? 'work' : active

  const links = [
    { id: 'work', label: t('nav.work'), page: true },
    { id: 'about-page', label: t('nav.about'), page: true },
    { id: 'services', label: t('nav.services'), page: false },
    { id: 'process', label: t('nav.process'), page: false },
    { id: 'contact', label: t('nav.contact'), page: false },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 transition-all duration-500"
        style={{ paddingTop: 14 }}
      >
        <div className="w-full max-w-5xl">
          <div
            className="flex items-center justify-between rounded-full transition-all duration-500 navbar-island navbar-pill px-4 sm:px-5 md:px-7"
            style={{
              background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
              border: '2px solid var(--nav-border)',
              opacity: 0.85,
              boxShadow: scrolled ? 'var(--nav-shadow-scrolled)' : 'var(--nav-shadow)',
              backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
              WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
              padding: '10px 16px',
            }}
          >
            <a href="/" className="flex items-center no-underline shrink-0">
              <img src="/logos/Orange.svg" alt="3M tech — Software Development Company" className="h-7 w-auto" />
            </a>

              <div className="hidden md:flex items-center gap-1 ml-4">
                {links.map((l, i) => (
                    <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="group bg-transparent border-none cursor-pointer transition-colors duration-200 px-2 py-1"
                    style={{
                      color: effectiveActive === l.id ? 'var(--accent-fire)' : 'var(--nav-text)',
                      fontSize: effectiveActive === l.id ? '14px' : '13px',
                      fontWeight: effectiveActive === l.id ? 700 : 500,
                      letterSpacing: '0.03em',
                      opacity: isProjectsPage && !l.page ? 0.5 : 1,
                    }}
                    onMouseEnter={e => { if (effectiveActive !== l.id) e.target.style.color = 'var(--nav-text-hover)' }}
                    onMouseLeave={e => { if (effectiveActive !== l.id) e.target.style.color = 'var(--nav-text)' }}
                  >
                    <span className="relative inline-flex items-center gap-1">
                      {l.label}
                      {l.page && <ExternalLink size={10} className="opacity-60" />}
                      <span
                        className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                          effectiveActive === l.id ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                        style={{ background: 'var(--accent-fire)' }}
                      />
                    </span>
                  </button>
                ))}
              </div>

            <div className="hidden md:flex items-center gap-2">
              <NavControls />
              <button
                onClick={() => scrollTo('contact')}
                className="border-none cursor-pointer text-[13px] font-medium rounded-full px-5 py-2 transition-all duration-200 hover:brightness-110 shrink-0"
                style={{
                  background: 'var(--accent-fire)',
                  color: '#FFF7E9',
                  boxShadow: '0 0 20px rgba(195, 74, 54, 0.35)',
                }}
              >
                {t('nav.letsBuild')}
              </button>
            </div>

            <div className="md:hidden flex items-center gap-1">
              <NavControls />
              <button
                onClick={() => setOpen(true)}
                className="bg-transparent border-none cursor-pointer p-1.5"
                aria-label="Open menu"
              >
                <Menu size={20} style={{ color: 'var(--nav-text-hover)' }} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col navbar-drawer"
            style={{ background: 'rgba(13, 10, 21, 0.6)' }}
          >
            <div className="flex items-center justify-between h-16 px-6">
              <a href="/" className="flex items-center no-underline">
                <img src="/logos/Orange.svg" alt="3M tech — Software Development Company" className="h-7 w-auto" />
              </a>
              <button onClick={() => setOpen(false)} className="bg-transparent border-none cursor-pointer p-2" aria-label="Close menu">
                <X size={24} style={{ color: '#FFF7E9' }} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 overflow-y-auto">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(l.id)}
                  className="bg-transparent border-none cursor-pointer text-3xl font-bold transition-colors duration-200"
                  style={{
                    color: effectiveActive === l.id ? 'var(--accent-fire)' : '#FFF7E9',
                    fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
                    opacity: isProjectsPage && !l.page ? 0.4 : 1,
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    {l.label}
                    {l.page && <ExternalLink size={16} className="opacity-60" />}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
