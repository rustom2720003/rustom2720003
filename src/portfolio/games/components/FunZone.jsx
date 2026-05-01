import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
  panelClassName,
} from '../../classes'

const MEMORY_PAIRS = [
  {
    id: 'react',
    label: 'React',
    shortLabel: 'UI',
    tone:
      'border-sky-300/30 bg-gradient-to-br from-sky-400/20 via-cyan-400/12 to-blue-500/18 text-white',
  },
  {
    id: 'hooks',
    label: 'Hooks',
    shortLabel: 'FX',
    tone:
      'border-violet-300/28 bg-gradient-to-br from-violet-500/22 via-fuchsia-500/12 to-indigo-500/16 text-white',
  },
  {
    id: 'router',
    label: 'Router',
    shortLabel: 'URL',
    tone:
      'border-emerald-300/28 bg-gradient-to-br from-emerald-400/18 via-teal-400/12 to-cyan-500/18 text-white',
  },
  {
    id: 'state',
    label: 'State',
    shortLabel: 'SET',
    tone:
      'border-amber-300/28 bg-gradient-to-br from-amber-400/18 via-orange-400/12 to-rose-400/18 text-white',
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
    shortLabel: 'CSS',
    tone:
      'border-cyan-300/28 bg-gradient-to-br from-cyan-400/18 via-sky-400/12 to-indigo-500/16 text-white',
  },
  {
    id: 'api',
    label: 'API',
    shortLabel: 'GET',
    tone:
      'border-pink-300/28 bg-gradient-to-br from-pink-400/18 via-rose-400/12 to-violet-500/18 text-white',
  },
]

const TYPING_TIME_LIMIT = 45
const TYPING_PROMPTS = [
  'Reusable components help one idea power many polished screens.',
  'React hooks keep stateful logic close to the UI that needs it.',
  'Clean routing makes a portfolio feel focused without breaking flow.',
  'Smooth interfaces come from clear state, good structure, and small details.',
  'Modern frontend work blends design, performance, and dependable API integration.',
]

const TICTACTOE_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const SNAKE_BOARD_SIZE = 12
const SNAKE_DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
}
const SNAKE_OPPOSITES = {
  ArrowUp: 'ArrowDown',
  ArrowDown: 'ArrowUp',
  ArrowLeft: 'ArrowRight',
  ArrowRight: 'ArrowLeft',
}

const directionButtonClassName =
  'inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-[color:var(--portfolio-glass-soft)] text-ink shadow-[var(--portfolio-soft-shadow)] transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)]'
const compactFunZoneMediaQuery = '(max-width: 1279px)'

let funZoneAudioContext = null

function getFunZoneAudioContext() {
  if (typeof window === 'undefined') {
    return null
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext

  if (!AudioContext) {
    return null
  }

  if (!funZoneAudioContext || funZoneAudioContext.state === 'closed') {
    funZoneAudioContext = new AudioContext()
  }

  if (funZoneAudioContext.state === 'suspended') {
    funZoneAudioContext.resume().catch(() => {})
  }

  return funZoneAudioContext
}

function playFunZoneSound(type = 'tap') {
  const audioContext = getFunZoneAudioContext()

  if (!audioContext) {
    return
  }

  try {
    const startTime = audioContext.currentTime + 0.006
    const gain = audioContext.createGain()
    const oscillator = audioContext.createOscillator()
    const soundMap = {
      tap: { frequency: 520, endFrequency: 720, peak: 0.14, duration: 0.08, wave: 'triangle' },
      flip: { frequency: 680, endFrequency: 1040, peak: 0.2, duration: 0.12, wave: 'square' },
      match: { frequency: 760, endFrequency: 1260, peak: 0.24, duration: 0.18, wave: 'triangle' },
      miss: { frequency: 300, endFrequency: 120, peak: 0.2, duration: 0.16, wave: 'sawtooth' },
      win: { frequency: 660, endFrequency: 1320, peak: 0.26, duration: 0.26, wave: 'triangle' },
      type: { frequency: 880, endFrequency: 980, peak: 0.08, duration: 0.045, wave: 'sine' },
      error: { frequency: 170, endFrequency: 90, peak: 0.16, duration: 0.12, wave: 'square' },
      eat: { frequency: 620, endFrequency: 1180, peak: 0.22, duration: 0.14, wave: 'triangle' },
      crash: { frequency: 140, endFrequency: 52, peak: 0.3, duration: 0.26, wave: 'sawtooth' },
    }
    const sound = soundMap[type] ?? soundMap.tap

    oscillator.type = sound.wave
    oscillator.frequency.setValueAtTime(sound.frequency, startTime)
    oscillator.frequency.exponentialRampToValueAtTime(sound.endFrequency, startTime + sound.duration)
    gain.gain.setValueAtTime(0.0001, startTime)
    gain.gain.exponentialRampToValueAtTime(sound.peak, startTime + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + sound.duration)
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.start(startTime)
    oscillator.stop(startTime + sound.duration + 0.02)
  } catch {
    // Audio is optional; gameplay should continue if the browser blocks it.
  }
}

function shuffleItems(items) {
  const nextItems = [...items]

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[nextItems[index], nextItems[swapIndex]] = [
      nextItems[swapIndex],
      nextItems[index],
    ]
  }

  return nextItems
}

