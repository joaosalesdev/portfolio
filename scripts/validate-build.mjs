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
    ['Open Graph image alt', /<meta property="og:image:alt" content="[^"]{20,}"/],
    ['Open Graph image dimensions', /<meta property="og:image:width" content="1200"[\s\S]*<meta property="og:image:height" content="630"/],
    ['Twitter card', /<meta name="twitter:card" content="summary_large_image"/],
    ['Twitter image alt', /<meta name="twitter:image:alt" content="[^"]{20,}"/],
    ['robots meta', /<meta name="robots" content="index, follow,/],
    ['SVG favicon', /<link rel="icon" type="image\/svg\+xml" href="\/portfolio\/favicon\.svg" sizes="any"/],
    ['ICO favicon', /<link rel="icon" href="\/portfolio\/favicon\.ico" sizes="16x16 32x32 48x48"/],
    ['Apple touch icon', /<link rel="apple-touch-icon" href="\/portfolio\/apple-touch-icon\.png" sizes="180x180"/],
    ['Safari mask icon', /<link rel="mask-icon" href="\/portfolio\/safari-pinned-tab\.svg" color="#0aaec2"/],
    ['web manifest', /<link rel="manifest" href="\/portfolio\/site\.webmanifest"/],
    ['English alternate', /hreflang="en"/],
    ['Portuguese alternate', /hreflang="pt-PT"/],
    ['x-default alternate', /hreflang="x-default"/],
    ['structured data', /application\/ld\+json/],
  ]

  for (const [label, pattern] of checks) {
    if (!pattern.test(html)) errors.push(`${route}: missing or invalid ${label}`)
  }

  const structuredDataCount = (html.match(/id="structured-data"/g) ?? []).length
  if (structuredDataCount !== 1) errors.push(`${route}: expected one structured data block, found ${structuredDataCount}`)
}

for (const asset of [
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'site.webmanifest',
  'favicon.svg',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'maskable-icon-192x192.png',
  'maskable-icon-512x512.png',
  'mstile-150x150.png',
  'safari-pinned-tab.svg',
  'browserconfig.xml',
  'images/social-card.png',
  '404.html',
]) {
  try {
    await access(new URL(asset, outputDirectory))
  } catch {
    errors.push(`Missing build artifact: ${asset}`)
  }
}

const sitemap = await readFile(new URL('sitemap.xml', outputDirectory), 'utf8')
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) errors.push('Sitemap missing xhtml namespace')
for (const language of languages) {
  for (const slug of projectSlugs) {
    const expectedUrl = `https://joaosalesdev.github.io/portfolio/${language}/projects/${slug}/`
    if (!sitemap.includes(expectedUrl)) errors.push(`Sitemap missing ${expectedUrl}`)
  }
}

const robots = await readFile(new URL('robots.txt', outputDirectory), 'utf8')
if (!robots.includes('User-agent: *\nAllow: /')) errors.push('robots.txt does not allow crawling')
if (!robots.includes('Sitemap: https://joaosalesdev.github.io/portfolio/sitemap.xml')) errors.push('robots.txt missing sitemap URL')

const notFound = await readFile(new URL('404.html', outputDirectory), 'utf8')
if (!notFound.includes('name="robots" content="noindex, follow"')) errors.push('404.html missing noindex')

const manifest = JSON.parse(await readFile(new URL('site.webmanifest', outputDirectory), 'utf8'))
for (const requiredIcon of [
  '/portfolio/favicon.svg',
  '/portfolio/android-chrome-192x192.png',
  '/portfolio/android-chrome-512x512.png',
  '/portfolio/maskable-icon-192x192.png',
  '/portfolio/maskable-icon-512x512.png',
]) {
  if (!manifest.icons?.some((icon) => icon.src === requiredIcon)) errors.push(`Manifest missing icon: ${requiredIcon}`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Validated ${routes.length} localized routes and required SEO artifacts.`)
}
