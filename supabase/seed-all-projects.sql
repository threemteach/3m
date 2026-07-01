-- Seed all 4 projects (English + Arabic)
-- After uploading images, update the light/dark URLs via dashboard or UPDATE queries

INSERT INTO projects (name, url, light, dark, alt, tag, description, what_we_did, tech, features, visible, sort_order, name_ar, alt_ar, description_ar, what_we_did_ar, features_ar) VALUES

-- 1. Rent Go
(
  'Rent Go',
  'https://rent-go.ae/',
  '', '',
  'Rent Go car rental booking platform homepage',
  'Web App',
  'A full-featured car rental booking platform with real-time availability, fleet management, and online payments.',
  '["UI/UX Design", "Frontend Development", "Booking Engine", "Payment Integration", "Admin Dashboard"]',
  '["React", "Next.js", "Tailwind CSS", "Stripe", "Node.js"]',
  '["Real-time car availability", "Online booking with payment", "Fleet management dashboard", "Multi-language support"]',
  true, 1,
  'رنت جو',
  'الصفحة الرئيسية لمنصة حجز السيارات رنت جو',
  'منصة متكاملة لتأجير السيارات مع خاصية التوفر الفوري وإدارة الأسطول والدفع الإلكتروني.',
  '["تصميم واجهات المستخدم", "تطوير الواجهة الأمامية", "محرك حجز", "دمج الدفع الإلكتروني", "لوحة تحكم المشرفين"]',
  '["توفر السيارات بشكل فوري", "حجز أونلاين مع الدفع", "لوحة تحكم إدارة الأسطول", "دعم متعدد اللغات"]'
),

-- 2. Watan Alex
(
  'Watan Alex',
  'https://watan-alex.netlify.app/',
  '', '',
  'Watan Alex real estate property listings website',
  'Web App',
  'A modern real estate platform showcasing property listings with advanced search, virtual tours, and agent profiles.',
  '["UI/UX Design", "Frontend Development", "Property CMS", "Map Integration", "SEO Optimization"]',
  '["React", "Next.js", "Tailwind CSS", "Mapbox", "Sanity CMS"]',
  '["Advanced property search", "Interactive maps", "Virtual tour support", "Agent management system"]',
  true, 2,
  'وطن الإسكندرية',
  'موقع عقاري لعرض العقارات وطن الإسكندرية',
  'منصة عقارية حديثة تعرض قوائم العقارات مع بحث متقدم وجولات افتراضية وملفات الوسطاء.',
  '["تصميم واجهات المستخدم", "تطوير الواجهة الأمامية", "نظام إدارة محتوى عقاري", "دمج الخرائط", "تحسين محركات البحث"]',
  '["بحث متقدم عن العقارات", "خرائط تفاعلية", "جولات افتراضية", "نظام إدارة الوسطاء"]'
),

-- 3. Royal CCR
(
  'Royal CCR',
  'https://royal-ccrs.vercel.app/',
  '', '',
  'Royal CCR construction and contracting services site',
  'Web App',
  'A professional corporate website for a construction and contracting company showcasing their portfolio and services.',
  '["UI/UX Design", "Frontend Development", "Portfolio Showcase", "Contact System", "Performance Optimization"]',
  '["React", "Next.js", "Tailwind CSS", "Framer Motion"]',
  '["Project portfolio gallery", "Service showcase", "Contact inquiry form", "Fast loading performance"]',
  true, 3,
  'رويال سي سي آر',
  'موقع خدمات المقاولات والتشييد رويال سي سي آر',
  'موقع شركة محترف لشركة مقاولات وتشييد يعرض محفظة أعمالهم وخدماتهم.',
  '["تصميم واجهات المستخدم", "تطوير الواجهة الأمامية", "عرض المحفظة", "نظام التواصل", "تحسين الأداء"]',
  '["معرض صور المشاريع", "عرض الخدمات", "نموذج استفسار", "أداء سريع التحميل"]'
),

-- 4. Egyfield
(
  'Egyfield',
  'https://egyfield.com/',
  '', '',
  'Egyfield oil and gas industry services website',
  'Web App',
  'A B2B corporate website for an oil and gas services company, featuring their expertise, projects, and industry insights.',
  '["UI/UX Design", "Frontend Development", "Corporate CMS", "Blog/News System", "Multilingual Support"]',
  '["React", "Next.js", "Tailwind CSS", "Headless CMS", "i18n"]',
  '["Corporate brand identity", "News and insights blog", "Project case studies", "Arabic & English support"]',
  true, 4,
  'إيجيفيلد',
  'موقع خدمات صناعة النفط والغاز إيجيفيلد',
  'موقع شركة B2B لشركة خدمات النفط والغاز، يعرض خبراتهم ومشاريعهم ورؤاهم الصناعية.',
  '["تصميم واجهات المستخدم", "تطوير الواجهة الأمامية", "نظام إدارة محتوى للشركات", "نظام مدونة وأخبار", "دعم متعدد اللغات"]',
  '["هوية العلامة التجارية للشركة", "مدونة الأخبار والرؤى", "دراسات حالة المشاريع", "دعم العربية والإنجليزية"]'
);
