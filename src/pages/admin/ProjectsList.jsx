import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit3, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { useTranslation } from '../../context/LanguageContext'

export default function AdminProjectsList() {
  const { lang } = useTranslation()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [reordering, setReordering] = useState(null)

  useEffect(() => { fetchProjects() }, [])

  async function fetchProjects() {
    const { data } = await supabase
      .from('projects').select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (data) setProjects(data)
    setLoading(false)
  }

  async function toggleVisibility(project) {
    await supabase.from('projects').update({ visible: !project.visible }).eq('id', project.id)
    fetchProjects()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await supabase.from('projects').delete().eq('id', deleteTarget.id)
    setDeleting(false)
    setDeleteTarget(null)
    fetchProjects()
  }

  async function moveUp(index) {
    if (index === 0) return
    const current = projects[index], above = projects[index - 1]
    setReordering(current.id)
    await supabase.from('projects').update({ sort_order: above.sort_order }).eq('id', current.id)
    await supabase.from('projects').update({ sort_order: current.sort_order }).eq('id', above.id)
    setReordering(null)
    fetchProjects()
  }

  async function moveDown(index) {
    if (index === projects.length - 1) return
    const current = projects[index], below = projects[index + 1]
    setReordering(current.id)
    await supabase.from('projects').update({ sort_order: below.sort_order }).eq('id', current.id)
    await supabase.from('projects').update({ sort_order: current.sort_order }).eq('id', below.id)
    setReordering(null)
    fetchProjects()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-fire)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {lang === 'ar' ? 'المشاريع' : 'Projects'}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {projects.length} {lang === 'ar' ? 'مشروع' : 'project'}{projects.length !== 1 ? (lang === 'ar' ? 'ًا' : 's') : ''}
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

      {projects.length === 0 ? (
        <div className="text-center py-24 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(195,74,54,0.1)' }}>
            <FolderKanbanIcon size={20} style={{ color: 'var(--accent-fire)' }} />
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'ar' ? 'لا توجد مشاريع بعد' : 'No projects yet'}
          </p>
          <Link to="/admin/projects/new" className="text-xs mt-2 inline-block" style={{ color: 'var(--accent-fire)' }}>
            {lang === 'ar' ? 'أنشئ مشروعك الأول' : 'Create your first project'}
          </Link>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)' }}>
                  <th className="text-left px-4 py-3 font-medium text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'ar' ? 'المشروع' : 'Project'}
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-[10px] uppercase tracking-widest hidden md:table-cell" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'ar' ? 'الوسم' : 'Tag'}
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-[10px] uppercase tracking-widest hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'ar' ? 'الترتيب' : 'Order'}
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'ar' ? 'إجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {projects.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t transition-colors"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          {p.light ? (
                            <img src={p.light} alt={p.name}
                              className="w-14 h-10 rounded-lg flex-shrink-0 object-cover object-top"
                              style={{ border: '1px solid var(--border)' }} />
                          ) : (
                            <div className="w-14 h-10 rounded-lg flex-shrink-0" style={{ background: 'var(--bg-tertiary)' }} />
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate max-w-[200px]" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                            <p className="text-xs truncate max-w-[200px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{p.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-md" style={{ background: 'rgba(195,74,54,0.1)', color: 'var(--accent-fire)' }}>
                          {p.tag}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => toggleVisibility(p)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                          style={{
                            background: p.visible ? 'rgba(34,197,94,0.1)' : 'var(--bg-tertiary)',
                            color: p.visible ? '#4ade80' : 'var(--text-muted)',
                          }}
                        >
                          {p.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                          {p.visible ? (lang === 'ar' ? 'ظاهر' : 'Visible') : (lang === 'ar' ? 'مخفي' : 'Hidden')}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-center hidden sm:table-cell">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="flex flex-col gap-0.5">
                            <button onClick={() => moveUp(i)}
                              disabled={i === 0 || reordering === p.id}
                              className="p-0.5 rounded transition-all disabled:opacity-20"
                              style={{ color: 'var(--text-muted)', lineHeight: 0 }}>
                              <ChevronUp size={11} />
                            </button>
                            <button onClick={() => moveDown(i)}
                              disabled={i === projects.length - 1 || reordering === p.id}
                              className="p-0.5 rounded transition-all disabled:opacity-20"
                              style={{ color: 'var(--text-muted)', lineHeight: 0 }}>
                              <ChevronDown size={11} />
                            </button>
                          </div>
                          <span className="text-xs ml-0.5 font-mono" style={{ color: 'var(--text-muted)' }}>{p.sort_order}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-0.5">
                          <Link to={`/admin/projects/${p.id}/edit`}
                            className="p-1.5 rounded-lg transition-all duration-200"
                            style={{ color: 'var(--text-muted)' }}>
                            <Edit3 size={14} />
                          </Link>
                          <button onClick={() => setDeleteTarget(p)}
                            className="p-1.5 rounded-lg transition-all duration-200"
                            style={{ color: 'var(--text-muted)' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={() => !deleting && setDeleteTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl p-6"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <AlertTriangle size={20} style={{ color: '#ef4444' }} />
              </div>
              <h3 className="text-base font-semibold text-center mb-1" style={{ color: 'var(--text-primary)' }}>
                {lang === 'ar' ? 'حذف المشروع؟' : 'Delete project?'}
              </h3>
              <p className="text-xs text-center mb-6" style={{ color: 'var(--text-secondary)' }}>
                {lang === 'ar' ? 'هل أنت متأكد أنك تريد حذف' : 'Are you sure you want to delete'}{' '}
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{deleteTarget.name}</span>?
                {lang === 'ar' ? ' لا يمكن التراجع عن هذا.' : ' This cannot be undone.'}
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button onClick={confirmDelete} disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: '#ef4444', color: '#fff' }}>
                  {deleting ? (lang === 'ar' ? 'يتم الحذف...' : 'Deleting...') : (lang === 'ar' ? 'حذف' : 'Delete')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FolderKanbanIcon({ size, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" opacity="0.3" />
      <line x1="9" y1="9" x2="9" y2="15" />
      <line x1="15" y1="9" x2="15" y2="12" />
    </svg>
  )
}
