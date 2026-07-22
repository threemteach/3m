import { motion } from 'framer-motion'
import { useTranslation } from '../context/LanguageContext.jsx'
import useSEO from '../hooks/useSEO.js'
import { MapPin, Phone, Clock, Globe, Users, Rocket, Code, Palette, ExternalLink } from 'lucide-react'

const team = [
  {
    name: 'Mohamed Ramy Elmagrby',
    titleEn: 'Co-Founder, Web Developer & Content Creator',
    titleAr: 'مؤسس مشارك، مطور ويب ومنشئ محتوى',
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
    titleEn: 'Co-Founder, Graphic Designer & UI/UX',
    titleAr: 'مؤسس مشارك، مصمم جرافيك وواجهات مستخدم',
    img: '/moataz.webp',
    portfolio: 'https://mo3tazv1.vercel.app/',
  },
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
  { q: 'What does 3M tech do?', a: '3M tech is a software development company in Egypt that builds custom web applications, Shopify stores, e-commerce platforms, MVPs, and UI/UX designs for startups and businesses in Egypt and the Middle East.' },
  { q: 'How much does it cost to build a website with 3M tech?', a: 'Contact us for a free consultation and we will provide a custom quote based on your project scope and requirements.' },
  { q: 'How long does it take to build a website?', a: 'Most projects are completed within 1-4 weeks depending on complexity. MVPs can be delivered in as little as 2 weeks. We work in fixed-scope sprints so you know the timeline before we start.' },
  { q: 'What technologies does 3M tech use?', a: 'We use React, Next.js, Vite, and Tailwind CSS for frontend development, Supabase (PostgreSQL) for backend, and deploy on Vercel. For payments we integrate Paymob and Stripe.' },
  { q: 'Where is 3M tech located?', a: '3M tech is based in Egypt and serves clients across Egypt and the Middle East. We work remotely with clients and are available for in-person meetings.' },
  { q: 'How can I contact 3M tech?', a: 'You can reach us via our website at 3mtechs.com, by phone at +201061883470, or through our social media on Facebook and Instagram. We respond within 24 hours.' },
  { q: 'Do you work with clients outside Egypt?', a: 'Yes. While based in Egypt, we serve clients across the Middle East and work remotely with teams worldwide.' },
]

const faqAr = [
  { q: 'ماذا تفعل 3M tech؟', a: '3M tech شركة تطوير برمجيات في مصر تبني تطبيقات ويب مخصصة ومتاجر Shopify ومنصات تجارة إلكترونية ونماذج MVP وتصميمات UI/UX للشركات والستارت أبس في مصر والشرق الأوسط.' },
  { q: 'كم تكلفة بناء موقع مع 3M tech؟', a: 'تواصل معنا لاستشارة مجانية وسنقدم لك عرض سعر مخصص بناءً على نطاق مشروعك ومتطلباتك.' },
  { q: 'كم يستغرق بناء موقع؟', a: 'يتم إنجاز معظم المشاريع خلال 1-4 أسابيع حسب التعقيد. يمكن تسليم MVPs خلال أسبوعين فقط. نعمل بنطاق عمل ثابت حتى تعرف الجدول الزمني قبل البدء.' },
  { q: 'ما التقنيات التي تستخدمها 3M tech؟', a: 'نستخدم React وNext.js وVite وTailwind CSS للواجهة الأمامية، وSupabase (PostgreSQL) للخلفية، وننشر على Vercel. للدفع ندمج Paymob وStripe.' },
  { q: 'أين تقع 3M tech؟', a: 'تقع 3M tech في مصر وتخدم عملاء في مصر والشرق الأوسط. نعمل عن بُعد مع العملاء ومتاحون لاجتماعات شخصية.' },
  { q: 'كيف يمكنني التواصل مع 3M tech؟', a: 'يمكنك التواصل معنا عبر موقعنا 3mtechs.com أو عبر الهاتف على 01061883470 أو عبر وسائل التواصل الاجتماعي على فيسبوك وانستغرام. نرد خلال 24 ساعة.' },
  { q: 'هل تعملون مع عملاء خارج مصر؟', a: 'نعم. رغم أننا نقع في مصر، نخدم عملاء في جميع أنحاء الشرق الأوسط ونعمل عن بُعد مع فرق حول العالم.' },
]

