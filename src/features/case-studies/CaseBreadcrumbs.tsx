import { Link } from 'react-router-dom'
import { useLocalizedPath } from '../../i18n/LanguageContext'
import type { Project, SiteContent } from '../../types'

export function CaseBreadcrumbs({ project, text }: { project: Project; text: SiteContent }) {
  const localizedPath = useLocalizedPath()

  return (
    <nav className="case-breadcrumbs" aria-label={text.common.breadcrumbs}>
      <ol>
        <li><Link to={localizedPath()}>{text.nav.home}</Link></li>
        <li><Link to={localizedPath('projects')}>{text.nav.projects}</Link></li>
        <li aria-current="page">{project.title}</li>
      </ol>
    </nav>
  )
}
