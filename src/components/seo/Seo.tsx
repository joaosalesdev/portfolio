import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import type { Language, SiteContent } from '../../types'

const SITE_URL = 'https://joaosalesdev.github.io/portfolio'
const SOCIAL_IMAGE = `${SITE_URL}/images/og-image.png`

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content
}

function setLink(rel: string, href: string, hrefLang?: string) {
  const selector = hrefLang ? `link[rel="${rel}"][hreflang="${hrefLang}"]` : `link[rel="${rel}"]:not([hreflang])`
  let element = document.head.querySelector<HTMLLinkElement>(selector)

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    if (hrefLang) element.hreflang = hrefLang
    document.head.appendChild(element)
  }

  element.href = href
}

export function Seo({ language, text }: { language: Language; text: SiteContent }) {
  const { pathname } = useLocation()
  const projectSlug = pathname.match(/\/projects\/([^/]+)/)?.[1]
  const project = text.projects.items.find((item) => item.slug === projectSlug)

  const metadata = useMemo(() => {
    if (project) {
      return {
        title: `${project.title} | João Paulo`,
        description: project.summary,
        type: 'article',
      }
    }

    if (pathname.endsWith('/projects')) {
      return {
        title: language === 'pt' ? 'Projetos de Engenharia de Software | João Paulo' : 'Software Engineering Projects | João Paulo',
        description: text.projects.description,
        type: 'website',
      }
    }

    if (pathname.endsWith('/about')) {
      return {
        title: language === 'pt' ? 'Sobre | João Paulo — Backend & Cloud Engineer' : 'About | João Paulo — Backend & Cloud Engineer',
        description: text.about.goals,
        type: 'profile',
      }
    }

    return {
      title: 'João Paulo | Backend & Cloud Engineer — Python & AWS',
      description: language === 'pt'
        ? 'Software Engineer especializado em sistemas backend, cloud, Python e AWS. Projetos reais documentados como estudos de caso técnicos.'
        : 'Software Engineer focused on backend systems, cloud architecture, Python and AWS. Production projects documented as technical case studies.',
      type: 'website',
    }
  }, [language, pathname, project, text])

  const canonicalPath = pathname.replace(/\/$/, '') || `/${language}`
  const canonical = `${SITE_URL}${canonicalPath}/`
  const alternatePath = canonicalPath.replace(/^\/(pt|en)/, language === 'pt' ? '/en' : '/pt')
  const alternateLanguage = language === 'pt' ? 'en' : 'pt'

  useEffect(() => {
    document.title = metadata.title
    setMeta('meta[name="description"]', 'name', 'description', metadata.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', metadata.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', metadata.type)
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
    setMeta('meta[property="og:image"]', 'property', 'og:image', SOCIAL_IMAGE)
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', language === 'pt' ? 'pt_PT' : 'en_US')
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', SOCIAL_IMAGE)
    setLink('canonical', canonical)
    setLink('alternate', canonical, language)
    setLink('alternate', `${SITE_URL}${alternatePath}/`, alternateLanguage)
    setLink('alternate', `${SITE_URL}${canonicalPath.replace(/^\/(pt|en)/, '/en')}/`, 'x-default')
  }, [alternateLanguage, alternatePath, canonical, canonicalPath, language, metadata])

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'João Paulo',
        jobTitle: 'Software Engineer | Backend & Cloud',
        url: `${SITE_URL}/en/`,
        sameAs: [
          'https://github.com/joaosalesdev',
          'https://www.linkedin.com/in/joao-sales-magalhaes/',
        ],
        knowsAbout: ['Backend Engineering', 'Cloud Computing', 'Python', 'AWS', 'Distributed Systems'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'João Paulo — Software Engineering Portfolio',
        url: `${SITE_URL}/en/`,
        inLanguage: ['en', 'pt'],
        author: { '@id': `${SITE_URL}/#person` },
      },
      ...(project ? [{
        '@type': 'CreativeWork',
        name: project.title,
        description: project.summary,
        url: canonical,
        inLanguage: language,
        author: { '@id': `${SITE_URL}/#person` },
        keywords: project.stack.join(', '),
      }, {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: text.nav.home, item: `${SITE_URL}/${language}/` },
          { '@type': 'ListItem', position: 2, name: text.nav.projects, item: `${SITE_URL}/${language}/projects/` },
          { '@type': 'ListItem', position: 3, name: project.title, item: canonical },
        ],
      }] : []),
    ],
  }

  return <script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
