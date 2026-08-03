import { useEffect, useRef, useState } from 'react'
import type { ProductionEvidence as ProductionEvidenceItem, SiteContent } from '../../types'

type EvidenceImage = ProductionEvidenceItem['images'][number]
const resolveAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export function ProductionEvidence({
  evidence,
  text,
  eyebrow,
  title,
  introduction,
}: {
  evidence: ProductionEvidenceItem[]
  text: SiteContent
  eyebrow?: string
  title?: string
  introduction?: string
}) {
  const [activeImage, setActiveImage] = useState<EvidenceImage | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!activeImage) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null)
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      triggerRef.current?.focus()
    }
  }, [activeImage])

  return (
    <>
      <section className="production-evidence section" aria-labelledby="production-evidence-title">
        <div className="case-section-heading production-evidence-heading">
          <p className="eyebrow">{eyebrow ?? text.projects.caseStudy.productionImpact}</p>
          <h2 id="production-evidence-title">{title ?? text.projects.caseStudy.productionEvidence}</h2>
          <p>{introduction ?? text.projects.caseStudy.productionEvidenceIntroduction}</p>
        </div>

        <div className="production-evidence-grid">
          {evidence.map((item) => (
            <article className="production-evidence-card" key={item.title}>
              <div className={`production-evidence-media production-evidence-media--${item.images.length}`}>
                {item.images.map((evidenceImage, imageIndex) => (
                  <button
                    type="button"
                    key={evidenceImage.src}
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget
                      setActiveImage(evidenceImage)
                    }}
                    aria-label={`${text.projects.caseStudy.enlargeEvidence}: ${item.title}${item.images.length > 1 ? ` ${imageIndex + 1}` : ''}`}
                  >
                    <img
                      src={resolveAssetPath(evidenceImage.src)}
                      alt={evidenceImage.alt}
                      loading="lazy"
                    />
                    <span aria-hidden="true">&#8599;</span>
                  </button>
                ))}
              </div>
              <div className="production-evidence-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeImage && (
        <div
          className="evidence-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null)
          }}
        >
          <button
            className="evidence-lightbox-close"
            type="button"
            ref={closeButtonRef}
            onClick={() => setActiveImage(null)}
          >
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">{text.projects.caseStudy.closeEvidence}</span>
          </button>
          <img src={resolveAssetPath(activeImage.src)} alt={activeImage.alt} />
        </div>
      )}
    </>
  )
}
