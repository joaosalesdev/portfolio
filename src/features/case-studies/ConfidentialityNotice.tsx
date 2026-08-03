import type { SiteContent } from '../../types'

export function ConfidentialityNotice({ notice, text }: { notice: string; text: SiteContent }) {
  return (
    <section className="production-confidentiality section" aria-labelledby="confidentiality-evidence-title">
      <div className="case-section-heading">
        <p className="eyebrow">{text.projects.caseStudy.confidentialityLabel}</p>
        <h2 id="confidentiality-evidence-title">{text.projects.caseStudy.productionEvidence}</h2>
      </div>
      <div className="confidentiality-notice">
        <span aria-hidden="true">NDA</span>
        <p>{notice}</p>
      </div>
    </section>
  )
}
