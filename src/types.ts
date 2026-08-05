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

export type ProductionEvidence = {
  title: string
  description: string
  images: Array<{ src: string; alt: string }>
}

export type Project = {
  slug: string
  title: string
  summary: string
  challenge: string
  stack: string[]
  coverImage: string
  coverImageAlt: string
  image?: string
  imageAlt: string
  caseStudy: {
    businessContext: string
    supportingNodes?: ArchitectureNode[]
    requestFlow: RequestFlowStep[]
    recoveryFlow?: RequestFlowStep[]
    externalServices?: RequestFlowStep[]
    responsibility: string
    solutionOperation: string
    reliability?: string
    productJourney?: RequestFlowStep[]
    challenges: string[]
    decisions: string[]
    productionImpactBefore?: string
    productionImpactAfter?: string
    productionImpact?: string[]
    productionExamples?: {
      title: string
      introduction: string
      items: Array<{
        title: string
        problem: string
        architecture: string
        impact: string
      }>
      highlight: string
    }
    productionEvidence?: ProductionEvidence[]
    publicEvidence?: {
      items: string[]
      url: string
      image: { src: string; alt: string }
    }
    platformFeatures?: Array<{
      title: string
      description: string
      tags: string[]
      image: { src: string; alt: string }
    }>
    outcome: string
    benefits: string[]
    confidentialityNotice?: string
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
  nav: { home: string; about: string; projects: string }
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
  projects: {
    eyebrow: string
    title: string
    description: string
    evolutionLabel: string
    evolutionTitle: string
    viewProject: string
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
      challenges: string
      decisions: string
      productionImpact: string
      operationalImpact: string
      structuredProductionImpact: string
      beforeImplementation: string
      afterImplementation: string
      benefitsObtained: string
      productionEvidence: string
      productionEvidenceIntroduction: string
      publicEvidenceLabel: string
      publicEvidenceTitle: string
      publicEvidenceCaption: string
      publicEvidenceLink: string
      realProductLabel: string
      platformFeaturesTitle: string
      platformFeaturesIntroduction: string
      enlargeEvidence: string
      closeEvidence: string
      confidentialityLabel: string
      results: string
      skills: string
    }
    items: Project[]
  }
  experience: Experience[]
  common: {
    mainNavigation: string
    selectLanguage: string
    skipToContent: string
    pageLoaded: string
    loading: string
    errorTitle: string
    errorMessage: string
    reload: string
    professionalHighlights: string
    architectureLabel: string
    explore: string
    exploreMore: string
    projectsCaption: string
    featuredLink: string
    imageUnavailable: string
    technologies: string
    emailLabel: string
    email: string
    networkLabel: string
    codeLabel: string
    opensNewTab: string
    breadcrumbs: string
    notFoundTitle: string
    notFoundMessage: string
    backHome: string
    footer: string
  }
}
