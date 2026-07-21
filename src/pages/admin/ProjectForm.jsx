import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Upload, X, Languages, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { useTranslation } from '../../context/LanguageContext'

const emptyProject = {
  name: '', url: '', light: '', dark: '', alt: '',
  tag: 'Web App', description: '', what_we_did: [], tech: [], features: [],
  name_ar: '', alt_ar: '', description_ar: '', what_we_did_ar: [], features_ar: [],
  visible: false, sort_order: 0,
}

const tagOptions = ['Web App', 'UI/UX', 'Mobile App', 'Shopify Store', 'Branding', 'MVP', 'Dashboard', 'Other']

const LANG = { EN: 'en', AR: 'ar' }

function Field({ label, fieldKey, placeholder, as, rows, suffix, value, isAr, langTab, onChange }) {
  const inputId = `${label.toLowerCase().replace(/\s+/g, '_')}_${langTab}`
  const cls = "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
  const sty = { color: 'var(--text-primary)', border: '1px solid var(--border)', caretColor: 'var(--accent-fire)', background: 'var(--bg-tertiary)' }

  return (
    <div>
      <label htmlFor={inputId} className="block text-xs font-medium mb-1.5 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
        {label} {suffix && <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: 'rgba(195,74,54,0.1)', color: 'var(--accent-fire)' }}>{suffix}</span>}
      </label>
      {as === 'textarea' ? (
        <textarea id={inputId} value={value || ''} onChange={e => onChange(fieldKey, e.target.value)}
          rows={rows || 3} dir={isAr ? 'rtl' : 'ltr'}
          className={`${cls} resize-none`} style={sty}
          onFocus={e => e.target.style.borderColor = 'rgba(195,74,54,0.4)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      ) : (
        <input id={inputId} value={value || ''} onChange={e => onChange(fieldKey, e.target.value)}
          placeholder={placeholder} dir={isAr ? 'rtl' : 'ltr'}
          className={cls} style={sty}
          onFocus={e => e.target.style.borderColor = 'rgba(195,74,54,0.4)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      )}
    </div>
  )
}

function ArrayInput({ listKey, inputKey, placeholder, items, inputVal, isAr, lang, onAdd, onRemove, onInputChange }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2 min-h-[28px]">
        {(items || []).map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-all"
            style={{ background: 'rgba(195,74,54,0.1)', color: 'var(--accent-fire)' }}>
            <span dir={isAr ? 'rtl' : 'ltr'}>{item}</span>
            <button type="button" onClick={() => onRemove(listKey, i)} className="hover:opacity-60 transition-opacity"><X size={10} /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={inputVal || ''}
          onChange={e => onInputChange(inputKey, e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(listKey, inputVal, inputKey) } }}
          placeholder={placeholder} dir={isAr ? 'rtl' : 'ltr'}
          className="flex-1 px-4 py-2 rounded-xl text-sm outline-none transition-all"
          style={{ color: 'var(--text-primary)', border: '1px solid var(--border)', background: 'var(--bg-tertiary)' }}
        />
        <button type="button" onClick={() => onAdd(listKey, inputVal, inputKey)}
          className="px-3 py-2 rounded-xl text-xs font-medium transition-all"
          style={{ background: 'rgba(195,74,54,0.1)', color: 'var(--accent-fire)' }}>
          {lang === 'ar' ? 'إضافة' : 'Add'}
        </button>
      </div>
    </div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export default function ProjectForm() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const { lang } = useTranslation()

  const [form, setForm] = useState(emptyProject)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [langTab, setLangTab] = useState(LANG.EN)

  const [uploadingLight, setUploadingLight] = useState(false)
  const [uploadingDark, setUploadingDark] = useState(false)
  const [translating, setTranslating] = useState(false)

  const [inputs, setInputs] = useState({
    what_we_did: '', what_we_did_ar: '', tech: '', features: '', features_ar: '',
  })

  useEffect(() => {
    if (isEdit) {
      supabase.from('projects').select('*').eq('id', id).single().then(({ data, error }) => {
        if (data) setForm(data)
        else setError('Project not found')
        setLoading(false)
      })
    } else {
      supabase.from('projects').select('sort_order').order('sort_order', { ascending: false }).limit(1).then(({ data }) => {
        if (data?.[0]) update('sort_order', data[0].sort_order + 1)
      })
      setLoading(false)
    }
  }, [id, isEdit])

  function update(field, value) { setForm(prev => ({ ...prev, [field]: value })) }
  function addItem(list, value, clearKey) {
    if (!value.trim()) return
    update(list, [...form[list], value.trim()])
    setInputs(prev => ({ ...prev, [clearKey]: '' }))
  }
  function removeItem(list, index) { update(list, form[list].filter((_, i) => i !== index)) }

  async function uploadImage(field, file) {
    if (!file) return
    const setU = field === 'light' ? setUploadingLight : setUploadingDark
    try {
      setU(true)

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) { setError('Image must be less than 5MB'); setU(false); return }

      const buffer = await file.arrayBuffer()
      const view = new Uint8Array(buffer)
      const hex = Array.from(view.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(' ').toUpperCase()

      const valid = ['FF D8 FF', '89 50 4E 47 0D 0A 1A 0A', '47 49 46 38 37 61', '47 49 46 38 39 61', '52 49 46 46', '42 4D']
      if (!valid.some(sig => hex.startsWith(sig))) {
        setError('Only JPEG, PNG, GIF, WebP, and BMP images are allowed')
        setU(false)
        return
      }

      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
      const { error: upErr } = await supabase.storage.from('projects').upload(fileName, file)
      if (upErr) throw upErr
      const { data: { publicUrl } } = supabase.storage.from('projects').getPublicUrl(fileName)
      update(field, publicUrl)
    } catch (err) { setError(err.message || 'Upload failed') }
    finally { setU(false) }
  }

  async function autoTranslate() {
    const textFields = [{ from: 'alt', to: 'alt_ar' }, { from: 'description', to: 'description_ar' }]
    const arrayFields = [{ from: 'what_we_did', to: 'what_we_did_ar' }, { from: 'features', to: 'features_ar' }]
    if (!form.name && !form.description) return
    setTranslating(true)
    try {
      if (form.name && !form.name_ar) update('name_ar', form.name)
      for (const { from, to } of textFields) {
        const text = form[from]
        if (!text) continue
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`)
        const json = await res.json()
        update(to, json[0]?.map(p => p[0]).filter(Boolean).join('') || text)
      }
      for (const { from, to } of arrayFields) {
        const items = form[from]
        if (!items?.length) continue
        const batch = items.join('\n')
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(batch)}`)
        const json = await res.json()
        update(to, (json[0]?.map(p => p[0]).filter(Boolean).join('') || batch).split('\n'))
      }
    } catch { setError('Auto-translate failed. Fill Arabic fields manually.') }
    finally { setTranslating(false) }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) { setError(lang === 'ar' ? 'اسم المشروع بالإنجليزية مطلوب' : 'English name is required'); return }
    setError('')
    setSaving(true)
    const payload = { ...form, updated_at: new Date().toISOString() }
    if (isEdit) {
      const { error: err } = await supabase.from('projects').update(payload).eq('id', id)
      if (err) { setError(err.message); setSaving(false); return }
    } else {
      const { error: err } = await supabase.from('projects').insert(payload)
      if (err) { setError(err.message); setSaving(false); return }
    }
    setSaving(false)
    navigate('/admin/projects')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-fire)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  const isAr = langTab === LANG.AR

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <motion.button whileHover={{ x: -2 }} onClick={() => navigate('/admin/projects')}
          className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={18} />
        </motion.button>
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {isEdit ? (lang === 'ar' ? 'تعديل المشروع' : 'Edit Project') : (lang === 'ar' ? 'مشروع جديد' : 'New Project')}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            {isEdit ? (lang === 'ar' ? `تعديل "${form.name}"` : `Editing "${form.name}"`) : (lang === 'ar' ? 'أنشئ مشروعاً جديداً' : 'Create a new project')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-1.5 p-1 rounded-xl w-fit" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          {[{ tab: LANG.EN, label: 'English' }, { tab: LANG.AR, label: 'العربية' }].map(({ tab, label }) => (
            <button key={tab} type="button" onClick={() => setLangTab(tab)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200"
              style={{
                background: langTab === tab ? 'rgba(195,74,54,0.15)' : 'transparent',
                color: langTab === tab ? 'var(--accent-fire)' : 'var(--text-muted)',
                boxShadow: langTab === tab ? '0 1px 4px rgba(195,74,54,0.15)' : 'none',
              }}>
              {label}
            </button>
          ))}
        </div>

        <Section title={lang === 'ar' ? 'صور المشروع' : 'Project Images'}
          subtitle={lang === 'ar' ? 'ارفع صور الموكب wit الضوء والظلام' : 'Upload light and dark mockup screenshots'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['light', 'dark'].map(field => (
              <div key={field}>
                <label className="block text-xs font-medium mb-1.5 capitalize" style={{ color: 'var(--text-secondary)' }}>{field} Image</label>
                {form[field] ? (
                  <div className="relative rounded-xl overflow-hidden group" style={{ border: '1px solid var(--border)' }}>
                    <img src={form[field]} alt={field} className="w-full h-28 object-cover object-top" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button type="button" onClick={() => update(field, '')}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-28 rounded-xl cursor-pointer transition-all duration-200"
                    style={{ background: 'var(--bg-tertiary)', border: '1px dashed var(--border)' }}>
                    <Upload size={16} className="mb-1" style={{ color: 'var(--text-muted)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {uploadingLight || uploadingDark ? (lang === 'ar' ? 'يتم الرفع...' : 'Uploading...') : (lang === 'ar' ? 'اضغط للرفع' : 'Click to upload')}
                    </span>
                    <input type="file" accept="image/*" className="hidden"
                      disabled={uploadingLight || uploadingDark}
                      onChange={e => { if (e.target.files?.[0]) uploadImage(field, e.target.files[0]); e.target.value = '' }}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </Section>

        {langTab === LANG.EN ? (
          <Section title="English Content" subtitle="Fill in the project details in English">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Project Name *" fieldKey="name" placeholder="Rent Go" value={form.name} onChange={update} isAr={isAr} langTab={langTab} />
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Tag</label>
                  <select value={form.tag} onChange={e => update('tag', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all cursor-pointer"
                    style={{ color: 'var(--text-primary)', border: '1px solid var(--border)', background: 'var(--bg-tertiary)' }}>
                    {tagOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Project URL" fieldKey="url" placeholder="https://..." value={form.url} onChange={update} isAr={isAr} langTab={langTab} />
                <Field label="Alt Text (SEO)" fieldKey="alt" placeholder="Project screenshot description" value={form.alt} onChange={update} isAr={isAr} langTab={langTab} />
              </div>
              <Field label="Description" fieldKey="description" as="textarea" value={form.description} onChange={update} isAr={isAr} langTab={langTab} />
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>What We Did</label>
                <ArrayInput listKey="what_we_did" inputKey="what_we_did" placeholder="Add item and press Enter" items={form.what_we_did} inputVal={inputs.what_we_did} isAr={isAr} lang={lang} onAdd={addItem} onRemove={removeItem} onInputChange={(key, val) => setInputs(prev => ({ ...prev, [key]: val }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Key Features</label>
                <ArrayInput listKey="features" inputKey="features" placeholder="Add feature and press Enter" items={form.features} inputVal={inputs.features} isAr={isAr} lang={lang} onAdd={addItem} onRemove={removeItem} onInputChange={(key, val) => setInputs(prev => ({ ...prev, [key]: val }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Technologies</label>
                <ArrayInput listKey="tech" inputKey="tech" placeholder="Add technology and press Enter" items={form.tech} inputVal={inputs.tech} isAr={isAr} lang={lang} onAdd={addItem} onRemove={removeItem} onInputChange={(key, val) => setInputs(prev => ({ ...prev, [key]: val }))} />
              </div>
            </div>
          </Section>
        ) : (
          <Section title="المحتوى العربي" subtitle="قم بتعبئة تفاصيل المشروع باللغة العربية">
            <div className="space-y-4" dir="rtl">
              <div className="flex items-center gap-3 mb-2">
                <button type="button" onClick={autoTranslate} disabled={translating}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{ background: 'rgba(195,74,54,0.1)', color: 'var(--accent-fire)' }}>
                  {translating ? <Loader2 size={12} className="animate-spin" /> : <Languages size={12} />}
                  {translating ? 'يتم الترجمة...' : 'ترجمة تلقائية من الإنجليزية'}
                </button>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>باستخدام Google Translate</span>
              </div>
              <Field label="اسم المشروع" fieldKey="name_ar" suffix="Arabic" value={form.name_ar} onChange={update} isAr={isAr} langTab={langTab} />
              <Field label="النص البديل" fieldKey="alt_ar" suffix="Arabic" value={form.alt_ar} onChange={update} isAr={isAr} langTab={langTab} />
              <Field label="الوصف" fieldKey="description_ar" as="textarea" suffix="Arabic" value={form.description_ar} onChange={update} isAr={isAr} langTab={langTab} />
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  ما قمنا به <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: 'rgba(195,74,54,0.1)', color: 'var(--accent-fire)' }}>Arabic</span>
                </label>
                <ArrayInput listKey="what_we_did_ar" inputKey="what_we_did_ar" placeholder="أضف عنصرًا واضغط Enter" items={form.what_we_did_ar} inputVal={inputs.what_we_did_ar} isAr={isAr} lang={lang} onAdd={addItem} onRemove={removeItem} onInputChange={(key, val) => setInputs(prev => ({ ...prev, [key]: val }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  المميزات الرئيسية <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: 'rgba(195,74,54,0.1)', color: 'var(--accent-fire)' }}>Arabic</span>
                </label>
                <ArrayInput listKey="features_ar" inputKey="features_ar" placeholder="أضف ميزة واضغط Enter" items={form.features_ar} inputVal={inputs.features_ar} isAr={isAr} lang={lang} onAdd={addItem} onRemove={removeItem} onInputChange={(key, val) => setInputs(prev => ({ ...prev, [key]: val }))} />
              </div>
            </div>
          </Section>
        )}

        <Section title={lang === 'ar' ? 'إعدادات النشر' : 'Publishing Settings'}
          subtitle={lang === 'ar' ? 'التحكم في الظهور والترتيب' : 'Control visibility and ordering'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                {lang === 'ar' ? 'ترتيب الفرز' : 'Sort Order'}
              </label>
              <input type="number" value={form.sort_order}
                onChange={e => update('sort_order', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{ color: 'var(--text-primary)', border: '1px solid var(--border)', background: 'var(--bg-tertiary)' }}
              />
            </div>
            <div className="flex items-end pb-2.5">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="w-10 h-5 rounded-full relative transition-all duration-200"
                  style={{ background: form.visible ? 'rgba(34,197,94,0.5)' : 'var(--border)' }}
                  onClick={() => update('visible', !form.visible)}>
                  <motion.div
                    animate={{ left: form.visible ? 22 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 w-4 h-4 rounded-full"
                    style={{ background: form.visible ? '#4ade80' : 'var(--text-muted)', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                  />
                </div>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {lang === 'ar' ? 'اظهار على الموقع' : 'Show on website'}
                </span>
              </label>
            </div>
          </div>
        </Section>

        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs py-2 px-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
            {error}
          </motion.p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <motion.button type="submit" disabled={saving}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #c34a36, #e0664d)', color: '#fff' }}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? (lang === 'ar' ? 'يتم الحفظ...' : 'Saving...') : isEdit ? (lang === 'ar' ? 'تحديث المشروع' : 'Update Project') : (lang === 'ar' ? 'إنشاء المشروع' : 'Create Project')}
          </motion.button>
          <button type="button" onClick={() => navigate('/admin/projects')}
            className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: 'var(--text-secondary)' }}>
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  )
}
