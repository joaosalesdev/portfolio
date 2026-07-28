import { useState } from 'react'

type ImagePlaceholderProps = {
  src?: string
  alt: string
  fallbackText: string
  eager?: boolean
}

export function ImagePlaceholder({
  src,
  alt,
  fallbackText,
  eager = false,
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false)

  if (src && !hasError) {
    return (
      <div className="project-media">
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setHasError(true)}
        />
      </div>
    )
  }

  return (
    <div className="project-media image-placeholder" role="img" aria-label={alt}>
      <div className="placeholder-diagram" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
        <i />
      </div>
      <small>{fallbackText}</small>
    </div>
  )
}
