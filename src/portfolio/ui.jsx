import {
  bulletListClassName,
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
  eyebrowClassName,
  panelClassName,
  pillClassNames,
  sectionClassName,
} from './classes'

export function PageSection({ children, className = '' }) {
  return <section className={cx(sectionClassName, className)}>{children}</section>
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-7 grid max-w-4xl gap-3">
      <p className={eyebrowClassName}>{eyebrow}</p>
      <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-none tracking-[-0.05em] text-ink">
        {title}
      </h2>
      <p className="max-w-3xl leading-8 text-muted">{description}</p>
    </div>
  )
}

export function MetricCard({ icon, value, label, detail }) {
  const Icon = icon

  return (
    <article className={cx(panelClassName, 'grid h-full content-start gap-3 p-6')}>
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon size={18} />
      </div>
      <p className="font-display text-[1.95rem] font-bold tracking-[-0.05em] text-ink">
        {value}
      </p>
      <p className="text-[1.02rem] font-semibold text-ink">{label}</p>
      <p className="text-sm leading-7 text-muted">{detail}</p>
    </article>
  )
}

export function ValueCard({ icon, title, description }) {
  const Icon = icon

  return (
    <article className={cx(panelClassName, 'grid h-full content-start gap-4 p-6')}>
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-soft text-teal">
        <Icon size={20} />
      </div>
      <h3 className="font-display text-[1.45rem] leading-[1.1] text-ink">
        {title}
      </h3>
      <p className="leading-8 text-muted">{description}</p>
    </article>
  )
}

export function ExperienceCard({ item }) {
  return (
    <article className={cx(panelClassName, 'grid gap-4 p-6')}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className={cardLabelClassName}>{item.company}</p>
          <h3 className="mt-2 font-display text-[1.45rem] leading-[1.1] text-ink">
            {item.role}
          </h3>
        </div>
        <span className={pillClassNames.strong}>{item.period}</span>
      </div>
      <p className="font-mono text-[0.92rem] text-muted">{item.location}</p>
      <p className="leading-8 text-muted">{item.summary}</p>
      <ul className={bulletListClassName}>
        {item.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  )
}

export function ProjectCard({ project }) {
  return (
    <article className={cx(panelClassName, 'grid gap-4 p-6')}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className={cardLabelClassName}>{project.client}</p>
          <h3 className="mt-2 font-display text-[1.45rem] leading-[1.1] text-ink">
            {project.name}
          </h3>
        </div>
        <span className={pillClassNames.default}>{project.period}</span>
      </div>
      <p className="leading-8 text-muted">{project.summary}</p>
      <div className="flex flex-wrap gap-3">
        {project.stack.map((item) => (
          <span className={chipClassName} key={item}>
            {item}
          </span>
        ))}
      </div>
      <ul className={bulletListClassName}>
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      {project.links?.length ? (
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              className={cx(buttonClassNames.secondary, 'w-full sm:w-auto')}
              href={link.href}
              key={link.href}
              rel={link.newTab ? 'noreferrer' : undefined}
              target={link.newTab ? '_blank' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-3">
        {project.filters.map((filter) => (
          <span className={pillClassNames.muted} key={filter}>
            {filter}
          </span>
        ))}
      </div>
    </article>
  )
}

export function SkillGroup({ group }) {
  return (
    <article className={cx(panelClassName, 'grid gap-4 p-5')}>
      <h3 className="font-display text-[1.35rem] leading-[1.1] text-ink">
        {group.title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {group.items.map((item) => (
          <span
            className="inline-flex min-h-8 items-center rounded-full border border-white/60 bg-white/60 px-3.5 py-1.5 text-sm text-ink"
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  )
}

export function ConceptCard({ item }) {
  return (
    <article className={cx(panelClassName, 'grid gap-3 p-5')}>
      <h3 className="font-display text-[1.2rem] leading-[1.1] text-ink">
        {item.title}
      </h3>
      <p className="leading-8 text-muted">{item.detail}</p>
    </article>
  )
}
