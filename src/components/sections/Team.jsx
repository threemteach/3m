import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from '../../context/LanguageContext.jsx'

const team = [
  {
    name: 'Mohamed Ramy Elmagrby',
    titleEn: 'Web Developer',
    titleAr: 'مطور ويب',
    img: '/ramy.webp',
    portfolio: '#',
  },
  {
    name: 'Mahmoud Magdy Hussien',
    titleEn: 'CEO & Web Developer',
    titleAr: 'الرئيس التنفيذي ومطور ويب',
    img: '/mahmoud.webp',
    portfolio: 'https://mv7mood.vercel.app/',
  },
  {
    name: 'Moataz Gomaa',
    titleEn: 'UI/UX & Creative Designer',
    titleAr: 'مصمم واجهات وإبداعي',
    img: '/moataz.webp',
    portfolio: 'https://moataz-s.netlify.app/',
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
              ? 'تعرّف على العقول المبدعة وراء نجاح triple m.'
              : 'Meet the creative minds behind triple m.'}
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
                <div
                  className="relative rounded-full p-[2px] mb-5 w-44 h-44 sm:w-52 sm:h-52"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-fire), var(--accent-electric))',
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 0 20px rgba(195, 74, 54, 0.10), 0 8px 30px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 0 60px rgba(195, 74, 54, 0.25), 0 0 60px rgba(124, 111, 232, 0.15), 0 25px 50px rgba(0,0,0,0.12)'
                    const img = e.currentTarget.querySelector('img')
                    const overlay = e.currentTarget.querySelector('.team-overlay')
                    if (img) img.style.transform = 'scale(1.1)'
                    if (overlay) overlay.style.opacity = '1'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(195, 74, 54, 0.10), 0 8px 30px rgba(0,0,0,0.06)'
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
                        background: 'linear-gradient(180deg, transparent 50%, rgba(195, 74, 54, 0.25) 100%)',
                        transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        opacity: 0,
                      }}
                    />
                  </div>
                </div>

                <div className="relative">
                  <h3
                    className="font-semibold text-lg sm:text-xl mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {member.name}
                  </h3>

                  <p className="text-sm font-medium mb-4" style={{ color: 'var(--accent-fire)' }}>
                    {lang === 'ar' ? member.titleAr : member.titleEn}
                  </p>

                  <span className="inline-flex rounded-full p-[2px] mt-3" style={{ background: 'linear-gradient(135deg, var(--accent-fire), #d96b4a)' }}>
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-transparent transition-all duration-300"
                    >
                      <ExternalLink size={10} />
                      {lang === 'ar' ? 'معرض الأعمال' : 'View Portfolio'}
                    </a>
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
