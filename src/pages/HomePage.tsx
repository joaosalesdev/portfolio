import { Link } from 'react-router-dom'
import { ContactSection } from '../features/home/components/ContactSection'
import { ExperienceTimeline } from '../features/home/components/ExperienceTimeline'
import { Hero } from '../features/home/components/Hero'
import { SpecialtyCard } from '../features/home/components/SpecialtyCard'
import { ProjectCard } from '../features/projects/components/ProjectCard'
import type { SiteContent } from '../types'

export function HomePage({ text }: { text: SiteContent }) {
  return (
    <main className="home-page">
      <Hero text={text} />
      <section className="section home-section specialties-section" id="specialties">
        <div className="section-heading">
          <p className="eyebrow">{text.home.specialtiesLabel}</p>
          <h2>{text.home.specialtiesTitle}</h2>
        </div>
        <div className="specialties-grid">
          {text.home.specialties.map((specialty, index) => (
            <SpecialtyCard specialty={specialty} index={index} key={specialty.title} />
          ))}
        </div>
      </section>
      <section className="section home-section featured-projects">
        <div className="section-heading heading-with-action">
          <div>
            <p className="eyebrow">{text.home.featuredLabel}</p>
            <p className="projects-caption">
              Experiências reais em produção, documentadas como estudos de caso.
            </p>
            <h2>{text.home.featuredTitle}</h2>
          </div>
          <Link className="text-link" to="/projects">{text.common.featuredLink} →</Link>
        </div>
        <div className="projects-grid">
          {text.projects.items.slice(0, 4).map((project) => (
            <ProjectCard
              project={project}
              actionLabel={text.projects.viewProject}
              fallbackText={text.common.imageUnavailable}
              key={project.slug}
            />
          ))}
        </div>
      </section>
      <section className="section home-section experience-section">
        <div className="experience-intro">
          <p className="eyebrow">{text.home.experienceLabel}</p>
          <h2>{text.home.experienceTitle}</h2>
          <p>{text.home.experience}</p>
        </div>
        <ExperienceTimeline experiences={text.experience} />
      </section>
      <ContactSection text={text} />
    </main>
  )
}
