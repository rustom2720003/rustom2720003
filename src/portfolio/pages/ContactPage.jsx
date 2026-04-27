import { useState } from 'react'
import { ChevronRight, Copy, Gamepad2, Mail, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contactCards, profile } from '../portfolioData'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
        <a
          className={cx(
            buttonClassNames.secondary,
            'w-full border-emerald-400/35 bg-gradient-to-r from-[#25d366] to-[#128c7e] text-white shadow-[0_16px_32px_rgba(18,140,126,0.28)] hover:border-emerald-300/45 hover:bg-gradient-to-r hover:from-[#29de6d] hover:to-[#149788] hover:text-white sm:w-auto',
          )}
          href={profile.whatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle size={18} />
          WhatsApp me
        </a>
      </div>

      <Link
        className={cx(
          panelClassName,
          'mt-10 flex flex-col gap-5 overflow-hidden p-5 transition duration-200 hover:-translate-y-1 hover:border-line-strong sm:p-6 lg:flex-row lg:items-center lg:justify-between',
        )}
        to="/games"
      >
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-[var(--portfolio-soft-shadow)]">
            <Sparkles size={20} />
          </span>
          <div className="grid gap-2">
            <p className={cardLabelClassName}>Fun Zone</p>
            <h3 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-none tracking-[-0.05em] text-ink">
              Until I reply, you can enjoy the Fun Zone.
            </h3>
            <p className="max-w-3xl leading-8 text-muted">
              Pick a mini-game, read the rules, and play it on a dedicated game
              page while you wait to hear back from me.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className={chipClassName}>7 React mini-games</span>
              <span className={chipClassName}>Dedicated game routes</span>
              <span className={chipClassName}>Keyboard and mobile friendly</span>
            </div>
          </div>
        </div>

        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-2 text-sm font-semibold text-ink shadow-[var(--portfolio-soft-shadow)] transition duration-200 lg:shrink-0">
          <Gamepad2 size={17} />
          Open games
          <ChevronRight size={17} />
        </span>
      </Link>
    </PageSection>
  )
}

export default ContactPage
