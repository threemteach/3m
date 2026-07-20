import { motion } from 'framer-motion'
import { ExternalLink, Globe } from 'lucide-react'
import { useTranslation } from '../../context/LanguageContext.jsx'

const team = [
  {
    name: 'Mohamed Ramy Elmagrby',
    titleEn: 'Co-Founder & Web Developer',
    titleAr: 'مؤسس مشارك ومطور ويب',
    img: '/ramy.webp',
    portfolio: 'https://www.linkedin.com/',
  },
  {
    name: 'Mahmoud Magdy Hussien',
    titleEn: 'Co-Founder & Web Developer',
    titleAr: 'مؤسس مشارك ومطور ويب',
    img: '/mahmoud.webp',
    portfolio: 'https://mv7mood.vercel.app/',
  },
  {
    name: 'Moataz Gomaa',
    titleEn: 'Co-Founder & Creative Designer',
    titleAr: 'مؤسس مشارك ومصمم إبداعي',
    img: '/moataz.webp',
    portfolio: 'https://mo3tazv1.vercel.app/',
  },
]

export default function Team() {
  const { lang } = useTranslation()

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  }

  return (
    <section id="team" className="relative py-24 px-6 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 700px 400px at 50% 0%, var(--glow-violet), transparent 70%)',
      }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label">{lang === 'ar' ? 'فريقنا' : 'OUR TEAM'}</span>
          <h2 className="section-heading">
            {lang === 'ar' ? 'فريقنا' : 'Our'}{' '}
            <span style={{ color: 'var(--accent-fire)' }}>
              {lang === 'ar' ? 'المتميز' : 'Expert Team'}
            </span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'ar'
              ? 'تعرّف على العقول المبدعة وراء نجاح 3M tech.'
              : 'Meet the creative minds behind 3M tech.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 items-start">
          {team.map((member, i) => {
            return (
              <motion.div
                key={member.name}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15 }}
                className="group flex flex-col items-center text-center"
              >
                {/* Photo with gradient ring */}
                <div
                  className="relative rounded-full p-[2px] mb-5 w-44 h-44 sm:w-48 sm:h-48"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-fire), var(--accent-electric))',
                    transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: 'var(--team-shadow, 0 0 20px rgba(195, 74, 54, 0.10), 0 8px 30px rgba(0,0,0,0.06))',
                    transform: 'var(--team-transform, translateY(0) scale(1))',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.setProperty('--team-transform', 'translateY(-6px) scale(1.03)')
                    e.currentTarget.style.setProperty('--team-shadow', '0 0 60px rgba(195, 74, 54, 0.25), 0 0 60px rgba(124, 111, 232, 0.15), 0 25px 50px rgba(0,0,0,0.12)')
                    const img = e.currentTarget.querySelector('img')
                    const overlay = e.currentTarget.querySelector('.team-overlay')
                    if (img) img.style.transform = 'scale(1.08)'
                    if (overlay) overlay.style.opacity = '1'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.removeProperty('--team-transform')
                    e.currentTarget.style.removeProperty('--team-shadow')
                    const img = e.currentTarget.querySelector('img')
                    const overlay = e.currentTarget.querySelector('.team-overlay')
                    if (img) img.style.transform = 'scale(1)'
                    if (overlay) overlay.style.opacity = '0'
                  }}
                >
                  <div className="rounded-full overflow-hidden w-full h-full relative">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{
                        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                      loading="lazy"
                    />
                    <div
                      className="team-overlay absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, transparent 50%, rgba(195, 74, 54, 0.35) 100%)',
                        transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        opacity: 0,
                      }}
                    />
                  </div>
                </div>

                {/* Name & Title */}
                <div className="relative">
                  <h3 className="font-semibold text-lg sm:text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium mb-4" style={{ color: 'var(--accent-fire)' }}>
                    {lang === 'ar' ? member.titleAr : member.titleEn}
                  </p>

                  {/* Portfolio Button */}
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-700 ease-out hover:-translate-y-1 hover:scale-105"
                    style={{
                      background: 'color-mix(in srgb, var(--accent-fire) 8%, var(--bg-primary))',
                      color: 'var(--accent-fire)',
                      border: '1px solid color-mix(in srgb, var(--accent-fire) 20%, transparent)',
                      boxShadow: '0 0 0 transparent',
                      transition: 'background 0.7s ease-out, color 0.7s ease-out, box-shadow 0.7s ease-out, transform 0.7s ease-out',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--accent-fire)'
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.boxShadow = '0 4px 20px color-mix(in srgb, var(--accent-fire) 30%, transparent)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-fire) 8%, var(--bg-primary))'
                      e.currentTarget.style.color = 'var(--accent-fire)'
                      e.currentTarget.style.boxShadow = '0 0 0 transparent'
                    }}
                  >
                    <Globe size={12} />
                    {lang === 'ar' ? 'معرض الأعمال' : 'View Portfolio'}
                    <ExternalLink size={10} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
