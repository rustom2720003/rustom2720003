import { useState } from 'react'
import { Dice5, RotateCcw, Trophy, Users } from 'lucide-react'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
} from './classes'

const LUDO_PLAYER_CONFIGS = [
  {
    id: 'red',
    label: 'Red',
    short: 'R',
    startIndex: 0,
    cellTone:
      'bg-gradient-to-br from-rose-500/24 via-red-500/18 to-orange-400/18',
    laneTone:
      'bg-gradient-to-br from-rose-500/28 via-red-500/20 to-orange-400/18',
    tokenTone:
      'border-rose-300/45 bg-gradient-to-br from-rose-500 via-red-600 to-orange-500 text-white',
    summaryTone:
      'border-rose-300/35 bg-gradient-to-br from-rose-500/18 via-red-500/12 to-orange-400/12 text-ink',
  },
  {
    id: 'blue',
    label: 'Blue',
    short: 'B',
    startIndex: 6,
    cellTone:
      'bg-gradient-to-br from-sky-500/24 via-cyan-500/18 to-blue-500/18',
    laneTone:
      'bg-gradient-to-br from-sky-500/28 via-cyan-500/20 to-blue-500/18',
    tokenTone:
      'border-sky-300/45 bg-gradient-to-br from-sky-500 via-cyan-600 to-blue-600 text-white',
    summaryTone:
      'border-sky-300/35 bg-gradient-to-br from-sky-500/18 via-cyan-500/12 to-blue-500/12 text-ink',
  },
  {
    id: 'yellow',
    label: 'Yellow',
    short: 'Y',
    startIndex: 12,
    cellTone:
      'bg-gradient-to-br from-amber-300/34 via-yellow-300/24 to-orange-300/18',
    laneTone:
      'bg-gradient-to-br from-amber-300/40 via-yellow-300/28 to-orange-300/18',
    tokenTone:
      'border-amber-200/55 bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-300 text-slate-900',
    summaryTone:
      'border-amber-300/35 bg-gradient-to-br from-amber-300/18 via-yellow-300/14 to-orange-300/12 text-ink',
  },
  {
    id: 'green',
    label: 'Green',
    short: 'G',
    startIndex: 18,
    cellTone:
      'bg-gradient-to-br from-emerald-500/24 via-green-500/18 to-teal-400/18',
    laneTone:
      'bg-gradient-to-br from-emerald-500/28 via-green-500/20 to-teal-400/18',
    tokenTone:
      'border-emerald-300/45 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-500 text-white',
    summaryTone:
      'border-emerald-300/35 bg-gradient-to-br from-emerald-500/18 via-green-500/12 to-teal-400/12 text-ink',
  },
]

