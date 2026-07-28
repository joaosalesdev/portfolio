import { useEffect, useState } from 'react'
import {
  HashRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import './App.css'

type Language = 'pt' | 'en'

const content = {
  pt: {
    nav: { home: 'Início', projects: 'Projetos', about: 'Sobre' },
    home: {
      eyebrow: 'Desenvolvedor de software',
      title: 'Soluções que conectam sistemas, pessoas e ideias.',
      description:
        'Trabalho com integrações, automação e inteligência artificial para transformar desafios complexos em produtos úteis.',
      primaryAction: 'Ver projetos',
      secondaryAction: 'Entrar em contato',
      specialtiesLabel: 'Especialidades',
      specialtiesTitle: 'Tecnologia aplicada a problemas reais',
      specialties: [
        ['Integrações', 'Conexão entre plataformas, APIs e serviços para criar fluxos confiáveis.'],
        ['Automação', 'Processos com Python e cloud que reduzem tarefas repetitivas.'],
        ['Inteligência artificial', 'Agentes e experiências digitais orientados a objetivos claros.'],
      ],
      featuredLabel: 'Projetos em destaque',
      featuredTitle: 'Uma seleção do meu trabalho',
      experienceLabel: 'Experiência resumida',
      experienceTitle: 'Aprendizado contínuo, entrega prática',
      experience:
        'Minha trajetória combina desenvolvimento, automação e integração de sistemas. Procuro compreender o contexto antes de escolher a tecnologia e valorizo soluções simples e sustentáveis.',
      contactLabel: 'Contato',
      contactTitle: 'Vamos construir algo juntos?',
      contact:
        'Estou disponível para conversar sobre projetos, oportunidades e boas ideias.',
    },
    projects: {
      eyebrow: 'Portfólio de projetos',
      title: 'Projetos construídos para resolver problemas reais.',
      description:
        'Cada projeto parte de um contexto diferente, mas segue o mesmo princípio: usar tecnologia com propósito e clareza.',
      challenge: 'Desafio',
      solution: 'Solução',
      stack: 'Tecnologias',
      items: [
        {
          number: '01',
          title: 'Integração Salesforce',
          summary: 'Integração de dados e processos para uma operação comercial mais eficiente.',
          challenge: 'Unificar informações distribuídas e diminuir tarefas manuais entre sistemas.',
          solution: 'Fluxos de integração que mantêm os dados sincronizados e rastreáveis.',
          stack: ['Salesforce', 'APIs', 'Integração'],
        },
        {
          number: '02',
          title: 'Automação Python + AWS',
          summary: 'Automação de tarefas e processamento de dados usando serviços em nuvem.',
          challenge: 'Processos repetitivos consumiam tempo e dificultavam a escalabilidade.',
          solution: 'Rotinas Python executadas na AWS para processar e distribuir dados.',
          stack: ['Python', 'AWS', 'Automação'],
        },
        {
          number: '03',
          title: 'Melita AI Agent',
          summary: 'Agente de IA criado para apoiar conversas e decisões.',
          challenge: 'Oferecer respostas úteis sem perder o contexto da conversa.',
          solution: 'Um agente orientado por objetivos com instruções e contexto estruturados.',
          stack: ['IA', 'Agentes', 'Produto'],
        },
        {
          number: '04',
          title: 'Plataforma de ensino de italiano',
          summary: 'Experiência digital para tornar o aprendizado mais acessível.',
          challenge: 'Organizar conteúdos de maneira clara, progressiva e motivadora.',
          solution: 'Uma plataforma centrada na experiência e evolução de cada estudante.',
          stack: ['Educação', 'React', 'UX'],
        },
      ],
    },
    about: {
      eyebrow: 'Sobre mim',
      title: 'Tecnologia com curiosidade, clareza e propósito.',
      journeyLabel: 'Trajetória',
      journeyTitle: 'Construindo uma visão completa',
      journey: [
        'Sou um desenvolvedor interessado em resolver problemas por meio da tecnologia. Gosto de compreender como cada parte de um sistema se conecta e como o software pode facilitar o trabalho das pessoas.',
        'A minha trajetória combina Python, cloud, integrações e desenvolvimento web. Atualmente, aprofundo a experiência com React e com a criação de produtos digitais.',
      ],
      principlesLabel: 'Princípios',
      principles: [
        ['Clareza', 'Soluções e comunicação devem ser fáceis de compreender.'],
        ['Curiosidade', 'Perguntar e investigar é parte essencial do trabalho.'],
        ['Consistência', 'Qualidade nasce de boas decisões repetidas diariamente.'],
      ],
      goalsLabel: 'Objetivos',
      goalsTitle: 'O próximo capítulo',
      goals:
        'Quero continuar a evoluir como desenvolvedor, colaborar com equipas diversas e construir produtos que gerem impacto mensurável para pessoas e negócios.',
    },
    common: {
      featuredLink: 'Ver todos os projetos',
      email: 'Enviar e-mail',
      footer: 'Desenvolvido com React e curiosidade.',
    },
  },
  en: {
    nav: { home: 'Home', projects: 'Projects', about: 'About' },
    home: {
      eyebrow: 'Software developer',
      title: 'Solutions that connect systems, people, and ideas.',
      description:
        'I work with integrations, automation, and artificial intelligence to turn complex challenges into useful products.',
      primaryAction: 'View projects',
      secondaryAction: 'Get in touch',
      specialtiesLabel: 'Expertise',
      specialtiesTitle: 'Technology applied to real problems',
      specialties: [
        ['Integrations', 'Connecting platforms, APIs, and services to create reliable workflows.'],
        ['Automation', 'Python and cloud processes that reduce repetitive tasks.'],
        ['Artificial intelligence', 'Agents and digital experiences designed around clear goals.'],
      ],
      featuredLabel: 'Featured projects',
      featuredTitle: 'A selection of my work',
      experienceLabel: 'Experience',
      experienceTitle: 'Continuous learning, practical delivery',
      experience:
        'My path combines development, automation, and systems integration. I seek to understand the context before choosing technology and value simple, sustainable solutions.',
      contactLabel: 'Contact',
      contactTitle: 'Shall we build something together?',
      contact:
        'I am available to talk about projects, opportunities, and good ideas.',
    },
    projects: {
      eyebrow: 'Project portfolio',
      title: 'Projects built to solve real problems.',
      description:
        'Each project starts from a different context but follows the same principle: using technology with purpose and clarity.',
      challenge: 'Challenge',
      solution: 'Solution',
      stack: 'Technologies',
      items: [
        {
          number: '01',
          title: 'Salesforce Integration',
          summary: 'Data and process integration for more efficient commercial operations.',
          challenge: 'Unify distributed information and reduce manual tasks across systems.',
          solution: 'Integration workflows that keep data synchronized and traceable.',
          stack: ['Salesforce', 'APIs', 'Integration'],
        },
        {
          number: '02',
          title: 'Python + AWS Automation',
          summary: 'Task automation and data processing using cloud services.',
          challenge: 'Repetitive processes consumed time and made scaling difficult.',
          solution: 'Python routines running on AWS to process and distribute data.',
          stack: ['Python', 'AWS', 'Automation'],
        },
        {
          number: '03',
          title: 'Melita AI Agent',
          summary: 'An AI agent designed to support conversations and decisions.',
          challenge: 'Provide useful answers without losing conversation context.',
          solution: 'A goal-oriented agent with structured instructions and context.',
          stack: ['AI', 'Agents', 'Product'],
        },
        {
          number: '04',
          title: 'Italian learning platform',
          summary: 'A digital experience designed to make learning more accessible.',
          challenge: 'Organize content in a clear, progressive, and motivating way.',
          solution: 'A platform centered on each student’s experience and progress.',
          stack: ['Education', 'React', 'UX'],
        },
      ],
    },
    about: {
      eyebrow: 'About me',
      title: 'Technology with curiosity, clarity, and purpose.',
      journeyLabel: 'Journey',
      journeyTitle: 'Building a complete perspective',
      journey: [
        'I am a developer interested in solving problems through technology. I enjoy understanding how every part of a system connects and how software can make people’s work easier.',
        'My path combines Python, cloud, integrations, and web development. I am currently deepening my experience with React and digital product development.',
      ],
      principlesLabel: 'Principles',
      principles: [
        ['Clarity', 'Solutions and communication should be easy to understand.'],
        ['Curiosity', 'Asking questions and investigating are essential parts of the work.'],
        ['Consistency', 'Quality comes from good decisions repeated every day.'],
      ],
      goalsLabel: 'Goals',
      goalsTitle: 'The next chapter',
      goals:
        'I want to keep growing as a developer, collaborate with diverse teams, and build products that create measurable impact for people and businesses.',
    },
    common: {
      featuredLink: 'View all projects',
      email: 'Send an email',
      footer: 'Built with React and curiosity.',
    },
  },
}

type Text = (typeof content)[Language]

function Header({
  language,
  setLanguage,
  text,
}: {
  language: Language
  setLanguage: (language: Language) => void
  text: Text
}) {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label={text.nav.home}>
        PF<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        <NavLink to="/">{text.nav.home}</NavLink>
        <NavLink to="/projects">{text.nav.projects}</NavLink>
        <NavLink to="/about">{text.nav.about}</NavLink>
      </nav>
      <div className="language-switcher" aria-label="Select language">
        {(['pt', 'en'] as Language[]).map((item, index) => (
          <span key={item}>
            {index > 0 && <span aria-hidden="true"> / </span>}
            <button
              className={language === item ? 'active' : ''}
              type="button"
              onClick={() => setLanguage(item)}
            >
              {item.toUpperCase()}
            </button>
          </span>
        ))}
      </div>
    </header>
  )
}

function PageTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <span className="route-marker" data-route={pathname} />
}

function HomePage({ text }: { text: Text }) {
  const featured = text.projects.items.slice(0, 3)

  return (
    <main>
      <section className="hero section">
        <p className="eyebrow">{text.home.eyebrow}</p>
        <h1>{text.home.title}</h1>
        <p className="hero-description">{text.home.description}</p>
        <div className="hero-actions">
          <Link className="button primary" to="/projects">
            {text.home.primaryAction}
          </Link>
          <a className="button secondary" href="#contact">
            {text.home.secondaryAction}
          </a>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{text.home.specialtiesLabel}</p>
          <h2>{text.home.specialtiesTitle}</h2>
        </div>
        <div className="specialties-grid">
          {text.home.specialties.map(([title, description], index) => (
            <article className="specialty-card" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects-section">
        <div className="section-heading">
          <p className="eyebrow">{text.home.featuredLabel}</p>
          <h2>{text.home.featuredTitle}</h2>
        </div>
        <ProjectList projects={featured} />
        <Link className="text-link" to="/projects">
          {text.common.featuredLink} →
        </Link>
      </section>

      <section className="section experience">
        <p className="eyebrow">{text.home.experienceLabel}</p>
        <div>
          <h2>{text.home.experienceTitle}</h2>
          <p>{text.home.experience}</p>
        </div>
      </section>

      <section className="section contact" id="contact">
        <p className="eyebrow">{text.home.contactLabel}</p>
        <h2>{text.home.contactTitle}</h2>
        <p>{text.home.contact}</p>
        <ContactLinks text={text} />
      </section>
    </main>
  )
}

function ProjectList({
  projects,
}: {
  projects: Text['projects']['items']
}) {
  return (
    <div className="projects-list">
      {projects.map((project) => (
        <article className="project-card" key={project.number}>
          <span className="project-number">{project.number}</span>
          <div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <ul aria-label="Technologies">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <span className="project-arrow" aria-hidden="true">↗</span>
        </article>
      ))}
    </div>
  )
}

function ProjectsPage({ text }: { text: Text }) {
  return (
    <main>
      <section className="page-hero section">
        <p className="eyebrow">{text.projects.eyebrow}</p>
        <h1>{text.projects.title}</h1>
        <p className="hero-description">{text.projects.description}</p>
      </section>
      <section className="section project-details">
        {text.projects.items.map((project) => (
          <article key={project.number}>
            <header>
              <span className="project-number">{project.number}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </header>
            <div className="project-facts">
              <div>
                <h3>{text.projects.challenge}</h3>
                <p>{project.challenge}</p>
              </div>
              <div>
                <h3>{text.projects.solution}</h3>
                <p>{project.solution}</p>
              </div>
              <div>
                <h3>{text.projects.stack}</h3>
                <p>{project.stack.join(' · ')}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

function AboutPage({ text }: { text: Text }) {
  return (
    <main>
      <section className="page-hero section">
        <p className="eyebrow">{text.about.eyebrow}</p>
        <h1>{text.about.title}</h1>
      </section>
      <section className="section about-block">
        <p className="eyebrow">{text.about.journeyLabel}</p>
        <div>
          <h2>{text.about.journeyTitle}</h2>
          {text.about.journey.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{text.about.principlesLabel}</p>
        </div>
        <div className="principles-grid">
          {text.about.principles.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section about-block goals">
        <p className="eyebrow">{text.about.goalsLabel}</p>
        <div>
          <h2>{text.about.goalsTitle}</h2>
          <p>{text.about.goals}</p>
        </div>
      </section>
      <section className="section contact">
        <p className="eyebrow">{text.home.contactLabel}</p>
        <h2>{text.home.contactTitle}</h2>
        <ContactLinks text={text} />
      </section>
    </main>
  )
}

function ContactLinks({ text }: { text: Text }) {
  return (
    <div className="contact-links">
      <a href="mailto:seuemail@example.com">{text.common.email} ↗</a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
      <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
    </div>
  )
}

function App() {
  const [language, setLanguageState] = useState<Language>('pt')
  const text = content[language]

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage)
    document.documentElement.lang = nextLanguage
  }

  return (
    <HashRouter>
      <PageTop />
      <Header language={language} setLanguage={setLanguage} text={text} />
      <Routes>
        <Route path="/" element={<HomePage text={text} />} />
        <Route path="/projects" element={<ProjectsPage text={text} />} />
        <Route path="/about" element={<AboutPage text={text} />} />
      </Routes>
      <footer>
        <span>© {new Date().getFullYear()} PF</span>
        <span>{text.common.footer}</span>
      </footer>
    </HashRouter>
  )
}

export default App
