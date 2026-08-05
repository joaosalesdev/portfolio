import type { SiteContent } from '../../types'

export function Footer({ text }: { text: SiteContent }) {
  return (
    <footer>
      <span>© {new Date().getFullYear()} - João Paulo Sales Magalhães</span>
      <span>{text.common.footer}</span>
    </footer>
  )
}
