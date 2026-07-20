import { motion } from 'framer-motion'
import { useTranslation } from '../context/LanguageContext.jsx'
import useSEO from '../hooks/useSEO.js'
import { MapPin, Phone, Clock, Globe, Users, Rocket, Code, Palette } from 'lucide-react'

const stats = [
  { value: '50+', en: 'Projects Delivered', ar: 'مشروع منجز' },
  { value: '3', en: 'Co-Founders', ar: 'شركاء مؤسسين' },
  { value: '1-2', en: 'Weeks Delivery', ar: 'أسبوع تسليم' },
  { value: '100%', en: 'Client Satisfaction', ar: 'رضا العملاء' },
]

const values = [
  {
    icon: Rocket,
    en: { title: 'Speed to Market', desc: 'A working product in 1-2 weeks. No agency hand-offs, no waiting on five departments.' },
    ar: { title: 'السرعة في الوصول للسوق', desc: 'منتج شغال خلال أسبوع إلى أسبوعين. بدون تسليم داخلي أو انتظار.' },
  },
  {
    icon: Code,
    en: { title: 'Modern Tech Stack', desc: 'React, Next.js, Supabase — built to last and easy for any developer to maintain.' },
    ar: { title: 'تقنيات حديثة', desc: 'React وNext.js وSupabase — أدوات تدوم وسهلة الصيانة.' },
  },
  {
    icon: Users,
    en: { title: 'Direct Access', desc: 'You message the people actually building your site. No middlemen.' },
    ar: { title: 'تواصل مباشر', desc: 'تتواصل مع المطور فعلياً. بدون وسطاء.' },
  },
  {
    icon: Palette,
    en: { title: 'Results-Driven Design', desc: 'Every page designed around what gets you leads or sales.' },
    ar: { title: 'تصميم يحقق نتائج', desc: 'كل صفحة مصممة لتحقيق عملاء أو مبيعات.' },
  },
]

const faqEn = [
  { q: 'What does 3M tech do?', a: '3M tech is a digital studio in Egypt that builds custom web applications, Shopify stores, e-commerce platforms, MVPs, and UI/UX designs for startups and businesses.' },
  { q: 'How much does it cost to build a website with 3M tech?', a: 'Contact us for a free consultation and we will provide a custom quote based on your project scope and requirements.' },
  { q: 'How long does it take to build a website?', a: 'Most projects are completed within 1-4 weeks depending on complexity. MVPs can be delivered in as little as 2 weeks.' },
  { q: 'What technologies does 3M tech use?', a: 'We use React, Next.js, Vite, Tailwind CSS for frontend, Supabase (PostgreSQL) for backend, and deploy on Vercel. For payments we integrate Paymob and Stripe.' },
  { q: 'Where is 3M tech located?', a: '3M tech is based in Egypt and serves clients in Egypt and the Middle East.' },
  { q: 'How can I contact 3M tech?', a: 'You can reach us via our website at 3mtechs.com, by phone at +201061883470, or through our social media on Facebook and Instagram.' },
]

const faqAr = [
  { q: 'ماذا تفعل 3M tech؟', a: '3M tech استوديو رقمي في مصر يبني تطبيقات ويب مخصصة ومتاجر شوبيفاي ومنصات تجارة إلكترونية ونماذج MVP وتصميمات UI/UX للشركات والSTARTUPS.' },
  { q: 'كم تكلفة بناء موقع مع 3M tech؟', a: 'تواصل معنا لاستشارة مجانية وسنقدم لك عرض سعر مخصص بناءً على نطاق مشروعك ومتطلباتك.' },
  { q: 'كم يستغرق بناء موقع؟', a: 'يتم إنجاز معظم المشاريع خلال 1-4 أسابيع حسب التعقيد. يمكن تسليم MVPs خلال أسبوعين فقط.' },
  { q: 'ما التقنيات التي تستخدمها 3M tech؟', a: 'نستخدم React وNext.js وVite وTailwind CSS للواجهة الأمامية، وSupabase (PostgreSQL) للخلفية، وننشر على Vercel. للدفع ندمج Paymob وStripe.' },
  { q: 'أين تقع 3M tech؟', a: 'تقع 3M tech في مصر وتخدم عملاء في مصر والشرق الأوسط.' },
  { q: 'كيف يمكنني التواصل مع 3M tech؟', a: 'يمكنك التواصل معنا عبر موقعنا 3mtechs.com أو عبر الهاتف على 01061883470 أو عبر وسائل التواصل الاجتماعي على فيسبوك وانستغرام.' },
]

