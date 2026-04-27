import { ArrowLeft, Play } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { FUN_ZONE_GAMES } from '../FunZone'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
  panelClassName,
} from '../classes'
import { PageSection } from '../ui'
import NotFoundPage from './NotFoundPage'

function GamePage() {
  const { gameId } = useParams()
  const game = FUN_ZONE_GAMES.find((gameItem) => gameItem.id === gameId)

  if (!game) {
    return <NotFoundPage />
  }

  const ActiveGame = game.component
  const Icon = game.icon

  return (
    <PageSection className="grid gap-5">
      <Link className={cx(buttonClassNames.ghost, 'w-full sm:w-fit')} to="/games">
        <ArrowLeft size={18} />
        Back to games
      </Link>

      <article className={cx(panelClassName, 'overflow-hidden p-5 sm:p-6')}>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.55fr)] lg:items-start">
          <div className="min-w-0">
            <p className={cardLabelClassName}>Game route</p>
            <div className="mt-3 flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-soft text-teal shadow-[var(--portfolio-soft-shadow)]">
                <Icon size={21} />
              </span>
              <div>
                <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-[-0.06em] text-ink">
                  {game.title}
                </h1>
                <p className="mt-3 max-w-3xl leading-8 text-muted">{game.blurb}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span className={chipClassName} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.4rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>How to play</p>
            <ol className="mt-3 grid gap-2 pl-5 text-sm leading-7 text-muted">
              {game.rules.map((rule) => (
                <li className="list-decimal" key={rule}>
                  {rule}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </article>

      <section
        className={cx(
          panelClassName,
          'grid min-w-0 gap-4 overflow-hidden p-4 sm:p-5',
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={cardLabelClassName}>Now playing</p>
          <span className={chipClassName}>
            <Play size={15} />
            {game.title}
          </span>
        </div>

        <ActiveGame key={game.id} />
      </section>
    </PageSection>
  )
}

export default GamePage
