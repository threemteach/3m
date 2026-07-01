import { useNavigate, useLocation, Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function Footer() {
  const { t, lang } = useTranslation()
  const { dark } = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  function scrollTo(id) {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      const timer = setInterval(() => {
        const el = document.getElementById(id)
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); clearInterval(timer) }
      }, 50)
      setTimeout(() => clearInterval(timer), 3000)
    }
  }

  const navLinks = [
    { label: t('footer.servicesLink'), id: 'services' },
    { label: t('footer.process'), id: 'process' },
    { label: t('footer.projects'), id: 'work' },
    { label: t('footer.aboutUs'), id: 'about' },
    { label: t('footer.team'), id: 'team' },
    { label: t('footer.contact'), id: 'contact' },
  ]

  const socials = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590725834401' },
    { name: 'Instagram', href: 'https://www.instagram.com/3m_.tech/' },
  ]

  return (
    <footer className="border-t border-[var(--border)]" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 pb-24 md:pb-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <a href="/" onClick={e => { e.preventDefault(); window.location.reload() }} className="flex items-center gap-4 cursor-pointer">
            <img
              src={dark ? '/logos/White.svg' : '/logos/dark%20purp.svg'}
              alt="triple m"
              className="h-7 w-auto"
            />
            <span className="hidden sm:inline text-sm font-medium px-3 py-1 rounded-full" style={{
              background: 'color-mix(in srgb, var(--accent-fire) 8%, transparent)',
              color: 'var(--accent-fire)',
            }}>
              {t('footer.tagline')}
            </span>
          </a>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer hover:-translate-y-0.5"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-fire)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; 2026 triple m &middot; {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs transition-colors no-underline hover:text-[var(--accent-fire)]" style={{ color: 'var(--text-muted)' }}>
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-xs transition-colors no-underline hover:text-[var(--accent-fire)]" style={{ color: 'var(--text-muted)' }}>
              {t('footer.terms')}
            </Link>
            <div className="flex items-center gap-3 pl-6 border-l" style={{ borderColor: 'var(--border)' }}>
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium transition-all duration-200 no-underline hover:text-[var(--accent-fire)] hover:-translate-y-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {s.name}
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}