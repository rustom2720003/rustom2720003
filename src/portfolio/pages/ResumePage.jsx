import { Download } from 'lucide-react'
import { downloadResume } from '../portfolioActions'
import { profile, resumeColumns } from '../portfolioData'
import {
  PageSection,
  SectionHeading,
} from '../ui'
import {
  buttonClassNames,
  bulletListClassName,
  cx,
  eyebrowClassName,
  panelClassName,
} from '../classes'

function ResumePage() {
  return (
    <PageSection>
      <SectionHeading
        description="Download the current PDF resume or skim the core strengths, focus areas, and links that shape the portfolio story."
        eyebrow="Resume"
        title="Resume highlights for enterprise and React-focused roles"
      />

      <div className={cx(panelClassName, 'grid gap-6 p-6')}>
        <div className="grid gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className={eyebrowClassName}>Resume preview</p>
              <h3 className="mt-2 font-display text-[1.45rem] leading-[1.1] text-ink">
                {profile.name}
              </h3>
            </div>
            <button
              type="button"
              className={cx(buttonClassNames.secondary, 'w-full sm:w-auto')}
              onClick={downloadResume}
            >
              <Download size={18} />
              Download Resume
            </button>
          </div>

          <p className="font-mono text-[0.92rem] uppercase tracking-[0.04em] text-teal">
            {profile.title} | {profile.experience} | {profile.location}
          </p>
          <p className="leading-8 text-muted">{profile.overview}</p>

          <div className="flex flex-wrap gap-3 text-ink">
            <span className="rounded-full border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-2">
              {profile.phoneDisplay}
            </span>
            <span className="rounded-full border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-2">
              {profile.email}
            </span>
            <a
              className="rounded-full border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-2 transition duration-200 hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)]"
              href={profile.websiteUrl}
              rel="noreferrer"
              target="_blank"
            >
              {profile.websiteDisplay}
            </a>
            <a
              className="rounded-full border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-2 transition duration-200 hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)]"
              href={profile.linkedinUrl}
              rel="noreferrer"
              target="_blank"
            >
              {profile.linkedinDisplay}
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {resumeColumns.map((column) => (
            <article
              className="rounded-[1.2rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5"
              key={column.title}
            >
              <h4 className="mb-2 font-display text-[1.05rem] text-ink">
                {column.title}
              </h4>
              <ul className={bulletListClassName}>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </PageSection>
  )
}

export default ResumePage
