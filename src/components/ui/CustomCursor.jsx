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

    dot.style.transform = `translate(${mx}px, ${my}px)`
    ring.style.transform = `translate(${mx - 12}px, ${my - 12}px)`

    function move(e) {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px)`
    }

    function anim() {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.transform = `translate(${rx - 12}px, ${ry - 12}px)`
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
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 7, height: 7,
          borderRadius: '50%',
          background: 'var(--accent-fire)',
          pointerEvents: 'none', zIndex: 99999,
          transform: 'translate(-100px, -100px)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 24, height: 24,
          borderRadius: '50%',
          border: '1px solid rgba(255,247,233,0.3)',
          pointerEvents: 'none', zIndex: 99998,
          mixBlendMode: 'difference',
          transform: 'translate(-100px, -100px)',
        }}
      />
    </>
  )
}
