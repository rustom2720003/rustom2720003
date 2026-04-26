import { useEffect, useRef, useState } from 'react'
import { Coins, RotateCcw } from 'lucide-react'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
} from './classes'

function TossMetric({ label, value, hint }) {
  return (
    <div className="rounded-[1.25rem] border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-3 shadow-[var(--portfolio-soft-shadow)]">
      <p className={cardLabelClassName}>{label}</p>
      <p className="mt-2 font-display text-[1.55rem] leading-none tracking-[-0.05em] text-ink">
        {value}
      </p>
      <p className="mt-1 text-xs leading-6 text-muted">{hint}</p>
    </div>
  )
}

function CoinTossGame() {
  const [selectedSide, setSelectedSide] = useState('Heads')
  const [coinFace, setCoinFace] = useState('Heads')
  const [lastCall, setLastCall] = useState(null)
  const [result, setResult] = useState(null)
  const [isTossing, setIsTossing] = useState(false)
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    total: 0,
    streak: 0,
    bestStreak: 0,
  })
  const [history, setHistory] = useState([])
  const flipIntervalRef = useRef(null)
  const settleTimeoutRef = useRef(null)

  const clearTimers = () => {
    window.clearInterval(flipIntervalRef.current)
    window.clearTimeout(settleTimeoutRef.current)
  }

  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [])

  const resetGame = () => {
    clearTimers()
    setSelectedSide('Heads')
    setCoinFace('Heads')
    setLastCall(null)
    setResult(null)
    setIsTossing(false)
    setStats({
      wins: 0,
      losses: 0,
      total: 0,
      streak: 0,
      bestStreak: 0,
    })
    setHistory([])
  }

  const handleToss = () => {
    if (isTossing) {
      return
    }

    clearTimers()
    const currentCall = selectedSide

    setIsTossing(true)
    setResult(null)
    setLastCall(currentCall)

    flipIntervalRef.current = window.setInterval(() => {
      setCoinFace((currentFace) =>
        currentFace === 'Heads' ? 'Tails' : 'Heads',
      )
    }, 120)

    settleTimeoutRef.current = window.setTimeout(() => {
      clearTimers()

      const nextResult = Math.random() < 0.5 ? 'Heads' : 'Tails'
      const isWin = currentCall === nextResult

      setCoinFace(nextResult)
      setResult(nextResult)
      setIsTossing(false)
      setStats((currentStats) => {
        const nextStreak = isWin ? currentStats.streak + 1 : 0

        return {
          wins: currentStats.wins + (isWin ? 1 : 0),
          losses: currentStats.losses + (isWin ? 0 : 1),
          total: currentStats.total + 1,
          streak: nextStreak,
          bestStreak: Math.max(currentStats.bestStreak, nextStreak),
        }
      })
      setHistory((currentHistory) =>
        [
          {
            call: currentCall,
            result: nextResult,
            isWin,
          },
          ...currentHistory,
        ].slice(0, 8),
      )
    }, 980)
  }

  const accuracy =
    stats.total > 0 ? `${Math.round((stats.wins / stats.total) * 100)}%` : '--'
  const resultText = result
    ? result === lastCall
      ? `You called ${lastCall} and won the toss.`
      : `It landed on ${result}. Better luck on the next toss.`
    : isTossing
      ? 'Coin is in the air...'
      : 'Choose Heads or Tails, then flip the coin.'

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <TossMetric
          hint="Correct predictions so far"
          label="Wins"
          value={stats.wins}
        />
        <TossMetric
          hint="Prediction accuracy"
          label="Accuracy"
          value={accuracy}
        />
        <TossMetric
          hint="Best correct-call streak"
          label="Best streak"
          value={stats.bestStreak}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(280px,1.1fr)] xl:items-center">
        <div className="grid gap-4 rounded-[1.55rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)] sm:p-6">
          <div className="flex flex-wrap gap-3">
            {['Heads', 'Tails'].map((side) => (
              <button
                key={side}
                type="button"
                className={cx(
                  'rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5',
                  selectedSide === side
                    ? 'border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)]'
                    : 'border-line bg-[color:var(--portfolio-glass-inline)] text-muted hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)] hover:text-ink',
                )}
                disabled={isTossing}
                onClick={() => setSelectedSide(side)}
              >
                {side}
              </button>
            ))}
          </div>

          <div
            className={cx(
              'grid min-h-[16rem] place-items-center rounded-[1.5rem] border p-6 text-center shadow-[var(--portfolio-soft-shadow)] transition duration-200',
              isTossing
                ? 'border-cyan-300/35 bg-gradient-to-br from-cyan-400/24 via-sky-400/18 to-blue-500/22'
                : result === 'Heads'
                  ? 'border-amber-300/35 bg-gradient-to-br from-amber-300/34 via-orange-300/24 to-yellow-400/22'
                  : result === 'Tails'
                    ? 'border-violet-300/35 bg-gradient-to-br from-violet-500/24 via-fuchsia-500/18 to-indigo-500/22'
                    : 'border-line bg-[color:var(--portfolio-glass-inline)]',
            )}
          >
            <div className="grid gap-4">
              <span className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[var(--portfolio-soft-shadow)]">
                <Coins size={34} />
              </span>
              <div className="grid gap-2">
                <p className={cardLabelClassName}>Current face</p>
                <p className="font-display text-[2.15rem] leading-none tracking-[-0.05em] text-white">
                  {coinFace.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={cx(buttonClassNames.primary, 'w-full sm:w-auto')}
              disabled={isTossing}
              onClick={handleToss}
            >
              <Coins size={18} />
              {isTossing ? 'Flipping...' : 'Flip coin'}
            </button>
            <button
              type="button"
              className={cx(buttonClassNames.ghost, 'w-full sm:w-auto')}
              onClick={resetGame}
            >
              <RotateCcw size={18} />
              Reset stats
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Result</p>
            <p className="mt-3 text-base leading-8 text-muted">{resultText}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className={chipClassName}>Total tosses: {stats.total}</span>
              <span className={chipClassName}>
                Current streak: {stats.streak}
              </span>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <div className="flex items-center justify-between gap-4">
              <p className={cardLabelClassName}>Recent history</p>
              <span className={chipClassName}>
                Last {Math.min(history.length, 8)} tosses
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {history.length ? (
                history.map((entry, index) => (
                  <div
                    key={`toss-${index}-${entry.result}`}
                    className="rounded-[1rem] border border-line bg-[color:var(--portfolio-glass-inline)] px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-ink">
                        Called {entry.call}
                      </span>
                      <span className={chipClassName}>
                        {entry.isWin ? 'Win' : 'Miss'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      Result: {entry.result}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-7 text-muted">
                  Your toss history will appear here after the first flip.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinTossGame
