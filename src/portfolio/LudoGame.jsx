import { useEffect, useRef, useState } from 'react'
import { Bot, Dice5, RotateCcw, Shield, Trophy, Users } from 'lucide-react'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
} from './classes'

const LUDO_PLAYER_COUNT_OPTIONS = [2, 3, 4]
const LUDO_PLAYER_COLOR_SETS = {
  2: ['red', 'yellow'],
  3: ['red', 'blue', 'yellow'],
  4: ['red', 'blue', 'yellow', 'green'],
}
const LUDO_LAST_TRACK_PROGRESS = 50
const LUDO_FINAL_PROGRESS = 56
const LUDO_SAFE_TRACK_INDICES = new Set([0, 8, 13, 21, 26, 34, 39, 47])
const LUDO_DICE_PIPS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
}
const LUDO_TRACK_COORDS = [
  { row: 6, column: 1 },
  { row: 6, column: 2 },
  { row: 6, column: 3 },
  { row: 6, column: 4 },
  { row: 6, column: 5 },
  { row: 5, column: 6 },
  { row: 4, column: 6 },
  { row: 3, column: 6 },
  { row: 2, column: 6 },
  { row: 1, column: 6 },
  { row: 0, column: 6 },
  { row: 0, column: 7 },
  { row: 0, column: 8 },
  { row: 1, column: 8 },
  { row: 2, column: 8 },
  { row: 3, column: 8 },
  { row: 4, column: 8 },
  { row: 5, column: 8 },
  { row: 6, column: 9 },
  { row: 6, column: 10 },
  { row: 6, column: 11 },
  { row: 6, column: 12 },
  { row: 6, column: 13 },
  { row: 6, column: 14 },
  { row: 7, column: 14 },
  { row: 8, column: 14 },
  { row: 8, column: 13 },
  { row: 8, column: 12 },
  { row: 8, column: 11 },
  { row: 8, column: 10 },
  { row: 8, column: 9 },
  { row: 9, column: 8 },
  { row: 10, column: 8 },
  { row: 11, column: 8 },
  { row: 12, column: 8 },
  { row: 13, column: 8 },
  { row: 14, column: 8 },
  { row: 14, column: 7 },
  { row: 14, column: 6 },
  { row: 13, column: 6 },
  { row: 12, column: 6 },
  { row: 11, column: 6 },
  { row: 10, column: 6 },
  { row: 9, column: 6 },
  { row: 8, column: 5 },
  { row: 8, column: 4 },
  { row: 8, column: 3 },
  { row: 8, column: 2 },
  { row: 8, column: 1 },
  { row: 8, column: 0 },
  { row: 7, column: 0 },
  { row: 6, column: 0 },
]
const LUDO_PLAYER_DEFS = {
  red: {
    id: 'red',
    label: 'Red',
    short: 'R',
    startIndex: 0,
    pipTone: 'bg-rose-600',
    cellTone:
      'bg-gradient-to-br from-rose-500/24 via-red-500/18 to-orange-400/18',
    laneTone:
      'bg-gradient-to-br from-rose-500/30 via-red-500/22 to-orange-400/20',
    tokenTone:
      'border-rose-300/45 bg-gradient-to-br from-rose-500 via-red-600 to-orange-500 text-white',
    summaryTone:
      'border-rose-300/35 bg-gradient-to-br from-rose-500/18 via-red-500/12 to-orange-400/12 text-ink',
    diceTone:
      'border-rose-300/40 bg-gradient-to-br from-rose-500/22 via-red-500/15 to-orange-400/16',
  },
  blue: {
    id: 'blue',
    label: 'Blue',
    short: 'B',
    startIndex: 13,
    pipTone: 'bg-sky-600',
    cellTone:
      'bg-gradient-to-br from-sky-500/24 via-cyan-500/18 to-blue-500/18',
    laneTone:
      'bg-gradient-to-br from-sky-500/30 via-cyan-500/22 to-blue-500/20',
    tokenTone:
      'border-sky-300/45 bg-gradient-to-br from-sky-500 via-cyan-600 to-blue-600 text-white',
    summaryTone:
      'border-sky-300/35 bg-gradient-to-br from-sky-500/18 via-cyan-500/12 to-blue-500/12 text-ink',
    diceTone:
      'border-sky-300/40 bg-gradient-to-br from-sky-500/22 via-cyan-500/15 to-blue-500/16',
  },
  yellow: {
    id: 'yellow',
    label: 'Yellow',
    short: 'Y',
    startIndex: 26,
    pipTone: 'bg-amber-600',
    cellTone:
      'bg-gradient-to-br from-amber-300/34 via-yellow-300/24 to-orange-300/18',
    laneTone:
      'bg-gradient-to-br from-amber-300/40 via-yellow-300/30 to-orange-300/20',
    tokenTone:
      'border-amber-200/55 bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-300 text-slate-900',
    summaryTone:
      'border-amber-300/35 bg-gradient-to-br from-amber-300/18 via-yellow-300/14 to-orange-300/12 text-ink',
    diceTone:
      'border-amber-300/40 bg-gradient-to-br from-amber-300/24 via-yellow-300/18 to-orange-300/16',
  },
  green: {
    id: 'green',
    label: 'Green',
    short: 'G',
    startIndex: 39,
    pipTone: 'bg-emerald-600',
    cellTone:
      'bg-gradient-to-br from-emerald-500/24 via-green-500/18 to-teal-400/18',
    laneTone:
      'bg-gradient-to-br from-emerald-500/30 via-green-500/22 to-teal-400/20',
    tokenTone:
      'border-emerald-300/45 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-500 text-white',
    summaryTone:
      'border-emerald-300/35 bg-gradient-to-br from-emerald-500/18 via-green-500/12 to-teal-400/12 text-ink',
    diceTone:
      'border-emerald-300/40 bg-gradient-to-br from-emerald-500/22 via-green-500/15 to-teal-400/16',
  },
}
const LUDO_HOME_LANES = {
  red: [
    { row: 7, column: 1 },
    { row: 7, column: 2 },
    { row: 7, column: 3 },
    { row: 7, column: 4 },
    { row: 7, column: 5 },
  ],
  blue: [
    { row: 1, column: 7 },
    { row: 2, column: 7 },
    { row: 3, column: 7 },
    { row: 4, column: 7 },
    { row: 5, column: 7 },
  ],
  yellow: [
    { row: 7, column: 13 },
    { row: 7, column: 12 },
    { row: 7, column: 11 },
    { row: 7, column: 10 },
    { row: 7, column: 9 },
  ],
  green: [
    { row: 13, column: 7 },
    { row: 12, column: 7 },
    { row: 11, column: 7 },
    { row: 10, column: 7 },
    { row: 9, column: 7 },
  ],
}
const LUDO_BASE_SLOTS = {
  red: [
    { row: 2, column: 2 },
    { row: 2, column: 4 },
    { row: 4, column: 2 },
    { row: 4, column: 4 },
  ],
  blue: [
    { row: 2, column: 10 },
    { row: 2, column: 12 },
    { row: 4, column: 10 },
    { row: 4, column: 12 },
  ],
  yellow: [
    { row: 10, column: 10 },
    { row: 10, column: 12 },
    { row: 12, column: 10 },
    { row: 12, column: 12 },
  ],
  green: [
    { row: 10, column: 2 },
    { row: 10, column: 4 },
    { row: 12, column: 2 },
    { row: 12, column: 4 },
  ],
}
const LUDO_BASE_AREAS = {
  red: { rowStart: 0, rowEnd: 5, columnStart: 0, columnEnd: 5 },
  blue: { rowStart: 0, rowEnd: 5, columnStart: 9, columnEnd: 14 },
  yellow: { rowStart: 9, rowEnd: 14, columnStart: 9, columnEnd: 14 },
  green: { rowStart: 9, rowEnd: 14, columnStart: 0, columnEnd: 5 },
}
const LUDO_DEFAULT_CONTROLLERS = {
  red: 'human',
  blue: 'human',
  yellow: 'human',
  green: 'human',
}

const ludoTrackIndexByKey = LUDO_TRACK_COORDS.reduce((map, coordinate, index) => {
  map[`${coordinate.row}-${coordinate.column}`] = index
  return map
}, {})

const ludoBaseSlotByKey = Object.entries(LUDO_BASE_SLOTS).reduce(
  (map, [playerId, slots]) => {
    slots.forEach((slot, tokenIndex) => {
      map[`${slot.row}-${slot.column}`] = {
        playerId,
        tokenIndex,
      }
    })

    return map
  },
  {},
)

const ludoHomeLaneByKey = Object.entries(LUDO_HOME_LANES).reduce(
  (map, [playerId, cells]) => {
    cells.forEach((cell, laneIndex) => {
      map[`${cell.row}-${cell.column}`] = {
        playerId,
        laneIndex,
      }
    })

    return map
  },
  {},
)

const ludoBaseAreaByKey = Object.entries(LUDO_BASE_AREAS).reduce(
  (map, [playerId, area]) => {
    for (let row = area.rowStart; row <= area.rowEnd; row += 1) {
      for (let column = area.columnStart; column <= area.columnEnd; column += 1) {
        map[`${row}-${column}`] = playerId
      }
    }

    return map
  },
  {},
)

function getActiveLudoColorIds(playerCount) {
  return LUDO_PLAYER_COLOR_SETS[playerCount] ?? LUDO_PLAYER_COLOR_SETS[4]
}

