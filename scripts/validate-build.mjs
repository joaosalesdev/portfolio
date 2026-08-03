import { access, readFile } from 'node:fs/promises'

const outputDirectory = new URL('../dist/', import.meta.url)
const languages = ['en', 'pt']
const projectSlugs = [
  'salesforce-serverless-integration',
  'melita-ai-agent',
  'process-automation-platform',
  'italian-learning-saas',
]

const routes = languages.flatMap((language) => [
  `${language}/index.html`,
  `${language}/about/index.html`,
  `${language}/projects/index.html`,
  ...projectSlugs.map((slug) => `${language}/projects/${slug}/index.html`),
])

const errors = []

for (const route of routes) {
  const html = await readFile(new URL(route, outputDirectory), 'utf8')
  const checks = [
    ['title', /<title>[^<]{10,}<\/title>/],
    ['description', /<meta name="description" content="[^"]{50,}"/],
    ['canonical', /<link rel="canonical" href="https:\/\/joaosalesdev\.github\.io\/portfolio\/[^"]+"/],
    ['Open Graph image', /<meta property="og:image" content="https:\/\//],
    ['Twitter card', /<meta name="twitter:card" content="summary_large_image"/],
    ['English alternate', /hreflang="en"/],
    ['Portuguese alternate', /hreflang="pt"/],
    ['x-default alternate', /hreflang="x-default"/],
    ['structured data', /application\/ld\+json/],
  ]

  for (const [label, pattern] of checks) {
    if (!pattern.test(html)) errors.push(`${route}: missing or invalid ${label}`)
  }
}

for (const asset of ['robots.txt', 'sitemap.xml', 'site.webmanifest', 'images/og-architecture.png', '404.html']) {
  try {
    await access(new URL(asset, outputDirectory))
  } catch {
    errors.push(`Missing build artifact: ${asset}`)
  }
}

const sitemap = await readFile(new URL('sitemap.xml', outputDirectory), 'utf8')
for (const language of languages) {
  for (const slug of projectSlugs) {
    const expectedUrl = `https://joaosalesdev.github.io/portfolio/${language}/projects/${slug}/`
    if (!sitemap.includes(expectedUrl)) errors.push(`Sitemap missing ${expectedUrl}`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Validated ${routes.length} localized routes and required SEO artifacts.`)
}
