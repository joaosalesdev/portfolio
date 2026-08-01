import type { Project } from '../types'

export function AiAgentPipeline({ project }: { project: Project }) {
  return (
    <div className="ai-agent-pipeline" role="img" aria-label={project.imageAlt}>
      <div className="case-diagram-grid" aria-hidden="true" />
      <ol>
        {project.caseStudy.requestFlow.map((step, index) => (
          <li className={`ai-pipeline-step ai-pipeline-step-${index + 1}`} key={`${step.name}-${index}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.name}</strong>
            <small>{step.description}</small>
          </li>
        ))}
      </ol>
    </div>
  )
}
