import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState, useRef, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import ScrollProgress from './components/ui/ScrollProgress.jsx'
import CustomCursor from './components/ui/CustomCursor.jsx'
import WhatsAppButton from './components/ui/WhatsAppButton.jsx'
import SplashScreen from './components/ui/SplashScreen.jsx'
import PageLoader from './components/ui/PageLoader.jsx'
import Marquee from './components/sections/Marquee.jsx'
import Services from './components/sections/Services.jsx'
import SectionDivider from './components/ui/SectionDivider.jsx'
import WhyMmm from './components/sections/WhyMmm.jsx'
import Projects from './components/sections/Projects.jsx'
import Process from './components/sections/Process.jsx'
import Team from './components/sections/Team.jsx'
import CTA from './components/sections/CTA.jsx'
import StructuredData from './components/seo/StructuredData.jsx'
import useSEO from './hooks/useSEO.js'
import { useTranslation } from './context/LanguageContext.jsx'

const NavContext = createContext()

function PageWrap({ children }) {
  const { onPageLoaded } = useContext(NavContext)
  useEffect(() => { onPageLoaded() }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function Home() {
  const { lang } = useTranslation()
  useSEO({
    title: lang === 'ar' ? 'الرئيسية' : 'Home',
    description: lang === 'ar'
      ? '3M tech يبني تطبيقات ويب مخصصة ومتاجر شوبيفاي ومنصات تجارة إلكترونية ونماذج MVP وتصميمات UI/UX للشركات والSTARTUPS في مصر والشرق الأوسط.'
      : '3M tech builds custom web apps, Shopify stores, e-commerce platforms, MVPs, and UI/UX designs for startups and businesses in Egypt and the Middle East.',
    path: '/',
  })
  return (
    <PageWrap>
      <main>
        <Hero />
        <Marquee />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Projects />
        <SectionDivider flip />
        <WhyMmm />
        <SectionDivider flip />
        <Process />
        <SectionDivider />
        <Team />
        <SectionDivider flip />
        <CTA />
      </main>
    </PageWrap>
  )
}

const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const AboutPage = lazy(() => import('./pages/About.jsx'))
const PrivacyPage = lazy(() => import('./pages/Privacy.jsx'))
const TermsPage = lazy(() => import('./pages/Terms.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFound.jsx'))

// Admin
const AdminLogin = lazy(() => import('./pages/admin/Login.jsx'))
const AdminLayout = lazy(() => import('./components/admin/AdminLayout.jsx'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard.jsx'))
const AdminProjectsList = lazy(() => import('./pages/admin/ProjectsList.jsx'))
const AdminProjectForm = lazy(() => import('./pages/admin/ProjectForm.jsx'))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute.jsx'))

function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [navigating, setNavigating] = useState(false)
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname
      setNavigating(true)
    }
  }, [location.pathname])

  function onPageLoaded() {
    setNavigating(false)
  }

  if (isAdmin) {
    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-fire)', borderTopColor: 'transparent' }} />
        </div>
      }>
        <CustomCursor />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjectsList />} />
            <Route path="projects/new" element={<AdminProjectForm />} />
            <Route path="projects/:id/edit" element={<AdminProjectForm />} />
          </Route>
        </Routes>
      </Suspense>
    )
  }

  return (
    <NavContext.Provider value={{ onPageLoaded }}>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      <AnimatePresence>
        {navigating && <PageLoader />}
      </AnimatePresence>
      <StructuredData />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Suspense fallback={<PageLoader />}><PageWrap><ProjectsPage /></PageWrap></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<PageLoader />}><PageWrap><AboutPage /></PageWrap></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><PageWrap><PrivacyPage /></PageWrap></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={<PageLoader />}><PageWrap><TermsPage /></PageWrap></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><PageWrap><NotFoundPage /></PageWrap></Suspense>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </NavContext.Provider>
  )
}

export default App