function createInitialDiceValues() {
  return {
    red: 1,
    blue: 1,
    yellow: 1,
    green: 1,
  }
}

function createLudoPlayers(playerCount, controllerMap) {
  return getActiveLudoColorIds(playerCount).map((playerId) => ({
    ...LUDO_PLAYER_DEFS[playerId],
    controller: controllerMap[playerId] ?? 'human',
    tokens: Array.from({ length: 4 }, (_, tokenIndex) => ({
      id: `${playerId}-${tokenIndex}`,
      tokenIndex,
      progress: -1,
    })),
  }))
}

function getInitialLudoMessage(players) {
  const openingPlayer = players[0]

  if (!openingPlayer) {
    return 'Choose a player setup to begin.'
  }

  return openingPlayer.controller === 'ai'
    ? `${openingPlayer.label} AI will roll first.`
    : `Click ${openingPlayer.label}'s dice to start the round.`
}

function createInitialLudoState(playerCount, controllerMap) {
  const players = createLudoPlayers(playerCount, controllerMap)

  return {
    players,
    currentPlayerIndex: 0,
    currentRoll: null,
    legalMoves: [],
    lastRoll: null,
    moveCount: 0,
    winner: null,
    turnSixCount: 0,
    message: getInitialLudoMessage(players),
  }
}

function getLudoTrackIndex(player, progress) {
  if (progress < 0 || progress > LUDO_LAST_TRACK_PROGRESS) {
    return null
  }

  return (player.startIndex + progress) % LUDO_TRACK_COORDS.length
}

function getFinishedTokenCount(player) {
  return player.tokens.filter((token) => token.progress === LUDO_FINAL_PROGRESS).length
}

function getLudoTrackOccupants(players, trackIndex) {
  const occupants = []

  players.forEach((player, playerIndex) => {
    player.tokens.forEach((token) => {
      if (getLudoTrackIndex(player, token.progress) === trackIndex) {
        occupants.push({
          playerId: player.id,
          playerIndex,
          tokenIndex: token.tokenIndex,
        })
      }
    })
  })

  return occupants
}

function getNextLudoPlayerIndex(players, currentIndex) {
  let nextIndex = currentIndex

  do {
    nextIndex = (nextIndex + 1) % players.length
  } while (
    getFinishedTokenCount(players[nextIndex]) === players[nextIndex].tokens.length &&
    nextIndex !== currentIndex
  )

  return nextIndex
}

function createSingleLudoMove(players, playerIndex, tokenIndex, roll) {
  const player = players[playerIndex]
  const token = player.tokens[tokenIndex]

  if (token.progress === LUDO_FINAL_PROGRESS) {
    return null
  }

  let nextProgress

  if (token.progress === -1) {
    if (roll !== 6) {
      return null
    }

    nextProgress = 0
  } else {
    nextProgress = token.progress + roll

    if (nextProgress > LUDO_FINAL_PROGRESS) {
      return null
    }
  }

  const landingTrackIndex = getLudoTrackIndex(player, nextProgress)
  let captures = []

  if (landingTrackIndex !== null) {
    const occupants = getLudoTrackOccupants(players, landingTrackIndex).filter(
      (occupant) =>
        !(
          occupant.playerId === player.id &&
          occupant.tokenIndex === token.tokenIndex
        ),
    )

    if (!LUDO_SAFE_TRACK_INDICES.has(landingTrackIndex)) {
      const opponentStacks = occupants
        .filter((occupant) => occupant.playerId !== player.id)
        .reduce((stacks, occupant) => {
          stacks[occupant.playerId] = [
            ...(stacks[occupant.playerId] ?? []),
            occupant,
          ]
          return stacks
        }, {})

      if (Object.values(opponentStacks).some((stack) => stack.length > 1)) {
        return null
      }

      captures = occupants.filter((occupant) => occupant.playerId !== player.id)
    }
  }

  return {
    playerId: player.id,
    playerIndex,
    tokenIndex,
    from: token.progress,
    to: nextProgress,
    roll,
    captures,
    enters: token.progress === -1,
    reachesHomeLane:
      token.progress >= 0 &&
      token.progress <= LUDO_LAST_TRACK_PROGRESS &&
      nextProgress > LUDO_LAST_TRACK_PROGRESS,
    finishes: nextProgress === LUDO_FINAL_PROGRESS,
  }
}

function getLegalLudoMoves(players, playerIndex, roll) {
  return players[playerIndex].tokens.reduce((moves, token) => {
    const nextMove = createSingleLudoMove(
      players,
      playerIndex,
      token.tokenIndex,
      roll,
    )

    if (nextMove) {
      moves.push(nextMove)
    }

    return moves
  }, [])
}

