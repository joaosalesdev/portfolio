import type { Project } from '../../../types'

export function WebApplicationArchitecture({
  project,
  externalServicesLabel,
}: {
  project: Project
  externalServicesLabel: string
}) {
  return (
    <div className="web-application-architecture" role="img" aria-label={project.imageAlt}>
      <div className="case-diagram-grid" aria-hidden="true" />
      <ol className="web-architecture-main-flow">
        {project.caseStudy.requestFlow.map((step, index) => (
          <li key={`${step.name}-${index}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.name}</strong>
            {step.technologies?.length ? (
              <small className="web-architecture-technologies">{step.technologies.join(' • ')}</small>
            ) : null}
            <small>{step.description}</small>
          </li>
        ))}
      </ol>
      {project.caseStudy.externalServices?.length ? (
        <div className="web-external-services">
          <p>{externalServicesLabel}</p>
          <ul>
            {project.caseStudy.externalServices.map((service) => (
              <li key={service.name}>
                <strong>{service.name}</strong>
                {service.technologies?.length ? (
                  <small className="web-architecture-technologies">{service.technologies.join(' • ')}</small>
                ) : null}
                <small>{service.description}</small>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
