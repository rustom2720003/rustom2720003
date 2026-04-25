import { useState } from 'react'
import {
  CloudSun,
  Clock3,
  Droplets,
  LocateFixed,
  MapPin,
  RefreshCcw,
  Wind,
} from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { projectFilters, projects } from '../portfolioData'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
  panelClassName,
} from '../classes'
import { PageSection, ProjectCard, SectionHeading } from '../ui'

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { liveEnvironment, refreshLiveEnvironment } = useOutletContext()

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.filters.includes(activeFilter))

  const hasLiveWeather = liveEnvironment.temperature !== null
  const timeZoneDisplay = liveEnvironment.timeZoneAbbreviation
    ? `${liveEnvironment.timeZoneAbbreviation} | ${liveEnvironment.timeZoneLabel}`
    : liveEnvironment.timeZoneLabel

  return (
    <PageSection>
      <SectionHeading
        description="A focused view of client delivery and hands-on product work across enterprise frontends, middleware integrations, APIs, and live React-based application design."
        eyebrow="Project highlights"
        title="Enterprise modules, banking workflows, and live React product work"
      />

      <article className={cx(panelClassName, 'relative mb-6 overflow-hidden p-6')}>
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="grid max-w-3xl gap-2">
            <p className={cardLabelClassName}>Live API integration</p>
            <h3 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-none tracking-[-0.05em] text-ink">
              Current time and local weather
            </h3>
            <p className="leading-8 text-muted">
              This section uses browser location and a live weather API to show
              the current time zone, temperature, and conditions in real time.
            </p>
          </div>

          <button
            type="button"
            className={cx(buttonClassNames.ghost, 'w-full sm:w-auto')}
            onClick={refreshLiveEnvironment}
          >
            <RefreshCcw
              className={cx(liveEnvironment.status === 'loading' && 'animate-spin')}
              size={18}
            />
            {liveEnvironment.status === 'loading' ? 'Refreshing...' : 'Refresh data'}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <span className={chipClassName}>
            {liveEnvironment.status === 'loading' ? (
              <RefreshCcw className="animate-spin" size={14} />
            ) : liveEnvironment.status === 'error' ? (
              <MapPin size={14} />
            ) : (
              <CloudSun size={14} />
            )}
            {liveEnvironment.status === 'loading'
              ? 'Fetching live data'
              : liveEnvironment.status === 'error'
                ? 'Turn on location'
                : 'Live environment ready'}
          </span>
          <span className={chipClassName}>
            <MapPin size={14} />
            {liveEnvironment.locationLabel}
          </span>
          <span className={chipClassName}>
            <Clock3 size={14} />
            {timeZoneDisplay}
          </span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="grid gap-4 rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Clock3 size={20} />
              </span>
              <div className="min-w-0">
                <p className={cardLabelClassName}>Current time</p>
                <h3 className="mt-1 font-display text-[2rem] leading-none tracking-[-0.05em] text-ink">
                  {liveEnvironment.timeSnapshot.clockLabel}
                </h3>
              </div>
            </div>

            <p className="text-sm leading-7 text-muted">
              {liveEnvironment.timeSnapshot.dateLabel}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className={chipClassName}>{timeZoneDisplay}</span>
              {liveEnvironment.updatedAt ? (
                <span className={chipClassName}>
                  Updated {liveEnvironment.updatedAt}
                </span>
              ) : null}
            </div>

            <p className="text-sm leading-7 text-muted">
              {liveEnvironment.status === 'error'
                ? 'Turn on your location to get the exact temperature and timing details.'
                : 'The clock keeps updating every second after the time zone is resolved.'}
            </p>
          </div>

          <div className="grid gap-4 rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <div className="flex items-start gap-3">
              <span
                className={cx(
                  'inline-flex h-11 w-11 items-center justify-center rounded-full',
                  liveEnvironment.isDay
                    ? 'bg-teal-soft text-teal'
                    : 'bg-accent-soft text-accent',
                )}
              >
                <CloudSun size={20} />
              </span>
              <div className="min-w-0">
                <p className={cardLabelClassName}>Current weather</p>
                <h3 className="mt-1 font-display text-[2rem] leading-none tracking-[-0.05em] text-ink">
                  {hasLiveWeather
                    ? `${Math.round(liveEnvironment.temperature)}\u00B0C`
                    : 'Waiting for access'}
                </h3>
              </div>
            </div>

            <p className="text-sm leading-7 text-muted">
              {liveEnvironment.weatherLabel}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-surface p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-ink">
                  <CloudSun size={15} />
                  Feels like
                </div>
                <p className="mt-2 font-display text-[1.35rem] text-ink">
                  {liveEnvironment.apparentTemperature !== null
                    ? `${Math.round(liveEnvironment.apparentTemperature)}\u00B0C`
                    : '--'}
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Droplets size={15} />
                  Humidity
                </div>
                <p className="mt-2 font-display text-[1.35rem] text-ink">
                  {liveEnvironment.humidity !== null
                    ? `${liveEnvironment.humidity}%`
                    : '--'}
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Wind size={15} />
                  Wind
                </div>
                <p className="mt-2 font-display text-[1.35rem] text-ink">
                  {liveEnvironment.windSpeed !== null
                    ? `${Math.round(liveEnvironment.windSpeed)} km/h`
                    : '--'}
                </p>
              </div>
            </div>

            {liveEnvironment.coordinatesLabel ? (
              <div className="flex flex-wrap gap-3">
                <span className={chipClassName}>
                  <LocateFixed size={14} />
                  {liveEnvironment.coordinatesLabel}
                </span>
              </div>
            ) : null}

            <p
              className={cx(
                'text-sm leading-7',
                liveEnvironment.error ? 'text-accent-strong' : 'text-muted',
              )}
            >
              {liveEnvironment.error ||
                'Weather refreshes whenever you revisit the page or tap refresh.'}
            </p>
          </div>
        </div>
      </article>

      <div className="mb-5 flex flex-wrap gap-3" role="tablist" aria-label="Project filters">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={cx(
              'rounded-full border px-4 py-2.5 text-sm transition duration-200 hover:-translate-y-0.5',
              activeFilter === filter
                ? 'border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-chip)] text-ink shadow-portfolio'
                : 'border-line bg-[color:var(--portfolio-glass-soft)] text-muted hover:border-line-strong hover:text-ink',
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
