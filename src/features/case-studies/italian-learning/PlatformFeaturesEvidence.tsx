import { useEffect, useRef, useState } from 'react'
import type { Project, SiteContent } from '../../../types'

type FeatureImage = NonNullable<Project['caseStudy']['platformFeatures']>[number]['image']
const resolveAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export function PlatformFeaturesEvidence({ project, text }: { project: Project; text: SiteContent }) {
  const features = project.caseStudy.platformFeatures
  const [activeImage, setActiveImage] = useState<FeatureImage | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!activeImage) return

    const previousOverflow = document.body.style.overflow
    const triggerButton = triggerRef.current
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
      triggerButton?.focus()
    }
  }, [activeImage])

  if (!features) return null

  return (
    <>
      <section className="platform-features-evidence section" aria-labelledby="platform-features-title">
        <div className="case-section-heading platform-features-heading">
          <p className="eyebrow">{text.projects.caseStudy.realProductLabel}</p>
          <h2 id="platform-features-title">{text.projects.caseStudy.platformFeaturesTitle}</h2>
          <p>{text.projects.caseStudy.platformFeaturesIntroduction}</p>
        </div>

        <div className="platform-features-list">
          {features.map((feature, index) => (
            <article className="platform-feature" key={feature.title}>
              <div className="platform-feature-copy">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="platform-feature-tags" aria-label={`${feature.title}: ${text.projects.stack}`}>
                  {feature.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <button
                className="platform-feature-media"
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget
                  setActiveImage(feature.image)
                }}
                aria-label={`${text.projects.caseStudy.enlargeEvidence}: ${feature.title}`}
              >
                <img
                  src={resolveAssetPath(feature.image.src)}
                  alt={feature.image.alt}
                  loading="lazy"
                />
                <span aria-hidden="true">&#8599;</span>
              </button>
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
