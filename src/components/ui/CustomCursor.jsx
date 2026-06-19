import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ring = ringRef.current
    if (!ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    ring.style.transform = `translate(${mx - 15}px, ${my - 15}px)`

    function move(e) {
      mx = e.clientX
      my = e.clientY
    }

    function anim() {
      rx += (mx - rx) * 0.08
      ry += (my - ry) * 0.08
      ring.style.transform = `translate(${rx - 15}px, ${ry - 15}px)`
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
    <div
      ref={ringRef}
      className="custom-cursor-ring"
      style={{
        position: 'fixed', top: 0, left: 0,
        width: 30, height: 30,
        borderRadius: '50%',
        border: '1px solid rgba(195,74,54,0.2)',
        pointerEvents: 'none', zIndex: 99998,
        transform: 'translate(-100px, -100px)',
        transition: 'width 0.3s, height 0.3s, border-color 0.3s',
      }}
    />
  )
}
