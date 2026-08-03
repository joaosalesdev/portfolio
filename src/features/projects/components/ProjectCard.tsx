import { Link } from 'react-router-dom'
import type { Project } from '../../../types'
import { useLocalizedPath } from '../../../i18n/LanguageContext'
import { ImagePlaceholder } from './ImagePlaceholder'

type ProjectCardProps = {
  project: Project
  actionLabel: string
  fallbackText: string
  technologiesLabel: string
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({
  project,
  actionLabel,
  fallbackText,
  technologiesLabel,
  headingLevel = 'h3',
}: ProjectCardProps) {
  const localizedPath = useLocalizedPath()
  const Heading = headingLevel

  return (
    <article className="project-card">
      {project.image ? (
        <ImagePlaceholder
          src={project.image}
          alt={project.imageAlt}
          fallbackText={fallbackText}
        />
      ) : (
        <div className="project-media project-flow-preview" role="img" aria-label={project.imageAlt}>
          <div className="project-flow-grid" aria-hidden="true" />
          <ol>
            {project.caseStudy.requestFlow.map((step, index) => (
              <li key={`${step.name}-${index}`}>
                <strong>{step.name}</strong>
              </li>
            ))}
          </ol>
        </div>
      )}
      <div className="project-card-body">
        <Heading>{project.title}</Heading>
        <p>{project.summary}</p>
        <ul aria-label={technologiesLabel}>
          {project.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <Link className="card-link" to={localizedPath(`projects/${project.slug}`)}>
          {actionLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
