export default function SectionDivider({ flip }) {
  return (
    <div className="relative h-20 md:h-28 -my-1 overflow-hidden pointer-events-none" style={{ background: 'var(--bg-primary)' }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
        fill="currentColor"
        style={{ color: 'var(--bg-secondary)' }}
      >
        {flip ? (
          <path d="M0,0 C360,120 1080,0 1440,120 L1440,0 L0,0 Z" />
        ) : (
          <path d="M0,120 C360,0 1080,120 1440,0 L1440,0 L0,0 Z" />
        )}
      </svg>
    </div>
  )
}
