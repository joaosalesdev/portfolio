import { Link } from 'react-router-dom'
import { useLocalizedPath } from '../i18n/LanguageContext'
import type { SiteContent } from '../types'

export function NotFoundPage({ text }: { text: SiteContent }) {
  const localizedPath = useLocalizedPath()

  return (
    <main className="feedback-page" id="main-content" tabIndex={-1}>
      <p className="eyebrow">404</p>
      <h1>{text.common.notFoundTitle}</h1>
      <p>{text.common.notFoundMessage}</p>
      <Link className="button primary" to={localizedPath()}>
        <span>{text.common.backHome}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </main>
  )
}
