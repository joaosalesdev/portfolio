import type { SiteContent } from '../../../types'

export function ContactSection({ text }: { text: SiteContent }) {
  return (
    <section className="section contact" id="contact">
      <p className="eyebrow">{text.home.contactLabel}</p>
      <h2>{text.home.contactTitle}</h2>
      <p>{text.home.contact}</p>
      <div className="contact-links">
        <a className="contact-link contact-email" href="mailto:joaopaulo.magalhaes.pt@gmail.com">
          <small>{text.common.emailLabel}</small>
          <strong>{text.common.email}</strong>
          <span aria-hidden="true">↗</span>
        </a>
        <a className="contact-link" href="https://www.linkedin.com/in/joao-sales-magalhaes/" target="_blank" rel="noreferrer" aria-label={`LinkedIn, ${text.common.opensNewTab}`}>
          <small>{text.common.networkLabel}</small>
          <strong>LinkedIn</strong>
          <span aria-hidden="true">↗</span>
        </a>
        <a className="contact-link" href="https://github.com/joaosalesdev" target="_blank" rel="noreferrer" aria-label={`GitHub, ${text.common.opensNewTab}`}>
          <small>{text.common.codeLabel}</small>
          <strong>GitHub</strong>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}
