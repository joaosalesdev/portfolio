import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import type { Language, SiteContent } from '../../types'

const SITE_URL = 'https://joaosalesdev.github.io/portfolio'
const HOME_SOCIAL_IMAGE = `${SITE_URL}/images/og-architecture.png?v=20260806`
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/images/social-card-v2.jpg`
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`
const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const ROBOTS_NOINDEX = 'noindex, follow'

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
  const isHome = new RegExp(`/${language}/?$`).test(pathname)
  const socialImage = project ? `${SITE_URL}${project.coverImage}` : isHome ? HOME_SOCIAL_IMAGE : DEFAULT_SOCIAL_IMAGE
  const socialImageAlt = project?.coverImageAlt ?? (language === 'pt'
    ? 'João Paulo Sales Magalhães, Engenheiro Backend e Cloud especializado em Python, AWS e sistemas serverless'
    : 'João Paulo Sales Magalhães, Backend and Cloud Engineer specializing in Python, AWS and serverless systems')
  const isKnownPage = Boolean(
    project
    || pathname.endsWith('/projects')
    || pathname.endsWith('/about')
    || isHome,
  )

  const metadata = useMemo(() => {
    if (project) {
      return {
        title: `${project.title} | João Paulo Sales Magalhães`,
        description: project.summary,
        type: 'article',
      }
    }

    if (pathname.endsWith('/projects')) {
      return {
        title: language === 'pt' ? 'Projetos Backend & Cloud | João Paulo Sales Magalhães' : 'Backend & Cloud Projects | João Paulo Sales Magalhães',
        description: text.projects.description,
        type: 'website',
      }
    }

    if (pathname.endsWith('/about')) {
      return {
        title: language === 'pt' ? 'Sobre João Paulo Sales Magalhães | Backend & Cloud Engineer' : 'About João Paulo Sales Magalhães | Backend & Cloud Engineer',
        description: text.about.goals,
        type: 'profile',
      }
    }

    return {
      title: 'João Paulo | Backend & Cloud Engineer — Python & AWS',
      description: language === 'pt'
        ? 'Engenheiro de Software focado em sistemas backend, arquitetura cloud, Python e AWS.'
        : 'Software Engineer focused on backend systems, cloud architecture, Python and AWS.',
      type: 'profile',
    }
  }, [language, pathname, project, text])

  const canonicalPath = pathname.replace(/\/$/, '') || `/${language}`
  const canonical = `${SITE_URL}${canonicalPath}/`
  const alternatePath = canonicalPath.replace(/^\/(pt|en)/, language === 'pt' ? '/en' : '/pt')
  const currentHrefLanguage = language === 'pt' ? 'pt-PT' : 'en'
  const alternateLanguage = language === 'pt' ? 'en' : 'pt-PT'

  useEffect(() => {
    document.title = metadata.title
    setMeta('meta[name="description"]', 'name', 'description', metadata.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', metadata.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', metadata.type)
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
    setMeta('meta[property="og:image"]', 'property', 'og:image', socialImage)
    setMeta('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', socialImage)
    setMeta('meta[property="og:image:type"]', 'property', 'og:image:type', project || isHome ? 'image/png' : 'image/jpeg')
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', socialImageAlt)
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', language === 'pt' ? 'pt_PT' : 'en_US')
    setMeta('meta[property="og:locale:alternate"]', 'property', 'og:locale:alternate', language === 'pt' ? 'en_US' : 'pt_PT')
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', socialImage)
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', socialImageAlt)
    setMeta('meta[name="robots"]', 'name', 'robots', isKnownPage ? ROBOTS_INDEX : ROBOTS_NOINDEX)
    setLink('canonical', canonical)
    setLink('alternate', canonical, currentHrefLanguage)
    setLink('alternate', `${SITE_URL}${alternatePath}/`, alternateLanguage)
    setLink('alternate', `${SITE_URL}${canonicalPath.replace(/^\/(pt|en)/, '/en')}/`, 'x-default')
  }, [alternateLanguage, alternatePath, canonical, canonicalPath, currentHrefLanguage, isHome, isKnownPage, language, metadata, project, socialImage, socialImageAlt])

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'João Paulo Sales Magalhães',
        jobTitle: 'Backend & Cloud Engineer',
        url: `${SITE_URL}/en/`,
        image: DEFAULT_SOCIAL_IMAGE,
        description: 'Backend and Cloud Engineer building production systems with Python, AWS, serverless architectures, APIs, and event-driven integrations.',
        sameAs: [
          'https://github.com/joaosalesdev',
          'https://www.linkedin.com/in/joao-sales-magalhaes/',
        ],
        knowsAbout: ['Backend Engineering', 'Cloud Engineering', 'Python', 'FastAPI', 'Amazon Web Services', 'Serverless Architecture', 'Cloud Native', 'Event-Driven Architecture', 'Distributed Systems', 'REST APIs', 'Microservices', 'Docker', 'CI/CD'],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'João Paulo Sales Magalhães — Backend & Cloud Engineering Portfolio',
        url: `${SITE_URL}/en/`,
        inLanguage: ['en', 'pt'],
        author: { '@id': PERSON_ID },
      },
      ...(pathname.endsWith('/about') ? [{
        '@type': 'ProfilePage',
        '@id': `${canonical}#webpage`,
        name: metadata.title,
        description: metadata.description,
        url: canonical,
        inLanguage: language === 'pt' ? 'pt-PT' : 'en',
        mainEntity: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
      }] : []),
      ...(project ? [{
        '@type': 'CreativeWork',
        name: project.title,
        description: project.summary,
        image: socialImage,
        url: canonical,
        inLanguage: language === 'pt' ? 'pt-PT' : 'en',
        author: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
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
  }), [canonical, language, metadata.description, metadata.title, pathname, project, socialImage, text.nav.home, text.nav.projects])

  useEffect(() => {
    let script = document.head.querySelector<HTMLScriptElement>('#structured-data')
    if (!script) {
      script = document.createElement('script')
      script.id = 'structured-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData).replaceAll('<', '\\u003c')
  }, [structuredData])

  return null
}
