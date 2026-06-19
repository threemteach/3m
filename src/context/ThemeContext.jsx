import { createContext, useContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

function getCookie(name) {
  try {
    return document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1]
  } catch { return null }
}

function setCookie(name, value) {
  try {
    document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Lax`
  } catch {}
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = getCookie('theme')
    return saved ? saved === 'dark' : false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    setCookie('theme', dark ? 'dark' : 'light')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = dark ? '#1a1a2e' : '#4A3A8C'
  }, [dark])

  const toggle = () => setDark(p => !p)

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