const LUDO_TRACK_LENGTH = 24
const LUDO_HOME_LENGTH = 3
const LUDO_FINAL_STEP = LUDO_TRACK_LENGTH + LUDO_HOME_LENGTH
const LUDO_PLAYER_COUNT_OPTIONS = [2, 3, 4]
const LUDO_SAFE_TRACK_INDICES = new Set([0, 6, 12, 18])
const LUDO_TRACK_COORDS = [
  { row: 0, column: 3 },
  { row: 0, column: 4 },
  { row: 0, column: 5 },
  { row: 0, column: 6 },
  { row: 1, column: 6 },
  { row: 2, column: 6 },
  { row: 3, column: 6 },
  { row: 4, column: 6 },
  { row: 5, column: 6 },
  { row: 6, column: 6 },
  { row: 6, column: 5 },
  { row: 6, column: 4 },
  { row: 6, column: 3 },
  { row: 6, column: 2 },
  { row: 6, column: 1 },
  { row: 6, column: 0 },
  { row: 5, column: 0 },
  { row: 4, column: 0 },
  { row: 3, column: 0 },
  { row: 2, column: 0 },
  { row: 1, column: 0 },
  { row: 0, column: 0 },
  { row: 0, column: 1 },
  { row: 0, column: 2 },
]
const LUDO_HOME_COORDS = {
  red: [
    { row: 1, column: 3 },
    { row: 2, column: 3 },
    { row: 3, column: 3 },
  ],
  blue: [
    { row: 3, column: 5 },
    { row: 3, column: 4 },
    { row: 3, column: 3 },
  ],
  yellow: [
    { row: 5, column: 3 },
    { row: 4, column: 3 },
    { row: 3, column: 3 },
  ],
  green: [
    { row: 3, column: 1 },
    { row: 3, column: 2 },
    { row: 3, column: 3 },
  ],
}
const LUDO_BASE_ZONES = {
  red: [
    { row: 1, column: 1 },
    { row: 1, column: 2 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
  blue: [
    { row: 1, column: 4 },
    { row: 1, column: 5 },
    { row: 2, column: 4 },
    { row: 2, column: 5 },
  ],
  yellow: [
    { row: 4, column: 4 },
    { row: 4, column: 5 },
    { row: 5, column: 4 },
    { row: 5, column: 5 },
  ],
  green: [
    { row: 4, column: 1 },
    { row: 4, column: 2 },
    { row: 5, column: 1 },
    { row: 5, column: 2 },
  ],
}
const LUDO_BASE_ANCHORS = {
  red: { row: 1, column: 1 },
  blue: { row: 1, column: 5 },
  yellow: { row: 5, column: 5 },
  green: { row: 5, column: 1 },
}

const ludoTrackIndexByKey = LUDO_TRACK_COORDS.reduce((map, coordinate, index) => {
  map[`${coordinate.row}-${coordinate.column}`] = index
  return map
}, {})

const ludoBaseOwnerByKey = Object.entries(LUDO_BASE_ZONES).reduce(
  (map, [playerId, cells]) => {
    cells.forEach((cell) => {
      map[`${cell.row}-${cell.column}`] = playerId
    })
    return map
  },
  {},
)

const ludoHomeOwnerByKey = Object.entries(LUDO_HOME_COORDS).reduce(
  (map, [playerId, cells]) => {
    cells.forEach((cell, index) => {
      map[`${cell.row}-${cell.column}`] = {
        playerId,
        homeIndex: index,
      }
    })
    return map
  },
  {},
)

function createLudoPlayers(playerCount) {
  return LUDO_PLAYER_CONFIGS.slice(0, playerCount).map((player) => ({
    ...player,
    steps: -1,
    finished: false,
  }))
}

function createInitialLudoState(playerCount = 4) {
  return {
    players: createLudoPlayers(playerCount),
    currentPlayerIndex: 0,
    lastRoll: null,
    moveCount: 0,
    winner: null,
    message: 'Roll the dice to start the quick ludo race.',
  }
}

function getLudoTrackIndex(player) {
  if (player.steps < 0 || player.steps >= LUDO_TRACK_LENGTH) {
    return null
  }

  return (player.startIndex + player.steps) % LUDO_TRACK_LENGTH
}

function canLudoPlayerMove(player, roll) {
  if (player.finished) {
    return false
  }

  if (player.steps === -1) {
    return roll === 6
  }

  return player.steps + roll <= LUDO_FINAL_STEP
}

function getNextLudoPlayerIndex(players, currentIndex) {
  let nextIndex = currentIndex

  do {
    nextIndex = (nextIndex + 1) % players.length
  } while (players[nextIndex].finished && nextIndex !== currentIndex)

  return nextIndex
}

function applyLudoRoll(currentState, roll) {
  const activePlayer = currentState.players[currentState.currentPlayerIndex]

  if (!canLudoPlayerMove(activePlayer, roll)) {
    return {
      ...currentState,
      currentPlayerIndex: getNextLudoPlayerIndex(
        currentState.players,
        currentState.currentPlayerIndex,
      ),
      lastRoll: roll,
      moveCount: currentState.moveCount + 1,
      message: `${activePlayer.label} rolled ${roll} but cannot move this turn.`,
    }
  }

  const nextPlayers = currentState.players.map((player) => ({ ...player }))
  const movedPlayer = nextPlayers[currentState.currentPlayerIndex]
  const enteringTrack = movedPlayer.steps === -1

  movedPlayer.steps = enteringTrack ? 0 : movedPlayer.steps + roll

  let captureHappened = false

  if (movedPlayer.steps < LUDO_TRACK_LENGTH) {
    const landingTrackIndex = getLudoTrackIndex(movedPlayer)

    if (!LUDO_SAFE_TRACK_INDICES.has(landingTrackIndex)) {
      nextPlayers.forEach((player, playerIndex) => {
        if (
          playerIndex !== currentState.currentPlayerIndex &&
          !player.finished &&
          player.steps >= 0 &&
          player.steps < LUDO_TRACK_LENGTH &&
          getLudoTrackIndex(player) === landingTrackIndex
        ) {
          player.steps = -1
          captureHappened = true
        }
      })
    }
  }

  let winner = null

  if (movedPlayer.steps === LUDO_FINAL_STEP) {
    movedPlayer.finished = true
    winner = movedPlayer.id
  }

  const extraTurn = !winner && (roll === 6 || captureHappened)
  const nextPlayerIndex = winner
    ? currentState.currentPlayerIndex
    : extraTurn
      ? currentState.currentPlayerIndex
      : getNextLudoPlayerIndex(nextPlayers, currentState.currentPlayerIndex)

  const message = winner
    ? `${movedPlayer.label} reached home and won the round.`
    : captureHappened
      ? `${movedPlayer.label} rolled ${roll}, captured a token, and gets another turn.`
      : enteringTrack
        ? `${movedPlayer.label} rolled 6 and entered the track.`
        : roll === 6
          ? `${movedPlayer.label} rolled 6 and gets another turn.`
          : `${movedPlayer.label} rolled ${roll} and moved ahead.`

  return {
    players: nextPlayers,
    currentPlayerIndex: nextPlayerIndex,
    lastRoll: roll,
    moveCount: currentState.moveCount + 1,
    winner,
    message,
  }
}

function LudoMetric({ label, value, hint }) {
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

function LudoToken({ player }) {
  return (
    <span
      className={cx(
        'inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-black uppercase shadow-[var(--portfolio-soft-shadow)]',
        player.tokenTone,
      )}
      title={player.label}
    >
      {player.short}
    </span>
  )
}

function LudoGame() {
  const [playerCount, setPlayerCount] = useState(4)
  const [scoreboard, setScoreboard] = useState({
    red: 0,
    blue: 0,
    yellow: 0,
    green: 0,
  })
  const [gameState, setGameState] = useState(() => createInitialLudoState(4))

  const activePlayer = gameState.players[gameState.currentPlayerIndex]
  const finishedPlayers = gameState.players.filter((player) => player.finished)
  const baseOccupancy = {}
  const trackOccupancy = {}
  const homeOccupancy = {}

  gameState.players.forEach((player) => {
    if (player.finished) {
      return
    }

    if (player.steps === -1) {
      const anchor = LUDO_BASE_ANCHORS[player.id]
      const key = `${anchor.row}-${anchor.column}`

      baseOccupancy[key] = [...(baseOccupancy[key] ?? []), player]
      return
    }

    if (player.steps < LUDO_TRACK_LENGTH) {
      const coordinate = LUDO_TRACK_COORDS[getLudoTrackIndex(player)]
      const key = `${coordinate.row}-${coordinate.column}`

      trackOccupancy[key] = [...(trackOccupancy[key] ?? []), player]
      return
    }

    const homeCoordinate = LUDO_HOME_COORDS[player.id][player.steps - LUDO_TRACK_LENGTH]
    const key = `${homeCoordinate.row}-${homeCoordinate.column}`

    homeOccupancy[key] = [...(homeOccupancy[key] ?? []), player]
  })

  const resetRound = (nextPlayerCount = playerCount) => {
    setGameState(createInitialLudoState(nextPlayerCount))
  }

  const recordWinner = (winnerId) => {
    if (!winnerId) {
      return
    }

    setScoreboard((currentScoreboard) => ({
      ...currentScoreboard,
      [winnerId]: currentScoreboard[winnerId] + 1,
    }))
  }

  const handleRollDice = () => {
    if (gameState.winner) {
      return
    }

    const roll = Math.floor(Math.random() * 6) + 1
    const nextState = applyLudoRoll(gameState, roll)

    setGameState(nextState)
    recordWinner(nextState.winner)
  }

  const handlePlayerCountChange = (nextPlayerCount) => {
    setPlayerCount(nextPlayerCount)
    resetRound(nextPlayerCount)
  }

  const materialLeader =
    gameState.winner
      ? `${gameState.players.find((player) => player.id === gameState.winner)?.label} wins`
      : `${activePlayer.label} to roll`

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <LudoMetric
          hint="Current turn owner"
          label="Active player"
          value={gameState.winner ? 'Round over' : activePlayer.label}
        />
        <LudoMetric
          hint="Most recent die result"
          label="Last roll"
          value={gameState.lastRoll ?? '--'}
        />
        <LudoMetric
          hint="Total completed rolls"
          label="Turns played"
          value={gameState.moveCount}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] xl:items-start">
        <div className="grid gap-4 rounded-[1.55rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-4 shadow-[var(--portfolio-soft-shadow)] sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div>
              <p className={cardLabelClassName}>Ludo board</p>
              <h4 className="mt-2 font-display text-[1.7rem] leading-[1.05] tracking-[-0.04em] text-ink">
                Quick ludo race with one token per player
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className={chipClassName}>
                <Users size={14} />
                {playerCount} players
              </span>
              <span className={chipClassName}>Track + home stretch</span>
              <span className={chipClassName}>{materialLeader}</span>
            </div>
          </div>

          <div className="grid gap-1 rounded-[1.45rem] border border-line bg-[color:var(--portfolio-glass-inline)] p-2 shadow-[var(--portfolio-soft-shadow)] sm:p-3">
            {Array.from({ length: 7 }, (_, rowIndex) => (
              <div className="grid grid-cols-7 gap-1" key={`ludo-row-${rowIndex}`}>
                {Array.from({ length: 7 }, (_, columnIndex) => {
                  const key = `${rowIndex}-${columnIndex}`
                  const trackIndex = ludoTrackIndexByKey[key]
                  const baseOwner = ludoBaseOwnerByKey[key]
                  const homeOwner = ludoHomeOwnerByKey[key]
                  const isCenter = rowIndex === 3 && columnIndex === 3
                  const tokens =
                    trackOccupancy[key] ??
                    homeOccupancy[key] ??
                    baseOccupancy[key] ??
                    []

                  let cellClassName =
                    'relative aspect-square rounded-[0.95rem] border border-line bg-[color:var(--portfolio-glass-hover)] transition duration-200'

                  if (trackIndex !== undefined) {
                    const safeOwner = LUDO_PLAYER_CONFIGS.find(
                      (player) => player.startIndex === trackIndex,
                    )

                    cellClassName = cx(
                      cellClassName,
                      safeOwner
                        ? safeOwner.cellTone
                        : 'bg-[color:var(--portfolio-glass-soft)]',
                      LUDO_SAFE_TRACK_INDICES.has(trackIndex) &&
                        'shadow-[0_0_0_2px_rgba(255,255,255,0.12)]',
                    )
                  } else if (homeOwner) {
                    const ownerConfig = LUDO_PLAYER_CONFIGS.find(
                      (player) => player.id === homeOwner.playerId,
                    )

                    cellClassName = cx(cellClassName, ownerConfig.laneTone)
                  } else if (baseOwner) {
                    const ownerConfig = LUDO_PLAYER_CONFIGS.find(
                      (player) => player.id === baseOwner,
                    )

                    cellClassName = cx(cellClassName, ownerConfig.cellTone)
                  } else if (isCenter) {
                    cellClassName = cx(
                      cellClassName,
                      'bg-gradient-to-br from-fuchsia-500/28 via-violet-500/18 to-cyan-500/22',
                    )
                  }

                  return (
                    <div className={cellClassName} key={key}>
                      {isCenter ? (
                        <div className="flex h-full w-full flex-wrap items-center justify-center gap-1 p-1">
                          {tokens.length ? (
                            tokens.map((player) => (
                              <LudoToken key={`${player.id}-center`} player={player} />
                            ))
                          ) : finishedPlayers.length ? (
                            finishedPlayers.map((player) => (
                              <LudoToken key={`finish-${player.id}`} player={player} />
                            ))
                          ) : (
                            <span className="inline-flex h-full w-full items-center justify-center text-white/90">
                              <Trophy size={18} />
                            </span>
                          )}
                        </div>
                      ) : tokens.length ? (
                        <div className="flex h-full w-full flex-wrap items-center justify-center gap-1 p-1">
                          {tokens.map((player) => (
                            <LudoToken key={`${player.id}-${key}`} player={player} />
                          ))}
                        </div>
                      ) : trackIndex !== undefined ? (
                        <span className="absolute inset-0 flex items-center justify-center text-[0.65rem] font-semibold text-white/75">
                          {trackIndex + 1}
                        </span>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Players</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {LUDO_PLAYER_COUNT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={cx(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5',
                    playerCount === option
                      ? 'border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)]'
                      : 'border-line bg-[color:var(--portfolio-glass-inline)] text-muted hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)] hover:text-ink',
                  )}
                  onClick={() => handlePlayerCountChange(option)}
                >
                  {option} players
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Round status</p>
            <p className="mt-3 text-base leading-8 text-muted">
              {gameState.message}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {gameState.players.map((player) => (
                <span
                  key={`status-${player.id}`}
                  className={cx(
                    chipClassName,
                    player.finished && 'border-transparent bg-emerald-400/18',
                  )}
                >
                  {player.label}: {player.finished ? 'Home' : player.steps === -1 ? 'Base' : 'On board'}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <div className="flex items-center justify-between gap-4">
              <p className={cardLabelClassName}>Scoreboard</p>
              <span className={chipClassName}>Wins by color</span>
            </div>

            <div className="mt-4 grid gap-3">
              {gameState.players.map((player) => (
                <div
                  key={`score-${player.id}`}
                  className={cx(
                    'rounded-[1rem] border px-4 py-3 shadow-[var(--portfolio-soft-shadow)]',
                    player.summaryTone,
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <LudoToken player={player} />
                      <span className="font-medium text-ink">{player.label}</span>
                    </div>
                    <span className={chipClassName}>{scoreboard[player.id]} wins</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={cx(buttonClassNames.primary, 'w-full sm:w-auto')}
              disabled={Boolean(gameState.winner)}
              onClick={handleRollDice}
            >
              <Dice5 size={18} />
              {gameState.winner ? 'Round finished' : 'Roll dice'}
            </button>

            <button
              type="button"
              className={cx(buttonClassNames.ghost, 'w-full sm:w-auto')}
              onClick={() => resetRound()}
            >
              <RotateCcw size={18} />
              New round
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LudoGame
