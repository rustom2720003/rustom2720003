import { ArrowRight, Compass, Home, SearchX, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
  eyebrowClassName,
  panelClassName,
} from '../classes'
import { PageSection } from '../ui'

const orbitDots = [
  'left-[8%] top-[18%] h-2.5 w-2.5 bg-accent',
  'right-[12%] top-[26%] h-3 w-3 bg-teal',
  'bottom-[18%] left-[18%] h-3.5 w-3.5 bg-sky-300',
  'bottom-[24%] right-[16%] h-2 w-2 bg-amber-300',
]

function NotFoundPage() {
  const location = useLocation()
  const attemptedPath = `${location.pathname}${location.search}${location.hash}`

  return (
    <PageSection className="grid min-h-[calc(100vh-13rem)] place-items-center py-8">
      <article
        className={cx(
          panelClassName,
          'relative grid w-full max-w-5xl overflow-hidden p-5 sm:p-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)] lg:items-center',
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,185,221,0.18),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(46,115,255,0.16),transparent_28%),radial-gradient(circle_at_52%_88%,rgba(16,185,129,0.14),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />

        <div className="relative z-10 grid gap-5">
          <p className={eyebrowClassName}>Signal lost</p>
          <div>
            <h1 className="portfolio-headline-glow font-display text-[clamp(4.4rem,15vw,9rem)] font-black leading-[0.78] tracking-[-0.07em]">
              404
            </h1>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.35rem)] leading-none tracking-[-0.05em] text-ink">
              This route slipped out of orbit.
            </h2>
          </div>

          <p className="max-w-2xl text-[1.04rem] leading-8 text-muted">
            The page you opened does not exist in this portfolio. Head back home
            or jump into the project gallery from here.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className={chipClassName}>
              <SearchX size={15} />
              {attemptedPath || 'Unknown path'}
            </span>
            <span className={chipClassName}>No matching route</span>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link className={cx(buttonClassNames.primary, 'w-full sm:w-auto')} to="/">
              <Home size={18} />
              Back home
            </Link>
            <Link className={cx(buttonClassNames.secondary, 'w-full sm:w-auto')} to="/projects">
              Explore projects
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex min-h-[21rem] items-center justify-center lg:mt-0">
          <div className="absolute h-[17rem] w-[17rem] rounded-full border border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-soft)] shadow-[var(--portfolio-soft-shadow)] animate-[ambientPulse_4.8s_ease-in-out_infinite]" />
          <div className="absolute h-[13rem] w-[13rem] rounded-full border border-dashed border-[color:var(--portfolio-glass-border-strong)] animate-[spin_18s_linear_infinite]" />
          <div className="absolute h-[8.8rem] w-[8.8rem] rounded-full border border-white/18 animate-[spin_11s_linear_infinite_reverse]" />

          {orbitDots.map((className) => (
            <span
              aria-hidden
              className={cx(
                'absolute rounded-full shadow-[0_0_22px_rgba(255,255,255,0.28)]',
                className,
              )}
              key={className}
            />
          ))}

          <div className="relative grid h-36 w-36 place-items-center rounded-[2rem] border border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-strong-shadow)] animate-[ambientFloatOne_7s_ease-in-out_infinite]">
            <span className="absolute inset-[-18px] rounded-[2.4rem] border border-white/14 animate-ping" />
            <Compass size={46} />
            <span className="absolute -right-3 -top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--portfolio-primary-button-gradient)] text-white shadow-[var(--portfolio-primary-button-shadow)]">
              <Sparkles size={18} />
            </span>
          </div>

          <div className="absolute bottom-1 rounded-full border border-[color:var(--portfolio-glass-border)] bg-[color:var(--portfolio-glass-chip)] px-4 py-2 text-center shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Route scanner active</p>
          </div>
        </div>
      </article>
    </PageSection>
  )
}

export default NotFoundPage
