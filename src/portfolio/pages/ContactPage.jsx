import { useState } from 'react'
import { Copy, Mail } from 'lucide-react'
import { contactCards, profile } from '../portfolioData'
import {
  buttonClassNames,
  cardLabelClassName,
  cx,
  panelClassName,
} from '../classes'
import { PageSection, SectionHeading } from '../ui'

function ContactPage() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = profile.emailHref
    }
  }

  return (
    <PageSection className="pb-10">
      <SectionHeading
        description="If you want this portfolio connected to a live LinkedIn URL or a PDF resume later, that can be added cleanly in the same structure."
        eyebrow="Contact"
        title="Available for enterprise web, banking platform, and full-stack work"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {contactCards.map((card) =>
          card.href ? (
            <a
              className={cx(
                panelClassName,
                'grid gap-3 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-line-strong',
              )}
              href={card.href}
              key={card.label}
            >
              <p className={cardLabelClassName}>{card.label}</p>
              <h3 className="font-display text-[1.35rem] leading-[1.1] text-ink">
                {card.value}
              </h3>
              <p className="leading-8 text-muted">{card.hint}</p>
            </a>
          ) : (
            <article className={cx(panelClassName, 'grid gap-3 p-5')} key={card.label}>
              <p className={cardLabelClassName}>{card.label}</p>
              <h3 className="font-display text-[1.35rem] leading-[1.1] text-ink">
                {card.value}
              </h3>
              <p className="leading-8 text-muted">{card.hint}</p>
            </article>
          ),
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className={cx(buttonClassNames.primary, 'w-full sm:w-auto')}
          onClick={handleCopyEmail}
        >
          <Copy size={18} />
          {copied ? 'Email copied' : 'Copy email'}
        </button>
        <a
          className={cx(buttonClassNames.ghost, 'w-full sm:w-auto')}
          href={profile.emailHref}
        >
          <Mail size={18} />
          Open mail
        </a>
      </div>
    </PageSection>
  )
}

export default ContactPage
