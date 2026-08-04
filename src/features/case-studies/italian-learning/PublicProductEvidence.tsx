import { useEffect, useRef, useState } from 'react'
import type { Project, SiteContent } from '../../../types'

const resolveAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export function PublicProductEvidence({ project, text }: { project: Project; text: SiteContent }) {
  const evidence = project.caseStudy.publicEvidence
  const [isExpanded, setIsExpanded] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isExpanded) return

    const previousOverflow = document.body.style.overflow
    const triggerButton = triggerRef.current
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsExpanded(false)
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      triggerButton?.focus()
    }
  }, [isExpanded])

  if (!evidence) return null

  const imageSrc = resolveAssetPath(evidence.image.src)

  return (
    <>
      <section className="public-product-evidence section" aria-labelledby="public-product-evidence-title">
        <div className="public-product-evidence-copy">
          <p className="eyebrow">{text.projects.caseStudy.publicEvidenceLabel}</p>
          <h2 id="public-product-evidence-title">{text.projects.caseStudy.publicEvidenceTitle}</h2>
          <ul>
            {evidence.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="public-product-evidence-media">
          <button
            type="button"
            ref={triggerRef}
            onClick={() => setIsExpanded(true)}
            aria-label={`${text.projects.caseStudy.enlargeEvidence}: ${evidence.image.alt}`}
          >
            <img src={imageSrc} alt={evidence.image.alt} loading="lazy" />
            <span aria-hidden="true">&#8599;</span>
          </button>
          <p>{text.projects.caseStudy.publicEvidenceCaption}</p>
          <a
            className="text-link public-product-evidence-link"
            href={evidence.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${text.projects.caseStudy.publicEvidenceLink}, ${text.common.opensNewTab}`}
          >
            {text.projects.caseStudy.publicEvidenceLink}
          </a>
        </div>
      </section>

      {isExpanded && (
        <div
          className="evidence-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={evidence.image.alt}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsExpanded(false)
          }}
        >
          <button
            className="evidence-lightbox-close"
            type="button"
            ref={closeButtonRef}
            onClick={() => setIsExpanded(false)}
          >
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">{text.projects.caseStudy.closeEvidence}</span>
          </button>
          <img src={imageSrc} alt={evidence.image.alt} />
        </div>
      )}
    </>
  )
}
