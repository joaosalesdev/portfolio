import { ContactSection } from '../features/home/components/ContactSection'
import type { SiteContent } from '../types'

export function AboutPage({ text }: { text: SiteContent }) {
  return (
    <main>
      <section className="page-hero section">
        <p className="eyebrow">{text.about.eyebrow}</p>
        <h1>{text.about.title}</h1>
      </section>
      <section className="section about-block">
        <p className="eyebrow">{text.about.journeyLabel}</p>
        <div>
          <h2>{text.about.journeyTitle}</h2>
          {text.about.journey.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{text.about.principlesLabel}</p>
        </div>
        <div className="principles-grid">
          {text.about.principles.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section about-block goals">
        <p className="eyebrow">{text.about.goalsLabel}</p>
        <div>
          <h2>{text.about.goalsTitle}</h2>
          <p>{text.about.goals}</p>
        </div>
      </section>
      <ContactSection text={text} />
    </main>
  )
}
