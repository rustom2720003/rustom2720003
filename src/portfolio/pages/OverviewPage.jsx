import {
  ArrowRight,
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
      <PageSection className="grid items-start gap-8 pt-2 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
        <div className="flex flex-col gap-6">
          <p className={eyebrowClassName}>
            {profile.title} | {profile.company} | {profile.location}
          </p>
          <h1 className="max-w-[10ch] font-display text-[clamp(2.7rem,5vw,4.7rem)] leading-[0.96] tracking-[-0.05em] text-ink max-lg:max-w-none">
            {profile.heroTitle}
          </h1>
          <p className="max-w-3xl text-[1.02rem] leading-8 text-muted">
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

          <div className="grid gap-4 md:grid-cols-3">
            <span className="flex min-h-[3.35rem] items-center gap-2 rounded-2xl border border-line bg-white/60 px-4 py-4 text-sm font-medium text-ink shadow-[0_18px_35px_rgba(16,41,47,0.10)]">
              <Phone size={16} />
              {profile.phoneDisplay}
            </span>
            <span className="flex min-h-[3.35rem] items-center gap-2 rounded-2xl border border-line bg-white/60 px-4 py-4 text-sm font-medium text-ink shadow-[0_18px_35px_rgba(16,41,47,0.10)]">
              <Mail size={16} />
              {profile.email}
            </span>
            <span className="flex min-h-[3.35rem] items-center gap-2 rounded-2xl border border-line bg-white/60 px-4 py-4 text-sm font-medium text-ink shadow-[0_18px_35px_rgba(16,41,47,0.10)]">
              <MapPin size={16} />
              {profile.location}
            </span>
          </div>
        </div>

        <aside className={cx(panelClassName, 'relative overflow-hidden p-6')}>
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(190, 91, 46, 0.18), transparent 70%)',
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
                className="flex items-center gap-3 rounded-2xl border border-line bg-white/60 px-4 py-4 text-ink"
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
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        <div className="value-grid">
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
