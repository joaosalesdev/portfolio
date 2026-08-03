export type Language = 'pt' | 'en'

export type Specialty = {
  title: string
  description: string
  icon: 'backend' | 'cloud' | 'systems'
}

export type RequestFlowStep = {
  name: string
  technologies?: string[]
  description: string
}

export type ArchitectureNode = {
  name: string
  detail: string
  type: 'external' | 'dlq'
}

export type Project = {
  slug: string
  title: string
  summary: string
  challenge: string
  stack: string[]
  image?: string
  imageAlt: string
  caseStudy: {
    businessContext: string
    responsibility: string
    solutionOperation: string
    supportingNodes?: ArchitectureNode[]
    requestFlow: RequestFlowStep[]
    recoveryFlow?: RequestFlowStep[]
    reliability?: string
    externalServices?: RequestFlowStep[]
    productJourney?: RequestFlowStep[]
    challenges: string[]
    decisions: string[]
    outcome: string
    benefits: string[]
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
    heroHighlights: string[]
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
    stack: string
    caseStudy: {
      businessContext: string
      systemOverview: string
      architecture: string
      solutionOperation: string
      aiPipeline: string
      agentArchitecture: string
      processingPipeline: string
      processFlow: string
      executionCycle: string
      reliabilityRecovery: string
      recoveryPath: string
      applicationArchitecture: string
      productJourney: string
      externalServices: string
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
    principles: string[]
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