function randomPrompt() {
  return TYPING_PROMPTS[Math.floor(Math.random() * TYPING_PROMPTS.length)]
}

function createMemoryDeck() {
  return shuffleItems(
    MEMORY_PAIRS.flatMap((pair, index) => [
      {
        id: `${pair.id}-a-${index}`,
        pairId: pair.id,
        label: pair.label,
        shortLabel: pair.shortLabel,
        tone: pair.tone,
        matched: false,
        revealed: false,
      },
      {
        id: `${pair.id}-b-${index}`,
        pairId: pair.id,
        label: pair.label,
        shortLabel: pair.shortLabel,
        tone: pair.tone,
        matched: false,
        revealed: false,
      },
    ]),
  )
}

function getTicTacToeOutcome(board) {
  for (const [first, second, third] of TICTACTOE_LINES) {
    if (
      board[first] &&
      board[first] === board[second] &&
      board[first] === board[third]
    ) {
      return board[first]
    }
  }

  if (board.every(Boolean)) {
    return 'draw'
  }

  return null
}

function getTicTacToeWinningLine(board) {
  return TICTACTOE_LINES.find(([first, second, third]) => (
    board[first] &&
    board[first] === board[second] &&
    board[first] === board[third]
  )) ?? []
}

function minimaxTicTacToe(board, isAiTurn) {
  const outcome = getTicTacToeOutcome(board)

  if (outcome === 'O') {
    return 1
  }

  if (outcome === 'X') {
    return -1
  }

  if (outcome === 'draw') {
    return 0
  }

  if (isAiTurn) {
    let bestScore = -Infinity

    board.forEach((cell, index) => {
      if (cell) {
        return
      }

      const nextBoard = [...board]
      nextBoard[index] = 'O'
      bestScore = Math.max(bestScore, minimaxTicTacToe(nextBoard, false))
    })

    return bestScore
  }

  let bestScore = Infinity

  board.forEach((cell, index) => {
    if (cell) {
      return
    }

    const nextBoard = [...board]
    nextBoard[index] = 'X'
    bestScore = Math.min(bestScore, minimaxTicTacToe(nextBoard, true))
  })

  return bestScore
}

function findBestTicTacToeMove(board) {
  let bestScore = -Infinity
  let bestMove = null

  board.forEach((cell, index) => {
    if (cell) {
      return
    }

    const nextBoard = [...board]
    nextBoard[index] = 'O'
    const nextScore = minimaxTicTacToe(nextBoard, false)

    if (nextScore > bestScore) {
      bestScore = nextScore
      bestMove = index
    }
  })

  return bestMove
}

function positionKey(position) {
  return `${position.x}-${position.y}`
}

function createSnakeFood(snake) {
  const occupiedPositions = new Set(snake.map(positionKey))
  const freeCells = []

  for (let rowIndex = 0; rowIndex < SNAKE_BOARD_SIZE; rowIndex += 1) {
    for (let cellIndex = 0; cellIndex < SNAKE_BOARD_SIZE; cellIndex += 1) {
      const key = `${cellIndex}-${rowIndex}`

      if (!occupiedPositions.has(key)) {
        freeCells.push({ x: cellIndex, y: rowIndex })
      }
    }
  }

  if (!freeCells.length) {
    return null
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)]
}

function createSnakeState() {
  const snake = [
    { x: 3, y: 6 },
    { x: 2, y: 6 },
    { x: 1, y: 6 },
  ]

  return {
    snake,
    direction: 'ArrowRight',
    food: createSnakeFood(snake),
    score: 0,
    status: 'playing',
  }
}

