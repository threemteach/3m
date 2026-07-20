import { useEffect } from 'react'

const SITE_URL = 'https://3mtechs.com'
const SITE_NAME = '3M tech'
const DEFAULT_OG = `${SITE_URL}/og-logo.png`

export default function useSEO({ title, description, path, ogImage, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    const url = `${SITE_URL}${path || ''}`
    const image = ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : DEFAULT_OG

    document.title = fullTitle

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description || '')
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1')
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description || '')
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', image)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description || '')
    setMeta('meta[name="twitter:image"]', 'content', image)
    setMeta('link[rel="canonical"]', 'href', url)
  }, [title, description, path, ogImage, noindex])
}
