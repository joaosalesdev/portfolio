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
            {text.home.primaryAction}
          </Link>
          <a className="button secondary" href="#contact">
            {text.home.secondaryAction}
          </a>
        </div>
      </div>
      <ArchitectureVisual />
    </section>
  )
}
