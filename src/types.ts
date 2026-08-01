export type Language = 'pt' | 'en'

export type Specialty = {
  title: string
  description: string
  icon: 'backend' | 'cloud' | 'systems'
}

export type RequestFlowStep = {
  name: string
  description: string
}

export type Project = {
  slug: string
  title: string
  summary: string
  challenge: string
  solution: string
  stack: string[]
  image?: string
  imageAlt: string
  caseStudy: {
    businessContext: string
    responsibility: string
    architecture: string
    requestFlow: RequestFlowStep[]
    challenges: string[]
    decisions: string[]
    result: string
    skills: string[]
  }
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
      businessContext: string
      architectureImage: string
      architecture: string
      responsibility: string
      requestFlow: string
      decisions: string
      challenges: string
      results: string
      skills: string
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
