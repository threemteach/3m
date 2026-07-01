import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, LogOut, Menu, X, Sun, Moon, Globe, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from '../../context/LanguageContext'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, key: 'dashboard', end: true },
  { to: '/admin/projects', icon: FolderKanban, key: 'projects' },
]

const navLabels = { en: { dashboard: 'Dashboard', projects: 'Projects' }, ar: { dashboard: 'لوحة التحكم', projects: 'المشاريع' } }

export default function AdminLayout() {
  const { signOut, user } = useAuth()
  const { dark, toggle } = useTheme()
  const { t, lang, setLang } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const labels = navLabels[lang]

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login')
  }

  const pageTitle = location.pathname === '/admin' ? labels.dashboard : location.pathname.includes('/projects') ? labels.projects : ''
  const logo = '/logos/Orange.svg'

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3 px-5 h-16 shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
          <img src={logo} alt="triple m" className="h-7 w-auto" />
          <span className="text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md ml-auto" style={{ background: 'rgba(195,74,54,0.15)', color: 'var(--accent-fire)' }}>
            {lang === 'ar' ? 'المشرف' : 'Admin'}
          </span>
        </div>

        <nav className="flex-1 p-2.5 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
            return (
              <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative"
                style={{
                  background: active ? 'var(--accent-fire)' : 'transparent',
                  color: active ? '#fff' : 'var(--text-secondary)',
                }}
              >
                <item.icon size={17} strokeWidth={active ? 2.5 : 1.5} />
                <span>{labels[item.key]}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-2.5 border-t shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="px-3.5 py-2 mb-0.5 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
            <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{user?.email || 'Admin'}</p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{lang === 'ar' ? 'مدير النظام' : 'Administrator'}</p>
          </div>
          <button onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-500/10 group"
            style={{ color: '#ef4444' }}
          >
            <LogOut size={15} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            {lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center gap-3 px-4 lg:px-6 shrink-0" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: 'var(--text-secondary)' }} onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>{lang === 'ar' ? 'triple m' : 'triple m'}</span>
            <ChevronRight size={11} />
            <span style={{ color: 'var(--accent-fire)' }}>{pageTitle}</span>
          </div>
          <div className="flex-1" />

          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-white/5"
            style={{ color: 'var(--text-secondary)' }}>
            <Globe size={14} />
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          <button onClick={toggle}
            className="p-1.5 rounded-lg transition-all duration-200 hover:bg-white/5"
            style={{ color: 'var(--text-secondary)' }}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto" style={{ background: 'var(--bg-primary)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
