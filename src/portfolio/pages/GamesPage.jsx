import { ArrowLeft, ArrowRight, Gamepad2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGames } from '../games/GamesContext'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
  panelClassName,
} from '../classes'
import { PageSection, SectionHeading } from '../ui'

function GamesPage() {
  const { games } = useGames()

  return (
    <PageSection>
      <Link className={cx(buttonClassNames.ghost, 'mb-5 w-full sm:w-fit')} to="/contact">
        <ArrowLeft size={18} />
        Back to contact
      </Link>

      <SectionHeading
        description="Choose a React mini-game, read the rules, and open it on its own dedicated route."
        eyebrow="Games"
        title="Mini-games with dedicated pages"
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <span className={chipClassName}>
          <Gamepad2 size={15} />
          {games.length} React mini-games
        </span>
        <span className={chipClassName}>Nested game routes</span>
        <span className={chipClassName}>Keyboard and mobile friendly</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game) => {
          const Icon = game.icon

          return (
            <Link
              className={cx(
                panelClassName,
                'group grid min-h-full gap-4 overflow-hidden p-5 transition duration-200 hover:-translate-y-1 hover:border-line-strong',
              )}
              key={game.id}
              to={game.id}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-soft text-teal shadow-[var(--portfolio-soft-shadow)]">
                  <Icon size={21} />
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-[color:var(--portfolio-glass-soft)] text-ink transition duration-200 group-hover:translate-x-1 group-hover:border-line-strong">
                  <ArrowRight size={18} />
                </span>
              </div>

              <div>
                <p className={cardLabelClassName}>Play game</p>
                <h3 className="mt-2 font-display text-[1.55rem] leading-[1.05] tracking-[-0.04em] text-ink">
                  {game.title}
                </h3>
                <p className="mt-3 leading-8 text-muted">{game.blurb}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span className={chipClassName} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-strong">
                <Sparkles size={15} />
                Open {game.title}
              </span>
            </Link>
          )
        })}
      </div>
    </PageSection>
  )
}

export default GamesPage
