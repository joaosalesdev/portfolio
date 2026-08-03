import { ProjectCard } from '../features/projects/components/ProjectCard'
import { ProjectsEvolutionMap } from '../features/projects/components/ProjectsEvolutionMap'
import type { SiteContent } from '../types'

export function ProjectsPage({ text }: { text: SiteContent }) {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero projects-hero section">
        <div className="projects-hero-copy">
          <p className="eyebrow">{text.projects.eyebrow}</p>
          <p className="projects-caption">{text.common.projectsCaption}</p>
          <h1>{text.projects.title}</h1>
          <p className="hero-description">{text.projects.description}</p>
        </div>
        <ProjectsEvolutionMap text={text} />
      </section>
      <section className="section projects-page-grid">
        <div className="projects-grid">
          {text.projects.items.map((project) => (
            <ProjectCard
              project={project}
              actionLabel={text.projects.viewProject}
              fallbackText={text.common.imageUnavailable}
              technologiesLabel={text.common.technologies}
              headingLevel="h2"
              key={project.slug}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
