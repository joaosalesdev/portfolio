import { Link, NavLink } from 'react-router-dom'
import { useLocalizedPath } from '../../i18n/LanguageContext'
import type { Language, SiteContent } from '../../types'

type HeaderProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  text: SiteContent
}

export function Header({ language, onLanguageChange, text }: HeaderProps) {
  const localizedPath = useLocalizedPath()

  return (
    <header className="site-header">
      <Link className="brand" to={localizedPath()} aria-label={text.nav.home}>
        João <span>Paulo</span>
      </Link>
      <nav aria-label={text.common.mainNavigation}>
        <NavLink end to={localizedPath()}>{text.nav.home}</NavLink>
        <NavLink to={localizedPath('about')}>{text.nav.about}</NavLink>
        <NavLink to={localizedPath('projects')}>{text.nav.projects}</NavLink>
      </nav>
      <div className="language-switcher" role="group" aria-label={text.common.selectLanguage}>
        {(['pt', 'en'] as Language[]).map((item, index) => (
          <span key={item}>
            {index > 0 && <span aria-hidden="true"> / </span>}
            <button
              aria-pressed={language === item}
              className={language === item ? 'active' : ''}
              type="button"
              onClick={() => onLanguageChange(item)}
              aria-label={item === 'pt' ? 'Português' : 'English'}
            >
              {item.toUpperCase()}
            </button>
          </span>
        ))}
      </div>
    </header>
  )
}