function resolveLudoRoll(currentState, roll) {
  const activePlayer = currentState.players[currentState.currentPlayerIndex]
  const nextSixCount = roll === 6 ? currentState.turnSixCount + 1 : 0

  if (nextSixCount === 3) {
    return {
      ...currentState,
      currentPlayerIndex: getNextLudoPlayerIndex(
        currentState.players,
        currentState.currentPlayerIndex,
      ),
      currentRoll: null,
      legalMoves: [],
      lastRoll: roll,
      moveCount: currentState.moveCount + 1,
      turnSixCount: 0,
      message: `${activePlayer.label} rolled three 6s in a row, so the turn passes on.`,
    }
  }

  const legalMoves = getLegalLudoMoves(
    currentState.players,
    currentState.currentPlayerIndex,
    roll,
  )

  if (!legalMoves.length) {
    return {
      ...currentState,
      currentPlayerIndex: getNextLudoPlayerIndex(
        currentState.players,
        currentState.currentPlayerIndex,
      ),
      currentRoll: null,
      legalMoves: [],
      lastRoll: roll,
      moveCount: currentState.moveCount + 1,
      turnSixCount: 0,
      message: `${activePlayer.label} rolled ${roll}, but no token can move.`,
    }
  }

  return {
    ...currentState,
    currentRoll: roll,
    legalMoves,
    lastRoll: roll,
    moveCount: currentState.moveCount + 1,
    turnSixCount: nextSixCount,
    message:
      activePlayer.controller === 'ai'
        ? `${activePlayer.label} rolled ${roll}. AI is choosing the best token.`
        : `${activePlayer.label} rolled ${roll}. Choose one of the highlighted tokens.`,
  }
}

function applyLudoMove(currentState, move) {
  const nextPlayers = currentState.players.map((player) => ({
    ...player,
    tokens: player.tokens.map((token) => ({ ...token })),
  }))
  const movedPlayer = nextPlayers[move.playerIndex]
  const movedToken = movedPlayer.tokens[move.tokenIndex]

  movedToken.progress = move.to

  move.captures.forEach((capture) => {
    nextPlayers[capture.playerIndex].tokens[capture.tokenIndex].progress = -1
  })

  const winner =
    getFinishedTokenCount(movedPlayer) === movedPlayer.tokens.length
      ? movedPlayer.id
      : null
  const getsBonusTurn =
    !winner &&
    (currentState.currentRoll === 6 || move.captures.length > 0 || move.finishes)
  const nextPlayerIndex = winner
    ? currentState.currentPlayerIndex
    : getsBonusTurn
      ? currentState.currentPlayerIndex
      : getNextLudoPlayerIndex(nextPlayers, currentState.currentPlayerIndex)
  const message = winner
    ? `${movedPlayer.label} brought all four tokens home and won the round.`
    : move.captures.length
      ? `${movedPlayer.label} captured a token and keeps the turn.`
      : move.finishes
        ? `${movedPlayer.label} brought token ${move.tokenIndex + 1} home and rolls again.`
        : move.enters
          ? `${movedPlayer.label} entered token ${move.tokenIndex + 1} onto the board.`
          : getsBonusTurn
            ? `${movedPlayer.label} moved token ${move.tokenIndex + 1} and keeps the turn.`
            : `${movedPlayer.label} moved token ${move.tokenIndex + 1}.`

  return {
    ...currentState,
    players: nextPlayers,
    currentPlayerIndex: nextPlayerIndex,
    currentRoll: null,
    legalMoves: [],
    winner,
    turnSixCount: getsBonusTurn && currentState.currentRoll === 6 ? currentState.turnSixCount : 0,
    message,
  }
}