export default function About() {
  const { lang } = useTranslation()

  useSEO({
    title: lang === 'en' ? 'About Us' : 'من نحن',
    description: lang === 'en'
      ? '3M tech is a digital craftsmanship studio in Egypt. We build custom web apps, Shopify stores, e-commerce platforms, MVPs, and UI/UX designs for startups and businesses.'
      : '3M tech استوديو صناعة برمجيات رقمية في مصر. نبني تطبيقات ويب مخصصة ومتاجر شوبيفاي ومنصات تجارة إلكترونية ونماذج MVP وتصميمات UI/UX للشركات والSTARTUPS.',
    path: '/about',
  })

  const faqs = lang === 'ar' ? faqAr : faqEn

  return (
    <main className="pt-32 pb-24 px-6" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="section-label">{lang === 'en' ? 'ABOUT US' : 'من نحن'}</span>
          <h1 className="section-heading text-4xl md:text-5xl mb-6">
            {lang === 'en' ? 'We Build Digital' : 'نبني'}
            <span style={{ color: 'var(--accent-fire)' }}>
              {lang === 'en' ? ' Products That Matter' : ' منتجات رقمية تفرق'}
            </span>
          </h1>
          <p className="section-body mx-auto max-w-3xl text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'en'
              ? '3M tech is a small, focused software studio based in Egypt. We help startups and businesses turn ideas into working web applications, e-commerce stores, and MVPs — fast, on budget, and built to get results.'
              : '3M tech استوديو برمجيات صغير ومركّز في مصر. نساعد الشركات والSTARTUPS على تحويل الأفكار إلى تطبيقات ويب ومنصات تجارة إلكترونية ونماذج MVP — بسرعة وفي الميزانية ومبنية لتحقيق نتائج.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: 'var(--accent-fire)' }}>{s.value}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{lang === 'ar' ? s.ar : s.en}</div>
            </motion.div>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'What We Do' : 'ماذا نفعل'}
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'en' ? (
              <>
                <p>At 3M tech, we specialize in building custom digital products for businesses and startups. Our core services include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Custom Web Applications</strong> — Dashboards, booking systems, internal tools, and customer portals built with React, Next.js, and Supabase.</li>
                  <li><strong>E-Commerce Platforms</strong> — Custom online stores with Supabase backends, Paymob/Stripe payments, optimized for the Egyptian market.</li>
                  <li><strong>Shopify Store Setup</strong> — Professional Shopify stores with custom themes, product configuration, and payment/shipping integration.</li>
                  <li><strong>MVP Development</strong> — Fast minimum viable products for founders to validate ideas with real users or investors.</li>
                  <li><strong>UI/UX Design</strong> — Custom Figma designs, wireframes, design systems, and developer handoff.</li>
                </ul>
              </>
            ) : (
              <>
                <p>في 3M tech، نتخصّص في بناء منتجات رقمية مخصصة للشركات والSTARTUPS. خدماتنا الرئيسية تشمل:</p>
                <ul className="list-disc pl-6 space-y-2" dir="rtl">
                  <li><strong>تطبيقات ويب مخصصة</strong> — داشبورد وأنظمة حجز وأدوات داخلية وبوابات عملاء مبنية بـ React وNext.js وSupabase.</li>
                  <li><strong>منصات تجارة إلكترونية</strong> — متاجر إلكترونية مخصصة بـ Supabase وPaymob/Stripe، محسّنة للسوق المصري.</li>
                  <li><strong>إعداد متاجر Shopify</strong> — متاجر Shopify احترافية بثيمات مخصصة وتكوين المنتجات ودفع وشحن.</li>
                  <li><strong>تطوير MVP</strong> — نماذج أولية سريعة للمؤسسين لاختبار أفكارهم مع مستخدمين حقيقيين أو مستثمرين.</li>
                  <li><strong>تصميم UI/UX</strong> — تصميمات Figma مخصصة وإطارات ونماذج أولية وتسليم للمطورين.</li>
                </ul>
              </>
            )}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Our Tech Stack' : 'تقنياتنا'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Figma', 'Vercel', 'Paymob', 'Stripe', 'Shopify', 'Liquid'].map(tech => (
              <div key={tech} className="px-4 py-3 rounded-xl text-sm font-medium text-center border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Why Choose Us' : 'لماذا تختارنا'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon
              const content = lang === 'ar' ? v.ar : v.en
              return (
                <div key={i} className="p-6 rounded-2xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-fire)', color: '#fff' }}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-lg">{content.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{content.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Our Team' : 'فريقنا'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Mohamed Ramy Elmagrby', roleEn: 'Co-Founder & Web Developer', roleAr: 'مؤسس مشارك ومطور ويب' },
              { name: 'Mahmoud Magdy Hussien', roleEn: 'Co-Founder & Web Developer', roleAr: 'مؤسس مشارك ومطور ويب' },
              { name: 'Moataz Gomaa', roleEn: 'Co-Founder & Creative Designer', roleAr: 'مؤسس مشارك ومصمم إبداعي' },
            ].map(m => (
              <div key={m.name} className="p-5 rounded-2xl border text-center" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <h3 className="font-semibold text-lg mb-1">{m.name}</h3>
                <p className="text-sm" style={{ color: 'var(--accent-fire)' }}>{lang === 'ar' ? m.roleAr : m.roleEn}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 p-8 rounded-3xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', borderLeft: '3px solid var(--accent-fire)' }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Get in Touch' : 'تواصل معنا'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: MapPin, text: 'Egypt' },
              { icon: Phone, text: '+20 106 188 3470' },
              { icon: Globe, text: '3mtechs.com' },
              { icon: Clock, text: lang === 'en' ? 'Sun - Sat, 9:00 AM - 6:00 PM' : 'الأحد - السبت، 9 صباحاً - 6 مساءً' },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <div key={i} className="flex items-center gap-3">
                  <Icon size={18} style={{ color: 'var(--accent-fire)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{c.text}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <h3 className="font-semibold text-base mb-2">{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
