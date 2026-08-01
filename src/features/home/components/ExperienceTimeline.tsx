import type { Experience } from '../../../types'

export function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[]
}) {
  return (
    <ol className="experience-timeline">
      {experiences.map((experience, index) => (
        <li key={`${experience.role}-${index}`}>
          <span className="timeline-marker" aria-hidden="true" />
          <div className="timeline-heading">
            <div>
              <h3>{experience.role}</h3>
              <p>{experience.company}</p>
            </div>
            <time>{experience.period}</time>
          </div>
          <p>{experience.summary}</p>
        </li>
      ))}
    </ol>
  )
}
