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
        description="Reach out for React, enterprise frontend, or product-focused opportunities. Email, phone, LinkedIn, website, and resume are all connected here."
        eyebrow="Contact"
        title="Available for React, enterprise web, and full-stack product work"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {contactCards.map((card) =>
          card.href ? (
            <a
              className={cx(
                panelClassName,
                'grid gap-3 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-line-strong',
              )}
              href={card.href}
              key={card.label}
              rel={card.newTab ? 'noreferrer' : undefined}
              target={card.newTab ? '_blank' : undefined}
            >
              <p className={cardLabelClassName}>{card.label}</p>
              <h3 className="break-all font-display text-[1.2rem] leading-[1.1] text-ink sm:text-[1.3rem]">
                {card.value}
              </h3>
              <p className="leading-8 text-muted">{card.hint}</p>
            </a>
          ) : (
            <article className={cx(panelClassName, 'grid gap-3 p-5')} key={card.label}>
              <p className={cardLabelClassName}>{card.label}</p>
              <h3 className="break-all font-display text-[1.2rem] leading-[1.1] text-ink sm:text-[1.3rem]">
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
