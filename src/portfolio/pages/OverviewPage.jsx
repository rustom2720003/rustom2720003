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
      <PageSection className="grid items-start gap-8 pt-2 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="flex min-w-0 flex-col gap-6">
            <p className="max-w-3xl font-mono text-[0.96rem] font-black uppercase tracking-[0.18em] text-accent-strong sm:text-[1.05rem]">
              {profile.title} | {profile.company} | {profile.location}
            </p>
            <h1 className="max-w-none font-display text-[clamp(3rem,5vw,5rem)] leading-[0.92] tracking-[-0.06em] text-ink">
              {profile.heroTitle}
            </h1>
            <p className="max-w-[38rem] text-[1.02rem] leading-8 text-muted">
              {profile.heroDescription}
            </p>
          </div>

          <div className={cx(panelClassName, 'relative isolate overflow-hidden p-4')}>
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(47, 102, 112, 0.2), transparent 70%)',
              }}
            />
            <img
              alt={profile.photoAlt}
              className="h-full min-h-[18rem] w-full rounded-[1.35rem] border border-white/40 bg-white/60 object-cover shadow-[0_18px_40px_rgba(16,41,47,0.12)]"
              src={profile.photoSrc}
            />
            <div className="absolute inset-x-7 bottom-7 rounded-[1.25rem] border border-white/60 bg-white/78 p-4 backdrop-blur-xl">
              <p className={eyebrowClassName}>Profile</p>
              <h2 className="mt-2 font-display text-[1.3rem] leading-[1.05] text-ink">
                {profile.name}
              </h2>
              <a
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-teal transition duration-200 hover:text-ink"
                href={profile.linkedinUrl}
                rel="noreferrer"
                target="_blank"
              >
                Visit LinkedIn
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
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

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 xl:grid-cols-3">
            <span className="flex min-h-[3.35rem] min-w-0 items-center gap-2 rounded-2xl border border-line bg-white/60 px-4 py-4 text-sm font-medium text-ink shadow-[0_18px_35px_rgba(16,41,47,0.10)]">
              <Phone className="shrink-0" size={16} />
              <span>{profile.phoneDisplay}</span>
            </span>
            <span className="flex min-h-[3.35rem] min-w-0 items-center gap-2 rounded-2xl border border-line bg-white/60 px-4 py-4 text-sm font-medium text-ink shadow-[0_18px_35px_rgba(16,41,47,0.10)]">
              <Mail className="shrink-0" size={16} />
              <span className="min-w-0 break-all">{profile.email}</span>
            </span>
            <span className="flex min-h-[3.35rem] min-w-0 items-center gap-2 rounded-2xl border border-line bg-white/60 px-4 py-4 text-sm font-medium text-ink shadow-[0_18px_35px_rgba(16,41,47,0.10)]">
              <MapPin className="shrink-0" size={16} />
              <span>{profile.location}</span>
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