export default function About() {
  const { lang } = useTranslation()

  useSEO({
    title: lang === 'en' ? 'About Us' : 'من نحن',
    description: lang === 'en'
      ? '3M tech is a software development company in Egypt. We build custom web apps, Shopify stores, e-commerce platforms, MVPs, and UI/UX designs for startups and businesses.'
      : '3M tech شركة تطوير برمجيات في مصر. نبني تطبيقات ويب مخصصة ومتاجر Shopify ومنصات تجارة إلكترونية ونماذج MVP وتصميمات UI/UX للشركات والستارت أبس.',
    path: '/about',
  })

  const faqs = lang === 'ar' ? faqAr : faqEn

  return (
    <main className="pt-32 pb-24 px-6" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="section-label">{lang === 'en' ? 'ABOUT US' : 'من نحن'}</span>
          <h1 className="section-heading text-4xl md:text-5xl mb-6">
            {lang === 'en' ? 'A Software Development Company Built for' : 'شركة تطوير برمجيات مبنية لـ'}
            <span style={{ color: 'var(--accent-fire)' }}>
              {lang === 'en' ? ' Real Results' : 'نتائج حقيقية'}
            </span>
          </h1>
          <p className="section-body mx-auto max-w-3xl text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'en'
              ? '3M tech is a software development company based in Egypt, serving clients across the Middle East. We build custom web applications, e-commerce platforms, Shopify stores, MVPs, and UI/UX designs — combining strategy, design, and development under one roof to deliver products that drive real business results.'
              : '3M tech شركة تطوير برمجيات مصرية تخدم عملاء في جميع أنحاء الشرق الأوسط. نبني تطبيقات ويب مخصصة ومنصات تجارة إلكترونية ومتاجر Shopify ونماذج MVP وتصميمات UI/UX — نجمع بين الاستراتيجية والتصميم والتطوير تحت سقف واحد لتقديم منتجات تحقق نتائج تجارية حقيقية.'}
          </p>
        </motion.div>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'What We Do' : 'ماذا نفعل'}
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'en' ? (
              <>
                <p>At 3M tech, we don't use templates. Every project we build is designed from scratch around your specific business needs, brand identity, and user experience. Whether you need a full web application, an online store, or a fast MVP — we craft a unique solution tailored to your goals.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Custom Web Applications</strong> — Dashboards, booking systems, internal tools, and customer portals built with React, Next.js, and Supabase. Every screen designed from scratch around your exact workflow.</li>
                  <li><strong>E-Commerce Platforms</strong> — Custom online stores with Supabase backends, Paymob/Stripe payments, and mobile-optimized checkout flows — every pixel designed for your brand.</li>
                  <li><strong>Shopify Store Setup</strong> — Custom Shopify theme design built from scratch for your brand identity. No stock templates, no recoloring — a store that looks and feels uniquely yours.</li>
                  <li><strong>MVP Development</strong> — Fast minimum viable products with real backends — authentication, database, and file storage — designed to match your vision, not a pre-built framework.</li>
                  <li><strong>UI/UX Design</strong> — Custom Figma designs, wireframes, design systems, and clean developer handoff. Every interface crafted from scratch based on user research and your business goals.</li>
                </ul>
              </>
            ) : (
              <>
                <p>في 3M tech، لا نستخدم القوالب الجاهزة. كل مشروع نبنيه مصمم من الصفر وفقًا لاحتياجات عملك وهويتك التجارية وتجربة المستخدم الخاصة بك. سواء كنت تحتاج تطبيق ويب كامل أو متجر إلكتروني أو MVP سريع — نصمم حلاً فريدًا مخصصًا لأهدافك.</p>
                <ul className="list-disc pl-6 space-y-2" dir="rtl">
                  <li><strong>تطبيقات ويب مخصصة</strong> — داشبورد وأنظمة حجز وأدوات داخلية وبوابات عملاء مبنية بـ React وNext.js وSupabase. كل شاشة مصممة من الصفر حول طريقة عملك بالضبط.</li>
                  <li><strong>منصات تجارة إلكترونية</strong> — متاجر إلكترونية مخصصة بـ Supabase وPaymob/Stripe، بتدفقات دفع مُحسّنة — كل بكسل مصمم لعلامتك التجارية.</li>
                  <li><strong>إعداد متاجر Shopify</strong> — تصميم ثيم Shopify مخصص مبني من الصفر لهويتك التجارية. لا قوالب جاهزة، لا إعادة تلوين — متجر يبدو ويشعر بأنه فريد خاص بعلامتك.</li>
                  <li><strong>تطوير MVP</strong> — نماذج أولية سريعة بباك إند حقيقي — مصادقة وقاعدة بيانات وتخزين ملفات — مصممة لتتطابق مع رؤيتك، وليس إطار عمل مُ-build مسبقاً.</li>
                  <li><strong>تصميم UI/UX</strong> — تصميمات Figma مخصصة وإطارات ونماذج أولية وتسليم نظيف. كل واجهة مصممة من الصفر بناءً على بحث المستخدم وأهدافك التجارية.</li>
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
            {['React', 'Next.js', 'Vite', 'Tailwind CSS', 'PostgreSQL', 'Figma', 'Paymob', 'Stripe', 'Shopify'].map(tech => (
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
          <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Our Team' : 'فريقنا'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 items-start">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="group flex flex-col items-center text-center"
              >
                <div
                  className="relative rounded-full p-[2px] mb-5 w-44 h-44 sm:w-48 sm:h-48"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-fire), var(--accent-electric))',
                    boxShadow: '0 0 20px rgba(195, 74, 54, 0.10), 0 8px 30px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 0 60px rgba(195, 74, 54, 0.25), 0 0 60px rgba(124, 111, 232, 0.15), 0 25px 50px rgba(0,0,0,0.12)'
                    const img = e.currentTarget.querySelector('img')
                    const overlay = e.currentTarget.querySelector('.team-overlay')
                    if (img) img.style.transform = 'scale(1.08)'
                    if (overlay) overlay.style.opacity = '1'
                  }}
                  onMouseLeave={e => {
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
                      style={{ transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
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
                <div className="relative">
                  <h3 className="font-semibold text-lg sm:text-xl mb-1" style={{ color: 'var(--text-primary)' }}>{member.name}</h3>
                  <p className="text-sm font-medium" style={{ color: 'var(--accent-fire)' }}>
                    {lang === 'ar' ? member.titleAr : member.titleEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16 p-8 rounded-3xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', borderLeft: '3px solid var(--accent-fire)' }}>
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

        <section className="mb-16 p-8 rounded-3xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', borderLeft: '3px solid var(--accent-fire)' }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Get in Touch' : 'تواصل معنا'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: MapPin, text: 'Egypt' },
              { icon: Phone, text: '+20 106 188 3470' },
              { icon: Globe, text: '3mtechs.com' },
              { icon: Clock, text: lang === 'en' ? 'Available 24/7' : 'متوفر على مدار الساعة' },
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
      </div>
    </main>
  )
}
