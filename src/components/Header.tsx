import { Link, NavLink } from 'react-router-dom'
import type { Language, SiteContent } from '../types'

type HeaderProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  text: SiteContent
}

export function Header({ language, onLanguageChange, text }: HeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label={text.nav.home}>
        João <span>Paulo</span>
      </Link>
      <nav aria-label="Main navigation">
        <NavLink to="/">{text.nav.home}</NavLink>
        <NavLink to="/about">{text.nav.about}</NavLink>
        <NavLink to="/projects">{text.nav.projects}</NavLink>
      </nav>
      <div className="language-switcher" aria-label="Select language">
        {(['pt', 'en'] as Language[]).map((item, index) => (
          <span key={item}>
            {index > 0 && <span aria-hidden="true"> / </span>}
            <button
              aria-pressed={language === item}
              className={language === item ? 'active' : ''}
              type="button"
              onClick={() => onLanguageChange(item)}
            >
              {item.toUpperCase()}
            </button>
          </span>
        ))}
      </div>
    </header>
  )
}
