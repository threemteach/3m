import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FolderKanban, Eye, EyeOff, Plus, ArrowUpRight, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { useTranslation } from '../../context/LanguageContext'

const cardConfig = (lang) => [
  { label: lang === 'ar' ? 'إجمالي المشاريع' : 'Total Projects', key: 'total', icon: FolderKanban, gradient: 'linear-gradient(135deg, #c34a36, #e0664d)' },
  { label: lang === 'ar' ? 'ظاهر' : 'Visible', key: 'visible', icon: Eye, gradient: 'linear-gradient(135deg, #22c55e, #4ade80)' },
  { label: lang === 'ar' ? 'مخفي' : 'Hidden', key: 'hidden', icon: EyeOff, gradient: 'linear-gradient(135deg, #656780, #8b8fa3)' },
]

export default function AdminDashboard() {
  const { lang } = useTranslation()
  const [stats, setStats] = useState({ total: 0, visible: 0, hidden: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const cards = cardConfig(lang)

  useEffect(() => {
    Promise.all([
      supabase.from('projects').select('id, visible'),
      supabase.from('projects').select('id, name, tag, visible, light, sort_order, created_at')
        .order('created_at', { ascending: false }).limit(5),
    ]).then(([statsRes, recentRes]) => {
      if (statsRes.data) {
        const d = statsRes.data
        setStats({ total: d.length, visible: d.filter(p => p.visible).length, hidden: d.filter(p => !p.visible).length })
      }
      if (recentRes.data) setRecent(recentRes.data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-fire)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'ar' ? 'نظرة عامة على مشاريعك' : 'Overview of your portfolio'}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/admin/projects/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #c34a36, #e0664d)', color: '#fff' }}
          >
            <Plus size={16} />
            {lang === 'ar' ? 'مشروع جديد' : 'New Project'}
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative rounded-xl p-5 overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            onClick={() => navigate('/admin/projects')}
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-[0.06]" style={{ background: card.gradient }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: card.gradient, boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
              <card.icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{stats[card.key]}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {lang === 'ar' ? 'آخر المشاريع' : 'Recent Projects'}
          </h2>
          <Link to="/admin/projects" className="text-xs font-medium flex items-center gap-1 transition-colors" style={{ color: 'var(--accent-fire)' }}>
            {lang === 'ar' ? 'عرض الكل' : 'View all'} <ArrowUpRight size={12} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {lang === 'ar' ? 'لا توجد مشاريع بعد' : 'No projects yet.'}
            </p>
            <Link to="/admin/projects/new" className="text-xs mt-2 inline-block" style={{ color: 'var(--accent-fire)' }}>
              {lang === 'ar' ? 'أنشئ مشروعك الأول' : 'Create your first project'}
            </Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {recent.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 px-5 py-3 transition-colors cursor-pointer"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => navigate(`/admin/projects/${p.id}/edit`)}
              >
                {p.light ? (
                  <img src={p.light} alt={p.name} className="w-11 h-8 rounded-md flex-shrink-0 object-cover object-top" style={{ border: '1px solid var(--border)' }} />
                ) : (
                  <div className="w-11 h-8 rounded-md flex-shrink-0" style={{ background: 'var(--bg-tertiary)' }} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{p.tag}</p>
                </div>
                <div className={`text-[11px] font-medium px-2.5 py-1 rounded-md ${p.visible ? 'text-green-400' : ''}`}
                  style={{ background: p.visible ? 'rgba(34,197,94,0.1)' : 'var(--bg-tertiary)', color: p.visible ? '#4ade80' : 'var(--text-muted)' }}>
                  {p.visible ? (lang === 'ar' ? 'ظاهر' : 'Visible') : (lang === 'ar' ? 'مخفي' : 'Hidden')}
                </div>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
