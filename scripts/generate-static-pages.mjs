import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteUrl = 'https://joaosalesdev.github.io/portfolio'
const socialImage = `${siteUrl}/images/og-architecture.png?v=20260806`
const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`
const outputDirectory = new URL('../dist/', import.meta.url)
const outputPath = fileURLToPath(outputDirectory)
const template = await readFile(new URL('index.html', outputDirectory), 'utf8')

const shared = {
  en: {
    home: { title: 'João Paulo Sales Magalhães | Backend & Cloud Engineer', description: 'Backend and Cloud Engineer building production systems with Python, AWS, serverless architectures, APIs and event-driven integrations.' },
    about: { title: 'About João Paulo Sales Magalhães | Backend & Cloud Engineer', description: 'Backend and Cloud Engineer experienced in Python, AWS, serverless systems, distributed architectures and production software.' },
    projects: { title: 'Backend & Cloud Projects | João Paulo Sales Magalhães', description: 'Production case studies covering Python, AWS, serverless automation, APIs, distributed workflows and system integrations.' },
  },
  pt: {
    home: { title: 'João Paulo Sales Magalhães | Backend & Cloud Engineer', description: 'Engenheiro Backend e Cloud desenvolvendo sistemas em produção com Python, AWS, arquiteturas serverless, APIs e integrações orientadas a eventos.' },
    about: { title: 'Sobre João Paulo Sales Magalhães | Backend & Cloud Engineer', description: 'Engenheiro Backend e Cloud com experiência em Python, AWS, sistemas serverless, arquiteturas distribuídas e software em produção.' },
    projects: { title: 'Projetos Backend & Cloud | João Paulo Sales Magalhães', description: 'Estudos de caso em produção sobre Python, AWS, automação serverless, APIs, workflows distribuídos e integrações.' },
  },
}

const projects = {
  en: [
    ['salesforce-serverless-integration', 'Salesforce Integration', 'Distributed integration between Salesforce and AWS services using a serverless, event-driven architecture.'],
    ['melita-ai-agent', 'Melita AI Agent', 'Serverless AI assistant built with Python and AWS Lambda for message processing, conversational automation and LinkedIn content generation.'],
    ['business-process-automations', 'Business Process Automations with Python and AWS', 'Independent production automations built with Python and AWS to integrate systems, process data, and replace repetitive operational tasks.'],
    ['italian-learning-saas', 'Italian Learning SaaS Platform', 'Production SaaS platform centralizing academic management, payments, online learning and AI-powered features.'],
  ],
  pt: [
    ['salesforce-serverless-integration', 'Integração Salesforce', 'Integração distribuída entre Salesforce e serviços AWS utilizando arquitetura serverless e orientada a eventos.'],
    ['melita-ai-agent', 'Melita AI Agent', 'Assistente de IA serverless desenvolvido em Python e AWS Lambda para processamento de mensagens e automação conversacional.'],
    ['business-process-automations', 'Automações de Processos Empresariais com Python e AWS', 'Automações independentes em produção desenvolvidas com Python e AWS para integrar sistemas, processar dados e eliminar tarefas operacionais repetitivas.'],
    ['italian-learning-saas', 'Plataforma SaaS de Ensino de Italiano', 'Plataforma SaaS em produção centralizando gestão académica, pagamentos, aprendizagem online e recursos de IA.'],
  ],
}

const pages = []
for (const language of ['en', 'pt']) {
  pages.push({ language, path: `/${language}/`, ...shared[language].home, type: 'profile' })
  pages.push({ language, path: `/${language}/about/`, ...shared[language].about, type: 'profile' })
  pages.push({ language, path: `/${language}/projects/`, ...shared[language].projects, type: 'website' })
  for (const [slug, title, description] of projects[language]) {
    pages.push({ language, path: `/${language}/projects/${slug}/`, title: `${title} | João Paulo Sales Magalhães`, description, type: 'article', projectTitle: title })
  }
}

const redirects = ['en', 'pt'].map((language) => ({
  language,
  from: `/${language}/projects/process-automation-platform/`,
  to: `/${language}/projects/business-process-automations/`,
}))

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function render(page) {
  const canonical = `${siteUrl}${page.path}`
  const pageSocialImage = page.projectTitle ? `${siteUrl}/images/case-studies/${page.path.match(/\/projects\/([^/]+)\//)?.[1]}.png` : socialImage
  const pageSocialImageAlt = page.projectTitle
    ? `${page.projectTitle} case study architecture cover`
    : page.language === 'pt'
      ? 'João Paulo Sales Magalhães, Engenheiro Backend e Cloud especializado em Python, AWS e sistemas serverless'
      : 'João Paulo Sales Magalhães, Backend and Cloud Engineer specializing in Python, AWS and serverless systems'
  const alternatePath = page.path.replace(/^\/(en|pt)\//, page.language === 'en' ? '/pt/' : '/en/')
  const xDefaultPath = page.path.replace(/^\/(en|pt)\//, '/en/')
  const graph = [
    { '@type': 'Person', '@id': personId, name: 'João Paulo Sales Magalhães', jobTitle: 'Backend & Cloud Engineer', url: `${siteUrl}/en/`, image: socialImage, description: 'Backend and Cloud Engineer building production systems with Python, AWS, serverless architectures, APIs, and event-driven integrations.', sameAs: ['https://github.com/joaosalesdev', 'https://www.linkedin.com/in/joao-sales-magalhaes/'], knowsAbout: ['Backend Engineering', 'Cloud Engineering', 'Python', 'FastAPI', 'Amazon Web Services', 'Serverless Architecture', 'Cloud Native', 'Event-Driven Architecture', 'Distributed Systems', 'REST APIs', 'Microservices', 'Docker', 'CI/CD'] },
    { '@type': 'WebSite', '@id': websiteId, name: 'João Paulo Sales Magalhães — Backend & Cloud Engineering Portfolio', url: `${siteUrl}/en/`, inLanguage: ['en', 'pt-PT'], author: { '@id': personId } },
  ]
  if (page.path.endsWith('/about/')) {
    graph.push({ '@type': 'ProfilePage', '@id': `${canonical}#webpage`, name: page.title, description: page.description, url: canonical, inLanguage: page.language === 'pt' ? 'pt-PT' : 'en', mainEntity: { '@id': personId }, isPartOf: { '@id': websiteId } })
  }
  if (page.projectTitle) {
    graph.push(
      { '@type': 'CreativeWork', name: page.projectTitle, description: page.description, image: pageSocialImage, url: canonical, inLanguage: page.language === 'pt' ? 'pt-PT' : 'en', author: { '@id': personId }, isPartOf: { '@id': websiteId } },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: page.language === 'pt' ? 'Home' : 'Home', item: `${siteUrl}/${page.language}/` },
          { '@type': 'ListItem', position: 2, name: page.language === 'pt' ? 'Projetos' : 'Projects', item: `${siteUrl}/${page.language}/projects/` },
          { '@type': 'ListItem', position: 3, name: page.projectTitle, item: canonical },
        ],
      },
    )
  }

  return template
    .replace(/<html lang="[^"]+">/, `<html lang="${page.language}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/>/, `<meta property="og:type" content="${page.type}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${pageSocialImage}" />`)
    .replace(/<meta property="og:image:secure_url" content="[^"]*"\s*\/>/, `<meta property="og:image:secure_url" content="${pageSocialImage}" />`)
    .replace(/<meta property="og:image:type" content="[^"]*"\s*\/>/, '<meta property="og:image:type" content="image/png" />')
    .replace(/<meta property="og:image:alt" content="[^"]*"\s*\/>/, `<meta property="og:image:alt" content="${escapeHtml(pageSocialImageAlt)}" />`)
    .replace(/<meta property="og:locale" content="[^"]*"\s*\/>/, `<meta property="og:locale" content="${page.language === 'pt' ? 'pt_PT' : 'en_US'}" />`)
    .replace(/<meta property="og:locale:alternate" content="[^"]*"\s*\/>/, `<meta property="og:locale:alternate" content="${page.language === 'pt' ? 'en_US' : 'pt_PT'}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${pageSocialImage}" />`)
    .replace(/<meta name="twitter:image:alt" content="[^"]*"\s*\/>/, `<meta name="twitter:image:alt" content="${escapeHtml(pageSocialImageAlt)}" />`)
    .replace('</head>', `    <link rel="alternate" hreflang="${page.language === 'pt' ? 'pt-PT' : 'en'}" href="${canonical}" />\n    <link rel="alternate" hreflang="${page.language === 'en' ? 'pt-PT' : 'en'}" href="${siteUrl}${alternatePath}" />\n    <link rel="alternate" hreflang="x-default" href="${siteUrl}${xDefaultPath}" />\n    <script id="structured-data" type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script>\n  </head>`)
}

