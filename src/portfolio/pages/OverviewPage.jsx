import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BriefcaseBusiness,
  ClipboardCheck,
  Code2,
  Download,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Sparkles,
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
  chipClassName,
  cx,
  eyebrowClassName,
  panelClassName,
} from '../classes'

const statIcons = [Sparkles, Landmark, BriefcaseBusiness, Blocks]
const strengthIcons = [Landmark, ClipboardCheck, BriefcaseBusiness]

function OverviewPage() {
  return (
    <>
      <PageSection className="pb-3 pt-2">
        <article
          className={cx(
            panelClassName,
            'grid gap-5 overflow-hidden p-4 sm:p-5 lg:grid-cols-[156px_minmax(0,1fr)_auto] lg:items-center',
          )}
        >
          <div className="mx-auto lg:mx-0">
            <img
              alt={profile.photoAlt}
              className="h-32 w-32 rounded-full border border-[color:var(--portfolio-glass-border-strong)] object-cover object-center shadow-[var(--portfolio-inline-shadow)] sm:h-36 sm:w-36"
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
