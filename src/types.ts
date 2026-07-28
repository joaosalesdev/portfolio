export type Language = 'pt' | 'en'

export type Specialty = {
  title: string
  description: string
  icon: 'backend' | 'cloud' | 'systems'
}

export type Project = {
  slug: string
  number: string
  title: string
  summary: string
  challenge: string
  solution: string
  stack: string[]
  image?: string
  imageAlt: string
}

export type Experience = {
  role: string
  company: string
  period: string
  summary: string
}

export type SiteContent = {
  nav: { home: string; projects: string; about: string }
  home: {
    eyebrow: string
    title: string
    description: string
    primaryAction: string
    secondaryAction: string
    specialtiesLabel: string
    specialtiesTitle: string
    specialties: Specialty[]
    featuredLabel: string
    featuredTitle: string
    experienceLabel: string
    experienceTitle: string
    experience: string
    contactLabel: string
    contactTitle: string
    contact: string
  }
  projects: {
    eyebrow: string
    title: string
    description: string
    viewProject: string
    backToProjects: string
    challenge: string
    solution: string
    stack: string
    caseStudy: {
      architecture: string
      responsibilities: string
      decisions: string
      challenges: string
      results: string
      evidence: string
      links: string
      placeholder: string
    }
    items: Project[]
  }
  experience: Experience[]
  about: {
    eyebrow: string
    title: string
    journeyLabel: string
    journeyTitle: string
    journey: string[]
    principlesLabel: string
    principles: string[][]
    goalsLabel: string
    goalsTitle: string
    goals: string
  }
  common: {
    featuredLink: string
    email: string
    footer: string
    imageUnavailable: string
  }
}
