import type { Project } from '../../../types'

export function AutomationWorkflow({ project, recoveryLabel }: { project: Project; recoveryLabel: string }) {
  return (
    <div className="automation-workflow" role="img" aria-label={project.imageAlt}>
      <div className="case-diagram-grid" aria-hidden="true" />
      <ol className="automation-main-flow">
        {project.caseStudy.requestFlow.map((step, index) => (
          <li key={`${step.name}-${index}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.name}</strong>
            <small>{step.description}</small>
          </li>
        ))}
      </ol>
      {project.caseStudy.recoveryFlow?.length ? (
        <div className="automation-recovery-flow">
          <p>{recoveryLabel}</p>
          <ol>
            {project.caseStudy.recoveryFlow.map((step, index) => (
              <li key={`${step.name}-${index}`}>
                <strong>{step.name}</strong>
                <small>{step.description}</small>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  )
}
