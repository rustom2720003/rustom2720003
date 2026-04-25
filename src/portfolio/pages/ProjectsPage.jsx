import { useState } from 'react'
import { projectFilters, projects } from '../portfolioData'
import { cx } from '../classes'
import { PageSection, ProjectCard, SectionHeading } from '../ui'

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.filters.includes(activeFilter))

  return (
    <PageSection>
      <SectionHeading
        description="A focused view of client delivery and hands-on product work across enterprise frontends, middleware integrations, APIs, and live React-based application design."
        eyebrow="Project highlights"
        title="Enterprise modules, banking workflows, and live React product work"
      />

      <div className="mb-5 flex flex-wrap gap-3" role="tablist" aria-label="Project filters">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={cx(
              'rounded-full border px-4 py-2.5 text-sm transition duration-200 hover:-translate-y-0.5',
              activeFilter === filter
                ? 'border-white/50 bg-white/70 text-ink shadow-portfolio'
                : 'border-line bg-white/60 text-muted hover:border-line-strong hover:text-ink',
            )}
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </PageSection>
  )
}

export default ProjectsPage
