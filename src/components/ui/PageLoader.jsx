import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useTranslation } from '../../context/LanguageContext.jsx'

export default function PageLoader() {
  const { dark } = useTheme()
  const { t } = useTranslation()
  const bgColor = dark ? '#0d0a15' : '#FFF7E9'
  const logo = dark ? '/logos/Orange.svg' : '/logos/dark%20purp.svg'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: bgColor }}
    >
      <motion.img
        src={logo}
        alt="3M tech"
        className="w-20 h-20 md:w-28 md:h-28"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="mt-6 w-20 h-0.5 rounded-full overflow-hidden"
        style={{ background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(26,20,16,0.08)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--accent-electric), var(--accent-fire))' }}
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}