for (const page of pages) {
  const destination = join(outputPath, page.path.slice(1), 'index.html')
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, render(page))
}

for (const redirect of redirects) {
  const destination = join(outputPath, redirect.from.slice(1), 'index.html')
  const target = `${siteUrl}${redirect.to}`
  const redirectHtml = `<!doctype html>
<html lang="${redirect.language}">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
    <title>${redirect.language === 'pt' ? 'Redirecionando para Automações de Processos Empresariais' : 'Redirecting to Business Process Automations'}</title>
    <script>window.location.replace(${JSON.stringify(target)})</script>
  </head>
  <body>
    <p><a href="${target}">${redirect.language === 'pt' ? 'Acessar a nova página do estudo de caso' : 'Open the new case study page'}</a></p>
  </body>
</html>
`
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, redirectHtml)
}

await writeFile(new URL('404.html', outputDirectory), template.replace(/<meta name="robots" content="[^"]*"\s*\/>/, '<meta name="robots" content="noindex, follow" />'))
await writeFile(new URL('robots.txt', outputDirectory), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
await writeFile(new URL('sitemap.xml', outputDirectory), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((page) => {
  const englishPath = page.path.replace(/^\/(en|pt)\//, '/en/')
  const portuguesePath = page.path.replace(/^\/(en|pt)\//, '/pt/')
  return `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${englishPath}" />
    <xhtml:link rel="alternate" hreflang="pt-PT" href="${siteUrl}${portuguesePath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${englishPath}" />
  </url>`
}).join('\n')}
</urlset>
`)
