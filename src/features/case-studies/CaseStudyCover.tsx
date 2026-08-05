import type { Project } from '../../types'

const resolveAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export function CaseStudyCover({ project }: { project: Project }) {
  return (
    <figure className="case-study-cover">
      <img
        src={resolveAssetPath(project.coverImage)}
        alt={project.coverImageAlt}
        width="1200"
        height="630"
        loading="eager"
        fetchPriority="high"
      />
    </figure>
  )
}
