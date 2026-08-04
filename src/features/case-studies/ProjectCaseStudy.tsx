import type { Project, SiteContent } from '../../types'
import { CaseBreadcrumbs } from './CaseBreadcrumbs'
import { ProcessAutomationCaseStudy } from './automation/ProcessAutomationCaseStudy'
import { ItalianLearningCaseStudy } from './italian-learning/ItalianLearningCaseStudy'
import { MelitaCaseStudy } from './melita/MelitaCaseStudy'
import { CaseArchitectureDiagram } from './salesforce/CaseArchitectureDiagram'
import { ConfidentialityNotice } from './ConfidentialityNotice'

export function ProjectCaseStudy({ project, text }: { project: Project; text: SiteContent }) {
  if (project.slug === 'melita-ai-agent') {
    return <MelitaCaseStudy project={project} text={text} />
  }

  if (project.slug === 'process-automation-platform') {
    return <ProcessAutomationCaseStudy project={project} text={text} />
  }

  if (project.slug === 'italian-learning-saas') {
    return <ItalianLearningCaseStudy project={project} text={text} />
  }

  return <DefaultCaseStudy project={project} text={text} />
}

function DefaultCaseStudy({ project, text }: { project: Project; text: SiteContent }) {
  const hasStructuredProductionImpact = Boolean(
    project.caseStudy.productionImpactBefore && project.caseStudy.productionImpactAfter,
  )
  const introductionSections = [
    { title: text.projects.caseStudy.businessContext, content: project.caseStudy.businessContext },
    { title: text.projects.challenge, content: project.challenge },
  ]

  const detailSections = [
    { title: text.projects.caseStudy.responsibility, content: project.caseStudy.responsibility },
    { title: text.projects.caseStudy.solutionOperation, content: project.caseStudy.solutionOperation },
  ]

  const listSections = [
    { title: text.projects.caseStudy.challenges, items: project.caseStudy.challenges },
    { title: text.projects.caseStudy.decisions, items: project.caseStudy.decisions },
  ]

  return (
    <main className="case-study" id="main-content" tabIndex={-1}>
      <section className="case-study-hero section">
        <CaseBreadcrumbs project={project} text={text} />
        <p className="eyebrow">{text.projects.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className="hero-description">{project.summary}</p>
      </section>

      <section className="case-sections section">
        {introductionSections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </article>
        ))}
      </section>

      <section className="case-architecture section">
        <div className="case-section-heading">
          <p className="eyebrow">{text.projects.caseStudy.systemOverview}</p>
          <h2>{text.projects.caseStudy.architecture}</h2>
        </div>
        <CaseArchitectureDiagram project={project} />
      </section>

      <section className="case-sections section">
        {detailSections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </article>
        ))}
      </section>

      <section className="case-technologies section">
        <p className="eyebrow">{text.projects.stack}</p>
        <ul aria-label={text.projects.stack}>
          {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </section>

      <section className="case-sections section">
        <article>
          <h2>{text.projects.caseStudy.requestFlow}</h2>
          <ol className="case-detail-list">
            {project.caseStudy.requestFlow.map((step, index) => (
              <li key={`${step.name}-${index}`}>
                <strong>{step.name}</strong> — {step.description}
              </li>
            ))}
          </ol>
        </article>
        {listSections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <ul className="case-detail-list">
              {section.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
        {hasStructuredProductionImpact ? (
          <article>
            <h2>{text.projects.caseStudy.structuredProductionImpact}</h2>
            <div className="case-result-summary">
              <h3>{text.projects.caseStudy.beforeImplementation}</h3>
              <p>{project.caseStudy.productionImpactBefore}</p>
              <h3>{text.projects.caseStudy.afterImplementation}</h3>
              <p>{project.caseStudy.productionImpactAfter}</p>
              <h3>{text.projects.caseStudy.benefitsObtained}</h3>
              <ul>
                {project.caseStudy.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </article>
        ) : project.caseStudy.productionImpact && (
          <article>
            <h2>{text.projects.caseStudy.productionImpact}</h2>
            <ul className="case-detail-list">
              {project.caseStudy.productionImpact.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        )}
        {!hasStructuredProductionImpact && (
          <article>
            <h2>{text.projects.caseStudy.results}</h2>
            <div className="case-result-summary">
              <p>{project.caseStudy.outcome}</p>
              <ul>
                {project.caseStudy.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </article>
        )}
      </section>

      {project.caseStudy.confidentialityNotice && (
        <ConfidentialityNotice notice={project.caseStudy.confidentialityNotice} text={text} />
      )}

      <section className="case-skills section">
        <div className="case-section-heading">
          <h2>{text.projects.caseStudy.skills}</h2>
        </div>
        <ul>
          {project.caseStudy.skills.map((skill, index) => (
            <li key={skill}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{skill}</strong>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
