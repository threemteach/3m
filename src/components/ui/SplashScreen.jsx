import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'

function rand(min, max) { return Math.random() * (max - min) + min }

export default function SplashScreen({ onFinish }) {
  const { dark } = useTheme()
  const { t } = useTranslation()
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)
  const ready = useRef(false)

  const particles = useMemo(() => {
    const arr = []
    const primary = dark ? '#c34a36' : '#c34a36'
    const secondary = dark ? '#7C6FE8' : '#4A3A8C'
    for (let i = 0; i < 80; i++) {
      arr.push({
        x: rand(0, 100), y: rand(0, 100),
        size: rand(2, 5), dur: rand(4, 10), delay: -rand(0, 10),
        dx: rand(-40, 40), dy: rand(-40, 40), color: primary,
      })
    }
    for (let i = 0; i < 50; i++) {
      arr.push({
        x: rand(0, 100), y: rand(0, 100),
        size: rand(1.5, 4), dur: rand(5, 12), delay: -rand(0, 12),
        dx: rand(-30, 30), dy: rand(-30, 30), color: secondary,
      })
    }
    return arr
  }, [dark])

  const bgColor = dark ? '#0d0a15' : '#FFF7E9'
  const textColor = dark ? 'rgba(255,255,255,0.35)' : 'rgba(26,20,16,0.5)'
  const mutedColor = dark ? 'rgba(255,255,255,0.25)' : 'rgba(26,20,16,0.35)'
  const barTrack = dark ? 'rgba(255,255,255,0.08)' : 'rgba(26,20,16,0.08)'
  const logo = dark ? '/logos/Orange.svg' : '/logos/dark%20purp.svg'
  const tagline = t('hero.label')

  useEffect(() => {
    let mounted = true
    const minTime = 1500
    const start = Date.now()

    function checkReady() {
      if (!mounted) return
      const elapsed = Date.now() - start
      setProgress(Math.min(100, Math.round((elapsed / minTime) * 100)))
      if (ready.current && elapsed >= minTime) {
        setShow(false)
        setTimeout(onFinish, 600)
      }
    }

    Promise.all([
      new Promise(resolve => {
        if (document.readyState === 'complete') return resolve()
        window.addEventListener('load', resolve, { once: true })
      }),
      document.fonts ? document.fonts.ready : Promise.resolve(),
    ]).then(() => {
      ready.current = true
      checkReady()
    })

    const interval = setInterval(checkReady, 80)
    return () => { mounted = false; clearInterval(interval) }
  }, [onFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: bgColor }}
        >
          <style>{`
            .splash-particle {
              position: absolute; border-radius: 50%;
              pointer-events: none; will-change: transform;
              animation: splash-drift ease-in-out infinite;
              opacity: 0.3;
            }
            @keyframes splash-drift {
              0%, 100% { transform: translate(0,0) scale(1); opacity: 0.1; }
              25% { opacity: 0.5; }
              50% { transform: translate(var(--dx),var(--dy)) scale(1.4); opacity: 0.2; }
              75% { opacity: 0.5; }
            }
            @media (prefers-reduced-motion: reduce) {
              .splash-particle { animation: none !important; }
            }
          `}</style>

          {particles.map((p, i) => (
            <div
              key={i}
              className="splash-particle"
              style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size,
                background: p.color,
                '--dx': `${p.dx}px`, '--dy': `${p.dy}px`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
            />
          ))}

          <div className="relative flex flex-col items-center gap-0" style={{ zIndex: 1 }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative mb-6"
            >
              <motion.div
                className="absolute -inset-10 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${dark ? 'rgba(195,74,54,0.15)' : 'rgba(195,74,54,0.08)'}, transparent 70%)`,
                  filter: 'blur(30px)',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <img src={logo} alt="triple m" className="w-28 h-28 md:w-36 md:h-36" />
            </motion.div>

            <div className="flex flex-col items-center gap-3">
              <motion.p
                className="text-xs md:text-sm tracking-[0.2em] uppercase font-medium"
                style={{ color: textColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {tagline}
              </motion.p>

              <motion.div
                className="w-36 md:w-44"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <div className="h-[2px] rounded-full overflow-hidden" style={{ background: barTrack }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--accent-electric), var(--accent-fire))' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: progress < 100 ? 'var(--accent-fire)' : '#4ade80' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="text-[10px] tracking-[0.15em] font-medium" style={{ color: mutedColor }}>
                  {progress < 100 ? 'INITIALIZING' : 'CONNECTED'}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}