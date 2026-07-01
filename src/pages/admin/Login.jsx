import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from '../../context/LanguageContext'

export default function AdminLogin() {
  const { signIn, loginLocked } = useAuth()
  const { t, lang } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) { setError(lang === 'ar' ? 'البريد الإلكتروني وكلمة المرور مطلوبان' : 'Email and password are required'); return }
    if (loginLocked) { setError(lang === 'ar' ? 'محاولات كثيرة جداً. انتظر 60 ثانية.' : 'Too many attempts. Please wait 60 seconds.'); return }
    setError('')
    setBusy(true)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || (lang === 'ar' ? 'بيانات غير صحيحة' : 'Invalid credentials'))
    } finally {
      setBusy(false)
    }
  }

  const logo = '/logos/Orange.svg'

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, var(--accent-fire), transparent 70%)', pointerEvents: 'none' }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, var(--accent-fire), transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="rounded-2xl p-8" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', boxShadow: '0 25px 60px rgba(0,0,0,0.15)' }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 p-3" style={{ background: 'rgba(195,74,54,0.1)' }}>
              <img src={logo} alt="triple m" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {lang === 'ar' ? 'مرحباً بعودتك' : 'Welcome back'}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {lang === 'ar' ? 'سجّل الدخول لإدارة مشاريعك' : 'Sign in to manage your projects'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={lang === 'ar' ? 'you@example.com' : 'you@example.com'}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  caretColor: 'var(--accent-fire)',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(195,74,54,0.4)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    caretColor: 'var(--accent-fire)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(195,74,54,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="text-xs text-center py-2 px-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
                {error}
              </motion.p>
            )}

            <button type="submit" disabled={busy || loginLocked}
              className="w-full py-2.5 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #c34a36, #e0664d)', color: '#fff' }}
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : null}
              {busy ? (lang === 'ar' ? 'يتم تسجيل الدخول...' : 'Signing in...') : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          {lang === 'ar' ? 'هذه المنطقة مخصصة للمشرفين فقط' : 'Only authorized administrators can access this area'}
        </p>
      </motion.div>
    </div>
  )
}
