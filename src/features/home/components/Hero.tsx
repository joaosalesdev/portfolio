import { Link } from 'react-router-dom'
import type { SiteContent } from '../../../types'
import { ArchitectureVisual } from './ArchitectureVisual'

export function Hero({ text }: { text: SiteContent }) {
  return (
    <section className="hero section">
      <div className="hero-copy">
        <p className="eyebrow">{text.home.eyebrow}</p>
        <h1>{text.home.title}</h1>
        <p className="hero-description">{text.home.description}</p>
        <div className="hero-actions">
          <Link className="button primary" to="/projects">
            <span>{text.home.primaryAction}</span>
            <span className="button-arrow" aria-hidden="true">→</span>
          </Link>
          <a className="button secondary" href="#contact">
            <span>{text.home.secondaryAction}</span>
            <span className="button-arrow" aria-hidden="true">↓</span>
          </a>
        </div>
        <ul className="hero-highlights" aria-label="Professional highlights">
          {text.home.heroHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
      <ArchitectureVisual />
      <a className="scroll-indicator" href="#specialties" aria-label="Explore more content">
        <span>Explore</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}
