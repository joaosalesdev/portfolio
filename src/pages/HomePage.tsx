import { Link } from 'react-router-dom'
import { ContactSection } from '../components/ContactSection'
import { ExperienceTimeline } from '../components/ExperienceTimeline'
import { Hero } from '../components/Hero'
import { ProjectCard } from '../components/ProjectCard'
import { SpecialtyCard } from '../components/SpecialtyCard'
import type { SiteContent } from '../types'

export function HomePage({ text }: { text: SiteContent }) {
  return (
    <main>
      <Hero text={text} />
      <section className="section">
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
      <section className="section featured-projects">
        <div className="section-heading heading-with-action">
          <div>
            <p className="eyebrow">{text.home.featuredLabel}</p>
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
      <section className="section experience-section">
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
