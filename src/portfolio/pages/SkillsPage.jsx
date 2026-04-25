import { reactConcepts, skillGroups } from '../portfolioData'
import { cx, eyebrowClassName, panelClassName } from '../classes'
import { ConceptCard, PageSection, SectionHeading, SkillGroup } from '../ui'

function SkillsPage() {
  return (
    <PageSection>
      <SectionHeading
        description="A practical stack spanning backend systems, responsive UIs, API integration, testing, and delivery tooling."
        eyebrow="Technical toolkit"
        title="Skills shaped by banking-scale engineering constraints"
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <SkillGroup key={group.title} group={group} />
          ))}
        </div>

        <aside className={cx(panelClassName, 'grid gap-4 p-6')}>
          <p className={eyebrowClassName}>React concepts inside this site</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {reactConcepts.map((item) => (
              <ConceptCard key={item.title} item={item} />
            ))}
          </div>
        </aside>
      </div>
    </PageSection>
  )
}

export default SkillsPage
