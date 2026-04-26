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

function AnimatedHeadMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-16 w-16 overflow-visible"
      viewBox="0 0 96 96"
    >
      <circle cx="48" cy="48" fill="currentColor" opacity="0.08" r="30">
        <animate
          attributeName="opacity"
          dur="2.5s"
          repeatCount="indefinite"
          values="0.08;0.15;0.08"
        />
        <animate
          attributeName="r"
          dur="2.5s"
          repeatCount="indefinite"
          values="30;34;30"
        />
      </circle>

      <g>
        <animateTransform
          attributeName="transform"
          dur="2.1s"
          repeatCount="indefinite"
          type="translate"
          values="0 0;0 -2;0 0"
        />
        <circle cx="48" cy="30" fill="currentColor" opacity="0.94" r="13" />
        <path
          d="M29 72c3.5-11.5 11.7-19 19-19s15.5 7.5 19 19"
          fill="none"
          opacity="0.94"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <path
          d="M38 25c2.5-3.5 7-5.5 10-5.5s7.5 2 10 5.5"
          fill="none"
          opacity="0.2"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <circle cx="43" cy="29" fill="#ffffff" opacity="0.55" r="1.8">
          <animate
            attributeName="r"
            dur="2.8s"
            repeatCount="indefinite"
            values="1.8;1.2;1.8"
          />
        </circle>
        <circle cx="53" cy="29" fill="#ffffff" opacity="0.55" r="1.8">
          <animate
            attributeName="r"
            dur="2.8s"
            repeatCount="indefinite"
            values="1.8;1.2;1.8"
          />
        </circle>
      </g>

      <circle cx="24" cy="30" fill="#ffffff" opacity="0.3" r="3">
        <animate
          attributeName="cy"
          dur="2.2s"
          repeatCount="indefinite"
          values="30;24;30"
        />
      </circle>
      <circle cx="72" cy="62" fill="#ffffff" opacity="0.24" r="2.5">
        <animate
          attributeName="cy"
          dur="2.4s"
          repeatCount="indefinite"
          values="62;56;62"
        />
      </circle>
    </svg>
  )
}

function AnimatedTailMark() {
  return (
    <svg
      aria-hidden="true"
      className="h-16 w-16 overflow-visible"
      viewBox="0 0 96 96"
    >
      <circle cx="48" cy="48" fill="currentColor" opacity="0.08" r="29">
        <animate
          attributeName="opacity"
          dur="2.4s"
          repeatCount="indefinite"
          values="0.08;0.14;0.08"
        />
        <animate
          attributeName="r"
          dur="2.4s"
          repeatCount="indefinite"
          values="29;33;29"
        />
      </circle>

      <g>
        <animateTransform
          attributeName="transform"
          dur="1.9s"
          repeatCount="indefinite"
          type="rotate"
          values="-12 48 48;12 48 48;-12 48 48"
        />
        <path
          d="M31 69c11-8 19-20 21-34 1-8-1-15-5-21 13 6 22 17 25 31 3 13-1 25-11 34-7 7-17 12-26 14 5-4 9-11 11-18"
          fill="none"
          opacity="0.94"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          d="M45 22c9 5 15 13 17 23"
          fill="none"
          opacity="0.38"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <circle cx="42" cy="63" fill="#ffffff" opacity="0.26" r="2.8" />
      </g>

      <circle cx="72" cy="30" fill="#ffffff" opacity="0.28" r="2.8">
        <animate
          attributeName="cy"
          dur="2s"
          repeatCount="indefinite"
          values="30;24;30"
        />
      </circle>
      <circle cx="66" cy="67" fill="#ffffff" opacity="0.2" r="2.2">
        <animate
          attributeName="cy"
          dur="2.2s"
          repeatCount="indefinite"
          values="67;61;67"
        />
      </circle>
    </svg>
  )
}

