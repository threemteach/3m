import { useTranslation } from '../context/LanguageContext.jsx'
import useSEO from '../hooks/useSEO.js'

export default function Privacy() {
  const { lang } = useTranslation()
  useSEO({
    title: lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية',
    description: lang === 'en' ? 'triple m privacy policy — how we collect, use, and protect your personal information.' : 'سياسة الخصوصية لـ triple m — كيف نجمع ونستخدم ونحمي معلوماتك الشخصية.',
    path: '/privacy',
  })

  if (lang === 'ar') {
    return (
      <main className="pt-32 pb-24 px-6" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-space font-bold text-3xl md:text-4xl mb-8">سياسة الخصوصية</h1>
          <div className="space-y-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>آخر تحديث: يونيو 2026</p>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>1. المقدمة</h2>
              <p>نحن في triple m نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام موقعنا.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>2. المعلومات التي نجمعها</h2>
              <p>نجمع المعلومات التي تقدمها طواعية من خلال نموذج الاتصال: الاسم، البريد الإلكتروني، رقم الهاتف (اختياري)، ورسالتك. لا نجمع أي بيانات تصفح أو ملفات تعريف ارتباط للتتبع.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>3. كيفية استخدام معلوماتك</h2>
              <p>نستخدم معلوماتك فقط للرد على استفساراتك والتواصل معك بخصوص مشروعك. لا نشارك معلوماتك مع أطراف ثالثة.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>4. تخزين البيانات</h2>
              <p>تُخزَّن رسائلك عبر خدمة EmailJS وفقاً لسياسة الخصوصية الخاصة بهم. نحن لا نخزن بياناتك على خوادمنا.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>5. حقوقك</h2>
              <p>لديك الحق في طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت بالتواصل معنا.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>6. التواصل</h2>
              <p>للاستفسارات المتعلقة بالخصوصية، تواصل معنا عبر نموذج الاتصال في موقعنا.</p>
            </section>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-24 px-6" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-space font-bold text-3xl md:text-4xl mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>Last updated: June 2026</p>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>1. Introduction</h2>
            <p>At triple m, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our website.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>2. Information We Collect</h2>
            <p>We only collect information you voluntarily provide via our contact form: name, email, phone (optional), and your message. We do not collect browsing data or use tracking cookies.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>3. How We Use Your Information</h2>
            <p>We use your information solely to respond to your inquiries and communicate with you about your project. We do not share your information with third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>4. Data Storage</h2>
            <p>Your messages are stored via EmailJS in accordance with their privacy policy. We do not store your data on our own servers.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>5. Your Rights</h2>
            <p>You have the right to request access, correction, or deletion of your personal data at any time by contacting us.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>6. Contact</h2>
            <p>For privacy-related inquiries, reach out via our contact form.</p>
          </section>
        </div>
      </div>
    </main>
  )
}