function chooseBestLudoAiMove(currentState) {
  const activePlayer = currentState.players[currentState.currentPlayerIndex]

  return [...currentState.legalMoves]
    .map((move) => {
      const landingTrackIndex = getLudoTrackIndex(activePlayer, move.to)
      let score = move.to

      if (move.finishes) {
        score += 120
      }

      if (move.captures.length) {
        score += 90 + move.captures.length * 12
      }

      if (move.enters) {
        score += 28
      }

      if (landingTrackIndex !== null && LUDO_SAFE_TRACK_INDICES.has(landingTrackIndex)) {
        score += 10
      }

      if (move.from === -1 && move.roll === 6) {
        score += 8
      }

      return {
        move,
        score,
      }
    })
    .sort((firstOption, secondOption) => secondOption.score - firstOption.score)[0]?.move
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

function LudoToken({ player, tokenIndex, isMovable, onClick }) {
  const interactiveProps =
    typeof onClick === 'function'
      ? {
          onClick,
          type: 'button',
        }
      : {}

  return (
    <button
      className={cx(
        'inline-flex h-6 w-6 items-center justify-center rounded-full border text-[0.62rem] font-black shadow-[var(--portfolio-soft-shadow)] transition duration-200 sm:h-7 sm:w-7 sm:text-[0.68rem]',
        player.tokenTone,
        isMovable &&
          'scale-[1.06] shadow-[0_0_0_2px_rgba(46,115,255,0.32)] hover:-translate-y-0.5',
      )}
      title={`${player.label} token ${tokenIndex + 1}`}
      {...interactiveProps}
    >
      {tokenIndex + 1}
    </button>
  )
}

function LudoDie({ player, value, isRolling, canRoll, onRoll }) {
  const pips = LUDO_DICE_PIPS[value] ?? LUDO_DICE_PIPS[1]

  return (
    <button
      type="button"
      className={cx(
        'group inline-flex h-20 w-20 items-center justify-center rounded-[1.4rem] border p-2 shadow-[var(--portfolio-soft-shadow)] transition duration-200',
        player.diceTone,
        canRoll ? 'hover:-translate-y-0.5 hover:border-line-strong' : 'cursor-default opacity-80',
        isRolling && 'animate-[spin_0.9s_linear_infinite] scale-[1.04]',
      )}
      disabled={!canRoll}
      onClick={onRoll}
    >
      <span className="grid h-full w-full grid-cols-3 grid-rows-3 gap-1 rounded-[1rem] border border-white/45 bg-white/90 p-2">
        {Array.from({ length: 9 }, (_, index) => (
          <span
            className={cx(
              'h-2.5 w-2.5 self-center justify-self-center rounded-full transition duration-150',
              pips.includes(index) ? player.pipTone : 'opacity-0',
            )}
            key={`pip-${player.id}-${value}-${index}`}
          />
        ))}
      </span>
    </button>
  )
}

function LudoGame() {
  const [playerCount, setPlayerCount] = useState(2)
  const [controllerMap, setControllerMap] = useState(LUDO_DEFAULT_CONTROLLERS)
  const [scoreboard, setScoreboard] = useState({
    red: 0,
    blue: 0,
    yellow: 0,
    green: 0,
  })
  const [diceValues, setDiceValues] = useState(createInitialDiceValues)
  const [rollingPlayerId, setRollingPlayerId] = useState(null)
  const [moveFeedback, setMoveFeedback] = useState('')
  const [gameState, setGameState] = useState(() =>
    createInitialLudoState(2, LUDO_DEFAULT_CONTROLLERS),
  )
  const rollIntervalRef = useRef(null)
  const settleTimeoutRef = useRef(null)

  const activePlayer = gameState.players[gameState.currentPlayerIndex]
  const activeColorIds = getActiveLudoColorIds(playerCount)
  const finishedPlayers = gameState.players.filter(
    (player) => getFinishedTokenCount(player) === player.tokens.length,
  )
  const baseTokenByCell = {}
  const trackTokensByCell = {}
  const homeTokensByCell = {}
  const centerTokens = []

  gameState.players.forEach((player) => {
    player.tokens.forEach((token) => {
      if (token.progress === -1) {
        const baseSlot = LUDO_BASE_SLOTS[player.id][token.tokenIndex]
        baseTokenByCell[`${baseSlot.row}-${baseSlot.column}`] = {
          player,
          tokenIndex: token.tokenIndex,
        }
        return
      }

      if (token.progress === LUDO_FINAL_PROGRESS) {
        centerTokens.push({
          player,
          tokenIndex: token.tokenIndex,
        })
        return
      }

      if (token.progress <= LUDO_LAST_TRACK_PROGRESS) {
        const trackCoordinate =
          LUDO_TRACK_COORDS[getLudoTrackIndex(player, token.progress)]
        const key = `${trackCoordinate.row}-${trackCoordinate.column}`

        trackTokensByCell[key] = [
          ...(trackTokensByCell[key] ?? []),
          {
            player,
            tokenIndex: token.tokenIndex,
          },
        ]
        return
      }

      const homeCoordinate = LUDO_HOME_LANES[player.id][token.progress - 51]
      const key = `${homeCoordinate.row}-${homeCoordinate.column}`

      homeTokensByCell[key] = [
        ...(homeTokensByCell[key] ?? []),
        {
          player,
          tokenIndex: token.tokenIndex,
        },
      ]
    })
  })

  const clearRollTimers = () => {
    window.clearInterval(rollIntervalRef.current)
    window.clearTimeout(settleTimeoutRef.current)
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

  const resetRound = (nextPlayerCount = playerCount, nextControllerMap = controllerMap) => {
    clearRollTimers()
    setRollingPlayerId(null)
    setMoveFeedback('')
    setDiceValues(createInitialDiceValues())
    setGameState(createInitialLudoState(nextPlayerCount, nextControllerMap))
  }

  const settleRollForPlayer = (playerId, roll, stateSnapshot) => {
    const player = stateSnapshot.players[stateSnapshot.currentPlayerIndex]

    if (!player || player.id !== playerId) {
      return
    }

    const nextState = resolveLudoRoll(stateSnapshot, roll)

    setDiceValues((currentValues) => ({
      ...currentValues,
      [playerId]: roll,
    }))
    setRollingPlayerId(null)
    setMoveFeedback('')
    setGameState(nextState)
  }

  const startRollForPlayer = (playerId, stateSnapshot) => {
    if (rollingPlayerId || stateSnapshot.winner || stateSnapshot.currentRoll) {
      return
    }

    clearRollTimers()
    setRollingPlayerId(playerId)
    setMoveFeedback('')

    rollIntervalRef.current = window.setInterval(() => {
      setDiceValues((currentValues) => ({
        ...currentValues,
        [playerId]: Math.floor(Math.random() * 6) + 1,
      }))
    }, 90)

    settleTimeoutRef.current = window.setTimeout(() => {
      clearRollTimers()
      settleRollForPlayer(playerId, Math.floor(Math.random() * 6) + 1, stateSnapshot)
    }, 880)
  }

  const commitMove = (move, stateSnapshot) => {
    const nextState = applyLudoMove(stateSnapshot, move)

    setMoveFeedback('')
    setGameState(nextState)
    recordWinner(nextState.winner)
  }

  useEffect(() => {
    return () => {
      clearRollTimers()
    }
  }, [])

  useEffect(() => {
    if (!activePlayer || gameState.winner || gameState.currentRoll || rollingPlayerId) {
      return undefined
    }

    if (activePlayer.controller !== 'ai') {
      return undefined
    }

    const timerId = window.setTimeout(() => {
      startRollForPlayer(activePlayer.id, gameState)
    }, 720)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [activePlayer, gameState, rollingPlayerId])

  useEffect(() => {
    if (!activePlayer || gameState.winner || !gameState.currentRoll || rollingPlayerId) {
      return undefined
    }

    if (activePlayer.controller !== 'ai') {
      return undefined
    }

    const timerId = window.setTimeout(() => {
      const aiMove = chooseBestLudoAiMove(gameState)

      if (aiMove) {
        commitMove(aiMove, gameState)
      }
    }, 680)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [activePlayer, gameState, rollingPlayerId])

  const handleRollClick = (playerId) => {
    if (!activePlayer || activePlayer.id !== playerId) {
      return
    }

    if (
      activePlayer.controller !== 'human' ||
      gameState.winner ||
      gameState.currentRoll ||
      rollingPlayerId
    ) {
      return
    }

    startRollForPlayer(playerId, gameState)
  }

  const handleTokenClick = (playerId, tokenIndex) => {
    if (!activePlayer || activePlayer.controller !== 'human') {
      return
    }

    if (!gameState.currentRoll || playerId !== activePlayer.id) {
      return
    }

    const matchingMove = gameState.legalMoves.find(
      (move) => move.playerId === playerId && move.tokenIndex === tokenIndex,
    )

    if (!matchingMove) {
      setMoveFeedback('That token cannot move for the current dice roll.')
      return
    }

    commitMove(matchingMove, gameState)
  }

  const handlePlayerCountChange = (nextPlayerCount) => {
    setPlayerCount(nextPlayerCount)
    resetRound(nextPlayerCount, controllerMap)
  }

  const handleControllerChange = (playerId, nextController) => {
    const nextControllerMap = {
      ...controllerMap,
      [playerId]: nextController,
    }

    setControllerMap(nextControllerMap)
    resetRound(playerCount, nextControllerMap)
  }

  const currentTurnSummary = activePlayer
    ? `${activePlayer.label} ${activePlayer.controller === 'ai' ? 'AI' : 'player'}`
    : '--'

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <LudoMetric
          hint="Current turn owner"
          label="Active turn"
          value={gameState.winner ? 'Round over' : currentTurnSummary}
        />
        <LudoMetric
          hint="Most recent dice result"
          label="Last roll"
          value={gameState.lastRoll ?? '--'}
        />
        <LudoMetric
          hint="Completed dice throws"
          label="Rolls played"
          value={gameState.moveCount}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] xl:items-start">
        <div className="grid gap-4 rounded-[1.55rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-4 shadow-[var(--portfolio-soft-shadow)] sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div>
              <p className={cardLabelClassName}>Classic Ludo</p>
              <h4 className="mt-2 font-display text-[1.7rem] leading-[1.05] tracking-[-0.04em] text-ink">
                Four-token race with local and AI players
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className={chipClassName}>
                <Users size={14} />
                {playerCount} players
              </span>
              <span className={chipClassName}>Exact home finish</span>
              <span className={chipClassName}>Each player has a die</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="mx-auto w-full min-w-[31rem] max-w-[44rem] rounded-[1.45rem] border border-line bg-[color:var(--portfolio-glass-inline)] p-2 shadow-[var(--portfolio-soft-shadow)] sm:p-3">
              <div className="grid gap-1">
                {Array.from({ length: 15 }, (_, rowIndex) => (
                  <div
                    className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1"
                    key={`ludo-row-${rowIndex}`}
                  >
                    {Array.from({ length: 15 }, (_, columnIndex) => {
                      const key = `${rowIndex}-${columnIndex}`
                      const trackIndex = ludoTrackIndexByKey[key]
                      const baseSlotInfo = ludoBaseSlotByKey[key]
                      const homeLaneInfo = ludoHomeLaneByKey[key]
                      const baseAreaOwnerId = ludoBaseAreaByKey[key]
                      const baseAreaOwner = baseAreaOwnerId
                        ? LUDO_PLAYER_DEFS[baseAreaOwnerId]
                        : null
                      const homeLaneOwner = homeLaneInfo
                        ? LUDO_PLAYER_DEFS[homeLaneInfo.playerId]
                        : null
                      const startOwner = Object.values(LUDO_PLAYER_DEFS).find(
                        (player) => player.startIndex === trackIndex,
                      )
                      const tokens = baseSlotInfo
                        ? baseTokenByCell[key]
                          ? [baseTokenByCell[key]]
                          : []
                        : trackTokensByCell[key] ??
                          homeTokensByCell[key] ??
                          (rowIndex === 7 && columnIndex === 7 ? centerTokens : [])
                      const isCenter = rowIndex === 7 && columnIndex === 7
                      const isSafeTrack =
                        trackIndex !== undefined && LUDO_SAFE_TRACK_INDICES.has(trackIndex)

                      let cellClassName =
                        'relative aspect-square min-w-0 overflow-hidden rounded-[0.82rem] border border-line bg-[color:var(--portfolio-glass-hover)]'

                      if (baseAreaOwner) {
                        cellClassName = cx(cellClassName, baseAreaOwner.cellTone)
                      }

                      if (trackIndex !== undefined) {
                        cellClassName = cx(
                          cellClassName,
                          startOwner
                            ? startOwner.laneTone
                            : 'bg-[color:var(--portfolio-glass-soft)]',
                          isSafeTrack && 'shadow-[0_0_0_2px_rgba(255,255,255,0.12)]',
                        )
                      }

                      if (homeLaneOwner) {
                        cellClassName = cx(cellClassName, homeLaneOwner.laneTone)
                      }

                      if (isCenter) {
                        cellClassName = cx(
                          cellClassName,
                          'bg-gradient-to-br from-fuchsia-500/24 via-violet-500/18 to-cyan-500/22',
                        )
                      }

                      return (
                        <div className={cellClassName} key={key}>
                          {isCenter ? (
                            <div className="flex h-full w-full flex-wrap items-center justify-center gap-1 p-1">
                              {tokens.length ? (
                                tokens.map((token) => (
                                  <LudoToken
                                    isMovable={false}
                                    key={`center-${token.player.id}-${token.tokenIndex}`}
                                    player={token.player}
                                    tokenIndex={token.tokenIndex}
                                  />
                                ))
                              ) : finishedPlayers.length ? (
                                <span className="inline-flex h-full w-full items-center justify-center text-white/90">
                                  <Trophy size={18} />
                                </span>
                              ) : null}
                            </div>
                          ) : tokens.length ? (
                            <div className="flex h-full w-full flex-wrap items-center justify-center gap-1 p-1">
                              {tokens.map((token) => (
                                <LudoToken
                                  isMovable={gameState.legalMoves.some(
                                    (move) =>
                                      move.playerId === token.player.id &&
                                      move.tokenIndex === token.tokenIndex &&
                                      activePlayer?.controller === 'human',
                                  )}
                                  key={`${token.player.id}-${token.tokenIndex}-${key}`}
                                  onClick={() =>
                                    handleTokenClick(token.player.id, token.tokenIndex)
                                  }
                                  player={token.player}
                                  tokenIndex={token.tokenIndex}
                                />
                              ))}
                            </div>
                          ) : trackIndex !== undefined ? (
                            <span className="absolute inset-0 flex items-center justify-center text-[0.58rem] font-semibold uppercase text-white/85">
                              {isSafeTrack ? <Shield size={12} /> : null}
                            </span>
                          ) : baseSlotInfo ? (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="h-3 w-3 rounded-full border border-white/45 bg-white/30" />
                            </span>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <div className="flex items-center justify-between gap-4">
              <p className={cardLabelClassName}>Setup</p>
              <span className={chipClassName}>Classic rules</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
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

            <div className="mt-5 grid gap-3">
              {activeColorIds.map((playerId) => {
                const player = LUDO_PLAYER_DEFS[playerId]

                return (
                  <div
                    className={cx(
                      'rounded-[1rem] border px-4 py-3 shadow-[var(--portfolio-soft-shadow)]',
                      player.summaryTone,
                    )}
                    key={`controller-${playerId}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={cx(
                            'inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black uppercase shadow-[var(--portfolio-soft-shadow)]',
                            player.tokenTone,
                          )}
                        >
                          {player.short}
                        </span>
                        <div>
                          <p className="font-medium text-ink">{player.label}</p>
                          <p className="text-xs text-muted">Human or AI control</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {['human', 'ai'].map((mode) => (
                          <button
                            key={`${playerId}-${mode}`}
                            type="button"
                            className={cx(
                              'rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition duration-200',
                              controllerMap[playerId] === mode
                                ? 'border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)]'
                                : 'border-line bg-[color:var(--portfolio-glass-inline)] text-muted hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)] hover:text-ink',
                            )}
                            onClick={() => handleControllerChange(playerId, mode)}
                          >
                            {mode === 'ai' ? <Bot size={12} className="inline" /> : null}{' '}
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Round status</p>
            <p className="mt-3 text-base leading-8 text-muted">{gameState.message}</p>
            {moveFeedback ? (
              <div className="mt-4 rounded-[1rem] border border-amber-300/35 bg-amber-300/10 px-4 py-3">
                <p className={cardLabelClassName}>Move note</p>
                <p className="mt-2 text-sm leading-7 text-ink">{moveFeedback}</p>
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-3">
              <span className={chipClassName}>
                Need 6 to leave base
              </span>
              <span className={chipClassName}>
                Exact roll to reach home
              </span>
              <span className={chipClassName}>
                6 or capture keeps the turn
              </span>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <div className="flex items-center justify-between gap-4">
              <p className={cardLabelClassName}>Player dice</p>
              <span className={chipClassName}>One die per player</span>
            </div>

            <div className="mt-4 grid gap-3">
              {gameState.players.map((player) => {
                const canRoll =
                  !gameState.winner &&
                  !gameState.currentRoll &&
                  !rollingPlayerId &&
                  activePlayer?.id === player.id &&
                  player.controller === 'human'
                const isRolling = rollingPlayerId === player.id
                const homeCount = getFinishedTokenCount(player)

                return (
                  <div
                    className={cx(
                      'rounded-[1rem] border px-4 py-4 shadow-[var(--portfolio-soft-shadow)]',
                      player.summaryTone,
                    )}
                    key={`dice-${player.id}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={cx(
                              'inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black uppercase shadow-[var(--portfolio-soft-shadow)]',
                              player.tokenTone,
                            )}
                          >
                            {player.short}
                          </span>
                          <div>
                            <p className="font-medium text-ink">{player.label}</p>
                            <p className="text-xs text-muted">
                              {player.controller === 'ai' ? 'AI dice' : 'Player dice'}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className={chipClassName}>Home: {homeCount}/4</span>
                          <span className={chipClassName}>
                            {activePlayer?.id === player.id
                              ? isRolling
                                ? 'Rolling'
                                : gameState.currentRoll
                                  ? 'Choose token'
                                  : 'Your turn'
                              : 'Waiting'}
                          </span>
                        </div>
                      </div>

                      <LudoDie
                        canRoll={canRoll}
                        isRolling={isRolling}
                        onRoll={() => handleRollClick(player.id)}
                        player={player}
                        value={diceValues[player.id]}
                      />
                    </div>
                  </div>
                )
              })}
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
                  className={cx(
                    'rounded-[1rem] border px-4 py-3 shadow-[var(--portfolio-soft-shadow)]',
                    player.summaryTone,
                  )}
                  key={`score-${player.id}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cx(
                          'inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black uppercase shadow-[var(--portfolio-soft-shadow)]',
                          player.tokenTone,
                        )}
                      >
                        {player.short}
                      </span>
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
              onClick={() => activePlayer && handleRollClick(activePlayer.id)}
            >
              <Dice5 size={18} />
              {gameState.winner ? 'Round finished' : 'Roll active player dice'}
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