function CoinFace({ side }) {
  const isHeads = side === 'Heads'
  const Mark = isHeads ? AnimatedHeadMark : AnimatedTailMark

  return (
    <div
      className={cx(
        'absolute inset-0 overflow-hidden rounded-full border shadow-[0_22px_44px_rgba(15,23,42,0.2)]',
        isHeads
          ? 'border-amber-100/75 bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 text-amber-950'
          : 'border-sky-100/70 bg-gradient-to-br from-slate-100 via-cyan-200 to-sky-400 text-slate-950',
      )}
      style={{
        backfaceVisibility: 'hidden',
        transform: isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)',
      }}
    >
      <span className="absolute inset-[8%] rounded-full border border-white/35" />
      <span className="absolute inset-[17%] rounded-full border border-black/10" />

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-3 text-center">
        <span
          className={cx(
            'inline-flex h-[4.35rem] w-[4.35rem] items-center justify-center rounded-full border shadow-[inset_0_1px_2px_rgba(255,255,255,0.18)]',
            isHeads
              ? 'border-amber-950/10 bg-white/45'
              : 'border-slate-900/10 bg-white/35',
          )}
        >
          <Mark />
        </span>
        <span className="font-display text-[1.35rem] leading-none tracking-[-0.05em]">
          {side}
        </span>
      </div>
    </div>
  )
}

function CoinTossGame() {
  const tossDurationMs = 4000
  const spinSteps = Math.round(tossDurationMs / 220)
  const [selectedSide, setSelectedSide] = useState('Heads')
  const [coinFace, setCoinFace] = useState('Heads')
  const [coinRotation, setCoinRotation] = useState(0)
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
  const settleTimeoutRef = useRef(null)

  const clearTimers = () => {
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
    setCoinRotation(0)
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
    const nextResult = Math.random() < 0.5 ? 'Heads' : 'Tails'
    const finalFaceRotation = nextResult === 'Heads' ? 0 : 180

    setIsTossing(true)
    setResult(null)
    setLastCall(currentCall)
    setCoinRotation((currentRotation) => {
      const normalizedRotation = ((currentRotation % 360) + 360) % 360
      const finalOffset =
        ((finalFaceRotation - normalizedRotation) + 360) % 360

      return currentRotation + spinSteps * 180 + finalOffset
    })

    settleTimeoutRef.current = window.setTimeout(() => {
      clearTimers()
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
    }, tossDurationMs)
  }

  const accuracy =
    stats.total > 0 ? `${Math.round((stats.wins / stats.total) * 100)}%` : '--'
  const resultText = result
    ? result === lastCall
      ? `You called ${lastCall} and won the toss.`
      : `It landed on ${result}. Better luck on the next toss.`
    : isTossing
      ? 'Coin is flipping through the air...'
      : 'Choose Heads or Tails, then flip the coin.'
  const coinFaceLabel = isTossing ? 'FLIPPING' : coinFace.toUpperCase()
  const coinFaceTextClassName = isTossing
    ? 'text-white'
    : result === 'Tails'
      ? 'text-white'
      : 'text-ink'

  return (
    <div className="mx-auto grid w-full max-w-[68rem] gap-5">
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

      <div className="grid gap-5 xl:grid-cols-[minmax(320px,1fr)_minmax(320px,1fr)] xl:items-start">
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
              <div className="mx-auto flex items-center justify-center [perspective:1400px]">
                <div
                  className="relative h-36 w-36 will-change-transform sm:h-40 sm:w-40"
                  style={{
                    transform: `rotateY(${coinRotation}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: `transform ${isTossing ? tossDurationMs : 620}ms ${
                      isTossing
                        ? 'cubic-bezier(0.2, 0.82, 0.18, 1)'
                        : 'cubic-bezier(0.22, 1, 0.36, 1)'
                    }`,
                  }}
                >
                  <CoinFace side="Heads" />
                  <CoinFace side="Tails" />
                </div>
              </div>
              <div className="grid gap-2">
                <p className={cardLabelClassName}>Current face</p>
                <p
                  className={cx(
                    'font-display text-[2.15rem] leading-none tracking-[-0.05em]',
                    coinFaceTextClassName,
                  )}
                >
                  {coinFaceLabel}
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
