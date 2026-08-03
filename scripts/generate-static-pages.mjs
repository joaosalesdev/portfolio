import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteUrl = 'https://joaosalesdev.github.io/portfolio'
const outputDirectory = new URL('../dist/', import.meta.url)
const outputPath = fileURLToPath(outputDirectory)
const template = await readFile(new URL('index.html', outputDirectory), 'utf8')

const shared = {
  en: {
    home: { title: 'João Paulo | Backend & Cloud Engineer — Python & AWS', description: 'Software Engineer focused on backend systems, cloud architecture, Python and AWS. Production projects documented as technical case studies.' },
    about: { title: 'About | João Paulo — Backend & Cloud Engineer', description: 'Professional journey, engineering principles and goals focused on backend systems, distributed architectures and cloud computing.' },
    projects: { title: 'Software Engineering Projects | João Paulo', description: 'Backend, cloud, automation and integration projects developed from real business challenges and documented as technical case studies.' },
  },
  pt: {
    home: { title: 'João Paulo | Backend & Cloud Engineer — Python & AWS', description: 'Software Engineer especializado em sistemas backend, cloud, Python e AWS. Projetos reais documentados como estudos de caso técnicos.' },
    about: { title: 'Sobre | João Paulo — Backend & Cloud Engineer', description: 'Trajetória profissional, princípios de engenharia e objetivos focados em sistemas backend, arquiteturas distribuídas e cloud.' },
    projects: { title: 'Projetos de Engenharia de Software | João Paulo', description: 'Projetos de backend, cloud, automação e integração desenvolvidos a partir de desafios reais e documentados como estudos de caso.' },
  },
}

const projects = {
  en: [
    ['salesforce-serverless-integration', 'Salesforce Integration', 'Distributed integration between Salesforce and AWS services using a serverless, event-driven architecture.'],
    ['melita-ai-agent', 'Melita AI Agent', 'Serverless AI assistant built with Python and AWS Lambda for message processing, conversational automation and LinkedIn content generation.'],
    ['process-automation-platform', 'Process Automation Platform', 'Process automation platform built with Python and AWS to integrate systems, process data and execute distributed workflows.'],
    ['italian-learning-saas', 'Italian Learning SaaS Platform', 'Production SaaS platform centralizing academic management, payments, online learning and AI-powered features.'],
  ],
  pt: [
    ['salesforce-serverless-integration', 'Integração Salesforce', 'Integração distribuída entre Salesforce e serviços AWS utilizando arquitetura serverless e orientada a eventos.'],
    ['melita-ai-agent', 'Melita AI Agent', 'Assistente de IA serverless desenvolvido em Python e AWS Lambda para processamento de mensagens e automação conversacional.'],
    ['process-automation-platform', 'Plataforma de Automação de Processos', 'Plataforma desenvolvida em Python e AWS para integrar sistemas, processar dados e executar workflows distribuídos.'],
    ['italian-learning-saas', 'Plataforma SaaS de Ensino de Italiano', 'Plataforma SaaS em produção centralizando gestão académica, pagamentos, aprendizagem online e recursos de IA.'],
  ],
}

const pages = []
for (const language of ['en', 'pt']) {
  pages.push({ language, path: `/${language}/`, ...shared[language].home, type: 'website' })
  pages.push({ language, path: `/${language}/about/`, ...shared[language].about, type: 'profile' })
  pages.push({ language, path: `/${language}/projects/`, ...shared[language].projects, type: 'website' })
  for (const [slug, title, description] of projects[language]) {
    pages.push({ language, path: `/${language}/projects/${slug}/`, title: `${title} | João Paulo`, description, type: 'article', projectTitle: title })
  }
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function render(page) {
  const canonical = `${siteUrl}${page.path}`
  const alternatePath = page.path.replace(/^\/(en|pt)\//, page.language === 'en' ? '/pt/' : '/en/')
  const xDefaultPath = page.path.replace(/^\/(en|pt)\//, '/en/')
  const graph = [
    { '@type': 'Person', '@id': `${siteUrl}/#person`, name: 'João Paulo', jobTitle: 'Software Engineer | Backend & Cloud', url: `${siteUrl}/en/`, sameAs: ['https://github.com/joaosalesdev', 'https://www.linkedin.com/in/joao-sales-magalhaes/'], knowsAbout: ['Backend Engineering', 'Cloud Computing', 'Python', 'AWS', 'Distributed Systems'] },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'João Paulo — Software Engineering Portfolio', url: `${siteUrl}/en/`, inLanguage: ['en', 'pt'], author: { '@id': `${siteUrl}/#person` } },
  ]
  if (page.projectTitle) {
    graph.push(
      { '@type': 'CreativeWork', name: page.projectTitle, description: page.description, url: canonical, inLanguage: page.language, author: { '@id': `${siteUrl}/#person` } },
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
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`)
    .replace('</head>', `    <link rel="alternate" hreflang="${page.language}" href="${canonical}" />\n    <link rel="alternate" hreflang="${page.language === 'en' ? 'pt' : 'en'}" href="${siteUrl}${alternatePath}" />\n    <link rel="alternate" hreflang="x-default" href="${siteUrl}${xDefaultPath}" />\n    <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script>\n  </head>`)
}

for (const page of pages) {
  const destination = join(outputPath, page.path.slice(1), 'index.html')
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, render(page))
}

await writeFile(new URL('404.html', outputDirectory), template)
await writeFile(new URL('robots.txt', outputDirectory), `User-agent: *\nAllow: /portfolio/\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
await writeFile(new URL('sitemap.xml', outputDirectory), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${siteUrl}${page.path}</loc></url>`).join('\n')}\n</urlset>\n`)