function advanceSnakeState(previousState, direction) {
  if (previousState.status !== 'playing') {
    return previousState
  }

  const delta = SNAKE_DIRECTIONS[direction]
  const nextHead = {
    x: previousState.snake[0].x + delta.x,
    y: previousState.snake[0].y + delta.y,
  }

  const isOutsideBoard =
    nextHead.x < 0 ||
    nextHead.x >= SNAKE_BOARD_SIZE ||
    nextHead.y < 0 ||
    nextHead.y >= SNAKE_BOARD_SIZE

  if (isOutsideBoard) {
    return {
      ...previousState,
      direction,
      status: 'over',
    }
  }

  const isEatingFood =
    previousState.food &&
    nextHead.x === previousState.food.x &&
    nextHead.y === previousState.food.y
  const collisionBody = isEatingFood
    ? previousState.snake
    : previousState.snake.slice(0, -1)
  const hitsBody = collisionBody.some(
    (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
  )

  if (hitsBody) {
    return {
      ...previousState,
      direction,
      status: 'over',
    }
  }

  const nextSnake = [nextHead, ...previousState.snake]

  if (!isEatingFood) {
    nextSnake.pop()
  }

  const nextFood = isEatingFood ? createSnakeFood(nextSnake) : previousState.food
  const status = nextFood ? 'playing' : 'won'

  return {
    snake: nextSnake,
    direction,
    food: nextFood,
    score: previousState.score + (isEatingFood ? 1 : 0),
    status,
  }
}

function DirectionPad({ onDirection }) {
  return (
    <div className="grid w-fit justify-items-center gap-2">
      <button
        type="button"
        className={directionButtonClassName}
        aria-label="Move up"
        onClick={() => onDirection('ArrowUp')}
      >
        <ArrowUp size={18} />
      </button>
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          className={directionButtonClassName}
          aria-label="Move left"
          onClick={() => onDirection('ArrowLeft')}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          className={directionButtonClassName}
          aria-label="Move down"
          onClick={() => onDirection('ArrowDown')}
        >
          <ArrowDown size={18} />
        </button>
        <button
          type="button"
          className={directionButtonClassName}
          aria-label="Move right"
          onClick={() => onDirection('ArrowRight')}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

function GameMetric({ label, value, hint }) {
  return (
    <div className="rounded-[1.25rem] border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-3 shadow-[var(--portfolio-soft-shadow)]">
      <p className={cardLabelClassName}>{label}</p>
      <p className="mt-2 font-display text-[1.55rem] leading-none tracking-[-0.05em] text-ink">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs leading-6 text-muted">{hint}</p> : null}
    </div>
  )
}

function FunZone({ games = [] }) {
  const [expanded, setExpanded] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState(games[0]?.id)
  const [activeGameId, setActiveGameId] = useState(null)
  const [gameRunKey, setGameRunKey] = useState(0)
  const rulesSectionRef = useRef(null)
  const gameSectionRef = useRef(null)

  const selectedGame =
    games.find((game) => game.id === selectedGameId) ?? games[0]
  const ActiveGame = selectedGame?.component

  const scrollSectionIntoView = (sectionRef) => {
    if (
      typeof window === 'undefined' ||
      !window.matchMedia(compactFunZoneMediaQuery).matches
    ) {
      return
    }

    window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  const handleSelectGame = (gameId) => {
    setSelectedGameId(gameId)
    setActiveGameId(null)
    scrollSectionIntoView(rulesSectionRef)
  }

  const handleStartGame = () => {
    setActiveGameId(selectedGameId)
    setGameRunKey((previousKey) => previousKey + 1)
    scrollSectionIntoView(gameSectionRef)
  }

  return (
    <section className="mt-10">
      <article className={cx(panelClassName, 'overflow-hidden')}>
        <button
          type="button"
          className="flex w-full flex-col gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
          aria-expanded={expanded}
          onClick={() => setExpanded((previousState) => !previousState)}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
                  Open a mini game, read the rules, and start playing right
                  inside the contact page while you wait to hear back from me.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-center">
              <span className={chipClassName}>{games.length} React mini-games</span>
              <span
                className={cx(
                  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[color:var(--portfolio-glass-soft)] text-ink shadow-[var(--portfolio-soft-shadow)] transition duration-200',
                  expanded && 'rotate-180',
                )}
              >
                <ChevronDown size={18} />
              </span>
            </div>
          </div>
        </button>

        {expanded ? (
          <div className="border-t border-line px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-wrap gap-3">
              <span className={chipClassName}>Rules first</span>
              <span className={chipClassName}>Choose, then start</span>
              <span className={chipClassName}>Keyboard and mobile friendly</span>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(280px,0.96fr)_minmax(0,1.04fr)] xl:items-start">
              <div className="grid min-w-0 gap-4">
                {games.map((game) => {
                  const Icon = game.icon
                  const isSelected = selectedGameId === game.id

                  return (
                    <button
                      key={game.id}
                      type="button"
                      className={cx(
                        'grid gap-3 rounded-[1.45rem] border p-5 text-left shadow-[var(--portfolio-soft-shadow)] transition duration-200 hover:-translate-y-0.5',
                        isSelected
                          ? 'border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-strong)]'
                          : 'border-line bg-[color:var(--portfolio-glass-soft)] hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)]',
                      )}
                      aria-pressed={isSelected}
                      onClick={() => handleSelectGame(game.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-soft text-teal">
                          <Icon size={20} />
                        </span>
                        <span
                          className={cx(
                            'rounded-full px-3 py-1 text-xs font-semibold',
                            isSelected
                              ? 'bg-accent-soft text-accent-strong'
                              : 'bg-[color:var(--portfolio-glass-inline)] text-muted',
                          )}
                        >
                          {isSelected ? 'Selected' : 'Pick game'}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display text-[1.3rem] leading-[1.1] text-ink">
                          {game.title}
                        </h4>
                        <p className="mt-2 leading-7 text-muted">{game.blurb}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {game.tags.map((tag) => (
                          <span className={chipClassName} key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="grid min-w-0 gap-4">
                <article
                  ref={rulesSectionRef}
                  className="scroll-mt-28 grid min-w-0 gap-5 rounded-[1.55rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)] sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className={cardLabelClassName}>Selected game</p>
                      <h4 className="mt-2 font-display text-[1.7rem] leading-[1.05] tracking-[-0.04em] text-ink">
                        {selectedGame?.title}
                      </h4>
                      <p className="mt-3 leading-8 text-muted">
                        {selectedGame?.blurb}
                      </p>
                    </div>
                    <span className={chipClassName}>Rules shown first</span>
                  </div>

                  <div className="grid gap-3">
                    <p className={cardLabelClassName}>How to play</p>
                    <ol className="grid gap-2 pl-5 text-sm leading-7 text-muted">
                      {selectedGame?.rules.map((rule) => (
                        <li className="list-decimal" key={rule}>
                          {rule}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className={cx(buttonClassNames.primary, 'w-full sm:w-auto')}
                      onClick={handleStartGame}
                    >
                      <Play size={18} />
                      {activeGameId === selectedGameId ? 'Restart game' : 'Start game'}
                    </button>

                    {activeGameId === selectedGameId ? (
                      <button
                        type="button"
                        className={cx(buttonClassNames.ghost, 'w-full sm:w-auto')}
                        onClick={() => setActiveGameId(null)}
                      >
                        Close game
                      </button>
                    ) : null}
                  </div>
                </article>

                <div
                  ref={gameSectionRef}
                  className="scroll-mt-28 min-w-0 overflow-hidden rounded-[1.55rem] border border-line bg-[color:var(--portfolio-glass-strong)] p-4 shadow-[var(--portfolio-soft-shadow)] sm:p-5"
                >
                  {activeGameId === selectedGameId ? (
                    <ActiveGame key={`${selectedGameId}-${gameRunKey}`} />
                  ) : (
                    <div className="grid min-h-[20rem] place-items-center rounded-[1.3rem] border border-dashed border-line bg-[color:var(--portfolio-glass-soft)] px-6 py-8 text-center">
                      <div className="grid max-w-md gap-3">
                        <p className={cardLabelClassName}>Ready when you are</p>
                        <h4 className="font-display text-[1.55rem] leading-[1.08] text-ink">
                          Start {selectedGame?.title} to begin.
                        </h4>
                        <p className="leading-8 text-muted">
                          The chosen game will open here after you press the
                          start button above.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </article>
    </section>
  )
}

export function MemoryCardGame() {
  const [cards, setCards] = useState(createMemoryDeck)
  const [openCards, setOpenCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [animatedCardIds, setAnimatedCardIds] = useState([])
  const hideTimerRef = useRef(null)
  const animationTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      window.clearTimeout(hideTimerRef.current)
      window.clearTimeout(animationTimerRef.current)
    }
  }, [])

  const matchedPairs = cards.filter((card) => card.matched).length / 2
  const gameCompleted = matchedPairs === MEMORY_PAIRS.length

  const resetGame = () => {
    window.clearTimeout(hideTimerRef.current)
    window.clearTimeout(animationTimerRef.current)
    setCards(createMemoryDeck())
    setOpenCards([])
    setMoves(0)
    setAnimatedCardIds([])
    playFunZoneSound('tap')
  }

  const pulseCards = (cardIds) => {
    window.clearTimeout(animationTimerRef.current)
    setAnimatedCardIds(cardIds)
    animationTimerRef.current = window.setTimeout(() => {
      setAnimatedCardIds([])
    }, 520)
  }

  const handleCardClick = (cardId) => {
    if (openCards.length === 2) {
      return
    }

    const selectedCard = cards.find((card) => card.id === cardId)

    if (!selectedCard || selectedCard.revealed || selectedCard.matched) {
      return
    }

    const nextCards = cards.map((card) =>
      card.id === cardId ? { ...card, revealed: true } : card,
    )
    const nextOpenCards = [...openCards, cardId]
    playFunZoneSound('flip')
    pulseCards([cardId])

    if (nextOpenCards.length === 1) {
      setCards(nextCards)
      setOpenCards(nextOpenCards)
      return
    }

    setMoves((previousMoves) => previousMoves + 1)
    const [firstCardId, secondCardId] = nextOpenCards
    const firstCard = nextCards.find((card) => card.id === firstCardId)
    const secondCard = nextCards.find((card) => card.id === secondCardId)

    if (firstCard.pairId === secondCard.pairId) {
      const nextMatchedPairCount = matchedPairs + 1
      playFunZoneSound(
        nextMatchedPairCount === MEMORY_PAIRS.length ? 'win' : 'match',
      )
      pulseCards(nextOpenCards)
      setCards(
        nextCards.map((card) =>
          nextOpenCards.includes(card.id)
            ? { ...card, matched: true }
            : card,
        ),
      )
      setOpenCards([])
      return
    }

    playFunZoneSound('miss')
    pulseCards(nextOpenCards)
    setCards(nextCards)
    setOpenCards(nextOpenCards)
    hideTimerRef.current = window.setTimeout(() => {
      setCards((previousCards) =>
        previousCards.map((card) =>
          nextOpenCards.includes(card.id)
            ? { ...card, revealed: false }
            : card,
        ),
      )
      setOpenCards([])
    }, 760)
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <GameMetric label="Moves" value={moves} hint="Lower is better" />
        <GameMetric
          label="Pairs solved"
          value={`${matchedPairs}/${MEMORY_PAIRS.length}`}
          hint="Reveal all pairs"
        />
        <GameMetric
          label="Status"
          value={gameCompleted ? 'Cleared' : 'Playing'}
          hint={
            gameCompleted
              ? 'Nice memory run.'
              : 'Match every React-themed pair.'
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          const isVisible = card.revealed || card.matched

          return (
            <button
              type="button"
              key={card.id}
              className={cx(
                'aspect-square rounded-[1.35rem] border p-3 text-left shadow-[var(--portfolio-soft-shadow)] transition duration-200',
                isVisible
                  ? card.tone
                  : 'border-line bg-[color:var(--portfolio-glass-soft)] text-ink hover:-translate-y-1 hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)]',
                card.matched && 'scale-[1.02] shadow-[0_0_0_2px_rgba(16,185,129,0.22),var(--portfolio-soft-shadow)]',
                animatedCardIds.includes(card.id) &&
                  'animate-[bounce_0.48s_ease-in-out_1]',
              )}
              aria-label={
                isVisible
                  ? `${card.label} card`
                  : 'Hidden memory card'
              }
              onClick={() => handleCardClick(card.id)}
            >
              <div className="flex h-full flex-col justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.12em] opacity-80">
                  {card.matched ? 'Matched' : isVisible ? 'Open' : 'Hidden'}
                </span>
                <div className="grid gap-1">
                  <p className="font-display text-[1.7rem] leading-none tracking-[-0.05em]">
                    {isVisible ? card.shortLabel : '?'}
                  </p>
                  <p className="text-sm leading-6">
                    {isVisible ? card.label : 'Tap to reveal'}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={cx(buttonClassNames.ghost, 'w-full sm:w-auto')}
          onClick={resetGame}
        >
          <RotateCcw size={18} />
          Shuffle again
        </button>
        <span className={chipClassName}>
          {gameCompleted ? 'All pairs found.' : 'Keep flipping for a match.'}
        </span>
      </div>
    </div>
  )
}

export function TypingChallengeGame() {
  const [prompt, setPrompt] = useState(randomPrompt)
  const [typedText, setTypedText] = useState('')
  const [timeLeft, setTimeLeft] = useState(TYPING_TIME_LIMIT)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [typingPulse, setTypingPulse] = useState('')
  const typingPulseTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      window.clearTimeout(typingPulseTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!started || finished) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          setFinished(true)
          setTypingPulse('miss')
          playFunZoneSound('miss')
          return 0
        }

        return previousTime - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [started, finished])

  const resetGame = () => {
    window.clearTimeout(typingPulseTimerRef.current)
    setPrompt(randomPrompt())
    setTypedText('')
    setTimeLeft(TYPING_TIME_LIMIT)
    setStarted(false)
    setFinished(false)
    setTypingPulse('')
    playFunZoneSound('tap')
  }

  const pulseTyping = (type) => {
    window.clearTimeout(typingPulseTimerRef.current)
    setTypingPulse(type)
    typingPulseTimerRef.current = window.setTimeout(() => {
      setTypingPulse('')
    }, 260)
  }

  const handleChange = (event) => {
    if (!started) {
      setStarted(true)
    }

    if (finished) {
      return
    }

    const nextText = event.target.value
    setTypedText(nextText)

    if (nextText.length >= typedText.length) {
      const latestIndex = nextText.length - 1
      const isCorrect = nextText[latestIndex] === prompt[latestIndex]
      playFunZoneSound(isCorrect ? 'type' : 'error')
      pulseTyping(isCorrect ? 'hit' : 'miss')
    }

    if (nextText === prompt && nextText.length > 0) {
      setFinished(true)
      setTypingPulse('win')
      playFunZoneSound('win')
    }
  }

  const elapsedSeconds = Math.max(1, TYPING_TIME_LIMIT - timeLeft)
  const typedWords = typedText.trim()
    ? typedText.trim().split(/\s+/).length
    : 0
  const matchingCharacters = typedText.split('').filter((character, index) => {
    return character === prompt[index]
  }).length
  const accuracy = typedText.length
    ? Math.round((matchingCharacters / typedText.length) * 100)
    : 100
  const wordsPerMinute = started
    ? Math.round((typedWords / elapsedSeconds) * 60)
    : 0
  const progress = Math.min(
    100,
    Math.round((typedText.length / prompt.length) * 100),
  )
  const statusText = finished
    ? typedText === prompt
      ? 'Prompt completed.'
      : 'Time is up.'
    : started
      ? 'Keep the rhythm going.'
      : 'Timer starts on your first keystroke.'

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <GameMetric label="Time left" value={`${timeLeft}s`} hint="45 second round" />
        <GameMetric label="Speed" value={`${wordsPerMinute} WPM`} hint="Live typing speed" />
        <GameMetric label="Accuracy" value={`${accuracy}%`} hint={statusText} />
      </div>

      <div
        className={cx(
          'rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)] transition duration-200',
          typingPulse === 'hit' && 'shadow-[0_0_0_2px_rgba(16,185,129,0.2),var(--portfolio-soft-shadow)]',
          typingPulse === 'miss' && 'shadow-[0_0_0_2px_rgba(244,63,94,0.22),var(--portfolio-soft-shadow)]',
          typingPulse === 'win' && 'animate-[bounce_0.55s_ease-in-out_1]',
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <p className={cardLabelClassName}>Prompt</p>
          <span className={chipClassName}>{progress}% typed</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1 leading-8">
          {prompt.split('').map((character, index) => {
            const typedCharacter = typedText[index]
            let className = 'text-muted'

            if (typedCharacter !== undefined) {
              className =
                typedCharacter === character
                  ? 'rounded-md bg-emerald-400/20 text-ink'
                  : 'rounded-md bg-rose-400/20 text-rose-300'
            } else if (index === typedText.length) {
              className = 'rounded-md bg-accent-soft px-0.5 text-ink'
            }

            return (
              <span className={className} key={`${character}-${index}`}>
                {character === ' ' ? '\u00A0' : character}
              </span>
            )
          })}
        </div>
      </div>

      <label className="grid gap-3">
        <span className={cardLabelClassName}>Your typing area</span>
        <textarea
          className={cx(
            'min-h-[10rem] rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-4 text-base leading-8 text-ink shadow-[var(--portfolio-soft-shadow)] outline-none transition duration-200 placeholder:text-muted focus:border-line-strong focus:bg-[color:var(--portfolio-glass-hover)]',
            typingPulse === 'miss' && 'border-rose-300/55',
            typingPulse === 'win' && 'border-emerald-300/55',
          )}
          disabled={finished}
          onChange={handleChange}
          placeholder="Start typing the prompt exactly as shown."
          value={typedText}
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={cx(buttonClassNames.ghost, 'w-full sm:w-auto')}
          onClick={resetGame}
        >
          <RotateCcw size={18} />
          New prompt
        </button>
        <span className={chipClassName}>{statusText}</span>
      </div>
    </div>
  )
}

export function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [mode, setMode] = useState('ai')
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [roundResult, setRoundResult] = useState(null)
  const [animatedCellIndex, setAnimatedCellIndex] = useState(null)
  const [scoreboard, setScoreboard] = useState({
    x: 0,
    o: 0,
    draws: 0,
  })
  const [aiThinking, setAiThinking] = useState(false)
  const aiMoveTimerRef = useRef(null)
  const cellAnimationTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      window.clearTimeout(aiMoveTimerRef.current)
      window.clearTimeout(cellAnimationTimerRef.current)
    }
  }, [])

  const pulseCell = (index) => {
    window.clearTimeout(cellAnimationTimerRef.current)
    setAnimatedCellIndex(index)
    cellAnimationTimerRef.current = window.setTimeout(() => {
      setAnimatedCellIndex(null)
    }, 420)
  }

  const finishRound = (outcome) => {
    setAiThinking(false)
    setRoundResult(outcome)
    playFunZoneSound(outcome === 'draw' ? 'miss' : 'win')

    if (outcome === 'X') {
      setScoreboard((previousScoreboard) => ({
        ...previousScoreboard,
        x: previousScoreboard.x + 1,
      }))
      return
    }

    if (outcome === 'O') {
      setScoreboard((previousScoreboard) => ({
        ...previousScoreboard,
        o: previousScoreboard.o + 1,
      }))
      return
    }

    setScoreboard((previousScoreboard) => ({
      ...previousScoreboard,
      draws: previousScoreboard.draws + 1,
    }))
  }

  const resetBoard = () => {
    window.clearTimeout(aiMoveTimerRef.current)
    window.clearTimeout(cellAnimationTimerRef.current)
    setBoard(Array(9).fill(null))
    setAiThinking(false)
    setCurrentPlayer('X')
    setRoundResult(null)
    setAnimatedCellIndex(null)
    playFunZoneSound('tap')
  }

  const handleMove = (index) => {
    if (board[index] || aiThinking || roundResult) {
      return
    }

    const marker = currentPlayer
    const nextBoard = [...board]
    nextBoard[index] = marker
    setBoard(nextBoard)
    pulseCell(index)
    playFunZoneSound('tap')

    const nextOutcome = getTicTacToeOutcome(nextBoard)

    if (nextOutcome) {
      finishRound(nextOutcome)
      return
    }

    if (mode === 'two-player') {
      setCurrentPlayer(marker === 'X' ? 'O' : 'X')
      return
    }

    setAiThinking(true)
    setCurrentPlayer('O')
    aiMoveTimerRef.current = window.setTimeout(() => {
      const aiMove = findBestTicTacToeMove(nextBoard)

      if (aiMove === null) {
        finishRound('draw')
        return
      }

      const aiBoard = [...nextBoard]
      aiBoard[aiMove] = 'O'
      setBoard(aiBoard)
      pulseCell(aiMove)
      playFunZoneSound('flip')
      const aiOutcome = getTicTacToeOutcome(aiBoard)

      if (aiOutcome) {
        finishRound(aiOutcome)
        return
      }

      setAiThinking(false)
      setCurrentPlayer('X')
    }, 380)
  }

  const handleModeChange = (nextMode) => {
    if (mode === nextMode && !roundResult && board.every((cell) => cell === null)) {
      return
    }

    setMode(nextMode)
    window.clearTimeout(aiMoveTimerRef.current)
    window.clearTimeout(cellAnimationTimerRef.current)
    setBoard(Array(9).fill(null))
    setAiThinking(false)
    setCurrentPlayer('X')
    setRoundResult(null)
    setAnimatedCellIndex(null)
    playFunZoneSound('tap')
  }

  const statusText =
    roundResult === 'X'
      ? mode === 'ai'
        ? 'You won this round.'
        : 'Player X wins this round.'
      : roundResult === 'O'
        ? mode === 'ai'
          ? 'AI wins this round.'
          : 'Player O wins this round.'
        : roundResult === 'draw'
          ? 'This round is a draw.'
          : mode === 'ai'
            ? aiThinking
              ? 'AI is thinking...'
              : 'Your move. You are X.'
            : `Player ${currentPlayer}'s turn.`
  const winningLine = getTicTacToeWinningLine(board)

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <GameMetric
          label="X wins"
          value={scoreboard.x}
          hint={mode === 'ai' ? 'Your wins as X' : 'Rounds won by Player X'}
        />
        <GameMetric
          label={mode === 'ai' ? 'AI wins' : 'O wins'}
          value={scoreboard.o}
          hint={mode === 'ai' ? 'Rounds won by AI' : 'Rounds won by Player O'}
        />
        <GameMetric label="Draws" value={scoreboard.draws} hint={statusText} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.6fr)] lg:items-center">
        <div className="grid grid-cols-3 gap-3 rounded-[1.4rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-3 shadow-[var(--portfolio-soft-shadow)] sm:p-4">
          {board.map((cell, index) => {
            const isWinningCell = winningLine.includes(index)

            return (
              <button
                type="button"
                key={`tic-${index}`}
                className={cx(
                  'aspect-square rounded-[1.25rem] border text-[2.2rem] font-display shadow-[var(--portfolio-soft-shadow)] transition duration-200',
                  cell === 'X'
                    ? 'border-cyan-300/35 bg-gradient-to-br from-cyan-400/24 via-sky-400/18 to-blue-500/22 text-white'
                    : cell === 'O'
                      ? 'border-fuchsia-300/35 bg-gradient-to-br from-fuchsia-500/24 via-pink-500/18 to-violet-500/22 text-white'
                      : 'border-line bg-[color:var(--portfolio-glass-inline)] text-ink hover:-translate-y-0.5 hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)]',
                  animatedCellIndex === index &&
                    'animate-[bounce_0.42s_ease-in-out_1]',
                  isWinningCell &&
                    'scale-[1.04] shadow-[0_0_0_2px_rgba(250,204,21,0.32),var(--portfolio-soft-shadow)]',
                )}
                aria-label={`Tic tac toe cell ${index + 1}`}
                onClick={() => handleMove(index)}
              >
                {cell}
              </button>
            )
          })}
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.3rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Game mode</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { value: 'two-player', label: '2 Players' },
                { value: 'ai', label: 'vs AI' },
              ].map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={cx(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5',
                    mode === option.value
                      ? 'border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)]'
                      : 'border-line bg-[color:var(--portfolio-glass-inline)] text-muted hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)] hover:text-ink',
                  )}
                  onClick={() => handleModeChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.3rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Round status</p>
            <p className="mt-3 text-base leading-8 text-muted">{statusText}</p>
          </div>

          <button
            type="button"
            className={cx(buttonClassNames.ghost, 'w-full')}
            onClick={resetBoard}
          >
            <RotateCcw size={18} />
            New round
          </button>
        </div>
      </div>
    </div>
  )
}

export function SnakeGame() {
  const [game, setGame] = useState(createSnakeState)
  const [snakePulse, setSnakePulse] = useState('')
  const directionRef = useRef('ArrowRight')
  const nextDirectionRef = useRef('ArrowRight')
  const snakePulseTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      window.clearTimeout(snakePulseTimerRef.current)
    }
  }, [])

  useEffect(() => {
    directionRef.current = game.direction
  }, [game.direction])

  const queueDirection = (direction) => {
    const currentDirection = nextDirectionRef.current || directionRef.current

    if (SNAKE_OPPOSITES[currentDirection] === direction) {
      return
    }

    nextDirectionRef.current = direction
    playFunZoneSound('tap')
  }

  const pulseSnake = (type) => {
    window.clearTimeout(snakePulseTimerRef.current)
    setSnakePulse(type)
    snakePulseTimerRef.current = window.setTimeout(() => {
      setSnakePulse('')
    }, 420)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!SNAKE_DIRECTIONS[event.key]) {
        return
      }

      event.preventDefault()
      queueDirection(event.key)
    }

    window.addEventListener('keydown', handleKeyDown, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (game.status !== 'playing') {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setGame((previousGame) => {
        const requestedDirection = nextDirectionRef.current
        const nextDirection =
          requestedDirection &&
          SNAKE_OPPOSITES[previousGame.direction] !== requestedDirection
            ? requestedDirection
            : previousGame.direction

        directionRef.current = nextDirection
        nextDirectionRef.current = nextDirection

        const nextGame = advanceSnakeState(previousGame, nextDirection)

        if (nextGame.score > previousGame.score) {
          playFunZoneSound(nextGame.status === 'won' ? 'win' : 'eat')
          pulseSnake('eat')
        } else if (nextGame.status !== previousGame.status) {
          playFunZoneSound(nextGame.status === 'over' ? 'crash' : 'win')
          pulseSnake(nextGame.status === 'over' ? 'crash' : 'win')
        }

        return nextGame
      })
    }, 165)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [game.status])

  const resetGame = () => {
    const nextGame = createSnakeState()
    directionRef.current = nextGame.direction
    nextDirectionRef.current = nextGame.direction
    setGame(nextGame)
    setSnakePulse('')
    playFunZoneSound('tap')
  }

  const snakeSegments = new Set(game.snake.map(positionKey))
  const headKey = positionKey(game.snake[0])
  const foodKey = game.food ? positionKey(game.food) : ''
  const statusText =
    game.status === 'won'
      ? 'Board cleared. That is a perfect snake run.'
      : game.status === 'over'
        ? 'Snake crashed. Restart for another run.'
        : 'Use arrow keys or the touch pad to steer.'

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <GameMetric label="Score" value={game.score} hint="Food collected" />
        <GameMetric label="Length" value={game.snake.length} hint="Snake segments" />
        <GameMetric label="Status" value={game.status} hint={statusText} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div
          className={cx(
            'grid gap-1 rounded-[1.4rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-3 shadow-[var(--portfolio-soft-shadow)] transition duration-200 sm:p-4',
            snakePulse === 'eat' && 'shadow-[0_0_0_2px_rgba(16,185,129,0.2),var(--portfolio-soft-shadow)]',
            snakePulse === 'crash' && 'shadow-[0_0_0_2px_rgba(244,63,94,0.22),var(--portfolio-soft-shadow)]',
            snakePulse === 'win' && 'animate-[bounce_0.55s_ease-in-out_1]',
          )}
          style={{
            gridTemplateColumns: `repeat(${SNAKE_BOARD_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: SNAKE_BOARD_SIZE * SNAKE_BOARD_SIZE }, (_, index) => {
            const x = index % SNAKE_BOARD_SIZE
            const y = Math.floor(index / SNAKE_BOARD_SIZE)
            const key = `${x}-${y}`
            const isHead = key === headKey
            const isBody = snakeSegments.has(key)
            const isFood = key === foodKey

            return (
              <div
                className={cx(
                  'aspect-square rounded-[0.7rem] border transition duration-100',
                  isHead
                    ? cx(
                        'border-cyan-300/35 bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600',
                        snakePulse && 'animate-[pulse_0.32s_ease-in-out_1]',
                      )
                    : isFood
                      ? 'animate-pulse border-rose-300/40 bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600'
                      : isBody
                        ? 'border-teal-300/25 bg-gradient-to-br from-teal-400/85 via-cyan-500/80 to-sky-600/80'
                        : 'border-line/70 bg-[color:var(--portfolio-glass-inline)]',
                )}
                key={key}
              />
            )
          })}
        </div>

        <div className="grid gap-4 justify-items-center">
          <DirectionPad onDirection={queueDirection} />
          <button
            type="button"
            className={cx(buttonClassNames.ghost, 'w-full sm:w-auto')}
            onClick={resetGame}
          >
            <RotateCcw size={18} />
            Restart snake
          </button>
        </div>
      </div>

      <span className={chipClassName}>{statusText}</span>
    </div>
  )
}

export default FunZone
