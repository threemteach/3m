import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

const MAX_LOGIN_ATTEMPTS = 5
const LOGIN_LOCKOUT_MS = 60000
const SESSION_TIMEOUT_MS = 30 * 60 * 1000

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loginLocked, setLoginLocked] = useState(false)
  const loginAttempts = useRef(0)
  const sessionTimer = useRef(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) checkAdmin(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) checkAdmin(session.user.id)
      else setIsAdmin(false)
    })

    return () => subscription?.unsubscribe()
  }, [])

  async function checkAdmin(userId) {
    const { data } = await supabase
      .from('admins')
      .select('id')
      .eq('id', userId)
      .maybeSingle()
    setIsAdmin(!!data)
  }

  useEffect(() => {
    if (!user || !isAdmin) return

    function resetTimer() {
      clearTimeout(sessionTimer.current)
      sessionTimer.current = setTimeout(() => {
        supabase.auth.signOut()
        setUser(null)
        setIsAdmin(false)
      }, SESSION_TIMEOUT_MS)
    }

    resetTimer()
    window.addEventListener('mousemove', resetTimer, { passive: true })
    window.addEventListener('keydown', resetTimer, { passive: true })
    window.addEventListener('click', resetTimer, { passive: true })
    window.addEventListener('touchstart', resetTimer, { passive: true })

    return () => {
      clearTimeout(sessionTimer.current)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keydown', resetTimer)
      window.removeEventListener('click', resetTimer)
      window.removeEventListener('touchstart', resetTimer)
    }
  }, [user, isAdmin])

  async function signIn(email, password) {
    if (loginLocked) throw new Error('Too many login attempts. Please wait 60 seconds before trying again.')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      loginAttempts.current += 1
      if (loginAttempts.current >= MAX_LOGIN_ATTEMPTS) {
        setLoginLocked(true)
        setTimeout(() => {
          setLoginLocked(false)
          loginAttempts.current = 0
        }, LOGIN_LOCKOUT_MS)
      }
      throw error
    }
    loginAttempts.current = 0
    setUser(data.user)
    await checkAdmin(data.user.id)
  }

  async function signOut() {
    clearTimeout(sessionTimer.current)
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, loginLocked, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
