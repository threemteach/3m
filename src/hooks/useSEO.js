import { useEffect } from 'react'

export default function useSEO({ title, description, path, ogImage }) {
  useEffect(() => {
    const siteName = 'triple m'
    const fullTitle = title ? `${title} | ${siteName}` : siteName
    const url = `https://triple-mt.vercel.app${path || ''}`
    const image = ogImage || '/og-image.png'

    document.title = fullTitle

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description || '')
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description || '')
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', image)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description || '')
    setMeta('meta[name="twitter:image"]', 'content', image)
    setMeta('link[rel="canonical"]', 'href', url)
  }, [title, description, path, ogImage])
}
