import { Link } from 'react-router-dom'
import type { SiteContent } from '../../../types'
import { useLocalizedPath } from '../../../i18n/LanguageContext'
import { ArchitectureVisual } from './ArchitectureVisual'

export function Hero({ text }: { text: SiteContent }) {
  const localizedPath = useLocalizedPath()

  return (
    <section className="hero section">
      <div className="hero-copy">
        <p className="eyebrow">{text.home.eyebrow}</p>
        <h1>{text.home.title}</h1>
        <p className="hero-description">{text.home.description}</p>
        <div className="hero-actions">
          <Link className="button primary" to={localizedPath('projects')}>
            <span>{text.home.primaryAction}</span>
            <span className="button-arrow" aria-hidden="true">→</span>
          </Link>
          <a className="button secondary" href="#contact">
            <span>{text.home.secondaryAction}</span>
            <span className="button-arrow" aria-hidden="true">↓</span>
          </a>
        </div>
        <ul className="hero-highlights" aria-label={text.common.professionalHighlights}>
          {text.home.heroHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
      <ArchitectureVisual label={text.common.architectureLabel} />
      <a className="scroll-indicator" href="#specialties" aria-label={text.common.exploreMore}>
        <span>{text.common.explore}</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}
