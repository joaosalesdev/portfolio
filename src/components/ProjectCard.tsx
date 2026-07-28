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
      <ImagePlaceholder
        src={project.image}
        alt={project.imageAlt}
        fallbackText={fallbackText}
      />
      <div className="project-card-body">
        <span className="project-number">{project.number}</span>
        <h3>{project.title}</h3>
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
