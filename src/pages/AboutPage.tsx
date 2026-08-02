import { ContactSection } from '../features/home/components/ContactSection'
import type { SiteContent } from '../types'

function CareerTimelineVisual() {
  return (
    <div className="career-visual" aria-hidden="true">
      <div className="career-axis" />
      <ol className="career-milestones">
        <li><span className="career-glyph glyph-hardware"><i /><i /><i /></span></li>
        <li><span className="career-glyph glyph-web"><i /></span></li>
        <li><span className="career-glyph glyph-fullstack"><i /><i /></span></li>
        <li><span className="career-glyph glyph-backend"><i /><i /><i /></span></li>
        <li><span className="career-glyph glyph-cloud"><i /><i /><i /></span></li>
        <li><span className="career-glyph glyph-distributed"><i /><i /><i /></span></li>
        <li><span className="career-glyph glyph-ai"><i /><i /><i /></span></li>
      </ol>
      <span className="career-origin" />
      <span className="career-present" />
    </div>
  )
}

export function AboutPage({ text }: { text: SiteContent }) {
  return (
    <main className="about-page">
      <section className="section about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">{text.about.eyebrow}</p>
          <h1>{text.about.title}</h1>
        </div>
        <CareerTimelineVisual />
      </section>

      <section className="section about-journey">
        <header className="about-section-intro">
          <p className="eyebrow">{text.about.journeyLabel}</p>
          <h2>{text.about.journeyTitle}</h2>
        </header>
        <ol className="journey-list">
          {text.about.journey.map((paragraph, index) => (
            <li key={paragraph}>
              <span className="journey-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p>{paragraph}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section about-principles">
        <div className="section-heading">
          <p className="eyebrow">{text.about.principlesLabel}</p>
        </div>
        <div className="principles-grid">
          {text.about.principles.map((principle) => (
            <article key={principle}>
              <span className="principle-mark" aria-hidden="true"><i /></span>
              <h3>{principle}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-goals">
        <div className="goals-marker" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="goals-content">
          <p className="eyebrow">{text.about.goalsLabel}</p>
          <h2>{text.about.goalsTitle}</h2>
          <p className="goals-statement">{text.about.goals}</p>
        </div>
      </section>

      <ContactSection text={text} />
    </main>
  )
}
