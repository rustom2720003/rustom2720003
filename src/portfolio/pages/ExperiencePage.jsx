import { GraduationCap } from 'lucide-react'
import { education, experience } from '../portfolioData'
import { cx, eyebrowClassName, panelClassName } from '../classes'
import { ExperienceCard, PageSection, SectionHeading } from '../ui'

function ExperiencePage() {
  return (
    <PageSection>
      <SectionHeading
        description="Experience across enterprise banking systems, React-friendly frontend delivery, and collaborative engineering leadership."
        eyebrow="Career journey"
        title="Growing from implementation-focused engineer to trusted module owner"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
        <div className="grid gap-4">
          {experience.map((item) => (
            <ExperienceCard key={`${item.role}-${item.period}`} item={item} />
          ))}
        </div>

        <aside className={cx(panelClassName, 'grid gap-4 p-6')}>
          <p className={eyebrowClassName}>Education</p>
          <h3 className="font-display text-[1.45rem] leading-[1.1] text-ink">
            {education.institute}
          </h3>
          <p className="text-lg text-muted">{education.degree}</p>
          <p className="font-mono text-[0.92rem] text-muted">
            {education.location} | {education.period}
          </p>
          <p className="text-ink">{education.score}</p>

          <div className="h-px bg-line" />

          <div className="flex items-start gap-3 text-ink">
            <GraduationCap size={18} />
            <div>
              <h4 className="mb-1 font-display text-[1.05rem] text-ink">
                Academic foundation
              </h4>
              <p className="leading-8 text-muted">
                Strong computer engineering foundation that supports scalable
                application design, frontend architecture, and enterprise
                problem-solving.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </PageSection>
  )
}

export default ExperiencePage
