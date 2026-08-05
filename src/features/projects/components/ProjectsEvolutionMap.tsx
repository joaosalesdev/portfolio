import { Link } from 'react-router-dom'
import { useLocalizedPath } from '../../../i18n/LanguageContext'
import type { SiteContent } from '../../../types'

const chronologicalSlugs = [
  'italian-learning-saas',
  'business-process-automations',
  'salesforce-serverless-integration',
  'melita-ai-agent',
]

function ProjectIcon({ slug }: { slug: string }) {
  if (slug === 'italian-learning-saas') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 8h18M7 6h.01M10 6h.01M7 12h4M7 15h7" />
      </svg>
    )
  }

  if (slug === 'business-process-automations') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="12" r="3" />
        <circle cx="17" cy="7" r="2.5" />
        <circle cx="17" cy="17" r="2.5" />
        <path d="M10.7 10.5 14.6 8M10.7 13.5l3.9 2.5" />
      </svg>
    )
  }

  if (slug === 'salesforce-serverless-integration') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.5 14.5 7 17a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0M14.5 9.5 17 7a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0M8.5 15.5l7-7" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l1.35 4.65L18 9l-4.65 1.35L12 15l-1.35-4.65L6 9l4.65-1.35L12 3Z" />
      <path d="m18.5 14 .75 2.25L21.5 17l-2.25.75L18.5 20l-.75-2.25L15.5 17l2.25-.75L18.5 14Z" />
    </svg>
  )
}

export function ProjectsEvolutionMap({ text }: { text: SiteContent }) {
  const localizedPath = useLocalizedPath()
  const projects = chronologicalSlugs
    .map((slug) => text.projects.items.find((project) => project.slug === slug))
    .filter((project) => project !== undefined)

  return (
    <aside className="projects-evolution-map" aria-labelledby="projects-evolution-title">
      <div className="projects-map-heading">
        <p className="eyebrow">{text.projects.evolutionLabel}</p>
        <h2 className="sr-only" id="projects-evolution-title">{text.projects.evolutionTitle}</h2>
      </div>
      <div className="projects-map-visual">
        <span className="projects-map-arrow" aria-hidden="true">↑</span>
        <ol aria-label={text.projects.evolutionTitle}>
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Link to={localizedPath(`projects/${project.slug}`)}>
                <span className="projects-map-number">{String(index + 1).padStart(2, '0')}</span>
                <span className={`projects-map-icon projects-map-icon-${project.slug}`} aria-hidden="true">
                  <ProjectIcon slug={project.slug} />
                </span>
                <strong>{project.title}</strong>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
