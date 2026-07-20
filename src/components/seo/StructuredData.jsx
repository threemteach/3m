import { useEffect } from 'react'

const DOMAIN = 'https://3mtechs.com'
const BRAND = '3M tech'

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BRAND,
  url: DOMAIN + '/',
  logo: {
    '@type': 'ImageObject',
    url: DOMAIN + '/logo-512.png',
    width: 512,
    height: 512,
  },
  image: DOMAIN + '/og-logo.png',
  description: '3M tech builds custom web applications, Shopify stores, e-commerce platforms, MVPs, and UI/UX designs for startups and businesses in Egypt and the Middle East.',
  address: { '@type': 'PostalAddress', addressCountry: 'EG' },
  telephone: '+201061883470',
  email: 'contact@3mtechs.com',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61590725834401',
    'https://www.instagram.com/3m_.tech/',
  ],
  priceRange: '$$',
  openingHours: 'Mo-Sa 09:00-18:00',
  areaServed: ['Egypt', 'Middle East'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '3M tech Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Web Applications', description: 'Dashboards, booking systems, internal tools, and customer portals built with React, Next.js, and Supabase.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce Platforms', description: 'Custom online stores with Supabase backends, Paymob/Stripe payments, optimized for the Egyptian market.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopify Store Setup', description: 'Professional Shopify stores with custom themes, product configuration, and payment/shipping integration.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MVP Development', description: 'Fast minimum viable products for founders to validate ideas with real users or investors.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design', description: 'Custom Figma designs, wireframes, design systems, and developer handoff.' } },
    ],
  },
}

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web Development',
  provider: { '@type': 'LocalBusiness', name: BRAND },
  description: 'Custom web applications, e-commerce stores, Shopify development, MVPs, and UI/UX design services for businesses in Egypt and the Middle East.',
  areaServed: { '@type': 'Country', name: 'Egypt' },
}

const webSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: BRAND,
  url: DOMAIN + '/',
  publisher: {
    '@type': 'Organization',
    name: BRAND,
    logo: {
      '@type': 'ImageObject',
      url: DOMAIN + '/logo-512.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: DOMAIN + '/projects',
    },
    'query-input': 'required name=search_term_string',
  },
}

const teamMembers = [
  {
    '@type': 'Person',
    name: 'Mohamed Ramy Elmagrby',
    jobTitle: 'Co-Founder & Web Developer',
    worksFor: { '@type': 'LocalBusiness', name: BRAND },
    url: 'https://www.linkedin.com/',
  },
  {
    '@type': 'Person',
    name: 'Mahmoud Magdy Hussien',
    jobTitle: 'Co-Founder & Web Developer',
    worksFor: { '@type': 'LocalBusiness', name: BRAND },
    url: 'https://mv7mood.vercel.app/',
  },
  {
    '@type': 'Person',
    name: 'Moataz Gomaa',
    jobTitle: 'Co-Founder & Creative Designer',
    worksFor: { '@type': 'LocalBusiness', name: BRAND },
    url: 'https://mo3tazv1.vercel.app/',
  },
]

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND,
  url: DOMAIN + '/',
  logo: {
    '@type': 'ImageObject',
    url: DOMAIN + '/logo-512.png',
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61590725834401',
    'https://www.instagram.com/3m_.tech/',
  ],
  member: teamMembers.map(m => ({
    '@type': 'Person',
    name: m.name,
    jobTitle: m.jobTitle,
  })),
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does 3M tech do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '3M tech is a digital studio in Egypt that builds custom web applications, Shopify stores, e-commerce platforms, MVPs, and UI/UX designs for startups and businesses in Egypt and the Middle East.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to build a website with 3M tech?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact us for a free consultation and we will provide a custom quote based on your project scope and requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a website with 3M tech?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most projects are completed within 1-4 weeks depending on complexity. MVPs can be delivered in as little as 2 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does 3M tech use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We use React, Next.js, Vite, Tailwind CSS for frontend, Supabase (PostgreSQL) for backend, and deploy on Vercel. For payments we integrate Paymob and Stripe.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is 3M tech located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '3M tech is based in Egypt and serves clients in Egypt and the Middle East.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact 3M tech?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reach us via our website at 3mtechs.com, by phone at +201061883470, or through our social media on Facebook and Instagram.',
      },
    },
  ],
}

export default function StructuredData() {
  useEffect(() => {
    const inject = (id, data) => {
      const existing = document.getElementById(id)
      if (existing) existing.remove()
      const script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    }
    inject('ld-local-business', localBusiness)
    inject('ld-service', service)
    inject('ld-web-site', webSite)
    inject('ld-organization', organization)
    inject('ld-faq-page', faqPage)
    return () => {
      document.getElementById('ld-local-business')?.remove()
      document.getElementById('ld-service')?.remove()
      document.getElementById('ld-web-site')?.remove()
      document.getElementById('ld-organization')?.remove()
      document.getElementById('ld-faq-page')?.remove()
    }
  }, [])
  return null
}
