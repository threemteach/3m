import { useMemo } from 'react'

const COLORS = ['#7C6FE8', '#00F5A0', '#c34a36']

function rand(min, max) { return Math.random() * (max - min) + min }

export default function ThreeBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      x: rand(0, 100), y: rand(0, 100),
      size: rand(2, 5), color: COLORS[i % 3],
      dur: rand(6, 14), delay: -rand(0, 12),
      dx: rand(-40, 40), dy: rand(-40, 40),
    })),
  [])

  return (
    <div className="css-hero-bg">
      <style>{`
        .css-hero-bg {
          position: absolute; inset: 0;
          pointer-events: none; overflow: hidden;
          z-index: 0;
        }
        .css-hero-particle {
          position: absolute; border-radius: 50%;
          pointer-events: none; will-change: transform;
          animation: css-hero-drift ease-in-out infinite;
          opacity: 0.3;
        }
        @keyframes css-hero-drift {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.1; }
          25% { opacity: 0.5; }
          50% { transform: translate(var(--dx),var(--dy)) scale(1.3); opacity: 0.2; }
          75% { opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          .css-hero-particle { animation: none !important; }
        }
      `}</style>

      {particles.map((p, i) => (
        <div
          key={i}
          className="css-hero-particle"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.color,
            '--dx': `${p.dx}px`, '--dy': `${p.dy}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
