import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import LangToggle from '../ui/LangToggle.jsx'
import useScrollSpy from '../../hooks/useScrollSpy.js'
import { useTranslation } from '../../context/LanguageContext.jsx'

const sectionIds = ['hero', 'services', 'about', 'work', 'process', 'stats', 'team', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(sectionIds, 120)
  const { t, lang } = useTranslation()

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function scrollTo(id) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { id: 'services', label: t('nav.services') },
    { id: 'about', label: t('nav.about') },
    { id: 'work', label: t('nav.work') },
    { id: 'process', label: t('nav.process') },
    { id: 'team', label: t('nav.team') },
    { id: 'contact', label: t('nav.contact') },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 transition-all duration-500"
        style={{ paddingTop: 14 }}
      >
        <div className="w-full max-w-5xl">
          <div
            className="flex items-center justify-between rounded-full transition-all duration-500 navbar-island navbar-pill"
            style={{
              background: 'rgba(13, 10, 21, 0.35)',
              border: '1px solid rgba(255, 247, 233, 0.06)',
              opacity: 0.85,
              boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
              padding: '10px 28px',
            }}
          >
            <a href="/" className="flex items-center no-underline shrink-0">
              <img src="/logos/Orange.svg" alt="triple m" className="h-7 w-auto" />
            </a>

            <div className="hidden md:flex items-center gap-0">
              {links.map((l, i) => (
                <div key={l.id} className="flex items-center gap-0">
                  {i > 0 && (
                    <span className="mx-3 text-[10px]" style={{ color: 'rgba(255, 247, 233, 0.2)' }}>●</span>
                  )}
                  <button
                  onClick={() => scrollTo(l.id)}
                  className="group bg-transparent border-none cursor-pointer transition-colors duration-200"
                  style={{
                    color: active === l.id ? '#c34a36' : 'rgba(255, 247, 233, 0.65)',
                    fontSize: active === l.id ? '14px' : '13px',
                    fontWeight: active === l.id ? 700 : 500,
                    letterSpacing: '0.03em',
                  }}
                  onMouseEnter={e => { if (active !== l.id) e.target.style.color = '#FFF7E9' }}
                  onMouseLeave={e => { if (active !== l.id) e.target.style.color = 'rgba(255, 247, 233, 0.65)' }}
                >
                  <span className="relative">
                    {l.label}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                        active === l.id ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                      style={{ background: '#c34a36' }}
                    />
                  </span>
                </button>
                </div>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <LangToggle />
              <button
                onClick={() => scrollTo('contact')}
                className="border-none cursor-pointer text-[13px] font-medium rounded-full px-5 py-2 transition-all duration-200 hover:brightness-110 shrink-0"
                style={{
                  background: '#c34a36',
                  color: '#FFF7E9',
                  boxShadow: '0 0 20px rgba(195, 74, 54, 0.35)',
                }}
              >
                {t('nav.letsBuild')}
              </button>
            </div>

            <div className="md:hidden flex items-center gap-1">
              <ThemeToggle />
              <LangToggle />
              <button
                onClick={() => setOpen(true)}
                className="bg-transparent border-none cursor-pointer p-1.5"
                aria-label="Open menu"
              >
                <Menu size={20} style={{ color: '#FFF7E9' }} />
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
                <img src="/logos/Orange.svg" alt="triple m" className="h-7 w-auto" />
              </a>
              <button onClick={() => setOpen(false)} className="bg-transparent border-none cursor-pointer p-2" aria-label="Close menu">
                <X size={24} style={{ color: '#FFF7E9' }} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(l.id)}
                  className="bg-transparent border-none cursor-pointer text-3xl font-bold transition-colors duration-200"
                  style={{
                    color: active === l.id ? '#c34a36' : '#FFF7E9',
                    fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif",
                  }}
                >
                  {l.label}
                </motion.button>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
