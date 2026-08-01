import { Link } from 'react-router-dom'
import type { Project, SiteContent } from '../types'
import { CaseArchitectureDiagram } from './CaseArchitectureDiagram'

export function ProjectCaseStudy({ project, text }: { project: Project; text: SiteContent }) {
  const introductionSections = [
    { title: text.projects.caseStudy.businessContext, content: project.caseStudy.businessContext },
    { title: text.projects.challenge, content: project.challenge },
  ]

  const detailSections = [
    { title: text.projects.caseStudy.responsibility, content: project.caseStudy.responsibility },
    { title: text.projects.caseStudy.architecture, content: project.caseStudy.architecture },
  ]

  const listSections = [
    { title: text.projects.caseStudy.challenges, items: project.caseStudy.challenges },
    { title: text.projects.caseStudy.decisions, items: project.caseStudy.decisions },
  ]

  return (
    <main className="case-study">
      <section className="case-study-hero section">
        <Link className="back-link" to="/projects">← {text.projects.backToProjects}</Link>
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
          <p className="eyebrow">{text.projects.caseStudy.architectureImage}</p>
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
        <article>
          <h2>{text.projects.caseStudy.results}</h2>
          <div className="case-result-summary">
            <p>{project.caseStudy.result}</p>
            <ul>
              {project.caseStudy.resultBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="case-skills section">
        <div className="case-section-heading">
          <p className="eyebrow">{text.projects.caseStudy.skills}</p>
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
