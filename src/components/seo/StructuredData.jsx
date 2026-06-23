import { useEffect } from 'react'

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'triple m',
  url: 'https://triple-mt.vercel.app/',
  logo: '/logos/Orange.svg',
  description: 'Digital craftsmanship studio building web apps, e-commerce stores, Shopify stores, MVPs, and UI/UX designs.',
  address: { '@type': 'PostalAddress', addressCountry: 'EG' },
  telephone: '+201061883470',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61590725834401',
    'https://www.instagram.com/3m_.tech/',
  ],
  priceRange: '$$',
  openingHours: 'Mo-Sa 09:00-18:00',
}

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web Development',
  provider: { '@type': 'LocalBusiness', name: 'triple m' },
  description: 'Custom web applications, e-commerce stores, Shopify development, MVPs, and UI/UX design services.',
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
    return () => {
      document.getElementById('ld-local-business')?.remove()
      document.getElementById('ld-service')?.remove()
    }
  }, [])
  return null
}
