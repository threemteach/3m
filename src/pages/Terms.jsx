import { useTranslation } from '../context/LanguageContext.jsx'
import useSEO from '../hooks/useSEO.js'

export default function Terms() {
  const { lang } = useTranslation()
  useSEO({
    title: lang === 'en' ? 'Terms of Service' : 'شروط الخدمة',
    description: lang === 'en' ? 'triple m terms of service — the terms governing the use of our website and services.' : 'شروط خدمة triple m — الشروط التي تنظم استخدام موقعنا وخدماتنا.',
    path: '/terms',
  })

  if (lang === 'ar') {
    return (
      <main className="pt-32 pb-24 px-6" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-space font-bold text-3xl md:text-4xl mb-8">شروط الخدمة</h1>
          <div className="space-y-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>آخر تحديث: يونيو 2026</p>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>1. قبول الشروط</h2>
              <p>باستخدام موقعنا الإلكتروني، فإنك توافق على شروط الخدمة هذه. إذا كنت لا توافق، يرجى عدم استخدام الموقع.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>2. الخدمات</h2>
              <p>نقدم خدمات تطوير تطبيقات الويب، متاجر التجارة الإلكترونية و Shopify، والـ MVPs، وتصميم واجهات المستخدم. يتم تحديد نطاق العمل والتسليمات في اتفاقية منفصلة لكل مشروع.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>3. الملكية الفكرية</h2>
              <p>يحتفظ triple m بحقوق الملكية الفكرية لجميع الأعمال حتى يتم السداد الكامل. بعد السداد، تنتقل جميع الحقوق إلى العميل.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>4. إخلاء المسؤولية</h2>
              <p>يتم تقديم موقعنا "كما هو" دون أي ضمانات. نحن لسنا مسؤولين عن أي أضرار غير مباشرة تنشأ عن استخدام موقعنا أو خدماتنا.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>5. التواصل</h2>
              <p>للاستفسارات، يرجى استخدام نموذج الاتصال على موقعنا.</p>
            </section>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-24 px-6" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-space font-bold text-3xl md:text-4xl mb-8">Terms of Service</h1>
        <div className="space-y-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>Last updated: June 2026</p>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>1. Acceptance of Terms</h2>
            <p>By using our website, you agree to these Terms of Service. If you do not agree, please do not use the site.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>2. Services</h2>
            <p>We provide web app development, e-commerce and Shopify stores, MVPs, and UI/UX design. Project scope and deliverables are defined in a separate agreement for each engagement.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>3. Intellectual Property</h2>
            <p>triple m retains intellectual property rights to all work until full payment is received. Upon payment, all rights transfer to the client.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>4. Disclaimer</h2>
            <p>Our website is provided "as is" without warranties. We are not liable for indirect damages arising from the use of our site or services.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>5. Contact</h2>
            <p>For inquiries, please use our contact form.</p>
          </section>
        </div>
      </div>
    </main>
  )
}