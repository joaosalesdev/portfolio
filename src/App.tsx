import { useEffect, useState } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ProjectCaseStudy } from './components/ProjectCaseStudy'
import { content } from './content'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import type { Language, SiteContent } from './types'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function CaseStudyRoute({ text }: { text: SiteContent }) {
  const { slug } = useParams()
  const project = text.projects.items.find((item) => item.slug === slug)

  return project ? <ProjectCaseStudy project={project} text={text} /> : <Navigate to="/projects" replace />
}

function App() {
  const [language, setLanguage] = useState<Language>('pt')
  const text = content[language]

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage)
    document.documentElement.lang = nextLanguage
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <Header language={language} onLanguageChange={changeLanguage} text={text} />
      <Routes>
        <Route path="/" element={<HomePage text={text} />} />
        <Route path="/projects" element={<ProjectsPage text={text} />} />
        <Route path="/projects/:slug" element={<CaseStudyRoute text={text} />} />
        <Route path="/about" element={<AboutPage text={text} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer text={text} />
    </HashRouter>
  )
}

export default App
