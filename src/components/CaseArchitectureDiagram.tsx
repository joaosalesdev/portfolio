import type { Project } from '../types'

export function CaseArchitectureDiagram({ project }: { project: Project }) {
  return (
    <div className="case-architecture-diagram" role="img" aria-label={project.imageAlt}>
      <div className="case-diagram-grid" aria-hidden="true" />
      <ol>
        {project.caseStudy.requestFlow.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </div>
  )
}
