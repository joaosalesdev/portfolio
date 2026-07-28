import { ProjectCard } from '../components/ProjectCard'
import type { SiteContent } from '../types'

export function ProjectsPage({ text }: { text: SiteContent }) {
  return (
    <main>
      <section className="page-hero section">
        <p className="eyebrow">{text.projects.eyebrow}</p>
        <h1>{text.projects.title}</h1>
        <p className="hero-description">{text.projects.description}</p>
      </section>
      <section className="section projects-page-grid">
        <div className="projects-grid">
          {text.projects.items.map((project) => (
            <ProjectCard
              project={project}
              actionLabel={text.projects.viewProject}
              fallbackText={text.common.imageUnavailable}
              key={project.slug}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
