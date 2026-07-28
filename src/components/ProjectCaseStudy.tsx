import { Link } from 'react-router-dom'
import type { Project, SiteContent } from '../types'
import { ImagePlaceholder } from './ImagePlaceholder'

export function ProjectCaseStudy({
  project,
  text,
}: {
  project: Project
  text: SiteContent
}) {
  const placeholderSections = [
    text.projects.caseStudy.architecture,
    text.projects.caseStudy.responsibilities,
    text.projects.caseStudy.decisions,
    text.projects.caseStudy.challenges,
    text.projects.caseStudy.results,
  ]

  return (
    <main className="case-study">
      <section className="case-study-hero section">
        <Link className="back-link" to="/projects">← {text.projects.backToProjects}</Link>
        <p className="eyebrow">{project.number} / {text.projects.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className="hero-description">{project.summary}</p>
      </section>
      <section className="case-cover section">
        <ImagePlaceholder
          src={project.image}
          alt={project.imageAlt}
          fallbackText={text.common.imageUnavailable}
          eager
        />
      </section>
      <section className="case-overview section">
        <article>
          <p className="eyebrow">{text.projects.challenge}</p>
          <p>{project.challenge}</p>
        </article>
        <article>
          <p className="eyebrow">{text.projects.solution}</p>
          <p>{project.solution}</p>
        </article>
        <article>
          <p className="eyebrow">{text.projects.stack}</p>
          <p>{project.stack.join(' · ')}</p>
        </article>
      </section>
      <section className="case-sections section">
        {placeholderSections.map((title) => (
          <article key={title}>
            <h2>{title}</h2>
            <p className="placeholder-copy">{text.projects.caseStudy.placeholder}</p>
          </article>
        ))}
      </section>
      <section className="evidence-section section">
        <div className="section-heading">
          <p className="eyebrow">{text.projects.caseStudy.evidence}</p>
        </div>
        <div className="evidence-grid">
          {[1, 2, 3].map((item) => (
            <ImagePlaceholder
              key={item}
              alt={`${project.imageAlt} — ${item}`}
              fallbackText={text.common.imageUnavailable}
            />
          ))}
        </div>
        <div className="external-links">
          <p className="eyebrow">{text.projects.caseStudy.links}</p>
          <p className="placeholder-copy">{text.projects.caseStudy.placeholder}</p>
        </div>
      </section>
    </main>
  )
}
