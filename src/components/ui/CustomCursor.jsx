import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let hoverTarget = null

    dot.style.transform = `translate(${mx}px, ${my}px)`
    ring.style.transform = `translate(${mx - 14}px, ${my - 14}px)`

    function move(e) {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px)`
    }

    const clickables = new Set()
    function checkHover() {
      const el = document.elementFromPoint(mx, my)
      if (!el) return
      const clickable = el.closest('a, button, input, select, textarea, label, [role="button"], [onclick]')
      if (clickable !== hoverTarget) {
        hoverTarget = clickable
        ring.style.width = clickable ? '40px' : '28px'
        ring.style.height = clickable ? '40px' : '28px'
        ring.style.borderWidth = clickable ? '2px' : '1.5px'
        ring.style.background = clickable ? 'rgba(195,74,54,0.08)' : 'transparent'
        ring.style.borderColor = clickable ? 'var(--accent-fire)' : 'var(--accent-electric)'
        ring.style.transition = 'width 0.2s ease, height 0.2s ease, border-width 0.2s ease, background 0.2s ease, border-color 0.2s ease'
      }
    }

    function anim() {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      const ox = ring.offsetWidth / 2
      const oy = ring.offsetHeight / 2
      ring.style.transform = `translate(${rx - ox}px, ${ry - oy}px)`
      checkHover()
      requestAnimationFrame(anim)
    }

    window.addEventListener('mousemove', move)
    const raf = requestAnimationFrame(anim)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--accent-electric)',
          boxShadow: '0 0 8px var(--accent-electric)',
          pointerEvents: 'none', zIndex: 99999,
          transform: 'translate(-100px, -100px)',
          transition: 'width 0.15s ease, height 0.15s ease, background 0.15s ease',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 28, height: 28,
          borderRadius: '50%',
          border: '1.5px solid var(--accent-electric)',
          background: 'transparent',
          pointerEvents: 'none', zIndex: 99998,
          transform: 'translate(-100px, -100px)',
          transition: 'width 0.2s ease, height 0.2s ease, border-width 0.2s ease, background 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  )
}
