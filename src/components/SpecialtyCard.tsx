import type { Specialty } from '../types'

export function SpecialtyCard({
  specialty,
  index,
}: {
  specialty: Specialty
  index: number
}) {
  return (
    <article className="specialty-card">
      <div className={`specialty-icon icon-${specialty.icon}`} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="card-number">0{index + 1}</span>
      <h3>{specialty.title}</h3>
      <p>{specialty.description}</p>
    </article>
  )
}
