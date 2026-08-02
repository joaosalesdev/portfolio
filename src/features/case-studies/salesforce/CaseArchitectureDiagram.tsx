import type { Project } from '../../../types'

export function CaseArchitectureDiagram({ project }: { project: Project }) {
  const supportingNodes = project.caseStudy.supportingNodes

  return (
    <div
      className={`case-architecture-diagram${supportingNodes?.length ? ' has-supporting-nodes' : ''}`}
      role="img"
      aria-label={project.imageAlt}
    >
      <div className="case-diagram-grid" aria-hidden="true" />
      <ol>
        {project.caseStudy.requestFlow.map((step, index) => (
          <li key={`${step.name}-${index}`}>
            <strong>{step.name}</strong>
          </li>
        ))}
      </ol>
      {supportingNodes?.length ? (
        <ul className="case-diagram-supporting-nodes">
          {supportingNodes.map((node) => (
            <li className={`supporting-node-${node.type}`} key={node.name}>
              <strong>{node.name}</strong>
              <small>{node.detail}</small>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
