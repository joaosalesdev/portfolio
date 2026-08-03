import { useEffect, useRef } from 'react'
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
  const pageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sections = pageRef.current?.querySelectorAll<HTMLElement>('[data-about-reveal]')

    if (!sections?.length || !('IntersectionObserver' in window)) {
      sections?.forEach((section) => section.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <main ref={pageRef} className="about-page" id="main-content" tabIndex={-1}>
      <section className="section about-hero" data-about-reveal>
        <div className="about-hero-copy">
          <p className="eyebrow">{text.about.eyebrow}</p>
          <h1>{text.about.title}</h1>
        </div>
        <CareerTimelineVisual />
      </section>

      <section className="section about-journey" data-about-reveal>
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

      <section className="section about-principles" data-about-reveal>
        <div className="section-heading">
          <p className="eyebrow">{text.about.principlesLabel}</p>
          <h2 className="sr-only">{text.about.principlesLabel}</h2>
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

      <section className="section about-goals" data-about-reveal>
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
