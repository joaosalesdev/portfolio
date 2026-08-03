import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Seo } from './components/seo/Seo'
import { ErrorBoundary } from './components/feedback/ErrorBoundary'
import { NotFoundPage } from './pages/NotFoundPage'
import { content } from './content'
import { LanguageProvider } from './i18n/LanguageContext'
import type { Language, SiteContent } from './types'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })))
const ProjectCaseStudy = lazy(() => import('./features/case-studies/ProjectCaseStudy').then((module) => ({ default: module.ProjectCaseStudy })))

function RouteEffects({ announcement }: { announcement: string }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>('main')?.focus())
  }, [pathname])

  return <span className="sr-only" role="status" aria-live="polite">{announcement}: {pathname}</span>
}

function CaseStudyRoute({ text }: { text: SiteContent }) {
  const { slug } = useParams()
  const project = text.projects.items.find((item) => item.slug === slug)

  return project ? <ProjectCaseStudy project={project} text={text} /> : <NotFoundPage text={text} />
}

function isLanguage(value: string | undefined): value is Language {
  return value === 'pt' || value === 'en'
}

function LocalizedPortfolio() {
  const { language: languageParam } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const language = isLanguage(languageParam) ? languageParam : 'en'

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('portfolio-language', language)
  }, [language])

  if (!isLanguage(languageParam)) {
    return <Navigate to="/en" replace />
  }

  const text = content[language]

  function changeLanguage(nextLanguage: Language) {
    const nextPath = location.pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${nextLanguage}`)
    navigate(`${nextPath}${location.search}`, { replace: true })
  }

  return (
    <LanguageProvider value={language}>
      <a className="skip-link" href="#main-content">{text.common.skipToContent}</a>
      <Seo language={language} text={text} />
      <Header language={language} onLanguageChange={changeLanguage} text={text} />
      <RouteEffects announcement={text.common.pageLoaded} />
      <ErrorBoundary title={text.common.errorTitle} message={text.common.errorMessage} action={text.common.reload}>
        <Suspense fallback={<div className="route-loading" role="status">{text.common.loading}</div>}>
          <Routes>
            <Route index element={<HomePage text={text} />} />
            <Route path="projects" element={<ProjectsPage text={text} />} />
            <Route path="projects/:slug" element={<CaseStudyRoute text={text} />} />
            <Route path="about" element={<AboutPage text={text} />} />
            <Route path="*" element={<NotFoundPage text={text} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer text={text} />
    </LanguageProvider>
  )
}

function LanguageRedirect() {
  const storedLanguage = window.localStorage.getItem('portfolio-language')
  const browserLanguage = window.navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
  const language = isLanguage(storedLanguage ?? undefined) ? storedLanguage : browserLanguage
  const legacyPath = window.location.hash.match(/^#\/(about|projects(?:\/[a-z0-9-]+)?)$/)?.[1]

  return <Navigate to={`/${language}${legacyPath ? `/${legacyPath}` : ''}`} replace />
}

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<LanguageRedirect />} />
        <Route path="/:language/*" element={<LocalizedPortfolio />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
