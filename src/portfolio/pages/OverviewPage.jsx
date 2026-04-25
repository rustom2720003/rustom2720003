import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BriefcaseBusiness,
  Clock3,
  CloudSun,
  ClipboardCheck,
  Code2,
  Download,
  Droplets,
  Landmark,
  Mail,
  MapPin,
  LocateFixed,
  Phone,
  RefreshCcw,
  Sparkles,
  Wind,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { downloadResume } from '../portfolioActions'
import {
  currentFocus,
  focusAreas,
  heroStats,
  profile,
  strengths,
} from '../portfolioData'
import {
  MetricCard,
  PageSection,
  SectionHeading,
  ValueCard,
} from '../ui'
import {
  bulletListClassName,
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
  eyebrowClassName,
  panelClassName,
} from '../classes'
import { useLiveEnvironment } from '../useLiveEnvironment'

const statIcons = [Sparkles, Landmark, BriefcaseBusiness, Blocks]
const strengthIcons = [Landmark, ClipboardCheck, BriefcaseBusiness]

function OverviewPage() {
  const { liveEnvironment, refreshLiveEnvironment } = useLiveEnvironment()
  const hasLiveWeather = liveEnvironment.temperature !== null
  const timeZoneDisplay = liveEnvironment.timeZoneAbbreviation
    ? `${liveEnvironment.timeZoneAbbreviation} | ${liveEnvironment.timeZoneLabel}`
    : liveEnvironment.timeZoneLabel

  return (
    <>
      <PageSection className="pb-3 pt-2">
        <article
          className={cx(
            panelClassName,
            'grid gap-5 overflow-hidden p-4 sm:p-5 lg:grid-cols-[132px_minmax(0,1fr)_auto] lg:items-center',
          )}
        >
          <div className="mx-auto lg:mx-0">
            <img
              alt={profile.photoAlt}
              className="h-28 w-28 rounded-full border border-[color:var(--portfolio-glass-border-strong)] object-cover object-center shadow-[var(--portfolio-inline-shadow)]"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = profile.photoFallbackSrc
              }}
              src={profile.photoSrc}
            />
          </div>

          <div className="min-w-0">
            <p className={eyebrowClassName}>Profile</p>
            <h2 className="mt-2 font-display text-[clamp(1.9rem,3vw,2.7rem)] leading-[0.95] tracking-[-0.04em] text-ink">
              {profile.name}
            </h2>
            <p className="mt-3 max-w-3xl text-[1rem] leading-7 text-muted">
              {profile.profileBannerDescription}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className={chipClassName}>{profile.title}</span>
              <span className={chipClassName}>{profile.experience}</span>
              <span className={chipClassName}>{profile.location}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:items-end lg:text-right">
            <a
              className={cx(buttonClassNames.secondary, 'w-full sm:w-auto')}
              href={profile.linkedinUrl}
              rel="noreferrer"
              target="_blank"
            >
              Visit LinkedIn
              <ArrowUpRight size={18} />
            </a>
          </div>
        </article>
      </PageSection>

      <PageSection className="grid items-start gap-8 pt-3 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <p className="max-w-4xl font-mono text-[1rem] font-black uppercase tracking-[0.2em] text-accent-strong sm:text-[1.12rem]">
            {profile.title} | {profile.company} | {profile.location}
          </p>
          <h1 className="max-w-[11ch] font-display text-[clamp(3.1rem,6vw,5.45rem)] leading-[0.92] tracking-[-0.06em] text-ink max-lg:max-w-none">
            {profile.heroTitle}
          </h1>
          <p className="max-w-[44rem] text-[1.02rem] leading-8 text-muted">
            {profile.heroDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              className={cx(buttonClassNames.primary, 'w-full sm:w-auto')}
              to="/projects"
            >
              Explore Projects
              <ArrowRight size={18} />
            </Link>
            <button
              type="button"
              className={cx(buttonClassNames.secondary, 'w-full sm:w-auto')}
              onClick={downloadResume}
            >
              <Download size={18} />
              Download Resume
            </button>
            <a
              className={cx(buttonClassNames.ghost, 'w-full sm:w-auto')}
              href={profile.emailHref}
            >
              <Mail size={18} />
              Email Me
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <span className="card-reveal surface-lift flex min-h-[3.35rem] min-w-0 items-center gap-2 rounded-2xl border border-line bg-[color:var(--portfolio-glass-inline)] px-4 py-4 text-sm font-medium text-ink shadow-[var(--portfolio-inline-shadow)] backdrop-blur-xl">
              <Phone className="shrink-0" size={16} />
              <span>{profile.phoneDisplay}</span>
            </span>
            <span className="card-reveal surface-lift flex min-h-[3.35rem] min-w-0 items-center gap-2 rounded-2xl border border-line bg-[color:var(--portfolio-glass-inline)] px-4 py-4 text-sm font-medium text-ink shadow-[var(--portfolio-inline-shadow)] backdrop-blur-xl">
              <Mail className="shrink-0" size={16} />
              <span className="min-w-0 break-all">{profile.email}</span>
            </span>
            <span className="card-reveal surface-lift flex min-h-[3.35rem] min-w-0 items-center gap-2 rounded-2xl border border-line bg-[color:var(--portfolio-glass-inline)] px-4 py-4 text-sm font-medium text-ink shadow-[var(--portfolio-inline-shadow)] backdrop-blur-xl">
              <MapPin className="shrink-0" size={16} />
              <span>{profile.location}</span>
            </span>
          </div>
        </div>

        <aside className={cx(panelClassName, 'relative overflow-hidden p-6')}>
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full"
            style={{
              background: 'var(--portfolio-focus-glow)',
            }}
          />
          <p className={eyebrowClassName}>Current focus</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] leading-none tracking-[-0.05em] text-ink">
            {currentFocus.title}
          </h2>
          <p className="mt-4 leading-8 text-muted">{currentFocus.summary}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            {currentFocus.tags.map((tag) => (
              <span className={chipClassName} key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <ul className={cx(bulletListClassName, 'mt-4')}>
            {currentFocus.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="my-5 h-px bg-line" />

          <div className="grid gap-3">
            {focusAreas.map((item) => (
              <div
                className="flex items-center gap-3 rounded-2xl border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-4 text-ink"
                key={item}
              >
                <Code2 size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </aside>
      </PageSection>

      <PageSection className="pt-0">
        <article className={cx(panelClassName, 'relative overflow-hidden p-6')}>
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="grid max-w-3xl gap-2">
              <p className={eyebrowClassName}>Live API panel</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.05em] text-ink">
                Current time and local weather
              </h2>
              <p className="leading-8 text-muted">
                Uses your browser location to keep the local clock moving in
                real time and pull current weather details for your current
                time zone.
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
              {liveEnvironment.status === 'loading'
                ? 'Refreshing...'
                : 'Refresh data'}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className={chipClassName}>
              {liveEnvironment.status === 'loading' ? (
                <RefreshCcw className="animate-spin" size={14} />
              ) : (
                <CloudSun size={14} />
              )}
              {liveEnvironment.status === 'loading'
                ? 'Fetching live data'
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
                  ? 'Local time still updates using your browser time zone even when weather access is blocked.'
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
                      ? `${Math.round(
                          liveEnvironment.apparentTemperature,
                        )}\u00B0C`
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
      </PageSection>

      <PageSection className="pt-0">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {heroStats.map((stat, index) => (
            <MetricCard
              key={stat.label}
              detail={stat.detail}
              icon={statIcons[index]}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      </PageSection>

      <PageSection className="pt-6">
        <SectionHeading
          description={profile.intro}
          eyebrow="Professional snapshot"
          title="How I build React-friendly enterprise products"
        />

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {strengths.map((strength, index) => (
            <ValueCard
              key={strength.title}
              description={strength.description}
              icon={strengthIcons[index]}
              title={strength.title}
            />
          ))}
        </div>
      </PageSection>
    </>
  )
}

export default OverviewPage
