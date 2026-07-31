import { Link } from 'react-router-dom'
import type { Project } from '../types'
import { ImagePlaceholder } from './ImagePlaceholder'

type ProjectCardProps = {
  project: Project
  actionLabel: string
  fallbackText: string
}

export function ProjectCard({
  project,
  actionLabel,
  fallbackText,
}: ProjectCardProps) {
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
            {project.caseStudy.requestFlow.slice(0, 4).map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      )}
      <div className="project-card-body">
        <div className="project-card-heading">
          <span className="project-number">{project.number}</span>
          <h3>{project.title}</h3>
        </div>
        <p>{project.summary}</p>
        <ul aria-label="Technologies">
          {project.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <Link className="card-link" to={`/projects/${project.slug}`}>
          {actionLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
