import { createContext, useContext } from 'react'
import type { Language } from '../types'

const LanguageContext = createContext<Language>('en')

export const LanguageProvider = LanguageContext.Provider

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useLocalizedPath() {
  const language = useLanguage()

  return (path = '') => `/${language}${path ? `/${path.replace(/^\//, '')}` : ''}`
}
